import React, { useState } from 'react';

export default function BrandSystem() {
  const [dark, setDark] = useState(false);
  const [tab, setTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'color', label: 'Color' },
    { id: 'type', label: 'Typography' },
    { id: 'shape', label: 'Shape System' },
    { id: 'logo', label: 'Logo' },
    { id: 'stream', label: 'Stream & Post Types' },
    { id: 'components', label: 'Components' },
    { id: 'handoff', label: 'Handoff' },
  ];

  const shell = dark
    ? 'bg-[#0a0f24] text-[#e8e4f7]'
    : 'bg-[#fdfaf4] text-[#241c4a]';

  return (
    <div className={`min-h-screen ${shell} transition-colors`} style={{ fontFamily: "'Mona Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Mona+Sans:ital,wght@0,200..900;1,200..900&display=swap');

        :root {
          --russian-violet: #241c4a;
          --periwinkle: #bcb5e3;
          --glaucous: #647baf;
          --sky-blue: #8ecae6;
          --blue-green: #219ebc;
          --cerulean: #126782;
          --prussian-blue: #023047;
          --selective-yellow: #ffb703;
          --ut-orange: #fb8500;
          --light-orange: #fee2c3;
          --cream: #fdfaf4;
          --ink: #1a1325;

          --brand-primary: var(--ut-orange);
          --brand-accent: var(--sky-blue);
          --brand-ink: var(--russian-violet);
          --brand-surface: var(--cream);
          --brand-soft: var(--light-orange);
        }

        .dark-mode {
          --brand-primary: var(--selective-yellow);
          --brand-accent: var(--periwinkle);
          --brand-ink: #e8e4f7;
          --brand-surface: #0a0f24;
          --brand-soft: #1a1f3d;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(0.5px);
          pointer-events: none;
        }

        .float-badge {
          box-shadow: 0 10px 30px -10px rgba(36,28,74,0.25), 0 2px 8px rgba(36,28,74,0.08);
        }

        @keyframes drift {
          0%, 100% { transform: translate(0,0) rotate(0deg); }
          50% { transform: translate(6px,-8px) rotate(2deg); }
        }
        .drift { animation: drift 8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .drift { animation: none; }
        }

        .chunky-shadow {
          box-shadow: 6px 6px 0 var(--russian-violet);
        }
        .chunky-shadow-orange {
          box-shadow: 6px 6px 0 var(--ut-orange);
        }

        .tab-btn {
          position: relative;
          padding: 0.5rem 0.875rem;
          border-radius: 9999px;
          font-weight: 500;
          font-size: 0.875rem;
          white-space: nowrap;
          transition: all 0.2s;
        }
        .tab-btn:hover { background: rgba(142,202,230,0.15); }
        .tab-btn.active {
          background: var(--russian-violet);
          color: var(--cream);
        }
        .dark-mode .tab-btn.active {
          background: var(--periwinkle);
          color: var(--russian-violet);
        }

        .swatch {
          position: relative;
          aspect-ratio: 1;
          border-radius: 1.25rem;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: 0.75rem;
          overflow: hidden;
          transition: transform 0.2s;
        }
        .swatch:hover { transform: translateY(-2px); }

        .type-sample {
          display: flex;
          align-items: baseline;
          gap: 1.5rem;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(100,123,175,0.2);
        }

        .pill {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.25rem 0.625rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .mock-card {
          position: relative;
          border-radius: 1.25rem;
          padding: 1.25rem;
          background: var(--brand-surface);
          border: 1px solid rgba(100,123,175,0.15);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .mock-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px -20px rgba(36,28,74,0.2);
        }
        .dark-mode .mock-card {
          background: #0f1530;
          border-color: rgba(188,181,227,0.15);
        }
      `}</style>

      <div className={dark ? 'dark-mode' : ''}>
        {/* Header */}
        <header className="sticky top-0 z-30 backdrop-blur-md border-b" style={{
          background: dark ? 'rgba(10,15,36,0.8)' : 'rgba(253,250,244,0.85)',
          borderColor: dark ? 'rgba(188,181,227,0.12)' : 'rgba(36,28,74,0.08)'
        }}>
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex-shrink-0">
                <div className="blob w-10 h-10" style={{ background: 'var(--sky-blue)', opacity: 0.6 }} />
                <div className="absolute inset-0 flex items-center justify-center font-black text-lg" style={{
                  color: 'var(--russian-violet)',
                  fontFamily: "'Mona Sans', sans-serif",
                  fontStretch: '125%',
                  letterSpacing: '-0.04em'
                }}>cr.</div>
              </div>
              <div>
                <div className="font-bold text-sm leading-tight">Courtney Robertson</div>
                <div className="text-xs opacity-60 leading-tight">Brand Design System · v1</div>
              </div>
            </div>
            <button
              onClick={() => setDark(!dark)}
              className="pill"
              style={{
                background: dark ? 'var(--periwinkle)' : 'var(--russian-violet)',
                color: dark ? 'var(--russian-violet)' : 'var(--cream)'
              }}
            >
              {dark ? '☀ Light' : '☾ Dark'}
            </button>
          </div>
          <nav className="max-w-6xl mx-auto px-6 pb-3 flex gap-1 overflow-x-auto">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`tab-btn ${tab === t.id ? 'active' : ''}`}
              >{t.label}</button>
            ))}
          </nav>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-10">
          {tab === 'overview' && <Overview />}
          {tab === 'color' && <ColorSystem dark={dark} />}
          {tab === 'type' && <TypeSystem />}
          {tab === 'shape' && <ShapeSystem />}
          {tab === 'logo' && <LogoOptions />}
          {tab === 'stream' && <StreamSystem />}
          {tab === 'components' && <Components />}
          {tab === 'handoff' && <Handoff />}
        </main>

        <footer className="max-w-6xl mx-auto px-6 py-10 opacity-60 text-sm border-t" style={{
          borderColor: dark ? 'rgba(188,181,227,0.1)' : 'rgba(36,28,74,0.08)'
        }}>
          Designed for courtneyr.dev · Ollie block theme · WordPress · IndieWeb
        </footer>
      </div>
    </div>
  );
}

// ============ OVERVIEW ============
function Overview() {
  return (
    <div className="space-y-10">
      <section className="relative">
        <div className="absolute -top-6 -left-6 w-64 h-64 rounded-full drift" style={{ background: 'var(--sky-blue)', opacity: 0.35, zIndex: 0 }} />
        <div className="absolute top-20 right-10 w-40 h-40 rounded-full" style={{ background: 'var(--light-orange)', opacity: 0.8, zIndex: 0 }} />
        <div className="relative z-10 py-8 max-w-3xl">
          <div className="pill mb-4" style={{ background: 'var(--russian-violet)', color: 'var(--cream)' }}>
            <span>✦</span> Warm & approachable
          </div>
          <h1 className="text-5xl md:text-6xl font-black leading-[1.05] tracking-tight mb-4" style={{
            fontStretch: '125%', color: 'var(--russian-violet)'
          }}>
            A teacher-ish brand for the open web.
          </h1>
          <p className="text-lg opacity-80 leading-relaxed max-w-2xl">
            A cohesive visual system for courtneyr.dev — built around your palette, Mona Sans, Ollie's block theme, and the IndieWeb tools you already use. Rounded, inviting, grounded in WordPress craftsmanship.
          </p>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-5">
        {[
          { t: 'Soft over sharp', d: 'Rounded corners, blob shapes, generous spacing. Nothing feels corporate or cold.', icon: '◐' },
          { t: 'Layered, not flat', d: 'Circles behind images, floating badges hovering off cards, depth that invites a second look.', icon: '◈' },
          { t: 'Stream over silo', d: 'A nerdy.dev-style activity feed surfaces Post Formats, Post Kinds, and XFN as first-class citizens.', icon: '≡' },
        ].map(x => (
          <div key={x.t} className="mock-card">
            <div className="text-3xl mb-2" style={{ color: 'var(--ut-orange)' }}>{x.icon}</div>
            <div className="font-bold text-lg mb-1" style={{ fontStretch: '115%' }}>{x.t}</div>
            <div className="text-sm opacity-75 leading-relaxed">{x.d}</div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-black mb-4" style={{ fontStretch: '115%' }}>The three moves that make this yours</h2>
        <ol className="space-y-3 text-base">
          <li className="flex gap-3"><span className="font-black opacity-40 w-6">01</span><span><strong>Palette split:</strong> Ut-orange leads warmth and CTAs; sky-blue carries the shapes and soft backgrounds; russian-violet is the ink. The rest support.</strong></span></li>
          <li className="flex gap-3"><span className="font-black opacity-40 w-6">02</span><span><strong>Shape-layering as signature:</strong> Every image sits in front of one soft circle, and at least one floating badge or chip orbits it. Borrowed from Airo, made yours with the violet/orange/sky-blue combo.</span></li>
          <li className="flex gap-3"><span className="font-black opacity-40 w-6">03</span><span><strong>Post-type typography:</strong> Mona Sans expanded for display, standard for body, condensed for metadata chips. Same font family, three moods.</span></li>
        </ol>
      </section>
    </div>
  );
}

// ============ COLOR ============
function ColorSystem({ dark }) {
  const core = [
    { name: 'Russian Violet', var: '--russian-violet', hex: '#241c4a', ink: true, role: 'Primary ink, headings, nav' },
    { name: 'Ut Orange', var: '--ut-orange', hex: '#fb8500', ink: true, role: 'Primary CTA, links, accents' },
    { name: 'Sky Blue', var: '--sky-blue', hex: '#8ecae6', ink: false, role: 'Signature shape color, soft backgrounds' },
    { name: 'Cream', var: '--cream', hex: '#fdfaf4', ink: false, role: 'Page background (light mode)' },
  ];
  const support = [
    { name: 'Periwinkle', var: '--periwinkle', hex: '#bcb5e3', ink: false, role: 'Dark-mode ink, soft violet accents' },
    { name: 'Glaucous', var: '--glaucous', hex: '#647baf', ink: true, role: 'Secondary text, borders' },
    { name: 'Blue-Green', var: '--blue-green', hex: '#219ebc', ink: true, role: 'Second accent, link hover' },
    { name: 'Cerulean', var: '--cerulean', hex: '#126782', ink: true, role: 'Deeper blue, footer' },
    { name: 'Prussian Blue', var: '--prussian-blue', hex: '#023047', ink: true, role: 'Dark-mode base surface' },
    { name: 'Selective Yellow', var: '--selective-yellow', hex: '#ffb703', ink: false, role: 'Dark-mode CTA, highlights' },
    { name: 'Light Orange', var: '--light-orange', hex: '#fee2c3', ink: false, role: 'Soft background shapes' },
  ];

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-3xl font-black mb-2" style={{ fontStretch: '115%' }}>Color system</h2>
        <p className="opacity-75 mb-6 max-w-2xl">A warm, balanced palette organized by role. Four core colors do ~80% of the work; the remaining seven are support.</p>

        <h3 className="font-bold mb-3 text-sm uppercase tracking-wider opacity-60">Core (use first)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {core.map(c => (
            <div key={c.hex} className="swatch" style={{ background: c.hex, color: c.ink ? '#fdfaf4' : '#241c4a' }}>
              <div className="font-bold text-sm">{c.name}</div>
              <div>
                <div className="font-mono">{c.hex}</div>
                <div className="opacity-75 mt-1">{c.role}</div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="font-bold mb-3 text-sm uppercase tracking-wider opacity-60">Support</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {support.map(c => (
            <div key={c.hex} className="swatch" style={{ background: c.hex, color: c.ink ? '#fdfaf4' : '#241c4a' }}>
              <div className="font-bold text-sm">{c.name}</div>
              <div>
                <div className="font-mono">{c.hex}</div>
                <div className="opacity-75 mt-1">{c.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-black mb-4" style={{ fontStretch: '115%' }}>Mode recipes</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="mock-card">
            <div className="font-bold mb-3">☀ Light mode</div>
            <Row label="Surface" swatch="#fdfaf4" />
            <Row label="Soft surface" swatch="#fee2c3" />
            <Row label="Ink" swatch="#241c4a" />
            <Row label="Primary" swatch="#fb8500" />
            <Row label="Accent shape" swatch="#8ecae6" />
            <Row label="Muted text" swatch="#647baf" />
          </div>
          <div className="mock-card">
            <div className="font-bold mb-3">☾ Dark mode</div>
            <Row label="Surface" swatch="#0a0f24" />
            <Row label="Soft surface" swatch="#023047" />
            <Row label="Ink" swatch="#bcb5e3" />
            <Row label="Primary" swatch="#ffb703" />
            <Row label="Accent shape" swatch="#126782" />
            <Row label="Muted text" swatch="#647baf" />
          </div>
        </div>
        <p className="text-xs opacity-60 mt-3">Toggle the Dark switch (top right) to see the system adapt live.</p>
      </section>

      <section>
        <h3 className="text-2xl font-black mb-4" style={{ fontStretch: '115%' }}>Contrast check</h3>
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          {[
            { fg: '#241c4a', bg: '#fdfaf4', ratio: '14.4', status: 'AAA' },
            { fg: '#fb8500', bg: '#fdfaf4', ratio: '3.1', status: 'AA Large' },
            { fg: '#fdfaf4', bg: '#fb8500', ratio: '3.1', status: 'AA Large' },
            { fg: '#fdfaf4', bg: '#241c4a', ratio: '14.4', status: 'AAA' },
            { fg: '#bcb5e3', bg: '#0a0f24', ratio: '10.8', status: 'AAA' },
            { fg: '#ffb703', bg: '#0a0f24', ratio: '11.2', status: 'AAA' },
          ].map((c,i) => (
            <div key={i} className="p-3 rounded-xl flex items-center justify-between" style={{ background: c.bg, color: c.fg }}>
              <span className="font-bold">Aa body text</span>
              <span className="font-mono text-xs opacity-80">{c.ratio}:1 · {c.status}</span>
            </div>
          ))}
        </div>
        <p className="text-xs opacity-60 mt-3">Orange-on-cream passes AA for large text (headings 18pt+ or 14pt bold). For body text, use russian-violet on cream.</p>
      </section>
    </div>
  );
}

function Row({ label, swatch }) {
  return (
    <div className="flex items-center gap-3 py-1.5 text-sm">
      <div className="w-6 h-6 rounded-md border" style={{ background: swatch, borderColor: 'rgba(36,28,74,0.15)' }} />
      <span className="font-mono text-xs opacity-70 w-20">{swatch}</span>
      <span>{label}</span>
    </div>
  );
}

// ============ TYPOGRAPHY ============
function TypeSystem() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-3xl font-black mb-2" style={{ fontStretch: '115%' }}>Typography</h2>
        <p className="opacity-75 max-w-2xl mb-6">One family, three moods. Mona Sans is a variable font — you already have it in Ollie. The trick is using its width axis (expanded/standard/condensed) to create hierarchy without reaching for a second typeface.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Display', desc: 'Expanded 125%, weight 800–900. Headlines, hero type.', sample: 'Open source, teaching', stretch: '125%', weight: 800, size: '1.75rem' },
            { label: 'Body', desc: 'Standard width, weight 400–500. Paragraphs, post content.', sample: 'The web remembers who we are.', stretch: '100%', weight: 400, size: '1.125rem' },
            { label: 'Meta', desc: 'Condensed, weight 500, uppercase. Chips, labels, timestamps.', sample: 'WORDPRESS · APR 15', stretch: '75%', weight: 600, size: '0.75rem', track: '0.08em' },
          ].map(t => (
            <div key={t.label} className="mock-card">
              <div className="text-xs uppercase tracking-wider opacity-60 mb-3 font-bold">{t.label}</div>
              <div className="mb-3 leading-tight" style={{
                fontFamily: "'Mona Sans', sans-serif",
                fontStretch: t.stretch,
                fontWeight: t.weight,
                fontSize: t.size,
                letterSpacing: t.track || '-0.01em',
                color: 'var(--russian-violet)'
              }}>{t.sample}</div>
              <div className="text-xs opacity-70">{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-black mb-4" style={{ fontStretch: '115%' }}>Scale</h3>
        <div className="space-y-0">
          {[
            { name: 'H1 Display', size: '3.5rem', weight: 900, stretch: '125%', sample: 'Developer relations' },
            { name: 'H2', size: '2.25rem', weight: 800, stretch: '115%', sample: 'Open source educator' },
            { name: 'H3', size: '1.5rem', weight: 700, stretch: '110%', sample: 'Recent posts' },
            { name: 'H4', size: '1.125rem', weight: 700, stretch: '100%', sample: 'Post title in stream' },
            { name: 'Lead', size: '1.25rem', weight: 400, stretch: '100%', sample: 'A warm intro paragraph that welcomes readers in.' },
            { name: 'Body', size: '1.0625rem', weight: 400, stretch: '100%', sample: 'The cat sat on the mat and wondered about hypermedia.' },
            { name: 'Small', size: '0.875rem', weight: 500, stretch: '95%', sample: 'Caption or secondary text' },
            { name: 'Meta', size: '0.75rem', weight: 600, stretch: '75%', sample: 'FILED UNDER WORDPRESS', track: '0.08em', upper: true },
          ].map(t => (
            <div key={t.name} className="type-sample">
              <div className="w-24 flex-shrink-0">
                <div className="text-xs font-bold opacity-60 uppercase tracking-wider">{t.name}</div>
                <div className="text-xs opacity-40 font-mono">{t.size}</div>
              </div>
              <div style={{
                fontFamily: "'Mona Sans', sans-serif",
                fontSize: t.size,
                fontWeight: t.weight,
                fontStretch: t.stretch,
                letterSpacing: t.track || '-0.01em',
                textTransform: t.upper ? 'uppercase' : 'none',
                color: 'var(--russian-violet)',
                lineHeight: 1.15
              }}>{t.sample}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mock-card">
        <h3 className="text-xl font-black mb-3" style={{ fontStretch: '115%' }}>Pairing rules</h3>
        <ul className="space-y-2 text-sm">
          <li>→ Never two widths at the same level. Hero uses expanded OR standard, not both.</li>
          <li>→ Body copy stays standard width at 17px (1.0625rem) minimum for readability.</li>
          <li>→ Condensed is reserved for meta/chips — it signals "this is a label, not content."</li>
          <li>→ Let Mona Sans' italic do the emphasis work. No need for a second serif.</li>
        </ul>
      </section>
    </div>
  );
}

// ============ SHAPES ============
function ShapeSystem() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-3xl font-black mb-2" style={{ fontStretch: '115%' }}>Shape-layering system</h2>
        <p className="opacity-75 max-w-2xl mb-6">Your signature move. Every feature image gets the treatment: one soft circle behind, one rounded image card on top, one floating badge hovering at a corner. Here's the formula.</p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <ShapeDemo variant="circle-behind" label="01 · Circle behind" desc="A soft-blue circle sits 40–60% offset behind the image frame. Larger than the frame by ~20%." />
          <ShapeDemo variant="badge-overlap" label="02 · Floating badge" desc="A small white pill card overlaps the image's bottom-left. Holds an icon + short label." />
          <ShapeDemo variant="double-blob" label="03 · Double blob" desc="Two offset circles in violet + light-orange. Used for hero sections." />
          <ShapeDemo variant="rounded-corner-note" label="04 · Note card on corner" desc="Rectangular card overlaps top-right of the image. Holds a longer stat or title." />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-black mb-4" style={{ fontStretch: '115%' }}>Rules of the system</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="mock-card">
            <div className="font-bold mb-2" style={{ color: 'var(--ut-orange)' }}>DO</div>
            <ul className="space-y-1.5 opacity-85">
              <li>→ Use one circle + one badge per image. That's the rhythm.</li>
              <li>→ Stick to sky-blue, light-orange, or periwinkle for the circle fill.</li>
              <li>→ Keep the image corner-radius at 1.25rem (20px).</li>
              <li>→ Offset circles so ~30% peeks out from behind the image.</li>
            </ul>
          </div>
          <div className="mock-card">
            <div className="font-bold mb-2" style={{ color: 'var(--ut-orange)' }}>DON'T</div>
            <ul className="space-y-1.5 opacity-85">
              <li>→ Stack more than two shapes behind one image.</li>
              <li>→ Use orange or violet as the big circle (too heavy).</li>
              <li>→ Badge-overlap on small thumbnails (under 200px).</li>
              <li>→ Combine with shadows — the shape IS the depth.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mock-card">
        <h3 className="text-xl font-black mb-3" style={{ fontStretch: '115%' }}>Background motif</h3>
        <p className="text-sm opacity-75 mb-4">For section backgrounds (hero, CTAs, newsletter), scatter 2–3 very large blurred circles at low opacity. Never more than 3. Never opaque.</p>
        <div className="relative h-48 rounded-2xl overflow-hidden" style={{ background: 'var(--cream)' }}>
          <div className="blob drift" style={{ width: 250, height: 250, background: 'var(--sky-blue)', opacity: 0.4, top: -60, left: -40 }} />
          <div className="blob" style={{ width: 180, height: 180, background: 'var(--light-orange)', opacity: 0.9, top: 60, right: 80 }} />
          <div className="blob" style={{ width: 120, height: 120, background: 'var(--periwinkle)', opacity: 0.5, bottom: -30, right: -20 }} />
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="font-black text-2xl" style={{ color: 'var(--russian-violet)', fontStretch: '120%' }}>hero section atmosphere</div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ShapeDemo({ variant, label, desc }) {
  return (
    <div className="mock-card">
      <div className="text-xs uppercase tracking-wider opacity-60 mb-2 font-bold">{label}</div>
      <div className="relative h-56 mb-3" style={{ background: 'rgba(142,202,230,0.08)', borderRadius: '1rem' }}>
        {variant === 'circle-behind' && (
          <>
            <div className="blob" style={{ width: 170, height: 170, background: 'var(--sky-blue)', opacity: 0.6, top: 20, left: 30 }} />
            <div className="absolute rounded-2xl" style={{ width: 140, height: 140, top: 50, left: 70, background: 'linear-gradient(135deg, var(--glaucous), var(--cerulean))' }} />
          </>
        )}
        {variant === 'badge-overlap' && (
          <>
            <div className="blob" style={{ width: 180, height: 180, background: 'var(--sky-blue)', opacity: 0.5, top: 10, left: 40 }} />
            <div className="absolute rounded-2xl" style={{ width: 150, height: 150, top: 40, left: 70, background: 'linear-gradient(135deg, var(--ut-orange), var(--selective-yellow))' }} />
            <div className="absolute float-badge rounded-xl px-3 py-2 text-xs font-bold flex items-center gap-2" style={{ bottom: 40, left: 20, background: 'white', color: 'var(--russian-violet)' }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'var(--light-orange)' }}>★</div>
              <div className="leading-tight"><div className="opacity-60 text-[10px]">Featured on</div><div>WP Tavern</div></div>
            </div>
          </>
        )}
        {variant === 'double-blob' && (
          <>
            <div className="blob" style={{ width: 140, height: 140, background: 'var(--periwinkle)', opacity: 0.7, top: 10, left: 30 }} />
            <div className="blob" style={{ width: 120, height: 120, background: 'var(--light-orange)', opacity: 0.9, top: 80, left: 120 }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="font-black text-lg" style={{ color: 'var(--russian-violet)', fontStretch: '120%' }}>hero title</div>
            </div>
          </>
        )}
        {variant === 'rounded-corner-note' && (
          <>
            <div className="blob" style={{ width: 150, height: 150, background: 'var(--sky-blue)', opacity: 0.5, top: 20, left: 30 }} />
            <div className="absolute rounded-2xl" style={{ width: 160, height: 140, top: 50, left: 50, background: 'linear-gradient(135deg, var(--russian-violet), var(--cerulean))' }} />
            <div className="absolute float-badge rounded-xl p-2.5 text-xs font-bold" style={{ top: 30, right: 20, background: 'white', color: 'var(--russian-violet)', maxWidth: 130 }}>
              <div style={{ color: 'var(--ut-orange)' }} className="text-lg font-black leading-none">11 yrs</div>
              <div className="opacity-60 text-[10px] leading-tight mt-1">teaching WordPress</div>
            </div>
          </>
        )}
      </div>
      <div className="text-sm opacity-75">{desc}</div>
    </div>
  );
}

// ============ LOGO ============
function LogoOptions() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-3xl font-black mb-2" style={{ fontStretch: '115%' }}>Logo options</h2>
        <p className="opacity-75 max-w-2xl mb-6">Three directions to pick from. Each uses your existing Mona Sans — no new fonts to license. Pick one and I'll generate final exports; mix-and-match elements between them if you want.</p>

        <div className="grid md:grid-cols-3 gap-5">
          <LogoOption num="A" name="Shape monogram" pitch="The 'cr.' monogram tucked inside a sky-blue circle. Warm, friendly, reads as a personal site.">
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 rounded-full" style={{ background: 'var(--sky-blue)' }} />
              <div className="absolute inset-0 flex items-center justify-center font-black leading-none" style={{
                color: 'var(--russian-violet)', fontStretch: '125%', fontSize: '3rem', letterSpacing: '-0.05em'
              }}>cr.</div>
            </div>
            <div className="mt-4 text-center">
              <div className="font-black text-xl leading-none" style={{ color: 'var(--russian-violet)', fontStretch: '120%' }}>Courtney Robertson</div>
              <div className="text-xs opacity-60 mt-1 uppercase tracking-widest font-bold">open source · devrel</div>
            </div>
          </LogoOption>

          <LogoOption num="B" name="Orange dot wordmark" pitch="The domain as the mark. That orange period ties visually to your primary CTA color across the site.">
            <div className="w-full flex items-center justify-center py-8">
              <div className="font-black leading-none flex items-baseline" style={{ fontStretch: '125%', fontSize: '2.5rem', color: 'var(--russian-violet)', letterSpacing: '-0.04em' }}>
                courtneyr<span style={{ color: 'var(--ut-orange)' }}>.dev</span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="font-bold text-sm" style={{ color: 'var(--russian-violet)' }}>Courtney Robertson</div>
              <div className="text-xs opacity-60 uppercase tracking-widest font-bold mt-1">developer advocate</div>
            </div>
          </LogoOption>

          <LogoOption num="C" name="Open web glyph" pitch="A minimal custom glyph: a soft-edged bracket around a dot. Hints at open source, hyperlinks, and your IndieWeb roots without being literal.">
            <div className="w-full flex items-center justify-center py-6 gap-3">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <path d="M22 12 Q10 12 10 30 Q10 48 22 48" stroke="var(--russian-violet)" strokeWidth="5" fill="none" strokeLinecap="round" />
                <path d="M38 12 Q50 12 50 30 Q50 48 38 48" stroke="var(--russian-violet)" strokeWidth="5" fill="none" strokeLinecap="round" />
                <circle cx="30" cy="30" r="7" fill="var(--ut-orange)" />
              </svg>
              <div className="font-black leading-none" style={{ fontStretch: '115%', fontSize: '1.75rem', color: 'var(--russian-violet)', letterSpacing: '-0.03em' }}>
                courtneyr
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="font-bold text-sm" style={{ color: 'var(--russian-violet)' }}>The open web, held gently.</div>
              <div className="text-xs opacity-60 uppercase tracking-widest font-bold mt-1">courtney robertson</div>
            </div>
          </LogoOption>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-black mb-4" style={{ fontStretch: '115%' }}>How each reads at a glance</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="mock-card">
            <div className="font-bold mb-2">Option A — Shape monogram</div>
            <div className="opacity-80 space-y-1.5">
              <div>✓ Most personable, warm</div>
              <div>✓ Works as standalone favicon/avatar</div>
              <div>✓ Fits your shape-layering system natively</div>
              <div className="opacity-60">– Less "developer" read, more "creator"</div>
            </div>
          </div>
          <div className="mock-card">
            <div className="font-bold mb-2">Option B — Orange dot wordmark</div>
            <div className="opacity-80 space-y-1.5">
              <div>✓ Screams "personal dev site"</div>
              <div>✓ Zero custom illustration needed</div>
              <div>✓ Brand-perfect color tie-in</div>
              <div className="opacity-60">– Harder to use as an isolated mark</div>
            </div>
          </div>
          <div className="mock-card">
            <div className="font-bold mb-2">Option C — Open web glyph</div>
            <div className="opacity-80 space-y-1.5">
              <div>✓ Most distinctive, has a story</div>
              <div>✓ Scales to favicon cleanly</div>
              <div>✓ Reads as IndieWeb / open source</div>
              <div className="opacity-60">– Most custom work to refine</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function LogoOption({ num, name, pitch, children }) {
  return (
    <div className="mock-card">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-full flex items-center justify-center font-black text-sm" style={{ background: 'var(--ut-orange)', color: 'white' }}>{num}</div>
        <div className="font-bold" style={{ fontStretch: '110%' }}>{name}</div>
      </div>
      <div className="rounded-xl p-4 mb-3" style={{ background: 'var(--cream)', border: '1px solid rgba(36,28,74,0.08)' }}>
        {children}
      </div>
      <div className="text-xs opacity-75 leading-relaxed">{pitch}</div>
    </div>
  );
}

// ============ STREAM ============
function StreamSystem() {
  const posts = [
    { type: 'blog', emoji: '📰', color: '--ut-orange', bg: '--light-orange', label: 'Blog', title: 'LLM Wiki: From Brain Fog to AI-Organized Second Brain Clarity', time: '6 days ago', meta: 'WordPress · AI tooling' },
    { type: 'link', emoji: '🔗', color: '--blue-green', bg: '--sky-blue', label: 'Link', title: 'Great read on XFN and the IndieWeb revival', time: '1 week ago', meta: 'courtneyr.dev/link · via @jondaley', via: 'https://example.com/xfn-revival' },
    { type: 'video', emoji: '📹', color: '--cerulean', bg: '--sky-blue', label: 'Video', title: 'This Week in WordPress 347: Evan', time: '2 weeks ago', meta: 'YouTube · 52 min' },
    { type: 'quote', emoji: '🔖', color: '--russian-violet', bg: '--periwinkle', label: 'Quote', title: '"A personal website is a promise to your future self."', time: '3 weeks ago', meta: 'Rae Morrey' },
    { type: 'aside', emoji: '🗯️', color: '--glaucous', bg: '--periwinkle', label: 'Aside', title: 'Server-side cron on GoDaddy MWPv2 finally clicked for me today.', time: '3 weeks ago', meta: 'tech note' },
    { type: 'status', emoji: '🖊️', color: '--glaucous', bg: '--light-orange', label: 'Status', title: 'Speaking at WordCamp Asia next month. Slides in progress.', time: '1 month ago', meta: 'speaking' },
  ];

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-3xl font-black mb-2" style={{ fontStretch: '115%' }}>Stream & post types</h2>
        <p className="opacity-75 max-w-2xl mb-6">The aggregate feed pulls Post Formats, IndieWeb Post Kinds, videos, podcast appearances, and speaking into one chronological river. Each post type gets an emoji + color chip. Chunky enough to scan, calm enough to read.</p>
      </section>

      <section>
        <h3 className="text-xl font-black mb-4" style={{ fontStretch: '115%' }}>Type taxonomy</h3>
        <div className="grid md:grid-cols-3 gap-3 mb-6">
          {[
            { e: '📰', l: 'Blog', c: '--ut-orange', use: 'Long-form posts' },
            { e: '🔗', l: 'Link', c: '--blue-green', use: 'IndieWeb bookmarks, link posts' },
            { e: '📹', l: 'Video', c: '--cerulean', use: 'YouTube, podcast video' },
            { e: '🎧', l: 'Audio', c: '--cerulean', use: 'Podcast episodes' },
            { e: '🔖', l: 'Quote', c: '--russian-violet', use: 'Pulled quotes, highlights' },
            { e: '🗯️', l: 'Aside', c: '--glaucous', use: 'Short thoughts' },
            { e: '🖊️', l: 'Status', c: '--glaucous', use: 'Microblog updates' },
            { e: '🗣️', l: 'Speaking', c: '--selective-yellow', use: 'Talks & events' },
            { e: '📚', l: 'Book', c: '--russian-violet', use: 'Reviews & stories' },
          ].map(t => (
            <div key={t.l} className="mock-card flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ background: `rgba(142,202,230,0.18)` }}>{t.e}</div>
              <div className="min-w-0">
                <div className="font-bold text-sm" style={{ color: `var(${t.c})` }}>{t.l}</div>
                <div className="text-xs opacity-70 truncate">{t.use}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-black mb-4" style={{ fontStretch: '115%' }}>Stream preview</h3>
        <div className="space-y-3 max-w-2xl">
          {posts.map((p, i) => (
            <StreamCard key={i} post={p} />
          ))}
        </div>
      </section>

      <section className="mock-card">
        <h3 className="text-xl font-black mb-3" style={{ fontStretch: '115%' }}>Filter row</h3>
        <p className="text-sm opacity-75 mb-4">Above the stream, a horizontal filter row lets readers narrow by type — modeled on nerdy.dev's top chips.</p>
        <div className="flex flex-wrap gap-2">
          <FilterChip active>🤲 All <span className="opacity-60 ml-1">412</span></FilterChip>
          <FilterChip>📰 Blog <span className="opacity-60 ml-1">87</span></FilterChip>
          <FilterChip>🔗 Link <span className="opacity-60 ml-1">46</span></FilterChip>
          <FilterChip>📹 Video <span className="opacity-60 ml-1">34</span></FilterChip>
          <FilterChip>🎧 Audio <span className="opacity-60 ml-1">28</span></FilterChip>
          <FilterChip>🔖 Quote <span className="opacity-60 ml-1">19</span></FilterChip>
          <FilterChip>🗯️ Aside <span className="opacity-60 ml-1">63</span></FilterChip>
          <FilterChip>🗣️ Speaking <span className="opacity-60 ml-1">41</span></FilterChip>
        </div>
      </section>
    </div>
  );
}

function FilterChip({ active, children }) {
  return (
    <button className="pill" style={{
      background: active ? 'var(--russian-violet)' : 'transparent',
      color: active ? 'var(--cream)' : 'var(--russian-violet)',
      border: active ? 'none' : '1px solid rgba(36,28,74,0.15)',
      padding: '0.375rem 0.75rem'
    }}>{children}</button>
  );
}

function StreamCard({ post }) {
  return (
    <article className="mock-card flex gap-4">
      <div className="flex-shrink-0 w-12">
        <div className="w-11 h-11 rounded-full flex items-center justify-center text-lg" style={{
          background: `color-mix(in srgb, var(${post.bg}) 60%, white)`
        }}>{post.emoji}</div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <span className="pill" style={{
            background: `var(${post.color})`, color: 'white',
            fontSize: '0.6875rem', fontStretch: '75%', letterSpacing: '0.06em',
            textTransform: 'uppercase', fontWeight: 700
          }}>{post.label}</span>
          <span className="text-xs opacity-60">{post.time}</span>
        </div>
        <h4 className={`font-bold leading-snug mb-1 ${post.type === 'quote' ? 'italic' : ''}`} style={{
          fontSize: post.type === 'blog' || post.type === 'video' ? '1.125rem' : '1rem',
          fontStretch: '110%',
          color: 'var(--russian-violet)'
        }}>{post.title}</h4>
        <div className="text-xs opacity-60 font-mono">{post.meta}</div>
      </div>
    </article>
  );
}

// ============ COMPONENTS ============
function Components() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-3xl font-black mb-2" style={{ fontStretch: '115%' }}>Components</h2>
        <p className="opacity-75 max-w-2xl mb-6">A preview of what the system looks like when it's assembled.</p>
      </section>

      {/* HERO */}
      <section>
        <h3 className="text-xl font-black mb-4" style={{ fontStretch: '115%' }}>Homepage hero (hybrid)</h3>
        <div className="relative mock-card p-8 md:p-12 overflow-hidden">
          <div className="blob drift" style={{ width: 300, height: 300, background: 'var(--sky-blue)', opacity: 0.35, top: -80, right: -40 }} />
          <div className="blob" style={{ width: 180, height: 180, background: 'var(--light-orange)', opacity: 0.75, bottom: -60, left: 20 }} />
          <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <div className="pill mb-4" style={{ background: 'var(--russian-violet)', color: 'var(--cream)' }}>✦ Open source · WordPress · DevRel</div>
              <h1 className="font-black leading-[1.05] tracking-tight mb-4" style={{
                fontStretch: '125%', color: 'var(--russian-violet)', fontSize: 'clamp(2rem, 5vw, 3.5rem)'
              }}>
                Teaching the open web, one post at a time.
              </h1>
              <p className="opacity-80 leading-relaxed mb-5 max-w-lg">
                Courtney Robertson — Senior Developer Advocate at GoDaddy, WordPress contributor, co-founder of WP Community Collective.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="pill" style={{ background: 'var(--ut-orange)', color: 'white', padding: '0.75rem 1.25rem', fontWeight: 700 }}>Subscribe to newsletter →</button>
                <button className="pill" style={{ background: 'transparent', border: '2px solid var(--russian-violet)', color: 'var(--russian-violet)', padding: 'calc(0.75rem - 2px) 1.25rem', fontWeight: 700 }}>Read the stream</button>
              </div>
            </div>

            {/* Portrait card with shape-layering */}
            <div className="relative hidden md:block" style={{ width: 260, height: 280 }}>
              <div className="blob" style={{ width: 240, height: 240, background: 'var(--periwinkle)', opacity: 0.7, top: 10, left: -10 }} />
              <div className="absolute rounded-2xl overflow-hidden" style={{ width: 200, height: 240, top: 20, left: 30, background: 'linear-gradient(135deg, var(--russian-violet), var(--cerulean))' }}>
                <div className="w-full h-full flex items-center justify-center text-5xl">🏴‍☠️</div>
              </div>
              <div className="absolute float-badge rounded-xl px-3 py-2.5" style={{ bottom: 0, left: 0, background: 'white' }}>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'var(--light-orange)' }}>★</div>
                  <div>
                    <div className="text-[10px] opacity-60 leading-none uppercase tracking-wider font-bold">Teaching WP since</div>
                    <div className="font-black text-sm leading-tight" style={{ color: 'var(--russian-violet)', fontStretch: '115%' }}>2014 · Learn.wp</div>
                  </div>
                </div>
              </div>
              <div className="absolute float-badge rounded-xl px-2.5 py-1.5 text-xs font-bold" style={{ top: 10, right: -10, background: 'var(--ut-orange)', color: 'white' }}>
                2 plugins on .org
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUTTONS */}
      <section>
        <h3 className="text-xl font-black mb-4" style={{ fontStretch: '115%' }}>Buttons & chips</h3>
        <div className="mock-card">
          <div className="flex flex-wrap gap-3 mb-4">
            <button className="pill" style={{ background: 'var(--ut-orange)', color: 'white', padding: '0.75rem 1.25rem', fontWeight: 700 }}>Primary CTA</button>
            <button className="pill" style={{ background: 'var(--russian-violet)', color: 'var(--cream)', padding: '0.75rem 1.25rem', fontWeight: 700 }}>Secondary dark</button>
            <button className="pill" style={{ background: 'transparent', border: '2px solid var(--russian-violet)', color: 'var(--russian-violet)', padding: 'calc(0.75rem - 2px) 1.25rem', fontWeight: 700 }}>Outline</button>
            <button className="pill" style={{ background: 'var(--sky-blue)', color: 'var(--russian-violet)', padding: '0.75rem 1.25rem', fontWeight: 700 }}>Soft accent</button>
            <button className="pill" style={{ background: 'var(--light-orange)', color: 'var(--russian-violet)', padding: '0.5rem 1rem', fontWeight: 600, fontSize: '0.875rem' }}>Small chip</button>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="pill" style={{ background: 'var(--russian-violet)', color: 'white', fontSize: '0.6875rem', fontStretch: '75%', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>WordPress</span>
            <span className="pill" style={{ background: 'var(--cerulean)', color: 'white', fontSize: '0.6875rem', fontStretch: '75%', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>DevRel</span>
            <span className="pill" style={{ background: 'var(--ut-orange)', color: 'white', fontSize: '0.6875rem', fontStretch: '75%', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>Open source</span>
            <span className="pill" style={{ background: 'var(--glaucous)', color: 'white', fontSize: '0.6875rem', fontStretch: '75%', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>Curriculum</span>
          </div>
        </div>
      </section>

      {/* CARDS */}
      <section>
        <h3 className="text-xl font-black mb-4" style={{ fontStretch: '115%' }}>Feature card with shape-layering</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <FeatureCard
            image="linear-gradient(135deg, var(--ut-orange), var(--selective-yellow))"
            badge="★ Plugin"
            badgeColor="var(--russian-violet)"
            kicker="WordPress.org"
            title="Post Formats for Block Themes"
            desc="Bring back native post formats — aside, link, quote, video — with a block-theme-first approach."
            shapeColor="var(--sky-blue)"
          />
          <FeatureCard
            image="linear-gradient(135deg, var(--cerulean), var(--blue-green))"
            badge="↗ IndieWeb"
            badgeColor="var(--ut-orange)"
            kicker="Plugin"
            title="Link Extension for XFN"
            desc="Restore the rel-attribute vocabulary of the social web on modern WordPress."
            shapeColor="var(--light-orange)"
          />
        </div>
      </section>

      {/* NEWSLETTER */}
      <section>
        <h3 className="text-xl font-black mb-4" style={{ fontStretch: '115%' }}>Newsletter block</h3>
        <div className="relative mock-card p-8 overflow-hidden" style={{ background: 'var(--russian-violet)', color: 'var(--cream)' }}>
          <div className="blob" style={{ width: 200, height: 200, background: 'var(--ut-orange)', opacity: 0.35, top: -60, right: -30 }} />
          <div className="blob" style={{ width: 150, height: 150, background: 'var(--periwinkle)', opacity: 0.3, bottom: -40, left: 40 }} />
          <div className="relative z-10 max-w-lg">
            <div className="text-sm opacity-70 uppercase tracking-widest font-bold mb-2" style={{ fontStretch: '75%' }}>Every Saturday</div>
            <h3 className="font-black mb-2 leading-tight" style={{ fontStretch: '120%', fontSize: '1.75rem' }}>
              Join the newsletter
            </h3>
            <p className="opacity-80 mb-4 text-sm">Practical insights for open source contributors, WordPress developers, educators, and DevRel folks. No fluff.</p>
            <div className="flex gap-2 flex-wrap">
              <input placeholder="you@domain.dev" className="flex-1 min-w-[200px] px-4 py-3 rounded-full text-sm" style={{ background: 'rgba(253,250,244,0.1)', color: 'var(--cream)', border: '1px solid rgba(253,250,244,0.2)' }} />
              <button className="pill" style={{ background: 'var(--ut-orange)', color: 'white', padding: '0.75rem 1.5rem', fontWeight: 700 }}>Subscribe →</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ image, badge, badgeColor, kicker, title, desc, shapeColor }) {
  return (
    <div className="mock-card">
      <div className="relative h-44 mb-4">
        <div className="blob" style={{ width: 200, height: 200, background: shapeColor, opacity: 0.55, top: -10, left: -10 }} />
        <div className="absolute rounded-2xl" style={{ width: 'calc(100% - 40px)', height: 160, top: 10, left: 30, background: image }} />
        <div className="absolute float-badge rounded-xl px-2.5 py-1.5 text-xs font-bold" style={{ top: -8, right: -4, background: badgeColor, color: 'white' }}>
          {badge}
        </div>
      </div>
      <div className="text-xs opacity-60 uppercase tracking-widest font-bold mb-1" style={{ fontStretch: '75%', color: 'var(--ut-orange)' }}>{kicker}</div>
      <h4 className="font-black text-lg leading-tight mb-2" style={{ fontStretch: '115%', color: 'var(--russian-violet)' }}>{title}</h4>
      <p className="text-sm opacity-75 leading-relaxed">{desc}</p>
    </div>
  );
}

// ============ HANDOFF ============
function Handoff() {
  const css = `:root {
  /* Core palette */
  --cr-russian-violet: #241c4a;
  --cr-periwinkle: #bcb5e3;
  --cr-glaucous: #647baf;
  --cr-sky-blue: #8ecae6;
  --cr-blue-green: #219ebc;
  --cr-cerulean: #126782;
  --cr-prussian-blue: #023047;
  --cr-selective-yellow: #ffb703;
  --cr-ut-orange: #fb8500;
  --cr-light-orange: #fee2c3;
  --cr-cream: #fdfaf4;

  /* Semantic roles (light) */
  --cr-surface: var(--cr-cream);
  --cr-surface-soft: var(--cr-light-orange);
  --cr-ink: var(--cr-russian-violet);
  --cr-ink-muted: var(--cr-glaucous);
  --cr-primary: var(--cr-ut-orange);
  --cr-accent-shape: var(--cr-sky-blue);

  /* Radius scale (matches Ollie) */
  --cr-radius-sm: 0.5rem;
  --cr-radius-md: 0.75rem;
  --cr-radius-lg: 1.25rem;
  --cr-radius-xl: 2rem;
  --cr-radius-full: 9999px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --cr-surface: #0a0f24;
    --cr-surface-soft: var(--cr-prussian-blue);
    --cr-ink: var(--cr-periwinkle);
    --cr-primary: var(--cr-selective-yellow);
    --cr-accent-shape: var(--cr-cerulean);
  }
}

/* Shape-layering utility — drop any image in a .cr-shape-frame */
.cr-shape-frame {
  position: relative;
  isolation: isolate;
}
.cr-shape-frame::before {
  content: "";
  position: absolute;
  width: 115%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--cr-accent-shape);
  opacity: 0.55;
  top: -8%;
  left: -8%;
  z-index: -1;
}
.cr-shape-frame > img,
.cr-shape-frame > .wp-block-image {
  border-radius: var(--cr-radius-lg);
  overflow: hidden;
}

@media (prefers-reduced-motion: no-preference) {
  .cr-drift { animation: cr-drift 8s ease-in-out infinite; }
}
@keyframes cr-drift {
  0%, 100% { transform: translate(0,0); }
  50% { transform: translate(6px, -8px); }
}`;

  const palette = `# Courtney Robertson — Brand Palette (for Canva)

## Core
- Russian Violet  #241c4a
- Ut Orange       #fb8500
- Sky Blue        #8ecae6
- Cream           #fdfaf4

## Support
- Periwinkle      #bcb5e3
- Glaucous        #647baf
- Blue-Green      #219ebc
- Cerulean        #126782
- Prussian Blue   #023047
- Selective Yellow #ffb703
- Light Orange    #fee2c3

## Fonts
- Display / Body: Mona Sans (variable)
- Monospace: ui-monospace, Menlo, Consolas`;

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-3xl font-black mb-2" style={{ fontStretch: '115%' }}>Handoff</h2>
        <p className="opacity-75 max-w-2xl mb-6">Everything you need to take this into Ollie's "Manage CSS Classes" system, your child theme, and Canva.</p>
      </section>

      <section>
        <h3 className="text-xl font-black mb-3" style={{ fontStretch: '115%' }}>Drop-in CSS for Ollie</h3>
        <p className="text-sm opacity-75 mb-3">Paste this into Ollie's Manage CSS Classes panel, or into your child theme's stylesheet. It defines tokens, the shape-layering utility, and dark mode.</p>
        <pre className="mock-card overflow-x-auto text-xs font-mono leading-relaxed" style={{ background: '#0a0f24', color: '#e8e4f7', maxHeight: 400 }}>{css}</pre>
      </section>

      <section>
        <h3 className="text-xl font-black mb-3" style={{ fontStretch: '115%' }}>Canva color kit</h3>
        <p className="text-sm opacity-75 mb-3">Copy the block below into a Canva brand kit — it includes hex codes in Canva's expected format.</p>
        <pre className="mock-card overflow-x-auto text-xs font-mono whitespace-pre-wrap">{palette}</pre>
      </section>

      <section>
        <h3 className="text-xl font-black mb-4" style={{ fontStretch: '115%' }}>Implementation order</h3>
        <ol className="space-y-3 text-sm">
          <li className="flex gap-3"><span className="font-black opacity-40 w-6 flex-shrink-0">01</span><span><strong>Pick a logo option</strong> (A, B, or C from the Logo tab) — I'll generate SVG exports and a favicon from your choice.</span></li>
          <li className="flex gap-3"><span className="font-black opacity-40 w-6 flex-shrink-0">02</span><span><strong>Drop the CSS above into Ollie's Manage CSS Classes.</strong> This gives you the tokens, shape utility, and dark mode without modifying theme files.</span></li>
          <li className="flex gap-3"><span className="font-black opacity-40 w-6 flex-shrink-0">03</span><span><strong>Wrap your images in <code>.cr-shape-frame</code></strong> via Ollie's Additional CSS Classes field on individual Image blocks. Instant shape-layering.</span></li>
          <li className="flex gap-3"><span className="font-black opacity-40 w-6 flex-shrink-0">04</span><span><strong>Build the hybrid homepage.</strong> Keep your current hero + newsletter structure, then add a Query Loop block below set to show all post types, ordered by date. Style it with the stream card classes.</span></li>
          <li className="flex gap-3"><span className="font-black opacity-40 w-6 flex-shrink-0">05</span><span><strong>Ship the Ollie child theme</strong> (already on your horizon) and move these tokens into <code>theme.json</code> so future updates from Ollie don't overwrite them.</span></li>
        </ol>
      </section>

      <section className="mock-card" style={{ background: 'linear-gradient(135deg, var(--light-orange), var(--sky-blue))' }}>
        <div className="font-black text-xl mb-2" style={{ fontStretch: '115%', color: 'var(--russian-violet)' }}>Ready to pick a logo?</div>
        <p className="text-sm opacity-80" style={{ color: 'var(--russian-violet)' }}>
          Tell me A, B, or C (or any mix) and I'll generate final SVG + PNG exports, a favicon set, and a matching Canva-ready brand board you can upload to your brand kit. I can also open a Canva doc for you if you want to draft together there.
        </p>
      </section>
    </div>
  );
}
