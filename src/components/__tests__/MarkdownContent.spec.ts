import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MarkdownContent from '../MarkdownContent.vue';

describe('MarkdownContent', () => {
    it('renders basic markdown text', () => {
        const markdown = '**Hello** _World_';
        const wrapper = mount(MarkdownContent, {
            props: {
                content: markdown
            }
        });

        const html = wrapper.html();
        expect(html).toContain('<strong>Hello</strong>');
        expect(html).toContain('<em>World</em>');
    });

    it('renders markdown headings correctly', () => {
        const markdown = '# Title\n## Subtitle\n### Section';
        const wrapper = mount(MarkdownContent, {
            props: {
                content: markdown
            }
        });

        const html = wrapper.html();
        expect(html).toContain('<h1>Title</h1>');
        expect(html).toContain('<h2>Subtitle</h2>');
        expect(html).toContain('<h3>Section</h3>');
    });

    it('renders markdown lists correctly', () => {
        const markdown = '- Item 1\n- Item 2\n- Item 3';
        const wrapper = mount(MarkdownContent, {
            props: {
                content: markdown
            }
        });

        const html = wrapper.html();
        expect(html).toContain('<ul>');
        expect(html).toContain('<li>Item 1</li>');
        expect(html).toContain('<li>Item 2</li>');
        expect(html).toContain('<li>Item 3</li>');
        expect(html).toContain('</ul>');
    });

    it('renders markdown links correctly', () => {
        const markdown = '[Visit Vue.js](https://vuejs.org)';
        const wrapper = mount(MarkdownContent, {
            props: {
                content: markdown
            }
        });

        const html = wrapper.html();
        expect(html).toContain('<a href="https://vuejs.org"');
        expect(html).toContain('>Visit Vue.js</a>');
    });

    it('applies correct styling classes', () => {
        const wrapper = mount(MarkdownContent, {
            props: {
                content: '# Test'
            }
        });

        const article = wrapper.find('article');
        expect(article.exists()).toBe(true);
        expect(article.classes()).toContain('markdown');
    });

    it('handles empty content gracefully', () => {
        const wrapper = mount(MarkdownContent, {
            props: {
                content: ''
            }
        });

        const article = wrapper.find('article');
        expect(article.exists()).toBe(true);
        expect(article.text()).toBe('');
    });
}); 