import { error } from '@sveltejs/kit';
import { pool } from '../lib/db'; // Adjusted the import path to a relative path

export async function load() {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY RANDOM() LIMIT 6');
        return {
            products: result.rows
        };
    } catch (err) {
        console.error('Error fetching products:', err);
        throw error(500, 'Error fetching products');
    }
}