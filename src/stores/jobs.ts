import { defineStore } from 'pinia'
import type { Job } from '@/types/job'
import axios from 'axios'

/**
 * State interface for the jobs store
 * @interface JobsState
 * @property {Job[]} jobs - Array of job objects
 * @property {boolean} loading - Flag indicating if jobs are being loaded
 * @property {string | null} error - Error message if job loading fails
 */
interface JobsState {
    jobs: Job[]
    loading: boolean
    error: string | null
}

/**
 * Jobs store
 * @function useJobsStore
 * @returns {JobsState} - The jobs store
 */
export const useJobsStore = defineStore('jobs', {
    state: (): JobsState => ({
        jobs: [],
        loading: false,
        error: null
    }),

    getters: {
        getJobs: (state) => state.jobs,
        isLoading: (state) => state.loading,
        hasError: (state) => state.error !== null,
        getError: (state) => state.error
    },

    actions: {
        async fetchJobs() {
            this.loading = true
            this.error = null
            
            try {
                const response = await axios.get('/src/data/jobs.json')
                this.jobs = response.data.jobs
            } catch (error) {
                this.error = 'Failed to load jobs'
                console.error('Error fetching jobs:', error)
            } finally {
                this.loading = false
            }
        }
    }
}) 