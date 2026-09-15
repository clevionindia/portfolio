/**
 * Clevion 3D WebGL Background Canvas
 * Faithful recreation of Cerebrium.ai Three.js Scene kb
 * Features: Deep obsidian clear color (#050003), 3D neon fuchsia & lilac flow lines,
 * floating geometric event matrices, subtle mouse parallax, and smooth camera drift.
 */

(function () {
  const canvas = document.getElementById('webgl-background-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050003, 0.025);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 25);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x050003, 1);

  // Mouse interaction state
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Scroll Reactivity State (Faithfully recreating Cerebrium.ai 3D scene scroll reactivity)
  const scrollState = {
    progress: 0,
    targetProgress: 0,
    velocity: 0,
    lastScrollY: 0,
    scrollY: 0
  };

  function updateScroll(y) {
    scrollState.scrollY = y;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    scrollState.targetProgress = Math.min(Math.max(y / maxScroll, 0), 1);
    scrollState.velocity = y - scrollState.lastScrollY;
    scrollState.lastScrollY = y;
  }

  window.addEventListener('scroll', () => {
    updateScroll(window.scrollY);
  }, { passive: true });

  // 1. Perspective Flow Lines (250 luminous lines along Z-axis)
  const lineCount = 200;
  const lineGeometry = new THREE.BufferGeometry();
  const linePositions = [];
  const lineColors = [];

  const colorFuchsia = new THREE.Color(0xF776E0);
  const colorLilac = new THREE.Color(0xFDDEFF);
  const colorViolet = new THREE.Color(0x7928CA);

  const linesData = [];

  for (let i = 0; i < lineCount; i++) {
    const x = (Math.random() - 0.5) * 50;
    const y = (Math.random() - 0.5) * 35;
    const z = (Math.random() - 0.5) * 60;
    const length = 4 + Math.random() * 8;
    const speed = 0.08 + Math.random() * 0.15;

    linesData.push({ x, y, z, length, speed });

    // 2 points per line segment
    linePositions.push(x, y, z);
    linePositions.push(x, y, z - length);

    // Color gradient for each line
    const baseColor = Math.random() > 0.4 ? colorFuchsia : (Math.random() > 0.5 ? colorLilac : colorViolet);
    lineColors.push(baseColor.r, baseColor.g, baseColor.b);
    lineColors.push(baseColor.r * 0.2, baseColor.g * 0.2, baseColor.b * 0.2);
  }

  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

  const lineMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    linewidth: 1.5
  });

  const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lineSegments);

  // 2. Floating Luminous Geometry Nodes (representing event stage spatial matrices)
  const nodeGroup = new THREE.Group();
  scene.add(nodeGroup);

  const nodeCount = 36;
  const nodes = [];
  const cubeGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
  const octaGeo = new THREE.OctahedronGeometry(0.7);

  for (let i = 0; i < nodeCount; i++) {
    const isCube = i % 2 === 0;
    const geo = isCube ? cubeGeo : octaGeo;
    const mat = new THREE.MeshBasicMaterial({
      color: i % 3 === 0 ? 0xF776E0 : (i % 3 === 1 ? 0x38BDF8 : 0xFDDEFF),
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });

    const mesh = new THREE.Mesh(geo, mat);
    const x = (Math.random() - 0.5) * 40;
    const y = (Math.random() - 0.5) * 25;
    const z = (Math.random() - 0.5) * 35;

    mesh.position.set(x, y, z);
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

    const rotSpeedX = (Math.random() - 0.5) * 0.01;
    const rotSpeedY = (Math.random() - 0.5) * 0.01;

    nodes.push({ mesh, rotSpeedX, rotSpeedY, baseY: y });
    nodeGroup.add(mesh);
  }

  // 3. Ambient Point Lights
  const light1 = new THREE.PointLight(0xF776E0, 2, 50);
  light1.position.set(-15, 10, 10);
  scene.add(light1);

  const light2 = new THREE.PointLight(0x38BDF8, 1.5, 40);
  light2.position.set(15, -10, 5);
  scene.add(light2);

  // Resize Handler
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', onResize);

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // Mouse easing
    mouse.x += (mouse.targetX - mouse.x) * 0.04;
    mouse.y += (mouse.targetY - mouse.y) * 0.04;

    // Smooth scroll interpolation (Cerebrium lerp technique)
    scrollState.progress += (scrollState.targetProgress - scrollState.progress) * 0.08;
    scrollState.velocity *= 0.90;

    // Camera dynamic perspective shift driven by scroll
    const scrollZOffset = scrollState.progress * 12;
    camera.position.x = mouse.x * 2.5 + Math.sin(scrollState.progress * Math.PI * 2) * 1.2;
    camera.position.y = mouse.y * 1.5 - scrollState.progress * 6;
    camera.position.z = 25 - scrollZOffset;
    camera.rotation.z = Math.sin(scrollState.progress * Math.PI) * 0.06;
    camera.lookAt(0, -scrollState.progress * 3, 0);

    // Scroll speed boost for luminous stream lines
    const velocityBoost = Math.min(Math.abs(scrollState.velocity) * 0.006, 0.4);

    // Update lines: stream forward along Z-axis
    const positions = lineGeometry.attributes.position.array;
    for (let i = 0; i < lineCount; i++) {
      const data = linesData[i];
      data.z += data.speed + velocityBoost;

      // Wrap around when passing the camera
      if (data.z > 30) {
        data.z = -40;
        data.x = (Math.random() - 0.5) * 50;
        data.y = (Math.random() - 0.5) * 35;
      }

      const idx = i * 6;
      positions[idx] = data.x;
      positions[idx + 1] = data.y;
      positions[idx + 2] = data.z;

      positions[idx + 3] = data.x;
      positions[idx + 4] = data.y;
      positions[idx + 5] = data.z - data.length;
    }
    lineGeometry.attributes.position.needsUpdate = true;

    // Update rotating geometry nodes
    nodes.forEach((n, idx) => {
      n.mesh.rotation.x += n.rotSpeedX;
      n.mesh.rotation.y += n.rotSpeedY;
      n.mesh.position.y = n.baseY + Math.sin(elapsedTime * 0.8 + idx) * 0.75;
    });

    // Seamless fade when passing through the light container
    const lightContainer = document.querySelector('.light-container');
    if (lightContainer) {
      const rect = lightContainer.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const overlap = Math.min(window.innerHeight, rect.bottom) - Math.max(0, rect.top);
        const ratio = overlap / window.innerHeight;
        canvas.style.opacity = Math.max(0.12, 1 - ratio * 0.88);
      } else {
        canvas.style.opacity = '1';
      }
    }

    renderer.render(scene, camera);
  }

  animate();
})();
