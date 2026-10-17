#!/usr/bin/env node
// Turns a page source into one self-contained page. A page that links the kit (<link rel="stylesheet" data-ve-kit>)
// gets the kit's CSS, fonts, SVG defs, and script inlined at that marker; a plan source goes to plan/render.mjs.
// Only the marker elements change, so a rendered page renders to itself. No dependencies, so it runs from a copied skill folder.
import { readFileSync, renameSync, writeFileSync } from "node:fs";
import { spawn } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { esc, find, kids, parseHtml, serialize, textOf, words } from "./html.mjs";
import { expandFlow } from "./flow.mjs";
import { TAGS } from "./tags.mjs";
import { hasPlan, renderPlan, renderPlanForHost } from "../plan/render.mjs";

const here = dirname(fileURLToPath(import.meta.url));

// Each register's families, at the weights the kit uses (references/style-guide.md, Registers).
const FONTS = {
  instrument: "family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600",
  blueprint: "family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600",
  paper: "family=Newsreader:opsz,wght@6..72,400..600&family=Atkinson+Hyperlegible+Next:wght@400;600&family=Atkinson+Hyperlegible+Mono:wght@400;500;600",
  editorial: "family=Instrument+Serif&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600",
};

const isKitLink = (n) => n.name === "link" && "data-ve-kit" in n.attrs;

/** What a reader meets: figures, figures without a caption, expanded tags and flows, and prose words outside figures. */
function count(doc, tags) {
  const r = { figures: 0, uncaptioned: 0, dataTags: tags.filter((t) => t.name !== "ve-flow").length, flows: tags.filter((t) => t.name === "ve-flow").length, proseWords: 0 };
  // a <p> inside an <li> is counted once, with its <li>
  const visit = (n, quiet) => {
    for (const c of kids(n)) {
      if (c.name === "figure") { r.figures++; if (!kids(c).some((k) => k.name === "figcaption")) r.uncaptioned++; }
      const prose = !quiet && (c.name === "p" || c.name === "li");
      if (prose) r.proseWords += words(textOf(c));
      visit(c, quiet || prose || c.name === "figure");
    }
  };
  visit(doc, false);
  return r;
}

/** The report for an ordinary page, which renders as given. */
export const reportPage = (html) => count(parseHtml(html), []);

const plural = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
export const reportLine = (r) => `Page: ${plural(r.figures, "figure")}${r.uncaptioned ? ` (${r.uncaptioned} without a caption)` : ""}${r.dataTags ? ` · ${plural(r.dataTags, "data tag")}` : ""}${r.flows ? ` · ${plural(r.flows, "flow")}` : ""} · ${plural(r.proseWords, "prose word")} outside figures`;

/**
 * Inlines the kit at its marker and expands the data tags and <ve-flow>. `kit` is false for a page with neither,
 * which is returned unchanged.
 */
export function renderPage(source) {
  const errors = [], warnings = [];
  const doc = parseHtml(source);
  const links = find(doc, isKitLink);
  const tags = find(doc, (n) => Object.hasOwn(TAGS, n.name) || n.name === "ve-flow");
  if (!links.length && !tags.length) return { html: source, kit: false, errors, warnings, report: count(doc, tags) };
  const lineOf = (pos) => source.slice(0, pos).split("\n").length;
  const where = (n) => `line ${lineOf(n.pos)} <${n.name}${n.attrs.id ? `#${n.attrs.id}` : ""}>`;
  if (!links.length) errors.push(`${where(tags[0])}: tags need the kit; add <link rel="stylesheet" href="kit.css" data-ve-kit> to <head>`);
  if (links.length > 1) errors.push(`${links.length} <link data-ve-kit> elements; keep one in <head>`);
  const register = find(doc, (n) => n.name === "html")[0]?.attrs["data-register"] || "instrument";
  if (!FONTS[register]) errors.push(`data-register="${register}" is not a register; use ${Object.keys(FONTS).join(", ")}`);
  const body = find(doc, (n) => n.name === "body")[0];
  if (!body) errors.push("the page has no <body>");
  // a box or arrow keeps the data-ref and data-s it was written with, so it lights with its terms and its steps
  const ref = (k) => {
    if ("claim" in k.attrs) errors.push(`${where(k)}: claim= belongs to plan pages; link a part to its terms with data-ref`);
    return ["data-ref", "data-s"].filter((a) => k.attrs[a] !== undefined).map((a) => ` ${a}="${esc(k.attrs[a])}"`).join("");
  };
  for (const t of tags) t.html = t.name === "ve-flow" ? expandFlow(t, { errors, warnings, where, ref, page: true }) : TAGS[t.name](t, { errors, warnings, where });
  if (errors.length) return { html: source, kit: true, errors, warnings };

  const css = readFileSync(join(here, "kit.css"), "utf8");
  const script = `<script data-ve-kit>\n${readFileSync(join(here, "kit.js"), "utf8").replace(/<\/script/gi, "<\\/script")}</script>`;
  // a page that leaves out the viewport would render zoomed out on phones, whichever host or CLI renders it
  const viewport = find(doc, (n) => n.name === "meta" && n.attrs.name === "viewport").length ? "" : '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
  links[0].html = `${viewport}<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?${esc(FONTS[register])}&amp;display=swap" rel="stylesheet">
<style data-ve-kit>
${css}</style>`;
  // The defs go first in <body>, unless the page carries its own (the template does, so it opens raw).
  if (!find(doc, (n) => n.attrs.id === "ve-ah").length) body.children.unshift({ html: `\n${readFileSync(join(here, "defs.svg"), "utf8").trimEnd()}` });
  const scripts = find(doc, (n) => n.name === "script" && "data-ve-kit" in n.attrs);
  if (scripts.length) {
    scripts[0].html = script;
    for (const s of scripts.slice(1)) s.html = "";
  } else body.children.push({ html: `${script}\n` });
  return { html: serialize(doc), kit: true, errors, warnings, report: count(doc, tags) };
}

/**
 * The page step shared by the Pi tool and the MCP server. Returns null for an ordinary page. A plan source or a kit page
 * becomes the page, renamed from <name>.src.html, with the source kept beside it.
 */
export function renderPageForHost(html, { root, filename, sendBack = false }) {
  const plan = renderPlanForHost(html, { root, filename, sendBack });
  if (plan) return plan;
  const r = renderPage(html);
  if (!r.kit) return null;
  if (r.errors.length) throw new Error(`The page has ${r.errors.length} error(s); nothing was written:\n${r.errors.map((e) => `- ${e}`).join("\n")}`);
  const page = filename.replace(/\.src(\.html?)$/i, "$1");
  const source = page.replace(/\.html?$/i, ".src.html");
  const warned = r.warnings.length ? `\nWarnings:\n${r.warnings.map((w) => `- ${w}`).join("\n")}` : "";
  return { html: r.html, filename: page, source, kit: true, report: r.report, note: ` Source kept beside it as ${source}; edit it and render again for revisions.${warned}` };
}

/* ── CLI ── */
function openFile(path) {
  const [cmd, args] = process.platform === "darwin" ? ["open", [path]] : process.platform === "win32" ? ["cmd", ["/c", "start", "", path]] : ["xdg-open", [path]];
  spawn(cmd, args, { detached: true, stdio: "ignore" }).unref();
}

function main() {
  const argv = process.argv.slice(2);
  const flag = (name) => argv.includes(name);
  const value = (name) => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : undefined; };
  const input = argv.find((a, i) => !a.startsWith("-") && !["-o", "--root"].includes(argv[i - 1]));
  if (!input) {
    console.error("usage: node render.mjs page.src.html [-o page.html] [--root <repo>] [--lint] [--open]");
    process.exit(2);
  }
  const output = value("-o") ?? (/\.src\.html?$/i.test(input) ? input.replace(/\.src(\.html?)$/i, "$1") : null);
  if (!output && !flag("--lint")) {
    console.error("name the source <name>.src.html, or pass -o <name>.html");
    process.exit(2);
  }
  const source = readFileSync(input, "utf8");
  const result = hasPlan(source) ? renderPlan(source, { root: value("--root") ?? process.cwd() }) : renderPage(source);
  const summary = result.summary ?? (result.kit ? "kit inlined" : "no kit marker; written as given");
  for (const w of result.warnings) console.log(`  ⚠ ${w}`);
  for (const e of result.errors) console.log(`  ✗ ${e}`);
  if (result.errors.length) {
    console.log(`✗ ${result.errors.length} error(s), ${result.warnings.length} warning(s); nothing written`);
    process.exit(1);
  }
  const report = result.report ? `\n  ${reportLine(result.report)}` : "";
  if (flag("--lint")) { console.log(`✓ ${summary}${report}`); return; }
  const temp = `${output}.${process.pid}.tmp`;
  writeFileSync(temp, result.html);
  renameSync(temp, output);
  console.log(`✓ ${resolve(output)}  ${summary}${result.warnings.length ? ` · ${result.warnings.length} warning(s)` : ""}${report}`);
  if (flag("--open")) openFile(resolve(output));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
