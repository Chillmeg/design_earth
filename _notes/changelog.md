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
- [x] **Log 60 "Geodesign"** (lighter copy linked 2026-10-14): the PDF is 74 MB, so it's listed without a Download link. Needs a smaller copy.
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

## 2026-10-14: Project teams checked against the dossier

Every PROJECT page was checked against the dossier (`files/dropbox/_reference/research-and-creative-practice-dossier/`, full PDF v2 and Volume 1 draft).

| Project | Change | Source in the dossier |
|---|---|---|
| Climate Inheritance | **Team added** (had none): Anhong Li, Emma Jurczynski, with initial contributions from Marco Nieto and Zhifei Xu | Project page + the printed "Design Earth project team" credit |
| The Way of the Dinosaurs | Added Monica Hutton, Anhong Li | Printed acknowledgment, "DESIGN EARTH project team for text and images" |
| Trash Peaks | Added "with contributions from Sun Park and Rawan Al-Saffar" | Abitare caption |
| Cosmorama | "Tianwei Yen" → "Tianwei Ye" | Abitare caption + Geostories team list |
| Of Oil and Ice | "Rawan Alsaffar" → "Rawan Al-Saffar" | Abitare caption |

Already matching the dossier: After Oil, Pacific Aquarium, The Planet After Geoengineering, Sowing Worlds, Elephant in the Room (the JAE 2021 credit), Flag the Earth. The rest aren't credited in the dossier; their teams come from the old site.

### Still open (teams)

- [x] **No team found:** Act as if Our House Is on Fire, Crocodile Tears, Whale Song: answered by Rania on 2026-10-14. Still none: Hassi Messaoud Oil Urbanism (hidden placeholder page).
- [x] **Sea Our Land** (Rania, 2026-10-14: she did not work on it, so El Hadi only) lists only "El Hadi Jazairy" as lead, as on the old site. Check whether Rania should be added.
- [x] **Climate Inheritance** (Rania, 2026-10-14: Leen Katrib was her interlocutor in a Deem Journal interview, not a team member, so the printed credit stays): the Section Info draft (`Ghosn_Section_Info_Pages_v2.docx`) says "with Leen Katrib" instead. The printed credit was used. Confirm.
- [x] **Elephant in the Room** (Rania, 2026-10-14: keep the 2021 credit): the dossier's series page has a larger team (adds Malak Atwi, Ekin Bilal, Jabari Canada, Juliet Chui, Hana Meihan Davis, Kelly Koh, Habin Park, Ivan Shen). The site keeps the 2021 credit (Hutton, Li).

### Credits moved into Project Team, new blurbs (same day)

- **Roles now sit in Project Team as "Name (Role)"**, and the "Narrated by…/Music by…/Advisor" lines at the end are gone. This applies to the Whale Song, Crocodile Tears, The Way of the Dinosaurs (adds Jabari Canada, Soundtrack, from the dossier), Elephant in the Room, A World Previous to Ours (Sylvia Lavin) and Cosmorama (Benjamin Weiss, Advisor) project pages; the Whale Song and both Cosmorama exhibition pages; and every ANIMATION page, which now has a "Project Team:" block like A Pas de Loup. Curators, the meteorite loan and photo credits stay where they were, since they're not the project team.
- **Blurbs written from the dossier:** Whale Song (project, exhibition and animation pages; from Materia Arquitectura 28), The Way of the Dinosaurs (project and animation; from LA+ "Fossil Fabulation"), and the 800-Pound Gorilla, A Pas de Loup and Elephant in the Room animation pages (from the verse texts and the JAE credit). **Rania should read these.**
- Crocodile Tears: "damaged landsm" → "damaged lands,". The blurb is otherwise Rania's, because there is no other source.

- [ ] **Still no blurb:** Ocean Metabolism (the old site had none; no text in the dossier or Dropbox, only the drawing). Hassi Messaoud (hidden placeholder).
- [x] **Crocodile Tears** (Rania sent a longer blurb on 2026-10-14) needs a longer blurb from Rania. The dossier has nothing on it.
- [ ] 800-Pound Gorilla: the page says 2024, the dossier caption says 2025.

## 2026-10-14: EXHIBIT pages checked for the nine fields

Order on every exhibit page: title (not bold), *venue, date*, Project Team, Venue, On view, Curators, blurb, Project Details, link to the project(s). Titles are bold on PROJECT pages only (`_includes/item-text.html`).

### Filled in

| Exhibition | Added | Source |
|---|---|---|
| Climate Inheritance, Bauhaus Dessau + Shenzhen | Project Team | Climate Inheritance project (dossier credit) |
| Cosmograph, MIT Museum | Project Team (the 20 collaborators, plus Celia Chaussabel and Lily Bartle), blurb, "organized by CAST and the MIT Museum" line, Adam DeTour photo credit | The exhibition booklet in the dossier |
| Speculative Fiction for the Climate, NTU CCA | Blurb (short and factual: curator, the four projects) | Dossier exhibition list |
| Volcano Dreams, ETH Zürich | Project Team (Rania Ghosn, El Hadi Jazairy, Anhong Li), On view (Oct 15 – Dec 18, 2020), Project Details (the three 2020 drawings), blurb. **Year changed 2021 → 2020** | e-flux Architecture page (Oct 2020) + the dossier, which agree |
| After Oil, Venice | Venue: "Kuwait Pavilion, Venice Biennale, Venice" | The page's own venue line |
| Pacific Aquarium, Milano Triennale | Venue: "La Triennale di Milano, Milan" | The page's own venue line |
| Neck of the Moon, League Prize | The "Exhibition, Installation and Production" credit moved into Project Team | — |

### Still missing (no source found)

- [ ] **Project Team:** Act as if (FRAC Orléans, UC Denver; the project has no team either), Speculative Fiction for the Climate NTU (4 projects, no exhibition credit).
- [x] **Curators** (Rania, 2026-10-14; Geographies of Trash has none): Climate Inheritance Bauhaus Dessau, Cosmograph MIT Museum (the booklet names only the organizing institutions), Geographies of Trash, Neck of the Moon League Prize, Geostories Cooper Union, Trash Peaks Seoul, Whale Song V&A.
- [ ] **Project Details** (what was shown): Act as if (both), After Oil MoMA (unpublished), A World Previous to Ours Venice, Climate Inheritance (both), Cosmograph, Elephant in the Room Talkbox, Geostories Cooper Union, Planet After Geoengineering (Venice, Laboral, MUDAC, Onassis Stegi), Sowing Worlds Tallinn, NTU, Whale Song V&A.
- [ ] **Link to a project:** Geographies of Trash and Volcano Dreams have no project page to link to.
- [ ] **"Tianwei Ye" or "Tianwei Yen"?** The Cosmograph booklet and the old site say Yen; Abitare and the Geostories team list say Ye. The Cosmorama pages now say Ye, the Cosmograph page says Yen (as printed).

## 2026-10-14: Two image sizes, regular grids

- **PROJECT and EXHIBIT pages:** every slideshow image is shown at one of two sizes, cropped to fill (CSS `object-fit: cover`). Square and near-square images (up to 1.25:1) show at 567×567, and horizontal images at 800×533 (3:2). A 16:9 image loses a little at the sides, a 4:3 image a little at top and bottom. The rule is in `_includes/slideshow.html` and `assets/css/slideshow.css`. PUBLISH pages keep their covers as they are.
- **Vertical images are hidden** on those pages; they stay listed in the front matter, so nothing is lost. Hidden now: A World Previous to Ours project `01.jpg` and Venice exhibition `01.jpg`, `04.jpg`; Flag the Earth `07.jpg`; Act as if UC Denver `02.jpg`; Cosmorama Venice exhibition `05.jpg`.
- **Grids:** PROJECT, EXHIBIT and ANIMATE tiles are all 200×200 squares with the same layout. ANIMATE was 2 per row at 16:9, so the YouTube stills are now cropped to their centres. PUBLISH: books are 230×230 squares, and journals/magazines are 230×300 portraits, so each row lines up. Climate Inheritance (book) has the widest cover (1.2:1) and loses the most at the sides.
- **Fix, panoramas:** images 1.9:1 or wider were cropped to a small slice (Julia's 6:1 strip showed only its middle). They now keep the 800×533 frame but are shown whole, at the top of it. Affected: Julia, A Geographic Stroll `03`/`04`, Whale Song `08`, Towers on Wire `01`/`02`, Ocean Metabolism.

### PUBLISH image sizes, Julia in full resolution (same day)

- **PUBLISH pages:** every small cover is 300px high, and every enlarged cover (click) and every book-page image is 567px high, the same as the project frame. Widths follow each image, with no cropping or hiding. Code: `_layouts/grow.html`, `assets/js/grow.js`, `_layouts/slideshow.html`, `_includes/slideshow.html`.
- [ ] **Low-resolution covers** (the only files the old site had, smaller than 567px high, so slightly soft when enlarged): 8 Mile Baseline, Geographic Stroll (MONU), Elephant in the Room (JAE), Geographies of Trash (book cover), Geography and Oil, Hassi Messaoud, New Geographies (both), Of Oil and Ice (Ambiguous Territory), The Anthropocene Chamber, Trash Peaks (Eco-Visionaries), Uncommon Planet (LA+), Undermined Planet (AR), Where Are the Missing Spaces. Larger scans would fix them.
- **Julia:** the image is now rendered from the full drawing (Dropbox `06_Julia.pdf`, 6397×1066) and shown at 533px high, like the other horizontal images, in an 800px-wide box that scrolls sideways (`scroll: true` on the image). The old 800×133 file is still in the archive.
- **Update:** PUBLISH images are now **300px high everywhere**, the same as the journal covers, including the book pages (Geostories, The Planet After Geoengineering, Climate Inheritance, Geographies of Trash). Covers enlarge to 400px on click, which is the real height of most cover files, so the low-resolution covers aren't blown up.
- **Menu:** the second "Climate Inheritance" in the PUBLISH menu (the empty Perspecta #54 page) is hidden (`hidden: true`). The URL still works. The Dropbox has its cover and a draft PDF if it should come back as a proper page.

## 2026-10-14: ANIMATE pages follow the PROJECT order

- Animation pages now use the same text block as project pages (`_includes/item-text.html`, from `_layouts/video.html`): **title**, *series/commission, date*, Project Team, blurb, (c) year. The team and (c) moved into the front matter (`team`, `credits`); the page text is the blurb only.
- The italic line is copied from the matching project page (Crocodile Tears, The Way of the Dinosaurs, Whale Song, Elephant in the Room). A Pas de Loup gets "Elephant in the Room and Other Fables, 2025" because its text calls it the fifth animation in the series.
- **Living as Flamingo:** English only. The French text is removed. Both narrators are in Project Team, in English (Paola Antonelli, English version; Vinciane Despret, French version), and the French video is still offered as a version.
- [ ] **No italic line** (no source): 800-Pound Gorilla, Living as Flamingo. Are they part of "Elephant in the Room and Other Fables" too?

## 2026-10-14: Rania's answers, new covers, the four oldest projects

**Source:** Rania's replies to the open questions (pasted in the session), plus three requests from the user.

### Done

| Request | Change | Files |
|---|---|---|
| PROJECT covers: Whale Song image 9, The Way of the Dinosaurs image 2, Climate Inheritance image 18 | That image now comes first in the slideshow, and the 200×200 grid tile is a new centre crop of it. ("Image N" = the Nth image in the slideshow. For Dinosaurs that is `01.jpg`, because `02.jpg` was already first) | `_projects/whale-song.md`, `the-way-of-the-dinosaurs.md`, `climate-inheritance.md`, their `thumb.jpg` |
| PUBLISH: the four books should show flat front covers, not perspective photos | The covers come from ACTAR's shop (actar.com). Each one is the book page's first image (`01.jpg`, 300px high as before), and `thumb.jpg` is the same cover at 460px wide. **Book tiles are now 230×300 portraits like the journals.** They were 230×230 squares, which would have cut the title off a flat cover | `_publications/{climate-inheritance-book,geostories,the-planet-after-geoengineering,geographies-of-trash-book}.md`, `assets/images/publications/<same>/`, `_layouts/section.html` |
| The four oldest projects were missing from PROJECT | They had been `hidden: true` since the outline round, because they weren't in Rania's outline. They are listed again, at the bottom of PROJECT as set in `order.yml`: CCC Cloud Culture City, Towers on Wire, The Belly of a Mountain, 4.7: A Geographic Stroll Around the Horizon. Hassi Messaoud (empty placeholder) stays hidden | `_projects/cloud-culture-city.md`, `towers-on-wire.md`, `the-belly-of-a-mountain.md`, `a-geographic-stroll-around-the-horizon.md` |
| Project teams | Act as if Our House Is on Fire: Reid Fellenbaum. Crocodile Tears: Malek Atwi, Monica Hutton, Ivan Shen (project and animation). Whale Song: Monica Hutton, Anhong Li (project, animation and V&A exhibition) | |
| Crocodile Tears blurb | Rania's longer text (project and animation pages), with "landsm" read as "lands," | |
| Curators | Bauhaus Dessau: Regina Bittner. MIT Museum: Ann Neumann (the email says "Newumann"), plus "Exhibition design: Studio Joseph." in the credits. League Prize: Anne Rieselbach. Cooper Union: Nader Tehrani with Steven Hillyer. Seoul: Hyungmin Pai and Alejandro Zaera-Polo. V&A: Meneesha Kellay. Geographies of Trash: none. The label now also says "Curators" for "A with B" | `_exhibitions/*.md`, `_includes/item-text.html` |
| Confirmed, no change | Sea Our Land stays El Hadi only. Climate Inheritance keeps the printed credit. Elephant in the Room keeps the 2021 credit. Volcano Dreams stays 2020 | |

### Open

- [ ] **Spellings to confirm:** "Malek Atwi" (Rania's email) or "Malak Atwi" (the dossier's Elephant in the Room series team)? "Ann Neumann" (the email says "Newumann")?
- [ ] **Book covers differ from the old photos:** ACTAR's Geostories cover is a later printing (with a different drawing on the front), and its Geographies of Trash cover has a different layout from the copy in the old photo. Swap them back if the first editions are wanted.
- [ ] **Waiting for El Hadi:** Tianwei Ye or Yen, the Ocean Metabolism blurb, exhibition teams (Act as if at both venues, NTU), Project Details for the exhibitions, the Bauhaus Dessau and 800-Pound Gorilla dates, the MoMA caption, larger cover scans, and project pages for Flamingo, Pas de Loup and Gorilla.
- [ ] **Rania asked for a reminder on Friday 2026-10-16** to review the drafted blurbs: Whale Song and The Way of the Dinosaurs; the 800-Pound Gorilla, A Pas de Loup and Elephant in the Room animation pages; the Cosmograph, NTU and Volcano Dreams exhibition pages.
- [ ] **Flag the Earth, Cornell AAP:** photos still to be selected from Rania's Dropbox link. **Log 60** (smaller PDF) and **Perspecta #54** (final PDF): Rania attached these to her email, but they are not in the repo yet.

### Rania's PDFs (same day)

Rania's three attachments were in `update_rania/`. The originals stay there, and copies are in `files/download/`.

- **Log 60 "Geodesign"** (13 pages, 0.5 MB, the lighter copy): `DE_2024_Geodesign_Log 60.pdf`, linked in ESSAYS. The title now reads "It Matters **What** Earths Make Worlds", as printed.
- **Deem Journal Issue 5, "Worlding Anew"** (her interview with Leen Katrib, pp. 28–39): `DE_2024_Worlding Anew_Deem 5.pdf`, added to ESSAYS after Perspecta #56.
- **`Ghosn+Jazairy_2024_Perspecta56.pdf` is not the Climate Inheritance article (Perspecta #54).** It's "Elephant in the Room and Other Fables" (Perspecta 56, pp. 120–133), which ESSAYS already links. The linked copy has the issue cover in front, and this one is lighter (1.3 MB, as spreads). Nothing was changed, and Climate Inheritance (Perspecta #54) stays hidden.
- [ ] Ask Rania for the Perspecta #54 Climate Inheritance PDF, and whether to swap the Perspecta 56 copy for the lighter one.

### ANIMATE French version, two EXHIBIT covers (same day)

- **ANIMATE: "Vivre en (Flamant) Rose"** is a new item right after Living as Flamingo (`_animations/vivre-en-flamant-rose.md`), with the French video only and the French blurb from the old page. The title is spelled as on YouTube ("Flamant", not "Flamand"). Living as Flamingo still offers both versions.
- **No black bars on the flamingo tiles:** YouTube only has a letterboxed 640×480 still for both videos, so the thumbnails are cropped to the 640×360 picture.
- **EXHIBIT covers:** Elephant in the Room Talkbox now opens on image 3, and Sowing Worlds (Tallinn) on image 2. The tiles are new centre crops.

## 2026-10-19: Uniform titles, citations, teams and exhibition links

**Source:** the user's notes on El Hadi's materials (`update_el_hadi/`, gitignored: his dossier *Research and Creative Practice, Volume 3* as InDesign, six Flag the Earth photos, Ocean Metabolism.pdf).

### Done

- **Titles are plain text, not bold**, on every page: PROJECT, ANIMATE (`_includes/item-text.html`) and PUBLISH (the `**Title**<br>` line in 31 `_publications/*.md`).
- **Italic line = "Exhibition or competition, venue, date"**, always ending with `, YYYY`. An award goes before the date ("Dry Futures Competition, Honorable Mention, 2015"). Venice is always "La Biennale di Architettura di Venezia" (After Oil, Cosmorama, The Planet After Geoengineering, A World Previous to Ours; the "19th International Architecture Exhibition" was dropped). Project and exhibit pages now say the same thing (Trash Peaks "Seoul Biennale for Architecture and Urbanism, 2017"; Pacific Aquarium "After Belonging: On Residence, Oslo Architecture Triennale, 2016"; Julia "…, Le Lieu Unique, Nantes, 2019"; Whale Song "London Design Festival, V&A Museum, 2022"). Exhibit lines put the exhibition title first and the venue after (Tallinn, Milan, Shenzhen, Wrightwood, League Prize).
- **Project Team** starts with "Rania Ghosn + El Hadi Jazairy" on every project, exhibit and animation page (was "El Hadi Jazairy + Rania Ghosn", "and", "&", or names in one line). Exception: Sea Our Land stays "El Hadi Jazairy" (Rania, 2026-10-14; confirmed by the user). "(Directors)" was dropped from A Pas de Loup's first line.
- **Teams from El Hadi's dossier:** Act as if Our House Is on Fire = Mingyang Xia (not Reid; project, FRAC and UC Denver pages). Flag the Earth = Reid Fellenbaum, with Anna Canny. Tianwei **Yen** (closes the Ye/Yen question). The Way of the Dinosaurs adds Kelly Koh (dossier: "Animation team: Anhong Li, Monica Hutton, Kelly Koh"). NTU Singapore: founders only.
- **Commission exhibition links:** new project field `exhibitions:` (file names of exhibit pages). The italic line links to that page and the page ends with "Click for more information about the <Venue> exhibition." The link text is the part of the exhibit title after " | ". Set on: A World Previous to Ours, Sowing Worlds, Climate Inheritance (Bauhaus), Act as if (FRAC), The Planet After Geoengineering (Venice), Julia, Cosmorama (Venice), Trash Peaks, Pacific Aquarium (Oslo), After Oil (Venice), Whale Song (V&A), Georama of Trash (Lisbon). The hand-written versions were removed (A World Previous credits, Act as if "Exhibited as part of…"), as were the curator credits on Sowing Worlds and Julia (they are on the exhibit pages).
- **New EXHIBIT page:** Georama of Trash | Lisbon Architecture Triennale (`_exhibitions/georama-of-trash--lisbon-architecture-triennale.md`), two installation photos from the Dropbox, listed after Oslo.
- **Flag the Earth:** El Hadi's six photos added after the old six (`08`–`13`; the drawing is `08`). Cover unchanged.
- **Laboral:** `02.jpg` was a photo from Onassis Stegi (Athens). Replaced with the Laboral wall-text photo from El Hadi's dossier (David Aguilar Sánchez, `_07`); credit now "Photos: David Aguilar Sánchez".
- MIT Museum (Cosmograph) already linked Love Your Monsters at the end; no change.

### Open

- [ ] **Georama of Trash, Lisbon:** dates, curators and exact venue are unknown (left out of the page).
- [ ] **Hassi Messaoud** (hidden placeholder): no team or commission.
- [x] **Ocean Metabolism blurb:** the user transcribed the three text panels of `Ocean Metabolism.pdf` (2026-10-19). All three have the same body text, so it is the page text once, followed by the three panel titles. OCR slips fixed ("Contellation", "dry land,", "shelf,").
- [ ] **Projects with several exhibit pages** link only the commission (e.g. Pacific Aquarium → Oslo, not Milan/Guangzhou/Athens). Add more slugs to `exhibitions:` to list them all.
- [ ] **Kelly Koh** on The Way of the Dinosaurs comes from the dossier only; confirm.

### Flag the Earth moves to EXHIBIT (same day)

- **Flag the Earth** is one showing of Act as if Our House Is on Fire, so it is now an EXHIBIT page: `_exhibitions/flag-the-earth--cornell-aap.md` (menu: "Flag the Earth | Cornell AAP"; page title "Flag the Earth"), in the place `order.yml` already had for it (after FRAC Orléans). It ends with "Click for more information about the Act as if Our House Is on Fire project." Images moved to `assets/images/exhibitions/flag-the-earth--cornell-aap/`. The old address `/projects/flag-the-earth/` redirects there.
- The curator line became the Curator field (Tao DuFour). Venue "Rand Hall, Cornell AAP, Ithaca, NY" comes from the page text. Not added: the dossier's dates (8–10 November 2019, the symposium; the flag went up for the 20 September Climate Strike) and its longer curator list (Tao Du Four, Ainsle Cullen, Hallie Black and Evan McDowell). Please confirm which to show.

### No curators on PROJECT pages (same day)

- Rule: curators appear only on EXHIBIT pages. Removed from Elephant in the Room ("Curators: Rodney Harrison and Colin Sterling", the Glasgow Science Centre show, which has no exhibit page since Rania dropped it) and from A World Previous to Ours' text ("curated by Sylvia Lavin", who is on the Venice exhibit page). Sowing Worlds and Julia were already done; Flag the Earth is now an exhibit.

### Italic line without links (same day)

- The italic citation under the title is plain text again; the exhibition link is only at the end of the page ("Click for more information about the … exhibition."). `_includes/item-text.html`.
- The award links on five old competition projects (A Geographic Stroll, Apart, CCC, Santa Claus, Sea Our Land) are plain text too, so no italic line has a link. The old URLs are in git history (commit before this one).
