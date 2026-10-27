# Page types

Recipes for pages the user asks for by kind. Each recipe lists what to gather first and a typical shape. Merge, reorder, drop or add sections as the content needs. Every claim cites a path, `file:line`, command output or a source. Deliver with the rules in `SKILL.md` and hand over in one line.

## Diff review

Scope: a branch, a commit, a range, a PR or `HEAD`. With no scope, compare the working tree with `main` or `master`.

Gather first:
- diff stats and name-status
- the full changed files and the code paths around them
- public API and type changes
- tests
- dependency and config changes
- commit messages

Never invent a rationale.

| Section | Figure |
|---|---|
| Verdict | one sentence, a merge or blocked chip, and a `<ve-stack>` of lines added and removed |
| What changed | a file map with added, modified and deleted chips; `<ve-bars>` of lines per file |
| Behavior | a before and after of the same SVG with added and removed edges marked; a changed state machine or queue replays one event per step (`motion.md`) |
| Risks | a table with severity chips: correctness, tests, API, security, performance |
| Coupling | a small SVG of what depends on the changed code |
| Fixes | one `<ve-ask>` per risk worth acting on (below) |

- A fix question: `<ve-ask id="r1" q="Fix the unchecked null in parse()?">` with `<ve-opt value="fix" default note="the fix in one line">Fix</ve-opt>` and `<ve-opt value="leave">Leave as is</ve-opt>`. Number the ids `r1`, `r2` and so on.
- Status colors carry the meaning: `--risk` for removed or before, `--ok` for added or after, `--warn` for a risk, `--info` for context.
- After the reply: on a branch the user owns, apply the accepted fixes. On someone else's PR, draft review comments for the user. Never post them.

## Comparison

The input names the options or the question. If it names no options, find the real ones in the code or the conversation.

Gather first: the facts that separate the options. Every number comes from a source.

| Section | Figure |
|---|---|
| The difference | one drawing per option side by side, marking the boxes and edges each option adds or removes |
| Cases | the same mini diagram once per option for each scenario that matters |
| Trade-offs | a table with ok, warn and risk chips, one row per criterion |
| Recommendation | the option you would pick and why |
| Pick | `<ve-ask id="pick" q="Which option?">` with one `<ve-opt>` per option and `default` on the recommended one |

- Add another `<ve-ask>` only for a real sub-decision.
- After the reply, act on the pick within the original request. Build only if the user asked for a build.

## Fact-check

The input is a page. With no path, use the newest rendered `<name>.html` in the workspace's `topics/`.

1. Extract every claim that can be verified: paths, names, behavior, data flow, APIs, commands, dependencies, tests, numbers and git history. Skip opinions.
2. Check each claim against the source or `git show`. Mark it verified, corrected, unsupported or unverifiable.
3. Fix each error with a small edit to the page's source (`<name>.src.html` when it exists, else the HTML). Render again. Keep the page's structure and style. A wrong edge or label is a wrong claim.
4. Add a verification strip at the top: a chip with the count per status, and a `<details>` list of what changed.

## Plan review

The input is a plan path or plan text. With no input, ask for the plan.

Read the whole plan, every file it references and the code that depends on those files. For each proposed change, check four things:
1. the file, function or type exists
2. the current behavior matches the plan
3. the ripple effects the plan misses
4. the tests fit the repo's test style

Cite the plan section and `file:line`. Write the review as a plan page (`plans.md`). The reader then accepts or rejects each fix in place.

- **Header:** the h1 is "Review: <plan name>". The lead gives the verdict (approve, revise or reject) and the reason.
- **Hero:** a `<ve-flow>` of the planned design. The parts a finding touches are marked `gone` or `new` and linked to the finding's claim.
- **Claims:** one level-1 claim per finding, written as a sentence that can be false: "Step 3 edits a function that no longer exists." The most serious finding comes first. At most 5 level-1 claims. Smaller findings are child claims. Each claim proves itself with `<ve-code src=… lines=…>` or a quote of the plan. An unconfirmed finding gets `evidence="guess"`.
- **Decisions:** each finding gets `<ve-ask id="f1" q="Fix the plan this way?">` with `<ve-opt value="accept" default>` describing the fix and `<ve-opt value="reject">Keep the plan as written</ve-opt>`, plus any real alternative. Number the ids `f1`, `f2` and so on.
- **End:** `aux="scope"` lists what the plan gets right.

After the response, edit the plan file. Apply the accepted fixes. Leave the rejected ones as written.

## Project recap

For someone coming back to a project. The input can set a time window, for example `2w`.

Gather first:
- the README, changelog, and package and build files
- the top-level tree
- `git status`, recent commits and open branches
- TODOs in recently changed files
- progress or todo notes
- the main entry points

Report only activity the evidence shows.

| Section | Figure |
|---|---|
| What this is | one sentence, stack chips and entry points |
| Architecture | an SVG of the main modules and the data flow between them |
| Recent activity | a timeline grouped by theme |
| Current state | uncommitted work, branches and blockers as status chips |
| Hot spots | `<ve-bars>` of commits or lines changed per module, the riskiest marked `hot` |
| Commands and files | a compact reference table |
| Next | `<ve-ask id="next" q="Where do we start?">` with one `<ve-opt>` per next step the evidence supports; the best one carries `default` |

After the reply, start on the step the reader picked.

## Implementation plan

Follow `plans.md` in this order:

1. Research first: entry points, affected modules, public APIs, the data model and config, tests, similar features, and constraints in the README or changelog. Note exact `file:line` and the user's own words.
2. Write the level-1 claims. Fix them before anything else.
3. Draw the hero with `<ve-flow>`. Mark new and removed parts. Link each part to its claim.
4. Add the how and where claims, then the decisions. Mark each claim you could not confirm `evidence="guess"`. Give each level-1 claim a `check`.
5. Render, hand over in one line, and wait. Build only after the response arrives.
6. After the build, set each claim's `status` and render again.
