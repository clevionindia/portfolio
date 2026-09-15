/**
 * Live Observability Latency Chart
 * Recreates Cerebrium.ai <c-animated-chart> with live P50, P90, and Max metrics
 */

(function () {
  const svg = document.getElementById('telemetry-svg');
  const pathP50 = document.getElementById('path-p50');
  const pathP90 = document.getElementById('path-p90');
  const pathMax = document.getElementById('path-max');
  const textP50 = document.getElementById('val-p50');
  const textP90 = document.getElementById('val-p90');
  const textMax = document.getElementById('val-max');

  if (!svg || !pathP50 || !pathP90 || !pathMax) return;

  const pointsCount = 14;
  const width = 520;
  const height = 160;

  // Base values
  let dataP50 = [28, 30, 29, 32, 27, 29, 31, 30, 28, 29, 30, 28, 31, 29];
  let dataP90 = [54, 58, 52, 60, 56, 58, 62, 57, 55, 59, 57, 54, 58, 56];
  let dataMax = [92, 98, 88, 105, 94, 99, 108, 96, 91, 102, 97, 93, 101, 95];

  function generateSmoothPath(data) {
    const step = width / (pointsCount - 1);
    let d = `M 0,${height - data[0]}`;

    for (let i = 0; i < pointsCount - 1; i++) {
      const x0 = i * step;
      const y0 = height - data[i];
      const x1 = (i + 1) * step;
      const y1 = height - data[i + 1];
      const cx = (x0 + x1) / 2;
      d += ` C ${cx},${y0} ${cx},${y1} ${x1},${y1}`;
    }
    return d;
  }

  function updateChart() {
    // Slight random walk simulation
    for (let i = 0; i < pointsCount; i++) {
      dataP50[i] += (Math.random() - 0.5) * 2;
      dataP50[i] = Math.max(22, Math.min(38, dataP50[i]));

      dataP90[i] += (Math.random() - 0.5) * 3;
      dataP90[i] = Math.max(48, Math.min(72, dataP90[i]));

      dataMax[i] += (Math.random() - 0.5) * 5;
      dataMax[i] = Math.max(80, Math.min(125, dataMax[i]));
    }

    pathP50.setAttribute('d', generateSmoothPath(dataP50));
    pathP90.setAttribute('d', generateSmoothPath(dataP90));
    pathMax.setAttribute('d', generateSmoothPath(dataMax));

    // Update readout values (converted to milliseconds for display)
    const currentP50 = (dataP50[pointsCount - 1] / 16).toFixed(1);
    const currentP90 = (dataP90[pointsCount - 1] / 16).toFixed(1);
    const currentMax = (dataMax[pointsCount - 1] / 16).toFixed(1);

    if (textP50) textP50.innerText = `${currentP50}ms`;
    if (textP90) textP90.innerText = `${currentP90}ms`;
    if (textMax) textMax.innerText = `${currentMax}ms`;
  }

  setInterval(updateChart, 1200);
  updateChart();
})();
