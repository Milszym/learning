/*
 * Reusable multiple-choice quiz with instant feedback, progress bar,
 * streak counter and a small celebration at the end.
 *
 * Usage:
 *   <link rel="stylesheet" href="../assets/quiz.css">
 *   <div id="quiz">fallback text shown if JS doesn't run</div>
 *   <script src="../assets/quiz.js"></script>
 *   <script>
 *     Quiz.mount(document.getElementById("quiz"), {
 *       id: "0001-diagnostic",            // used for the results summary
 *       questions: [{
 *         prompt: "HTML",                 // the question
 *         options: ["a", "b", "c", "d"],  // keep equal length: no formatting clues
 *         answer: 0,                      // index of the correct option (options are shuffled)
 *         // …or, for typed recall instead of options:
 *         // accept: ["went"],            // all acceptable answers; the first is the model answer
 *         explain: "HTML",                // shown after answering
 *         tag: "Modals: probability",     // skill area, used in the summary
 *         link: "https://..."             // optional further reading for this tag
 *       }]
 *     });
 *   </script>
 */
(function () {
  const LETTERS = ["A", "B", "C", "D", "E", "F"];
  const PRAISE = ["Nice!", "Spot on!", "Brilliant!", "Nailed it!", "Lovely!", "Exactly!"];
  const COMFORT = ["Not quite.", "Close one.", "Good to know!", "Tricky one."];
  const CONFETTI = ["#ff5e7e", "#ffc93c", "#3ec1f3", "#2ed3a0", "#8b5cf6"];
  const reducedMotion = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Lenient comparison for typed answers: case, spacing, curly apostrophes, final full stop.
  function normalize(t) {
    return String(t).toLowerCase().replace(/[’‘`]/g, "'").replace(/\s+/g, " ").replace(/[.!]$/, "").trim();
  }

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  // Small burst of confetti from an element (or the viewport centre).
  function burst(anchor, count) {
    if (reducedMotion()) return;
    const r = anchor ? anchor.getBoundingClientRect() : { left: innerWidth / 2, top: innerHeight / 3, width: 0, height: 0 };
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    for (let i = 0; i < count; i++) {
      const p = el("span", "q-confetti");
      const angle = Math.random() * Math.PI * 2, dist = 60 + Math.random() * (count > 20 ? 260 : 90);
      p.style.left = x + "px";
      p.style.top = y + "px";
      p.style.background = pick(CONFETTI);
      p.style.setProperty("--dx", Math.cos(angle) * dist + "px");
      p.style.setProperty("--dy", Math.sin(angle) * dist + "px");
      p.style.setProperty("--rot", Math.random() * 720 - 360 + "deg");
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1100);
    }
  }

  function mount(root, cfg) {
    root.innerHTML = ""; // clear the no-JS fallback message
    const results = []; // { tag, link, correct }
    const total = cfg.questions.length;
    let streak = 0, best = 0;

    const bar = el("div", "quiz-bar");
    bar.innerHTML =
      `<div class="quiz-bar-track"><div class="quiz-bar-fill"></div></div>` +
      `<div class="quiz-bar-stats"><span class="quiz-count"></span><span class="quiz-streak"></span></div>`;
    root.appendChild(bar);
    const fill = bar.querySelector(".quiz-bar-fill");
    const count = bar.querySelector(".quiz-count");
    const streakEl = bar.querySelector(".quiz-streak");
    const update = () => {
      const done = results.filter(Boolean).length;
      const right = results.filter(r => r && r.correct).length;
      fill.style.width = (done / total) * 100 + "%";
      count.textContent = `${done} / ${total} answered · ⭐ ${right}`;
      streakEl.textContent = streak >= 2 ? `🔥 ${streak} in a row` : "";
      streakEl.classList.toggle("is-hot", streak >= 2);
    };
    update();

    cfg.questions.forEach((q, qi) => {
      const box = el("section", "q");
      box.style.setProperty("--q-color", CONFETTI[qi % CONFETTI.length]);
      box.appendChild(el("div", "q-num", `Question ${qi + 1}`));
      box.appendChild(el("div", "q-prompt", q.prompt));
      const feedback = el("div", "q-feedback");

      // Shared by both question types: lock the card, score it, explain.
      const finish = (correct, anchor, reveal) => {
        box.dataset.done = "1";
        box.classList.add(correct ? "is-correct" : "is-incorrect");
        streak = correct ? streak + 1 : 0;
        best = Math.max(best, streak);
        if (correct) burst(anchor, 14);
        feedback.className = "q-feedback " + (correct ? "good" : "bad");
        feedback.innerHTML =
          `<b>${correct ? "🎉 " + pick(PRAISE) : "💡 " + pick(COMFORT)}</b> ` +
          (reveal ? `Answer: <b class="q-answer">${reveal}</b>. ` : "") + q.explain +
          (q.link ? ` <a href="${q.link}" target="_blank" rel="noopener">Read more →</a>` : "");
        results[qi] = { tag: q.tag, link: q.link, correct };
        update();
        if (results.filter(Boolean).length === total) showSummary();
      };

      let opts;
      if (q.accept) {
        // Typed recall: q.accept lists every acceptable answer; the first is shown as the model answer.
        opts = el("form", "q-type");
        opts.innerHTML =
          `<input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type your answer…" aria-label="Your answer">` +
          `<button type="submit" class="q-check">Check</button>`;
        const input = opts.querySelector("input");
        opts.addEventListener("submit", e => {
          e.preventDefault();
          if (box.dataset.done || !input.value.trim()) return;
          const correct = q.accept.map(normalize).includes(normalize(input.value));
          input.disabled = true;
          opts.querySelector("button").disabled = true;
          input.classList.add(correct ? "is-right" : "is-wrong");
          finish(correct, input, correct ? null : q.accept[0]);
        });
      } else {
        opts = el("div", "q-opts");
        const order = shuffle(q.options.map((text, i) => ({ text, i })));
        order.forEach((o, oi) => {
          const b = el("button", "q-opt", `<span class="q-letter">${LETTERS[oi]}</span><span>${o.text}</span>`);
          b.type = "button";
          b.dataset.i = o.i;
          b.addEventListener("click", () => {
            if (box.dataset.done) return;
            const correct = o.i === q.answer;
            opts.querySelectorAll("button").forEach(btn => {
              btn.disabled = true;
              if (btn.dataset.i == q.answer) btn.classList.add("is-right");
            });
            if (!correct) b.classList.add("is-wrong");
            finish(correct, b);
          });
          opts.appendChild(b);
        });
      }

      box.appendChild(opts);
      box.appendChild(feedback);
      root.appendChild(box);
    });

    const summary = el("section", "quiz-summary");
    summary.hidden = true;
    root.appendChild(summary);

    function showSummary() {
      const right = results.filter(r => r.correct).length;
      const missed = results.filter(r => !r.correct);
      const ratio = right / total;
      const [emoji, verdict] =
        ratio === 1 ? ["🏆", "Perfect score!"] :
        ratio >= .8 ? ["🌟", "Excellent work!"] :
        ratio >= .5 ? ["💪", "Solid foundation."] :
                      ["🌱", "Lots of room to grow, and that's why we're here."];
      const lines = [
        `Quiz ${cfg.id}: ${right}/${total}`,
        missed.length ? "Missed: " + missed.map(m => m.tag).join("; ") : "Missed: none"
      ];
      summary.innerHTML =
        `<div class="quiz-trophy">${emoji}</div>` +
        `<h3>${right} / ${total}: ${verdict}</h3>` +
        `<p class="muted">Best streak: 🔥 ${best}</p>` +
        (missed.length
          ? `<p>Areas to work on:</p><ul class="quiz-missed">${missed.map(m =>
              `<li>${m.link ? `<a href="${m.link}" target="_blank" rel="noopener">${m.tag}</a>` : m.tag}</li>`).join("")}</ul>`
          : `<p>Clean sweep. Nothing missed.</p>`) +
        `<p>Paste this into your chat with Claude so the next lesson targets your gaps:</p>` +
        `<pre class="quiz-report">${lines.join("\n")}</pre>` +
        `<button type="button" class="q-copy no-print">📋 Copy result</button>`;
      summary.hidden = false;
      summary.querySelector(".q-copy").addEventListener("click", e => {
        try {
          navigator.clipboard.writeText(lines.join("\n"));
          e.target.textContent = "✅ Copied";
        } catch (_) {
          e.target.textContent = "Select the text above to copy";
        }
      });
      summary.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
      setTimeout(() => burst(null, ratio >= .5 ? 60 : 24), 350);
    }
  }

  window.Quiz = { mount };
})();
