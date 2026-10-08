# Change log

Newest first. One entry per round of changes. The details for each page are in `missing-assets.md`.

## 2026-10-08: El Hadi's feedback (fine tuning)

**Source:** El Hadi's email (pasted in the session), plus two screenshots of the preview in `update_rania/` (Whale Song and The Way of the Dinosaurs). They show a bold title, missing "1 of N" line and little text on Whale Song, and a soft image and bold item list on Dinosaurs.

### Done

| Request | Change | Files |
|---|---|---|
| PROJECT text order: Title (not bold), *Commission, date*, Project Team, Blurb | The header lines are now front-matter fields (`commission`, `team`), and one include prints them in this order on every page. The title is plain text. Project Details, credits and "Watch the animation" come after the blurb | `_includes/item-text.html`, `_layouts/slideshow.html`, all `_projects/*.md` |
| EXHIBIT text order: Title, *Venue, date*, Project Team, Venue details, On view, Curators, Blurb, Project Details, link to the project | Same, with the fields `venue`, `team`, `venue_details`, `on_view`, `curators`, `details`, `credits`, `projects`. The "Click for more information about the … project(s)" line is built from `projects:`, so it can't point to a wrong address | `_includes/item-text.html`, all `_exhibitions/*.md` |
| "As informative as possible, repetition OK" | Empty exhibition pages got the project's team and blurb. Venue, dates and curators come from the dossier. Projects got details from their exhibitions (Cosmorama, Julia, Trash Peaks) and a commission line where one was known. See "Filled in" below | |
| ANIMATE: bigger film frames | Tiles are 470×264 (was 200×113), 2 per row, 980 px wide | `_layouts/section.html` |
| PUBLISH: bigger book frames, 4×4 grid | 4 per row, covers fit 230×300 (were 200 high), bottoms lined up, 980 px wide. Covers re-made at 2× from the page images | `_layouts/section.html`, `assets/images/publications/*/thumb.jpg` |
| MAIN: headshot before the text | Done | `_layouts/home.html` |
| Automatic move to the next image | Kept, on every PROJECT and EXHIBIT slideshow (5 s). No page turns it off | (no change needed) |
| Same alignment on every project | The slideshow is a fixed 567 px frame on PROJECT and EXHIBIT pages, so the text always starts at the same height and doesn't jump while images change | `_includes/slideshow.html`, `assets/js/slideshow.js` |
| "1 of N  Previous \| Next" on top everywhere | `slideshow_nav: false` removed from all 28 pages. The line also shows on one-image pages, for the same alignment | `_projects/*.md`, `_exhibitions/*.md` |
| Consistent image size | Every slide is shown as large as fits 800×567 (squares 567×567, landscapes about 800×533). Before, the sizes ran from 400 to 1181 px wide | all `images:` lists |
| No small captions | Removed. A World Previous to Ours' cavity names and reference credit, and Laboral's photo credit, moved into the page text | |
| Strongest image first (the cover), references at the end | The cover image is now slide 1 on A World Previous to Ours, Act as if, Of Oil and Ice, The Way of the Dinosaurs and NTU (the others already started with it). A World Previous to Ours: the Cuvier tooth drawing (a reference) moved to the end | |
| Image resolution | 176 slides re-exported at 2× from the Dropbox originals (sharp on retina screens). That includes The Way of the Dinosaurs (from Rania's Dropbox link, 8268 px originals) and Crocodile Tears (re-cut from the act TIFFs). Each one was compared with the old image. 8 Dropbox files turned out to be other versions of the drawing, so those slides were kept as they were | `assets/images/projects/*`, `assets/images/exhibitions/*` |
| Bold for main categories, not bold for item titles | The item list in the left column and the titles under grid tiles are now regular weight. The current item is still grey | `assets/css/style.css`, `_includes/grid-styles.html` |

### Filled in (please check)

- **Project Team "Rania Ghosn + El Hadi Jazairy"** on Crocodile Tears, The Way of the Dinosaurs, Whale Song and the V&A exhibition. These pages had no team.
- **Commission lines** that weren't on the pages: Act as if (This Land's Unknown, FRAC Orléans, 2019), Climate Inheritance (Bauhaus Museum Dessau, 2021), Flag the Earth (Cornell AAP, Earth: Projections 50 Years after Earth Art, 2019, from the dossier; curator Tao DuFour), Whale Song (London Design Festival, V&A, 2022), Crocodile Tears and The Way of the Dinosaurs ("Elephant in the Room and Other Fables", 2026 / 2023).
- **Exhibition details from the dossier:** MoMA (Systems, cur. Paola Antonelli, May 23, 2022 – Nov 6, 2024; the page is still unpublished).
- **Venue lines worked out from the page text:** Venice 2021 ("As One Planet, Central Pavilion, Giardini"), Geographies of Trash (dates from the blurb).
- Typo fixed: "luís" → "Luís" (Oslo curators).
- The Geostories (League Prize) page now links to the real Neck of the Moon page. It used to point to `/projects/neck-of-the-moon/`, a 404 listed in `known-issues.md`.

### Still open

- [ ] **Conflicts with the dossier** (the page wording was kept): Bauhaus Dessau dates (page: 24 June – 3 Oct 2021; dossier: March 26 – October 4, 2021); Volcano Dreams year (page: 2021; dossier: October 15 – December 18, 2020).
- [ ] **No Project Team known:** Act as if Our House Is on Fire, Climate Inheritance, Cosmograph, NTU, Volcano Dreams.
- [ ] **No blurb:** Ocean Metabolism, Cosmograph, NTU, Volcano Dreams.
- [ ] **Low-resolution images, no original in the Dropbox** (shown up to 1.4× larger than the file): A Geographic Stroll (4), Love Your Monsters (5), Neck of the Moon (9), Sea Our Land (5), The Atmosphere Is Dead (1), The Belly of a Mountain (2), Towers on Wire (2), Cloud Culture City (1), The Planet After Geoengineering (21 of 25 are 567 px). Laboral photo 2 is only 400×299, so it is shown at that size.
- [ ] **Image order beyond "cover first":** only A World Previous to Ours had an obvious reference image. El Hadi or Rania should say which other images are references.
- [ ] MoMA page: still waiting for MoMA's caption.

### Checks run

- Each page title was compared with its old bold title. Julia and A Geographic Stroll got a `heading:` so they keep their full titles.
- Every changed front matter parses as YAML. Every `projects:` / `animation:` entry points to an existing page.
- Each re-exported image was compared with the old one (diff at 128 px and 32 px, plus a visual check of the borderline ones).

## 2026-10-05: Rania's feedback (October)

**Source:** Rania's notes and images in `update_rania/` (private and gitignored), plus the Dropbox links in her notes.
**Commits:** `11484fa`, `906777f`, `d4deaee`. All three are pushed, and the preview build succeeded.
**Preview:** https://chillmeg.github.io/design_earth/

### Done

| Area | Change | Files |
|---|---|---|
| All slideshows | One image every 5 seconds (was 3) | `_config.yml` (`slideshow_interval`) |
| MAIN | Rania's new bio. The DE headshot replaces the home image. Email and Instagram links unchanged | `index.md`, `assets/images/home/01.jpg` |
| PROJECT / Whale Song | New cover: the "Whale Song" title drawing (was slide 7) is now the thumbnail and the first slide | `_projects/whale-song.md`, `thumb.jpg` |
| PROJECT / Act as if Our House Is on Fire | Rania's text. Images are now the two flag drawings (`FINAL_1/2.jpg` from Dropbox) | `_projects/act-as-if-our-house-is-on-fire.md` |
| PROJECT / Flag the Earth | **New page.** Rania's text, project team, 7 photos from the 2019 Global Climate Strike | `_projects/flag-the-earth.md` |
| PROJECT / Love Your Monsters | Rania confirmed this is the old "A Space Oddity" page. Merged: the Space Oddity text, the new line "5 drawings (91 X 59 cm), inkjet print on paper", and the Dropbox images. **`/projects/a-space-oddity/` now redirects here.** Placed in Space Oddity's old (2016) position | `_projects/love-your-monsters.md`; `a-space-oddity.md` and its images removed |
| PROJECT / The Way of the Dinosaurs | **New page.** 4 scenes (Dropbox), text from the animation page, link to the animation | `_projects/the-way-of-the-dinosaurs.md` |
| PROJECT / Crocodile Tears | **New page.** The 4 acts of the scroll are cut into 14 frames (acts 1–3: 3 frames each, act 4: 5), text from the animation page, link to the animation | `_projects/crocodile-tears.md` |
| EXHIBIT / Act as if… UC Denver | **New page.** Drawing Im/Proper, UC Denver College of Architecture and Planning, cur. Kevin Hirth & Anca Matyiku, March 6–31, 2020. Uses the 2 installation photos moved from the project page | `_exhibitions/act-as-if-our-house-is-on-fire--uc-denver.md` |
| EXHIBIT / Act as if… FRAC Orléans | **New page.** This Land's Unknown, cur. Nora Akawi, Oct 11, 2019 – Feb 9, 2020 (from the dossier). Uses `flag.jpg` and `flag2.jpg` | `_exhibitions/act-as-if-our-house-is-on-fire--frac-orleans.md` |
| EXHIBIT / Glasgow Science Centre | Dropped (no installation photos). There was never a page, so only the list entry was removed | `_data/order.yml` |
| EXHIBIT / NTU CCA Singapore | New cover: `DSC_9596`, the wall of drawings with a visitor | `thumb.jpg` |
| PUBLISH / Climate Inheritance (book) | **Now published.** 17 book photos from Dropbox. Left out `_0130`, a grey-background duplicate of the cover | `_publications/climate-inheritance-book.md` |
| PUBLISH / Geographies of Trash (book) | Cover photo plus 2 spread photos replace the 22 images that were missing on the old site | `_publications/geographies-of-trash-book.md` |
| PUBLISH / ESSAYS | **New list** under BOOKS: 13 essays with citations from the dossier, 12 with a Download link. Edit the list in `_data/essays.yml`. PDFs go in `files/download/` | `_data/essays.yml`, `_includes/essays.html`, `_layouts/section.html`, `publications.md` |
| ANIMATE / Living as Flamingo | Text layout fixed. The "\|" in the title was turning the text into tables | `_animations/living-as-flamingo.md` |
| Privacy | `update_rania/` is gitignored and excluded from the site | `.gitignore`, `_config.yml` |
| Order | Updated for the new and renamed pages | `_data/order.yml` |

### Choices made without explicit instruction (Rania can change any of them)

- Whale Song's new cover is also the first slide.
- Love Your Monsters uses the Dropbox copies of the drawings (the same 5 as the old site, in a different order). It sits in Space Oddity's old position.
- The FRAC venue line follows the dossier ("FRAC Orléans Architecture Biennale, Jeanne D'Arc Street"), not Rania's "Biennale d'Architecture d'Orleans".
- The low-res cargocollective photo Rania linked for FRAC is the same photo as `flag2.jpg`, so the higher-resolution file was used.
- The Crocodile Tears frames are cut at even widths, not at scene changes.
- The NTU cover photo was chosen from the existing 5 photos, because no new image was sent.
- The essay PDFs are linked as they came. Five are the publishers' typeset copies (Routledge, MIT Press, JOVIS, nai010, Actar), and you approved putting them up.
- The older essays (JAE, Log, etc.) still appear as tiles below the ESSAYS list. Ask Rania whether they should move into the list.

### Still open

- [ ] **Animation texts:** Rania asked for "better descriptive texts for each animation". Only she can write them.
- [ ] **Log 60 "Geodesign":** the PDF is 74 MB, so it's listed without a Download link. Needs a smaller copy.
- [ ] **Likely typos,** copied as written: "The practice' work" (bio) and "damaged landsm" (Crocodile Tears text, on both the project and animation pages).
- [ ] Living as Flamingo, A Pas de Loup and 800-Pounds Gorilla project pages. Their scrolls are in the Dropbox and can be cut into frames the same way as Crocodile Tears.
- [ ] Flag the Earth | Cornell AAP exhibition page (still in `order.yml`, no photos).
- [ ] MoMA exhibition page still unpublished, waiting for MoMA's caption.

### Checks run

- GitHub Pages build for `906777f`: success.
- All new and changed pages return 200. Every image on them loads, and all 12 essay PDFs download.
- `/projects/a-space-oddity/` redirects to `/projects/love-your-monsters/`.
- No tables are left on Living as Flamingo or Act as if.
- `_tools/compare.js`: the only differences from the archive are intended (listed in `known-issues.md`), plus the old Geostories link that was already broken.
