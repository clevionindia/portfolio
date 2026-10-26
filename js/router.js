/**
 * CLEVION CLIENT-SIDE SPATIAL ROUTER & PROJECT DATA STORE
 * Modeled after Nuxt 3 view-switching architecture
 */

(function () {
  'use strict';

  // Comprehensive Case Study Repository
  const PROJECTS_DATA = {
    'cardiology-congress': {
      title: 'global cardiology congress',
      client: 'Cardiology Society',
      year: '2024',
      category: 'Mainstage Scenography',
      tags: ['Spatial Design', 'LED Volume', 'Wayfinding'],
      heroImage: 'assets/images/clevion_summit_keynote.jpg',
      leadDesc: 'Spatial brand environment and immersive mainstage scenography for over 3,500 surgeons and cardiologists. Engineered a 42-meter curved 8K LED horizon with real-time surgical transmission synchronization and seamless architectural wayfinding.',
      railImages: [
        'assets/images/clevion_summit_keynote.jpg',
        'assets/images/venue-before-setup.jpg',
        'assets/images/clevion-brand-concept.jpg',
        'assets/images/clevion_expo_pavilion.jpg',
        'assets/images/hero-ribbon-bg.jpg',
        'assets/images/clevion_gala_stage.jpg'
      ],
      galleryItems: [
        { span: 'span-full', img: 'assets/images/clevion_summit_keynote.jpg', caption: '01. Keynote Auditorium & 42m Curved LED Scenography' },
        { span: 'span-10', img: 'assets/images/venue-before-setup.jpg', caption: '02. Pre-Transformation Venue Hall Audit' },
        { span: 'span-4-offset', img: 'assets/images/clevion-brand-concept.jpg', caption: '03. Identity System & Typographic Geometry' },
        { span: 'span-full', img: 'assets/images/clevion_expo_pavilion.jpg', caption: '04. Exhibition Pavilion & Wayfinding Concourse' }
      ],
      nextId: 'tax-consultants',
      nextTitle: 'chamber of tax consultants',
      nextImage: 'assets/images/clevion_expo_pavilion.jpg'
    },
    'tax-consultants': {
      title: 'the chamber of tax consultants',
      client: 'The Chamber of Tax Consultants',
      year: '2026',
      category: 'Centenary Summit & Scenography',
      tags: ['Spatial Scenography', 'Curved LED Horizon', 'Print Suite', 'Centenary Identity'],
      heroImage: 'assets/images/cases/The%20Chamber%20of%20Tax%20Consultant/golden-jubilee.jpg',
      leadDesc: 'A landmark visual identity and spatial experience celebrating 100 years of India’s premier tax fraternity (1926–2026). Translating a century of authority and wisdom into cohesive stage scenography, curved panoramic LED environments, architectural wayfinding, and tactile VIP print suites across the Shatabdi Manthan Centenary Conclave in Mumbai, the 19th International Taxation Conference in Udaipur, and the 50th Golden Jubilee Residential Course.',
      railImages: [
        'assets/images/cases/The%20Chamber%20of%20Tax%20Consultant/ballroom-wide.jpg',
        'assets/images/cases/The%20Chamber%20of%20Tax%20Consultant/stage-scenography.jpg',
        'assets/images/cases/The%20Chamber%20of%20Tax%20Consultant/keynote-plenary.jpg',
        'assets/images/cases/The%20Chamber%20of%20Tax%20Consultant/centenary-visual.jpg',
        'assets/images/cases/The%20Chamber%20of%20Tax%20Consultant/print-collaterals.jpg',
        'assets/images/cases/The%20Chamber%20of%20Tax%20Consultant/concourse-standee.jpg'
      ],
      galleryItems: [
        { span: 'span-full', img: 'assets/images/cases/The%20Chamber%20of%20Tax%20Consultant/ballroom-wide.jpg', caption: '01. Grand Ballroom Concourse & Panoramic LED Horizon' },
        { span: 'span-10', img: 'assets/images/cases/The%20Chamber%20of%20Tax%20Consultant/stage-scenography.jpg', caption: '02. 3D Curved LED Scenography & Executive Plenary Setup' },
        { span: 'span-8-right', img: 'assets/images/cases/The%20Chamber%20of%20Tax%20Consultant/keynote-plenary.jpg', caption: '03. Live Keynote Stage & Shatabdi Manthan Dignitary Plenary' },
        { span: 'span-full', img: 'assets/images/cases/The%20Chamber%20of%20Tax%20Consultant/centenary-visual.jpg', caption: '04. Shatabdi Manthan Centenary Visual Identity System' },
        { span: 'span-10', img: 'assets/images/cases/The%20Chamber%20of%20Tax%20Consultant/print-collaterals.jpg', caption: '05. Gold-Embossed Golden Jubilee Print Suite & Invitations' },
        { span: 'span-8-right', img: 'assets/images/cases/The%20Chamber%20of%20Tax%20Consultant/concourse-standee.jpg', caption: '06. Architectural Concourse Standee & QR Membership Portals' }
      ],
      nextId: 'cardiolive',
      nextTitle: 'cardio live 26',
      nextImage: 'assets/images/cases/Cardiolive/photobooth.png'
    },
    'cardiolive': {
      title: 'cardio live 26',
      client: 'Cardio Live Board',
      year: '2026',
      category: 'Cardiology Summit & Scenography',
      tags: ['Spatial Scenography', 'Heritage Photobooth', 'Delegate Suite', 'Wayfinding'],
      heroImage: 'assets/images/cases/Cardiolive/photobooth.png',
      leadDesc: 'A distinguished visual identity and spatial scenography for the 1st Course of Cardio Live 26 at Hotel Radisson Blu, Udaipur. Blending cardiac science with royal Rajasthani architectural heritage, the system encompasses panoramic stage LED environments, palatial arch photobooths, bespoke delegate credentials, executive stationery, and architectural wayfinding.',
      railImages: [
        'assets/images/cases/Cardiolive/wideimg.png',
        'assets/images/cases/Cardiolive/photobooth.png',
        'assets/images/cases/Cardiolive/standee.png',
        'assets/images/cases/Cardiolive/badge.png',
        'assets/images/cases/Cardiolive/notepad.png'
      ],
      galleryItems: [
        { span: 'span-full', img: 'assets/images/cases/Cardiolive/wideimg.png', caption: '01. Keynote Panoramic Stage & LED Horizon' },
        { span: 'span-10', img: 'assets/images/cases/Cardiolive/photobooth.png', caption: '02. Rajasthani Arch Photobooth & 3D Cardiac Sculpture' },
        { span: 'span-8-right', img: 'assets/images/cases/Cardiolive/standee.png', caption: '03. Architectural Directional Wayfinding Standee' },
        { span: 'span-10', img: 'assets/images/cases/Cardiolive/badge.png', caption: '04. Delegate Badge & Woven Lanyard Suite' },
        { span: 'span-8-right', img: 'assets/images/cases/Cardiolive/notepad.png', caption: '05. Executive Table Stationery & Coaster Set' }
      ],
      nextId: 'lake-live-fest',
      nextTitle: 'lake live fest',
      nextImage: 'assets/images/cases/LakeLiveFest/live-stage-wide.jpg'
    },
    'lake-live-fest': {
      title: 'lake live fest',
      client: 'Lake Live Festival Board',
      year: '',
      category: 'Festival Identity & Scenography',
      tags: ['Festival Identity', 'Mainstage Scenography', 'Signal Geometry', 'App & Merch'],
      heroImage: 'assets/images/cases/LakeLiveFest/live-stage-wide.jpg',
      leadDesc: 'An electrifying festival identity and spatial experience for Lake Live Fest—a three-day celebration of live music, art, and culinary culture across four waterfront stages in Udaipur. Powered by high-contrast typography, acoustic signal geometry, and a high-impact color system of signal red, cobalt, and acid yellow, the identity extends across panoramic mainstage LED scenography, A2 line-up print series, dynamic mobile festival apps, RFID credential suites, and outdoor highway takeovers.',
      railImages: [
        'assets/images/cases/LakeLiveFest/live-stage-wide.jpg',
        'assets/images/cases/LakeLiveFest/page_01.png',
        'assets/images/cases/LakeLiveFest/page_03.png',
        'assets/images/cases/LakeLiveFest/page_04.png',
        'assets/images/cases/LakeLiveFest/page_05.png',
        'assets/images/cases/LakeLiveFest/page_06.png',
        'assets/images/cases/LakeLiveFest/page_02.png'
      ],
      galleryItems: [
        { span: 'span-full', img: 'assets/images/cases/LakeLiveFest/live-stage-wide.jpg', caption: '01. Waterfront Sunset Mainstage & Panoramic LED Scenography' },
        { span: 'span-10', img: 'assets/images/cases/LakeLiveFest/page_01.png', caption: '02. Primary Festival Brand Mark & Key Visual Geometry' },
        { span: 'span-8-right', img: 'assets/images/cases/LakeLiveFest/page_03.png', caption: '03. A2 Print Poster Series & Line-up Announcement Suite' },
        { span: 'span-full', img: 'assets/images/cases/LakeLiveFest/page_04.png', caption: '04. Festival Mobile App, Schedule & Digital Ticket Wallet' },
        { span: 'span-10', img: 'assets/images/cases/LakeLiveFest/page_05.png', caption: '05. 3-Day Tickets, RFID Wristbands, Apparel & Canvas Tote Merch' },
        { span: 'span-8-right', img: 'assets/images/cases/LakeLiveFest/page_06.png', caption: '06. Highway Outdoor Billboard & Social Campaign Takeovers' }
      ],
      nextId: 'cardiology-congress',
      nextTitle: '21st isc conference',
      nextImage: 'assets/images/cases/isc-cardiology-conference.jpg'
    }
  };

  function renderCaseStudy(projectId) {
    const data = PROJECTS_DATA[projectId] || PROJECTS_DATA['cardiology-congress'];
    const projectView = document.getElementById('view-project');
    if (!projectView) return;

    // Left Column Meta
    projectView.querySelector('.hero-project-title').textContent = data.title;
    projectView.querySelector('.hero-project-client').textContent = data.client;
    projectView.querySelector('.hero-project-year').textContent = data.year;
    projectView.querySelector('.hero-project-cat').textContent = data.category;
    projectView.querySelector('.hero-project-tags').textContent = data.tags.join(' / ');

    // Right Column Media & Lead
    const heroImg = projectView.querySelector('.hero-project-img');
    heroImg.src = data.heroImage;
    heroImg.alt = data.title;
    projectView.querySelector('.hero-project-desc').textContent = data.leadDesc;

    // Horizontal Scrolling Rails
    const rail1 = projectView.querySelector('.rows-track-1');
    const rail2 = projectView.querySelector('.rows-track-2');
    if (rail1 && rail2) {
      rail1.innerHTML = data.railImages.map((src, i) => `
        <div class="rows__img"><img src="${src}" alt="Moodboard ${i+1}"></div>
      `).join('');
      rail2.innerHTML = [...data.railImages].reverse().map((src, i) => `
        <div class="rows__img"><img src="${src}" alt="Process ${i+1}"></div>
      `).join('');
    }

    // Editorial Gallery Items
    const galleryEl = projectView.querySelector('.case-gallery');
    if (galleryEl) {
      galleryEl.innerHTML = data.galleryItems.map(item => `
        <div class="gallery-item ${item.span}">
          <div class="img-wrap" style="width:100%;height:100%;overflow:hidden;background:#222;">
            <img src="${item.img}" alt="${item.caption}" style="width:100%;height:100%;object-fit:cover;">
          </div>
          <div class="font-body-12 uppercase" style="margin-top:1.2rem;opacity:0.8;">${item.caption}</div>
        </div>
      `).join('');
    }

    // Next Project Link
    const nextLink = projectView.querySelector('.next__link');
    if (nextLink) {
      nextLink.setAttribute('href', `#/cases/${data.nextId}`);
      projectView.querySelector('.next-project-title').textContent = data.nextTitle;
      const nextImg = projectView.querySelector('.next-project-img');
      nextImg.src = data.nextImage;
      nextImg.alt = data.nextTitle;
    }
  }

  function handleRoute() {
    const hash = window.location.hash || '#cases';
    const views = document.querySelectorAll('.page-view');
    views.forEach(v => v.classList.remove('is-active'));

    // Close overlays
    const spatialOverlay = document.getElementById('spatial-menu-overlay');
    if (spatialOverlay) {
      spatialOverlay.classList.remove('is-active');
      spatialOverlay.setAttribute('aria-hidden', 'true');
    }
    const legacyOverlay = document.querySelector('.menu-overlay');
    if (legacyOverlay) legacyOverlay.classList.remove('is-active');
    document.body.classList.remove('is-menu-open');
    const menuBtn = document.querySelector('.menu-toggle');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    const menuLabelText = document.querySelector('.menu-label-text');
    const menuLabelHover = document.querySelector('.menu-label-hover');
    if (menuLabelText && menuLabelHover) {
      menuLabelText.textContent = 'Menu';
      menuLabelHover.textContent = 'Menu';
    }

    window.scrollTo({ top: 0, behavior: 'instant' });

    if (hash.startsWith('#/cases/') || hash.startsWith('#cases/')) {
      const projectId = hash.replace(/^#\/?cases\//, '');
      renderCaseStudy(projectId);
      const projectView = document.getElementById('view-project');
      if (projectView) projectView.classList.add('is-active');
    } else if (hash === '#archive' || hash === '#/archive') {
      const archiveView = document.getElementById('view-archive');
      if (archiveView) {
        archiveView.classList.add('is-active');
        requestAnimationFrame(() => {
          archiveView.classList.add('is-entering');
          archiveView.addEventListener('animationend', () => archiveView.classList.remove('is-entering'), { once: true });
        });
      }
    } else if (hash === '#about' || hash === '#/about') {
      const aboutView = document.getElementById('view-about');
      if (aboutView) {
        aboutView.classList.add('is-active');
        requestAnimationFrame(() => {
          aboutView.classList.add('is-entering');
          aboutView.addEventListener('animationend', () => aboutView.classList.remove('is-entering'), { once: true });
        });
      }
    } else {
      // Default to cases gallery
      const homeView = document.getElementById('view-cases');
      if (homeView) {
        homeView.classList.add('is-active');
        requestAnimationFrame(() => {
          homeView.classList.add('is-entering');
          homeView.addEventListener('animationend', () => homeView.classList.remove('is-entering'), { once: true });
        });
      }
    }
  }

  window.addEventListener('hashchange', handleRoute);
  window.addEventListener('DOMContentLoaded', handleRoute);

  window.ClevionRouter = {
    navigate: (route) => {
      window.location.hash = route;
    }
  };
})();
