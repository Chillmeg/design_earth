# Known issues carried over from the old site (not fixed, by request)

To go over in detail later. Each one is also broken on the old design-earth.org.

| Page | Problem | Possible fix |
|---|---|---|
| `/exhibitions/geostories/` | Text links to `/projects/neck-of-the-moon/`, which doesn't exist (404) | Point it to `../../projects/neck-of-the-moon-hyperreal/` |
| `/projects/hassi-messaoud-oil-urbanism/` | Empty page (no image, no text), listed in the nav only | Add content or remove it |
| `/publications/climate-inheritance--perspecta/` | Empty page, listed in the nav only | Add content or remove it |
| various | `year:` values were guessed from the text and are marked "please check" | Review |

## Differences between the new site and the old one (on purpose)

- The Google search box is replaced by a built-in search (same place and look; results at `/search/`, from `search.json`). The old Google box no longer worked.
- The Google Analytics tag is removed (it used Universal Analytics, which stopped working in 2023).
- Image addresses changed from `/files/gimgs/...` to `/assets/images/<section>/<item>/...`. PDFs keep their old addresses.
- ANIMATION is now a working section (renamed ANIMATE in the nav) with 7 YouTube videos. Each page carries the text from its YouTube description (copied as written), and the grid uses the YouTube thumbnails (saved in `assets/images/animations/<item>/thumbnail.jpg`) as 16:9 tiles.
- The "item list" in the left nav is now shown on every project, publication, exhibition and animation page (the old site showed it on some pages and not others). A page can still hide it with `nav_list: false`.

## Fixed since

- `/publications/geographies-of-trash/2/`: the 22 missing slideshow images (404 on the old server too) were replaced on 2026-10-05 by Rania's cover photo and two spread photos.
