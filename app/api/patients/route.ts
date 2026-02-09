import { NextResponse } from 'next/server';
import { CosmosClient } from '@azure/cosmos';

const client = new CosmosClient({
  endpoint: process.env.COSMOS_DB_ENDPOINT,
  key: process.env.COSMOS_DB_KEY,
});

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get('q') || '';
  const { database } = await client.databases.createIfNotExists({ id: 'clinicaldata' });
  const { container } = await database.containers.createIfNotExists({ id: 'patients' });
  const query = { query: 'SELECT * FROM c WHERE CONTAINS(c.FIRST, @q)', parameters: [{ name: '@q', value: q }] };
  const { resources } = await container.items.query(query).fetchAll();
  return NextResponse.json(resources);
}