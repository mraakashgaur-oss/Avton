// ─── Hero Section Component ────────────────────────────────────────────────────
window.renderHero = function(onCTA) {
  const section = document.createElement('section');
  section.id = 'hero';
  section.className = 'relative flex items-center justify-center min-h-screen pt-16';

  section.innerHTML = `
    <!-- Grid background -->
    <div class="grid-bg"></div>

    <!-- Animated orbs -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10 animate-float"
           style="background: radial-gradient(circle, #06b6d4, transparent); filter: blur(40px);"></div>
      <div class="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-8"
           style="background: radial-gradient(circle, #0284c7, transparent); filter: blur(50px);"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">

      <!-- Left: Copy -->
      <div>
        <!-- Partner Badge -->
        <div class="badge-partner animate-fadeInUp mb-6">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          Authorized Channel Partner: Eco Plug
        </div>

        <!-- Headline -->
        <h1 class="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-tight text-white animate-fadeInUp delay-100">
          Power the
          <span class="block" style="background: linear-gradient(135deg, #22d3ee, #0284c7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
            Clean Future
          </span>
          of Mobility
        </h1>

        <!-- Sub-headline -->
        <p class="mt-5 text-lg text-gray-400 leading-relaxed max-w-lg animate-fadeInUp delay-200">
          Integrated EV charging infrastructure, solar energy systems, and portable backup power — engineered for commercial, residential, and dealership deployments across India.
        </p>

        <!-- Feature pills -->
        <div class="flex flex-wrap gap-2.5 mt-7 animate-fadeInUp delay-300">
          ${[
            ['⚡', 'EV Charging'],
            ['☀️', 'Solar Integration'],
            ['🔋', 'Emergency Backup'],
            ['🚗', 'EV Dealerships']
          ].map(([icon, label]) => `
            <span class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-cyan-300"
                  style="background: rgba(34,211,238,.08); border: 1px solid rgba(34,211,238,.2);">
              ${icon} ${label}
            </span>
          `).join('')}
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap gap-4 mt-10 animate-fadeInUp delay-400">
          <button class="btn-cyan text-base px-6 py-3" id="hero-consult-btn">
            Get a Free Consultation
          </button>
          <button class="btn-ghost text-base px-6 py-3" id="hero-portal-btn">
            <span class="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Client Portal
            </span>
          </button>
        </div>

        <!-- Stats row -->
        <div class="grid grid-cols-3 gap-4 mt-12 pt-8 border-t animate-fadeInUp delay-500"
             style="border-color: var(--border);">
          ${[
            ['500+', 'Chargers Deployed'],
            ['98.6%', 'Uptime SLA'],
            ['3 MW+', 'Solar Capacity']
          ].map(([val, lab]) => `
            <div class="text-center sm:text-left">
              <div class="text-2xl font-bold text-white">${val}</div>
              <div class="text-xs text-gray-500 mt-0.5">${lab}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Right: Visual card -->
      <div class="hidden lg:flex items-center justify-center">
        <div class="relative w-full max-w-md">
          <!-- Main charger card -->
          <div class="glass rounded-3xl p-8 animate-float" style="box-shadow: var(--glow-md);">
            <div class="scanline-overlay rounded-3xl"></div>

            <!-- Charger graphic -->
            <div class="flex justify-center mb-6">
              <div class="w-32 h-48 rounded-2xl flex flex-col items-center justify-center gap-4 relative"
                   style="background: linear-gradient(160deg, #0c1929, #091525); border: 2px solid rgba(34,211,238,.3); box-shadow: var(--glow-md);">
                <!-- Power icon -->
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
                <!-- LED row -->
                <div class="flex gap-1.5">
                  <div class="w-2 h-2 rounded-full animate-pulse-cyan" style="background:#22d3ee;"></div>
                  <div class="w-2 h-2 rounded-full animate-pulse-cyan" style="background:#22d3ee; animation-delay:.3s;"></div>
                  <div class="w-2 h-2 rounded-full animate-pulse-cyan" style="background:#22d3ee; animation-delay:.6s;"></div>
                </div>
                <!-- Label -->
                <div class="text-center">
                  <div class="text-xs font-bold text-cyan-400">7.4 kW</div>
                  <div class="text-[10px] text-gray-500">AC Type 2</div>
                </div>
                <!-- Cable stub -->
                <div class="absolute -bottom-6 w-1 h-6 rounded-full" style="background: rgba(34,211,238,.4);"></div>
              </div>
            </div>

            <!-- Status info -->
            <div class="mt-6 space-y-3">
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-400">Status</span>
                <span class="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> ONLINE
                </span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-400">Power Delivered</span>
                <span class="text-white font-semibold">7.2 kW</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-400">Session Energy</span>
                <span class="text-cyan-400 font-semibold">18.4 kWh</span>
              </div>
              <!-- Progress bar -->
              <div class="mt-2">
                <div class="flex justify-between text-xs text-gray-500 mb-1.5">
                  <span>Battery SOC</span><span>73%</span>
                </div>
                <div class="h-2 rounded-full overflow-hidden" style="background:rgba(255,255,255,.08);">
                  <div class="h-full rounded-full animate-pulse-cyan"
                       style="width:73%; background: linear-gradient(90deg, #0e7490, #22d3ee);"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Floating mini-badges -->
          <div class="absolute -top-4 -right-4 glass rounded-xl px-3 py-2 text-xs font-bold text-cyan-400"
               style="box-shadow: var(--glow-sm);">
            ✓ OCPP 2.0.1
          </div>
          <div class="absolute -bottom-4 -left-4 glass rounded-xl px-3 py-2 text-xs font-bold text-emerald-400"
               style="box-shadow: 0 0 12px rgba(16,185,129,.3);">
            🌱 Zero Carbon
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 text-xs">
      <span>Scroll to explore</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="animate-bounce">
        <path d="M6 9l6 6 6-6"/>
      </svg>
    </div>
  `;

  // Wire CTAs
  requestAnimationFrame(() => {
    section.querySelector('#hero-consult-btn')?.addEventListener('click', () => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    });
    section.querySelector('#hero-portal-btn')?.addEventListener('click', () => onCTA('portal'));
  });

  return section;
};
