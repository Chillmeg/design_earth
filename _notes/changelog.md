# Change log

Newest first. One entry per round of changes. The details for each page are in `missing-assets.md`.

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
