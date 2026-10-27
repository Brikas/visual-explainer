# Extras

## Mermaid

Use Mermaid only when the user asks for it or supplies its source, and only on kit pages.

- Put the source where a drawing goes: `<div class="frame"><pre class="mermaid" aria-label="what it shows">flowchart LR …</pre></div>`.
- The render draws it as plain SVG in the page's colors and fonts with its own phone layout. The page needs no script, config or theme code.
- `<br/>` is a line break.
- A Mermaid drawing does not step or replay. A figure that moves is drawn by hand.

## Images

Use an image for a hero or concept art when `surf` or another image tool exists. Data and structure are drawn as figures. Never write base64 by hand. Put `<img src="hero.png" alt="…">` in the source. After each render, run:

```sh
node -e 'const fs=require("fs"),[f,i]=process.argv.slice(1);fs.writeFileSync(f,fs.readFileSync(f,"utf8").replace(`src="${i}"`,`src="data:image/png;base64,${fs.readFileSync(i,"base64")}"`))' <name>.html hero.png
```

## Older recipes

Fetch these only for their mechanics. The page keeps its own visual style. Base URL: `https://raw.githubusercontent.com/nicobailon/visual-explainer/v0.11.0/plugins/visual-explainer/`

- `references/css-patterns.md`
- `references/libraries.md` (Chart.js, anime.js)
- `references/responsive-nav.md` (sticky TOC)
- `references/slide-patterns.md`
- `templates/architecture.html`
- `templates/data-table.html`
