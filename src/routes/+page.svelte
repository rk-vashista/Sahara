<script>
  import { ShoppingCart } from 'lucide-svelte';
  import { addToCart } from '$lib/cartStore';
  import { darkMode } from '$lib/darkModeStore';

  export let data;
  const { products } = data;

  function handleAddToCart(event, product) {
    event.preventDefault(); // Prevent navigation when clicking the "Add to Cart" button
    addToCart(product);
  }
</script>

<section class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900">
  <div class="container mx-auto px-6 text-center">
    <h1 class="text-5xl font-extrabold mb-4">Welcome to Sahara</h1>
    <p class="text-lg mb-8 max-w-2xl mx-auto">Discover amazing products at unbeatable prices! From electronics to fashion, we've got everything you need.</p>
    <a href="/products" class="inline-flex items-center px-8 py-3 text-lg font-semibold bg-white text-blue-700 rounded-lg shadow-lg hover:bg-gray-100 transition duration-200 ease-in-out dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
      Shop Now
      <ShoppingCart class="ml-3 text-blue-700 dark:text-white" />
    </a>
  </div>
</section>

<section class="py-16 bg-gray-100 dark:bg-gray-900">
  <div class="container mx-auto px-6">
    <h2 class="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">Featured Products</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {#each products as product (product.id)}
        <a href="/products/{product.id}" class="block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
          <img src={product.image_url} alt={product.name} class="w-full h-48 object-cover" />
          <div class="p-4">
            <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">{product.name}</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">${product.price}</p>
            <button
              on:click={(event) => handleAddToCart(event, product)}
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Add to Cart
              <ShoppingCart class="ml-2 h-5 w-5" />
            </button>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>