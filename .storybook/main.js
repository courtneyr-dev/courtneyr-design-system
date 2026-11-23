/** @type {import('@storybook/html-vite').StorybookConfig} */
export default {
  framework: '@storybook/html-vite',
  stories: ['../stories/**/*.stories.js'],
  addons: ['@storybook/addon-a11y'],
  refs: {},
  core: { disableTelemetry: true },
};
