# Notes

## Learner
- Same learner as ../english_c1: Polish native, nearly C1 English. Wants everything: retention, retelling, enjoyment, breadth, English practice.
- "One curiosity is a lesson, that's it." Keep lessons to 2–3 min max, one fact each.

## Lesson shape (copy lessons/0001): 2–3 minutes, HARD limit
The user asked for this on 2026-09-28. The first version (~5 min) was too long, and so was the second (it took the user ~12 min), so all 30 lessons were cut down the same day. The full spec is in build-parts/SPEC.md.
1. Kicker, h1, one-line subtitle, one meta chip (Time 2 min).
2. Guess first (assets/guess.js); everything else sits in `<section data-after-guess>`.
3. Reveal sentence plus one visual (timeline or 2–3 stats).
4. "Why it feels wrong": max 2 sentences, ~40 words.
5. Retell card: ONE quoted paragraph, ~35 words.
6. One C1 word, with a short definition and a short example.
7. Quiz: 2 questions: typed recall of the fact, plus a spaced review of an earlier curiosity (lesson 1 tests its word instead). One-sentence explanations.
8. One muted "Read more" line, then sources and nav.

## Working notes
- Lessons 0002–0030 were written as one planned batch (2026-09-28) by parallel agents from build-parts/SPEC.md, which holds the master list. Ask for quiz results rather than assuming they were learned. The review for each lesson is in the SPEC.md master list.
- To merge the deck: each lesson has build-parts/NNNN-deck.html (retell row + word row).
- Verify every fact against 2 sources, and prefer ones that explain *why*. Viral "fun facts" are often false or exaggerated; if one is disputed, say so or skip it.
- Britannica returns 403 to fetch tools; use World History Encyclopedia, Wikipedia (for citations), NASA, museum and university pages.
- Rotate domains so no two lessons in a row share one. Curiosity 1 was History.
- After each lesson, add a row to reference/curiosity-deck.html (retell card + words).
- Build: `node build-parts/validate.js && python3 build.py` produces self-contained files in dist/.
- Always give/open the dist/ file (`open -a "Google Chrome" dist/lessons/…`). The user's viewer didn't load the linked CSS from lessons/.
- Palette: cool "night-sky museum" (blue-grey paper, teal kicker, amber, cobalt, lime, plum; deep navy in dark mode), deliberately unlike english_c1's warm cream/pink/violet so the course is recognisable at a glance. Tokens live in assets/style.css; question colours in assets/quiz.js CONFETTI. Keep them in sync.
