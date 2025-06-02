import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchBox from '../SearchBox.vue';

describe('SearchBox', () => {
    it('renders with default placeholder', () => {
        const wrapper = mount(SearchBox, {
            props: {
                modelValue: ''
            }
        });

        const input = wrapper.find('input');
        expect(input.exists()).toBe(true);
        expect(input.attributes('placeholder')).toBe('Search...');
    });

    it('renders with custom placeholder', () => {
        const customPlaceholder = 'Search jobs...';
        const wrapper = mount(SearchBox, {
            props: {
                modelValue: '',
                placeholder: customPlaceholder
            }
        });

        const input = wrapper.find('input');
        expect(input.attributes('placeholder')).toBe(customPlaceholder);
    });

    it('updates value on input', async () => {
        const wrapper = mount(SearchBox, {
            props: {
                modelValue: ''
            }
        });

        const input = wrapper.find('input');
        const searchText = 'Vue Developer';
        
        await input.setValue(searchText);
        
        expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        expect(wrapper.emitted('update:modelValue')[0]).toEqual([searchText]);
    });

    it('displays initial value from v-model', () => {
        const initialValue = 'TypeScript';
        const wrapper = mount(SearchBox, {
            props: {
                modelValue: initialValue
            }
        });

        const input = wrapper.find('input');
        expect(input.element.value).toBe(initialValue);
    });

    it('applies correct styling classes', () => {
        const wrapper = mount(SearchBox, {
            props: {
                modelValue: ''
            }
        });

        const container = wrapper.find('.search-box');
        expect(container.exists()).toBe(true);
        expect(container.classes()).toContain('search-box');

        const input = wrapper.find('.search-box__input');
        expect(input.exists()).toBe(true);
        expect(input.classes()).toContain('search-box__input');
    });
}); 