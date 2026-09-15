/**
 * Clevion Hero 3D Ribbon Motion
 * Brings continuous organic floating, interactive 3D mouse parallax with inertia (lerp),
 * reactive cursor light glow, and scroll-driven parallax physics to the Hero background.
 */

(function () {
  const heroSection = document.getElementById('hero-section');
  const heroWrapper = document.getElementById('hero-bg-wrapper');
  const heroMotion = document.getElementById('hero-bg-motion');
  const heroImg = document.getElementById('hero-bg-img');

  if (!heroSection || !heroMotion) return;

  // Interaction State
  const state = {
    // Mouse targets (-1 to 1)
    targetX: 0,
    targetY: 0,
    // Current lerped values
    currX: 0,
    currY: 0,
    // Glow coordinates in percentages
    glowX: 65,
    glowY: 35,
    currGlowX: 65,
    currGlowY: 35,
    // Scroll state
    scrollY: window.scrollY || 0,
    currScrollY: window.scrollY || 0,
    // Time for harmonic floating
    time: 0,
    isInView: true
  };

  // Check if hero is visible in viewport
  const observer = new IntersectionObserver((entries) => {
    state.isInView = entries[0].isIntersecting;
  }, { threshold: 0.05 });
  observer.observe(heroSection);

  // Mouse move handler
  function onMouseMove(e) {
    const rect = heroSection.getBoundingClientRect();
    if (e.clientY > rect.bottom || e.clientY < rect.top) {
      state.targetX = 0;
      state.targetY = 0;
      return;
    }

    const relX = (e.clientX - rect.left) / rect.width; // 0 to 1
    const relY = (e.clientY - rect.top) / rect.height; // 0 to 1

    state.targetX = (relX - 0.5) * 2; // -1 to 1
    state.targetY = (relY - 0.5) * 2; // -1 to 1

    state.glowX = Math.round(relX * 100);
    state.glowY = Math.round(relY * 100);
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true });

  // Touch / device orientation fallback or reset on leave
  window.addEventListener('mouseleave', () => {
    state.targetX = 0;
    state.targetY = 0;
    state.glowX = 65;
    state.glowY = 35;
  });

  // Scroll listener
  window.addEventListener('scroll', () => {
    state.scrollY = window.scrollY || window.pageYOffset;
  }, { passive: true });

  // Main animation frame loop (Lerp + Organic oscillation + Parallax)
  const LERP_FACTOR = 0.05;

  function render() {
    if (state.isInView) {
      state.time += 0.015;

      // 1. Lerp mouse coordinates for smooth cinematic momentum
      state.currX += (state.targetX - state.currX) * LERP_FACTOR;
      state.currY += (state.targetY - state.currY) * LERP_FACTOR;

      // 2. Lerp glow coordinates
      state.currGlowX += (state.glowX - state.currGlowX) * LERP_FACTOR;
      state.currGlowY += (state.glowY - state.currGlowY) * LERP_FACTOR;

      // 3. Lerp scroll
      state.currScrollY += (state.scrollY - state.currScrollY) * 0.1;

      // 4. Harmonic organic floating (undulating breathing movement)
      const floatX = Math.sin(state.time * 0.7) * 18;
      const floatY = Math.cos(state.time * 0.5) * 14;
      const floatRot = Math.sin(state.time * 0.4) * 1.8;
      const floatScale = 1.06 + Math.sin(state.time * 0.35) * 0.025;

      // 5. Interactive 3D tilt and pan
      const tiltX = -state.currY * 8; // deg
      const tiltY = state.currX * 10; // deg
      const panX = -state.currX * 35 + floatX; // px
      const panY = -state.currY * 25 + floatY; // px

      // 6. Scroll depth parallax
      const scrollParallaxY = state.currScrollY * 0.32;
      const heroHeight = heroSection.offsetHeight || window.innerHeight;
      const scrollProgress = Math.min(1, state.currScrollY / heroHeight);
      const dynamicOpacity = Math.max(0, 1 - scrollProgress * 1.15);

      // Apply transform with 3D perspective
      heroMotion.style.transform = `
        perspective(1200px)
        translate3d(${panX.toFixed(2)}px, ${(panY + scrollParallaxY).toFixed(2)}px, 0px)
        rotateX(${tiltX.toFixed(2)}deg)
        rotateY(${tiltY.toFixed(2)}deg)
        rotateZ(${floatRot.toFixed(2)}deg)
        scale(${floatScale.toFixed(3)})
      `;

      if (heroWrapper) {
        heroWrapper.style.opacity = dynamicOpacity.toFixed(3);
        heroWrapper.style.setProperty('--mouse-glow-x', `${state.currGlowX.toFixed(1)}%`);
        heroWrapper.style.setProperty('--mouse-glow-y', `${state.currGlowY.toFixed(1)}%`);
      }
    }

    requestAnimationFrame(render);
  }

  // Start motion loop
  requestAnimationFrame(render);
})();
