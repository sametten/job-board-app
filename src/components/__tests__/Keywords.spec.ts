import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Keywords from '../Keywords.vue';

describe('Keywords', () => {
    it('renders keywords list correctly', () => {
        const keywords = ['Vue.js', 'TypeScript', 'Tailwind'];
        const wrapper = mount(Keywords, {
            props: {
                keywords
            }
        });

        const keywordElements = wrapper.findAll('.keywords__item');
        expect(keywordElements.length).toBe(keywords.length);
        
        keywords.forEach((keyword, index) => {
            expect(keywordElements[index].text()).toBe(keyword);
        });
    });

    it('renders empty state when no keywords provided', () => {
        const wrapper = mount(Keywords, {
            props: {
                keywords: []
            }
        });

        const keywordElements = wrapper.findAll('.keywords__item');
        expect(keywordElements.length).toBe(0);
        expect(wrapper.find('.keywords').exists()).toBe(true);
    });

    it('applies correct styling classes', () => {
        const keywords = ['Vue.js'];
        const wrapper = mount(Keywords, {
            props: {
                keywords
            }
        });

        // Container styling kontrolü
        const container = wrapper.find('.keywords');
        expect(container.exists()).toBe(true);
        expect(container.classes()).toContain('keywords');

        // Keyword item styling kontrolü
        const keywordElement = wrapper.find('.keywords__item');
        expect(keywordElement.exists()).toBe(true);
        expect(keywordElement.classes()).toContain('keywords__item');
    });

    it('handles special characters in keywords', () => {
        const keywords = ['C++', 'Node.js', 'Vue 3.0+'];
        const wrapper = mount(Keywords, {
            props: {
                keywords
            }
        });

        const keywordElements = wrapper.findAll('.keywords__item');
        keywords.forEach((keyword, index) => {
            expect(keywordElements[index].text()).toBe(keyword);
        });
    });

    it('updates when props change', async () => {
        const initialKeywords = ['Vue.js', 'TypeScript'];
        const wrapper = mount(Keywords, {
            props: {
                keywords: initialKeywords
            }
        });

        const newKeywords = ['React', 'Next.js'];
        await wrapper.setProps({ keywords: newKeywords });

        const keywordElements = wrapper.findAll('.keywords__item');
        expect(keywordElements.length).toBe(newKeywords.length);
        newKeywords.forEach((keyword, index) => {
            expect(keywordElements[index].text()).toBe(keyword);
        });
    });
});
