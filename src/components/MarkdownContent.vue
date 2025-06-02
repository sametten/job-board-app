<script setup lang="ts">
/* Markdown */
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
});

/**
 * Props for the MarkdownContent component
 * @interface Props
 * @property {string} content - The markdown content to render
 */
interface Props {
    content: string;
}

const props = defineProps<Props>();

/**
 * Rendered markdown content
 */
const renderedContent = md.render(props.content);
</script>

<template>
    <article class="markdown" v-html="renderedContent"></article>
</template>

<style scoped lang="css">
@reference 'tailwindcss';


.markdown {
    @apply max-w-none;
}

/* Markdown Styling */
.markdown :deep(h2) {
    @apply mt-8 mb-4 pb-2 border-gray-200 border-b font-bold text-gray-900 text-2xl;
}

.markdown :deep(h3) {
    @apply mt-6 mb-3 font-semibold text-gray-800 text-xl;
}

.markdown :deep(ul) {
    @apply space-y-2 mb-6 list-disc list-inside;
}

.markdown :deep(li) {
    @apply ml-4 text-gray-700;
}

.markdown :deep(p) {
    @apply mb-4 text-gray-700 leading-relaxed;
}

.markdown :deep(strong) {
    @apply font-semibold text-gray-900;
}

.markdown :deep(a) {
    @apply text-blue-600 hover:text-blue-800 underline;
}

.markdown :deep(code) {
    @apply bg-gray-100 px-1.5 py-0.5 rounded font-mono text-gray-800 text-sm;
}

.markdown :deep(pre) {
    @apply bg-gray-100 mb-4 p-4 rounded-lg overflow-x-auto;
}

.markdown :deep(blockquote) {
    @apply my-4 pl-4 border-gray-200 border-l-4 text-gray-600 italic;
}
</style>