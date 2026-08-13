# Hackbuzz — Hackathon Landing Page

Single-page, responsive site for the Hackbuzz hackathon, built for the Vividhata Club
Technical Team shortlisting task.

## What's included

- Sticky nav bar
- Hero section with a live countdown (edit the target date in `index.html`)
- Schedule / timeline (real chronological order, Day 1 → Day 2)
- Registration form with client-side email/phone validation
- Google Sheets storage via a Google Apps Script web app (`backend/apps-script.gs`),
  with server-side validation and duplicate-email prevention
- Fully responsive, no build step, no dependencies beyond Google Fonts

## Files

```
index.html              — the entire site (HTML/CSS/JS in one file)
backend/apps-script.gs   — paste into Google Apps Script to receive form submissions
```

## 1. Set up the Google Sheet backend (~10 min)

1. Create a new Google Sheet. In row 1, add headers:
   `Timestamp | Name | Email | Phone | Team Size | College`
2. Extensions → Apps Script → delete the placeholder code → paste in
   `backend/apps-script.gs`.
3. Deploy → New deployment → type **Web app** → Execute as **Me** →
   Who has access **Anyone**.
4. Copy the `/exec` URL you're given.
5. In `index.html`, find `SCRIPT_URL` near the bottom and paste your URL in.

If you edit the script later, you need to push a new deployment version for the
change to go live (Deploy → Manage deployments → Edit → New version).

## 2. Set your real event date

In `index.html`, find:

```html
<div class="countdown" id="countdown" data-target="2026-09-20T09:00:00">
```

Change `data-target` to your actual event start date/time (ISO format,
`YYYY-MM-DDTHH:MM:SS`).

## 3. Deploy the site (~5 min)

Easiest option — **Netlify drop**:
1. Go to https://app.netlify.com/drop
2. Drag the folder containing `index.html` onto the page.
3. You get a live URL instantly.

Or **GitHub Pages**:
1. Push this folder to a GitHub repo.
2. Repo Settings → Pages → Deploy from branch → `main` → `/ (root)`.
3. Your site is live at `https://<username>.github.io/<repo>/`.

## 4. Submit

- Live deployed link (Netlify or GitHub Pages URL)
- GitHub repository link

## Notes on design decisions (for the interview round)

- Dark, high-contrast palette (`#0B0E14` base, `#F2C230` accent) instead of a
  generic light theme — reads as "hackathon at night," not a template.
- The countdown uses monospace digits (`JetBrains Mono`) to feel like a live
  terminal readout rather than a decorative timer.
- The traveling-dot "pulse" divider between sections is the one recurring
  motif tying the whole page together, echoing "buzz" as an electric signal.
- Form validation is duplicated server-side in Apps Script — client-side
  checks are for UX, never trusted as the only line of defense.
- Countdown, form validation, and submit handling are all vanilla JS —
  no framework needed for a single static page, which also keeps deployment
  to "drag a folder onto Netlify."
