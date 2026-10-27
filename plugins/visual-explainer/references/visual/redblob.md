# Red Blob

The look of Amit Patel's Red Blob Games (redblobgames.com): a white column on warm grey, red bands behind the header and each section heading, serif text and sans headings. It fits an algorithm or data structure on a grid or graph. The reader moves a marker and the result redraws. Light only.

- A concept keeps one color on its cell, on its word in the text and on its name in the code.
  - Concept classes: `start frontier reached goal path`.
  - A `.legend` square sits inside the sentence that names the concept.
- Grids are SVG `cell` polygons. A cell has a pale fill and a grey outline.
  - State classes: `highlight`, `wall`, `reached`, `frontier`, `unexplored`.
  - Saturated color marks only the one or two cells that matter.
- `trail` draws a wide translucent path across cells. `marker` is the point the reader drags.
- Labels are sans and centered on their cell.
- Interaction: the reader hovers or drags on the diagram. The diagram redraws at once. A stepper walks through an algorithm's loop one iteration at a time.
- Two states of the same algorithm sit side by side for comparison.
- `--hue` on `:root` recolors the bands and links.
