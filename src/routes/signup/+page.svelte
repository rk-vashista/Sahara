<script>
  let name = '';
  let email = '';
  let password = '';

  function handleSubmit() {
    // Handle sign up logic here
    console.log('Sign up attempt', { name, email, password });
  }
</script>

<section class="min-h-[84.05dvh] flex items-center justify-center bg-gradient-to-r from-blue-400 via-blue-300 to-teal-300">
  <div class="container mx-auto px-4 max-w-md">
    <div class="bg-white shadow-2xl rounded-lg p-8 transition-transform duration-500 ease-in-out transform hover:scale-105">
      <h2 class="text-4xl font-extrabold mb-8 text-center text-gray-800">Join Us</h2>
      <form on:submit|preventDefault={handleSubmit} class="space-y-6">
        <div>
          <label for="name" class="block text-gray-700 font-bold mb-1">Full Name</label>
          <input
            bind:value={name}
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none shadow-sm transition duration-300"
            type="text"
            id="name"
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div>
          <label for="email" class="block text-gray-700 font-bold mb-1">Email</label>
          <input
            bind:value={email}
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none shadow-sm transition duration-300"
            type="email"
            id="email"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label for="password" class="block text-gray-700 font-bold mb-1">Password</label>
          <input
            bind:value={password}
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none shadow-sm transition duration-300"
            type="password"
            id="password"
            placeholder="Create a password"
            required
          />
        </div>

        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full transition duration-300 transform hover:scale-105"
            type="submit"
          >
            Sign Up
          </button>
        </div>

        <div class="text-center">
          <a href="/login" class="text-blue-500 hover:text-blue-600 font-bold text-sm transition duration-300">Already have an account? Log in</a>
        </div>
      </form>
    </div>
  </div>
</section>

<style>
  @import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

  .transition-transform {
    transition: transform 0.6s ease-in-out;
  }
</style>