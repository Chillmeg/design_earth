# DESIGN EARTH website

Static Jekyll site for design-earth.org. It replaced the old Indexhibit (PHP/MySQL) site and keeps its look, URLs and behaviour.
Every project, exhibition, publication and animation is one Markdown file plus one image folder.

- **Repo:** https://github.com/Chillmeg/design_earth (branch `main`)
- **Preview:** https://chillmeg.github.io/design_earth/
- **Build:** GitHub Pages builds the site on every push to `main` (1–2 minutes). Check progress under the repo's **Actions** tab.
- **Plugins:** only the GitHub Pages whitelist. The site uses one plugin, `jekyll-redirect-from`. Don't add others: Pages would ignore them.

---

## 1. Folder map

| Path | What it is |
|---|---|
| `_projects/` | PROJECT pages, one `.md` each |
| `_exhibitions/` | EXHIBIT pages |
| `_publications/` | PUBLISH pages (journals, books) |
| `_animations/` | ANIMATE pages (YouTube videos) |
| `assets/images/<section>/<file-name>/` | Images for each page. The folder name is the `.md` file name without `.md` |
| `_data/order.yml` | Order of items in each section (menu and grid) |
| `_data/sections.yml` | The left menu: MAIN, PROJECT, PUBLISH, EXHIBIT, ANIMATE |
| `_data/essays.yml` | ESSAYS list on the PUBLISH page |
| `files/download/` | Essay PDFs linked from `essays.yml` |
| `index.md` | MAIN page (About text and headshot) |
| `projects.md`, `exhibitions.md`, `publications.md`, `animations.md` | Grid pages for each section (headings only) |
| `search.html`, `search.json` | Built-in search at `/search/` |
| `_layouts/` | Page templates: `default` (head, menu), `home`, `section` (grids), `slideshow`, `grow` (publication covers), `video` |
| `_includes/` | Template parts. `item-text.html` prints the text under every slideshow; `slideshow.html` sizes the images; `nav.html` is the menu |
| `assets/css/`, `assets/js/` | The original Indexhibit CSS, jQuery, slideshow and cover-zoom scripts |
| `_config.yml` | Site settings: `baseurl`, collections, default layouts, slideshow speed, excluded folders |
| `_notes/` | Working notes, not published. `changelog.md` = every change and its reason; `known-issues.md` = known differences from the old site; `missing-assets.md` = what is still missing |
| `_tools/` | Node scripts used for the migration (`migrate.js`, `compare.js`). Not needed for edits |
| `_archive-original/` | Untouched wget mirror of the old site. **Never edit or delete it.** It is the reference and the backup |

**Private, gitignored** (only on the maintainer's computer, never pushed): `update_rania/`, `update_el_hadi/` (materials from the office), `files/dropbox/` (Dropbox originals, sorted by page), `files/reference/`.

---

## 2. How a page is built

1. The file's folder picks its section and layout (`_config.yml` → `defaults`).
2. The **front matter** (between the `---` lines) holds the title, team, venue, images, etc.
3. The **text after the front matter** is the blurb.
4. `_includes/item-text.html` prints PROJECT, EXHIBIT and ANIMATE text in a fixed order. A field you leave out is skipped:
   - **PROJECT:** title · *commission* · Project Team · blurb · Project Details · credits · link to animation · link to exhibition(s)
   - **EXHIBIT:** title · *venue* · Project Team · Venue · On view · Curator(s) · blurb · Project Details · credits · link to project(s)
   - **ANIMATE:** title · *commission* · Project Team · blurb · credits
5. **URL** = `/<section>/<file-name>/`. A file name containing `--` needs an explicit `permalink:` line (copy one from an existing exhibition).

---

## 3. Front matter fields

### PROJECT (`_projects/`)

| Field | Use |
|---|---|
| `title` | Name in the menu and browser tab |
| `heading` | Name on the page, if different from `title` |
| `year` | Year |
| `commission` | Italic line: "Exhibition or competition, venue, YYYY" |
| `team` | Project Team, one person or group per line |
| `details` | Project Details, one per line |
| `credits` | Free text after the blurb (photo credits, advisors, links). Markdown allowed |
| `animation` | File name of an ANIMATE page → adds "Watch the animation." |
| `exhibitions` | List of EXHIBIT file names → adds "Click for more information about the … exhibition." |
| `thumbnail` | Grid tile, usually `thumb.jpg` |
| `images` | Slideshow list (see §4) |
| `hidden: true` | Page works but is not listed in the menu, grid or search |
| `in_grid: false` | Listed in the menu, no grid tile |
| `redirect_from` | Old URL(s) that should forward here |

### EXHIBIT (`_exhibitions/`)

Same as PROJECT, except:

| Field | Use |
|---|---|
| `title` | "Project | Venue", e.g. `Act as if Our House Is on Fire | FRAC Orléans`. The part after ` | ` becomes the link text on the project page (override with `link_name`) |
| `heading` | Project name shown on the page |
| `venue` | Italic line: "Exhibition title, venue, YYYY" |
| `venue_details` | Venue block, one line each |
| `on_view` | Dates, e.g. `October 11, 2019 – February 9, 2020` |
| `curators` | One per line. "Curator" or "Curators" is chosen automatically |
| `projects` | List of PROJECT file names → adds "Click for more information about the … project." |
| `permalink` | Required (file names have `--`) |
| `published: false` | Page is not built at all (used for MoMA until its caption arrives) |

### PUBLISH (`_publications/`)

| Field | Use |
|---|---|
| `title`, `year` | As above |
| `book: true` | Listed under BOOKS at the top of PUBLISH |
| `thumbnail`, `thumbnail_height` | Grid tile (230×300 portrait, file at 460 wide) |
| `layout: slideshow` | Use the slideshow instead of the default cover-zoom layout (books) |
| `slideshow_nav: false` | Hide the "1 of N Previous \| Next" line |
| `images` | Covers / spreads. Optional `thumb`, `thumb_width`, `thumb_height` per image for a separate small cover |

The text block is free Markdown: title line, `*journal*`, authors and year, then links.

### ANIMATE (`_animations/`)

| Field | Use |
|---|---|
| `title`, `year`, `commission`, `team`, `credits` | As PROJECT |
| `thumbnail` | Tile; if left out, the YouTube still is used |
| `videos` | List of `- youtube: <url>`, with an optional `label:` (e.g. English / French) |

---

## 4. Images

- **Folder:** `assets/images/<section>/<file-name>/`, files named `01.jpg`, `02.jpg`… The slideshow order is the order of the `images:` list, not the file names. So new images can get the next free numbers and still be listed first.
- **Each entry:**
  ```yaml
  images:
    - file: 03.jpg
      width: 567    # display size, not file size
      height: 567
  ```
- **Display sizes** (PROJECT and EXHIBIT; the rule is in `_includes/slideshow.html`). The `width`/`height` ratio decides:
  - Up to 1.25 : 1 → shown at **567×567**, cropped to fill.
  - Wider → **800×533**, cropped to fill.
  - 1.9 : 1 or wider (panorama) → shown whole at the top of the 800×533 frame.
  - **Narrower than 0.95 : 1 (vertical) → not shown at all.** Crop vertical photos to a square first.
- **Files:** export at **2×** the display size where the original allows (1134×1134 square, 1600×1066 landscape). JPEG, quality ~90. Write the display size (half the pixel size) in `width`/`height`. A smaller original stays at its own size.
- **Tile:** `thumb.jpg`, a 200×200 centre crop of the cover image (PUBLISH: 460×600).
- **Cover first.** The first image is the cover. No captions on PROJECT/EXHIBIT; reference images go last.
- **Before replacing an image,** compare it with the old one. The Dropbox often holds other versions of a drawing.

---

## 5. House style

- **Titles are never bold.**
- **The italic line** is "Exhibition or competition, venue, date" and ends with `, YYYY`. An award goes before the year ("Dry Futures Competition, Honorable Mention, 2015"). Venice is "La Biennale di Architettura di Venezia". The italic line has no links.
- **Project Team** always starts with `Rania Ghosn + El Hadi Jazairy` (only exception: Sea Our Land).
- **Curators appear only on EXHIBIT pages.**
- Straight quotes stay straight (kramdown setting); type curly quotes yourself if wanted.
- Sources of truth for names, dates and collaborators: Rania's dossier CSV and El Hadi's dossier (private folders). Check them before guessing.

---

## 6. Common tasks

### Add a project

1. Create `_projects/<file-name>.md` (lowercase, hyphens, e.g. `sowing-worlds.md`) from the template below.
2. Create `assets/images/projects/<file-name>/` with `01.jpg`… and `thumb.jpg`.
3. Add `<file-name>` to the `projects:` list in `_data/order.yml` at the right place.
4. If it has an exhibition page, link both ways: `exhibitions:` on the project, `projects:` on the exhibition.

Exhibitions, publications and animations work the same way, in their own folders.

### Reorder items

Move lines in `_data/order.yml`. Items not listed appear at the top of their section.

### Replace or add an image

Overwrite the file with the same name, or add a new file and add it to `images:`. Keep `width`/`height` right (§4). Change `thumb.jpg` if the cover changes.

### Edit the About text

Edit `index.md` (the text below the second `---`). The headshot is `assets/images/home/01.jpg`.

### Add an essay

Put the PDF in `files/download/`, then copy an entry in `_data/essays.yml`. Check the PDF first (stamps, whole issues, file size).

### Hide or remove a page

`hidden: true` hides it but keeps the URL. Prefer this to deleting. If you delete or rename a file, add `redirect_from: /old/url/` to the page that replaces it.

### Change the slideshow speed

`slideshow_interval` in `_config.yml` (seconds, `0` = off). A page can override it with its own `slideshow_interval:`.

---

## 7. Templates

**PROJECT** (`_projects/my-project.md`):

```markdown
---
title: "My Project"
year: 2026
thumbnail: thumb.jpg
# shown in italics under the title: commission or competition, date
commission: "Exhibition Name, Venue, City, 2026"
# Project Team, one line each
team: |
  Rania Ghosn + El Hadi Jazairy
  First Collaborator, Second Collaborator
# exhibition page(s) of the commission: adds "Click for more information about the ... exhibition."
exhibitions:
  - my-project--venue-name
images:
  - file: 01.jpg
    width: 800
    height: 533
  - file: 02.jpg
    width: 567
    height: 567
---
The project text goes here. Leave a blank line between paragraphs.
```

**EXHIBIT** (`_exhibitions/my-project--venue-name.md`):

```markdown
---
title: "My Project | Venue Name"
permalink: /exhibitions/my-project--venue-name/
year: 2026
thumbnail: thumb.jpg
heading: "My Project"
# shown in italics under the title: exhibition / venue, date
venue: "Exhibition Name, Venue Name, 2026"
# Project Team, one line each
team: |
  Rania Ghosn + El Hadi Jazairy
# Venue, one line each
venue_details: |
  Venue Name
  Street, City
# On view (dates)
on_view: "March 1 – June 30, 2026"
# Curator(s), one line each
curators: "Curator Name"
# file names of the project pages: adds "Click for more information about the ... project."
projects:
  - my-project
images:
  - file: 01.jpg
    width: 800
    height: 533
---
The exhibition text goes here.
```

**ANIMATE** (`_animations/my-fable.md`):

```markdown
---
title: "My Fable"
year: 2026
commission: "Elephant in the Room and Other Fables, 2026"
team: |
  Rania Ghosn + El Hadi Jazairy
credits: "(c) 2026"
videos:
  - youtube: https://youtu.be/VIDEO_ID
---
The animation text goes here.
```

For a publication, copy a similar existing file in `_publications/`.

---

## 8. Editing

### In the browser (GitHub web editor)

1. Open the repo on GitHub and go to the file (e.g. `_projects/whale-song.md`).
2. Click the pencil icon, edit, then **Commit changes** to `main`.
3. **New file:** folder → **Add file → Create new file**. Type the full name, e.g. `_projects/my-project.md`.
4. **Images:** go to the image folder → **Add file → Upload files**. For a new page, type the new folder name when creating the first file, or upload into it from the page folder.
5. For edits across many files, press `.` on the repo page to open the full web editor (github.dev), then commit from its Source Control panel.
6. Wait 1–2 minutes, then check the preview.

### On your computer

1. `git pull`, edit the files, then `git add`, `git commit` and `git push`.
2. **Optional local preview** (needs Ruby + Bundler): `bundle install` once, then `bundle exec jekyll serve` → http://localhost:4000/design_earth/. Without Ruby, push and check the preview site.

### Checks after any edit

- **Indentation:** YAML needs consistent spaces (no tabs). A broken front matter fails the build; the Actions tab shows the error and line.
- **Images:** every `file:` must exist in the folder. Names are case-sensitive (`01.JPG` ≠ `01.jpg`).
- **Links:** use site paths such as `/projects/whale-song/`, never `https://design-earth.org:443/...`.

---

## 9. Launch on design-earth.org

At launch, `design-earth.org` will point to GitHub Pages:

1. In `_config.yml`, set `baseurl: ""` and `url: https://design-earth.org`.
2. Add a `CNAME` file containing `design-earth.org`.
3. Change DNS: A records to `185.199.108.153`–`.111`, plus a `www` CNAME to `chillmeg.github.io`. **Don't touch MX or other email records.**
4. In repo Settings → Pages, enforce HTTPS. Then test every section.
5. Keep the old host running for a couple of weeks.

The repo should later move to a Design Earth GitHub organisation. The preview URL then changes.

---

## 10. Where to look next

- `_notes/changelog.md`: every decision and why (read it before changing a rule).
- `_notes/known-issues.md`: known differences from the old site.
- `_notes/missing-assets.md`: open items and missing files.
- The comments at the top of `_includes/item-text.html`, `_includes/slideshow.html`, `_layouts/section.html` and `_data/order.yml` explain each rule in place.
