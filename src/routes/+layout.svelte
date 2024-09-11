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

<div class="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300 ease-in-out">
  <header class="flex justify-between items-center p-6 bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50 transition-colors duration-300 ease-in-out">
    <a href="/" class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 hover:text-blue-600 dark:hover:text-purple-400 transition-colors duration-300">
      Sahara
    </a>
    <nav class="flex items-center space-x-6">
      <a href="/products" class="text-lg font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-purple-400 transition-colors duration-300 ease-in-out">
        Products
      </a>
      <a href="/cart" class="relative hover:text-blue-500 dark:hover:text-purple-400 transition-colors duration-300 ease-in-out">
        <ShoppingCart class="text-gray-600 dark:text-gray-300" />
        {#if $cartItemCount > 0}
          <span class="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-1 min-w-[1.5rem] text-center shadow-md">
            {$cartItemCount}
          </span>
        {/if}
      </a>
      {#if !$user}
        <a href="/login" class="px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 ease-in-out">
          Login
        </a>
        <a href="/signup" class="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg hover:bg-gradient-to-r from-blue-700 to-purple-700 transition-all duration-300 ease-in-out">
          Sign Up
        </a>
      {:else}
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Welcome, {$user.email}</span>
        <button on:click={handleLogout} class="px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 ease-in-out">
          Logout
        </button>
      {/if}
      <DarkModeToggle />
    </nav>
  </header>

  <main class="flex-grow bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300 ease-in-out px-6 py-8">
    <slot />
  </main>

  <footer class="bg-gray-900 dark:bg-gray-800 text-gray-400 dark:text-gray-300 py-8 transition-colors duration-300 ease-in-out border-t border-gray-700 dark:border-gray-600">
    <div class="container mx-auto px-4 text-center">
      <p>&copy; 2023 Sahara. All rights reserved.</p>
    </div>
  </footer>
</div>

<style>
  .shadow-lg {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
  }
  
  .rounded-lg {
    border-radius: 12px;
  }

  .transition-colors {
    transition-property: background-color, border-color, color, fill, stroke;
  }

  .transition-all {
    transition-property: all;
  }

  .ease-in-out {
    transition-timing-function: ease-in-out;
  }

  .bg-gradient-to-br {
    background: linear-gradient(135deg, var(--tw-gradient-stops));
  }

  .bg-clip-text {
    background-clip: text;
    -webkit-background-clip: text;
  }
</style>
