/**
 * Clevion Application Coordinator
 * Enhanced with Cerebrium-style floating particles & scroll reveal
 */

// 0. Initialize Lenis Smooth Scroll Engine (Cerebrium-Tuned Physics)
let lenis = null;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    lerp: 0.1,
    duration: 1.2,
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.2,
    infinite: false
  });

  window.lenis = lenis;

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect with Lenis support
  const header = document.querySelector('.site-header');
function handleHeaderScroll(scrollY) {
  if (!header) return;
  if (scrollY > 40) {
    header.classList.add('scrolled');
    header.style.background = 'rgba(5, 0, 3, 0.75)';
    header.style.backdropFilter = 'blur(20px)';
    header.style.webkitBackdropFilter = 'blur(20px)';
    header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.08)';
  } else {
    header.classList.remove('scrolled');
    header.style.background = '';
    header.style.backdropFilter = '';
    header.style.webkitBackdropFilter = '';
    header.style.borderBottom = '';
  }
}

if (lenis) {
  lenis.on('scroll', (e) => handleHeaderScroll(e.scroll));
} else {
  window.addEventListener('scroll', () => handleHeaderScroll(window.scrollY), { passive: true });
}

// Smooth scroll for nav anchor links with header offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#' || href.startsWith('#modal-')) return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerHeight = header ? header.offsetHeight : 80;
      if (lenis) {
        lenis.scrollTo(target, { offset: -headerHeight - 20, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// 2. Modals (Consultation & Showreel)
const modalTriggers = document.querySelectorAll('[data-open-modal]');
const modalClosers = document.querySelectorAll('[data-close-modal]');
const backdrops = document.querySelectorAll('.modal-backdrop');

modalTriggers.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const modalId = btn.getAttribute('data-open-modal');
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
      targetModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });
});

function closeModal() {
  backdrops.forEach(m => m.classList.remove('open'));
  document.body.style.overflow = '';
}

modalClosers.forEach(btn => {
  btn.addEventListener('click', closeModal);
});

backdrops.forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// 3. Mobile Navigation Toggle
const mobileBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('main-nav-links');

if (mobileBtn && navLinks) {
  mobileBtn.addEventListener('click', () => {
    const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
    mobileBtn.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('mobile-open');
  });
}

// 4. Consultation Form Submission Feedback
const consultForm = document.getElementById('consult-form');
if (consultForm) {
  consultForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = consultForm.querySelector('button[type="submit"]');
    submitBtn.innerText = 'Transmitting Summit Request...';
    submitBtn.disabled = true;

    setTimeout(() => {
      consultForm.innerHTML = `
          <div style="text-align: center; padding: 2rem 0;">
            <div style="width: 50px; height: 50px; margin: 0 auto 1.25rem; border-radius: 50%; background: rgba(247, 118, 224, 0.2); display: flex; align-items: center; justify-content: center; color: var(--accent-fuchsia);">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h3 style="font-size: 1.35rem; margin-bottom: 0.5rem; color: #fff;">Consultation Confirmed</h3>
            <p style="color: var(--text-body); font-size: 0.95rem;">Our executive creative director will connect with your event production team within 4 hours.</p>
          </div>
        `;
    }, 1200);
  });
}

// 5. Floating Pink Square Particles — Cerebrium-style
function createFloatingParticles(containerId, count = 12) {
  const container = document.getElementById(containerId);
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';

    // Random position
    particle.style.left = Math.random() * 95 + '%';
    particle.style.top = Math.random() * 90 + '%';

    // Random size (8-14px)
    const size = 8 + Math.random() * 6;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    // Random opacity
    particle.style.opacity = 0.3 + Math.random() * 0.5;

    // Random animation delay
    particle.style.animationDelay = -(Math.random() * 20) + 's';
    particle.style.animationDuration = (15 + Math.random() * 15) + 's';

    container.appendChild(particle);
  }
}

// Floating particles only for security and footer sections (hero now uses 3D Ribbon Motion background)
createFloatingParticles('security-particles', 14);
createFloatingParticles('footer-particles', 8);

// 6. Scroll Reveal Animation — IntersectionObserver
const revealElements = document.querySelectorAll('.reveal-on-scroll');

if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}
});
