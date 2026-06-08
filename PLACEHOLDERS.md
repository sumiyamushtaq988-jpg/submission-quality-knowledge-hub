# Placeholder checklist — things only you can fill in

Everything below is written as `{{TOKEN}}`. The site looks and works fine with
these unfilled — they're for *your* links and details. Fill them when ready,
mostly via the `/admin` editor or the GitHub pencil (see README §5).

A developer can list every remaining one any time with: `grep -r "{{" .`

## What each token is, and the easiest way to fill it

| Token | What to put | Easiest way to fill |
|---|---|---|
| `{{SITE_BASE_URL}}` | ✅ **Already filled in** to `https://submission-quality-knowledge-hub.netlify.app` | Done during deploy — nothing to do. (If you later add a custom domain, update it.) |
| `{{LINKEDIN_PROFILE_URL}}` | ✅ **Filled in** → `https://www.linkedin.com/in/sumiya-mushtaq` | Done |
| `{{CONTACT_EMAIL}}` | ✅ **Filled in** → `drsumiyamushtaq28@gmail.com` | Done |
| `{{ARTICLE_1_TITLE}}` / `{{ARTICLE_1_URL}}` | Real title + link of your 1st published article | `/admin` → **Articles** |
| `{{ARTICLE_2_TITLE}}` / `{{ARTICLE_2_URL}}` | Real title + link of your 2nd article | `/admin` → **Articles** |
| `{{ARTICLE_3_URL}}` | Link for the Module 3/CMC article (title is already written) | `/admin` → **Articles** |
| `{{YOUTUBE_VIDEO_ID}}` | The webinar's YouTube video id (once recorded) | Pencil-edit `webinar.html` (instructions are in a comment there) |
| `{{NEWSLETTER_FORM_ACTION_URL}}` | Your email-provider form URL (Substack/Mailchimp/etc.) | Pencil-edit `newsletter.html` (or paste a provider embed); see README §3 |
| `{{BIO_EXPANDED}}` | Optional extra paragraph about you on the About page | `/admin` is not wired to this one — pencil-edit `about.html` |

## Where each token currently appears (grouped by file)

- **about.html** — `{{BIO_EXPANDED}}`
- **articles.html** — `{{ARTICLE_1_TITLE}}`, `{{ARTICLE_1_URL}}`, `{{ARTICLE_2_TITLE}}`, `{{ARTICLE_2_URL}}`, `{{ARTICLE_3_URL}}`
- **data/articles.json** — same five article tokens *(edit these via `/admin` → Articles instead of by hand)*
- **contact.html** — `{{NEWSLETTER_FORM_ACTION_URL}}`
- **newsletter.html** — `{{NEWSLETTER_FORM_ACTION_URL}}`
- **webinar.html** — `{{YOUTUBE_VIDEO_ID}}`

*(Already filled in for you: `{{SITE_BASE_URL}}`, `{{LINKEDIN_PROFILE_URL}}`, and `{{CONTACT_EMAIL}}`.)*

## Separate manual to-dos (not text placeholders)
1. **Add the 4 guide PDFs** — drop into `guides/` (exact names in `guides/README.md`) or upload via `/admin` → **Guides**. *(These were not pulled from Drive; you'll add them.)*
2. **One-time editor setup** in Netlify — enable Identity + Git Gateway, invite yourself (README §2, Step C).
3. **Connect a newsletter provider** before promoting the signup (README §3).
