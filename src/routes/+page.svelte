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

<section class="bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-20 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800">
  <div class="container mx-auto px-8 text-center">
    <h1 class="text-6xl font-bold mb-6 tracking-tight">Welcome to Sahara</h1>
    <p class="text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
      Discover amazing products at unbeatable prices! From electronics to fashion, we've got everything you need.
    </p>
    <a href="/products" class="inline-flex items-center px-10 py-4 text-lg font-medium bg-white text-blue-700 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
      Shop Now
      <ShoppingCart class="ml-3 text-blue-700 dark:text-white" />
    </a>
  </div>
</section>

<section class="py-20 bg-gray-100 dark:bg-gray-900">
  <div class="container mx-auto px-6">
    <h2 class="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-gray-100 tracking-tight">
      Featured Products
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
      {#each products as product (product.id)}
        <a href="/products/{product.id}" class="block bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <img src={product.image_url} alt={product.name} class="w-full h-56 object-cover rounded-t-lg" />
          <div class="p-6">
            <h3 class="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-100">{product.name}</h3>
            <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">${product.price}</p>
            <button
              on:click={(event) => handleAddToCart(event, product)}
              class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-full hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center dark:bg-blue-500 dark:hover:bg-blue-600"
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
