# Lesson authoring spec (English C1 course)

Workspace: /Users/szymonmiloch/Documents/Projects/Private/learning/english_c1

## Learner
- Polish native speaker, "nearly C1". Mission: understand films, series, podcasts and novels in English with no subtitles and no missed nuance (see MISSION.md).
- About 15 minutes a day, but each lesson must take only 2–3 minutes: a tiny knowledge section, then a 5-question quiz.
- Diagnostic (learning-records/0001-diagnostic-baseline.md): STRONG at past deduction, needn't have, inversion, cleft sentences, participle clauses, articles, basic idioms, emphatic did, *shoulda*. WEAK at unreal time (Lesson 2 teaches it) and collocations.
- Likes bright, fun quizzes with instant feedback, plus real-world input.

## Template: copy the structure of lessons/0002-past-tense-present-meaning.html exactly (the short 3-minute version)
Read that file first. Every lesson has, in this order:
1. `<p class="kicker">Lesson N · Grammar|Vocabulary|Listening</p>`, then h1, then `.subtitle`.
2. `.meta` with 3 chips: `<b>Time</b> ~3 min`, `<b>Win</b> …one concrete skill…`, `<b>Mission</b> …how it helps with films and series…`.
3. The knowledge section (max ~120 words): `<h2>The big idea</h2>` with 1–2 sentences, then `.rules` > at most 4 `.rule` cards (style="--c: var(--accent|--sky|--mint|--grape|--sun)"), each with h3, `.pattern` and ONE on-screen style example line. At most one one-sentence `.callout` (e.g. "Polish trap"), only when accurate and essential.
4. `<h2>Practice</h2>`, one sentence of instructions, then `<div id="quiz">` containing the same "Quiz not loaded" fallback callout as Lesson 2.
5. `<h2>Listen for it</h2>` with a `.callout` real-world task for the next episode or podcast the learner watches or listens to.
6. `.callout` "Primary source": the single best high-trust page for this topic.
7. `.callout` "Keep for later": link to the reference page (../reference/c1-grammar-map.html for grammar and listening, ../reference/vocabulary-bank.html for vocabulary).
8. `<p class="muted"><b>Questions?</b> Ask Claude…</p>`: a reminder to ask follow-up questions in the chat, with a topic-specific example.
9. `<hr>` then `<ol class="sources">` with `id="s1"`… Cite claims in the text with `<sup class="cite"><a href="#s1">1</a></sup>`.
10. `<nav class="nav">` with ← previous lesson and next lesson → (file names given in your assignment).
11. Scripts: `<script src="../assets/quiz.js"></script>` and then `Quiz.mount(...)`, with `id` set to the lesson slug. Use the same question object format as Lesson 2 (read the docs comment in assets/quiz.js).

Use only existing CSS classes from assets/style.css and assets/quiz.css. No inline `<style>` blocks, no new JS, no external scripts. Do NOT edit anything in assets/, other lessons, reference/, NOTES.md, MISSION.md or build.py.

## Quiz rules (5 questions: 4 new + 1 review)
- Every prompt is a line of natural, modern dialogue as it would sound in a film or series. Use `<p class="line">` and `<span class="gap"></span>`. British English spelling.
- At least 2 of the 5 questions are TYPED recall: an `accept: [...]` array listing EVERY acceptable variant (contractions and full forms, e.g. "didn't tell", "did not tell"), with a `<p class="q-hint">` telling the learner what to type. The first entry is the model answer. Matching ignores case, extra spaces, curly vs straight apostrophes and a trailing full stop, so don't list variants for those.
- MCQ questions: exactly 4 options. ALL options have EXACTLY the same number of words and roughly the same character length, the same grammatical shape and the same register, so there are no formatting clues. Only one option can be defensibly correct: avoid distractors that native speakers would also accept.
- Include some comprehension items ("What does the speaker mean?") as well as production items, since the mission is understanding.
- `explain`: 1–3 sentences. Say why the answer is right, and where useful why the tempting wrong option is wrong. Use `<b>` for the pattern.
- `tag`: "Topic: subtopic", consistent within a lesson. `link`: a trusted page for that point.
- The last question is a review item with `<p class="muted">Review from Lesson N</p>` at the top of the prompt and tag "Review: …". Use NEW sentences, not copies of earlier items. The review topics are given in your assignment.

## Accuracy: this matters most
- Do NOT trust your memory for rules, meanings or CEFR claims. Verify every rule and every idiom or phrasal-verb meaning against a high-trust source with WebFetch or WebSearch: British Council LearnEnglish (learnenglish.britishcouncil.org/free-resources/grammar/c1/...), Cambridge Dictionary (dictionary.cambridge.org, including its grammar section), Oxford Learner's Dictionaries, BBC Learning English. Cite the sources you used.
- Links must be real pages. Check each with WebFetch or `curl -s -o /dev/null -w '%{http_code}' -A 'Mozilla/5.0' URL`. Note: British Council pages time out under curl; confirm those with WebFetch instead.
- Don't overclaim: if usage varies (BrE vs AmE, formal vs informal), say so.

## Reference snippet
Also write build-parts/NNNN-reference.html (NNNN = lesson number): an HTML fragment containing an `<h2>` section title, then `<div class="table-wrap"><table>` with header `<tr><th>…</th><th>…</th><th>…</th></tr>` and one row per key item (Item or Structure | Pattern or Meaning | On screen example), using `<em>` for the key words. Start the fragment with a first-line HTML comment naming the target: `<!-- target: c1-grammar-map -->` or `<!-- target: vocabulary-bank -->`. The lead will merge it; don't create or modify reference pages yourself.

## Self-check before finishing
- Run `node` to extract and eval the Quiz.mount config with a stub, and confirm: 5 questions; every MCQ has 4 options with identical word counts; `answer` indexes are valid; every typed question has a non-empty `accept`.
- Optionally render it: `python3 build.py`, then run headless Chrome (`"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --dump-dom file://…/dist/lessons/FILE`) and check that 5 `class="q"` sections appear.
- Final report (short): file(s) written, the sources used, and anything you were unsure about.
