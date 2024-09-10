import { writable } from 'svelte/store';

// Define the type for CartItem
/**
 * @typedef {Object} CartItem
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {number} quantity
 */

// Initialize the cart store with an empty array of CartItem
/** @type {import('svelte/store').Writable<CartItem[]>} */
const cartStore = writable([]);

/**
 * Add a product to the cart
 * @param {CartItem} product
 */
export function addToCart(product) {
  cartStore.update(items => {
    const existingItem = items.find(item => item.id === product.id);
    if (existingItem) {
      return items.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      return [...items, { ...product, quantity: 1 }];
    }
  });
}

export default cartStore;