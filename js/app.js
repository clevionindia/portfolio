/**
 * CLEVION — MASTER APPLICATION INTERACTION COORDINATOR
 * 100% Modeled After Brandon Yasin's award-winning portfolio (brandonyasin.com)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 0. Preloader — hide after brief delay for SVG line drawing & bar fill
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('is-hidden');
      const activeView = document.querySelector('.page-view.is-active');
      if (activeView) {
        activeView.classList.add('is-entering');
        activeView.addEventListener('animationend', () => {
          activeView.classList.remove('is-entering');
        }, { once: true });
      }
    }, 1100);
  }

  // 1. Initialize Lenis Smooth Scroll
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // 2. Award Badge Ticker Alternator in Header
  const logoLine = document.querySelector('.logo-line');
  const awardEl = document.querySelector('.award');
  if (logoLine && awardEl) {
    let showAward = false;
    setInterval(() => {
      showAward = !showAward;
      if (showAward) {
        logoLine.style.opacity = '0';
        logoLine.style.pointerEvents = 'none';
        awardEl.style.opacity = '1';
        awardEl.style.pointerEvents = 'auto';
      } else {
        logoLine.style.opacity = '1';
        logoLine.style.pointerEvents = 'auto';
        awardEl.style.opacity = '0';
        awardEl.style.pointerEvents = 'none';
      }
    }, 4500);
  }

  // 3. Homepage Gallery Draggable Horizontal Momentum
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    gallery.addEventListener('mousedown', (e) => {
      // Don't trigger drag on anchor clicks
      if (e.target.closest('a')) {
        // allow click
      }
      isDown = true;
      gallery.classList.add('is-dragging');
      startX = e.pageX - gallery.offsetLeft;
      scrollLeft = gallery.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      isDown = false;
      if (gallery) gallery.classList.remove('is-dragging');
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - gallery.offsetLeft;
      const walk = (x - startX) * 1.5;
      gallery.scrollLeft = scrollLeft - walk;
    });

    // Horizontal wheel conversion
    gallery.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        gallery.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  }

  // 4. Archive Gallery Horizontal Scrolling
  const archiveTrack = document.querySelector('.archive-gallery__track');
  if (archiveTrack) {
    let isTrackDown = false;
    let trackStartX = 0;
    let trackScrollLeft = 0;

    archiveTrack.addEventListener('mousedown', (e) => {
      isTrackDown = true;
      trackStartX = e.pageX - archiveTrack.offsetLeft;
      trackScrollLeft = archiveTrack.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      isTrackDown = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isTrackDown) return;
      e.preventDefault();
      const x = e.pageX - archiveTrack.offsetLeft;
      const walk = (x - trackStartX) * 1.5;
      archiveTrack.scrollLeft = trackScrollLeft - walk;
    });

    archiveTrack.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        archiveTrack.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  }

  // 5. About Page: Interactive Values Cards
  const valueCards = document.querySelectorAll('.value-card');
  valueCards.forEach(card => {
    const toggleBtn = card.querySelector('.value-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        card.classList.toggle('is-expanded');
      });
    }
  });

  // 6. About Page: 6-Step Design Process Stepper
  const processBtns = document.querySelectorAll('.process-step-btn');
  const processSlots = document.querySelectorAll('.process-content-slot > div');
  const progressBar = document.querySelector('.process-progress-bar');

  processBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const stepIdx = parseInt(btn.getAttribute('data-step'), 10);
      processBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      if (progressBar) {
        progressBar.style.width = `${((stepIdx + 1) / processBtns.length) * 100}%`;
      }

      processSlots.forEach((slot, i) => {
        if (i === stepIdx) {
          slot.style.display = 'block';
          slot.style.opacity = '1';
        } else {
          slot.style.display = 'none';
          slot.style.opacity = '0';
        }
      });
    });
  });

  // 7. Fullscreen Spatial Menu Overlay (3 Miniature Interactive Browser Panels)
  const menuBtn = document.querySelector('.menu-toggle');
  const spatialOverlay = document.getElementById('spatial-menu-overlay');
  const spatialBackdrop = document.querySelector('.spatial-menu-backdrop');
  const spatialStage = document.querySelector('.spatial-menu-stage');
  const spatialTiles = document.querySelectorAll('.spatial-tile');
  const menuLabelText = document.querySelector('.menu-label-text');
  const menuLabelHover = document.querySelector('.menu-label-hover');

  let isMenuOpen = false;
  let isZoomTransitioning = false;

  function setMenuButtonText(text) {
    if (menuLabelText && menuLabelHover) {
      menuLabelText.textContent = text;
      menuLabelHover.textContent = text;
    }
  }

  function openMenu() {
    if (isZoomTransitioning) return;
    isMenuOpen = true;
    if (spatialOverlay) {
      spatialOverlay.classList.add('is-active');
      spatialOverlay.setAttribute('aria-hidden', 'false');
    }
    document.body.classList.add('is-menu-open');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
    setMenuButtonText('Close');
  }

  function closeMenu() {
    if (isZoomTransitioning) return;
    isMenuOpen = false;
    if (spatialOverlay) {
      spatialOverlay.classList.remove('is-active');
      spatialOverlay.setAttribute('aria-hidden', 'true');
    }
    document.body.classList.remove('is-menu-open');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    setMenuButtonText('Menu');

    // Reset zoom classes
    spatialTiles.forEach(t => {
      t.classList.remove('is-zooming-in', 'is-fading-out');
    });
  }

  function toggleMenu() {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMenu();
    });
  }

  // Close menu on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMenu();
    }
  });

  // Close menu when clicking outside tiles (backdrop or stage margin)
  if (spatialBackdrop) {
    spatialBackdrop.addEventListener('click', () => {
      if (isMenuOpen) closeMenu();
    });
  }
  if (spatialStage) {
    spatialStage.addEventListener('click', (e) => {
      if (e.target === spatialStage && isMenuOpen) {
        closeMenu();
      }
    });
  }

  // Miniature Panels (Spatial Tiles) Click-to-Zoom Expansion
  spatialTiles.forEach(tile => {
    function handleTileSelect() {
      if (isZoomTransitioning) return;
      const targetHash = tile.getAttribute('data-target');
      if (!targetHash) return;

      isZoomTransitioning = true;

      // Clicked panel zooms in toward camera (scale 1.35)
      tile.classList.add('is-zooming-in');

      // Sibling panels shrink and fade out (scale 0.9)
      spatialTiles.forEach(other => {
        if (other !== tile) {
          other.classList.add('is-fading-out');
        }
      });

      // Smooth transition into chosen view
      setTimeout(() => {
        window.location.hash = targetHash;
        closeMenu();
        isZoomTransitioning = false;
        spatialTiles.forEach(t => {
          t.classList.remove('is-zooming-in', 'is-fading-out');
        });
      }, 420);
    }

    tile.addEventListener('click', handleTileSelect);

    // Keyboard support (Enter / Space)
    tile.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleTileSelect();
      }
    });
  });

  // 8. Tactile Paper Contact Sheet Modal
  const contactBtns = document.querySelectorAll('.contact, .open-contact-modal');
  const modalWrap = document.querySelector('.modal-wrap');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalCloseBtns = document.querySelectorAll('.modal-close');
  const tabBtns = document.querySelectorAll('.tab-btn[data-tab]');
  const tabsLine = document.querySelector('.tabs-line');
  const paperCollab = document.querySelector('.paper-bg--collab');
  const modalTitleClient = document.getElementById('modal-title-client');
  const modalTitleCollab = document.getElementById('modal-title-collab');
  const modalDescClient = document.getElementById('modal-desc-client');
  const modalDescCollab = document.getElementById('modal-desc-collab');

  function updateTabsLine() {
    const activeTab = document.querySelector('.tab-btn.is-active');
    if (activeTab && tabsLine) {
      tabsLine.style.transform = `translateX(${activeTab.offsetLeft}px)`;
      tabsLine.style.width = `${activeTab.offsetWidth}px`;
    }
  }

  function openContactModal() {
    if (modalWrap) modalWrap.classList.add('is-active');
    if (modalBackdrop) modalBackdrop.classList.add('is-active');
    closeMenu();
    setTimeout(updateTabsLine, 100);
  }
  function closeContactModal() {
    if (modalWrap) modalWrap.classList.remove('is-active');
    if (modalBackdrop) modalBackdrop.classList.remove('is-active');
  }

  contactBtns.forEach(btn => btn.addEventListener('click', openContactModal));
  modalCloseBtns.forEach(btn => btn.addEventListener('click', closeContactModal));
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeContactModal);

  // Tabs Switching (Client Brief vs Talent / Collab)
  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      updateTabsLine();

      const tab = btn.getAttribute('data-tab');
      if (tab === 'collab') {
        if (modalWrap) modalWrap.classList.add('is-collab');
        if (paperCollab) paperCollab.style.opacity = '1';
        if (modalTitleClient) modalTitleClient.style.display = 'none';
        if (modalTitleCollab) modalTitleCollab.style.display = 'block';
        if (modalDescClient) modalDescClient.style.display = 'none';
        if (modalDescCollab) modalDescCollab.style.display = 'block';
      } else {
        if (modalWrap) modalWrap.classList.remove('is-collab');
        if (paperCollab) paperCollab.style.opacity = '0';
        if (modalTitleClient) modalTitleClient.style.display = 'block';
        if (modalTitleCollab) modalTitleCollab.style.display = 'none';
        if (modalDescClient) modalDescClient.style.display = 'block';
        if (modalDescCollab) modalDescCollab.style.display = 'none';
      }
    });
  });

  // 9. Contact Form Submission & Confirmation Modal
  const contactForm = document.getElementById('contact-form');
  const successModal = document.querySelector('.success-wrapper');
  const successCloseBtn = document.querySelector('.success-close');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeContactModal();
      if (successModal) successModal.classList.add('is-active');
      contactForm.reset();
    });
  }

  if (successCloseBtn && successModal) {
    successCloseBtn.addEventListener('click', () => {
      successModal.classList.remove('is-active');
    });
  }

  // 10. Custom Interactive Cursor Follower
  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  document.body.appendChild(cursorDot);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursorDot.style.left = `${cursorX}px`;
    cursorDot.style.top = `${cursorY}px`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Contextual cursor expansions
  const dragTargets = document.querySelectorAll('.gallery, .archive-gallery__track, .egg');
  dragTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('is-expanded');
      cursorDot.textContent = 'DRAG';
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('is-expanded');
      cursorDot.textContent = '';
    });
  });

  const viewTargets = document.querySelectorAll('.item, .next__link, .menu-tile, .spatial-tile');
  viewTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('is-expanded');
      cursorDot.textContent = 'VIEW';
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('is-expanded');
      cursorDot.textContent = '';
    });
  });
});
