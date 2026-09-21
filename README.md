# Clevion — Visual Identity & Branding for Corporate Events, Expos & Summits

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://portfolio-gray-nu-pxelh2phlt.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

> **Built for events that can't afford to look average.**  
> Complete spatial brand environments, mainstage scenography, dynamic LED media packages, and architectural wayfinding for world-class summits, medical congresses, and executive forums.

---

## 🌐 Live Website

Experience the live, interactive production website:  
👉 **[https://portfolio-gray-nu-pxelh2phlt.vercel.app](https://portfolio-gray-nu-pxelh2phlt.vercel.app)**

---

## ✨ Key Features & Interactive Showcase

- **Hero 3D Ribbon Mesh Motion**: Dynamic cursor-reactive fluid ribbons with real-time mouse tracking and headline text scramble effect.
- **Client Logo Marquee**: Infinite continuous scroll showcasing authentic event partnerships (Cardiology Congress, Raj Neocon, Chamber of Tax Consultants, Jet Set Go).
- **"WHY CLEVION" Sticky Split-Scroll**:
  1. **On-Site Precision**: Interactive Before / After transformation slider comparing raw unbranded venue halls with live keynote stage executions.
  2. **Range Across Industries**: Multi-discipline adaptation across surgical congresses, corporate finance assemblies, and medical summits.
  3. **One Team, End-to-End**: Unified delivery across Stage & Backdrops, Architectural Signage, Delegate Collaterals, and Digital Broadcast packages.
  4. **Reliable Under Pressure**: 4-phase agile delivery timeline (*Spatial Audit → 3D Identity Design → Precision Production → On-Site Execution*) backed by real organizer testimonials.
- **Lenis Smooth Scrolling**: Smooth, momentum-based scrolling physics calibrated for desktop and mobile touch devices.
- **Modal Consultation & Showreel**: In-depth consultation booking flow and video showreel player.

---

## 🛠️ Architecture & Tech Stack

- **Core**: Semantic HTML5 & Modern ES6+ JavaScript
- **Styling**: Vanilla CSS3 with custom design tokens, dark glassmorphism, and HSL gradients (Zero external CSS framework dependencies)
- **Smooth Scroll**: [Lenis](https://github.com/darkroomengineering/lenis) momentum scroll physics
- **Graphics**: HTML5 Canvas, WebGL, and Three.js
- **Hosting**: 100% Client-Side Static Website deployed seamlessly on Vercel with automated CI/CD and HTTPS

---

## 📁 Directory Structure

```text
clevion-events-branding/
├── assets/
│   └── images/
│       ├── logos/                     # White vector client logos
│       ├── clevion_summit_keynote.jpg # Keynote stage execution
│       ├── venue-before-setup.jpg     # Raw unbranded hall comparison
│       ├── clevion_expo_pavilion.jpg  # Exhibition pavilion render
│       └── clevion_gala_stage.jpg     # Awards gala scenography
├── css/
│   ├── design-tokens.css              # Color tokens, typography, radii & spacing
│   ├── main.css                       # Layout, header, typography & base resets
│   └── components.css                 # Feature cards, Before/After slider & modals
├── js/
│   ├── app.js                         # Application coordinator & modal management
│   ├── lenis.min.js                   # Smooth scroll engine
│   ├── hero-motion.js                 # 3D interactive hero background
│   ├── before-after-slider.js         # Touch & mouse interactive comparison slider
│   ├── feature-cards-scroll.js        # Sticky sidebar scroll spy
│   ├── marquee.js                     # Seamless loop logo track
│   └── scramble-text.js               # Dynamic character decoding animation
├── index.html                         # Main application markup
├── server.js                          # Local development HTTP server
└── README.md                          # Repository documentation
```

---

## 🚀 Running Locally

To run and preview the site on your local machine:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/clevionindia/portfolio.git
   cd portfolio
   ```

2. **Start the local development server**:
   ```bash
   node server.js
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
