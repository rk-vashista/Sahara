import { createClient } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';

const client = createClient({
  connectionString: POSTGRES_URL,
});

export async function load() {
  await client.connect();

  try {
    const res = await client.query('SELECT id, name, description, price FROM products');
    return {
      products: res.rows,
    };
  } finally {
    await client.end();
  }
}