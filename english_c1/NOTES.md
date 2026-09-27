# Notes

## Learner
- Native language: Polish. Watch for articles, aspect, prepositions, false friends.
- Self-assessed "nearly C1". Skip B1–B2 basics unless the diagnostic shows a gap.
- Focus areas they chose: grammar accuracy, vocabulary and idioms.
- About 15 minutes a day, so keep lessons to ~10–15 minutes.

## Preferences
- Likes quick browser quizzes with instant feedback, and real-world input (clips, articles).
- Didn't pick "write, then get corrections". Offer it occasionally, but don't make it the default.

## Working notes
- Lesson 0001 diagnostic done: 11/13 (see LR 0001). Lesson 0002 is unreal time. Next up is Lesson 0003 on collocations.
- Each lesson ends with 2 spaced-review items from earlier lessons, and should mix typed recall with MCQ.
- Plan: tie each grammar point to real dialogue (Language Reactor clips) as soon as possible, per the mission.
- Components: assets/style.css (tokens, layout, tables, callouts), assets/quiz.js + quiz.css (MCQ, shuffled options, per-tag summary, copyable result).
- The user needs every lesson to be a single self-contained static HTML file they can embed on any website. Write lessons against assets/ as usual, then run `python3 build.py`. It inlines assets/*.css and *.js into dist/lessons/ and dist/reference/. Give the user the dist/ file.
