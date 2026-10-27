# Upstream

The upstream author's look. It has four registers. Each register has its own fonts, palette and stage texture. Use it when the user asks for it.

## Registers

Set the register with `<html data-register="…">`. The default is `instrument`.

| Register | Use for | Marks |
|---|---|---|
| `instrument` | diff and plan reviews, audits, metrics, status | a KPI strip near the top when the page has metrics; tabular numbers everywhere; cells split by hairlines; status as shape and word |
| `blueprint` | architecture, data flow, systems, visual plans | a 24px grid behind figures; boundaries as dashed frames with a mono tag; numbered callouts ① ② on the drawing; dimension lines for spans |
| `paper` | concepts, how-it-works pages, fact-checks, long reading | serif headings; a narrow text column with wide figures; margin notes at 1200px and wider; `Fig. N` labels |
| `editorial` | recaps, narratives, decks, demos | display type at full scale; an asymmetric grid with large empty areas; one number or phrase per screen carries the page |

- `--border-bright` (3:1 contrast) draws meaningful outlines. `--border` draws decorative rules only.
- A slide deck or video deck copies its register's token block from `kit/kit.css`.

## Topic motif

The subject adds 2 or 3 touches of its own. A page about Postgres then looks different from a page about audio.

- **Accent hue:** the subject's own color, adjusted to 4.5:1 contrast in both color schemes. Postgres gets blue. Rust gets orange. Keep the register accent when the subject's color reads as a status: red reads as risk and green reads as ok.
- **Stage texture:** the register's grid by default. Ruled lines suit writing. An isometric grid suits hardware. Keep the texture at 15% contrast or less.
- **Glyphs:** line drawings from the domain's own symbols: circuit symbols, map pins, a waveform, a git branch.
- **Type detail:** one typographic habit of the domain: price columns for finance, mono timestamps for incidents, small caps for specs.
- **Shape language:** the domain's own diagram form: swimlanes for processes, a ledger for accounting, a timing staff for protocols.
- Cut every touch whose removal leaves the page as easy to read and as specific. Puns, mascots and illustrations have no place.

## Layout

- A 12-column grid. Text spans about 8 columns. Figures span 12. Section labels and side notes span 3.
- Every left edge sits on a column line. Headline, figures and captions share one flush-left edge.
- Display lines break at phrase boundaries.
- A page uses one kind of section opener. A review uses `.sec-head`, a label beside the `h2`. An explainer uses a small label above the `h2`. A narrative uses a full-width figure titled by the `h2`.

## Page CSS

Reuse the kit's classes first. A page's own CSS uses only the kit's steps: `--t-label` to `--t-h1`, `--s-1` to `--s-8`, `--r-1`, `--r-2`, and `--fast` `--med` `--slow` with `--ease`.

- **Spacing:** `--s-2` to `--s-4` inside a component. `--s-5` to `--s-6` between components. `--s-8` between sections. A bigger gap means the parts are less related.
- **Radius:** `--r-1` for chips, buttons, inputs and inline highlights. `--r-2` for frames, tables and overlays. Nothing else is rounded.
- **Color:** one accent on 10% of the screen or less. A dim label uses `--text-dim`. Text on `--accent-dim` uses `--text`.
- **Motion:** only `transform`, `opacity` and `stroke-dashoffset`. `--fast` for hover. `--med` for a state change. `--slow` for steps. A shadow (`--lift`) only on raised nodes and overlays.
- **Callout:** a surface with `--r-2` radius, `--s-4` padding and a status chip as its title.
- **Code block:** mono at `--t-small` on a surface with `--r-2` radius and `--s-4` padding. It scrolls sideways.

## Avoid

Inter, Roboto, Arial or system-ui as the only font. Violet or fuchsia Tailwind accents. Neon. Glassmorphism. Gradient text, gradient backgrounds and blobs. Clip-art, mascots and emoji markers. Centered everything. An accent bar on a rounded card. `01/02/03` when the order has no meaning.

Switchable themes or a named palette: `upstream-themes.md`.
