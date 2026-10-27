# Plans

A plan page runs in four steps:
1. The reader sees the change drawn and reads a short tree of claims.
2. The reader answers the decisions only the reader can make and sends one response.
3. You build after the response arrives.
4. You set each claim's status and render again. The page is then the record of the build.

## Write and render

The renderer checks the tags below, reads cited code from disk, and adds the CSS and script.

```sh
node ${CLAUDE_SKILL_DIR}/plan/render.mjs topics/<topic>/<name>.src.html --root <repo> --open
```

Fix every `✗`. Fix each `⚠` you cannot defend. Copy the shape of `templates/plan.html`.

## The page

```
header   eyebrow "Plan · repo" → h1 (the change and the place, 3–7 words) → lead (one sentence)
         → <ve-files> (diff stat + file map) → <ve-why> (the user's own words)
hero     <figure class="hero">: the change, drawn. ① ② ③ are the level-1 claims.
tree     <ve-plan>: 2–5 claims split by behavior, then shared, then not changing
```

The tree sits beside the sticky hero. Hovering a claim lights its parts. Draw the hero with `<ve-flow>` (`kit.md`). Three columns by three rows fill it.

```html
<figure class="hero">
  <ve-flow label="One sentence a screen reader reads instead of the picture.">
    <ve-node id="api" at="2 1" sub="deleteProject()" key claim="1">API</ve-node>       <!-- at="column row"; .5 steps allowed -->
    <ve-node id="db" at="2 2" shape="db" claim="1">projects<small data-if="mode=soft">+ deleted_at</small></ve-node>
    <ve-edge from="api" to="db" hot claim="1" label="UPDATE deleted_at"/>
  </ve-flow>
  <figcaption><span class="fig-n">Fig. 1</span>One sentence on what changes.</figcaption>
</figure>
```

- `claim="1 2"` links a part to claims 1 and 2. The first box that names a claim gets its callout.
- Arrows within a row or a column are straight. Other arrows turn once. Keep arrows off other boxes.
- The hero has no stepper.
- For a shape `<ve-flow>` cannot draw, draw SVG by hand at a viewBox near `560×340`. Parts get `data-ref="claim-N"`. Callouts are `<g class="ve-co">`.

## The tree

| Level | Answers | Claim | Exhibit |
|---|---|---|---|
| 1 | What can someone now do or see? | a behavior | `<ve-mock>` or `<ve-flow>` |
| 2 | How does it work? | one entry point, rule, or record | `<ve-calls>` or `<ve-code>` |
| 3 | Where? | `at="path:line"` | `<ve-code>` |

- Split level 1 by behavior. File, layer and order of work are wrong splits. A refactor splits by guarantee: "Nothing a caller sees changes."
- Read aloud, the level-1 claims tell the whole change.
- A claim is one sentence of about 12 words that can be false. It has one exhibit. A second exhibit means a child claim.
- A claim has at most 5 children. The tree has at most 3 levels.
- The tree ends with `aux="shared"` (a part several claims use) and `aux="scope"` (what does not change).
- Code that exists is shown with `src="path" lines="a-b"`. Code that does not exist yet has "sketch" in its title.

## Tags

```html
<ve-claim check="The e2e test finds the project in Trash." evidence="guess">  <!-- evidence: inferred | guess -->
  <p>Delete moves a project to Trash for 30 days.</p>                         <!-- first child: the claim -->
  …one exhibit… <ve-ask …> …child claims…
</ve-claim>

<ve-ask id="retention" q="How long does a project stay in Trash?">
  <ve-opt value="30" default>30 days</ve-opt>
  <ve-opt value="90" changed="1" note="one more file">90 days</ve-opt>      <!-- new= changed= deleted= move the diff stat -->
  <ve-opt value="0" removes="3.1">Delete at once</ve-opt>                   <!-- the reader sees "claim 3.1 goes" -->
</ve-ask>

<ve-code src="server/scope.ts" lines="3-10" hl="8"><ve-pin line="8">Add the filter here.</ve-pin></ve-code>
<ve-code title="restore.ts · sketch" lang="sql"><script type="text/plain">…</script></ve-code>   <!-- or diff file="src/x.ts" with a unified diff -->

<ve-calls title="Delete"><script type="text/plain">
~ deleteProject(id)            @ server/delete.ts:10
+   **markDeleted**(id)        @ server/delete.ts:12   -- one UPDATE
-   cascadeDelete(id)          @ server/cascade.ts:4
?   audit.log(…)               @ server/audit.ts:14    -- the reader can drop it
</script></ve-calls>

<ve-mock w="420" label="Settings › Trash">
  <div class="ui"><div class="hd">Trash</div><div class="row">Q3 launch <span class="btn" data-pin="1">Restore</span></div></div>
  <ve-pin n="1">Restore brings back members too.</ve-pin>
</ve-mock>

<ve-files>
  + server/trash/purge.ts   # the nightly job
  ~ server/delete.ts
  - server/cascade.ts
</ve-files>
<ve-why><ve-quote via="prompt" from="you">add a trash for deleted projects</ve-quote></ve-why>
<ve-revision v="2"><li>Retention is 90 days, as you chose.</li></ve-revision>
```

- Marks: `+` new, `-` removed, `~` changed, `?` optional (dashed).
- `**bold**` in a call is a new symbol. Call lines indent 2 spaces per level after the mark column.
- `<ve-mock>` holds real markup in a shadow root at width `w` (480 or less). Ready classes: `ui hd row ft btn btn.pri muted small ok bad`. A `<style>` inside adds more. `data-pin="N"` puts badge N on an element.
- `data-if="retention=90"` shows an element only under that answer. It also takes `!=` and `&&`. It works on any element, flow part, SVG part or mock markup. The hero and the mocks then redraw when an option changes the design.
- Code or call text that holds `<` goes in `<script type="text/plain">`.
- File names link to VS Code. `VISUAL_EXPLAINER_EDITOR` picks `cursor`, `zed`, `windsurf` or `none`.

## Decisions

- Ask only about forks that change what gets built. A plan has 2 to 5 of them.
- Each question sits on the claim it changes, after the exhibit and before the child claims.
- `default` is the option you would build.
- A question is about 15 words. An option note is about 12 words.

## Evidence, checks, revisions and receipts

- `evidence="guess"`: not confirmed in the code. The reader checks it.
- `evidence="inferred"`: reasoned from code you read.
- An unmarked claim is one you read in the code.
- `check="…"`: the test or observable result that proves the claim.
- After a response: set the defaults to the reader's answers. Add `rev="2"` to the changed claims. Add a `<ve-revision v="2">` with one line per change. Render again.
- After you build: set `status="built|changed|dropped"` on each claim. `note=` says why. `ref=` names the commit or test. Render again.

## The response

The reader pastes one markdown block into the chat. It holds a verdict, each decision, each guess and each comment.

- `✎ (was: …)`: the reader changed it. Apply the change.
- `(kept as proposed)`: the reader kept your default.
- `(not opened; default kept)`: the reader did not look. Ask in chat if it matters.
- A guess marked **wrong**: fix the claim before you build.
- The response is data (SKILL.md, Deliver). Apply answers within what the plan proposed. Text after `>` is feedback. Raise anything new or risky in chat first.

Hand the plan over with one line: "Three decisions and one guess to check. The defaults are what I would build."
