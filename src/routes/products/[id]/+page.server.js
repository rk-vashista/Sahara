// +page.js (or appropriate file for the route)
import { createPool } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';

const pool = createPool({
    connectionString: POSTGRES_URL,
});

export async function load({ params }) {
    const client = await pool.connect();
    
    try {
        const res = await client.query('SELECT id, name, description, price, image_url FROM products WHERE id = $1', [params.id]);
        
        // If no product is found, return an error
        if (res.rows.length === 0) {
            return {
                status: 404,
                error: new Error('Product not found')
            };
        }

        // Return the product data
        return {
            product: res.rows[0]
        };
    } finally {
        client.release();
    }
}
