import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import GoBack from '../GoBack.vue';

// Mock router setup
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: { template: '<div>Home</div>' }
        }
    ]
});

describe('GoBack', () => {
    it('renders with default props', () => {
        const wrapper = mount(GoBack, {
            global: {
                plugins: [router]
            }
        });

        expect(wrapper.text()).toContain('Go Back');
        expect(wrapper.find('button').exists()).toBe(true);
    });

    it('renders with custom text', () => {
        const customText = 'Return to Jobs';
        const wrapper = mount(GoBack, {
            props: {
                text: customText
            },
            global: {
                plugins: [router]
            }
        });

        expect(wrapper.text()).toContain(customText);
    });

    it('navigates to specified route on click', async () => {
        const routeName = 'home';
        const wrapper = mount(GoBack, {
            props: {
                to: routeName
            },
            global: {
                plugins: [router]
            }
        });

        const routerPushSpy = vi.spyOn(router, 'push');
        
        await wrapper.find('button').trigger('click');
        
        expect(routerPushSpy).toHaveBeenCalledWith({
            name: routeName
        });
    });

    it('applies correct styling classes', () => {
        const wrapper = mount(GoBack, {
            global: {
                plugins: [router]
            }
        });

        const button = wrapper.find('button');
        expect(button.classes()).toContain('go-back');
    });

    it('includes back arrow in the button text', () => {
        const wrapper = mount(GoBack, {
            global: {
                plugins: [router]
            }
        });

        expect(wrapper.text()).toContain('←');
    });
}); 