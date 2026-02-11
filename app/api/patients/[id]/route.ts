import { NextResponse } from 'next/server';
import { CosmosClient } from '@azure/cosmos';
import type { Patient } from '@/types/patient';

const client = new CosmosClient({
    endpoint: process.env.COSMOS_DB_ENDPOINT,
    key: process.env.COSMOS_DB_KEY,
});

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: 'Patient ID is required' },
                { status: 400 }
            );
        }

        const { database } = await client.databases.createIfNotExists({
            id: 'clinicaldata',
        });
        const { container } = await database.containers.createIfNotExists({
            id: 'patients',
        });

        // Query patient by ID from Cosmos DB
        const query = {
            query: 'SELECT * FROM c WHERE c.id = @id',
            parameters: [{ name: '@id', value: id }],
        };

        const { resources } = await container.items.query(query).fetchAll();

        if (resources.length === 0) {
            return NextResponse.json(
                { error: 'Patient not found' },
                { status: 404 }
            );
        }

        const patient: Patient = resources[0];
        return NextResponse.json(patient);
    } catch (error) {
        console.error('Error fetching patient:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
