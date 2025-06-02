<script setup lang="ts">
import Prop from './Prop.vue';
import Keywords from './Keywords.vue';
import type { Job } from '@/types/job';

/**
 * Props for the JobCard component
 * @interface Props
 * @property {Job} job - The job data to display
 */
interface Props {
    job: Job;
}

defineProps<Props>();
</script>

<template>
    <div class="job-card">
        <router-link :to="{ name: 'job-detail', params: { id: job.id } }" class="job-card__link">
            <h2 class="job-card__title">{{ job.title }}</h2>
            <div class="job-card__details">
                <Prop icon="📍" :text="job.location" />
                <Prop icon="🏢" :text="job.category" />
            </div>
            <div class="job-card__keywords">
                <Keywords :keywords="job.keywords" />
            </div>
        </router-link>
    </div>
</template>

<style scoped lang="css">
@reference 'tailwindcss';

.job-card {
    @apply bg-white shadow-sm hover:shadow-md p-6 rounded-lg transition-shadow duration-200;
}

.job-card__link {
    @apply block;
}

.job-card__title {
    @apply font-semibold text-gray-900 hover:text-blue-600 text-xl transition-colors;
}

.job-card__details {
    @apply space-y-1 mt-3 mb-4;
}

.job-card__keywords {
    @apply mt-4 pt-4 border-gray-100 border-t;
}
</style>