import { createPool } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';

const pool = createPool({
  connectionString: POSTGRES_URL,
});

export async function load() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT id, name, description, price FROM products');
    return {
      products: res.rows
    };
  } finally {
    client.release();
  }
}