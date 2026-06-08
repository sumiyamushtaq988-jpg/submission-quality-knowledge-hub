/* =====================================================================
   Submission-Quality Knowledge Hub — main.js  (plain vanilla JS)
   ---------------------------------------------------------------------
   Does four small jobs. Each is independent and commented so you can
   see what it's for. You normally won't need to edit this file.

     1. Mobile menu open/close button.
     2. Highlights the current page in the nav (safety net; the HTML
        also sets aria-current directly).
     3. Newsletter / contact form: stays DISABLED until a real form
        URL is filled in (so it never looks broken before launch).
     4. Renders the Articles and Guides lists from the editable data
        files in /data/ (this is what the no-code CMS edits). If those
        files can't be loaded (e.g. opening the page directly from your
        hard drive), the plain HTML already on the page is shown instead.
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- 1. Mobile nav toggle ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close the menu when a link is tapped (mobile)
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- 2. Active-link highlight (safety net) ---------- */
  // The HTML sets aria-current="page" already; this also marks the link
  // if the file name matches, in case a page was copied without updating it.
  try {
    var here = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("#site-nav a").forEach(function (a) {
      var target = a.getAttribute("href");
      if (target === here) a.setAttribute("aria-current", "page");
    });
  } catch (e) { /* non-critical */ }

  /* ---------- 3. Forms: disabled until a real action URL exists ---------- */
  // A form is "live" only when its action is a real URL (not still the
  // {{NEWSLETTER_FORM_ACTION_URL}} placeholder token).
  document.querySelectorAll("form[data-guarded]").forEach(function (form) {
    var action = form.getAttribute("action") || "";
    var btn = form.querySelector('button[type="submit"], input[type="submit"]');
    var note = form.querySelector(".form-note");
    var isPlaceholder = action.indexOf("{{") !== -1 || action.trim() === "" || action.trim() === "#";

    if (isPlaceholder) {
      if (btn) { btn.disabled = true; }
      // Block submission entirely so it never reloads / 404s.
      form.addEventListener("submit", function (e) { e.preventDefault(); });
    } else {
      if (btn) { btn.disabled = false; }
      if (note) { note.hidden = true; }
    }
  });

  /* ---------- 4. Render Articles & Guides from /data/*.json ---------- */
  // These helpers fetch a JSON file and, only on success, replace the
  // fallback markup inside the container. On failure (file:// or missing
  // file) the existing HTML simply stays put.

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Treat an unfilled "{{TOKEN}}" link as a placeholder (render but flag).
  function isToken(v) { return typeof v === "string" && v.indexOf("{{") !== -1; }

  function loadJSON(url) {
    return fetch(url, { cache: "no-store" }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    });
  }

  // ----- Articles -----
  var articlesEl = document.querySelector("[data-articles]");
  if (articlesEl) {
    loadJSON("data/articles.json").then(function (data) {
      var items = (data && data.articles) || [];
      if (!items.length) return; // keep fallback
      articlesEl.innerHTML = items.map(function (a) {
        var url = a.url || "#";
        var ph = isToken(url) ? ' data-placeholder="true"' : "";
        var label = a.linkLabel || "Read";
        var img = (a.image && !isToken(a.image))
          ? '<img src="' + esc(a.image) + '" alt="" loading="lazy" style="border-radius:8px;margin-bottom:.6rem" />'
          : "";
        return (
          '<article class="card">' +
            img +
            '<p class="card__meta">' + esc(a.date || "") + "</p>" +
            "<h3>" + esc(a.title) + "</h3>" +
            "<p>" + esc(a.summary || "") + "</p>" +
            '<a class="btn btn--ghost" href="' + esc(url) + '"' + ph +
              ' rel="noopener">' + esc(label) + " &rarr;</a>" +
          "</article>"
        );
      }).join("");
    }).catch(function () { /* keep static fallback */ });
  }

  // ----- Guides (used on resources page and home featured strip) -----
  document.querySelectorAll("[data-guides]").forEach(function (el) {
    var limit = parseInt(el.getAttribute("data-guides-limit") || "0", 10);
    loadJSON("data/guides.json").then(function (data) {
      var items = (data && data.guides) || [];
      if (!items.length) return;
      if (limit > 0) items = items.slice(0, limit);
      el.innerHTML = items.map(function (g) {
        return (
          '<article class="card">' +
            "<h3>" + esc(g.title) + "</h3>" +
            "<p>" + esc(g.description || "") + "</p>" +
            '<a class="btn btn--primary" href="' + esc(g.file) + '" download>' +
              "Download PDF &darr;</a>" +
          "</article>"
        );
      }).join("");
    }).catch(function () { /* keep static fallback */ });
  });

  // ----- Optional page-text overrides (data/site.json) -----
  // Lets the CMS edit a headline/intro without touching HTML. The HTML
  // already contains real default copy, so this only *overrides* when a
  // matching value is present. Elements opt in with data-cms="page.field".
  var cmsEls = document.querySelectorAll("[data-cms]");
  if (cmsEls.length) {
    loadJSON("data/site.json").then(function (data) {
      cmsEls.forEach(function (el) {
        var path = el.getAttribute("data-cms").split(".");
        var val = data;
        for (var i = 0; i < path.length && val != null; i++) val = val[path[i]];
        if (typeof val === "string" && val.trim() && val.indexOf("{{") === -1) {
          el.textContent = val;
        }
      });
    }).catch(function () { /* keep static defaults */ });
  }

  // ----- Featured framework card (data/framework.json) -----
  // Lets the CMS "Framework" section edit the featured card text and upload
  // the PDF. The static HTML in the card is the offline fallback.
  var fwEl = document.querySelector("[data-framework]");
  if (fwEl) {
    loadJSON("data/framework.json").then(function (d) {
      if (!d) return;
      var setText = function (key, val) {
        var el = fwEl.querySelector('[data-fw="' + key + '"]');
        if (el && typeof val === "string" && val.trim()) el.textContent = val;
      };
      setText("title", d.title);
      setText("subtitle", d.subtitle);
      setText("description", d.description);
      var link = fwEl.querySelector("a.btn");
      if (link && d.file && !isToken(d.file)) link.setAttribute("href", d.file);
    }).catch(function () { /* keep static fallback */ });
  }
})();
