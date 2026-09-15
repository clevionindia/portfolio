/**
 * Interactive Dots Matrix Canvas
 * Recreates Cerebrium.ai <c-interactive-dots> component
 */

(function () {
  const canvas = document.getElementById('dots-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let dots = [];
  const spacing = 28;
  const mouse = { x: -1000, y: -1000, radius: 120 };

  function initDots() {
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight;
    dots = [];

    const cols = Math.floor(width / spacing);
    const rows = Math.floor(height / spacing);
    const offsetX = (width - cols * spacing) / 2;
    const offsetY = (height - rows * spacing) / 2;

    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        dots.push({
          baseX: offsetX + c * spacing,
          baseY: offsetY + r * spacing,
          x: offsetX + c * spacing,
          y: offsetY + r * spacing,
          vx: 0,
          vy: 0,
          size: 1.4,
          baseAlpha: 0.18
        });
      }
    }
  }

  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.parentElement.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  window.addEventListener('resize', initDots);
  initDots();

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];

      // Distance to mouse
      const dx = mouse.x - d.x;
      const dy = mouse.y - d.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius) {
        const force = (1 - dist / mouse.radius) * 16;
        const angle = Math.atan2(dy, dx);
        d.vx -= Math.cos(angle) * force * 0.3;
        d.vy -= Math.sin(angle) * force * 0.3;
      }

      // Spring back to base position
      d.vx += (d.baseX - d.x) * 0.08;
      d.vy += (d.baseY - d.y) * 0.08;
      d.vx *= 0.82;
      d.vy *= 0.82;

      d.x += d.vx;
      d.y += d.vy;

      // Alpha and color based on movement
      const speed = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
      const alpha = Math.min(1, d.baseAlpha + speed * 0.15);

      ctx.beginPath();
      ctx.arc(d.x, d.y, d.size + Math.min(2, speed * 0.4), 0, Math.PI * 2);
      if (speed > 0.8) {
        ctx.fillStyle = `rgba(247, 118, 224, ${alpha})`;
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      }
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  draw();
})();
