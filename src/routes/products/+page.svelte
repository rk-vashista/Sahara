<script>
    import { addToCart } from "$lib/cartStore";
    import { ShoppingCart } from 'lucide-svelte';
    import { fade, fly } from 'svelte/transition';

    export let data;
    const { products } = data;
</script>

<section class="py-16 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 ease-in-out">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-12 text-center" in:fade={{ duration: 300, delay: 150 }}>
            Our Products
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {#if products && products.length > 0}
                {#each products as product, i (product.id)}
                    <a
                        href={`/products/${product.id}`}
                        in:fly={{ y: 50, duration: 300, delay: i * 100 }}
                        class="block bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
                    >
                        <img
                            src={product.image_url}
                            alt={product.name}
                            class="w-full h-56 object-cover"
                        />
                        <div class="p-6">
                            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                                {product.name}
                            </h3>
                            <p class="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2">
                                {product.description}
                            </p>
                            <div class="flex justify-between items-center">
                                <span class="text-2xl font-bold text-blue-700 dark:text-blue-400">
                                    ${product.price}
                                </span>
                                <button
                                    on:click={(event) => {
                                        event.preventDefault();
                                        addToCart({ ...product, quantity: 1 });
                                    }}
                                    class="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-300 ease-in-out flex items-center"
                                >
                                    Add to Cart
                                    <ShoppingCart class="ml-2 h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </a>
                {/each}
            {:else}
                <p class="text-center text-gray-600 dark:text-gray-400 col-span-full">No products available.</p>
            {/if}
        </div>
    </div>
</section>

<style>
    /* Add any additional styles here */
</style>