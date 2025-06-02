<script setup lang="ts">
/**
 * Props for the Prop component
 * @interface Props
 * @property {string} icon - The icon to display
 * @property {string} text - The text to display
 */
interface Props {
    icon?: string;
    text: string;
}

defineProps<Props>();
</script>

<template>
    <p class="prop">
        <span class="prop__icon" v-if="icon">{{ icon }}</span>
        <span class="prop__text">{{ text }}</span>
    </p>
</template>

<style scoped lang="css">
@reference 'tailwindcss';

.prop {
    @apply flex items-center text-gray-600;
}

.prop__icon {
    @apply mr-2;
}

.prop__text {
    @apply text-sm;
}
</style>