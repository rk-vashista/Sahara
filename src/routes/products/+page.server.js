// +page.js
import { createPool } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';

const pool = createPool({
  connectionString: POSTGRES_URL,
});

export async function load() {
  const client = await pool.connect();
  
  try {
    const res = await client.query('SELECT id, name, description, price, image_url FROM products')

    return {
      products: res.rows  // No need for 'props' key in SvelteKit
    };
  } catch (err) {
    console.error('Error fetching products:', err);
    return {
      products: []
    };
  } finally {
    client.release();
  }
}
