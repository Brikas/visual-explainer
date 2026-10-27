# Ciechanowski

The look of Bartosz Ciechanowski's explainers (ciechanow.ski): light grey page, IBM Plex Sans, flat drawings straight on the page. Fits a mechanism explained part by part, one drawing at a time, where the reader drags or scrubs. Light only.

- Many small drawings in sequence, one idea each, each the width of the column. Build the system up across them.
- One color per part for the whole page. `c-<color>` (`red orange yellow green cyan blue violet gray`) on a text span colors the word that names the part; on an SVG element with class `part` it gives a flat fill with a darker outline of the same hue. `line` is a 1.5 `#333` round-capped stroke.
- Few labels: short words next to the part. The paragraph around a drawing carries the explanation.
- Interaction: drag on the drawing, or one slider directly under it. Animation runs in real time and the reader can stop it.
- Drawings sit on the page: no card, border, shadow, gradient, icon, gridline or legend box.
