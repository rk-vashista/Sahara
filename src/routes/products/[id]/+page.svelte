<script>
    import { addToCart } from "$lib/cartStore"; // Import the cart functions
    
    export let data;  // Data passed from the load function
    let product = data?.product;  // Safely access product data

</script>

{#if product}
    <section class="py-16 bg-gray-50 dark:bg-gray-900">
        <div class="container mx-auto px-6">
            <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
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
                            class="px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-200 ease-in-out dark:bg-blue-500 dark:hover:bg-blue-600"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
{:else}
    <section class="py-16 bg-gray-50 dark:bg-gray-900 text-center">
        <div class="container mx-auto px-6">
            <h2 class="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-6">Product Not Found</h2>
            <p class="text-gray-600 dark:text-gray-400 text-lg">We couldn't find the product you are looking for.</p>
        </div>
    </section>
{/if}