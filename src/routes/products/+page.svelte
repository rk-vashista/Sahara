<script>
    // Import the addToCart function from your store
    import { addToCart } from "$lib/cartStore";

    // Debug log to check the products in the frontend
    export let data;
    const { products } = data;
</script>

<section class="py-16 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-6">
        <h2 class="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-12 text-center">Our Products</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {#if products && products.length > 0}
                {#each products as product (product.id)}
                    <a
                        href={`/products/${product.id}`}
                        class="block bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out"
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
                            <p class="text-gray-600 dark:text-gray-400 mb-6">{product.description}</p>
                            <div class="flex justify-between items-center">
                                <span class="text-2xl font-bold text-blue-700 dark:text-blue-400">
                                    ${product.price}
                                </span>
                                <button
                                    on:click={(event) => {
                                        event.preventDefault();
                                        addToCart({ ...product, quantity: 1 });
                                    }}
                                    class="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-200 ease-in-out dark:bg-blue-500 dark:hover:bg-blue-600"
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