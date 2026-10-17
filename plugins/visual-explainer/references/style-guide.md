# Style guide

One system, four registers, and a topic motif on top. Choose the register from the content, then let the subject tint it (Topic motif below). The scale, components, and polish pass apply to all of them. `templates/page.html` is the Instrument register built to this guide.

## Registers

| Register | Use for | Display / body / mono | Signature |
|---|---|---|---|
| **Instrument** | diff and plan reviews, audits, metrics, status | Geist 600 / Geist / Geist Mono | A KPI strip near the top when there are metrics. Tabular numbers everywhere. Cells split by hairlines, not floating cards. Status as shape + word. |
| **Blueprint** | architecture, data flow, systems, visual plans | IBM Plex Sans 600 / IBM Plex Sans / IBM Plex Mono | 24px grid on the background. Boundaries as dashed frames with a mono tag. Numbered callouts ① ② on the drawing. Dimension lines for spans. |
| **Paper** | concepts, how-it-works, fact-checks, long reading | Newsreader 500 / Atkinson Hyperlegible Next / Atkinson Hyperlegible Mono | Narrow text column, wide figures. Margin notes at ≥ 1200px. `Fig. N` labels. |
| **Editorial** | recaps, narratives, decks, showcases | Instrument Serif / Instrument Sans / JetBrains Mono | Display type at full scale. Asymmetric grid with large empty areas. One number or phrase per screen carries the page. |

The project's own design system overrides the register. If the user names a palette, use `themes.md`.

Each register's tokens, in both schemes, are in `kit/kit.css`: a kit page gets them from `data-register`, and a slide or video deck copies its register's block from there. Every text token reaches 4.5:1 on `--bg` and `--surface`. `--border-bright` (3:1) carries meaningful outlines; `--border` is for decorative rules only.

## Visual principles

1. **Quiet ground, one signal.** About 90% of the page is neutral. The accent marks only what the reader must look at now: the key node, the hot path, the active control, the one number that matters.
2. **The figure is the interface.** A term in the prose and its element in the figure are linked. Hover either one, or focus the prose term, and both light up (`diagrams.md` → Linked highlighting).
3. **Overview, then detail.** The full picture comes first. The reader steps, hovers, or expands to get detail. Raw material goes in `<details>`. Sources are the exception: keep them in a visible section at the end, never collapsed.
4. **Every number gets a picture.** A dimension line on the span it measures, a line chart when it changes over time, or else a waffle, bar, or sparkline beside it. Tabular figures, the unit smaller and in `--text-dim`, and the comparison stated (`from 5,600`).
5. **Motion shows change or flow.** Blocks rise in once. Dots move along edges at the real rate. Steps reveal parts. Nothing loops for its own sake.
6. **Craft is part of the meaning.** Nodes sit raised on a dot-grid stage. Shapes say what a thing is (a cylinder is a store). The one focal element gets a soft halo, the hot path a glow. No glassmorphism, neon, gradient text or backgrounds, blobs, clip-art, or emoji.

## Typography

| | Rule |
|---|---|
| Hierarchy | Few sizes, big jumps. Contrast comes from the gap between body and display, not from many middle steps. Each level changes one or two of size, weight, and color, never all three. Start with every word quiet, then promote only what must be read first. |
| Measure | Body about 65ch (45–75 characters per line; 66 is the classic ideal). Side notes and multi-column text 40–50. Lead 40–50ch. |
| Breaks | Break display lines at phrase boundaries. Flush left, ragged right; never justify on the web. |
| Numerals | `tabular-nums` in tables, KPIs, and anything that updates. Proportional figures in prose (oldstyle in Paper). Number columns right-aligned. Format for reading (`5.6k`, `−86%`) and repeat the unit in every label. |
| Characters | Curly quotes and apostrophes. `–` for ranges, `—` for a break, `−` for minus, `×` for multipliers and sizes, `…`, `≤`. A no-break space between number and unit (`1&nbsp;ms`). |
| Emphasis | Bold or italic, never both. Underline only links and linked terms. |

## Layout

| | Rule |
|---|---|
| Grid | 12 columns on the 64rem container, `s-5` gutter. Text spans about 8 columns, figures 12, section labels and side notes 3. Every left edge lands on a column line. |
| One axis | Kicker, headline, deck, figures, captions, and section labels share one flush-left edge. Center only a single number or a title slide. |
| Entry points | Reading order: kicker → headline → deck → figure → caption → body. Each screen has one dominant element, one or two secondary ones, and quiet text. Squint test: blur the page and the dominant element still reads. |
| Section opener | Pick one per page and keep it. Swiss head: a hairline, a mono label in columns 1–3, the `h2` in 4–12 on a shared baseline (reports, reviews; `page.html`). Kicker head: a small label above the `h2` (explainers). Figure head: a full-width figure first, the `h2` as its title (narratives). |
| Proximity | Space above a heading is 2–3× the space below it. A caption sits `s-3` from its figure. Related things are always closer than unrelated things. |
| Rhythm | Vary width and density down the page: wide figure → number strip → grid of small multiples → short text. Avoid three identical blocks in a row. |
| Structure | Space first, a hairline second, a frame last. No card inside a card. Leave real empty space; asymmetric space reads as deliberate, evenly spread gaps read as unfinished. |

## Figures

| | Rule |
|---|---|
| Pick by relationship | Change over time → line or sparkline. Magnitude → bars. Part of a whole → waffle or stacked bar. Ranking → sorted bars. Deviation → bars around zero. Distribution → strip or histogram. Correlation → scatter. Flow → diagram with flow dots. Place → map. |
| Data-ink | Every mark carries data or guides the eye. No chart borders, plot backgrounds, heavy gridlines, or 3D bars. Gridlines in `--border`, only when values must be read. |
| Layering | Ground (texture, rules) < structure (nodes, axes) < data < signal (accent). Each layer is quieter than the one above it. Two lines close together make a third shape (1+1=3): add space or merge them. |
| Smallest difference | Make each distinction as subtle as it can be while it is still clear. Two label levels only: small and dim, larger and bright; bold for emphasis inside them. |
| Labels | On the data, horizontal, left-aligned. Repeat the unit. No legend under 5 series. A `--bg` halo where a label crosses a line. |
| Annotate | One or two notes per chart at the point the caption names: a short leader line and a plain phrase. |
| Honest scale | Bars start at zero. Small multiples share one scale. Sort by value unless the order means something. Line charts about 2:1 to 3:1. |
| Line weights | Three: 1 for structure, 1.5–1.75 for data and outlines, 2.5–3 for the signal. Glyph strokes match the stem weight of the labels beside them. |
| Color scales | Sequential: one hue in OKLCH lightness steps. Diverging: two hues around a neutral middle. Categorical: up to 5 hues at equal OKLCH lightness and chroma. Never color alone. |
| Optical alignment | Center a label on its cap height, not its box. Nudge triangles and play icons toward their point; round shapes overshoot a flat edge by about 2%. |

## Topic motif

The register sets the base. The subject adds a light touch of its own, so a page about Postgres does not look like a page about audio. Take the motif from the subject and use it in 2–3 places at most.

| Lever | Rule | Examples |
|---|---|---|
| Accent hue | The subject's own color (brand, material, convention), adjusted to 4.5:1 on `--bg` and `--surface` in both schemes. Keep the register accent if the hue reads as a status color (red ≈ risk, green ≈ ok). | Postgres blue · Rust orange · Kubernetes blue · Redis red → keep the register accent |
| Stage texture | Dot grid by default. 24px line grid for systems and plans, ruled lines for writing, isometric grid for hardware and 3D. Texture at 15% contrast or less. | |
| Glyphs | Node glyphs from the domain's own symbols, line-drawn. | circuit symbols · map pins · waveform · git branch |
| Type detail | One typographic habit of the domain. | price columns for finance · mono timestamps for incidents · small caps for specs · superscript citations for research |
| Shape language | The domain's own diagram convention. | swimlanes for processes · ledger for accounting · timing staff for protocols · floor plan for physical layout |

Test each touch: if removing it makes the page no harder to read and no less specific to the topic, cut it. No puns, mascots, or illustration.

## Scale

The kit defines the steps: `--t-label` to `--t-h1`, `--s-1` to `--s-8`, `--r-1` and `--r-2`, and `--fast`, `--med`, `--slow` with `--ease`. Your own CSS uses them and nothing else.

| Decision | Rule |
|---|---|
| Spacing | Scale steps only. Inside a component: `s-2`–`s-4`. Between components: `s-5`–`s-6`. Between sections: `s-8`. A bigger gap means less related. |
| Type | The kit's sizes only. `--t-small` only for buttons, code, and mono labels. |
| Labels | `.ve-label`. Uppercase (`.caps`) only for 3 words or fewer. |
| Radius | `r-1` for chips, buttons, inputs, and inline highlights. `r-2` for frames, tables, and overlays. Nothing else is rounded. |
| Accent | One accent, on 10% of the screen or less. Status colors (`ok warn risk info`) only mean status. |
| Motion | Your own motion moves and reveals only with `transform`, `opacity`, and `stroke-dashoffset`: `fast` for hover, `med` for state, `slow` for steps, always `--ease`. |
| Effects | Shadow (`--lift`): raised diagram nodes and overlays only. Glow: the key node (`--halo`) and the hot edge only. |
| Layout | Figures use the full width. Card grids: `repeat(auto-fit, minmax(13rem, 1fr))`. |

## Components

| Component | Spec |
|---|---|
| Page header | `h1` states the answer; if the answer is a number, the number leads it in accent. The lead is a sentence or two with one bold phrase. |
| Dimming | Never fade text: a dimmed label changes to `--text-dim`. Never put accent-colored text on `--accent-dim`; use `--text` there. |
| KPI strip | Each cell: label → value → its picture (waffle, bars, or sparkline). |
| Table | Header: surface, label style. Cells: `t-body`, padding `s-3 s-4`. Row rules only. Numbers right-aligned and tabular. Inside `.table-scroll` with an `r-2` frame. |
| Callout | Surface, `r-2`, padding `s-4`, a status chip as its title. No colored side bar. |
| Code | Mono `t-small`, surface, `r-2`, padding `s-4`, scrolls horizontally. Inline code: `.875em`, no box. |

## Polish pass

- The same element looks the same everywhere: anything you draw yourself reuses the kit's classes.
- Sections get `scroll-margin-top` under a sticky nav.
- Nothing shifts on load: every SVG has a `viewBox`, and every image has a width and height.
