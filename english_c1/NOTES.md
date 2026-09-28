# Notes

## Learner
- Native language: Polish. Watch for articles, aspect, prepositions, false friends.
- Self-assessed "nearly C1". Skip B1–B2 basics unless the diagnostic shows a gap.
- Focus areas they chose: grammar accuracy, vocabulary and idioms.
- About 15 minutes a day, but the user wants each lesson to take only 2–3 minutes (changed 2026-09-28): 1–2 sentence idea, ≤4 rule cards with one example each, 5-question quiz (4 new + 1 review).

## Preferences
- Likes quick browser quizzes with instant feedback, and real-world input (clips, articles).
- Didn't pick "write, then get corrections". Offer it occasionally, but don't make it the default.

## Working notes
- Lesson 0001 diagnostic done: 11/13 (see LR 0001). At the user's request, Lessons 0002–0012 were written as one planned batch; 0012 is a mixed review. Ask for their quiz results and use them to adapt or reorder later lessons, rather than assuming the batch was learned.
- Each lesson ends with 1 spaced-review item from an earlier lesson, and should mix typed recall with MCQ.
- Plan: tie each grammar point to real dialogue (Language Reactor clips) as soon as possible, per the mission.
- Components: assets/style.css (tokens, layout, tables, callouts), assets/quiz.js + quiz.css (MCQ, shuffled options, per-tag summary, copyable result).
- The user needs every lesson to be a single self-contained static HTML file they can embed on any website. Write lessons against assets/ as usual, then run `python3 build.py`. It inlines assets/*.css and *.js into dist/lessons/ and dist/reference/. Give the user the dist/ file.
- build-parts/: SPEC.md (lesson authoring spec for agents), validate.js (quiz checks: counts, equal-length options), dump.js (prints all items for review). Run `node build-parts/validate.js` before every build.
- Reference pages: reference/c1-grammar-map.html (grammar and listening) and reference/vocabulary-bank.html (collocations, phrasal verbs, markers, idioms).
