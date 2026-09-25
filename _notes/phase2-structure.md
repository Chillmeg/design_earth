# Phase 2: How the old site works, and the proposed Jekyll structure

## 1. How the Indexhibit site works (from the archive)

**Page shell** (the same on every page)
- `#index`: fixed left column, 400px wide, text right-aligned. It holds:
  - the big "DESIGN EARTH" `h1`
  - the section list MAIN / PROJECT / PUBLISH / (an empty unnamed section) / EXHIBIT / ANIMATION
  - a Google search box
  - on item pages only, `ul.subsection`: every item in the current section, with the current one bold
- `#exhibit`: content area, absolutely positioned at `left: 430px`.
- CSS: `reset.css`, `base.css`, `style.css` (the Design Earth theme) and `slideshow.css`. Helvetica Neue. Links are black and turn yellow (`#ff0`) on hover; links in body text are grey and underlined.
- JS: jQuery 1.7.2, plus one of two scripts:
  - `jquery.slideshow.js`: fetches each next slide from `ajax.php` and cross-fades it.
  - `jquery.ndxz_grow.js`: on click, fetches the large image from `ajax.php` and swaps it in place of the thumbnail.
- Google Analytics UA-55236022-1. This tag type was shut down in 2023, so it is dead.

**Four page types**

| Type | Used by | Layout |
|---|---|---|
| Home | MAIN | Text on top (`placement-top`), then one image |
| Section grid (`visual_index`) | `/projects/`, `/publications/`, `/exhibitions/` | Tiles of 225×260px holding a 200px thumbnail with a bold title underneath. Projects and exhibitions use square crops; publications use 200px-tall covers at their natural width |
| Slideshow | all projects and exhibitions, 5 publications | "1 of N · Previous \| Next" bar (only when there are 2+ images), then the image, then the text below. Clicking the image, pressing ←/→, or hovering its left/right 30% (arrow gifs) changes slide with a fade. Images are 567 or 800px wide, shown at their real size |
| Grow (`visual_index`) | 28 publications | 1–2 cover thumbnails (300px box, bottom-aligned); clicking one swaps in the full-size image, and clicking again restores the thumbnail. The text follows |

**Content per item:** a title (nav, `<title>`, and grid caption), a grid thumbnail, an ordered list of images, and one block of text: **bold title**, *italic venue or year line*, credits, paragraphs, links. **No image has its own caption** (0 of 237).

**Ordering:** in every section the nav list and the grid use the same manual order, newest first. Two items appear in the nav but have no grid tile: `projects/hassi-messaoud-oil-urbanism` and `publications/climate-inheritance--perspecta`. Both pages are empty on the live site.

**Links:** internal links appear in 4 forms: `https://design-earth.org:443/…`, `http://design-earth.org/…`, `http://www.design-earth.org/…` and `https://www.design-earth.org:443/…`. All of them become relative links.

## 2. Proposed Jekyll structure

```
_config.yml              site title, baseurl, collections, smart_quotes fix
_layouts/
  default.html           page shell: head + #index nav + #exhibit
  home.html              MAIN
  section.html           grid page (PROJECT / PUBLISH / EXHIBIT / ANIMATION)
  slideshow.html         project, exhibition, some publications
  grow.html              most publications
_includes/
  head.html              <title>X : DESIGN EARTH</title>, original meta tags, CSS, JS
  nav.html               sections + item list for the current section
  slideshow.html         image stack + counter
  grid-tile.html
_data/
  order.yml              one list per section (see "Ordering" below)
_projects/  _publications/  _exhibitions/  _animations/   one .md file per item
assets/
  css/                   the 4 original CSS files, unchanged + small overrides.css
  js/                    original jquery.js + rewritten slideshow.js / grow.js (no ajax.php)
  img/                   next.gif, previous.gif
  images/<slug>/         each item's images, grid thumbnail included
files/download/          the 12 PDFs, same paths as now (other sites link to them)
index.md                 MAIN: About text + home image (edit the About text here)
projects.md  publications.md  exhibitions.md  animations.md   section grid pages
_archive-original/       untouched backup (Jekyll ignores folders that start with _)
_notes/                  these working notes (not published)
```

**Collections:** `projects`, `publications`, `exhibitions`, `animations` (empty now, but fully wired: ANIMATION shows as a plain label, as today, until it has at least one item, and then automatically becomes a link to a working grid).

**URLs:** the permalink is `/:collection/:name/`, which matches the current URLs exactly. Special cases:
- `/project/the-belly-of-a-mountain/` and `/project/a-geographic-stroll-around-the-horizon/`: `permalink:` override, still listed under PROJECT.
- `/publications/geographies-of-trash/2/`: file `_publications/geographies-of-trash-book.md` with `permalink:` override.
- `/xml/` redirects to `/`.
- Full-size image URLs **will change**, from `/files/gimgs/210_DE_Cosmorama_1.jpg` to `/assets/images/cosmorama/01.jpg`. Only Google Images results and hotlinks are affected. PDFs keep their exact URLs.

**Every link will work both at `chillmeg.github.io/design_earth/` and later at `design-earth.org`.** Layouts use Jekyll's `relative_url`, and links inside text are relative (`../cosmorama/`). At launch, one line changes: `baseurl: /design_earth` becomes `baseurl: ""`.

## 3. Front matter

```yaml
---
title: Cosmorama                 # nav, grid caption, <title>
year: 2018                       # metadata only (not displayed); migrated values marked for review
thumbnail: thumb.jpg             # grid tile; if missing, the first image is used
in_grid: true                    # false = nav only (Hassi Messaoud, Perspecta)
layout: slideshow                # slideshow | grow   (defaults per collection)
images:                          # in display order; files are in assets/images/cosmorama/
  - file: 01.jpg
    width: 567                   # optional; filled in for migrated images to stop the page jumping
    height: 567
    caption: ""                  # optional; empty today, shown in the original .captioning style when filled
  - file: 02.jpg
redirect_from: []                # optional old URLs
---
**Cosmorama**<br>
*United States Pavilion at the Venice Biennale, Dimensions of Citizenship, 2018*

Project Team:<br>
El Hadi Jazairy + Rania Ghosn<br>
…
```

The body is Markdown. Line breaks inside a paragraph stay as `<br>`, which editors can see, unlike trailing spaces. Grow-type publications use `thumb:` per image for the small cover (the migrated `th-` files). For new ones, `thumb:` is optional and CSS scales the full image down instead.

## 4. Ordering (question 1)

**Recommended:** `_data/order.yml` holds one list of slugs per section, top to bottom. **Items not in the list are shown at the top automatically, newest first**, so adding a project means adding one file and nothing else. Reordering means moving lines in one list.

The alternative is an `order:` number in each file. Adding a project touches one file, but reordering means renumbering several files.

## 5. JS rewrite (same behaviour, no server)

- **Slideshow:** all slides are written into the page (only the first visible; the rest lazy-loaded). It keeps the 1000ms-style fade, the "1 of N" counter, Previous | Next, arrow keys, click-to-advance, and the 30%-wide hover zones with the arrow gifs. The container height comes from the stored width/height, or from the loaded image when those are missing.
- **Grow:** click a thumbnail to swap in the full image at its natural size and click again to restore it, one open at a time, as now.
- jQuery 1.7.2 is kept, so the rewrite can reuse the original code.

## 6. Placeholders (kept, rendered as they are today)

- `projects/hassi-messaoud-oil-urbanism`: empty page, nav only.
- `publications/climate-inheritance--perspecta`: empty page, nav only.
- `publications/geographies-of-trash/2/` (the book): text kept; its 22 image slots list the original filenames. The images are missing and should be dropped into `assets/images/geographies-of-trash-book/` later.

## 7. Known risks for Phase 3

- **Quotes:** by default Jekyll turns straight quotes into curly ones. Some archived text uses straight quotes, so set `smart_quotes: apos,apos,quot,quot` and check the Geographies of Trash text after the first deploy.
- **No local Ruby:** build errors show up only on GitHub. The pass/fail status can be read publicly, but the logs need you to be logged in, so I may occasionally ask you to paste an error.
- **CNAME:** once the repo has a CNAME file, `chillmeg.github.io/design_earth` redirects to design-earth.org, and the preview disappears until DNS switches. The CNAME is added only after you finish reviewing.
- **Not mobile-friendly:** the original is fixed-width (a 400px nav plus content), so a faithful copy isn't either.
