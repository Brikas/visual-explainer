# Distill

The look of distill.pub articles: white page, system sans, section heads over a hairline, small grey captions. Fits a technical essay that argues a result step by step with numbered figures and math. Light only.

- One accent hue per page (`--accent` with its pale tint `--accent-dim`). Figures are grey 1.5 outlines; the subject of each figure is the one place in the accent, class `subject` on drawn parts.
- Saturated color marks only the active element. Fills are pale tints.
- Every caption opens with a bold sentence (`<b>`) stating what the figure shows, then says what to hover or drag.
- Figures may run wider than the text column (up to 984px) when they need room.
- Interaction: hover to highlight linked parts (`data-ref`), sliders to change a parameter. Transitions about 0.3 s linear.
- Links keep the text color with a grey underline.
- No rounded cards, shadows on parts, 3D, decorative gradients or rainbow ramps for ordered values.
