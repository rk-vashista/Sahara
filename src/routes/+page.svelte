<script>
    import { ShoppingCart, ArrowRight } from "lucide-svelte";
    import { addToCart } from "$lib/cartStore";
    import { darkMode } from "$lib/darkModeStore";
    import { fade, fly } from "svelte/transition";

    export let data;
    const { products } = data;

    function handleAddToCart(event, product) {
        event.preventDefault();
        addToCart(product);
    }
</script>

<section
    class="bg-gradient-to-r from-blue-400 to-indigo-500 dark:from-gray-900 dark:to-gray-800 text-white py-20 md:py-32 transition-colors duration-300"
>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1
            in:fade={{ duration: 1000, delay: 300 }}
            class="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight"
        >
            Welcome to Sahara
        </h1>
        <p
            in:fade={{ duration: 1000, delay: 600 }}
            class="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed"
        >
            Discover amazing products at unbeatable prices! From electronics to fashion, we've got
            everything you need.
        </p>
        <a
            href="/products"
            in:fade={{ duration: 1000, delay: 900 }}
            class="inline-flex items-center px-8 py-3 text-lg font-medium bg-white text-blue-700 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transform hover:scale-105"
        >
            Shop Now
            <ArrowRight class="ml-2 h-5 w-5" />
        </a>
    </div>
</section>

<section class="py-20 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
            class="text-3xl sm:text-4xl font-bold mb-12 text-center text-gray-800 dark:text-gray-100 tracking-tight"
        >
            Featured Products
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {#each products as product, i (product.id)}
                <a
                    href="/products/{product.id}"
                    in:fly={{ y: 50, duration: 500, delay: i * 150 }}
                    class="block bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                >
                    <img
                        src={product.image_url}
                        alt={product.name}
                        class="w-full h-56 object-cover rounded-t-lg"
                    />
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                            {product.name}
                        </h3>
                        <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
                            ${product.price}
                        </p>
                        <button
                            on:click={(event) => handleAddToCart(event, product)}
                            class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-full hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 ease-in-out flex items-center justify-center"
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

<style>
    /* Add any additional styles here */
</style>
