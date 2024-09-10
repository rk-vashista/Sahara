<script lang="ts">
  import cartStore from '$lib/cartStore.js'; // Adjust the path as necessary
  import { onDestroy } from 'svelte';

  // Define the type for CartItem
  type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
  };

  // Initialize cartItems with an empty array
  let cartItems: CartItem[] = [];

  // Calculate the total price
  $: total = cartItems.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);

  // Function to remove an item from the cart or reduce its quantity
  function removeItem(id: number) {
    cartStore.update((items: CartItem[]) => {
      return items.map(item => {
        if (item.id === id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return null;
          }
        }
        return item;
      }).filter(item => item !== null) as CartItem[];
    });
  }

  // Subscribe to cart store updates
  const unsubscribe = cartStore.subscribe((value: CartItem[]) => {
    cartItems = value;
  });

  // Unsubscribe when the component is destroyed
  onDestroy(() => {
    unsubscribe();
  });
</script>

<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-6">
    <h2 class="text-4xl font-extrabold text-gray-800 mb-12 text-center">Your Cart</h2>
    
    {#if cartItems.length > 0}
      <div class="bg-white shadow-xl rounded-lg overflow-hidden">
        <table class="w-full text-left">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-4 text-sm font-semibold text-gray-700">Product</th>
              <th class="px-6 py-4 text-sm font-semibold text-gray-700">Price</th>
              <th class="px-6 py-4 text-sm font-semibold text-gray-700">Quantity</th>
              <th class="px-6 py-4 text-sm font-semibold text-gray-700">Total</th>
              <th class="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {#each cartItems as item (item.id)}
              <tr class="border-t hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 text-gray-800">{item.name}</td>
                <td class="px-6 py-4 text-gray-600">${item.price.toFixed(2)}</td>
                <td class="px-6 py-4 text-gray-600">{item.quantity}</td>
                <td class="px-6 py-4 text-gray-800 font-bold">${(item.price * item.quantity).toFixed(2)}</td>
                <td class="px-6 py-4">
                  <button on:click={() => removeItem(item.id)} class="text-red-600 hover:text-red-800 transition duration-150 ease-in-out">Remove</button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <div class="mt-8 text-right">
        <p class="text-2xl font-bold text-gray-800">Total: ${total.toFixed(2)}</p>
        <button class="mt-6 px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-200 ease-in-out">
          Proceed to Checkout
        </button>
      </div>
    {:else}
      <div class="text-center">
        <p class="text-xl text-gray-700">Your cart is empty.</p>
        <a href="/products" class="mt-8 inline-block px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-200 ease-in-out">
          Continue Shopping
        </a>
      </div>
    {/if}
  </div>
</section>