<script setup lang="ts">
</script>

<template>
    <div class="app">
        <router-view />
    </div>
</template>

<style>
@import "./assets/style.css";
@reference 'tailwindcss';

.app {
    @apply bg-blue-50 min-h-screen;
}
</style>
