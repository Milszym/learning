# Curiosity lesson spec (for writer agents)

Workspace: /Users/szymonmiloch/Documents/Projects/Private/learning/curiosities

## The learner and the goal
Polish native speaker, English nearly C1. The mission (MISSION.md): collect surprising, TRUE facts from every field, remember them for months, and retell them well in conversation, with a little C1 English along the way. **Each lesson is ONE curiosity and takes 2–3 minutes MAX.** The user said the first long version was too long, so brevity is a hard rule.

## Template: copy lessons/0001-cleopatra-and-the-moon.html exactly
The whole lesson must take 2–3 minutes (the user found the 12-minute version far too long), so every visible part is short. In order:
1. `<title>` = the h1. Kicker `Curiosity N · Domain`, h1 (short and catchy), `.subtitle` (one line).
2. `.meta` with ONE chip: `<b>Time</b> 2 min`.
3. `<div id="guess">` with a one-line no-JS fallback callout, then `Guess.mount` (id "NNNN"). 2–4 short options of EQUAL length and word count. `right`/`wrong` are one short sentence each.
4. `<section data-after-guess>` containing:
   - `.reveal`: one sentence, with the key part in `<mark>`.
   - ONE visual: `Timeline.mount` (caption ≤ 5 words) or a `.stats` block of 2–3 `.stat` cards (labels ≤ 6 words).
   - ONE paragraph starting `<b>Why it feels wrong:</b>` (or `<b>Why it works:</b>`), **max 2 sentences, ~40 words**, with citations `<sup class="cite"><a href="#s1">1</a></sup>`. Keep a caveat only if the fact is wrong without it.
   - `.retell` with `<span class="label">Retell it · out loud, once</span>` and ONE `<p>`: a quoted retelling of **max ~35 words** (the fact, the key number, the kicker).
   - `.words` with ONE `.word` card: word, part of speech, a short Cambridge definition, and a short example (≤ 12 words).
   - `<div id="quiz">` with the same fallback as lesson 1.
   - ONE `<p class="muted">` line: `<b>Read more:</b>` the single best source. Nothing else.
5. `<hr>`, `<ol class="sources">` (`id="s1"`…). No `<nav>` and no links back to the curiosity deck: each lesson must stay a fully self-contained page that works when embedded elsewhere on its own.
6. Scripts: guess.js, timeline.js (only if used), quiz.js, then one inline `<script>` with the mount calls.

Use only existing CSS classes. No `<style>` blocks, no new JS files, no external scripts.

## Quiz: exactly 2 questions
1. **Typed recall** of the key fact or number (`accept: [...]` with every reasonable variant), with a short `<p class="q-hint">`.
2. **Spaced review** of the lesson in the "Review" column (prompt starts `<p class="muted">Review from Curiosity N</p>`, tag `Review: …`), testing that fact or its word. Typed or MCQ; an MCQ needs exactly 4 options with identical word counts and character lengths within 12 characters. Lesson 1 has no review, so it tests its word instead.
Prompts are one sentence. `explain` is ONE short sentence with `<b>` on the key point. `tag`: "Short name: subtopic". `link`: a trusted page.
The quiz `id` is the file slug without .html. The guess `id` is "NNNN".

## Accuracy: this matters most
- Never trust memory. Verify every number and claim with WebSearch/WebFetch against high-trust sources: NASA/ESA, museums, universities, peer-reviewed papers, World History Encyclopedia, Smithsonian, Etymonline/OED for words, Wikipedia (for citations, but follow it to its sources). Britannica blocks fetch tools, so skip it. Aim for 2 independent sources for the headline claim.
- The "fact" column below is a CLAIM TO VERIFY. If a number is off, fix it. If the claim is disputed or false, say so in the lesson (a well-framed correction is still a great curiosity) or tell the lead in your report.
- Don't overclaim: use "about", ranges, and caveats where the sources disagree.
- Check every link: `curl -s -o /dev/null -w '%{http_code}' -L -A 'Mozilla/5.0' URL` should return 200. Some sites (nasa.gov, cambridge) block curl or WebFetch; confirm those with the other tool, or with a search result showing the page exists.
- Verify the word's meaning with Cambridge Dictionary: `curl -sL -A 'Mozilla/5.0 (Macintosh) AppleWebKit/537.36 Chrome/126 Safari/537.36' https://dictionary.cambridge.org/dictionary/english/WORD` and grep `def ddef_d`.
- British English spelling.

## Deck snippet
For each lesson, also write `build-parts/NNNN-deck.html` with exactly two `<tr>` rows (no other markup), matching reference/curiosity-deck.html:
```
<!-- retell -->
<tr><td><a href="../lessons/NNNN-slug.html">N</a></td><td>Hook with <em>key words</em></td><td>Key numbers</td><td>The why</td></tr>
<!-- word -->
<tr><td><em>word</em> (pos)</td><td>meaning</td><td>example with <em>word</em></td><td>N</td></tr>
```

## Self-check
Run `node build-parts/validate.js` (it checks every lesson; only YOUR files need to pass, and ignore errors in files that other agents are still writing). Then `python3 build.py`. Final report (short): files written, any claim you corrected or found disputed, and anything you were unsure about.

## Master list
| # | File | Domain | Fact (claim to verify) | Word | Visual | Review |
|---|---|---|---|---|---|---|
| 0001 | `0001-cleopatra-and-the-moon.html` | History | Cleopatra (d. 30 BC) lived closer in time to the Moon landing (1969) than to the Great Pyramid (c. 2560 BC). | contemporary (n) | timeline | — |
| 0002 | `0002-a-day-longer-than-a-year.html` | Space | A day on Venus (one rotation, ~243 Earth days) is longer than its year (~225 Earth days); it also spins backwards. | sluggish (adj) | stats | 0001 |
| 0003 | `0003-three-hearts-blue-blood.html` | Nature | Octopuses have three hearts and blue, copper-based blood (haemocyanin). | eerie (adj) | stats | 0001 |
| 0004 | `0004-the-invisible-gorilla.html` | Mind | In the 1999 Simons & Chabris study, about half of viewers counting basketball passes failed to notice a person in a gorilla suit (inattentional blindness). | oblivious (adj) | stats | 0003 |
| 0005 | `0005-the-first-computer-bug.html` | Tech | In 1947 Harvard Mark II operators taped a real moth into the logbook as the 'first actual case of bug being found', but engineers (e.g. Edison) already said 'bug' decades earlier. | apocryphal (adj) | timeline | 0002 |
| 0006 | `0006-when-nice-meant-foolish.html` | Language | 'Nice' comes from Latin nescius ('ignorant') and meant 'foolish' in Middle English before drifting to 'pleasant'. | pejorative (adj) | timeline | 0001 |
| 0007 | `0007-older-than-the-aztecs.html` | History | Teaching at Oxford existed by 1096, over two centuries before the Aztecs founded Tenochtitlan (1325). | venerable (adj) | timeline | 0001 |
| 0008 | `0008-bananas-are-berries.html` | Nature | Botanically, bananas are berries and strawberries are not (strawberry 'seeds' are the actual fruits). | misnomer (n) | stats | 0007 |
| 0009 | `0009-more-trees-than-stars.html` | Space | Earth has about 3 trillion trees (Crowther et al., Nature 2015), more than the ~100–400 billion stars in the Milky Way. | staggering (adj) | stats | 0006 |
| 0010 | `0010-the-birthday-paradox.html` | Maths | In a group of just 23 people, the chance that two share a birthday is over 50%. | counterintuitive (adj) | stats | 0004 |
| 0011 | `0011-sharks-older-than-trees.html` | Nature | Sharks (fossil evidence ~450 million years) are older than trees (~385–390 million years). | predate (v) | timeline | 0001 |
| 0012 | `0012-mammoths-and-pyramids.html` | History | Woolly mammoths survived on Wrangel Island until about 4,000 years ago, after the Great Pyramid was built. | linger (v) | timeline | 0011 |
| 0013 | `0013-taller-in-the-morning.html` | Body | You are about 1 cm (up to ~2 cm) taller in the morning; spinal discs compress during the day. | imperceptible (adj) | stats | 0010 |
| 0014 | `0014-ok-was-a-joke.html` | Language | 'OK' began in 1839 Boston newspapers as a joke abbreviation of 'oll korrect' (Allen Walker Read's research). | ubiquitous (adj) | timeline | 0008 |
| 0015 | `0015-gps-needs-einstein.html` | Tech | GPS satellite clocks would drift ~38 microseconds a day without relativity corrections, causing kilometres of error daily. | negligible (adj) | stats | 0005 |
| 0016 | `0016-honey-never-spoils.html` | Nature | Properly sealed honey essentially never spoils: very little water, acidic, and it produces hydrogen peroxide. (Treat the 'edible tomb honey' claim carefully; only include if well sourced.) | pristine (adj) | stats | 0015 |
| 0017 | `0017-blue-sunsets-on-mars.html` | Space | Sunsets on Mars look blue, because fine dust scatters blue light forward around the Sun (NASA rover images). | hue (n) | stats | 0014 |
| 0018 | `0018-honest-placebos.html` | Mind | Placebos can help even when patients are told they are placebos (e.g. Kaptchuk et al. 2010, IBS). | sceptical (adj) | stats | 0012 |
| 0019 | `0019-napoleon-was-not-short.html` | History | Napoleon was about 1.69 m (5 ft 7 in), average for his time; the myth came from French vs English inches and British caricature. | smear (n) | stats | 0009 |
| 0020 | `0020-glass-is-not-a-liquid.html` | Science | Old cathedral windows are thicker at the bottom because of how the glass was made, not because glass flows; at room temperature it would take far longer than the age of the universe. | debunk (v) | stats | 0019 |
| 0021 | `0021-crows-remember-faces.html` | Nature | Crows recognise individual human faces and can remember and 'scold' a threatening face for years (John Marzluff's mask experiments, University of Washington). | hold a grudge (idiom) | stats | 0018 |
| 0022 | `0022-robot-means-forced-labour.html` | Language | 'Robot' entered English from Karel Čapek's 1920 play R.U.R.; it comes from Czech 'robota' (forced labour), and his brother Josef suggested the word. (Polish 'robota' is a cognate: useful link for a Polish speaker.) | drudgery (n) | timeline | 0016 |
| 0023 | `0023-the-coffee-pot-webcam.html` | Tech | The first webcam watched a coffee pot at Cambridge University's Trojan Room (camera 1991, on the web 1993) so people could avoid an empty pot. | mundane (adj) | timeline | 0013 |
| 0024 | `0024-the-bacteria-myth.html` | Body | The popular 'bacteria outnumber your cells 10 to 1' claim is wrong; a 2016 estimate (Sender, Fuchs & Milo) puts it at roughly 1:1. | outnumber (v) | stats | 0023 |
| 0025 | `0025-the-tallest-volcano.html` | Space | Olympus Mons on Mars is about 2.5 times the height of Everest above sea level (~22–25 km vs 8.8 km) and roughly the size of Poland or Arizona in area (verify which comparison is accurate). | dwarf (v) | stats | 0022 |
| 0026 | `0026-the-great-emu-war.html` | History | In 1932 Australian soldiers with machine guns fought emus in Western Australia, and the emus effectively won. | fiasco (n) | stats | 0020 |
| 0027 | `0027-the-monty-hall-problem.html` | Maths | In the Monty Hall problem, switching doors wins 2/3 of the time; sticking wins only 1/3. | baffle (v) | stats | 0017 |
| 0028 | `0028-the-toughest-animal.html` | Nature | Tardigrades survived exposure to open space (vacuum and cosmic radiation) on the FOTON-M3 mission in 2007. | hardy (adj) | stats | 0027 |
| 0029 | `0029-goodbye-means-god-be-with-you.html` | Language | 'Goodbye' is a contraction of 'God be with ye'; 'good' replaced 'God' by analogy with 'good day'/'good night'. | contraction (n) | timeline | 0026 |
| 0030 | `0030-a-light-day-away.html` | Space | Voyager 1, launched in 1977, is the most distant human-made object; its radio signals take nearly a full day (~23 h, verify the current figure on NASA's live page) to reach Earth. | far-flung (adj) | stats | 0024 |
