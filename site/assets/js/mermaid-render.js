// Kramdown/Rouge renders a ```mermaid fence as
// <div class="language-mermaid highlighter-rouge"><div class="highlight">
//   <pre class="highlight"><code>...</code></pre></div></div>
// — mermaid.js expects <pre class="mermaid">raw source</pre> instead. This
// swaps one for the other, then runs mermaid. Only loaded (see the layout)
// on pages that actually have a mermaid block, alongside an SRI-pinned
// classic <script> tag for the mermaid UMD build, which sets window.mermaid.
document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('div.language-mermaid');
  if (!blocks.length || !window.mermaid) return;

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

  window.mermaid.initialize({ startOnLoad: false, theme: isLight ? 'default' : 'dark' });
  window.mermaid.run({ querySelector: '.mermaid' });
});
