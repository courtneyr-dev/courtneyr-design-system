import componentsMd from '../docs/COMPONENTS.md?raw';
import { documentedComponents } from './lib/foundations.js';
import { escapeHtml, inlineMarkdown } from './lib/html.js';

export default { title: 'Components/Documented classes' };

export const AllComponents = {
  name: 'All documented classes',
  render: () => {
    const sections = documentedComponents(componentsMd)
      .map(
        (c) => `
        <section class="fd-component">
          <h2>${c.heading.startsWith('.') ? `<code>${escapeHtml(c.heading)}</code>` : escapeHtml(c.heading)}</h2>
          <p>${inlineMarkdown(c.summary)}</p>
          ${c.examples
            .map(
              (html) => `
            <div class="fd-example">${html}</div>
            <details><summary>Markup</summary><pre><code>${escapeHtml(html)}</code></pre></details>`,
            )
            .join('')}
        </section>`,
      )
      .join('');
    return `
      <h1>Documented components</h1>
      <p>Each section and example comes from <code>docs/COMPONENTS.md</code>, styled by
      <code>components/components.css</code>.</p>
      ${sections}`;
  },
};
