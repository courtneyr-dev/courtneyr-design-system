import tokensCss from '../tokens/tokens.css?raw';
import { typographyTokens } from './lib/foundations.js';
import { escapeHtml } from './lib/html.js';

export default { title: 'Foundations/Typography' };

const SAMPLES = {
  '--cr-font-display': 'courtneyr.dev',
  '--cr-font-accent': 'Building open source community',
  '--cr-font-body': 'A patient teacher writes for the reader who arrives tired.',
  '--cr-font-mono': 'wp_enqueue_style( "cr-tokens" );',
};

function table(caption, rows) {
  return `
    <table class="fd-table">
      <caption>${caption}</caption>
      <thead><tr><th scope="col">Token</th><th scope="col">Value</th><th scope="col">Sample</th></tr></thead>
      <tbody>${rows.join('')}</tbody>
    </table>`;
}

const row = (t, style, sample) =>
  `<tr><td><code>${t.name}</code></td><td><code>${escapeHtml(t.value)}</code></td>
   <td><span style="display: block; ${style}">${escapeHtml(sample)}</span></td></tr>`;

export const Tokens = {
  render: () => {
    const groups = typographyTokens(tokensCss);
    return `
      <h1>Typography tokens</h1>
      <p>Read from section 3 of <code>tokens/tokens.css</code>. Rock Salt (<code>--cr-font-display</code>) is for
      the wordmark and short display lines only, never body copy, buttons, or metadata.</p>
      ${table('Families', groups.get('font').map((t) => row(t, `font-family: var(${t.name})`, SAMPLES[t.name] ?? t.name)))}
      ${table('Type scale', groups.get('text').map((t) => row(t, `font-size: var(${t.name}); font-family: var(--cr-font-body)`, 'Teach in public')))}
      ${table('Weights', groups.get('weight').map((t) => row(t, `font-weight: var(${t.name}); font-family: var(--cr-font-accent)`, 'Roboto Slab')))}
      ${table('Leading', groups.get('leading').map((t) => row(t, `line-height: var(${t.name}); max-width: 16rem`, 'Two lines of body copy show the space between each line of text.')))}
      ${table('Tracking', groups.get('tracking').map((t) => row(t, `letter-spacing: var(${t.name})`, 'Section eyebrow')))}`;
  },
};
