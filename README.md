# Minimal Mistakes + Polyglot Multilingual Starter


✨ With this template you can create a **multilingual, production-ready Jekyll site** powered by Minimal Mistakes ([Minimal Mistakes remote theme](https://github.com/mmistakes/minimal-mistakes)) and Polyglot ([jekyll-polyglot](https://github.com/untra/polyglot)), deployed seamlessly via GitHub Actions.

Click [**Use this template**](https://github.com/matmu/mm-github-pages-multilingual-starter/generate) button above for the quickest method of getting started.

[![Build & Deploy Jekyll](https://github.com/matmu/mm-github-pages-multilingual-starter/actions/workflows/pages.yml/badge.svg)](https://github.com/matmu/mm-github-pages-multilingual-starter/actions/workflows/pages.yml)

- Forked from the original [Minimal Mistakes remote theme starter](https://github.com/mmistakes/mm-github-pages-starter)  
- Original documentation: [README_orig.md](README_orig.md)   

---

## 🚀 Getting Started
Since this starter repo relies on `jekyll-polyglot`, it **cannot** be built by GitHub Pages directly. Instead, we use **GitHub Actions** to build and publish the site.

### 1. Adjust `_config.yml`
Set your repository, URL, and baseurl:

```yaml
repository: matmu/mm-github-pages-multilingual-starter
url: "https://matmu.github.io"
baseurl: "/mm-github-pages-multilingual-starter"
```

### 2. Configure GitHub Pages
1.  Go to your repo → **Settings** → **Pages**
2.  Under *Build and deployment*, select **GitHub Actions** as the source.
3.  Once a deployment finishes, your site URL will be displayed.

### 3. Trigger a Build
Push to `master` (or trigger manually under **Actions**) and GitHub will build and deploy your site using the included workflow in `.github/workflows/pages.yml`.

---

## 🌐 Language Settings
Polyglot is configured in `_config.yml`:

```yaml
# Polyglot
languages: ["en", "de"]
default_lang: "en"
exclude_from_localization: ["assets"]
parallel_localization: true

author:
  bio:
    en: "My awesome biography constrained to a sentence or two goes here."
    de: "Ich bin klasse."
```

Supporting files:
-   `/_data/lang.yml` → Language meta information
-   `/_data/navigation.yml` → Language-aware navigation items

---

## 🛠 Local Development
To build and preview locally:

```bash
bundle install
bundle exec jekyll serve
```

Visit [http://localhost:4000](http://localhost:4000) in your browser.

If you don’t have Ruby/Jekyll installed, check the Jekyll installation guide.

---

## 📂 Project Structure
Key files and directories:

```bash
.
├── _config.yml          # site configuration (includes Polyglot settings)
├── _data/
│   ├── lang.yml         # language metadata
│   └── navigation.yml   # language-aware navigation
├── _posts/              # your content
├── Gemfile              # Ruby gem dependencies
├── .github/workflows/   # GitHub Actions workflows
└── README.md
```

---

## ⚡ GitHub Actions Workflow
The included `pages.yml` workflow:

-   Builds the Jekyll site with `jekyll-polyglot`
-   Uploads `_site/` as an artifact
-   Deploys to GitHub Pages automatically

---

## 📖 References
-   Minimal Mistakes Documentation
-   [jekyll-polyglot](https://github.com/untra/polyglot)
-   GitHub Pages with Actions
