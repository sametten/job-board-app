<script setup lang="ts">
/**
 * Props for the Keywords component
 * @interface Props
 * @property {string[]} keywords - Array of keywords to display
 */
interface Props {
    keywords: string[];
}

defineProps<Props>();
</script>

<template>
    <div class="keywords">
        <span v-for="keyword in keywords" :key="keyword" class="keywords__item">
            {{ keyword }}
        </span>
    </div>
</template>

<style scoped lang="css">
@reference 'tailwindcss';

.keywords {
    @apply flex flex-wrap gap-2;
}

.keywords__item {
    @apply bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-gray-700 text-sm transition-colors duration-200;
}
</style>