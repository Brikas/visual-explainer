# Figures that move

Read this file when a figure changes on the page: a stepper, a scene player, a replay, a live figure or 3D. The drawing follows `diagrams.md`. The kit (`kit.md`) runs all of it.

## Stepper and scene player

Each step brings its parts forward with a one-line caption. A stepper with Play and a scrub bar is a scene player.

```
<figure class="ve-steps">  parts: data-s="N" (appears at step N) · paths with pathLength="1" draw in
  .ve-player → ol.ve-cap > li[data-n="1/5"] · button[data-go=-1] · button[data-play] · input[type=range] · button[data-go=1]
```

- The number of steps is the number of `li`. `data-s` counts from 1.
- The figure opens on the last step, which is the complete picture. Play replays from step 1.
- One claim per step. Something visible changes at every step.
- Nothing autoplays.

## Replay: states and events

A replay shows a state machine, a workflow or a reducer one event per step.

- The caption says what happened and why: `miss → fetch, because the TTL expired (cache.ts:48)`.
- The "why" is the guard or branch that fired. Cite it from the code. Never invent it.
- Pick 6 to 12 events that carry one claim. Show the other branch as a second stepper or as small multiples.
- If the events come from a real run, the figcaption says so.

`data-s` may list several steps. A part appears at the first listed step and lights on each listed step. `0` draws the part from the start. Draw the whole machine with `0` and let the run light its path. On a step, the edges that fired and the node's border light up, and each token runs once. To light a route, give every edge on it the step and run one token along the joined `d`. The last step is the full picture.

```html
<path class="ve-e" data-s="0 3 5" d="M730 90H800"/>                                              <!-- drawn all along; lights on 3 and 5 -->
<g class="ve-co q" data-s="0 3 5" transform="translate(765 68)"><circle r="11"/><text>3</text></g>   <!-- its number, filled on 3 and 5 -->
<circle class="ve-tok" data-s="6" r="5" style="offset-path: path('M910 150V295H650V150'); --dur: 2200ms"/>   <!-- a route -->
<circle class="ve-tok" data-s="1" r="5" style="offset-path: path('M170 90H240'); --d: 130ms"/>   <!-- one of a burst -->
<g class="ve-at job" data-s="3 4" style="--d: 850ms"><rect x="217" y="72" width="26" height="26" rx="4"/><text x="230" y="85">J3</text></g>   <!-- .ve-at shows and hides it; .job is your own fill and stroke, over an empty slot you draw -->
<g class="ve-vals"><text class="sub" data-s="0" x="236" y="52">0 / 8</text><text class="sub" data-s="2" x="236" y="52">5 / 8</text></g>
```

- **Tokens** run under the nodes. A token enters each box and leaves from the far side. A token that lands in a slot or leaves a slot goes after the nodes. `--dur` sets the run time (default 900 ms). `--d` delays the start. A burst is tokens about 150 ms apart.
- **Parts that come and go** are `.ve-at` groups: a queued job, a busy worker, the ring of the current state. Each shows only on the steps its `data-s` lists. A plain `data-s` part stays once it appears. Draw the empty slot underneath.
- **A changing value** (a count, a TTL, a state name) is one text per step at one spot inside `.ve-vals`, in step order.
- **A shared resource** (a worker pool, permits) is a dashed boundary (`.ve-bnd`) holding its slots (`rect.ve-slot`, `.is-on` when filled) and its count.
- **Kind labels:** `<text class="ve-kind">` above a node name: `fact`, `decision`, `state` or `effect`. Number edges with `.ve-co.q` when captions refer to them.

## Live figure

A live figure has controls that recompute the picture. The reader then sees what a setting does. Example: a TTL slider moves the hit rate, the dot split and the headline. A policy toggle can show a bad rule giving a better-looking but wrong number.

- One to three controls (`input[type=range]`, `button[aria-pressed]`). Each changes something the reader cares about.
- One pure `model(settings)` function feeds the figure, the numbers and the sentence.
- The default is the real current value. Mark it on the scale.
- Insert controls from JS and hide them in print. Print and no-JS then show the default state.
- Show the formula in the caption or in a `<details>`. Label a simplified model "illustrative". Model the concept. Never copy production logic.

## 3D with three.js

Use 3D only when depth carries data: embeddings, physical or spatial layouts, stacks where height is a quantity, geometry. A graph of boxes and arrows stays 2D.

```html
<script type="importmap">{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.186/build/three.module.js","three/addons/":"https://cdn.jsdelivr.net/npm/three@0.186/examples/jsm/"}}</script>
```

- The canvas sits in a `.frame` with a fixed aspect ratio, `role="img"`, an `aria-label` and a `Fig. N` caption. A one-line text fallback states the key numbers.
- Colors come from the page tokens via `getComputedStyle`. Labels use `CSS2DRenderer`.
- One directional light plus ambient light. No bloom, fog or particles.
- `OrbitControls` with damping and zoom limits, plus a "Reset view" button.
- The view opens at an angle that shows the answer. Auto-rotate runs only until the first interaction. It never runs under reduced motion.
- `setPixelRatio(Math.min(devicePixelRatio, 2))`, a `ResizeObserver`, and rendering only while the canvas is visible.
