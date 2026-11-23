export const AA_NORMAL = 4.5;
export const AA_LARGE = 3;

function channels(hex) {
  const h = hex.slice(1);
  const full = h.length <= 4 ? [...h].map((c) => c + c).join('') : h;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
}

function luminance(hex) {
  const [r, g, b] = channels(hex).map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function isOpaqueHex(value) {
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value);
}

export function contrastRatio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export function contrastAgainst(background, tokens) {
  const rows = new Map();
  for (const t of tokens) {
    if (!isOpaqueHex(t.resolved) || t.resolved.toLowerCase() === background.toLowerCase()) continue;
    const hex = t.resolved.toLowerCase();
    if (!rows.has(hex)) rows.set(hex, { hex, names: [], ratio: contrastRatio(hex, background) });
    rows.get(hex).names.push(t.name);
  }
  return [...rows.values()]
    .map((r) => ({ ...r, normal: r.ratio >= AA_NORMAL, large: r.ratio >= AA_LARGE }))
    .sort((a, b) => b.ratio - a.ratio);
}
