<script>
  import { ShoppingCart, Sun, Moon } from 'lucide-svelte';
  import { cartItemCount } from '$lib/cartStore';
  import { user, logOut } from '$lib/firebase';
  import { darkMode } from '$lib/darkModeStore';
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
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      darkMode.set(JSON.parse(savedDarkMode));
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      darkMode.set(prefersDark);
    }

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

<div class="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 ease-in-out">
  <header class="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-lg transition-colors duration-300 ease-in-out">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <a href="/" class="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 hover:text-blue-600 dark:hover:text-purple-400 transition-colors duration-300">
            Sahara
          </a>
        </div>
        <nav class="hidden md:flex space-x-10">
          <a href="/products" class="text-base font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-purple-400 transition-colors duration-300 ease-in-out">
            Products
          </a>
          <a href="/cart" class="relative text-base font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-purple-400 transition-colors duration-300 ease-in-out">
            <ShoppingCart class="inline-block h-5 w-5" />
            {#if $cartItemCount > 0}
              <span class="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-1 min-w-[1.5rem] text-center shadow-md">
                {$cartItemCount}
              </span>
            {/if}
          </a>
        </nav>
        <div class="flex items-center space-x-6"> <!-- Reduced space between elements -->
          {#if !$user}
            <div class="relative group">
              <button class="whitespace-nowrap text-base font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-purple-400 transition-colors duration-300 ease-in-out">
                Account
              </button>
              <div class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50 hidden group-hover:flex flex-col"> <!-- Adjusted hover -->
                <a href="/login" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Log in</a>
                <a href="/signup" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Sign up</a>
              </div>
            </div>
          {:else}
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Welcome, {$user.email}</span>
            <button on:click={handleLogout} class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 ease-in-out">
              Logout
            </button>
          {/if}
          <button on:click={() => darkMode.set(!$darkMode)} class="ml-6 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
            {#if $darkMode}
              <Sun class="h-5 w-5 text-yellow-400" />
            {:else}
              <Moon class="h-5 w-5 text-gray-600" />
            {/if}
          </button>
        </div>
      </div>
    </div>
  </header>

  <main class="flex-grow bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 ease-in-out">
    <slot />
  </main>

  <footer class="bg-gray-900 dark:bg-gray-800 text-gray-400 dark:text-gray-300 py-8 transition-colors duration-300 ease-in-out border-t border-gray-700 dark:border-gray-600">
    <div class="container mx-auto px-4 text-center">
      <p>&copy; 2024 Sahara. All rights reserved.</p>
    </div>
  </footer>
</div>

<style>
  .group:hover .group-hover\:flex {
    display: flex;
  }
</style>
