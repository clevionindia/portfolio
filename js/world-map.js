/**
 * Interactive Global Summit World Map
 * Recreates Cerebrium.ai <c-feature-card-world-map-animation>
 */

(function () {
  const tooltip = document.getElementById('map-tooltip');
  const tooltipCity = document.getElementById('tooltip-city');
  const tooltipDesc = document.getElementById('tooltip-desc');
  const nodes = document.querySelectorAll('.map-node');

  if (!tooltip || nodes.length === 0) return;

  nodes.forEach(node => {
    node.addEventListener('mouseenter', (e) => {
      const city = node.getAttribute('data-city');
      const venue = node.getAttribute('data-venue');
      const latency = node.getAttribute('data-latency');

      tooltipCity.innerText = city;
      tooltipDesc.innerText = `${venue} • ${latency}`;
      tooltip.style.opacity = '1';
    });

    node.addEventListener('mouseleave', () => {
      // Return to default active city (San Francisco)
      tooltipCity.innerText = 'Global Synchrony';
      tooltipDesc.innerText = '7 Tier-1 Convention Hubs Active • 0ms Skew';
    });
  });
})();
