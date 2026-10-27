# Hand-drawn SVG figures

Inline SVG is the default figure. It gives exact placement, the page's tokens and fonts, and motion. The kit (`kit.md`) styles and runs every pattern in this file. This file gives the markup contracts and the drawing rules. Steps, replays, live figures and 3D: `motion.md`.

## Plan on a grid

```
x:  40        280        520        760      columns 240 apart
    ┌──────┐  GET /u   ┌──────┐  miss   ┌──────┐
y:90│Client│──────────►│ API  │────────►│  DB  │
    └──────┘           └──┬───┘         └──────┘
                     hit  │ reads
y:210                  ┌──▼───┐
                       │Cache │
                       └──────┘
```

- Sketch the figure in ASCII first. Then turn its columns and rows into coordinates.
- Labels are 14 units or larger. The renderer scales the drawing so labels stay readable on a phone.
- Boxes sit at least 40 units apart.
- Edges are orthogonal: `M x y H x V y`.
- A label sits 9 units above its line.
- SVG text does not wrap. A line holds about 18 characters. A second line is `<tspan x=".." dy="1.2em">`.
- A boundary (a process, a network, a trust zone) is a dashed `rect.ve-bnd` with a `text.ve-bnd-t` label in its top-left corner.
- A system with more than about 12 nodes gets an overview of 5 to 8 nodes. The detail goes in cards or a second figure.
- A sequence has one column per actor with a thin lifeline. Time runs down. Each arrow carries the name of its call.
- A schema has one box per table with its key fields in mono. Crow's-foot ends mark the many side.

## Shapes

- The shape says what a part is. A rect is a service. A cylinder is a datastore (`path.sh` with `ellipse.sh.lid`). A rect with 3 short dividers is a queue. A dashed rect is optional or down.
- A glyph (`.gl`) is a 16-unit line drawing in the node's top-left corner. Use one only when the name does not say the kind. Emoji are never glyphs.
- A solid edge is a sync call. A dashed edge is async or optional. A thick accent edge is the path the figure is about. A red ✕ marks a blocked edge.

## Dimensions

A number that measures a span sits on that span: the latency down a sequence's time axis, a TTL window on a timeline, a field's size on a byte layout.

```
   ┼                       ┼    extension lines from the two measured points
   │◄─────── 9 ms ────────►│    dimension line with the value in a gap at its middle
```

```html
<g class="ve-dim"><path class="ext" d="M120 300V322M380 300V322"/><path class="ln" d="M120 316H380M116 320l8-8M376 320l8-8"/><text x="250" y="310">9 ms</text></g>
```

- Each end gets a short 45° tick.
- The value sits centered 6 units above the line.
- Dimensions run on rails beside the shapes. The shortest rail sits nearest.
- Spans that add up (`1 ms` then `9 ms`) chain on one rail. Their total sits on the next rail out.
- The dimension that carries the figure's claim takes the accent (`.is-key`). One per figure.

## Flow dots

Moving dots show the direction and volume of traffic on the main figure. The ratio of spawn intervals is the real split.

```html
<path data-flow="hit"  data-every="420"  d="M95 105H375V80H695V105H375"/>   <!-- invisible route -->
<path data-flow="miss" data-every="7000" d="M95 105H355V270H395V130H695"/>  <!-- 420:7000 ≈ 94:6 -->
<g class="ve-dots" aria-hidden="true"></g>                                   <!-- after edges, before nodes -->
```

- Routes pass through node centers. A dot enters one box and leaves the next.
- One moving layer per page.

## Linked highlighting

Elements that share a `data-ref` light up together: a term in the text, a node, an edge, a card, a button.

- A term in the text gets `tabindex="0"`.
- One element can carry several refs: `data-ref="hit miss"`.
- Link 2 to 4 key terms per figure.

## Callouts

A callout is a numbered circle with a short leader line. The line ends exactly on the point it names. Plan heroes use the same mark.

```html
<path class="ann" data-s="3" d="M520 71V96"/><g class="ve-co" data-s="3" transform="translate(520 60)"><circle r="11"/><text>3</text></g>
```

- In a stepper, callout N belongs to step N. The circle and its leader get `data-s="N"`.
- Without a stepper, list the callouts under the figure as one-line notes: `③ the miss reads Postgres`.
- 3 to 6 callouts per figure.

## Before and after

- One drawing in the same coordinates with a toggle. `button[aria-pressed]` flips `figure[data-view]`. Groups carry `.only-before` or `.only-after`.
- Added parts get an `--ok` stroke. Removed parts get a dashed `--risk` stroke.
- A static version is two panels side by side at the same scale.

## Small multiples

- The same small diagram once per case in the same coordinates. The eye then sees only the difference.
- The part that changes takes the case's status color: `.case[data-st]`, with `.is-st` on a kit edge or node and `var(--st)` on drawn shapes.
- Each card holds a status chip, a short title and the mini diagram. Mini labels are 14 units or larger.

## Small charts

A number that does not measure a span gets a small chart beside it.

- `<ve-waffle>` for "N of 100".
- `<ve-bars>` for 2 to 5 values, with `hot` on the value that matters.
- `<ve-stack>` for a share of a whole (`kit.md`).
- A trend is a sparkline: viewBox `0 0 100 24`, one `polyline`, `vector-effect: non-scaling-stroke` and an `aria-label` holding the values.
- A drawn chart's axes and ticks are `.ve-axis`. Their labels are `.ve-axis-t`.

## Page structure for 4 or more sections

- A sticky `<nav>` table of contents on the left.
- Below 1000px wide it becomes a sticky top bar. Its link list scrolls sideways with a hidden scrollbar. Its right edge fades out with `mask-image`.
- Sections get `scroll-margin-top` so the bar does not cover them.
- An `IntersectionObserver` marks the active section (`rootMargin:'-10% 0px -80% 0px'`).
- Wrap `history.replaceState` in `try/catch`. It throws on `file://` pages.

## Other shapes

- **File map:** nested `<ul>` in mono. Each path gets a status chip (added, modified, deleted) and a `+12 −3` count.
- **Timeline:** a CSS grid with one rail line and dated nodes. The newest node gets the accent.
