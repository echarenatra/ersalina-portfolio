# Ersalina — Personal Portfolio

Personal portfolio site. Built with vanilla HTML, CSS, and JavaScript.

**Live:** [ersalina-portfolio.vercel.app](https://ersalina-portfolio.vercel.app) *(TBD)*

---

## Stack

- HTML5 / CSS3 / Vanilla JS (ES6+)
- Google Fonts — Karla + Montserrat
- Web3Forms — contact form
- Vercel — hosting

No build step. No dependencies. No `node_modules`.

---

## Run Locally

Just open `index.html` in a browser. That's it.

```bash
# Or with a local server (recommended for font loading):
npx serve .
# then open http://localhost:3000
```

---

## Deploy to Vercel

1. Push repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Select `echarenatra/ersalina-portfolio`
4. No build settings needed — Vercel detects static site automatically
5. Deploy

Every push to `main` triggers an automatic redeploy.

---

## Setup — Web3Forms

1. Go to [web3forms.com](https://web3forms.com)
2. Sign up with your email
3. Copy your Access Key
4. In `index.html`, replace `YOUR_ACCESS_KEY`:

```html
<input type="hidden" name="access_key" value="YOUR_ACCESS_KEY" />
```

---

## Add a New Project

In `index.html`, find the `#projects` section and copy a project card block:

```html
<a href="YOUR_PROJECT_URL" target="_blank" rel="noopener" class="project-card">
  <div class="project-image">
    <img src="assets/images/project-4.webp" alt="Project name screenshot" />
  </div>
  <div class="project-body">
    <span class="project-index">iv.</span>
    <h3 class="project-title">Project Name</h3>
    <p class="project-desc">Short description.</p>
    <div class="project-tags">
      <span class="project-tag">React</span>
      <span class="project-tag">Claude API</span>
    </div>
    <span class="project-arrow">
      View project
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
        <path d="M1 10 10 1M10 1H3M10 1v7" stroke="currentColor" stroke-width="0.7"/>
      </svg>
    </span>
  </div>
</a>
```

**Image guidelines:**
- Format: `.webp` (convert PNGs/JPGs with [squoosh.app](https://squoosh.app))
- Max width: 800px
- Place in `assets/images/`

---

## File Structure

```
ersalina-portfolio/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── favicon/
│   ├── images/
│   └── icons/
└── README.md
```

---

## Lighthouse Targets

| Metric | Target |
|---|---|
| Performance | ≥ 95 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |
