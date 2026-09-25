# design-earth.org archive: inventory

Captured 2026-09-25 from the live Indexhibit site (v2.1.5). **Do not modify anything in this folder.**

## Layout

| Folder | What | Size |
|---|---|---|
| `design-earth.org/` | Untouched wget mirror (`--mirror --convert-links --adjust-extension --page-requisites --no-parent -e robots=off --compression=auto --restrict-file-names=windows`, started from `/`) | 33 MB |
| `_ajax/slides/<id>.json` | Slideshow slides 2..n, which the live site loads by `POST /ndxzsite/plugin/ajax.php jxs=slideshow` (wget can't see them) | |
| `_ajax/grow/<id>.html` | Publication "grow" (click-to-enlarge) images, loaded by `POST ajax.php jxs=grow` | |
| `_ajax/files/gimgs/` | Full-size images referenced only from JS or AJAX responses | 18 MB |
| `_ajax/files/download/` | 12 PDFs linked from publication pages | 33 MB |
| `_ajax/pages-index.json` | For each page: slideshow image IDs and filenames, in order | |
| `_ajax/grow-index.json` | For each publication page: grow node IDs | |
| `_ajax/RENAMED.txt` | One file renamed because `:` is illegal on Windows | |
| `_logs/wget-mirror.log` | Full wget log | |
| `_tools/` | Scripts used to capture `_ajax/` and to produce the table below | |

## Totals

- **77 HTML files**, which are:
  - 1 home (MAIN), plus `/xml/`, which is a duplicate of home (the RSS feed is disabled)
  - 3 section grids: `/projects/` (22 tiles), `/publications/` (32 tiles), `/exhibitions/` (16 tiles)
  - 21 `/projects/*` + 2 legacy `/project/*` (singular) = **23 project pages**
  - **33 publication pages** (includes `/publications/geographies-of-trash/2/`)
  - **16 exhibition pages**
- **ANIMATION**: a nav label with no link and no pages (`/animation/` returns 404)
- **Images**: 255 full-size (`/files/gimgs/`) + 70 grid thumbnails (`/files/dimgs/`)
- **Slideshow slides**: 208 captured through AJAX, all `jpg` (no video slides)
- **PDFs**: 12

## Broken or missing on the live site

1. `/publications/geographies-of-trash/2/`: the "Geographies of Trash" book tile in the PUBLISH grid links here. All 22 slideshow images (`122_GOT*.jpg`) return **404 on the live site**, so the page shows a broken image today.
2. `/exhibitions/geostories/` body text links to `/projects/neck-of-the-moon/`, which returns **404**. The real page is `/projects/neck-of-the-moon-hyperreal/`.
3. The `/files/gimgs/` filenames containing `©` were mis-encoded by wget, which produced 404s. They were fetched correctly into `_ajax/files/gimgs/`. They work on the live site.

## External embeds and links

- No iframes or embedded video players. All slides are images.
- Links only: 1 Vimeo (`vimeo.com/216378167`), 1 YouTube (`youtube.com/watch?v=f_n0uMa46Io`), 16 Dropbox PDF links, 2 Amazon, plus a handful of press links.
- Google Custom Search box in the nav (`google.com/cse`, empty `cref`, so it is probably non-functional).
- Google Analytics UA-55236022-1 (Universal Analytics, which Google shut down in 2023, so it is no longer collecting data).

## Structural notes for Phase 2

- Two page formats: `format-slideshow` (projects, exhibitions, a few publications) and `format-visual_index` (section grids and most publication pages, using click-to-grow).
- Inside a section, the left nav expands to list every item in that section. `projects/hassi-messaoud-oil-urbanism/` and `publications/climate-inheritance--perspecta/` appear only in that list and have no grid tile.
- Internal links use `https://design-earth.org:443/`, `http://design-earth.org/`, and `https://www.design-earth.org:443/`.

## Per-page table

| URL | Title | Format | Images |
|---|---|---|---|
| / | MAIN | slideshow | 1 |
| /exhibitions/ | EXHIBIT | visual_index | 16 tiles |
| /exhibitions/after-oil--sursock-museum/ | After Oil / Sursock Museum | slideshow | 1 |
| /exhibitions/after-oil/ | After Oil \| Venice Biennale | slideshow | 5 |
| /exhibitions/climate-inheritance--bauhaus-dessau/ | Climate Inheritance \| Bauhaus Dessau | slideshow | 3 |
| /exhibitions/cosmorama--venice-architecture-biennale/ | Cosmorama \| Venice Architecture Biennale | slideshow | 5 |
| /exhibitions/cosmorama--wrightwood-659/ | Cosmorama \| Wrightwood 659 | slideshow | 4 |
| /exhibitions/geographic-leviathan--onassis-cultural-center/ | Pacific Aquarium \| Onassis Cultural Center | slideshow | 2 |
| /exhibitions/geographies-of-trash/ | Geographies of Trash \| Liberty Research Annex | slideshow | 6 |
| /exhibitions/geostories--cooper-union/ | Geostories \| Cooper Union | slideshow | 10 |
| /exhibitions/geostories/ | Neck of the Moon \| League Prize | slideshow | 4 |
| /exhibitions/julia-the-submerged-volcano--le-lieu-unique/ | Julia \| Le Lieu Unique | slideshow | 1 |
| /exhibitions/pacific-aquarium--milano-triennale/ | Pacific Aquarium \| Milano Triennale | slideshow | 1 |
| /exhibitions/pacific-aquarium--oslo-architecture-triennale/ | Pacific Aquarium \| Oslo Architecture Triennale | slideshow | 2 |
| /exhibitions/pacific-aquarium--times-museum/ | Pacific Aquarium \| Times Museum | slideshow | 4 |
| /exhibitions/planet-after-geoengineering--venice-biennale/ | Planet After Geoengineering \| Venice Biennale | slideshow | 3 |
| /exhibitions/trash-peaks/ | Trash Peaks / Seoul Architecture Biennale | slideshow | 7 |
| /exhibitions/volcano-dreams--eth-zuerich/ | Volcano Dreams \| ETH Zürich | slideshow | 1 |
| /project/a-geographic-stroll-around-the-horizon/ | 4.7: A Geographic Stroll Around the Horizon | slideshow | 4 |
| /project/the-belly-of-a-mountain/ | The Belly of a Mountain | slideshow | 2 |
| /projects/ | PROJECT | visual_index | 22 tiles |
| /projects/a-space-oddity/ | A Space Oddity | slideshow | 5 |
| /projects/after-oil/ | After Oil | slideshow | 9 |
| /projects/apart-we-are-together/ | Apart, We Are Together | slideshow | 14 |
| /projects/blue-marble-circus/ | Blue Marble Circus | slideshow | 3 |
| /projects/cloud-culture-city/ | CCC Cloud Culture City | slideshow | 1 |
| /projects/composting-worlds/ | Composting Worlds | slideshow | 5 |
| /projects/cosmorama/ | Cosmorama | slideshow | 9 |
| /projects/elephant-in-the-room/ | Elephant in the Room | slideshow | 2 |
| /projects/georama-of-trash/ | Georama of Trash | slideshow | 1 |
| /projects/hassi-messaoud-oil-urbanism/ | Hassi Messaoud Oil Urbanism | slideshow | 1 |
| /projects/julia-the-submerged-volcano/ | Julia | slideshow | 1 |
| /projects/neck-of-the-moon-hyperreal/ | Neck of the Moon | slideshow | 10 |
| /projects/ocean-metabolism/ | Ocean Metabolism | slideshow | 1 |
| /projects/of-oil-and-ice/ | Of Oil and Ice | slideshow | 9 |
| /projects/pacific-aquarium/ | Pacific Aquarium | slideshow | 9 |
| /projects/santa-claus-planetary-garden/ | Santa Claus' Planetary Garden | slideshow | 3 |
| /projects/sea-our-land/ | Sea Our Land | slideshow | 8 |
| /projects/the-atmosphere-is-dead-long-live-the-atmosphere/ | The Atmosphere is Dead, Long Live the Atmosphere! | slideshow | 2 |
| /projects/the-planet-after-geoengineering/ | The Planet After Geoengineering | slideshow | 25 |
| /projects/towers-on-wire/ | Towers on Wire | slideshow | 2 |
| /projects/trash-peaks/ | Trash Peaks | slideshow | 6 |
| /publications/ | PUBLISH | visual_index | 32 tiles |
| /publications/8mile-baseline-a-dialectical-image-of-the-urban-c/ | 8Mile Baseline / JAE | visual_index | 1 |
| /publications/a-flooded-thirsty-world/ | A Flooded Thirsty World \| JAE | visual_index | 1 |
| /publications/a-geographic-stroll-around-the-horizon--monu/ | A Geographic Stroll Around the Horizon \| MONU | visual_index | 1 |
| /publications/a-microcosm-on-a-sheet-of-paper/ | A Microcosm on a Sheet of Paper \| New Geographies | visual_index | 1 |
| /publications/airpocalypse-a-short-geostory/ | Airpocalypse \| San Rocco | visual_index | 1 |
| /publications/apart-we-are-together--thresholds/ | Apart We Are Together / Thresholds | visual_index | 1 |
| /publications/carbon-re-form--log/ | Carbon Re-form \| Log | visual_index | 1 |
| /publications/climate-inheritance--perspecta/ | Climate Inheritance | slideshow | 1 |
| /publications/cosmorama--dimensions-of-citizenship/ | Geostories \| Domus | visual_index | 1 |
| /publications/cosmorama--new-geographies/ | Cosmorama \| New Geographies | visual_index | 1 |
| /publications/design-earth--impermanence/ | DESIGN EARTH / Impermanence | visual_index | 1 |
| /publications/elephant-in-the-room--jae/ | Elephant in the Room \| JAE | visual_index | 1 |
| /publications/gaia-global-circus-a-climate-tragicomedy/ | Gaia Global Circus / The Avery Review | visual_index | 1 |
| /publications/geographies-of-trash/ | Geographies of Trash / JAE | visual_index | 1 |
| /publications/geographies-of-trash/2/ | Geographies of Trash | slideshow | 22 |
| /publications/geography-and-oil-the-territory-of-externalities/ | Geography and Oil / Infrastructure Space | slideshow | 1 |
| /publications/georama-of-trash/ | Georama of Trash / ARQ | visual_index | 1 |
| /publications/geostories/ | Geostories | slideshow | 1 |
| /publications/hassi-messaoud-oil-urbanism/ | Hassi Messaoud Oil Urbanism \| New Geographies | visual_index | 1 |
| /publications/leviathan-in-the-aquarium/ | Leviathan in the Aquarium \| JAE | visual_index | 1 |
| /publications/neck-of-the-moon/ | Neck of the Moon / Volume | visual_index | 1 |
| /publications/new-geographies-02/ | New Geographies 2: Landscapes of Energy | visual_index | 1 |
| /publications/new-geographies-4/ | New Geographies 4: Scales of the Earth | visual_index | 1 |
| /publications/new-geographies/ | The Space of Controversies \| New Geographies | visual_index | 2 |
| /publications/of-oil-and-ice--ambiguous-territory/ | Of Oil and Ice \| Ambiguous Territory | visual_index | 1 |
| /publications/territories-of-oil-the-trans-arabian-pipeline/ | Territories of Oil / The Arab City | visual_index | 1 |
| /publications/the-anthropocene-chamber--designing-landscape-architectural-education/ | The Anthropocene Chamber \| Designing Landscape Architectural Education | visual_index | 1 |
| /publications/the-great-waste-state/ | The Great Waste State / Third Coast Atlas | visual_index | 1 |
| /publications/the-planet-after-geoengineering/ | The Planet After Geoengineering | slideshow | 4 |
| /publications/trash-peaks--eco-visionaries/ | Trash Peaks \| Architectural Design | visual_index | 1 |
| /publications/uncommon-planet--la/ | Uncommon Planet \| LA+ | visual_index | 1 |
| /publications/undermined-planet--architectural-review/ | Undermined Planet \| Architectural Review | visual_index | 1 |
| /publications/where-are-the-missing-spaces/ | Where Are the Missing Spaces \| Perspecta | visual_index | 1 |
| /xml/ | MAIN | slideshow | 1 |
