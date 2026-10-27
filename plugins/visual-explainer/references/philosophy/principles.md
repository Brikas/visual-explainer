# Principles

These rules hold in every visual style. A style file can change line weights and colors. It keeps the rules.

## Attention

1. About 90% of the page is neutral. The accent marks only what the reader must look at now: the key node, the hot path, the active control or the one number that matters.
2. A term in the text and its part in the figure light up together (`data-ref`).
3. The full picture comes first. The reader steps, hovers or expands to see detail. Raw material goes in `<details>`. Sources stay in a visible section at the end.
4. Motion shows a change or a flow. Blocks rise in once. Dots move at the real rate. Steps reveal parts. A replay runs one event per step (`motion.md`). Parallax, scroll-jacking and decorative loops have no place. Under reduced motion the page shows the final state.
5. The shape of a part says what the part is. A figure has one key node and one hot path.

## Layout

- Each screen has one dominant element and one or two secondary elements. The rest is quiet text.
- The page shows the reader's position: `2 / 5` or section navigation.
- The space above a heading is 2 to 3 times the space below it.
- Related things sit closer together than unrelated things.
- Width and density vary down the page: a wide figure, a number strip, small multiples, short text. Three identical blocks in a row are a defect.
- Space separates blocks first. A hairline is the second choice. A frame is the last choice. A card never sits inside a card.
- Nothing shifts on load. Every SVG has a `viewBox`. Every image has a width and a height.
- Text is flush left. Only a single number or a title is centered.
- The body text measure is about 65 characters. A side note is 40 to 50 characters wide.

## Figures

- Every mark carries data or guides the eye. Chart borders, plot backgrounds, heavy gridlines and 3D bars have no place.
- A gridline appears only when the reader must read values from it.
- Layers run from quiet to loud: ground, structure, data, signal.
- Two lines close together read as a third shape. Add space between them or merge them.
- Each distinction is as subtle as it can be while it stays clear.
- Labels have two levels: small and dim, or larger and bright.
- A label sits on its data. It is horizontal, left-aligned and carries the unit.
- A chart with fewer than 5 series has no legend.
- A label that crosses a line gets a halo in the background color.
- A chart gets one or two notes at the point its caption names. Each note is a short leader line with a plain phrase.
- Bars start at zero. Small multiples share one scale.
- Bars are sorted by value. The exception is an order with its own meaning.
- A line chart is 2 to 3 times as wide as it is tall.
- Default line weights: 1 for structure, 1.5 to 1.75 for data and outlines, 2.5 to 3 for the signal.
- A sequential color scale is one hue in OKLCH lightness steps.
- A diverging color scale is two hues around a neutral middle.
- A categorical color scale has up to 5 hues at equal OKLCH lightness and chroma.
- The status colors `ok`, `warn`, `risk` and `info` mean status only.
- Tables, KPIs and changing values use tabular numerals. Number columns are right-aligned.
