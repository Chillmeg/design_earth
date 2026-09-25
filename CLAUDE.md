I'm migrating https://design-earth.org from Indexhibit (an old PHP/MySQL CMS) to a static Jekyll site hosted on GitHub Pages. The goal: the site looks and behaves identically to today, but adding or editing a project is easy (markdown + an image folder).

Work in phases and stop for my confirmation at each checkpoint.

PHASE 1 — Archive the live site
- Mirror it with wget: --mirror --convert-links --adjust-extension --page-requisites --no-parent -e robots=off. Include all images under /files/gimgs/ and any other /files/ paths.
- Put the untouched mirror in /_archive-original/ and never modify it. It's our reference and backup.
- Crawl every nav section (MAIN, PROJECT, PUBLISH, EXHIBIT, ANIMATION) and every project page. Report what you found: page count, image count, any broken or missing assets, and any external embeds (Vimeo, YouTube, etc.).
- CHECKPOINT: show me the inventory before continuing.

PHASE 2 — Analyze the structure
- Figure out the Indexhibit layout: shared nav, CSS, JS (jQuery, slideshow or gallery behavior), and how project pages are structured (title, text, image sequence, captions).
- Note that internal links are hardcoded as https://design-earth.org:443/... and must all become relative.
- CHECKPOINT: propose the Jekyll structure (layouts, includes, collections for projects/publications/exhibitions, and the front-matter fields per item) before building anything.

PHASE 3 — Build the Jekyll site
- Recreate the design faithfully: same typography, spacing, nav, image behavior. Reuse the original CSS where possible instead of restyling.
- One markdown file per project/publication/exhibition with front matter (title, year, images list, captions, order). Images go in /assets/images/<slug>/.
- Only use GitHub Pages–compatible Jekyll (no custom plugins outside the supported whitelist).
- Preserve the old URLs, or add redirects (jekyll-redirect-from is supported), so existing links and Google results don't break.
- Keep meta tags and page titles.
- Run it locally (bundle exec jekyll serve) and compare page by page against the archive. List any differences you couldn't match exactly.
- CHECKPOINT: tell me to review it at localhost.

PHASE 4 — Documentation
- Write a short README.md for non-developers: how to add a project, reorder projects, replace an image, and edit the About text, with a copy-paste template. It should cover editing both locally and through GitHub's web editor.

PHASE 5 — Deploy
- Initialize git, create a .gitignore, and commit. Create a GitHub repo with the gh CLI (ask me for the repo name and account/org first) and push.
- Enable GitHub Pages and confirm the site works at the github.io URL.
- Add a CNAME file for design-earth.org, but DON'T tell me to switch DNS yet.
- CHECKPOINT: give me exact DNS instructions (A records for 185.199.108.153–.111, www CNAME), with a clear warning not to touch MX/email records, and a post-switch checklist (enforce HTTPS, test every page, keep the old host running for a couple of weeks).

General rules: never delete the archive, commit after each phase, and if anything is ambiguous (e.g. a page that doesn't fit the pattern), ask rather than guess.