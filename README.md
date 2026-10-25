# Clevion — Visual Identity, Spatial Brand & Mainstage Scenography

> **High-end editorial minimalism meets spatial digital craftsmanship.**  
> Modeled directly after Brandon Yasin's award-winning portfolio (Awwwards Site of the Day & Developer Award). Complete visual brand environments, mainstage scenography, dynamic 8K LED media packages, and architectural wayfinding for world-class corporate summits, medical congresses, and executive forums.

---

## 🌐 Live Website

Experience the live interactive production website:  
👉 **[https://portfolio-gray-nu-pxelh2phlt.vercel.app](https://portfolio-gray-nu-pxelh2phlt.vercel.app)**

---

## ✨ Signature Innovations & Features

### 1. 24-Hour Dynamic Time Engine & Interactive Clock
* **Real-time Palette Interpolation**: Automatically calculates current hour and continuously interpolates 6 CSS custom properties (`--color-main`, `--color-bg`, `--img-over-opacity`, `--bg-brightness`, `--selection-color`, `--selection-bg`) across 14 day/night color stops:
  * *Dawn (05:00):* Warm sunrise amber tint (`#60594C` / `#F1C345`)
  * *Daylight (09:00–16:00):* High-contrast crisp bone linen white (`#F8F6F2` / `#111111`)
  * *Golden Hour (17:00–18:00):* Warm sepia sunset tone (`#CEC9BB` / `#A59D8A`)
  * *Dusk (19:00):* Luminous twilight gold (`#7C725E` / `#F1C345`)
  * *Night (20:00–04:00):* Deep charcoal luxury dark mode (`#2C2922` / `#C3BEB1`)
* **Time Travel Dial**: An interactive draggable dial in the header (`.easter .egg`) that lets visitors scrub through 24 hours of light in real-time, complete with a `Time Travel ✕` reset button.
* **Zero-FOUC**: Pre-inlined `<script>` in the document head applies the correct theme before stylesheet parsing.

### 2. Dual-Span Rolling Typography & Kerning
* **Type System**: Neue Haas Unica Pro & Helvetica Now Variable typography scale.
* **Negative Tracking**: `-0.04em` kerning with negative margin stacking on display headlines.
* **Micro-Typography**: Strict 12px uppercase monospace-inspired controls for metadata and tags.
* **Rolling Text Hover**: Dual-span mechanism across all links, buttons, and logo marks.

### 3. Spatial Page Architecture
* **View 1: Selected Cases (`#cases`)**: Bottom-aligned horizontal draggable gallery of flagship spatial and event cases with aspect-ratio `396/496` cards, cascaded z-indices, and image scale transforms.
* **View 2: Case Study Deep Dives (`#cases/:slug`)**:
  * Left sticky hero column (8 cols) + Right visual & lead paragraph (6 cols).
  * Pinned dual-row counter-scrolling horizontal asset track (`.rows`).
  * Asymmetric editorial gallery with variable grid spans.
  * Next Project teaser banner with magnetic thumbnail zoom.
* **View 3: Archive 2016–2026 (`#archive`)**: Panoramic horizontal strip with 16 curated project modules mixing photography, stage visuals, and identity systems.
* **View 4: Studio Profile & Process (`#about`)**:
  * Manifesto ("Form follows meaning") and 7 numbered disciplines with 3-portrait crossfade frame.
  * 3 interactive core value cards (**Precision**, **Cohesion**, **Impact**) with tactile paper backgrounds.
  * 6-step scroll-pinned design process stepper (**Audit**, **Explore**, **Shape**, **Craft**, **Refine**, **Execute**) with animated progress fill.
* **Spatial Menu Overlay**: Fullscreen viewport with live miniaturized preview tiles.
* **Tactile Paper Contact Sheet**: Realistic Japanese washi / cotton paper texture with Client Brief and Collaborator tabs, custom square checkboxes, and paper Thank You confirmation card.

---

## 🛠️ Tech Stack

* **Core**: Modern Vanilla JavaScript (ES6+) & Semantic HTML5
* **Styling**: Vanilla CSS3 with fluid `clamp()`, `vw`, and custom design tokens (Zero bulky UI frameworks)
* **Smooth Inertia Scrolling**: [Lenis](https://github.com/darkroomengineering/lenis)
* **Textures**: Ultra-high DPI scanned handmade paper textures
* **Client-Side Spatial Routing**: Single-Page Application (SPA) architecture with instant spatial state changes

---

## 📁 Directory Structure

```text
portfolio/
├── assets/
│   └── images/
│       ├── paper_texture_light.jpg    # Handmade cotton paper texture
│       ├── paper_texture_dark.jpg     # Dark slate washi paper texture
│       ├── about_portrait_1.jpg       # Studio creative director portrait
│       ├── clevion_summit_keynote.jpg # Medical congress 42m LED stage
│       ├── clevion_expo_pavilion.jpg  # Executive forum concourse
│       ├── clevion_gala_stage.jpg     # Awards night lighting scenography
│       ├── clevion-brand-concept.jpg  # Identity geometry & typography
│       ├── venue-before-setup.jpg     # Pre-setup venue audit
│       ├── hero-ribbon-bg.jpg         # Generative ribbon art
│       └── logos/                     # Partner vector logos
├── css/
│   ├── design-tokens.css              # Color stops, fluid typography, 14-col grid
│   └── brandon-style.css              # Components, paper sheet, clock & animations
├── js/
│   ├── time-engine.js                 # 24-hr interpolation & draggable clock dial
│   ├── router.js                      # Case study data store & spatial view transitions
│   ├── app.js                         # Lenis smooth scroll, tabs & custom cursor
│   └── lenis.min.js                   # Momentum scrolling physics engine
├── index.html                         # Master application markup
├── server.js                          # Static development server
└── README.md                          # Repository documentation
```

---

## 🚀 Running Locally

```bash
# 1. Start the server (Node.js or any static file server)
node server.js

# Or using Python:
python -m http.server 3000

# 2. Open your browser
http://localhost:3000/
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
