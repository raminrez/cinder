# DIRECTION SHEET — The sentence is the layout
seed 1403602033 · drawn 2026-11-05 · redraws: 3 · sector dev-tool · tone editorial
Brief: Cinder: Carbon design rules rebuilt with accessible RAC components, four live themes, a Bun-native library

| | |
| --- | --- |
| Direction | The sentence is the layout |
| Hero | Title in the sky, line on the horizon |
| Type | kept from the brand |
| Colour | kept from the brand |
| Sections | showcase (Live demo with controls) → features (Rows with margin photographs) → about (Side facts, wide paragraph) → how-it-works (Run-in column) → footer (Invitation over a cropped name) |
| Motion | Shutter image |
| Photographs | the "Sky and space" set, as atmosphere |

This is the direction for this build. Adopt it. Do not blend it with the layout you would have made anyway,
and do not redraw because it is unfamiliar: unfamiliar is the point. Redraw a slot only when it conflicts
with a stated brand constraint or needs an asset that does not exist, and say why in your report.

The parts of this sheet were written separately and will disagree in small ways. Settle every disagreement in this order:
**house rules** (including type no smaller than 13px and body text of 16px or more) → **the direction** (the idea, the composition habits, where the
one accent goes) → **the type system and the palette** (which face does which job, the five size steps, which colour is the ground and where the
accent goes) → **the hero blueprint** → **the section blueprints**. Under each blueprint below, "Adjusted for this page" lists where it disagrees.
In practice: take geometry from blueprints (columns, proportions, what sits where) and take everything else from above them. Map every size a
blueprint names onto one of your five type steps instead of adding a sixth. Use one button shape, one corner radius and one pair of page margins on
the whole page, whatever individual blueprints say. If a blueprint names a kind of typeface (a light serif, a heavy grotesk), use the dealt face.

## 1. The idea
One short sentence, set at poster scale, is the composition. The trick that makes it an idea rather than a big headline: something from the subject sits inside the sentence where a word would be. A strip of photograph fills the gap between two words; a small live fragment of the product replaces the noun; the object the sentence names is pictured at the size of a letter. Write the sentence first, find the word that can be shown instead of said, and put the showing in its place. The reader completes the sentence with their eyes.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
The sentence is four to seven words and runs as one or two full-width lines at 9–13vw. Inline with the type, on the baseline, sits one media slot: a rounded-rectangle or square frame exactly one line-height tall and two to three ems wide, holding a photograph or a looping crop. Above and below the sentence the screen is empty except for a small navigation line and one supporting sentence set small, both on the same left margin. Later sections repeat the grammar at smaller scale: each is a short statement on the left six columns with its proof (image, figure, list) on the right, so the page reads as a series of sentences with evidence. Generous vertical space (160px or more) between sections.

## 3. Type
Kept from the brand. Display weight with real presence (medium to bold), tracking -0.03 to -0.05em, leading 0.95–1.0 so two lines sit close. The inline frame aligns to cap height and baseline exactly; set it with em units so it scales with the type.

## 4. Colour
Kept from the brand. A calm ground with ink at full contrast. The only colour comes from the photograph inside the sentence; if the palette has an accent, use it once, on the action.

## 5. Imagery
**This subject is software and there are no screenshots, so its pictures are its own interface.** Wherever this sheet says photograph, image or object, build a believable fragment of the product in HTML at real size (real labels, numbers that add up, one item hovered or selected) by the app-screen rules (references/app-screens.md: deal its style once with `node <skill>/scripts/draw.mjs --app --kind <kind> --keep palette,type --out .taste-skill/app`, and build it with assets/app.css and assets/charts.js), put the attribute `data-ui` on its root, and crop or scale it the way the blueprint treats a photograph: a full-bleed close crop, a tile, the fixed half of a split. Where a fragment makes no sense, use a flat colour field with type on it. Never a fake dashboard of grey bars, never a device frame. If the product works on something physical (ships, plants, buildings, a city), one real picture of that world can carry a section: find it with `node /Users/ramin/.agents/skills/design-taste-frontend/scripts/assets.mjs "<that world>"`, download it with `--get`, credit it on the page, and never let it pass for the product or its customers.

One strong, simple photograph that reads at small size (a face, an object, a texture, a horizon), cropped to a wide strip inside the sentence. The same image may open to full width in the next section, so the small slot feels like a window onto something larger.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Optional atmosphere, two at most, from the "Sky and space" set (skies, clouds, stars and night skies). The page does not need them.
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
- `https://picsum.photos/id/505/1600/1000` — Tiny silhouetted figure on a dark ridge under a blue and orange twilight sky · dark tone · deep blue, orange, black · calm area: top · native landscape · photo: lee Scott
- `https://picsum.photos/id/847/1600/1000` — A few birds flying across a pale blue gradient sky · light tone · pale blue, soft white, indigo · calm area: all · native landscape · photo: Andrej Chudy
- `https://picsum.photos/id/765/1600/1000` — Night sky fading to an orange glow along a dark horizon · dark tone · midnight blue, burnt orange, black · calm area: top · native landscape · photo: Grant McIver
- `https://picsum.photos/id/974/1600/1000` — Person standing beneath the Milky Way with a warm glow on the horizon · dark tone · deep navy, violet, amber · calm area: left · native landscape · photo: Greg Rakozy
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use at most two. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: architecture — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Title in the sky, line on the horizon
One wide photograph or render fills the viewport, chosen with the subject in the lower 55% and open sky, fog or a plain wall above it. The headline is centred in that empty upper zone: two lines at clamp(72px, 7.2vw, 112px), leading 0.9, its cap line 72px from the top, the first line short and the second longer so the block widens towards the subject. On the horizon, with its baseline at 52% of the height, one supporting sentence is split into two halves at 22px: the first half right-aligned to end at column 5, the second left-aligned from column 8, so the subject shows through the 260px gap between them. Wordmark top-left on a 32px margin; up to three text links from column 9; the single action top-right as a solid rectangle in the paper colour. All type is in one ink chosen against the sky; on a pale sky use the photograph's darkest tone rather than black. Nothing else crosses the lower half.

On a phone: The picture is re-cropped to portrait with the subject in the lower 45%. The headline sits centred in the sky at 11vw on two lines, 96px down, and the two halves of the sentence become two centred lines at 17px directly under it. The action is a full-width button 24px above the bottom edge on a neutral scrim band 96px tall. Wordmark top-left and a menu word top-right.
Headline: Two lines, the second the longer, at most about 14 characters per line: the name of the place, or a 3–5 word claim about it.

Adjusted for this page:
- It names colours (black): map them onto this palette's roles (ground `--bg`, panels `--surface` and the fields, text `--ink`/`--muted`, the accent `--accent` on the primary action only).

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. showcase — Live demo with controls (split)
One filled panel, 680–760px wide and about 640px tall, radius 12px, in a tone clearly darker or lighter than the ground, placed on the text column's left edge or centred, with at least 15vh of empty ground above and below. The panel is split 62/38 into two flat areas that differ by one tone. Left area: the product doing its job on real content at true size. Right area: a narrow column of working controls, six to nine stacked rows 44px tall, each with a name at 14px on the left and a slider, toggle or value on the right; changing one changes the demonstration at once. A text link sits in the panel's bottom-left corner. The heading, two to four words at 24–32px, sits above the panel on its left edge with one sentence at 16px; under the panel, one line of start instruction.
On a phone: The panel fills the width. The demonstration takes the top at 4:3; the controls follow beneath as full-width rows 52px tall, only the four most telling ones, with a text link that reveals the rest. Heading and sentence sit above at 24px and 16px.

Adjusted for this page:
- It names its own corners: use the one radius of this page (square unless the direction says otherwise) and one button shape.

### 2. features — Rows with margin photographs (list)
Everything hangs from one vertical axis at column 5, about 35% of the width. First the heading: a statement of up to five words at clamp(40px, 5vw, 80px) starting on the axis, vertically centred in an otherwise empty 70svh of ground. Then four or five benefit rows, each starting on the same axis: a title at clamp(28px, 3vw, 48px) and under it a paragraph of 34ch at 17px. Columns 1–4 stay empty. At the right margin each row carries one photograph, top-aligned with its title and deliberately unequal: 240px wide at 4:5 in one row, 320px at 3:2 in the next, 180px square after that. Rows are separated by 96–120px of space, not lines. On a saturated field, set all type in one pale ink and leave the photographs ungraded.
On a phone: The axis collapses to the left margin. The statement sits at 9vw in 50svh of empty ground. Each row stacks its title at 26px, the paragraph, then its photograph at alternating widths: 100%, 70% flush right, 55% flush left. 64px between rows.

Adjusted for this page:
- It sets a sentence large over several lines: jurors read that as a long headline. Either cut it to a two-line headline at display size, or keep it a statement at 36px or less on three lines (24px, four lines on a phone).

### 3. about — Side facts, wide paragraph (table)
Two rows share one vertical line at 34% of the viewport width. Row one: in a 160px column at the left margin, three label and value pairs stack with 20px between them, each a label in the soft ink with its value beneath in full ink, all at 13px (founded, based in, team size). From the 34% line a five-line paragraph at clamp(20px, 1.7vw, 26px), leading 1.35, runs to 90% of the width. Row two starts 120px lower and repeats the logic for the record of the practice: one plain word at 13px at the far left (awards, press, clients), then from the 34% line two list columns, each 260px wide with a 64px gutter, at 13px with 10px between lines: name at the left, year at the right in the soft ink. No heading; the paragraph opens the section. Each list comfortably holds 6–12 lines. No photographs are needed.
On a phone: Everything aligns to the left margin. The paragraph comes first at 19px. The three label and value pairs follow as a two-column grid at 14px. The two record lists stack with 40px between them, each opened by its plain word in full ink.

### 4. how-it-works — Run-in column (list)
The quietest sequence: one reading column and good typography. A single column 520–600px wide starts at about 30% of the viewport width (or sits on the page's text axis). The heading is a two-to-five-word question or statement at 28–32px, 48px above the first paragraph. Three to five paragraphs follow at 17–18px with line-height 1.6. Each opens with a bold run-in phrase in full ink that names its moment ('To begin,', 'Within a day,', 'After that,', 'From then on,') while the rest of the paragraph runs in the soft ink; there are no subheads, bullets or markers. After each paragraph, 20px lower, comes one small piece of evidence exactly as wide as the column: a cropped interface fragment, a photograph at 16:9, or a row of three small frames 96px tall. 72px separates stages. Nothing in the section is wider than the column, and the space to its left stays empty.
On a phone: The column fills the width between 20px margins. Type stays at 17px. Evidence pieces keep the column width; the row of three frames becomes a single sideways-scrolling row 88px tall. 56px between stages. The heading drops to 24px.

### 5. footer — Invitation over a cropped name (statement)
Close and footer in one full-viewport field of the inverse colour. Upper third, columns 1–7: a two-line invitation at about 5vw, three to five words, with one filled rectangular button beneath it. At columns 10–12, top-aligned with the invitation, three or four social or contact links stacked at 16px. The wordmark fills the bottom of the screen at 26–30vw on one line, `white-space: nowrap`, heavier and larger than the viewport can hold: it is pushed down with `transform: translateY(30%)` so the bottom edge cuts through the letters, and a long name also runs off the right edge. `overflow: hidden` on the footer does the cropping. One row of credits and legal links at 13px sits directly above the wordmark's cap line, spread left and right. The cropped name must be recognisable from its upper two-thirds alone; test that it is.
On a phone: Invitation at 11vw on two lines at the top with a full-width button. Links follow as one row of words at 15px. The wordmark sits at 34vw at the bottom, cropped by both the bottom and the right edge, with the legal row above it at 12px.

Adjusted for this page:
- It sets text at 12px: use your small step (13px or more) instead.

## 8. Motion — Shutter image
The one hero or showcase image opens from an edge with a clip-path over about 1.1 seconds while the picture inside settles from 1.12 scale to rest. Use it once, on the image that matters most; later images simply are there. Recipe: 'Image shutter' in references/motion.md.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 10. Where the richness comes from
The collision of big type and one live image inside it. Because there is only one image on the first screen, choose it with care and give it perfect alignment to the letters.

## 11. How this direction goes wrong
The sentence must be short enough for two lines on a phone, where the inline frame drops to its own line between the two halves. Do not style one word differently to fake the device. Do not use more than one slot per sentence.

## 12. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **CoffeeTech®** (Awwwards Site of the Day, studied score 7.1) `aww-coffeetech-r`
  Idea: Present an industrial roaster maker like a design brand: one enormous three-word statement on black, with the machine withheld until the first scroll, where it emerges from the dark.
  Hero: Near-black viewport with nothing but type. A centred three-line headline, one word per line, in Inter Medium at about 15vw with tight tracking; the first line starts a third of the way down and the last runs to within 35px of the bottom edge, its widest word spanning roughly 70% of the width. Cream letters; no subhead, no media, no hero button. Navigation is one quiet row: logo with a terracotta mark at left, four text links centred, then a filled terracotta 'Products' button with a grid icon, an outlined contact button and a language dropdown at right. The top third stays empty.
  Worth taking: Let a three-word headline at about 15vw be the entire first viewport and withhold the product until the first scroll.
- **Colonia Zacamil** (Awwwards Site of the Day, studied score 7.2) `aww-colonia-zacamil`
  Idea: The sentence is the layout: 'FLY TO ___ ZACAMIL' runs as one full-width line, with a strip of drone video filling the gap where a word would sit.
  Hero: Warm off-white field with no navigation at all. One line of black ultra-condensed capitals about 13vw tall sits on the vertical centre and runs edge to edge with 28px side margins: 'FLY', a wide gap, 'TO', then a rounded-corner strip of aerial video exactly as tall as the letters and half the viewport wide, then 'ZACAMIL'. A tiny mono bracket label sits above the last word. About 150px lower, a small black pill button with a white dot-in-circle at its right end is centred. Two centred lines of 24px serif sit near the bottom edge. The top third is empty.
  Worth taking: Replace a word in the headline with a media strip cut to the cap height, so the picture is read as part of the sentence.
- **The Content Architecture** (One Page Love, studied score 7.9) `opl-the-content-architecture`
  Idea: The product name becomes a rotating vortex of concentric text rings that you scroll into, and the sales argument is a ticking hours-lost counter beside an itemised receipt.
  Hero: Exact 50/50 vertical split. The left half is warm cream with a left-aligned stack starting a third of the way down at an 80px margin: one-line mono caps label, a two-line medium-weight sans headline at only 3vw, a four-line grey paragraph capped near 510px, then a black button notched into two joined halves beside a pale grey secondary. A mono scroll cue with a target glyph sits bottom-left. The right half is a charcoal canvas filled with concentric rings of white mono caps spiralling round a centre and cropped by the viewport. A dark boxed nav with a marquee strip floats top-centre across the seam; a minimap thumbnail sits top-right.
  Worth taking: Split the primary button into two notched halves so a two-word action reads like a physical ticket, with one orange dot as the page's only accent.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. The frame: one h1 on the first screen that says what this is, equal outer margins, no
section huddled on one side with the other half empty, no blank stretch over half a screen, a heading on every section.
`inspect.mjs` measures all of it.

Saved to /Users/ramin/Documents/Projects/Personal/cinder/.taste-skill/direction.json · reprint with `node draw.mjs --show`
