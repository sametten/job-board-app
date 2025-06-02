import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Prop from '../Prop.vue';

describe('Prop', () => {
    it('renders with icon and text', () => {
        const wrapper = mount(Prop, {
            props: {
                icon: '📍',
                text: 'Remote'
            }
        });

        expect(wrapper.text()).toContain('📍');
        expect(wrapper.text()).toContain('Remote');
    });

    it('renders with only text when no icon provided', () => {
        const wrapper = mount(Prop, {
            props: {
                text: 'Remote'
            }
        });

        expect(wrapper.text()).toContain('Remote');
        expect(wrapper.text()).not.toContain('📍');
    });

    it('applies correct styling classes', () => {
        const wrapper = mount(Prop, {
            props: {
                icon: '📍',
                text: 'Remote'
            }
        });

        const container = wrapper.find('.prop');
        expect(container.exists()).toBe(true);
        expect(container.classes()).toContain('prop');

        const text = wrapper.find('.prop__text');
        expect(text.exists()).toBe(true);
        expect(text.classes()).toContain('prop__text');
    });

    it('applies correct icon styling when provided', () => {
        const wrapper = mount(Prop, {
            props: {
                icon: '📍',
                text: 'Remote'
            }
        });

        const icon = wrapper.find('.prop__icon');
        expect(icon.exists()).toBe(true);
        expect(icon.classes()).toContain('prop__icon');
        expect(icon.text()).toBe('📍');
    });

    it('does not render icon element when no icon provided', () => {
        const wrapper = mount(Prop, {
            props: {
                text: 'Remote'
            }
        });

        const icon = wrapper.find('.prop__icon');
        expect(icon.exists()).toBe(false);
    });
}); 