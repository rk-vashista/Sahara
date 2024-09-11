<script lang="ts">
  import { logIn } from '$lib/firebase';
  import { goto } from '$app/navigation';

  let email: string = '';
  let password: string = '';
  let error: string | null = null;
  let loading: boolean = false;

  async function handleSubmit() {
      if (loading) return;  // Prevent multiple submissions
      
      loading = true;  // Set loading state
      error = null;  // Clear previous errors
      
      try {
          await logIn(email, password);
          goto('/');
      } catch (err) {
          if (err instanceof Error) {
              error = err.message;
          } else {
              error = 'An unknown error occurred';
          }
      } finally {
          loading = false;  // Reset loading state
      }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
  <div class="max-w-md w-full space-y-8">
      <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              Log in to your account
          </h2>
      </div>
      <form class="mt-8 space-y-6" on:submit|preventDefault={handleSubmit}>
          <input type="hidden" name="remember" value="true">
          <div class="rounded-md shadow-sm -space-y-px">
              <div>
                  <label for="email-address" class="sr-only">Email address</label>
                  <input
                      id="email-address"
                      name="email"
                      type="email"
                      autocomplete="email"
                      required
                      bind:value={email}
                      class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                  >
              </div>
              <div>
                  <label for="password" class="sr-only">Password</label>
                  <input
                      id="password"
                      name="password"
                      type="password"
                      autocomplete="current-password"
                      required
                      bind:value={password}
                      class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                  >
              </div>
          </div>

          {#if error}
              <div class="text-red-500 text-sm">{error}</div>
          {/if}

          <div>
              <button
                  type="submit"
                  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
              >
                  {#if loading}
                      <svg class="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                  {/if}
                  Log in
              </button>
          </div>
      </form>
  </div>
</div>

<style>
  /* Add smooth transitions for background color changes in dark mode */
  .transition-colors {
      transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  }
</style>
