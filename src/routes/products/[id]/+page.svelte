<script>
    import { addToCart } from "$lib/cartStore"; // Import the cart functions

    export let data;  // Data passed from the load function
    let product = data?.product;  // Safely access product data
</script>

{#if product}
    <section class="py-16 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 ease-in-out">
        <div class="container mx-auto px-6">
            <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform hover:shadow-2xl transition-all duration-300 ease-in-out">
                <img
                    src={`https://via.placeholder.com/600x400?text=Product+${product.id}`}
                    alt={product.name}
                    class="w-full h-96 object-cover transition-transform duration-500 hover:scale-105"
                />
                <div class="p-8">
                    <h2 class="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-6">{product.name}</h2>
                    <p class="text-gray-600 dark:text-gray-400 text-lg mb-8">{product.description}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-3xl font-bold text-blue-700 dark:text-blue-400">${product.price}</span>
                        <button
                            on:click={() => addToCart({ ...product, quantity: 1 })}
                            class="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md transform hover:scale-105 hover:shadow-xl focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out dark:from-blue-400 dark:to-purple-500 dark:hover:bg-gradient-to-l"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
{:else}
    <section class="py-16 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 text-center transition-colors duration-300 ease-in-out">
        <div class="container mx-auto px-6">
            <h2 class="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-6">Product Not Found</h2>
            <p class="text-gray-600 dark:text-gray-400 text-lg">We couldn't find the product you are looking for.</p>
        </div>
    </section>
{/if}

<style>
    .hover\:shadow-2xl:hover {
        box-shadow: 0 20px 30px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 255, 0.2);
    }

    .hover\:scale-105:hover {
        transform: scale(1.05);
    }

    .dark:hover\:shadow-xl:hover {
        box-shadow: 0 20px 30px rgba(0, 0, 0, 0.5), 0 10px 20px rgba(0, 0, 255, 0.4);
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
</style>
