"""
One-time script to convert the PyTorch model to ONNX format.
Run from the careplan-predictor directory with torch installed:
    python convert_to_onnx.py
"""

import json
import os

import torch

from model import TimeAwareClinicalTransformer

ARTIFACTS_DIR = os.path.join(os.path.dirname(__file__), "artifacts")

# Training hyperparameters (must match the notebook)
D_MODEL = 64
NHEAD = 2
NUM_LAYERS = 1
DROPOUT = 0.3


def main():
    # Load vocabs to get sizes
    with open(os.path.join(ARTIFACTS_DIR, "token_vocab.json")) as f:
        token_vocab = json.load(f)
    with open(os.path.join(ARTIFACTS_DIR, "target_vocab.json")) as f:
        target_vocab = json.load(f)

    # Peek at the checkpoint to get the actual sizes used during training
    weights_path = os.path.join(ARTIFACTS_DIR, "care_plan_suggestor_transformer.pth")
    state_dict = torch.load(weights_path, map_location="cpu", weights_only=True)
    vocab_size = state_dict["token_embedding.weight"].shape[0]
    num_careplans = state_dict["fc_out.bias"].shape[0]
    print(f"vocab_size={vocab_size}, num_careplans={num_careplans} (from checkpoint)")

    # Reconstruct model and load weights
    model = TimeAwareClinicalTransformer(
        vocab_size=vocab_size,
        num_careplans=num_careplans,
        d_model=D_MODEL,
        nhead=NHEAD,
        num_layers=NUM_LAYERS,
        dropout=DROPOUT,
    )
    model.load_state_dict(state_dict)
    model.eval()

    # Create dummy inputs (sequence length = 10)
    seq_len = 10
    dummy_tokens = torch.randint(0, vocab_size, (1, seq_len), dtype=torch.long)
    dummy_times = torch.rand(1, seq_len, dtype=torch.float)
    dummy_mask = torch.zeros(1, seq_len, dtype=torch.bool)

    # Export to ONNX
    onnx_path = os.path.join(ARTIFACTS_DIR, "care_plan_suggestor_transformer.onnx")
    torch.onnx.export(
        model,
        (dummy_tokens, dummy_times, dummy_mask),
        onnx_path,
        input_names=["tokens", "time_deltas", "pad_mask"],
        output_names=["logits"],
        dynamic_axes={
            "tokens": {0: "batch", 1: "seq_len"},
            "time_deltas": {0: "batch", 1: "seq_len"},
            "pad_mask": {0: "batch", 1: "seq_len"},
            "logits": {0: "batch"},
        },
        opset_version=17,
    )

    # Verify with onnxruntime
    import onnxruntime as ort
    import numpy as np

    session = ort.InferenceSession(onnx_path)
    ort_inputs = {
        "tokens": dummy_tokens.numpy(),
        "time_deltas": dummy_times.numpy(),
        "pad_mask": dummy_mask.numpy(),
    }
    ort_logits = session.run(None, ort_inputs)[0]

    # Compare with PyTorch output
    with torch.no_grad():
        pt_logits = model(dummy_tokens, dummy_times, dummy_mask).numpy()

    max_diff = np.abs(pt_logits - ort_logits).max()
    print(f"ONNX exported to: {onnx_path}")
    print(f"Max difference between PyTorch and ONNX outputs: {max_diff:.6e}")
    print(f"ONNX file size: {os.path.getsize(onnx_path) / 1024:.1f} KB")
    print("Conversion successful!")


if __name__ == "__main__":
    main()
