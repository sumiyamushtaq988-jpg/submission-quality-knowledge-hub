# Submission-Quality Knowledge Hub — website

A small, fast, static website (plain HTML/CSS/JavaScript — no build step, no
frameworks) with a **browser-based content editor** so you can update it
without touching code.

**Author/owner:** Sumiya Mushtaq, PharmD, MBA

---

## 0. The 30-second mental model (read this first)

- The website is just a folder of files. Whatever is in the folder *is* the site.
- **GitHub** is a free website that stores that folder online (like Google Drive,
  but for website files). Your folder lives there in a "repository" (repo).
- **Netlify** is a free host. It watches your GitHub repo and, every time the
  files change, it re-publishes your live site automatically.
- **The editor at `/admin`** (Decap CMS) lets you edit text and upload PDFs from
  your browser. When you click "Publish," it saves your change back into the
  GitHub repo → Netlify sees the change → your live site updates. No code.

So the one-time job is: **put this folder on GitHub → connect Netlify to it →
turn on the editor.** After that, everything is point-and-click. Sections 2–4
walk you through it.

---

## 1. What's in this folder

| File / folder | What it is |
|---|---|
| `index.html` … `contact.html` | The seven pages of the site |
| `404.html` | Friendly "page not found" page |
| `css/style.css` | All the styling. Brand colors are at the very top. |
| `js/main.js` | Small scripts (mobile menu, forms, loading the lists below) |
| `data/guides.json` | The 4 guide cards (edited by the CMS "Guides" section) |
| `data/articles.json` | The article cards (edited by the CMS "Articles" section) |
| `data/site.json` | Editable headlines/intros (CMS "Page text" section) |
| `guides/` | Where the 4 PDF guides live (drop them in / upload via CMS) |
| `img/` | Logo, favicon, and `og-image.png` (social-share preview) |
| `admin/` | The browser editor (`/admin`) — `index.html` + `config.yml` |
| `sitemap.xml`, `robots.txt` | SEO files |
| `.nojekyll` | Harmless GitHub Pages helper (leave it) |

### Why the lists are JSON files (a design note)
The brief allowed two ways to make pages editable. I chose the **simpler,
sturdier one**: the **Guides** and **Articles** lists (and a few page
headlines/intros) live in small data files under `data/`. The editor edits
those files, and `js/main.js` draws the cards from them. This keeps the site a
pure no-build static site, makes it work even offline, and means the editor can
never break your page layout. The rest of each page's wording is plain text in
the `.html` files — editable any time with the GitHub pencil (see §6).

---

## 2. ONE-TIME SETUP — put the site online (do this once)

You only do this once. After it, you never touch GitHub/Netlify settings again —
you just use the `/admin` editor.

### Step A — Put the folder on GitHub
1. Go to **https://github.com/new** (log in if asked).
2. **Repository name:** `submission-quality-knowledge-hub`
3. Set it to **Public**. Leave everything else unchecked. Click **Create repository**.
4. On the next page, click the link **"uploading an existing file"**.
5. Open this `knowledge-hub-site` folder on your computer, select **all** the
   files and folders inside it, and **drag them into the browser** upload box.
   (Dragging the *contents* keeps the folder structure intact.)
6. Click **Commit changes**. Your files are now on GitHub.

### Step B — Connect Netlify to the repo (this publishes the site)
1. Go to **https://app.netlify.com** → **Add new site** → **Import an existing project**.
2. Choose **GitHub**, authorize if asked, and pick the
   `submission-quality-knowledge-hub` repo.
3. **Build settings:** leave the build command **empty** and set
   **Publish directory** to `/` (the root). There is no build step. Click **Deploy**.
4. After ~30 seconds you get a live URL like
   `https://submission-quality-knowledge-hub.netlify.app`. That's your site. 🎉

### Step C — Turn ON the editor (Netlify Identity + Git Gateway)
This is what makes `/admin` able to save. In your site's Netlify dashboard:

1. **Identity:** Go to the top menu **Integrations** (older accounts: **Site
   configuration → Identity**) and enable/activate **Netlify Identity**.
   *(If you don't see it, it may be listed as "Netlify Identity" under
   Integrations → "Enable Identity".)*
2. **Registration:** In **Identity → Registration preferences**, set it to
   **Invite only** (so strangers can't sign up to edit your site).
3. **Git Gateway:** In **Identity → Services**, click **Enable Git Gateway**.
   This is the bridge that lets the editor save to GitHub.
4. **Invite yourself:** In the **Identity** tab, click **Invite users** and enter
   your own email. You'll get an invite email — click the link, set a password.

### Step D — Log in to the editor
1. Go to `https://<your-site>.netlify.app/admin`
2. Click **Login with Netlify Identity**, sign in with the password from Step C.
3. You're in. You'll see **Page text**, **Articles**, and **Guides**.

> If `/admin` shows a login screen but you haven't done Step C yet, that's normal
> and expected — it just can't save until Identity + Git Gateway are on.

### Step E — Fill in the final web address (one small edit)
Now that you know your real URL, update one placeholder so social-share previews
and SEO are correct:
- In the GitHub repo, the value `{{SITE_BASE_URL}}` appears in a few files.
  Easiest fix: open the editor or GitHub and replace `{{SITE_BASE_URL}}` with your
  real URL (e.g. `https://submission-quality-knowledge-hub.netlify.app`).
  See §6 for the pencil-edit method. (It still works if you skip this — it only
  affects link previews, not the visible pages.)

---

## 3. How to use the editor (`/admin`) — the everyday stuff

Log in at `https://<your-site>.netlify.app/admin`, then:

### Edit a page's headline or intro
**Page text** → pick the page → change the wording → **Publish**. Live in ~1 min.

### Add a new article
**Articles** → **Articles list** → **Add Article** → fill in Title, Date, Summary,
and the Link URL (paste the full `https://…` link to your LinkedIn post) →
**Publish**. The new card appears on the Articles page automatically.

### Upload or replace a guide PDF
**Guides** → **Guides list** → open the guide → under **PDF file** click to upload
your PDF → **Publish**. The Download button on the site now serves your file.

### Swap the newsletter signup to a real provider
The signup button is intentionally **disabled** until you connect an email
provider, so it never looks broken. Two ways to connect it:
- **Easiest:** open `newsletter.html` (pencil-edit, §6), find the block marked
  `PROVIDER EMBED START` / `END`, and paste the embed code from Substack,
  Buttondown, Mailchimp, or ConvertKit between those markers.
- **Or:** replace `{{NEWSLETTER_FORM_ACTION_URL}}` with your provider's form URL.
  The button turns on automatically once it's a real URL.

### Replace the social-share image
Replace `img/og-image.png` with your own 1200×630 PNG (same filename).

---

## 4. The placeholders you still need to fill

Everything in `{{DOUBLE_BRACES}}` is something only you can provide. To see the
full list any time, a developer can run `grep -r "{{" .` in the folder — but you
don't need a terminal; they're all listed in **`PLACEHOLDERS.md`** (in this
folder), grouped by file with the easiest way to fill each. Most can be filled
right in the `/admin` editor or with the GitHub pencil (§5).

---

## 5. Editing wording that's NOT in the editor (the GitHub pencil) {#pencil}

Some text (e.g. the webinar learning objectives, footer wording) lives directly
in the `.html` files. To change it without any software:
1. Open your repo on GitHub, click the file (e.g. `webinar.html`).
2. Click the **pencil icon** (top-right of the file) → "Edit this file."
3. Make your change, scroll down, click **Commit changes.**
4. Netlify republishes in under a minute.

This is also the fallback for *anything* — you can edit every file this way.

---

## 6. Hosting notes & alternatives

- **You're using:** GitHub + Netlify (recommended — free, reliable, and required
  for the `/admin` editor to work).
- **Simplest possible (no editor):** You can instead drag this folder straight
  onto the Netlify dashboard for an instant site — but the `/admin` editor won't
  work that way (it needs the GitHub connection). Use this only for a quick preview.
- **GitHub Pages** also works (Settings → Pages → deploy from `main`, root), but
  the `/admin` editor's Identity feature is a Netlify feature, so Netlify is the
  better fit here.

### Optional: your own domain (later, not required)
A free `*.netlify.app` address is perfectly credible to launch with. Later, if
you want `sumiyamushtaq.com` (~$10–15/yr from a registrar like Namecheap or
Cloudflare), buy it, then in Netlify go **Domain management → Add a domain** and
follow the DNS instructions. Not needed to go live.

---

## 7. Maintenance reminders
- **The 4 guide PDFs are not in the repo yet** — drop them into `guides/` (exact
  filenames in `guides/README.md`) or upload via the editor's **Guides** section.
- Keep the footer **disclaimer** wording exactly as-is (it's there for legal and
  credibility reasons).
- Don't add FDA logos or any wording implying FDA affiliation/endorsement.

---

*Built as a pure static site: no `package.json`, no Node/npm dependencies, no
build step. The files are served exactly as they are.*
