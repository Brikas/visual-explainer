# Adaptation

This skill is a private fork of an upstream skill. The fork keeps its own commits on top of upstream and merges upstream from time to time. This file is the rule set for those merges.

## Repositories

- **Upstream:** `https://github.com/nicobailon/visual-explainer`, git remote `upstream`.
- **Fork:** `https://github.com/Brikas/visual-explainer` (private), git remote `origin`, branch `main`.

## Layers

The skill has three layers. Each layer has one owner.

1. **Approach:** what to draw and why. Figure choice, show-don't-tell, motion, plans, slides, video, the kit, the renderer and its visual check. Owner: upstream.
2. **Words:** how text on a page reads. Owner: the fork, in `references/words.md`.
3. **Look:** fonts, colors, decoration. Owner: the fork. Each style is a pair in `styles/`: `<name>.css` layered over `kit/kit.css`, and `<name>.md` with the rules for drawing in it. A page picks one with `<html data-style>`; the default is `plain`. Upstream's own look is the style `upstream`.

## Fork decisions

- Frontmatter follows the workspace's skill rules. `metadata.source.commit` is the last merged upstream commit.
- Pages go to the workspace's `topics/<topic>/`.
- The only harness is Claude Code. Instructions for other harnesses are removed.
- A page gets no look it did not choose. Default style: `plain`.
- Page text follows `references/words.md`.

## Merging upstream

1. `git fetch upstream`, then `git merge upstream/main`.
2. Resolve each change by its layer:
   - **Approach:** take upstream's version.
   - **Words:** keep `references/words.md`. Port an upstream rule only if it does not conflict with it.
   - **Look:** new registers, tokens, fonts and decoration belong to the `upstream` style. They never become the default.
   - **Harness and paths:** take upstream's new text, then apply the fork decisions to it again.
   - **New features:** take them, then check them in every style.
3. Keep the diff to upstream small. Fork content goes in new files; upstream files get short pointer edits. `git diff upstream/main --stat` lists the touched upstream files.
4. Render one test page in every style. Each render ends with no `✗`. Look at each sheet.
5. Set `metadata.source.commit`, commit, push to `origin`.
