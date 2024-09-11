<script>
    import { darkMode } from '$lib/darkModeStore';
    import { Moon, Sun } from 'lucide-svelte';
</script>

<button
    on:click={() => darkMode.toggle()}
    class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
    aria-label="Toggle dark mode"
>
    {#if $darkMode}
        <Sun class="w-5 h-5 text-yellow-400" />
    {:else}
        <Moon class="w-5 h-5 text-gray-600" />
    {/if}
</button>