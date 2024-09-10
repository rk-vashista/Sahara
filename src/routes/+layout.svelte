<script>
    import { page } from '$app/stores';
    import { ShoppingCart } from 'lucide-svelte';
    import "../app.css";
  </script>
  
  <div class="flex flex-col min-h-screen bg-gray-50">
    <header class="flex justify-between items-center p-6 bg-white shadow-md sticky top-0 z-50">
      <a href="/" class="text-3xl font-extrabold text-blue-700 tracking-wide">Sahara</a>
      <nav class="flex items-center space-x-6">
        <a href="/products" class="text-lg font-medium hover:text-blue-600 transition-colors">Products</a>
        <a href="/cart" class="relative hover:text-blue-600 transition-colors">
          <ShoppingCart />
          <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">3</span> <!-- Example for cart count -->
        </a>
        {#if !$page.data.user}
          <a href="/login" class="px-4 py-2 text-sm font-semibold text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-blue-700 transition duration-150 ease-in-out">Login</a>
          <a href="/signup" class="px-4 py-2 text-sm font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition duration-150 ease-in-out">Sign Up</a>
        {:else}
          <button class="px-4 py-2 text-sm font-semibold text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-blue-700 transition duration-150 ease-in-out">Logout</button>
        {/if}
      </nav>
    </header>
  
    <main class="flex-grow">
      <slot />
    </main>
  
    <footer class="bg-gray-900 text-gray-400 py-8">
      <div class="container mx-auto px-4 text-center">
        <p>&copy; 2023 Sahara. All rights reserved.</p>
      </div>
    </footer>
  </div>
  
 
  