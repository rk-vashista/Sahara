<script lang="ts">
    import { ShoppingCart, Sun, Moon, User } from "lucide-svelte";
    import { cartItemCount } from "$lib/cartStore";
    import { user, logOut } from "$lib/firebase";
    import { darkMode } from "$lib/darkModeStore";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation"; // For internal navigation
    import "../app.css";

    let isDarkMode = false;

    async function handleLogout() {
        try {
            await logOut();
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }

    function toggleDarkMode() {
        darkMode.set(!isDarkMode);
    }

    onMount(() => {
        const savedDarkMode = localStorage.getItem("darkMode");
        if (savedDarkMode) {
            darkMode.set(JSON.parse(savedDarkMode));
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            darkMode.set(prefersDark);
        }

        const unsubscribe = darkMode.subscribe((value: boolean) => {
            isDarkMode = value;
            localStorage.setItem("darkMode", JSON.stringify(value));
            if (value) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        });

        return () => {
            unsubscribe();
        };
    });
</script>

<div
    class="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 ease-in-out"
>
    <header class="bg-white dark:bg-gray-900 shadow-lg transition-colors duration-300 ease-in-out">
        <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
            <!-- Left Side: Logo and Website Name -->
            <div class="flex items-center space-x-2 cursor-pointer" on:click={() => goto("/")}>
                <img src="SAHRA_LOGO.png" alt="Logo" class="h-8 w-8" />
                <div class="text-xl font-bold text-gray-800 dark:text-gray-200">
                    Sahara
                </div>
            </div>

            <!-- Right Side: Icons and Links -->
            <div class="flex items-center space-x-6">
                <!-- Products Link -->
                <a href="/products" class="text-gray-800 dark:text-gray-200 hover:underline">
                    Products
                </a>

                <!-- Cart Icon -->
                <div class="relative cursor-pointer" on:click={() => goto("/cart")}>
                    <ShoppingCart class="inline-block h-6 w-6 text-gray-800 dark:text-gray-200" />
                    {#if $cartItemCount > 0}
                        <span
                            class="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[1.5rem] text-center shadow-md"
                        >
                            {$cartItemCount}
                        </span>
                    {/if}
                </div>

                <!-- Account Section -->
                <div class="flex items-center space-x-2">
                    {#if $user}
                        <User
                            class="inline-block h-6 w-6 text-gray-800 dark:text-gray-200 cursor-pointer"
                            on:click={() => goto("/account")}
                        />
                        <button
                            on:click={handleLogout}
                            class="text-sm text-gray-800 dark:text-gray-200 hover:underline"
                        >
                            Logout
                        </button>
                    {:else}
                        <button
                            class="text-sm text-gray-800 dark:text-gray-200 hover:underline"
                            on:click={() => goto("/login")}
                        >
                            Login
                        </button>
                    {/if}
                </div>

                <!-- Dark/Light Mode Switch -->
                <button
                    on:click={toggleDarkMode}
                    aria-label="Toggle Dark Mode"
                    class="focus:outline-none"
                >
                    {#if isDarkMode}
                        <Moon class="h-6 w-6 text-gray-800 dark:text-gray-200" />
                    {:else}
                        <Sun class="h-6 w-6 text-gray-800 dark:text-gray-200" />
                    {/if}
                </button>
            </div>
        </nav>
    </header>

    <main
        class="flex-grow bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 ease-in-out"
    >
        <slot />
    </main>

    <footer
        class="bg-gray-900 dark:bg-gray-800 text-gray-400 dark:text-gray-300 py-8 transition-colors duration-300 ease-in-out border-t border-gray-700 dark:border-gray-600"
    >
        <div class="container mx-auto px-4 text-center">
            <p>&copy; 2024 Sahara. All rights reserved.</p>
        </div>
    </footer>
</div>