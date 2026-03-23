import { NextResponse } from 'next/server';
import { getCosmosClient } from '@/lib/cosmos';

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get('q') || '';
  const database = getCosmosClient().database('clinical');
  const container = database.container('patients');

  const name = new URL(req.url).searchParams.get('name') || '';
  const zipcode = parseInt(new URL(req.url).searchParams.get('zipcode') || '0');
  const dob = new URL(req.url).searchParams.get('dob') || '';

  const queryString = `
    SELECT * FROM c 
    WHERE ${
        name ? `
        (
          CONTAINS(c.FIRST, @name) OR 
          CONTAINS(c.LAST, @name) OR 
          CONTAINS(c.SUFFIX, @name) OR 
          CONTAINS(c.PREFIX, @name)
        )
        ` : ''
      }
      ${
        zipcode ? (name ? 'AND' : '') + `(c.ZIP = @zipcode)` : ''
      }
      ${
        dob ? (name || zipcode ? 'AND' : '') + `(c.BIRTHDATE = @dob)` : ''
      }
  `;

  console.log('Executing query:', queryString, { name, zipcode, dob });

  const query = {
    query: queryString, 
    parameters: [
      { name: '@name', value: name }, 
      { name: '@zipcode', value: zipcode }, 
      { name: '@dob', value: dob }
    ] 
  };

  const { resources } = await container.items.query(query).fetchAll();
  return NextResponse.json(resources);
}

