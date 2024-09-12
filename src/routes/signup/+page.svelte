<script lang="ts">
    import { signUp } from "$lib/firebase";
    import { goto } from "$app/navigation";
    import { fade, fly } from "svelte/transition";

    let email: string = "";
    let password: string = "";
    let confirmPassword: string = "";
    let error: string | null = null;
    let loading: boolean = false;

    async function handleSubmit() {
        error = null;

        if (password !== confirmPassword) {
            error = "Passwords do not match";
            return;
        }

        try {
            loading = true;
            await signUp(email, password);
            goto("/");
        } catch (err) {
            if (err instanceof Error) {
                error = err.message;
            } else {
                error = "An unknown error occurred";
            }
        } finally {
            loading = false;
        }
    }
</script>

<div
    class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
>
    <div class="max-w-md w-full space-y-8" in:fade={{ duration: 300, delay: 300 }}>
        <div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                Create a new account
            </h2>
        </div>
        <form class="mt-8 space-y-6" on:submit|preventDefault={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div class="rounded-md shadow-sm -space-y-px">
                <div>
                    <label for="email-address" class="sr-only">Email address</label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        autocomplete="email"
                        required
                        bind:value={email}
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors duration-300"
                        placeholder="Email address"
                    />
                </div>
                <div>
                    <label for="password" class="sr-only">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autocomplete="new-password"
                        required
                        bind:value={password}
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors duration-300"
                        placeholder="Password"
                    />
                </div>
                <div>
                    <label for="confirm-password" class="sr-only">Confirm Password</label>
                    <input
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        required
                        bind:value={confirmPassword}
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors duration-300"
                        placeholder="Confirm Password"
                    />
                </div>
            </div>

            {#if error}
                <div class="text-red-500 text-sm" in:fly={{ y: 20, duration: 300 }}>{error}</div>
            {/if}

            <div>
                <button
                    type="submit"
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    {#if loading}
                        <svg
                            class="animate-spin h-5 w-5 mr-3 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                            ></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                        </svg>
                    {/if}
                    Sign up
                </button>
            </div>
        </form>
        <div class="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account? <a
                href="/login"
                class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >Log in</a
            >
        </div>
    </div>
</div>

<style>
    /* Add any additional styles here */
</style>
