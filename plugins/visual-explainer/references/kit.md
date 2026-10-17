# The kit

The kit is the shared CSS, fonts, SVG defs, and script of every page. You write one marker line; the renderer puts the kit in its place. Do not read or copy `templates/page.html`. This sheet lists what the kit gives you, and `diagrams.md` gives the drawing rules.

## The source

```html
<!doctype html>
<html lang="en" data-register="blueprint">
<head>
<title>94% of reads never touch the database</title>
<link rel="stylesheet" href="kit.css" data-ve-kit>
<style>/* only this page's CSS: topic motif, bespoke figure classes */</style>
</head>
<body><main>
  <header>
    <p class="eyebrow">Read path</p>
    <h1><span class="num">94%</span> of reads never touch the database</h1>
    <p class="lead">One sentence. <b>One key phrase.</b></p>
    <p class="meta">service · source · date range</p>
  </header>
  <figure>
    <div class="frame"><svg class="ve-svg" viewBox="0 0 800 300" role="img" aria-label="What the picture shows">…</svg></div>
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

The renderer adds the charset, viewport, favicon, the register's fonts, the kit CSS and script, and the SVG defs: the `#ve-ah` arrowhead, the `#ve-node` fill, and the `#ve-w-on` / `#ve-w-off` waffle cells.

**Registers:** `data-register="instrument"` (the default), `blueprint`, `paper`, or `editorial`. Pick one with `style-guide.md`. Use the tokens as `var(--accent)`, `var(--s-4)`, and so on. A page's own `:root { --accent: … }` always wins over the kit.

## Parts

| Part | Markup |
|---|---|
| Node | `<g class="ve-n [is-key]"><rect class="sh"/> [<path class="gl"/>] <text/> [<text class="sub"/>]</g>`; a datastore is `path.sh` + `ellipse.sh.lid`; `<text class="ve-kind">` names the kind |
| Edge | `<path class="ve-e [is-hot\|is-async]"/>` + `<text class="ve-el [l\|r]">verb</text>`; draw edges before nodes |
| Flags | `.is-new`, `.is-gone` on `.ve-n` or `.ve-e`; `<text class="ve-x">✕</text>` marks a blocked edge |
| KPI strip | `<div class="kpis">` › `<div class="kpi"><span class="ve-label">Hit rate</span><span class="val"><span data-count="94">94</span><span class="unit">%</span></span>` + a data tag `</div>` |
| Small multiples | `<div class="cases">` › `<div class="case" data-st="ok\|warn\|risk">` + `<span class="chip ok">Handled</span><h3>…</h3><svg class="ve-mini" viewBox="0 0 240 128">`; mark the changed parts `.is-st`, a missing part `.is-off` |
| Chips | `<span class="chip ok\|warn\|risk">word</span>` |
| Linked highlighting | `data-ref="redis"` on any part; a prose term is `<span class="ve-ref" data-ref="redis" tabindex="0">` (`diagrams.md`) |
| Stepper, replay | `<figure class="ve-steps">`, parts with `data-s="N"` or a list `"0 3 5"`, `.ve-player` with `ol.ve-cap`; `.ve-tok`, `.ve-at`, `.ve-vals` (`diagrams.md`) |
| Callouts | `<g class="ve-co [q]" data-s="N"><circle r="11"/><text>N</text></g>` and a leader `path.ann` (`diagrams.md`) |
| Dimensions | `<g class="ve-dim [is-key]"><path class="ext"/><path class="ln"/><text/></g>` (`diagrams.md`) |
| Flow dots | `<path data-flow="hit" data-every="420" d="…"/>` and one `<g class="ve-dots">` (`diagrams.md`) |
| Entrance | automatic: blocks rise in once, `data-count` numbers count up, bars grow; none under reduced motion or in print |

## Data tags

A tag becomes the SVG it describes. Use tags for data figures and for plain box-and-arrow flows. Draw anything bespoke by hand, and never bend a figure to fit a tag. Put the tag where its SVG goes: in a `.kpi`, a `.frame`, or a `<figure>`. `label` is the sentence a screen reader reads instead of the picture.

```html
<ve-bars unit="ms" max="9" label="A hit takes 1 ms; a miss takes 9 ms">
  <ve-bar value="1" hot>hit</ve-bar>
  <ve-bar value="9">miss</ve-bar>
</ve-bars>
<ve-waffle value="94" note="6 misses" label="94 of 100 reads hit Redis"></ve-waffle>
<ve-stack unit="k" label="SKILL.md is 3.5k of a 12k read">
  <ve-bar value="3.5" hot>SKILL.md</ve-bar> <ve-bar value="4.6">style guide</ve-bar> <ve-bar value="4">diagrams</ve-bar>
</ve-stack>
```

- **Bars:** rows in the order written, from zero, each value with its unit. `hot` marks the bar that matters. Charts with the same `max` share one scale; then a label can have 9 characters and a value 6.
- **Waffle:** `value` is a whole number from 0 to 100; `note` names the off cells.
- **Stack:** one bar split in proportion. A narrow segment's label drops to the next row.

`<ve-flow>` lays out boxes and arrows on a grid, so you write no coordinates. It brings its own `.frame`.

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

Flags: `key`, `hot`, `async`, `new`, `gone`. `data-s` and `data-ref` work as on drawn parts, and each arrow with `data-s` gets a replay token. Keep arrow labels short (about 12 characters).

The renderer stops on a mistake and names its line: `line 42 <ve-bar>: value="-3" is negative`. Nothing is written until every `✗` is fixed.
