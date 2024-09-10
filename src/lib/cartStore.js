import { writable } from 'svelte/store';

// Define the cart store without type annotations
const cartStore = writable([]);

// Export the cart store
export default cartStore;