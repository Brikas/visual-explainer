# Slides

A slide deck is its own medium. Each slide is designed for one screen. Copy the engine in `templates/slide-deck.html` as it is: the chrome, `SlideEngine`, `autoFit()` and the delivery check. Restyle everything else.

## Plan before HTML

1. List every item in the source: sections, rows, decisions, details.
2. Map each item to a slide. Every item gets a slide. Add slides when needed.
3. Vary the composition: centered, left, right, split, bleed.

- A source with 7 sections usually needs 18 to 25 slides.
- Test: a reader who never saw the source can rebuild every major point from the deck.

## Budget per slide

A slide is one `100dvh` screen. It does not scroll.

| Type | Holds at most |
|---|---|
| Title / Full-bleed | heading + subtitle |
| Divider | number + heading + subhead |
| Content | heading + 5 bullets of ≤2 lines, or heading + one figure |
| Split | two panels, each within its own type's limits |
| Diagram | heading + one SVG figure (≤ 10 boxes, 18px+ labels, 2px+ edges) |
| Dashboard | heading + 6 KPIs; hero value ≤ 6 characters |
| Table | heading + 8 rows; continue on the next slide |
| Code | heading + 10 lines |
| Quote | ≤ 25 words + attribution |

- One focal point per slide. The heading states the slide's takeaway.
- Body text is 18px or larger in the sans face. The display face is for headings only.
- A figure is preferred over bullets.
- Figures at slide scale: node text 24, edge labels 18, strokes 2.5 (hot path 3.5), arrowheads 16 in `userSpaceOnUse`, `max-height: 56dvh`.
- Below 768px wide, the SVG keeps `min-width: 720px` inside a scroll wrapper.
- Three centered slides in a row are a defect.
- Type sizes use `clamp(px, vw, px)`.
- At `max-height: 700/600/500px`, reduce padding and hide decoration.
- The engine pauses slide keys while focus is in `.diagram-shell`, `.table-scroll`, `.code-scroll` or a form field. Put scrollable content there.

## Delivery check

`overflow:hidden` clips content without warning. Before shipping:

1. Turn on `prefers-reduced-motion: reduce` (Chrome DevTools → Rendering).
2. Load the deck at the target size and at about 1280×600.
3. The template outlines each failing slide. Red means overflow. Amber means `autoFit` was used. The console logs `Slide delivery check failed`.
4. Split or cut slides until the console logs `passed`.

## PPTX

Only on request or with `--pptx`.

- Build the HTML deck. Then run `visual-explainer-pptx deck.html deck.pptx` (or `node ./pptx/export.mjs` from a checkout).
- Tell the user the HTML stays the source. The PPTX has no animation, navigation, custom fonts, live diagrams or JS.
- `visual-explainer-pptx` reads each `section.slide`: headings, `.slide__subtitle`, lists, paragraphs, tables and `pre`. Keep that structure semantic.
- The export drops SVG, figures and captions. When PPTX is requested, each figure slide also states its claim in a `<p class="slide__body">`.
