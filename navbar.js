// ─── Navbar Component ──────────────────────────────────────────────────────────
window.renderNavbar = function(currentView, onSwitch) {
  const nav = document.createElement('nav');
  nav.id = 'navbar';

  nav.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

      <!-- Brand -->
      <div class="flex items-center gap-2.5">
        <div class="w-9 h-9 rounded-xl flex items-center justify-center animate-pulse-cyan"
             style="background: linear-gradient(135deg,#06b6d4,#0284c7);">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
        </div>
        <div>
          <span class="font-bold text-white text-lg tracking-tight">EcoGrid</span>
          <span class="ml-1 text-cyan-400 text-lg">Energy</span>
        </div>
      </div>

      <!-- Desktop Nav Links -->
      <div class="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
        <a href="#solutions" class="hover:text-cyan-400 transition-colors">Solutions</a>
        <a href="#solar" class="hover:text-cyan-400 transition-colors">Solar</a>
        <a href="#ev" class="hover:text-cyan-400 transition-colors">EV Charging</a>
        <a href="#backup" class="hover:text-cyan-400 transition-colors">Backup Power</a>
        <a href="#contact" class="hover:text-cyan-400 transition-colors">Contact</a>
      </div>

      <!-- CTA Buttons -->
      <div class="hidden md:flex items-center gap-3">
        <button class="btn-ghost text-sm" id="nav-public-btn">Public View</button>
        <button class="btn-cyan text-sm" id="nav-portal-btn">
          <span class="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Client Portal
          </span>
        </button>
      </div>

      <!-- Mobile Hamburger -->
      <button class="md:hidden text-gray-400 hover:text-cyan-400" id="hamburger">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="hidden md:hidden glass border-t" style="border-color: var(--border);">
      <div class="flex flex-col gap-1 p-4">
        <a href="#solutions" class="text-gray-300 hover:text-cyan-400 py-2 px-3 rounded-lg hover:bg-white/5 transition-all text-sm">Solutions</a>
        <a href="#contact" class="text-gray-300 hover:text-cyan-400 py-2 px-3 rounded-lg hover:bg-white/5 transition-all text-sm">Contact</a>
        <button class="btn-ghost text-sm w-full mt-1" id="mob-public-btn">Public View</button>
        <button class="btn-cyan text-sm w-full" id="mob-portal-btn">Client Portal</button>
      </div>
    </div>
  `;

  // Wire events after insertion
  requestAnimationFrame(() => {
    const ham = nav.querySelector('#hamburger');
    const mob = nav.querySelector('#mobile-menu');
    if (ham && mob) ham.addEventListener('click', () => mob.classList.toggle('hidden'));

    nav.querySelector('#nav-portal-btn')?.addEventListener('click', () => onSwitch('portal'));
    nav.querySelector('#mob-portal-btn')?.addEventListener('click', () => onSwitch('portal'));
    nav.querySelector('#nav-public-btn')?.addEventListener('click', () => onSwitch('public'));
    nav.querySelector('#mob-public-btn')?.addEventListener('click', () => onSwitch('public'));

    // Highlight active tab
    if (currentView === 'portal') {
      nav.querySelector('#nav-portal-btn')?.classList.add('ring-2','ring-cyan-400/50');
    }
  });

  return nav;
};
