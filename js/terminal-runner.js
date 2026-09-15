/**
 * Interactive Live Event Terminal Runner
 * Recreates Cerebrium.ai <c-feature-card-terminal>
 */

(function () {
  const tabs = document.querySelectorAll('.terminal-tab-btn');
  const codeBody = document.getElementById('terminal-code-body');
  const copyBtn = document.getElementById('terminal-copy-btn');
  const copyText = document.getElementById('terminal-copy-text');

  if (!codeBody || !copyBtn) return;

  const terminalSnippets = {
    'summit.json': `{
  <span class="syntax-key">"summit"</span>: <span class="syntax-string">"World Tech Forum 2026"</span>,
  <span class="syntax-key">"venue"</span>: <span class="syntax-string">"Moscone West, San Francisco"</span>,
  <span class="syntax-key">"stage_architecture"</span>: {
    <span class="syntax-key">"mainstage_led"</span>: {
      <span class="syntax-key">"aspect_ratio"</span>: <span class="syntax-string">"32:9 Ultra-Curved"</span>,
      <span class="syntax-key">"resolution"</span>: <span class="syntax-string">"7680x2160 @ 120Hz"</span>,
      <span class="syntax-key">"color_gamut"</span>: <span class="syntax-string">"DCI-P3 10-Bit HDR"</span>,
      <span class="syntax-key">"refresh_rate_hz"</span>: <span class="syntax-number">7680</span>
    },
    <span class="syntax-key">"spatial_audio"</span>: {
      <span class="syntax-key">"channels"</span>: <span class="syntax-number">64</span>,
      <span class="syntax-key">"immersive_dsp"</span>: <span class="syntax-keyword">true</span>,
      <span class="syntax-key">"latency_ms"</span>: <span class="syntax-number">2.1</span>
    }
  },
  <span class="syntax-key">"realtime_telemetry"</span>: {
    <span class="syntax-key">"failover_redundancy"</span>: <span class="syntax-string">"Active-Active Dual Hot Backup"</span>,
    <span class="syntax-key">"uptime_guarantee"</span>: <span class="syntax-string">"99.999%"</span>
  }
}`,

    'led-matrix.glsl': `<span class="syntax-comment">// Clevion Real-Time Generative Stage Shaders</span>
<span class="syntax-keyword">precision</span> <span class="syntax-keyword">highp</span> <span class="syntax-keyword">float</span>;
<span class="syntax-keyword">uniform</span> <span class="syntax-keyword">float</span> u_time;
<span class="syntax-keyword">uniform</span> <span class="syntax-keyword">vec2</span>  u_resolution;
<span class="syntax-keyword">uniform</span> <span class="syntax-keyword">vec3</span>  u_brand_fuchsia;

<span class="syntax-keyword">void</span> main() {
  <span class="syntax-keyword">vec2</span> uv = (gl_FragCoord.xy * <span class="syntax-number">2.0</span> - u_resolution) / min(u_resolution.x, u_resolution.y);
  <span class="syntax-keyword">float</span> wave = sin(length(uv) * <span class="syntax-number">8.0</span> - u_time * <span class="syntax-number">3.2</span>);
  <span class="syntax-keyword">vec3</span> color = mix(vec3(<span class="syntax-number">0.02</span>, <span class="syntax-number">0.0</span>, <span class="syntax-number">0.05</span>), u_brand_fuchsia, smoothstep(<span class="syntax-number">0.3</span>, <span class="syntax-number">0.9</span>, wave));
  gl_FragColor = <span class="syntax-keyword">vec4</span>(color, <span class="syntax-number">1.0</span>);
}`,

    'audio-cues.yaml': `<span class="syntax-comment"># Clevion Executive Keynote Cues</span>
<span class="syntax-key">keynote_id</span>: <span class="syntax-string">"KN-01-OPENING"</span>
<span class="syntax-key">speaker</span>: <span class="syntax-string">"Chief Executive Officer"</span>
<span class="syntax-key">timeline</span>:
  - <span class="syntax-key">cue_id</span>: <span class="syntax-string">"WALK_ON"</span>
    <span class="syntax-key">time_code</span>: <span class="syntax-string">"00:00:00:00"</span>
    <span class="syntax-key">led_state</span>: <span class="syntax-string">"dynamic_fuchsia_surge"</span>
    <span class="syntax-key">audio_bed</span>: <span class="syntax-string">"surround_sub_bass_drop"</span>
  - <span class="syntax-key">cue_id</span>: <span class="syntax-string">"PRODUCT_REVEAL"</span>
    <span class="syntax-key">time_code</span>: <span class="syntax-string">"00:04:15:20"</span>
    <span class="syntax-key">lighting</span>: <span class="syntax-string">"blackout_to_single_followspot"</span>
    <span class="syntax-key">led_intensity</span>: <span class="syntax-number">100</span>`
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const snippetKey = tab.getAttribute('data-tab');
      if (terminalSnippets[snippetKey]) {
        codeBody.innerHTML = terminalSnippets[snippetKey];
      }
    });
  });

  copyBtn.addEventListener('click', () => {
    const textToCopy = codeBody.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
      copyText.innerText = 'Copied!';
      copyBtn.style.color = 'var(--accent-fuchsia)';
      setTimeout(() => {
        copyText.innerText = 'Copy';
        copyBtn.style.color = '';
      }, 2000);
    });
  });
})();
