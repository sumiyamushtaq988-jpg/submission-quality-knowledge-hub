# Placeholder checklist — things only you can fill in

Everything below is written as `{{TOKEN}}`. The site looks and works fine with
these unfilled — they're for *your* links and details. Fill them when ready,
mostly via the `/admin` editor or the GitHub pencil (see README §5).

A developer can list every remaining one any time with: `grep -r "{{" .`

## What each token is, and the easiest way to fill it

| Token | What to put | Easiest way to fill |
|---|---|---|
| `{{SITE_BASE_URL}}` | Your live URL, e.g. `https://submission-quality-knowledge-hub.netlify.app` | After Netlify deploy; pencil-edit the files, or a dev does one find-replace. Affects SEO/share previews only. |
| `{{LINKEDIN_PROFILE_URL}}` | Your LinkedIn profile link | Pencil-edit (appears in footer of every page + About/Contact) |
| `{{CONTACT_EMAIL}}` | The email you want public | Pencil-edit (footer + Contact + About) |
| `{{ARTICLE_1_TITLE}}` / `{{ARTICLE_1_URL}}` | Real title + link of your 1st published article | `/admin` → **Articles** |
| `{{ARTICLE_2_TITLE}}` / `{{ARTICLE_2_URL}}` | Real title + link of your 2nd article | `/admin` → **Articles** |
| `{{ARTICLE_3_URL}}` | Link for the Module 3/CMC article (title is already written) | `/admin` → **Articles** |
| `{{YOUTUBE_VIDEO_ID}}` | The webinar's YouTube video id (once recorded) | Pencil-edit `webinar.html` (instructions are in a comment there) |
| `{{NEWSLETTER_FORM_ACTION_URL}}` | Your email-provider form URL (Substack/Mailchimp/etc.) | Pencil-edit `newsletter.html` (or paste a provider embed); see README §3 |
| `{{BIO_EXPANDED}}` | Optional extra paragraph about you on the About page | `/admin` is not wired to this one — pencil-edit `about.html` |

## Where each token currently appears (grouped by file)

- **404.html** — `{{CONTACT_EMAIL}}`, `{{LINKEDIN_PROFILE_URL}}`
- **about.html** — `{{BIO_EXPANDED}}`, `{{CONTACT_EMAIL}}`, `{{LINKEDIN_PROFILE_URL}}`, `{{SITE_BASE_URL}}`
- **articles.html** — `{{ARTICLE_1_TITLE}}`, `{{ARTICLE_1_URL}}`, `{{ARTICLE_2_TITLE}}`, `{{ARTICLE_2_URL}}`, `{{ARTICLE_3_URL}}`, `{{CONTACT_EMAIL}}`, `{{LINKEDIN_PROFILE_URL}}`, `{{SITE_BASE_URL}}`
- **contact.html** — `{{CONTACT_EMAIL}}`, `{{LINKEDIN_PROFILE_URL}}`, `{{NEWSLETTER_FORM_ACTION_URL}}`, `{{SITE_BASE_URL}}`
- **index.html** — `{{CONTACT_EMAIL}}`, `{{LINKEDIN_PROFILE_URL}}`, `{{SITE_BASE_URL}}`
- **newsletter.html** — `{{CONTACT_EMAIL}}`, `{{LINKEDIN_PROFILE_URL}}`, `{{NEWSLETTER_FORM_ACTION_URL}}`, `{{SITE_BASE_URL}}`
- **resources.html** — `{{CONTACT_EMAIL}}`, `{{LINKEDIN_PROFILE_URL}}`, `{{SITE_BASE_URL}}`
- **webinar.html** — `{{CONTACT_EMAIL}}`, `{{LINKEDIN_PROFILE_URL}}`, `{{SITE_BASE_URL}}`, `{{YOUTUBE_VIDEO_ID}}`
- **data/articles.json** — `{{ARTICLE_1_TITLE}}`, `{{ARTICLE_1_URL}}`, `{{ARTICLE_2_TITLE}}`, `{{ARTICLE_2_URL}}`, `{{ARTICLE_3_URL}}` *(edit these via `/admin` → Articles)*
- **admin/config.yml**, **sitemap.xml**, **robots.txt** — `{{SITE_BASE_URL}}`

## Separate manual to-dos (not text placeholders)
1. **Add the 4 guide PDFs** — drop into `guides/` (exact names in `guides/README.md`) or upload via `/admin` → **Guides**. *(These were not pulled from Drive; you'll add them.)*
2. **One-time editor setup** in Netlify — enable Identity + Git Gateway, invite yourself (README §2, Step C).
3. **Connect a newsletter provider** before promoting the signup (README §3).
