# Known issues carried over from the old site (not fixed, by request)

To go over in detail later. Each one is also broken on the old design-earth.org.

| Page | Problem | Possible fix |
|---|---|---|
| `/exhibitions/geostories/` | Text links to `/projects/neck-of-the-moon/`, which doesn't exist (404) | Point it to `../../projects/neck-of-the-moon-hyperreal/` |
| `/publications/geographies-of-trash/2/` (file `_publications/geographies-of-trash-book.md`) | All 22 slideshow images are missing (404 on the old server too) | Put the images in `assets/images/publications/geographies-of-trash-book/` as `01.jpg`..`22.jpg` (original names are listed in the file) |
| `/projects/hassi-messaoud-oil-urbanism/` | Empty page (no image, no text), listed in the nav only | Add content or remove it |
| `/publications/climate-inheritance--perspecta/` | Empty page, listed in the nav only | Add content or remove it |
| various | `year:` values were guessed from the text and are marked "please check" | Review |

## Differences between the new site and the old one (on purpose)

- The Google search box is removed (you asked for this).
- The Google Analytics tag is removed (it used Universal Analytics, which stopped working in 2023).
- Image addresses changed from `/files/gimgs/...` to `/assets/images/<section>/<item>/...`. PDFs keep their old addresses.
- ANIMATION is now a working section with 7 YouTube videos.
- The "item list" in the left nav is shown or hidden per page, as on the old site (`nav_list: false`). The old site was inconsistent about this.
