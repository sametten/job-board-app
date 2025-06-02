<script setup lang="ts">
/* Vue */
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

/* Components */
import Prop from '@/components/Prop.vue';
import Keywords from '@/components/Keywords.vue';
import MarkdownContent from '@/components/MarkdownContent.vue';
import GoBack from '@/components/GoBack.vue';

/* Stores */
import { useJobsStore } from '@/stores/jobs';

const route = useRoute();
const jobsStore = useJobsStore();

/**
 * Current job ID from route params
 */
const jobId = computed(() => Number(route.params.id));

/**
 * Current job details
 */
const job = computed(() => jobsStore.getJobs.find(job => job.id === jobId.value));

/**
 * Fetch jobs when the component is mounted
 */
onMounted(() => {
    if (jobsStore.getJobs.length === 0) {
        jobsStore.fetchJobs();
    }
});
</script>

<template>
    <div class="job-detail">
        <div v-if="jobsStore.isLoading" class="job-detail__loading">
            Loading job details...
        </div>
        <div v-else-if="jobsStore.hasError" class="job-detail__error">
            {{ jobsStore.getError }}
        </div>
        <div v-else-if="!job" class="job-detail__error">
            Job not found
        </div>
        <div v-else class="job-detail__content">
            <GoBack text="Back to Jobs" />

            <header class="job-detail__header">
                <h1 class="job-detail__title">{{ job.title }}</h1>
                <div class="job-detail__meta">
                    <Prop icon="📍" :text="job.location" />
                    <Prop icon="🏢" :text="job.category" />
                </div>
            </header>

            <div class="job-detail__keywords">
                <Keywords :keywords="job.keywords" />
            </div>

            <div class="job-detail__description">
                <MarkdownContent :content="job.description" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="css">
@reference 'tailwindcss';

.job-detail {
    @apply mx-auto px-4 py-8 container;
}

.job-detail__loading {
    @apply py-8 text-gray-600 text-center;
}

.job-detail__error {
    @apply py-8 text-red-600 text-center;
}

.job-detail__content {
    @apply bg-white shadow-sm mx-auto p-8 rounded-lg max-w-3xl;
}

.job-detail__header {
    @apply mb-6;
}

.job-detail__title {
    @apply mb-4 font-bold text-gray-900 text-3xl;
}

.job-detail__meta {
    @apply flex gap-4;
}

.job-detail__keywords {
    @apply pb-6 border-gray-200 border-b;
}

.job-detail__description {
    @apply pt-6;
}
</style>