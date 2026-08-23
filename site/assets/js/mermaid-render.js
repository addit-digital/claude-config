// Kramdown/Rouge renders a ```mermaid fence as
// <div class="language-mermaid highlighter-rouge"><div class="highlight">
//   <pre class="highlight"><code>...</code></pre></div></div>
// — mermaid.js expects <pre class="mermaid">raw source</pre> instead. This
// swaps one for the other, then runs mermaid, only on pages that actually
// have a mermaid block (so the runtime never loads on pages without one).
const blocks = document.querySelectorAll('div.language-mermaid');

if (blocks.length) {
  const { default: mermaid } = await import(
    'https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.esm.min.mjs'
  );

  const explicitTheme = document.documentElement.getAttribute('data-theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const isLight = explicitTheme === 'light' || (explicitTheme !== 'dark' && prefersLight);

  blocks.forEach((block) => {
    const code = block.querySelector('code');
    if (!code) return;
    const pre = document.createElement('pre');
    pre.className = 'mermaid';
    pre.textContent = code.textContent;
    block.replaceWith(pre);
  });

  mermaid.initialize({ startOnLoad: false, theme: isLight ? 'default' : 'dark' });
  mermaid.run({ querySelector: '.mermaid' });
}
