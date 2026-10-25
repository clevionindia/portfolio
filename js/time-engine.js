/**
 * Brandon Yasin Dynamic Time Engine & Interactive Clock Scrubbing
 * Real-time 24-hour color interpolation across 14 day/night stops
 */

(function () {
  'use strict';

  const TIME_THEME_BG_STOPS = [
    { hour: 0, bg: "#2C2922", ov: 0.10, br: 0.20 },
    { hour: 4, bg: "#2C2922", ov: 0.10, br: 0.20 },
    { hour: 5, bg: "#60594C", ov: 0.08, br: 0.36 },
    { hour: 6, bg: "#857C6A", ov: 0.06, br: 0.52 },
    { hour: 7, bg: "#A59D8A", ov: 0.04, br: 0.68 },
    { hour: 8, bg: "#CEC9BB", ov: 0.02, br: 0.84 },
    { hour: 9, bg: "#F8F6F2", ov: 0.00, br: 1.00 },
    { hour: 16, bg: "#F8F6F2", ov: 0.00, br: 1.00 },
    { hour: 17, bg: "#CEC9BB", ov: 0.02, br: 0.84 },
    { hour: 18, bg: "#A59D8A", ov: 0.04, br: 0.68 },
    { hour: 19, bg: "#7C725E", ov: 0.06, br: 0.52 },
    { hour: 20, bg: "#534C3D", ov: 0.08, br: 0.36 },
    { hour: 21, bg: "#2C2922", ov: 0.10, br: 0.20 },
    { hour: 24, bg: "#2C2922", ov: 0.10, br: 0.20 }
  ];

  const TIME_THEME_TEXT_STEPS = [
    { hour: 0, key: "night" },
    { hour: 5, key: "yellow" },
    { hour: 6, key: "day" },
    { hour: 19, key: "yellow" },
    { hour: 20, key: "night" }
  ];

  const TIME_THEME_TEXT = {
    night: { ui: "#C3BEB1", sel: "rgba(255, 238, 194, 0.2)" },
    yellow: { ui: "#F1C345", sel: "rgba(68, 48, 0, 0.2)" },
    day: { ui: "#111111", sel: "rgba(68, 48, 0, 0.2)" }
  };

  const interpolateNumber = (from, to, progress) => from + (to - from) * progress;

  const parseColor = (color) => {
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      return [
        parseInt(hex.slice(0, 2), 16),
        parseInt(hex.slice(2, 4), 16),
        parseInt(hex.slice(4, 6), 16),
        1
      ];
    }
    const channels = color.match(/[\d.]+/g).map(Number);
    return [channels[0], channels[1], channels[2], channels[3] ?? 1];
  };

  const interpolateColor = (from, to, progress) => {
    const fromChannels = parseColor(from);
    const toChannels = parseColor(to);
    const channels = fromChannels
      .slice(0, 3)
      .map((channel, i) => Math.round(interpolateNumber(channel, toChannels[i], progress)));
    const alpha = Math.round(interpolateNumber(fromChannels[3], toChannels[3], progress) * 10000) / 10000;
    return `rgba(${channels.join(',')},${alpha})`;
  };

  const getTimeThemeTextKey = (hour, textSteps = TIME_THEME_TEXT_STEPS) => {
    let index = 0;
    while (index < textSteps.length - 1 && textSteps[index + 1].hour <= hour) index++;
    return textSteps[index].key;
  };

  const getTimeTheme = (hourDecimal) => {
    const textKey = getTimeThemeTextKey(hourDecimal);
    const text = TIME_THEME_TEXT[textKey];

    let index = 0;
    while (index < TIME_THEME_BG_STOPS.length - 1 && TIME_THEME_BG_STOPS[index + 1].hour <= hourDecimal) {
      index++;
    }

    const from = TIME_THEME_BG_STOPS[index];
    const to = TIME_THEME_BG_STOPS[Math.min(index + 1, TIME_THEME_BG_STOPS.length - 1)];
    const range = to.hour - from.hour;
    const progress = range > 0 ? (hourDecimal - from.hour) / range : 0;

    return {
      '--color-main': text.ui,
      '--color-bg': interpolateColor(from.bg, to.bg, progress),
      '--img-over-opacity': interpolateNumber(from.ov, to.ov, progress),
      '--bg-brightness': interpolateNumber(from.br, to.br, progress),
      '--selection-color': text.ui,
      '--selection-bg': text.sel
    };
  };

  const applyTimeTheme = (root, theme) => {
    Object.entries(theme).forEach(([prop, val]) => {
      root.style.setProperty(prop, val);
    });
    root.style.backgroundColor = 'var(--color-bg)';
    root.style.color = 'var(--color-main)';
  };

  // State Management
  let isDragging = false;
  let customHour = null;
  let liveTimer = null;

  function getCurrentDecimalHour() {
    if (customHour !== null) return customHour;
    const now = new Date();
    return now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
  }

  function formatTimeDisplay(decimalHour) {
    const hours = Math.floor(decimalHour);
    const minutes = Math.floor((decimalHour - hours) * 60);
    const hStr = String(hours).padStart(2, '0');
    const mStr = String(minutes).padStart(2, '0');
    return { hStr, mStr };
  }

  function updateClockUI(decimalHour, isCustom = false) {
    const root = document.documentElement;
    const theme = getTimeTheme(decimalHour);
    applyTimeTheme(root, theme);

    // Update body night class
    if (decimalHour < 6 || decimalHour >= 20) {
      document.body.classList.add('is-night');
    } else {
      document.body.classList.remove('is-night');
    }

    // Rotation angle: 0h = -90deg (top), 6h = 0deg (right), 12h = 90deg (bottom), 18h = 180deg (left)
    const angleDeg = (decimalHour / 24) * 360 - 90;

    const rotEl = document.querySelector('.egg .rotate');
    const dotEls = document.querySelectorAll('.time-time');
    const labelEl = document.querySelector('.time-label');
    const resetEl = document.querySelector('.time-reset');

    if (rotEl) {
      rotEl.style.transform = `rotate(${angleDeg + 90}deg)`;
    }

    const { hStr, mStr } = formatTimeDisplay(decimalHour);
    dotEls.forEach(el => {
      el.innerHTML = `${hStr}<span class="time-dot">.</span>${mStr}`;
    });

    if (labelEl && resetEl) {
      if (isCustom) {
        labelEl.style.transform = 'translateY(-100%)';
        resetEl.style.transform = 'translateY(-100%)';
      } else {
        labelEl.style.transform = 'translateY(0%)';
        resetEl.style.transform = 'translateY(0%)';
      }
    }
  }

  function initInteractiveClock() {
    const eggEl = document.querySelector('.egg');
    const resetBtn = document.querySelector('.time-reset');

    if (!eggEl) return;

    function handleStart(e) {
      isDragging = true;
      document.documentElement.classList.add('clock-grabbing');
      eggEl.classList.add('egg--grabbing');
      handleMove(e);
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
    }

    function handleMove(e) {
      if (!isDragging) return;
      if (e.cancelable && e.type.startsWith('touch')) e.preventDefault();

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const rect = eggEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = clientX - centerX;
      const dy = clientY - centerY;

      // Calculate polar angle
      let theta = Math.atan2(dy, dx) * (180 / Math.PI); // -180 to 180
      let clockAngle = theta + 90;
      if (clockAngle < 0) clockAngle += 360;

      // 360deg = 24 hours
      customHour = (clockAngle / 360) * 24;
      updateClockUI(customHour, true);
    }

    function handleEnd() {
      isDragging = false;
      document.documentElement.classList.remove('clock-grabbing');
      eggEl.classList.remove('egg--grabbing');
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    }

    eggEl.addEventListener('mousedown', handleStart);
    eggEl.addEventListener('touchstart', handleStart, { passive: false });

    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        customHour = null;
        updateClockUI(getCurrentDecimalHour(), false);
      });
    }

    // Auto-update live time every second if not custom
    clearInterval(liveTimer);
    liveTimer = setInterval(() => {
      if (customHour === null) {
        updateClockUI(getCurrentDecimalHour(), false);
      }
    }, 1000);

    // Initial render
    updateClockUI(getCurrentDecimalHour(), false);
  }

  // Export to window for global access
  window.ClevionTimeEngine = {
    init: initInteractiveClock,
    getTimeTheme: getTimeTheme,
    applyTimeTheme: applyTimeTheme,
    reset: () => {
      customHour = null;
      updateClockUI(getCurrentDecimalHour(), false);
    }
  };

  // Immediate init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInteractiveClock);
  } else {
    initInteractiveClock();
  }
})();
