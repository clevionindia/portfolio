/**
 * Scramble Text Effect
 * Recreates Cerebrium.ai <c-scramble-text> component
 */

class TextScrambler {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.originalText = el.getAttribute('data-original-text') || el.innerText.trim();
    this.hoverText = el.getAttribute('data-hover-text') || this.originalText;
    this.frameRequest = null;
    this.frame = 0;
    this.queue = [];

    this.init();
  }

  init() {
    this.el.setAttribute('data-original-text', this.originalText);

    this.el.addEventListener('mouseenter', () => {
      this.setText(this.hoverText);
    });

    this.el.addEventListener('mouseleave', () => {
      this.setText(this.originalText);
    });
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 12);
      const end = start + Math.floor(Math.random() * 16);
      this.queue.push({ from, to, start, end, char: '' });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
  }

  update() {
    let output = '';
    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += `<span style="color: var(--accent-fuchsia); opacity: 0.9;">${char}</span>`;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.el.innerText = this.queue.map(q => q.to).join('');
    } else {
      this.frameRequest = requestAnimationFrame(() => {
        this.frame++;
        this.update();
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.scramble-hover, [data-scramble]').forEach(el => {
    new TextScrambler(el);
  });
});
