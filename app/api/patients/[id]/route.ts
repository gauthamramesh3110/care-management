import { NextResponse } from 'next/server';
import { getCosmosClient } from '@/lib/cosmos';
import type { Patient } from '@/types/patient';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: 'Patient ID is required' },
                { status: 400 }
            );
        }

        const database = getCosmosClient().database('clinical');
        const container = database.container('patients');

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
