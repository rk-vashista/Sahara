import { writable, derived } from 'svelte/store';

// Function to check if localStorage is available (only runs in the browser)
function isBrowser() {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

// Get cart from localStorage or start with an empty array (only in the browser)
const storedCart = isBrowser() ? localStorage.getItem('cart') : null;
const initialCart = storedCart ? JSON.parse(storedCart) : [];

// Create a writable store initialized with the cart from localStorage (in the browser) or empty cart (on SSR)
const cartStore = writable(initialCart);

// Create a derived store for the total number of items in the cart
export const cartItemCount = derived(cartStore, $cart =>
    $cart.reduce((total, item) => total + item.quantity, 0)
);

// Subscribe to cartStore changes and save them to localStorage (only in the browser)
if (isBrowser()) {
    cartStore.subscribe(value => {
        localStorage.setItem('cart', JSON.stringify(value));
    });
}

/**
 * Add a product to the cart
 * @param {Object} product
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

/**
 * Remove a product from the cart
 * @param {number} id - The ID of the product to remove
 */
export function removeFromCart(id) {
    cartStore.update(items => items.filter(item => item.id !== id));
}

/**
 * Update the quantity of a product in the cart
 * @param {number} id - The ID of the product to update
 * @param {number} quantity - The new quantity
 */
export function updateQuantity(id, quantity) {
    cartStore.update(items =>
        items.map(item =>
            item.id === id
                ? { ...item, quantity: Math.max(0, quantity) }
                : item
        ).filter(item => item.quantity > 0)
    );
}

/**
 * Clear the entire cart
 */
export function clearCart() {
    cartStore.set([]);
}

export default cartStore;