const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DATA_DIR = path.join(__dirname, "..", "data");
const OUTPUT_DIR = path.join(DATA_DIR, "json");

const CSV_FILES = [
  "allergies",
  "careplans",
  "conditions",
  "immunizations",
  "encounters",
  "medications",
  "observations",
  "patients",
  "procedures",
];

function parseCsv(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split(/\r?\n/).filter((line) => line.trim() !== "");
  if (lines.length === 0) return [];

  const headers = lines[0].split(",");
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j].trim()] = (values[j] || "").trim();
    }
    rows.push(obj);
  }
  return rows;
}

function ensureId(rows) {
  return rows.map((row) => {
    if (row.Id && row.Id !== "") {
      // Rename "Id" to "id" for Cosmos DB compatibility
      const { Id, ...rest } = row;
      return { id: Id, ...rest };
    }
    if (row.id && row.id !== "") {
      return row;
    }
    // Generate a UUID for rows without an id
    return { id: crypto.randomUUID(), ...row };
  });
}

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

for (const name of CSV_FILES) {
  const csvPath = path.join(DATA_DIR, `${name}.csv`);
  if (!fs.existsSync(csvPath)) {
    console.warn(`Skipping ${name}.csv — file not found`);
    continue;
  }

  console.log(`Processing ${name}.csv ...`);
  const rows = parseCsv(csvPath);
  const documents = ensureId(rows);

  const jsonPath = path.join(OUTPUT_DIR, `${name}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(documents, null, 2), "utf-8");
  console.log(`  → ${documents.length} documents written to ${name}.json`);
}

console.log("\nDone.");
