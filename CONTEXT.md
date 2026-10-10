# Nero Portfolio

Personal portfolio and technical writing site for Oghenero Adaware (finallynero).

## Language

**Blog**:
A published piece of technical writing on the site. Visitors see and navigate "blogs"; the content files live under articles.
_Avoid_: post (as the primary UI noun), article (as the visitor-facing label)

**Blog index**:
The page that lists every **Blog**, at `/blogs`.
_Avoid_: archive, all posts, blog archive

**Blog preview**:
The homepage section that shows a limited, newest-first subset of **Blogs**. A plain text **view more** link to the **Blog index** appears only when more **Blogs** exist than the preview shows. Tag browsing lives here (and on tag pages), not on the **Blog index**.
_Avoid_: blog teaser, recent posts widget

**Blog social image**:
The branded image shown when a **Blog** link is shared on social platforms or messaging apps. Each one identifies the site and the **Blog** by displaying the site name and complete Blog title without secondary metadata or logo artwork.
_Avoid_: article image, URL preview image, thumbnail

**Site social image**:
The shared brand image shown when a non-Blog page link is shared on social platforms or messaging apps. It identifies finallynero.dev, Oghenero Adaware, and his role as a Software Engineer without logo artwork.
_Avoid_: default icon, fallback thumbnail

**Tag**:
A topic label on a **Blog**, used to browse related writing via tag pages.
_Avoid_: category, topic (as the primary noun)

## Example dialogue

> **Dev:** Should the homepage link to "all articles"?
> **Expert:** No — call it blogs. The homepage **Blog preview** links to the **Blog index** at `/blogs`.
> **Dev:** And an individual markdown file in `src/articles/`?
> **Expert:** That's still a **Blog** to visitors. "Article" is just where the file lives.
> **Dev:** Do we put the tag cloud on `/blogs` too?
> **Expert:** No — tags stay with the **Blog preview** on the homepage. The **Blog index** is chronological only.
> **Dev:** After reading a **Blog** reached via `/blogs`, should back go to the **Blog index**?
> **Expert:** No — back still goes home. The **Blog index** is an optional path, not a new hub.
> **Dev:** Should `/blogs` look different from the homepage list?
> **Expert:** No — same `blogs` heading and rows. The index is the full list; the preview is the same list cut short.
> **Dev:** Does the **Blog index** need a back control?
> **Expert:** Yes — same arrow as a **Blog**, linking home.
