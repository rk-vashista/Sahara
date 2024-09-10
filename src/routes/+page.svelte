<script>
    import { ShoppingCart } from 'lucide-svelte';
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
  