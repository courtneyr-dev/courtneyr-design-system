import '../tokens/tokens.css';
import '../components/components.css';
import '../stories/foundations.css';
import { WCAG_TAGS } from './a11y-rules.js';

/** @type {import('@storybook/html-vite').Preview} */
export default {
  parameters: {
    layout: 'padded',
    a11y: {
      test: 'error',
      options: { runOnly: { type: 'tag', values: WCAG_TAGS } },
    },
  },
};
