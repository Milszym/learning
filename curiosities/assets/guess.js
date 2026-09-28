/*
 * "Guess first": the learner commits to a prediction before the answer is shown.
 * Guessing before learning (even wrongly) makes the answer stick better.
 * Everything marked data-after-guess stays hidden until a guess is made.
 * Without JS, everything is simply visible.
 *
 * Usage:
 *   <link rel="stylesheet" href="../assets/curio.css">
 *   <div id="guess"></div>
 *   <section data-after-guess>…the reveal…</section>
 *   <script src="../assets/guess.js"></script>
 *   <script>
 *     Guess.mount(document.getElementById("guess"), {
 *       id: "0001",                      // remembers the guess on revisit
 *       prompt: "HTML",
 *       options: ["a", "b"],             // keep equal length: no formatting clues
 *       answer: 1,
 *       right: "HTML shown if right",
 *       wrong: "HTML shown if wrong"
 *     });
 *   </script>
 */
(function () {
  const LETTERS = ["A", "B", "C", "D"];
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (_) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (_) {} }
  };

  function mount(root, cfg) {
    const after = document.querySelectorAll("[data-after-guess]");
    const key = "curio-guess-" + cfg.id;
    root.className = "guess";
    root.innerHTML =
      `<span class="label">Guess first · no peeking</span>` +
      `<p class="guess-prompt">${cfg.prompt}</p>` +
      `<div class="q-opts"></div><p class="guess-verdict"></p>`;
    const opts = root.querySelector(".q-opts");
    const verdict = root.querySelector(".guess-verdict");

    const choose = (i, animate) => {
      opts.querySelectorAll("button").forEach(b => {
        b.disabled = true;
        if (+b.dataset.i === cfg.answer) b.classList.add("is-right");
        else if (+b.dataset.i === i) b.classList.add("is-wrong");
      });
      verdict.innerHTML = i === cfg.answer ? "🎯 " + cfg.right : "🤯 " + cfg.wrong;
      after.forEach(s => (s.hidden = false));
      store.set(key, String(i));
      if (animate && after[0]) after[0].scrollIntoView({ behavior: "smooth", block: "start" });
    };

    cfg.options.forEach((text, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "q-opt";
      b.dataset.i = i;
      b.innerHTML = `<span class="q-letter">${LETTERS[i]}</span><span>${text}</span>`;
      b.addEventListener("click", () => choose(i, true));
      opts.appendChild(b);
    });

    const saved = store.get(key);
    if (saved !== null && cfg.options[+saved] !== undefined) choose(+saved, false);
    else after.forEach(s => (s.hidden = true));
  }

  window.Guess = { mount };
})();
