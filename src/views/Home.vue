<script setup lang="ts">
/* Vue */
import { onMounted, ref, computed } from 'vue';

/* Components */
import JobCard from '@/components/JobCard.vue';
import SearchBox from '@/components/SearchBox.vue';

/* Stores */
import { useJobsStore } from '@/stores/jobs';

/**
 * Jobs store
 * @type {JobsState}
 */
const jobsStore = useJobsStore();

/**
 * Search query
 */
const searchQuery = ref('');

/**
 * Filtered jobs based on search query
 */
const filteredJobs = computed(() => {
    if (!searchQuery.value) return jobsStore.getJobs;

    const query = searchQuery.value.toLowerCase();
    return jobsStore.getJobs.filter(job => {
        const searchableFields = [
            job.title.toLowerCase(),
            job.category.toLowerCase(),
            job.location.toLowerCase(),
            ...job.keywords.map(keyword => keyword.toLowerCase())
        ];

        return searchableFields.some(field => field.includes(query));
    });
});

/**
 * Fetch jobs when the component is mounted
 */
onMounted(() => {
    jobsStore.fetchJobs();
});
</script>

<template>
    <div class="jobs">
        <div class="jobs__search-container">
            <div class="jobs__search-backdrop"></div>
            <div class="jobs__search-wrapper">
                <h1 class="jobs__title">Job Listings</h1>
                <SearchBox v-model="searchQuery" placeholder="Search by title, category, location or keywords..." />
            </div>
        </div>

        <div class="jobs__content">
            <div v-if="jobsStore.isLoading" class="jobs__loading">Loading jobs...</div>
            <div v-else-if="jobsStore.hasError" class="jobs__error">{{ jobsStore.getError }}</div>
            <div v-else class="jobs__list">
                <p v-if="filteredJobs.length === 0" class="jobs__no-results">
                    No jobs found matching your search criteria.
                </p>
                <JobCard v-else v-for="job in filteredJobs" :key="job.id" :job="job" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="css">
@reference 'tailwindcss';

.jobs {
    @apply min-h-screen;
}

.jobs__search-container {
    @apply top-0 z-10 sticky;
}

.jobs__search-backdrop {
    @apply fixed top-0 left-0 right-0 h-[182px] border-b-blue-100 border-b bg-blue-50/10 backdrop-blur-md;
}

.jobs__search-wrapper {
    @apply relative mx-auto px-4 py-8 container;
}

.jobs__title {
    @apply mb-4 font-bold text-gray-900 text-3xl;
}

.jobs__content {
    @apply mx-auto px-4 py-8 container;
}

.jobs__loading {
    @apply text-gray-600;
}

.jobs__error {
    @apply text-red-600;
}

.jobs__no-results {
    @apply py-8 text-gray-600 text-center;
}

.jobs__list {
    @apply space-y-6;
}
</style>