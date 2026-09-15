/**
 * Interactive Benchmark Range Chart & Segmented Control
 * Recreates Cerebrium.ai <c-segmented-controls> and <c-feature-card-range-chart>
 */

(function () {
  const tabs = document.querySelectorAll('[data-benchmark-tab]');
  const glider = document.getElementById('benchmark-glider');
  const rows = [
    { nameEl: document.getElementById('bench-name-1'), timeEl: document.getElementById('bench-time-1'), barEl: document.getElementById('bench-bar-1') },
    { nameEl: document.getElementById('bench-name-2'), timeEl: document.getElementById('bench-time-2'), barEl: document.getElementById('bench-bar-2') },
    { nameEl: document.getElementById('bench-name-3'), timeEl: document.getElementById('bench-time-3'), barEl: document.getElementById('bench-bar-3') }
  ];

  const benchmarkData = {
    keynote: {
      items: [
        { name: 'Clevion Dynamic Pipeline', time: '1.2s', width: '12%' },
        { name: 'Creative Agency A', time: '42s', width: '48%' },
        { name: 'Fragmented Production In-House', time: '156s', width: '96%' }
      ]
    },
    expo: {
      items: [
        { name: 'Clevion Spatial Engine', time: '2.4h', width: '15%' },
        { name: 'Creative Agency A', time: '38h', width: '55%' },
        { name: 'Fragmented Production In-House', time: '120h', width: '98%' }
      ]
    },
    stream: {
      items: [
        { name: 'Clevion Low-Latency Matrix', time: '45ms', width: '10%' },
        { name: 'Creative Agency A', time: '480ms', width: '52%' },
        { name: 'Traditional Satellite Uplink', time: '3,200ms', width: '94%' }
      ]
    },
    venue: {
      items: [
        { name: 'Clevion Multi-Hub Sync', time: '99.999%', width: '99.9%' },
        { name: 'Creative Agency A', time: '96.2%', width: '70%' },
        { name: 'Fragmented Production In-House', time: '88.4%', width: '50%' }
      ]
    }
  };

  function updateGlider(activeTab) {
    if (!glider || !activeTab) return;
    const tabRect = activeTab.getBoundingClientRect();
    const parentRect = activeTab.parentElement.getBoundingClientRect();
    glider.style.width = `${tabRect.width}px`;
    glider.style.left = `${tabRect.left - parentRect.left}px`;
  }

  function setBenchmark(type) {
    const data = benchmarkData[type];
    if (!data) return;

    data.items.forEach((item, idx) => {
      if (rows[idx]) {
        rows[idx].nameEl.innerText = item.name;
        rows[idx].timeEl.innerText = item.time;
        rows[idx].barEl.style.width = item.width;
      }
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      updateGlider(tab);
      const type = tab.getAttribute('data-benchmark-tab');
      setBenchmark(type);
    });
  });

  // Initial Setup
  window.addEventListener('load', () => {
    const activeTab = document.querySelector('[data-benchmark-tab].active');
    if (activeTab) {
      updateGlider(activeTab);
      setBenchmark(activeTab.getAttribute('data-benchmark-tab'));
    }
  });

  window.addEventListener('resize', () => {
    const activeTab = document.querySelector('[data-benchmark-tab].active');
    if (activeTab) updateGlider(activeTab);
  });
})();
