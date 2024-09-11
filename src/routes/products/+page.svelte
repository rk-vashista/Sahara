<script>
    // Import the addToCart function from your store
    import { addToCart } from "$lib/cartStore";

    // Debug log to check the products in the frontend
    export let data;
    const { products } = data;
</script>

<section class="py-16 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 ease-in-out">
    <div class="container mx-auto px-6">
        <h2 class="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-12 text-center">
            Our Products
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {#if products && products.length > 0}
                {#each products as product (product.id)}
                    <a
                        href={`/products/${product.id}`}
                        class="block bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-300 dark:hover:shadow-blue-800 transition duration-300 ease-in-out"
                    >
                        <img
                            src={`https://via.placeholder.com/300x200?text=Product+${product.id}`}
                            alt={product.name}
                            class="w-full h-56 object-cover"
                        />
                        <div class="p-6">
                            <h3 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                                {product.name}
                            </h3>
                            <p class="text-gray-600 dark:text-gray-400 mb-6">
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
                                    class="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:bg-gradient-to-l transform hover:scale-105 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition duration-200 ease-in-out"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </a>
                {/each}
            {:else}
                <p class="text-center text-gray-600 dark:text-gray-400">No products available.</p>
            {/if}
        </div>
    </div>
</section>

<style>
    .hover\:shadow-2xl:hover {
        box-shadow: 0 20px 30px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 255, 0.2);
    }

    .dark\:hover\:shadow-2xl:hover {
        box-shadow: 0 20px 30px rgba(0, 0, 0, 0.5), 0 10px 20px rgba(0, 0, 255, 0.4);
    }

    .hover\:scale-105:hover {
        transform: scale(1.05);
    }

    .transition-colors {
        transition-property: background-color, border-color, color, fill, stroke;
    }

    .bg-gradient-to-br {
        background: linear-gradient(135deg, var(--tw-gradient-stops));
    }

    .bg-gradient-to-l:hover {
        background: linear-gradient(45deg, var(--tw-gradient-stops));
    }

    .transition-all {
        transition-property: all;
    }

    .ease-in-out {
        transition-timing-function: ease-in-out;
    }

    .rounded-lg {
        border-radius: 12px;
    }

    .shadow-lg {
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
    }

    .dark .shadow-lg {
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .dark:hover\:shadow-blue-800:hover {
        box-shadow: 0 20px 30px rgba(0, 0, 0, 0.5), 0 10px 20px rgba(0, 0, 255, 0.4);
    }
</style>
