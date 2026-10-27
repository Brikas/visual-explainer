# Red Blob

The look of Amit Patel's Red Blob Games (redblobgames.com): a white column on warm grey, red bands for the header and each section heading, serif text under sans headings. Fits an algorithm or data structure on a grid or graph where the reader moves a marker and the result redraws. Light only.

- A concept keeps one color on the cell, on the word in the text and on the name in the code: `start frontier reached goal path` classes, with a `.legend` square inside the sentence that names the concept.
- Grids are SVG `cell` polygons in a pale fill with a grey outline; `highlight`, `wall`, `reached`, `frontier`, `unexplored` mark state. Saturation marks only the one or two cells that matter. `trail` draws a wide translucent path; `marker` is the draggable point.
- Labels are sans, centered on the cell.
- Interaction: hover or drag on the diagram, and it redraws at once. A stepper walks an algorithm's loop one iteration at a time.
- Two states of the same algorithm side by side for comparison.
- `--hue` on `:root` recolors the bands and links.
