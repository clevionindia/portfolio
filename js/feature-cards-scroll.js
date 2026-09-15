/**
 * FeatureCards Scroll Coordinator
 * Faithfully recreating Cerebrium.ai FeatureCards sticky scroll architecture
 * 
 * Features:
 * - Sticky left sidebar tracking vertical progress of 4 feature cards
 * - IntersectionObserver with rootMargin ('0px 0px -30% 0px')
 * - Active card illumination (.has-card-intersecting)
 * - Smooth scroll-to transitions with header offset compensation
 */

(function () {
  const NAV_SELECTOR = '[data-feature-cards-nav]';
  const CONTAINER_SELECTOR = '[data-feature-cards-container]';
  const CARD_SELECTOR = '[data-feature-card]';
  const TITLE_ATTR = 'data-feature-card-title';
  const ACTIVE_CLASS = 'has-card-intersecting';

  function getSafeHeaderOffset() {
    const header = document.querySelector('.site-header');
    const headerHeight = header ? header.offsetHeight : 80;
    return headerHeight + 32; // Include generous breathing room
  }

  function initFeatureCards() {
    const nav = document.querySelector(NAV_SELECTOR);
    const container = document.querySelector(CONTAINER_SELECTOR);
    if (!nav || !container) return;

    const cards = Array.from(container.querySelectorAll(CARD_SELECTOR));
    const navLinks = Array.from(nav.querySelectorAll(`[${TITLE_ATTR}]`));
    if (cards.length === 0 || navLinks.length === 0) return;

    // Map to track active intersection ratios
    const intersectionMap = new Map();

    function updateActiveNav() {
      let activeCard = null;
      let maxRatio = -1;

      // Find the card with highest ratio
      for (const [card, ratio] of intersectionMap.entries()) {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          activeCard = card;
        }
      }

      // If no card has positive ratio (e.g. scrolled past or before), check positions
      if (!activeCard && cards.length > 0) {
        const headerOffset = getSafeHeaderOffset();
        const viewportCenter = window.innerHeight * 0.4;
        
        let closestCard = cards[0];
        let minDistance = Infinity;

        cards.forEach(card => {
          const rect = card.getBoundingClientRect();
          const distance = Math.abs(rect.top - viewportCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestCard = card;
          }
        });
        activeCard = closestCard;
      }

      if (!activeCard) return;
      const targetId = activeCard.id;

      navLinks.forEach(link => {
        if (link.getAttribute(TITLE_ATTR) === targetId) {
          link.classList.add(ACTIVE_CLASS);
          link.setAttribute('aria-current', 'true');
        } else {
          link.classList.remove(ACTIVE_CLASS);
          link.removeAttribute('aria-current');
        }
      });
    }

    // Set first card active initially
    if (navLinks[0]) {
      navLinks[0].classList.add(ACTIVE_CLASS);
      navLinks[0].setAttribute('aria-current', 'true');
    }

    // Setup IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          intersectionMap.set(entry.target, entry.intersectionRatio);
        } else {
          intersectionMap.delete(entry.target);
        }
      });
      updateActiveNav();
    }, {
      rootMargin: '0px 0px -30% 0px',
      threshold: [0.05, 0.15, 0.3, 0.5, 0.7, 0.9]
    });

    cards.forEach(card => observer.observe(card));

    // Handle Nav item clicks for smooth scrolling
    nav.addEventListener('click', (e) => {
      const link = e.target.closest(`[${TITLE_ATTR}]`);
      if (!link) return;

      e.preventDefault();
      const targetId = link.getAttribute(TITLE_ATTR);
      const targetCard = document.getElementById(targetId);
      if (!targetCard) return;

      const offset = getSafeHeaderOffset();

      if (window.lenis) {
        window.lenis.scrollTo(targetCard, {
          offset: -offset,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      } else {
        const elementPosition = targetCard.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        });
      }
    });

    // Also update on Lenis scroll tick or native scroll
    window.addEventListener('scroll', () => {
      if (cards.length > 0) {
        const top = cards[0].getBoundingClientRect().top;
        const bottom = cards[cards.length - 1].getBoundingClientRect().bottom;
        if (top < window.innerHeight && bottom > 0) {
          updateActiveNav();
        }
      }
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFeatureCards);
  } else {
    initFeatureCards();
  }
})();
