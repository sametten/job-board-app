import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import JobCard from '../JobCard.vue';
import type { Job } from '@/types/job';

// Mock router setup
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/job/:id',
            name: 'job-detail',
            component: { template: '<div>Job Detail</div>' }
        }
    ]
});

// Mock job data
const mockJob: Job = {
    id: '1',
    title: 'Senior Vue.js Developer',
    company: 'Tech Corp',
    location: 'Remote',
    category: 'Frontend',
    type: 'Full-time',
    description: 'Looking for an experienced Vue.js developer...',
    requirements: ['5+ years experience', 'Vue.js', 'TypeScript'],
    keywords: ['Vue.js', 'TypeScript', 'Frontend']
};

describe('JobCard', () => {
    it('renders job information correctly', () => {
        const wrapper = mount(JobCard, {
            props: {
                job: mockJob
            },
            global: {
                plugins: [router]
            }
        });

        expect(wrapper.text()).toContain(mockJob.title);
        expect(wrapper.text()).toContain(mockJob.location);
        expect(wrapper.text()).toContain(mockJob.category);
    });

    it('renders Prop components with correct data', () => {
        const wrapper = mount(JobCard, {
            props: {
                job: mockJob
            },
            global: {
                plugins: [router]
            }
        });

        const props = wrapper.findAll('.prop');
        expect(props.length).toBe(2); // Location and Category props

        const locationProp = props[0];
        const categoryProp = props[1];

        expect(locationProp.text()).toContain(mockJob.location);
        expect(categoryProp.text()).toContain(mockJob.category);
    });

    it('renders Keywords component with job keywords', () => {
        const wrapper = mount(JobCard, {
            props: {
                job: mockJob
            },
            global: {
                plugins: [router]
            }
        });

        const keywords = wrapper.find('.job-card__keywords');
        expect(keywords.exists()).toBe(true);
        mockJob.keywords.forEach(keyword => {
            expect(keywords.text()).toContain(keyword);
        });
    });

    it('navigates to job detail page on click', async () => {
        const wrapper = mount(JobCard, {
            props: {
                job: mockJob
            },
            global: {
                plugins: [router]
            }
        });

        const routerPushSpy = vi.spyOn(router, 'push');
        await wrapper.find('.job-card__link').trigger('click');

        expect(routerPushSpy).toHaveBeenCalledWith({
            name: 'job-detail',
            params: { id: mockJob.id }
        });
    });

    it('applies correct styling classes', () => {
        const wrapper = mount(JobCard, {
            props: {
                job: mockJob
            },
            global: {
                plugins: [router]
            }
        });

        const card = wrapper.find('.job-card');
        expect(card.exists()).toBe(true);
        expect(card.classes()).toContain('job-card');

        const link = wrapper.find('.job-card__link');
        expect(link.exists()).toBe(true);
        expect(link.classes()).toContain('job-card__link');

        const title = wrapper.find('.job-card__title');
        expect(title.exists()).toBe(true);
        expect(title.classes()).toContain('job-card__title');
    });
}); 