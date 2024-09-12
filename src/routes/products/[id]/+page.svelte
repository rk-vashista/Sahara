<script>
    import { addToCart } from "$lib/cartStore";
    import { ShoppingCart } from 'lucide-svelte';
    import { fade, fly } from 'svelte/transition';

    export let data;
    let product = data?.product;
</script>

{#if product}
    <section class="py-16 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 ease-in-out">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div in:fade={{ duration: 300 }} class="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform hover:shadow-2xl transition-all duration-300 ease-in-out">
                <div class="md:flex">
                    <div class="md:flex-shrink-0">
                        <img
                            src={product.image_url}
                            alt={product.name}
                            class="h-48 w-full object-cover md:h-full md:w-48"
                        />
                    </div>
                    <div class="p-8">
                        <h2 in:fly={{ y: 20, duration: 300, delay: 150 }} class="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">{product.name}</h2>
                        <p in:fly={{ y: 20, duration: 300, delay: 300 }} class="text-gray-600 dark:text-gray-400 text-lg mb-6">{product.description}</p>
                        <div class="flex justify-between items-center">
                            <span in:fly={{ y: 20, duration: 300, delay: 450 }} class="text-3xl font-bold text-blue-700 dark:text-blue-400">${product.price}</span>
                            <button
                                on:click={() => addToCart({ ...product, quantity: 1 })}
                                in:fly={{ y: 20, duration: 300, delay: 600 }}
                                class="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-md transform hover:scale-105 hover:shadow-xl focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out dark:from-blue-400 dark:to-purple-500 dark:hover:from-blue-500 dark:hover:to-purple-600 flex items-center"
                            >
                                Add to Cart
                                <ShoppingCart class="ml-2 h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
{:else}
    <section class="py-16 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 text-center transition-colors duration-300 ease-in-out">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mb-6">Product Not Found</h2>
            <p class="text-gray-600 dark:text-gray-400 text-lg">We couldn't find the product you are looking for.</p>
        </div>
    </section>
{/if}

<style>
    /* Add any additional styles here */
</style>