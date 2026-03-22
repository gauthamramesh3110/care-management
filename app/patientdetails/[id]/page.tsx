import PatientDetails from "@/components/patient-details";
import { CosmosClient } from "@azure/cosmos";

const client = new CosmosClient({
    endpoint: process.env.COSMOS_DB_ENDPOINT!,
    key: process.env.COSMOS_DB_KEY!,
});

export default async function PatientDetailsPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    const container = client.database("clinical").container("patients");
    const { resources } = await container.items
        .query({
            query: "SELECT * FROM c WHERE c.id = @id",
            parameters: [{ name: "@id", value: id }],
        })
        .fetchAll();

    if (resources.length === 0) {
        return <div className="p-4">Patient not found</div>;
    }

    const patient = resources[0];
    return (
        <div className="p-4 flex flex-row gap-4">
            <div className="bg-gray-100 p-4 rounded w-1/3">
                <h2 className="text-xl font-bold mb-4">Patient Details</h2>
                <PatientDetails patient={patient} />
            </div>
            <div className="bg-gray-100 p-4 rounded w-2/3">
                <h2 className="text-xl font-bold mb-4">Clinical Details</h2>
            </div>
        </div>
    );
}