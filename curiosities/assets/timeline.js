/*
 * To-scale timeline: points and spans placed proportionally, so the
 * distances you see are the distances in time.
 *
 * Usage:
 *   <link rel="stylesheet" href="../assets/curio.css">
 *   <div id="tl"></div>
 *   <script src="../assets/timeline.js"></script>
 *   <script>
 *     Timeline.mount(document.getElementById("tl"), {
 *       from: -2700, to: 2100,             // negative = BC (there is no year 0)
 *       points: [{ year: -2560, label: "Great Pyramid", color: "var(--sun)", side: "up" }],
 *       spans:  [{ from: -2560, to: -30, label: "2,530 years", color: "var(--accent)" }],
 *       caption: "Drawn to scale."
 *     });
 *   </script>
 */
(function () {
  const fmt = y => (y < 0 ? `${-y} BC` : `AD ${y}`);

  function mount(root, cfg) {
    const pct = y => ((y - cfg.from) / (cfg.to - cfg.from)) * 100;
    root.className = "tl";
    root.setAttribute("role", "img");
    root.setAttribute("aria-label", "Timeline: " + cfg.points.map(p => `${p.label}, ${fmt(p.year)}`).join("; "));
    const track = document.createElement("div");
    track.className = "tl-track";

    (cfg.spans || []).forEach(s => {
      const bar = document.createElement("div");
      bar.className = "tl-span";
      bar.style.cssText = `left:${pct(s.from)}%;width:${pct(s.to) - pct(s.from)}%;--c:${s.color}`;
      const lab = document.createElement("div");
      lab.className = "tl-span-label";
      lab.style.cssText = `left:${(pct(s.from) + pct(s.to)) / 2}%;--c:${s.color}`;
      lab.textContent = s.label;
      track.append(bar, lab);
    });

    cfg.points.forEach((p, i) => {
      const x = pct(p.year);
      const dot = document.createElement("div");
      dot.className = "tl-pt";
      dot.style.cssText = `left:${x}%;--c:${p.color}`;
      const lab = document.createElement("div");
      const edge = x < 12 ? " start" : x > 88 ? " end" : "";
      lab.className = "tl-lab " + (p.side || (i % 2 ? "down" : "up")) + edge;
      lab.style.cssText = `left:${x}%;--c:${p.color}`;
      lab.innerHTML = `<b>${fmt(p.year)}</b>${p.label}`;
      track.append(dot, lab);
    });

    root.innerHTML = "";
    root.appendChild(track);
    if (cfg.caption) {
      const cap = document.createElement("p");
      cap.className = "tl-caption";
      cap.textContent = cfg.caption;
      root.after(cap);
    }
  }

  window.Timeline = { mount };
})();
