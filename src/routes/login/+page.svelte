<script>
  let email = '';
  let password = '';

  function handleSubmit() {
      // Handle login logic here
      console.log('Login attempt', { email, password });
  }
</script>

<section class="py-12 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 min-h-[84.05dvh] flex items-center justify-center">
  <div class="container mx-auto px-4 max-w-md">
      <div class="bg-white shadow-lg rounded-lg p-8 transition duration-500 transform hover:scale-105">
          <h2 class="text-4xl font-extrabold mb-8 text-center text-gray-800">Welcome Back</h2>
          <form on:submit|preventDefault={handleSubmit} class="space-y-6">
              <div>
                  <label for="email" class="block text-gray-700 font-bold mb-2">Email</label>
                  <input
                      bind:value={email}
                      class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none shadow-sm transition duration-300"
                      type="email"
                      id="email"
                      placeholder="you@example.com"
                      required
                  />
              </div>
              <div>
                  <label for="password" class="block text-gray-700 font-bold mb-2">Password</label>
                  <input
                      bind:value={password}
                      class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none shadow-sm transition duration-300"
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      required
                  />
              </div>
              <div class="flex items-center justify-between">
                  <button
                      class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full transition duration-300 transform hover:scale-105"
                      type="submit"
                  >
                      Sign In
                  </button>
              </div>
              <div class="text-center mt-4">
                  <a href="/signup" class="text-indigo-500 hover:text-indigo-600 font-bold text-sm transition duration-300">Need an account?</a>
              </div>
          </form>
      </div>
  </div>
</section>

<style>
  @import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

</style>
