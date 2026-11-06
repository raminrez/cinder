# Uber Base research — complete discovery and reading ledger

**Research date: 6 November 2026.** Companion to [Base findings](research-base.md)
and the [Cinder synthesis](research-cinder-direction.md).

## Result and meaning of complete

| Classification               | Targets | Review outcome                                                                      |
| ---------------------------- | ------: | ----------------------------------------------------------------------------------- |
| Public documents             |     121 | Every line of every archived document read                                          |
| SSO-private pages            |      51 | Access boundary inspected; contents unavailable                                     |
| Legacy sign-in destination   |       1 | Sign-in verified; contents unavailable                                              |
| Stale redirects              |      16 | Redirect to the cover verified; former contents unavailable                         |
| **Total discovered targets** | **189** | **Zero unresolved acquisition/classification errors; zero unread public documents** |

Discovery started at the [requested cover](https://base.uber.com/6d2425e9f/p/294ab4-base-design-system),
followed the six top-level navigation sections and document cross-links, and included
supplemental rendered navigation, `/v/0/`, `/v/latest/`, and the legacy zeroheight
styleguide route. Stable page IDs deduplicate slugs, tabs, and block anchors.
All available exported tabs are included in each full-text read.

This is complete coverage of **public page documents discovered by that crawl**.
It is not a claim to know undisclosed URLs, descendants hidden behind SSO, every
historical version, or the contents of linked Figma files, videos, internal
Storybooks, and external resources. A short hub or stub counts as a read document,
not a complete component specification. The separate Base Web implementation
inspection was focused; it is not counted as an exhaustive Base Web site review.

Original downloads and normalized readable copies are distinct artifacts. Signed
image query strings were removed from readable copies. Original hashes were checked
against acquisition records; readable hashes were checked against the reading
manifest and ledgers. All **121 original/readable hash pairs** matched. The reviewed
readable files total **1,797,256 bytes**.

## Reproducibility

The final inventory hash is:

```text
aa2dc635946dda96cf1c177df9291b23ff7434068059ef0c18efd7a31d4471aa
```

Local supporting evidence, under `.research/base-2026-11-06/`:

| Artifact                                 | Purpose                                                                                                   |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `inventory.json`                         | Original acquisition inventory, preserved                                                                 |
| `inventory-complete.json`                | Reconciled 189-target manifest with final full-read statuses                                              |
| `pages/`, `supplemental/`                | Original responses, including preserved redirect responses                                                |
| `readable/`                              | Normalized full text actually read                                                                        |
| `rendered/`, `navigation*/`              | Rendered access boundaries and discovery evidence                                                         |
| `reviews/visual-foundations.md`          | 29-page full-read findings and original hashes                                                            |
| `reviews/content-foundations.md`         | 30-page full-read findings, original/readable hashes                                                      |
| `reviews/controls.md`                    | 30-page full-read findings and original hashes                                                            |
| `reviews/data-navigation.md`             | 32-page full-read findings, original/readable hashes                                                      |
| `full-read-coverage.json`                | Merged per-page ranges, source/readable hashes, and verification result                                   |
| `merge-coverage.py`                      | Checks exact batch sizes, uniqueness, contiguous reading ranges, original hashes, and visual-asset hashes |
| `visual/review.md`, `visual/assets.json` | Actual sampled visual findings and acquisition provenance                                                 |

The merge passed at **10:19:09 UTC**. It verified **29 + 30 + 30 + 32 = 121**
disjoint public-page assignments, with no missing or multiply counted IDs. Line
ranges below use newline-based archive numbering, including source metadata and
exported examples; they are not line numbers on the live website.

Final report reconciliation also matched all **189 appendix rows** to the recorded
canonical or observed URLs, all **121 complete reading ranges**, the **four review
ledger hashes**, and the **four downloaded visual-asset hashes**.

`.research/` is Git-ignored. This versionable appendix preserves every discovered
ID, source link, access outcome, and public reading range; source bytes and full
per-page hash records remain local supporting evidence. It does not redistribute
Uber's site artwork or imply permission to use it in Cinder.

## Public documents — all fully read

### Visual foundations, hubs, and supplemental pages — 29

| ID                                                 | Page                                  | Fully read lines |
| -------------------------------------------------- | ------------------------------------- | ---------------- |
| [598458](https://base.uber.com/6d2425e9f/p/598458) | Dimensions                            | 1–144            |
| [4420d2](https://base.uber.com/6d2425e9f/p/4420d2) | Corner radius 2.0                     | 1–326            |
| [652959](https://base.uber.com/6d2425e9f/p/652959) | Corner radius 1.0                     | 1–169            |
| [785d5f](https://base.uber.com/6d2425e9f/p/785d5f) | Layout grids                          | 1–578            |
| [84bf33](https://base.uber.com/6d2425e9f/p/84bf33) | Material                              | 1–191            |
| [5483ad](https://base.uber.com/6d2425e9f/p/5483ad) | Elevation 2.0                         | 1–469            |
| [595594](https://base.uber.com/6d2425e9f/p/595594) | Elevation 1.0                         | 1–128            |
| [976582](https://base.uber.com/6d2425e9f/p/976582) | Typography 1.0                        | 1–1092           |
| [312fab](https://base.uber.com/6d2425e9f/p/312fab) | Transitions                           | 1–241            |
| [77fcaf](https://base.uber.com/6d2425e9f/p/77fcaf) | Timing                                | 1–57             |
| [116184](https://base.uber.com/6d2425e9f/p/116184) | Motion                                | 1–234            |
| [294ab4](https://base.uber.com/6d2425e9f/p/294ab4) | Cover page                            | 1–76             |
| [6156d1](https://base.uber.com/6d2425e9f/p/6156d1) | Welcome to Base                       | 1–42             |
| [283068](https://base.uber.com/6d2425e9f/p/283068) | Extension library                     | 1–34             |
| [76be65](https://base.uber.com/6d2425e9f/p/76be65) | Design language                       | 1–92             |
| [434226](https://base.uber.com/6d2425e9f/p/434226) | Playbook                              | 1–67             |
| [65f6bf](https://base.uber.com/6d2425e9f/p/65f6bf) | Maps                                  | 1–867            |
| [896004](https://base.uber.com/6d2425e9f/p/896004) | AI                                    | 1–32             |
| [4245c4](https://base.uber.com/6d2425e9f/p/4245c4) | Content                               | 1–72             |
| [44684e](https://base.uber.com/6d2425e9f/p/44684e) | Framework                             | 1–14             |
| [65ac57](https://base.uber.com/6d2425e9f/p/65ac57) | Divider                               | 1–291            |
| [75d4bd](https://base.uber.com/6d2425e9f/p/75d4bd) | Base AI                               | 1–34             |
| [13cca1](https://base.uber.com/6d2425e9f/p/13cca1) | Alternative text                      | 1–250            |
| [40613e](https://base.uber.com/6d2425e9f/p/40613e) | Mobile screen readers                 | 1–330            |
| [48c92c](https://base.uber.com/6d2425e9f/p/48c92c) | Feedback & status (supplemental page) | 1–206            |
| [11f0a4](https://base.uber.com/6d2425e9f/p/11f0a4) | Identity                              | 1–157            |
| [455bc9](https://base.uber.com/6d2425e9f/p/455bc9) | Color (AI hub)                        | 1–7              |
| [77b7b3](https://base.uber.com/6d2425e9f/p/77b7b3) | Components (AI hub)                   | 1–9              |
| [8688df](https://base.uber.com/6d2425e9f/p/8688df) | Patterns (AI hub)                     | 1–12             |

### Content and inclusion foundations — 30

| ID                                                 | Page                     | Fully read lines |
| -------------------------------------------------- | ------------------------ | ---------------- |
| [47a65e](https://base.uber.com/6d2425e9f/p/47a65e) | System principles        | 1–26             |
| [757b7d](https://base.uber.com/6d2425e9f/p/757b7d) | Content heuristics       | 1–53             |
| [4360d6](https://base.uber.com/6d2425e9f/p/4360d6) | Global writing           | 1–190            |
| [136623](https://base.uber.com/6d2425e9f/p/136623) | Product tone             | 1–360            |
| [040a13](https://base.uber.com/6d2425e9f/p/040a13) | Product voice            | 1–66             |
| [98326d](https://base.uber.com/6d2425e9f/p/98326d) | Writing for components   | 1–31             |
| [03856f](https://base.uber.com/6d2425e9f/p/03856f) | Writing for users        | 1–318            |
| [434f39](https://base.uber.com/6d2425e9f/p/434f39) | Principles               | 1–118            |
| [0461e9](https://base.uber.com/6d2425e9f/p/0461e9) | Inclusive content        | 1–197            |
| [14427a](https://base.uber.com/6d2425e9f/p/14427a) | Text resizing            | 1–112            |
| [90f91f](https://base.uber.com/6d2425e9f/p/90f91f) | Understanding disability | 1–260            |
| [4462ce](https://base.uber.com/6d2425e9f/p/4462ce) | A11y first process       | 1–720            |
| [72ae38](https://base.uber.com/6d2425e9f/p/72ae38) | VoiceOver                | 1–457            |
| [519906](https://base.uber.com/6d2425e9f/p/519906) | TalkBack                 | 1–723            |
| [29d15f](https://base.uber.com/6d2425e9f/p/29d15f) | Screen reader content    | 1–463            |
| [74ace1](https://base.uber.com/6d2425e9f/p/74ace1) | Annotations              | 1–788            |
| [2333c9](https://base.uber.com/6d2425e9f/p/2333c9) | Abbreviations            | 1–244            |
| [91854b](https://base.uber.com/6d2425e9f/p/91854b) | Acronyms                 | 1–39             |
| [471fac](https://base.uber.com/6d2425e9f/p/471fac) | Capitalization           | 1–57             |
| [70b7c4](https://base.uber.com/6d2425e9f/p/70b7c4) | Change log               | 1–22             |
| [3083fb](https://base.uber.com/6d2425e9f/p/3083fb) | Contractions             | 1–67             |
| [44a4df](https://base.uber.com/6d2425e9f/p/44a4df) | Dates                    | 1–90             |
| [66747a](https://base.uber.com/6d2425e9f/p/66747a) | Emojis                   | 1–115            |
| [19e792](https://base.uber.com/6d2425e9f/p/19e792) | Map annotations          | 1–148            |
| [000786](https://base.uber.com/6d2425e9f/p/000786) | Messages                 | 1–600            |
| [167601](https://base.uber.com/6d2425e9f/p/167601) | Money                    | 1–128            |
| [808e2f](https://base.uber.com/6d2425e9f/p/808e2f) | Numbers                  | 1–179            |
| [753d46](https://base.uber.com/6d2425e9f/p/753d46) | Punctuation              | 1–353            |
| [266429](https://base.uber.com/6d2425e9f/p/266429) | Time                     | 1–128            |
| [20ad03](https://base.uber.com/6d2425e9f/p/20ad03) | Uber word list           | 1–22             |

### Controls and compound components — 30

| ID                                                 | Page              | Fully read lines |
| -------------------------------------------------- | ----------------- | ---------------- |
| [556814](https://base.uber.com/6d2425e9f/p/556814) | Components        | 1–356            |
| [756216](https://base.uber.com/6d2425e9f/p/756216) | Button            | 1–714            |
| [46ed03](https://base.uber.com/6d2425e9f/p/46ed03) | Button dock       | 1–489            |
| [83b31b](https://base.uber.com/6d2425e9f/p/83b31b) | Button group      | 1–464            |
| [407fe0](https://base.uber.com/6d2425e9f/p/407fe0) | Link              | 1–548            |
| [3800ec](https://base.uber.com/6d2425e9f/p/3800ec) | Sliding button    | 1–598            |
| [433759](https://base.uber.com/6d2425e9f/p/433759) | Tile              | 1–1399           |
| [81070d](https://base.uber.com/6d2425e9f/p/81070d) | Timed button      | 1–746            |
| [83ffb9](https://base.uber.com/6d2425e9f/p/83ffb9) | Check             | 1–678            |
| [5555b5](https://base.uber.com/6d2425e9f/p/5555b5) | File upload       | 1–1416           |
| [2313a4](https://base.uber.com/6d2425e9f/p/2313a4) | Menu              | 1–228            |
| [0982fd](https://base.uber.com/6d2425e9f/p/0982fd) | Radio             | 1–653            |
| [51073e](https://base.uber.com/6d2425e9f/p/51073e) | Text field        | 1–2513           |
| [75bf86](https://base.uber.com/6d2425e9f/p/75bf86) | PIN code          | 1–1183           |
| [05421e](https://base.uber.com/6d2425e9f/p/05421e) | Segmented control | 1–762            |
| [30cac1](https://base.uber.com/6d2425e9f/p/30cac1) | Slider            | 1–756            |
| [99faf6](https://base.uber.com/6d2425e9f/p/99faf6) | Star rating       | 1–805            |
| [53dd73](https://base.uber.com/6d2425e9f/p/53dd73) | Stepper           | 1–337            |
| [005456](https://base.uber.com/6d2425e9f/p/005456) | Switch            | 1–503            |
| [96a4c2](https://base.uber.com/6d2425e9f/p/96a4c2) | Time picker       | 1–971            |
| [83c5d1](https://base.uber.com/6d2425e9f/p/83c5d1) | Accordion         | 1–1037           |
| [572f13](https://base.uber.com/6d2425e9f/p/572f13) | Avatar            | 1–1710           |
| [554ab6](https://base.uber.com/6d2425e9f/p/554ab6) | Badge             | 1–716            |
| [3736ac](https://base.uber.com/6d2425e9f/p/3736ac) | Draggable list    | 1–123            |
| [43156e](https://base.uber.com/6d2425e9f/p/43156e) | Drawer            | 1–61             |
| [402ac7](https://base.uber.com/6d2425e9f/p/402ac7) | Empty state       | 1–680            |
| [96ccc3](https://base.uber.com/6d2425e9f/p/96ccc3) | List item         | 1–1671           |
| [480a1e](https://base.uber.com/6d2425e9f/p/480a1e) | Message card      | 1–1525           |
| [48ea86](https://base.uber.com/6d2425e9f/p/48ea86) | Placeholder       | 1–279            |
| [752768](https://base.uber.com/6d2425e9f/p/752768) | Popover           | 1–980            |

### Data, feedback, overlays, and navigation — 32

| ID                                                 | Page              | Fully read lines |
| -------------------------------------------------- | ----------------- | ---------------- |
| [6799d2](https://base.uber.com/6d2425e9f/p/6799d2) | Progress bar      | 1–999            |
| [6945cd](https://base.uber.com/6d2425e9f/p/6945cd) | Progress circle   | 1–625            |
| [82716e](https://base.uber.com/6d2425e9f/p/82716e) | Progress steps    | 1–575            |
| [5587b7](https://base.uber.com/6d2425e9f/p/5587b7) | Section heading   | 1–716            |
| [62e25d](https://base.uber.com/6d2425e9f/p/62e25d) | Tag               | 1–1407           |
| [63fdd3](https://base.uber.com/6d2425e9f/p/63fdd3) | Tooltip           | 1–894            |
| [72a605](https://base.uber.com/6d2425e9f/p/72a605) | Snackbar          | 1–932            |
| [9522f7](https://base.uber.com/6d2425e9f/p/9522f7) | System banner     | 1–826            |
| [87b3d6](https://base.uber.com/6d2425e9f/p/87b3d6) | Toast             | 1–76             |
| [61b6c1](https://base.uber.com/6d2425e9f/p/61b6c1) | Charts            | 1–1977           |
| [901301](https://base.uber.com/6d2425e9f/p/901301) | Data table        | 1–584            |
| [24d2e9](https://base.uber.com/6d2425e9f/p/24d2e9) | Table             | 1–3971           |
| [05499e](https://base.uber.com/6d2425e9f/p/05499e) | Patterns          | 1–38             |
| [51dcce](https://base.uber.com/6d2425e9f/p/51dcce) | Feedback & status | 1–27             |
| [764ae2](https://base.uber.com/6d2425e9f/p/764ae2) | Input & forms     | 1–18             |
| [729bdf](https://base.uber.com/6d2425e9f/p/729bdf) | Modality          | 1–108            |
| [464328](https://base.uber.com/6d2425e9f/p/464328) | Selection         | 1–275            |
| [65ae6d](https://base.uber.com/6d2425e9f/p/65ae6d) | States            | 1–111            |
| [199f68](https://base.uber.com/6d2425e9f/p/199f68) | Banner            | 1–1302           |
| [775209](https://base.uber.com/6d2425e9f/p/775209) | Dialog            | 1–1924           |
| [02338d](https://base.uber.com/6d2425e9f/p/02338d) | Card              | 1–1644           |
| [81b842](https://base.uber.com/6d2425e9f/p/81b842) | Modal full screen | 1–420            |
| [033e0d](https://base.uber.com/6d2425e9f/p/033e0d) | Sheet             | 1–1322           |
| [1413a0](https://base.uber.com/6d2425e9f/p/1413a0) | Bottom navigation | 1–783            |
| [335df2](https://base.uber.com/6d2425e9f/p/335df2) | Breadcrumbs       | 1–337            |
| [34a642](https://base.uber.com/6d2425e9f/p/34a642) | Navigation header | 1–696            |
| [717eef](https://base.uber.com/6d2425e9f/p/717eef) | Page controls     | 1–473            |
| [60dee2](https://base.uber.com/6d2425e9f/p/60dee2) | Pagination        | 1–648            |
| [917574](https://base.uber.com/6d2425e9f/p/917574) | Side navigation   | 1–75             |
| [2345e5](https://base.uber.com/6d2425e9f/p/2345e5) | Tabs              | 1–420            |
| [495709](https://base.uber.com/6d2425e9f/p/495709) | Top navigation    | 1–14             |
| [730380](https://base.uber.com/6d2425e9f/p/730380) | Tree view         | 1–70             |

## Access-gated targets — contents not read

### SSO-private — 51

Every row below rendered an access boundary. Titles identify navigation labels or
the private-page shell, not knowledge of its body content.

| ID                                                 | Page                                            |
| -------------------------------------------------- | ----------------------------------------------- |
| [016c0f](https://base.uber.com/6d2425e9f/p/016c0f) | What's new                                      |
| [53ba8a](https://base.uber.com/6d2425e9f/p/53ba8a) | Base 2.0                                        |
| [536ab4](https://base.uber.com/6d2425e9f/p/536ab4) | Help & support                                  |
| [292227](https://base.uber.com/6d2425e9f/p/292227) | Base skills                                     |
| [40715d](https://base.uber.com/6d2425e9f/p/40715d) | Base MCP                                        |
| [73ac78](https://base.uber.com/6d2425e9f/p/73ac78) | Start building                                  |
| [773e2f](https://base.uber.com/6d2425e9f/p/773e2f) | Base onboarding                                 |
| [55b826](https://base.uber.com/6d2425e9f/p/55b826) | Screencasts                                     |
| [76af5a](https://base.uber.com/6d2425e9f/p/76af5a) | Style guide app                                 |
| [9906f6](https://base.uber.com/6d2425e9f/p/9906f6) | Color 2.0                                       |
| [797362](https://base.uber.com/6d2425e9f/p/797362) | Color 1.0                                       |
| [62358a](https://base.uber.com/6d2425e9f/p/62358a) | Border                                          |
| [33fa5e](https://base.uber.com/6d2425e9f/p/33fa5e) | Design tokens                                   |
| [699778](https://base.uber.com/6d2425e9f/p/699778) | Typography 2.0                                  |
| [54a0c3](https://base.uber.com/6d2425e9f/p/54a0c3) | Haptics                                         |
| [16184c](https://base.uber.com/6d2425e9f/p/16184c) | Icons                                           |
| [30b69f](https://base.uber.com/6d2425e9f/p/30b69f) | Illicons                                        |
| [768efd](https://base.uber.com/6d2425e9f/p/768efd) | Illustrations                                   |
| [494002](https://base.uber.com/6d2425e9f/p/494002) | App permissions                                 |
| [12592a](https://base.uber.com/6d2425e9f/p/12592a) | Legal communication                             |
| [94abcb](https://base.uber.com/6d2425e9f/p/94abcb) | Status & tracking                               |
| [58f425](https://base.uber.com/6d2425e9f/p/58f425) | Date picker                                     |
| [290ab7](https://base.uber.com/6d2425e9f/p/290ab7) | Select                                          |
| [03db2d](https://base.uber.com/6d2425e9f/p/03db2d) | 1: Learn Uber's system frameworks               |
| [29db46](https://base.uber.com/6d2425e9f/p/29db46) | 2. Assess & take stock                          |
| [98ab02](https://base.uber.com/6d2425e9f/p/98ab02) | 3. Establish ownership & leadership support     |
| [790b35](https://base.uber.com/6d2425e9f/p/790b35) | 4. Build with Base                              |
| [37522c](https://base.uber.com/6d2425e9f/p/37522c) | 5. Document, update, and maintain               |
| [29f0f6](https://base.uber.com/6d2425e9f/p/29f0f6) | Framework                                       |
| [530914](https://base.uber.com/6d2425e9f/p/530914) | Color guidelines                                |
| [151f27](https://base.uber.com/6d2425e9f/p/151f27) | Icon                                            |
| [58a6bd](https://base.uber.com/6d2425e9f/p/58a6bd) | Chat empty state                                |
| [043826](https://base.uber.com/6d2425e9f/p/043826) | Latency                                         |
| [26e5e5](https://base.uber.com/6d2425e9f/p/26e5e5) | Entry points                                    |
| [059b0f](https://base.uber.com/6d2425e9f/p/059b0f) | First time user experience                      |
| [00aedd](https://base.uber.com/6d2425e9f/p/00aedd) | Hyperlink                                       |
| [10e9b3](https://base.uber.com/6d2425e9f/p/10e9b3) | Thumbs up and down                              |
| [45d467](https://base.uber.com/6d2425e9f/p/45d467) | Prompts                                         |
| [66e40d](https://base.uber.com/6d2425e9f/p/66e40d) | Citation                                        |
| [8107aa](https://base.uber.com/6d2425e9f/p/8107aa) | High-confidence vs. low-confidence results      |
| [9464f7](https://base.uber.com/6d2425e9f/p/9464f7) | Horizontal vs vertical scrolling inside AI chat |
| [16c790](https://base.uber.com/6d2425e9f/p/16c790) | Map integration guidelines                      |
| [32d62d](https://base.uber.com/6d2425e9f/p/32d62d) | Out-of-scope requests                           |
| [44c61e](https://base.uber.com/6d2425e9f/p/44c61e) | POI markers                                     |
| [40ffdf](https://base.uber.com/6d2425e9f/p/40ffdf) | Pointer markers                                 |
| [260e9a](https://base.uber.com/6d2425e9f/p/260e9a) | Map controls                                    |
| [027ef8](https://base.uber.com/6d2425e9f/p/027ef8) | Route lines                                     |
| [011298](https://base.uber.com/6d2425e9f/p/011298) | Access point markers                            |
| [6144a7](https://base.uber.com/6d2425e9f/p/6144a7) | Maps in-progress                                |
| [73a36f](https://base.uber.com/6d2425e9f/p/73a36f) | Timed offers                                    |
| [2380c2](https://base.uber.com/6d2425e9f/p/2380c2) | Ring (WIP)                                      |

### Legacy sign-in — 1

| ID                                                                               | Observed destination | Outcome                             |
| -------------------------------------------------------------------------------- | -------------------- | ----------------------------------- |
| [04de4f](https://uber-base.zeroheight.com/styleguide/s/10716/p/04de4f-changelog) | Legacy changelog     | zeroheight sign-in, with SSO option |

## Stale redirects — 16

All targets below landed on cover ID `294ab4`. Labels come from the referring
URL or link, not recovered former content. A similarly named current page is not
proof of historical equivalence. These responses are excluded from the 121 reads.

| ID                                                                                | Former target label                             |
| --------------------------------------------------------------------------------- | ----------------------------------------------- |
| [63ebaf](https://base.uber.com/6d2425e9f/p/63ebaf-dialog/t/38bf2b)                | Dialog                                          |
| [90140e](https://base.uber.com/6d2425e9f/p/90140e-badge/t/56569f)                 | Badge                                           |
| [830c3d](https://zeroheight.com/6d2425e9f/p/830c3d-mobile-screen-readers)         | Mobile screen readers                           |
| [8898fb](https://zeroheight.com/6d2425e9f/p/8898fb-color)                         | Color                                           |
| [0003da](https://zeroheight.com/6d2425e9f/p/0003da-list-heading)                  | List heading                                    |
| [302f19](https://zeroheight.com/6d2425e9f/p/302f19-numbers-and-currency)          | Numbers and currency                            |
| [27e731](https://zeroheight.com/6d2425e9f/p/27e731-breadcrumbs)                   | Breadcrumbs                                     |
| [52f72c](https://zeroheight.com/6d2425e9f/p/52f72c/t/21b49a)                      | Unnamed versioned/tab target linked from Avatar |
| [87493a](https://zeroheight.com/6d2425e9f/p/87493a-accordion)                     | Accordion                                       |
| [196217](https://zeroheight.com/6d2425e9f/p/196217-popover)                       | Popover                                         |
| [27e3b8](https://zeroheight.com/6d2425e9f/p/27e3b8-message-card)                  | Message card                                    |
| [278fff](https://zeroheight.com/6d2425e9f/p/278fff-grid-table)                    | Grid table                                      |
| [296811](https://zeroheight.com/6d2425e9f/p/296811-flex-table)                    | Flex table                                      |
| [81419a](https://base.uber.com/6d2425e9f/v/0/p/81419a-principles/t/43ad2e)        | Principles                                      |
| [45add5](https://zeroheight.com/6d2425e9f/v/latest/p/45add5-modal-sheet/b/46994b) | Modal sheet                                     |
| [6703d5](https://zeroheight.com/6d2425e9f/v/latest/p/6703d5-select/b/282b43)      | Select                                          |

## Visual and runtime boundaries

Inspected samples: concentric-corner browser screenshot; cropped elevation browser
viewport; full layering diagram; dark-elevated comparison; composite-shadow anatomy;
material hero; and Global writing's syntax-example pair. Four downloaded source
image hashes were verified. Only those samples are marked visually inspected.

Full-text review does not establish runtime behavior, rendered contrast,
assistive-technology conformance, gesture usability, or motion quality. Base Web
source/package provenance and the current Cinder baseline have their own evidence
boundaries in [Base findings](research-base.md) and the
[baseline audit](research-cinder-baseline.md).
