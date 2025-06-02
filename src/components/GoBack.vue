<script setup lang="ts">
/* Vue */
import { useRouter } from 'vue-router';

/**
 * Props for the GoBack component
 * @interface Props
 * @property {string} [text] - The text to display
 * @property {string} [to] - The route name to navigate to
 */
interface Props {
    text?: string;
    to?: string;
}

const props = withDefaults(defineProps<Props>(), {
    text: 'Go Back',
    to: 'home'
});

const router = useRouter();

/**
 * Navigate back to specified route
 */
const goBack = () => {
    router.push({ name: props.to });
};
</script>

<template>
    <button @click="goBack" class="go-back">
        ← {{ text }}
    </button>
</template>

<style scoped lang="css">
@reference 'tailwindcss';

.go-back {
    @apply flex items-center gap-1 -mt-2 mb-4 -ml-2 font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer;
}
</style>