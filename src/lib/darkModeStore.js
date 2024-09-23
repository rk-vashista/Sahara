import { writable } from 'svelte/store';

function createDarkModeStore() {
    const { subscribe, set, update } = writable(false);

    return {
        subscribe,
        toggle: () => update(n => !n),
        set
    };
}

export const darkMode = createDarkModeStore();