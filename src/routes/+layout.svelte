<script>
  import { page } from '$app/stores';
  import { ShoppingCart } from 'lucide-svelte';
  import cartStore, { cartItemCount } from '$lib/cartStore';
  import { user, logOut } from '$lib/firebase';
  import { darkMode } from '$lib/darkModeStore';
  import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';
  import { onMount } from 'svelte';
  import "../app.css";

  async function handleLogout() {
    try {
      await logOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  onMount(() => {
    // Check for user's preference in localStorage
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      darkMode.set(JSON.parse(savedDarkMode));
    } else {
      // Check for system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      darkMode.set(prefersDark);
    }

    // Subscribe to changes and update localStorage
    const unsubscribe = darkMode.subscribe(value => {
      localStorage.setItem('darkMode', JSON.stringify(value));
      if (value) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });

    return () => {
      unsubscribe();
    };
  });
</script>

<div class="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
  <header class="flex justify-between items-center p-6 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-200">
    <a href="/" class="text-3xl font-extrabold text-blue-700 dark:text-blue-400 tracking-wide">Sahara</a>
    <nav class="flex items-center space-x-6">
      <a href="/products" class="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Products</a>
      <a href="/cart" class="relative hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
        <ShoppingCart class="text-gray-700 dark:text-gray-300" />
        {#if $cartItemCount > 0}
          <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[1.5rem] text-center">
            {$cartItemCount}
          </span>
        {/if}
      </a>
      {#if !$user}
        <a href="/login" class="px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-150 ease-in-out">Login</a>
        <a href="/signup" class="px-4 py-2 text-sm font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition duration-150 ease-in-out">Sign Up</a>
      {:else}
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Welcome, {$user.email}</span>
        <button on:click={handleLogout} class="px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-150 ease-in-out">Logout</button>
      {/if}
      <DarkModeToggle />
    </nav>
  </header>

  <main class="flex-grow bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <slot />
  </main>

  <footer class="bg-gray-900 dark:bg-gray-800 text-gray-400 dark:text-gray-300 py-8 transition-colors duration-200">
    <div class="container mx-auto px-4 text-center">
      <p>&copy; 2023 Sahara. All rights reserved.</p>
    </div>
  </footer>
</div>