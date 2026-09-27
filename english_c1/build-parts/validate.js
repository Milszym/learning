// Validate Quiz.mount configs in lessons/*.html: counts, options, answers, accept arrays.
const fs = require("fs"), path = require("path");
const dir = path.join(__dirname, "..", "lessons");
let bad = 0;
for (const f of fs.readdirSync(dir).filter(f => f.endsWith(".html")).sort()) {
  const h = fs.readFileSync(path.join(dir, f), "utf8");
  const scripts = [...h.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  let cfg = null;
  global.document = { getElementById: () => ({}) };
  global.Quiz = { mount: (_, c) => { cfg = c; } };
  try { scripts.forEach(s => eval(s)); } catch (e) { console.log(`✗ ${f}: script error ${e.message}`); bad++; continue; }
  if (!cfg) { console.log(`✗ ${f}: no Quiz.mount`); bad++; continue; }
  const issues = [];
  const words = s => s.replace(/<[^>]+>/g, "").trim().split(/\s+/).length;
  cfg.questions.forEach((q, i) => {
    if (!q.prompt || !q.explain || !q.tag) issues.push(`Q${i + 1} missing prompt/explain/tag`);
    if (q.accept) {
      if (!Array.isArray(q.accept) || !q.accept.length) issues.push(`Q${i + 1} empty accept`);
    } else {
      if (!q.options || q.options.length !== 4) issues.push(`Q${i + 1} needs 4 options`);
      else {
        const w = q.options.map(words);
        if (new Set(w).size > 1) issues.push(`Q${i + 1} word counts ${w.join(",")}`);
        const c = q.options.map(o => o.length), spread = Math.max(...c) - Math.min(...c);
        if (spread > 12) issues.push(`Q${i + 1} char spread ${spread} (${c.join(",")})`);
      }
      if (!(q.answer >= 0 && q.answer < (q.options || []).length)) issues.push(`Q${i + 1} bad answer index`);
    }
  });
  const typed = cfg.questions.filter(q => q.accept).length;
  const id = f.replace(".html", "");
  if (!String(cfg.id).startsWith(id.slice(0, 4))) issues.push(`id ${cfg.id} does not match ${id}`);
  console.log(`${issues.length ? "✗" : "✓"} ${f}: ${cfg.questions.length} Qs, ${typed} typed${issues.length ? "\n   " + issues.join("\n   ") : ""}`);
  bad += issues.length ? 1 : 0;
}
process.exit(bad ? 1 : 0);
