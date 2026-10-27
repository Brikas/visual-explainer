# The kit

The kit is the shared CSS, SVG defs and script of every page. The page source holds one marker line. The renderer replaces the marker with the kit and the chosen style. This file lists the parts the kit provides. `diagrams.md` holds the drawing rules. `motion.md` holds steppers, replays and live figures.

## The source

```html
<!doctype html>
<html lang="en" data-style="plain">
<head>
<title>94% of reads never touch the database</title>
<link rel="stylesheet" href="kit.css" data-ve-kit>
<style>/* this page's CSS only */</style>
</head>
<body><main>
  <header>
    <p class="eyebrow">Read path</p>
    <h1><span class="num">94%</span> of reads never touch the database</h1>
    <p class="lead">One sentence. <b>One key phrase.</b></p>
    <p class="meta">service · source · date range</p>
  </header>
  <figure>
    <div class="frame"><svg class="ve-svg" viewBox="0 0 800 300" aria-label="What the picture shows">…</svg></div>
    <figcaption><span class="fig-n">Fig. 1</span>The claim in one sentence.</figcaption>
  </figure>
  <section>
    <div class="sec-head"><p class="ve-label caps">Load</p><h2>The takeaway as a heading</h2></div>
    …
  </section>
  <section class="sources" aria-label="Sources"><p class="ve-label caps">Sources</p><p><code>src/cache/user.ts:14</code></p></section>
</main></body>
</html>
```

The renderer adds the charset, the viewport, the favicon, the kit CSS, the style CSS, the script and the SVG defs. The defs are the `#ve-ah` arrowhead, the `#ve-node` fill and the `#ve-w-on` and `#ve-w-off` waffle cells.

Tokens are CSS variables such as `var(--accent)` and `var(--s-4)`. A page's own `:root { --accent: … }` overrides the style.

## Parts

| Part | Markup |
|---|---|
| Node | `<g class="ve-n [is-key]"><rect class="sh"/> [<path class="gl"/>] <text/> [<text class="sub"/>]</g>`. Text centers on its `y`. A datastore is `path.sh` with `ellipse.sh.lid`. `<text class="ve-kind">` names the kind. |
| Edge | `<path class="ve-e [is-hot\|is-async]"/>` with the arrowhead included, plus `<text class="ve-el [l\|r]">verb</text>`. `l` ends at `x`. `r` starts at `x`. Draw edges before nodes. |
| Boundary, slots, axes | `rect.ve-bnd` with a `text.ve-bnd-t` tag. `rect.ve-slot` (`.is-on` fills it). `.ve-axis` lines with `text.ve-axis-t` labels. |
| Table | `<div class="ve-table"><table>`. `class="num"` on number cells. `<small>` for a note in a cell. |
| Flags | `.is-new` and `.is-gone` on `.ve-n` or `.ve-e`. `<text class="ve-x">✕</text>` marks a blocked edge. |
| KPI strip | `.kpis` › `.kpi`: `<span class="ve-label">Hit rate</span><span class="val"><span data-count="94">94</span><span class="unit">%</span></span>` plus a data tag. `data-count` counts up. |
| Small multiples | `.cases` › `<div class="case" data-st="ok\|warn\|risk">`: a chip, an `<h3>` and `<svg class="ve-mini" viewBox="0 0 240 128">`. Changed parts get `.is-st`. A missing part gets `.is-off`. |
| Chips | `<span class="chip ok\|warn\|risk">word</span>` |
| Linked highlighting | `data-ref="redis"` on any part. A term in the text is `<span class="ve-ref" data-ref="redis" tabindex="0">` (`diagrams.md`). |
| Stepper, replay, callouts, dimensions, flow dots | `.ve-steps` with `data-s`, `.ve-tok`, `.ve-at` and `.ve-vals` (`motion.md`). `.ve-co`, `.ve-dim` and `data-flow` (`diagrams.md`). |

## Data tags

The renderer turns each tag into the SVG it describes. Put `<ve-bars>` and `<ve-waffle>` in a `.kpi` or a `<figure>`. Put `<ve-stack>` in a `.frame`, which scrolls it on a narrow screen. A screen reader reads `label` in place of the picture.

```html
<ve-bars unit="ms" max="9" label="A hit takes 1 ms; a miss takes 9 ms"><ve-bar value="1" hot>hit</ve-bar><ve-bar value="9">miss</ve-bar></ve-bars>
<ve-waffle value="94" note="6 misses" label="94 of 100 reads hit Redis"></ve-waffle>
<ve-stack unit="k" label="Postgres serves 6k of 100k reads"><ve-bar value="94">Redis</ve-bar><ve-bar value="6" hot>Postgres</ve-bar></ve-stack>
```

- **Bars:** rows in the order written, starting at zero, each value with its unit. `hot` marks the bar that matters. Charts with the same `max` share one scale. A label holds up to 9 characters. A value with its unit holds up to 6. The render rejects longer text.
- **Waffle:** `value` is a whole number from 0 to 100. `note` names the empty cells.
- **Stack:** one bar split in proportion. The label of a narrow segment moves down one row.

`<ve-flow>` lays out boxes and arrows on a grid without coordinates. It brings its own `.frame`.

```html
<figure class="ve-steps">
  <ve-flow label="The API asks Redis; a miss reads Postgres.">
    <ve-node id="api" at="1 1" sub="user-service" key data-s="1" data-ref="api">API</ve-node>   <!-- at="column row" -->
    <ve-node id="redis" at="2 1" data-s="0 2" data-ref="redis">Redis</ve-node>
    <ve-node id="pg" at="1 2" shape="db" data-s="3">Postgres</ve-node>
    <ve-edge from="api" to="redis" label="get key" data-s="2"/>
    <ve-edge from="api" to="pg" label="miss · 9 ms" hot data-s="3"/>
  </ve-flow>
  <div class="ve-player">…</div>
  <figcaption>…</figcaption>
</figure>
```

- Flags: `key`, `hot`, `async`, `new`, `gone`.
- `data-s` and `data-ref` work as on drawn parts. Each arrow with `data-s` gets a replay token.
- An arrow label holds about 12 characters at most.
- A render error names its line: `line 42 <ve-bar>: value="-3" is negative`.

`<ve-ask id="ttl" q="Key lifetime?"><ve-opt value="60">60 s</ve-opt><ve-opt value="300">5 min</ve-opt></ve-ask>` asks the reader to choose. The answer joins the reader's reply. `default` and `multi` are optional.
