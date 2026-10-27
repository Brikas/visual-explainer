# Distill

The look of distill.pub articles: a white page, the system sans, section headings over a hairline and small grey captions. It fits a technical essay that argues a result step by step with numbered figures and math. Light only.

- A page has one accent hue: `--accent` with its pale tint `--accent-dim`.
- Figures are grey outlines at 1.5. The subject of each figure is the one place in the accent. Drawn parts mark it with class `subject`.
- Saturated color marks only the active element. Fills are pale tints.
- Every caption opens with a bold sentence (`<b>`) that states what the figure shows. The caption then says what to hover or drag.
- A figure may run wider than the text column, up to 984px, when it needs the room.
- Interaction: hovering highlights linked parts (`data-ref`). Sliders change a parameter. Transitions take about 0.3 s, linear.
- Links keep the text color and get a grey underline.
- Figures have no rounded cards, shadows on parts, 3D, decorative gradients or rainbow ramps for ordered values.
