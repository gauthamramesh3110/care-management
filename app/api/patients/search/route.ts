import { NextResponse } from 'next/server';
import { getCosmosClient } from '@/lib/cosmos';

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get('q')?.trim() || '';

  if (!q) {
    return NextResponse.json([]);
  }

  const database = getCosmosClient().database('clinical');
  const container = database.container('patients');

  const query = {
    query: `
      SELECT TOP 5 c.id, c.FIRST, c.LAST, c.BIRTHDATE
      FROM c
      WHERE CONTAINS(c.FIRST, @q, true)
         OR CONTAINS(c.LAST, @q, true)
         OR CONTAINS(CONCAT(c.FIRST, ' ', c.LAST), @q, true)
    `,
    parameters: [{ name: '@q', value: q }],
  };

  try {
    const { resources } = await container.items.query(query).fetchAll();
    return NextResponse.json(resources);
  } catch (error) {
    console.error('Quick search error:', error);
    return NextResponse.json([], { status: 500 });
  }
}
