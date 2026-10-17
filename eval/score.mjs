#!/usr/bin/env node
// Scores every <name>.html in a directory, with its <name>.src.html when present. Deterministic: sizes, the static
// report, pictures per 100 prose words, and the browser check (kit/check.mjs, run once per page).
// usage: node eval/score.mjs <dir> [--json] [--no-check]
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { renderPage, reportPage } from "../plugins/visual-explainer/kit/render.mjs";
import { hasPlan } from "../plugins/visual-explainer/plan/render.mjs";

const CHECK = join(dirname(fileURLToPath(import.meta.url)), "../plugins/visual-explainer/kit/check.mjs");
const tokens = (text) => Math.round(text.length / 4); // ≈ tokens: characters / 4

function check(file) {
  const run = spawnSync(process.execPath, [CHECK, file, "--json"], { encoding: "utf8" });
  if (run.status !== 0 && run.status !== 1) return { exit: run.status, skipped: (run.stderr || run.stdout).trim().split("\n")[0] };
  const r = JSON.parse(run.stdout), widths = Object.values(r.widths);
  const smallest = widths.map((w) => w.smallest?.px).filter((px) => px !== undefined);
  return {
    exit: run.status,
    smallestPx: smallest.length ? Math.min(...smallest) : null,
    errors: r.errors.length,
    overflow: Object.entries(r.widths).filter(([, w]) => w.overflow).map(([width]) => +width),
    kitRan: widths.every((w) => w.kit),
    problems: r.problems,
  };
}

function score(dir, file, withCheck) {
  const html = readFileSync(join(dir, file), "utf8");
  const srcFile = file.replace(/\.html?$/i, ".src.html");
  const src = existsSync(join(dir, srcFile)) ? readFileSync(join(dir, srcFile), "utf8") : null;
  // the source's report counts the data tags and flows before they were expanded; a plan or a page without a source uses the page
  const report = src && !hasPlan(src) && renderPage(src).report || reportPage(html);
  return {
    page: file,
    sourceTokens: src === null ? null : tokens(src),
    pageTokens: tokens(html),
    kit: /<style data-ve-kit>/.test(html),
    ...report,
    // figures per 100 prose words; null when the page has no prose words outside figures (shown as ∞, or — with no figures)
    picsPer100Words: report.proseWords ? Math.round(report.figures * 10000 / report.proseWords) / 100 : null,
    check: withCheck ? check(join(dir, file)) : null,
  };
}

function table(rows) {
  const head = ["page", "src≈tok", "page≈tok", "kit", "figs", "no cap", "tags", "flows", "words", "figs/100w", "check", "min px", "errors", "overflow", "kit ran"];
  const cell = (r) => {
    const c = r.check, ratio = r.picsPer100Words ?? (r.figures ? "∞" : "—");
    const ck = !c ? ["—", "—", "—", "—", "—"] : c.skipped ? [`n/a (${c.exit})`, "—", "—", "—", "—"]
      : [c.exit ? "✗" : "✓", c.smallestPx ?? "—", c.errors, c.overflow.length ? c.overflow.join(" ") : "no", c.kitRan ? "yes" : "no"];
    return [r.page, r.sourceTokens ?? "—", r.pageTokens, r.kit ? "yes" : "no", r.figures, r.uncaptioned, r.dataTags, r.flows, r.proseWords, ratio, ...ck].map(String);
  };
  const lines = [head, ...rows.map(cell)];
  const width = head.map((_, i) => Math.max(...lines.map((l) => l[i].length)));
  return lines.map((l) => l.map((v, i) => (i ? v.padStart(width[i]) : v.padEnd(width[i]))).join("  ")).join("\n");
}

const argv = process.argv.slice(2);
const dir = argv.find((a) => !a.startsWith("-"));
if (!dir || !existsSync(dir)) {
  console.error("usage: node eval/score.mjs <dir> [--json] [--no-check]");
  process.exit(2);
}
const files = readdirSync(dir).filter((f) => /\.html?$/i.test(f) && !/\.src\.html?$/i.test(f)).sort();
const rows = files.map((f) => score(resolve(dir), f, !argv.includes("--no-check")));
console.log(argv.includes("--json") ? JSON.stringify(rows, null, 2) : table(rows));
if (rows.some((r) => r.check?.skipped)) console.error(`check skipped: ${rows.find((r) => r.check?.skipped).check.skipped}`);
