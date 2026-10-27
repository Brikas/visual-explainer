# Ciechanowski

The look of Bartosz Ciechanowski's explainers (ciechanow.ski): a light grey page, IBM Plex Sans and flat drawings directly on the page. It fits a mechanism explained part by part, one drawing at a time. The reader drags or scrubs each drawing. Light only.

- The page holds many small drawings in sequence. Each drawing shows one idea. Each drawing is as wide as the column. The system builds up across the drawings.
- One color per part for the whole page.
  - `c-<color>` on a text span colors the word that names the part.
  - `c-<color>` on an SVG element with class `part` gives a flat fill and a darker outline of the same hue.
  - Colors: `red orange yellow green cyan blue violet gray`.
- `line` is a 1.5 `#333` stroke with round caps.
- Labels are few. A label is a short word next to its part. The text around a drawing carries the explanation.
- Interaction: the reader drags on the drawing or moves one slider directly under it. Animation runs in real time. The reader can stop it.
- Drawings sit on the page. They have no card, border, shadow, gradient, icon, gridline or legend box.
