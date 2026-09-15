/**
 * Clevion Before/After Venue Slider
 * Interactive comparative slider & quick toggles
 */

(function () {
  const container = document.getElementById('venue-ba-slider');
  const afterWrap = document.getElementById('ba-after-wrap');
  const handle = document.getElementById('ba-handle');
  const btnBefore = document.getElementById('btn-ba-before');
  const btnAfter = document.getElementById('btn-ba-after');
  const btnSplit = document.getElementById('btn-ba-split');

  if (!container || !afterWrap || !handle) return;

  let isDragging = false;

  function setSliderPosition(percent) {
    percent = Math.max(0, Math.min(100, percent));
    afterWrap.style.width = percent + '%';
    handle.style.left = percent + '%';

    if (btnBefore && btnAfter && btnSplit) {
      btnBefore.classList.toggle('active', percent < 10);
      btnAfter.classList.toggle('active', percent > 90);
      btnSplit.classList.toggle('active', percent >= 10 && percent <= 90);
    }
  }

  function onPointerMove(e) {
    if (!isDragging && e.type !== 'touchmove') return;
    const rect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    onPointerMove(e);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) onPointerMove(e);
  });

  // Touch Support
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    onPointerMove(e);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', onPointerMove, { passive: true });

  // Quick Toggles
  if (btnBefore) {
    btnBefore.addEventListener('click', (e) => {
      e.preventDefault();
      setSliderPosition(0);
    });
  }

  if (btnAfter) {
    btnAfter.addEventListener('click', (e) => {
      e.preventDefault();
      setSliderPosition(100);
    });
  }

  if (btnSplit) {
    btnSplit.addEventListener('click', (e) => {
      e.preventDefault();
      setSliderPosition(50);
    });
  }

  // Initial state 50%
  setSliderPosition(50);
})();
