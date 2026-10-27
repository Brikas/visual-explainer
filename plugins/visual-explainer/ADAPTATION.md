# Adaptation

This skill is a GitHub fork of an upstream skill. The fork keeps its own commits on top of upstream. It merges upstream from time to time. This file is the rule set for those merges.

## Repositories

- **Upstream:** `https://github.com/nicobailon/visual-explainer`. Git remote `upstream`.
- **Fork:** `https://github.com/Brikas/visual-explainer`. Git remote `origin`, branch `main`.
- A fresh clone has no `upstream` remote. Add it once.

## The rule

Upstream's look and upstream's wording exist in one place only: the `upstream` style in `references/visual/upstream*`. Everywhere else the fork holds pure philosophy, plain wording and neutral tokens. Every merge removes the upstream look and wording that arrive with it.

- **Look** is any font, color, palette, texture, shadow, glow, gradient, radius, letter-spacing, uppercase label or entrance animation. It goes to `references/visual/upstream.css` or `upstream.md`. The kit and the templates keep a neutral token in its place.
- **Wording** is any sentence that breaks `references/writing/words.md`: slogans, clause chains joined by commas, "X, not Y" definitions, em dashes and marketing words. It gets rewritten in place.
- **Harness packaging** for anything other than a Claude Code skill folder gets deleted.

## Layers

The skill has three layers. Each layer is one folder in `references/`.

1. **Philosophy** (`references/philosophy/`): what to draw and why. Principles, the kit's parts, diagrams, motion, page types, plans, slides and video. Upstream owns the meaning. The fork owns the wording.
2. **Writing** (`references/writing/words.md`): how text reads on a page and in the skill's own files. The fork owns it.
3. **Visual** (`references/visual/`): fonts, colors and decoration. Each style is a pair: `<name>.css` layered over `kit/kit.css` and `<name>.md` with the rules for drawing in it. A page picks one with `<html data-style>`. Plan pages pick one the same way. The default is `plain`. The fork owns the layer.

The renderers and the kit's mechanics are code. Upstream owns them.

## What the fork changed in upstream's files

Examples of each kind of change. They show where upstream content now sits when a merge touches it.

- **Moved to the upstream style**
  - The four register token blocks in `kit/kit.css` → `references/visual/upstream.css`. The kit now holds neutral tokens. Decoration that the kit hard-coded (frame border and padding, hot-path glow, uppercase mono labels, entrance rise, h1 letter-spacing) became tokens with neutral values.
  - The Blueprint tokens, page grid and dot stage in `plan/plan.css` → tokens with neutral values. `upstream.css` sets the Blueprint values.
  - `templates/page.html` → `references/visual/upstream-page.html`.
  - `examples/replay-job-queue.html` → `references/visual/upstream-example-replay.html`.
  - `references/themes.md` → `references/visual/upstream-themes.md`.
  - The registers, topic motif, layout grid and page CSS rules of `references/style-guide.md` → `references/visual/upstream.md`.
- **Split by layer**
  - `references/style-guide.md` → `philosophy/principles.md` (attention, layout and figure rules), `writing/words.md` (numbers and characters) and `visual/upstream.md` (the look).
  - `commands/*.md` (slash-command prompts) → `philosophy/page-types.md` (diff review, comparison, fact-check, plan review, project recap, implementation plan).
- **Stripped to neutral**
  - `templates/slide-deck.html`: Editorial fonts and palette → neutral tokens. The engine is unchanged.
- **Reworded in place**
  - `SKILL.md`: "Show, don't tell" → "Figure rules". "Figures lead, words label." → "Most sections open with a figure."
  - `philosophy/kit.md`, `diagrams.md`, `motion.md`, `plans.md`, `slides.md`, `video.md` and `extras.md`.
  - `README.md` → a short description of the fork.
- **Removed**
  - Other harnesses: `commands/`, `mcp/`, `extension.ts`, `configs/`, `install-pi.sh`, `.claude-plugin/`, `plugin.json`.
  - Upstream prose that the skill never loads: `CHANGELOG.md`, `eval/`, `pptx/README.md`.
  - Images for upstream's README: `banner.png`, `replay.gif`.
  - `scripts/check-versions.mjs`. It checked the removed manifests.

## Fork decisions

- Frontmatter follows the workspace's skill rules. `metadata.source.commit` is the last merged upstream commit.
- Pages go to the workspace's `topics/<topic>/`.
- The only harness is Claude Code.
- A page gets no look it did not choose. The default style is `plain`.

## Merging upstream

1. Run `git fetch upstream`. Then run `git merge upstream/main`.
2. Resolve each change by the rule and by its layer:
   - **Code:** take upstream's version. Then move any look it adds into tokens and `upstream.css`.
   - **Philosophy:** take upstream's meaning. Write it into the matching fork file in the fork's wording. A file the fork moved shows as deleted or renamed. Find its new place in the list above.
   - **Writing:** keep `references/writing/words.md`. Port an upstream rule only if it does not conflict with it.
   - **Visual:** new registers, tokens, fonts and decoration go to the `upstream` style. They never become the default.
   - **Removed files:** keep them removed.
   - **New features:** take them. Then check them in every style.
3. Grep the merged tree for upstream look outside `references/visual/upstream*`: font names, hex colors, `uppercase`, `drop-shadow`, gradients.
4. Run the unslop text scanner on every changed `.md` file.
5. Render one test page in every style. Render one test plan in `plain` and `upstream`. Each render ends with no `✗`. Look at each sheet.
6. Run `node scripts/check-kit.mjs`.
7. Set `metadata.source.commit`. Commit and push to `origin`.
