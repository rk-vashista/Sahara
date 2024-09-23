<script>
    import cartStore from "$lib/cartStore";
    import { onDestroy } from "svelte";
    import { ShoppingCart, Trash2 } from "lucide-svelte";
    import { fade, fly } from "svelte/transition";

    let cartItems = [];

    const unsubscribe = cartStore.subscribe((value) => {
        cartItems = value;
    });

    onDestroy(() => {
        unsubscribe();
    });

    $: total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    function removeItem(id) {
        cartStore.update((items) => {
            return items
                .map((item) => {
                    if (item.id === id) {
                        if (item.quantity > 1) {
                            return { ...item, quantity: item.quantity - 1 };
                        } else {
                            return null;
                        }
                    }
                    return item;
                })
                .filter((item) => item !== null);
        });
    }
</script>

<section class="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ease-in-out">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
            in:fade={{ duration: 300 }}
            class="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-12 text-center"
        >
            Your Cart
        </h2>

        {#if cartItems.length > 0}
            <div
                in:fade={{ duration: 300, delay: 150 }}
                class="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden"
            >
                <table class="w-full text-left">
                    <thead class="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th
                                class="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300 border-b dark:border-gray-600"
                                >Product</th
                            >
                            <th
                                class="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300 border-b dark:border-gray-600"
                                >Price</th
                            >
                            <th
                                class="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300 border-b dark:border-gray-600"
                                >Quantity</th
                            >
                            <th
                                class="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300 border-b dark:border-gray-600"
                                >Total</th
                            >
                            <th class="px-6 py-4 border-b dark:border-gray-600"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each cartItems as item, i (item.id)}
                            <tr
                                in:fly={{ y: 20, duration: 300, delay: i * 100 }}
                                class="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                            >
                                <td class="px-6 py-4 text-gray-800 dark:text-gray-100"
                                    >{item.name}</td
                                >
                                <td class="px-6 py-4 text-gray-600 dark:text-gray-400"
                                    >${item.price}</td
                                >
                                <td class="px-6 py-4 text-gray-600 dark:text-gray-400"
                                    >{item.quantity}</td
                                >
                                <td class="px-6 py-4 text-gray-800 dark:text-gray-100 font-bold"
                                    >${item.price * item.quantity}</td
                                >
                                <td class="px-6 py-4">
                                    <button
                                        on:click={() => removeItem(item.id)}
                                        class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-600 transition duration-150 ease-in-out transform hover:scale-110"
                                    >
                                        <Trash2 class="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
            <div
                in:fly={{ y: 20, duration: 300, delay: cartItems.length * 100 }}
                class="mt-8 text-right"
            >
                <p class="text-2xl font-bold text-gray-800 dark:text-gray-100">Total: ${total}</p>
                <button
                    class="mt-6 px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md transform hover:scale-105 hover:shadow-lg focus:ring-4 focus:ring-blue-300 transition duration-200 ease-in-out dark:from-blue-500 dark:to-purple-500 dark:hover:from-purple-500 dark:hover:to-blue-500 flex items-center justify-center"
                >
                    Proceed to Checkout
                    <ShoppingCart class="ml-2 h-5 w-5" />
                </button>
            </div>
        {:else}
            <div in:fade={{ duration: 300 }} class="text-center">
                <p class="text-xl text-gray-700 dark:text-gray-300">Your cart is empty.</p>
                <a
                    href="/products"
                    class="mt-8 inline-block px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 transition duration-200 ease-in-out dark:from-blue-500 dark:to-purple-500"
                >
                    Continue Shopping
                </a>
            </div>
        {/if}
    </div>
</section>

<style>
    /* Add any additional styles here */
</style>
