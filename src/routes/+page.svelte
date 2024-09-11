<script>
  import { ShoppingCart } from 'lucide-svelte';
  import { addToCart } from '$lib/cartStore';

  export let data;
  const { products } = data;

  function handleAddToCart(event, product) {
    event.preventDefault(); // Prevent navigation when clicking the "Add to Cart" button
    addToCart(product);
  }
</script>

<section class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16">
  <div class="container mx-auto px-6 text-center">
    <h1 class="text-5xl font-extrabold mb-4">Welcome to Sahara</h1>
    <p class="text-lg mb-8 max-w-2xl mx-auto">Discover amazing products at unbeatable prices! From electronics to fashion, we've got everything you need.</p>
    <a href="/products" class="inline-flex items-center px-8 py-3 text-lg font-semibold bg-white text-blue-700 rounded-lg shadow-lg hover:bg-gray-100 transition duration-200 ease-in-out">
      Shop Now
      <ShoppingCart class="ml-3 text-blue-700" />
    </a>
  </div>
</section>

<section class="py-16 bg-gray-100">
  <div class="container mx-auto px-6">
    <h2 class="text-3xl font-bold mb-8 text-center">Featured Products</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {#each products as product (product.id)}
        <a href="/products/{product.id}" class="block bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
          <img src={product.image_url} alt={product.name} class="w-full h-48 object-cover" />
          <div class="p-4">
            <h3 class="text-xl font-semibold mb-2">{product.name}</h3>
            <p class="text-gray-600 mb-4">${product.price}</p>
            <button
              on:click={(event) => handleAddToCart(event, product)}
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center"
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