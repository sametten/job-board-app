<script setup lang="ts">
/**
 * Props for the SearchBox component
 * @interface Props
 * @property {string} modelValue - The search query (v-model)
 * @property {string} [placeholder] - Placeholder text for the search input
 */
interface Props {
    modelValue: string;
    placeholder?: string;
}

/**
 * Emits for the SearchBox component
 */
const emit = defineEmits<{
    'update:modelValue': [value: string]
}>();

const props = withDefaults(defineProps<Props>(), {
    placeholder: 'Search...'
});

/**
 * Handle input changes
 * @param {Event} event - Input event
 */
const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
};
</script>

<template>
    <div class="search-box">
        <input :value="modelValue" @input="handleInput" type="text" :placeholder="props.placeholder"
            class="search-box__input" />
    </div>
</template>

<style scoped lang="css">
@reference 'tailwindcss';

.search-box {
    @apply mb-6;
}

.search-box__input {
    @apply bg-white shadow-sm px-4 py-2 border border-gray-300 focus:border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full;
}
</style>