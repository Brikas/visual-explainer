# Video

Make an MP4 only when the user asks. The source is a video deck: one HTML file whose scenes carry their narration. `visual-explainer-video` plays the deck on a virtual clock and saves every frame. Each sentence's picture then appears with its voice.

## Script first

- One claim per scene. A scene has 1 to 3 sentences.
- Most videos run 45 to 120 s over 6 to 12 scenes.
- The first scene states the problem or the surprising number. The last scene states the one line to remember.
- The picture changes on every sentence. The start of sentence N is beat N.
- Write for the ear. Spell out numbers and symbols ("fifty-six hundred").
- Abbreviations have no periods. The renderer splits sentences at `.`, `!` and `?`.

## The contract

The renderer opens the deck at 1280×720 CSS pixels and records at 1920×1080. It only sets attributes and fires events. The deck's own CSS and JS draw everything.

```html
<style>
  body { position: relative; width: 1280px; height: 720px; overflow: hidden; margin: 0; }
  section[data-say] { position: absolute; inset: 0; display: none; }
  section[data-beat], section[data-was] { display: grid; }          /* on now, or leaving */
  section[data-was] { z-index: 2; animation: leave .5s forwards; }   /* exit */
  @keyframes leave { to { opacity: 0; } }
  .miss { opacity: 0; transition: opacity .6s; }
  [data-beat~="2"] .miss { opacity: 1; }                             /* sentence 2 has started */
</style>
<section data-say="Every read checks Redis first. A miss goes on to Postgres." data-hold="1">
  <h2>Ask Redis first.</h2> <svg>…</svg> <p class="miss">…</p>
</section>
<script>
  addEventListener('ve:beat', (e) => { /* e.target is the scene; e.detail is { scene, beat } */ });
  addEventListener('ve:leave', (e) => { /* stop that scene's loops */ });
</script>
```

| The renderer sets | When |
|---|---|
| `data-beat="0"` on the scene | the scene starts; becomes `"0 1"`, `"0 1 2"`… as each sentence starts |
| `data-was` on the previous scene | the next scene starts; removed at the change after that |
| `ve:beat` and `ve:leave` events (they bubble) | with each change above |
| text of `p.ve-caption` | each sentence, when captions are on; style `.ve-caption` to restyle |

- Timing: 0.5 s before the first sentence, 0.3 s between sentences, 0.9 s after the last sentence, plus `data-hold` seconds.
- A silent sentence lasts its caption's reading time: 2.5 words per second, at least 1.5 s. An empty `data-say` lasts 3 s.
- CSS animations, the Web Animations API, timers, `requestAnimationFrame`, canvas, SVG and three.js run on the renderer's clock. `<video>`, `<audio>` and content loaded later run on real time.
- Load fonts with a `<link>` in `<head>`.

## Look

- One visual style, one accent, hand-drawn SVG. Pick one color scheme and set its tokens directly.
- A video is the one place for ambient motion. No frame is still: light drifting over 30 s or more, a slowly panning grid, faint film grain.
- Size for a phone held sideways: body text 24px or larger, labels 15px or larger, headings 48 to 88px, diagram node text 22, edge labels 17, strokes 2 (hot path 3.5).
- Text sits 64px from the sides and 48px from the top. The bottom 112px stays clear for captions.
- Each beat adds or changes one thing and settles within about 1.5 s. Paths draw in with `pathLength="1"` and `stroke-dashoffset`. Numbers count up.
- A diagram shows fewer than 8 boxes. Each beat has one focal point.
- A replay (`motion.md`) works as a scene. Copy the stepper CSS from `kit/kit.css` and put the SVG in `.ve-steps`. On `ve:beat`, give each `[data-s]` part `.on` when its first step is at most `e.detail.beat`. Give it `.now` when the beat is above 0 and its list holds the beat.

## Check, then render

1. `visual-explainer-video deck.html --stills` writes one fully played PNG per scene to `deck.stills/`. Read every PNG. Fix clipped, crowded or empty scenes. Run it again.
2. With a speech API key set, make one clip per line (below). Without a key the video is silent with burned-in captions. Never print a key.
3. `visual-explainer-video deck.html [out.mp4] [--voice clips/] [--captions]`.
4. Report the MP4 path, its length, and the voice or "silent".

- Write the deck to `topics/<topic>/<name>.html`. The MP4 goes beside it.
- The renderer needs `ffmpeg`, `playwright-core` and Google Chrome (or `npx playwright-core install chromium-headless-shell`).
- If `visual-explainer-video` is not on PATH or `playwright-core` is missing, run `npx -y -p visual-explainer -p playwright-core visual-explainer-video` with the same arguments. From a repository checkout, run `npm install` and `node plugins/visual-explainer/video/render.mjs`.

## Voice clips

`--lines` prints `<id><TAB><text>` per sentence. Save each clip as `<clips>/<id>.mp3` (or `.wav`, `.m4a`, `.ogg`, `.flac`, `.aiff`). The id is a hash of the text. After an edit only the changed lines need new clips.

| Provider | Key | Request | Reply |
|---|---|---|---|
| ElevenLabs | `ELEVENLABS_API_KEY` | `POST https://api.elevenlabs.io/v1/text-to-speech/<voice_id>`, header `xi-api-key`, `{"text", "model_id": "eleven_multilingual_v2"}` | MP3 |
| Seed Audio (fal) | `FAL_KEY` | `POST https://fal.run/bytedance/seed-audio-1.0`, header `Authorization: Key …`, `{"prompt": text, "voice": "stokie_en"}` | JSON; download `.audio.url` |
| OpenAI | `OPENAI_API_KEY` | `POST https://api.openai.com/v1/audio/speech`, bearer, `{"model": "gpt-4o-mini-tts", "voice": "coral", "input": text}` | MP3 |
| xAI | `XAI_API_KEY` | `POST https://api.x.ai/v1/tts`, bearer, `{"text", "voice_id": "eve", "language": "en"}` | MP3 |

- Use the user's chosen provider and voice. Without a choice, use the first key that is set.
- Loop over `--lines` and skip clips that exist.
- Write each clip to `<id>.tmp` and rename it only when the request succeeds (`curl --fail … && mv`). An error body then never becomes a clip.

## Tutorial of a live web app

For "record a walkthrough of X", record the real app with a Playwright script. The video renderer is not used.

1. Do the task once. Note the start URL and a role or text locator per control. For a logged-in app, the user makes a storage state with `npx playwright-core codegen --save-storage=auth.json <url>`. Never ask for credentials.
2. One action and one sentence per step. A title step comes first and a closing step comes last.
3. Record at 1280×720 (`recordVideo`) with an `addInitScript` cursor. Move with `page.mouse.move(x, y, { steps: 25 })` before each click. After each action, wait for the step's clip plus about 0.8 s. Note each step's start time.
4. With ffmpeg, place each clip at its step's start (`adelay`, `amix`), mux, and trim the blank lead-in. Without a voice key, show each sentence as an on-page caption.
