// ─── App Orchestrator ─────────────────────────────────────────────────────────
(function() {
  'use strict';

  // ── State ──────────────────────────────────────────────────────────────────
  let currentView = 'public'; // 'public' | 'portal'

  const app = document.getElementById('app');

  // ── Render helpers ─────────────────────────────────────────────────────────
  function clearMain() {
    const existing = document.getElementById('main-content');
    if (existing) existing.remove();
  }

  function renderPublicView() {
    clearMain();

    const main = document.createElement('main');
    main.id = 'main-content';

    // Hero
    main.appendChild(window.renderHero(switchTo));

    // Solutions
    main.appendChild(window.renderSolutions());

    // Divider
    const div = document.createElement('div');
    div.className = 'max-w-7xl mx-auto px-4 sm:px-6';
    div.innerHTML = `<hr style="border-color: var(--border);" id="solar"/>`;
    main.appendChild(div);

    // Lead form
    main.appendChild(window.renderLeadForm());

    // Footer
    const footer = document.createElement('footer');
    footer.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t" style="border-color: var(--border);">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

          <div>
            <div class="flex items-center gap-2 mb-4">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center"
                   style="background: linear-gradient(135deg,#06b6d4,#0284c7);">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
              <span class="font-bold text-white">EcoGrid Energy</span>
            </div>
            <p class="text-xs text-gray-500 leading-relaxed">
              Authorized Channel Partner for EV Eco Plug. Delivering clean energy infrastructure across India.
            </p>
            <div class="flex gap-3 mt-4">
              ${['LinkedIn', 'Twitter', 'YouTube'].map(s => `
                <a href="#" class="text-gray-600 hover:text-cyan-400 text-xs transition-colors">${s}</a>
              `).join('')}
            </div>
          </div>

          ${[
            ['Solutions', ['EV Charging', 'Solar Integration', 'Emergency Backup', 'EV Dealerships']],
            ['Company', ['About Us', 'Careers', 'Blog', 'Case Studies']],
            ['Support', ['Client Portal', 'Documentation', 'OCPP Guide', 'Contact Us']]
          ].map(([title, links]) => `
            <div>
              <h4 class="text-xs font-bold text-gray-300 uppercase tracking-widest mb-4">${title}</h4>
              <ul class="space-y-2">
                ${links.map(l => `<li><a href="#" class="text-xs text-gray-500 hover:text-cyan-400 transition-colors">${l}</a></li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>

        <div class="flex flex-col sm:flex-row justify-between items-center mt-10 pt-6 border-t gap-4" style="border-color: var(--border);">
          <p class="text-xs text-gray-600">© 2024 EcoGrid Energy Pvt. Ltd. All rights reserved.</p>
          <div class="flex gap-4">
            <a href="#" class="text-xs text-gray-600 hover:text-gray-400">Privacy Policy</a>
            <a href="#" class="text-xs text-gray-600 hover:text-gray-400">Terms of Service</a>
            <a href="#" class="text-xs text-gray-600 hover:text-gray-400">OCPP Compliance</a>
          </div>
        </div>
      </div>
    `;
    main.appendChild(footer);

    app.appendChild(main);
  }

  function renderPortalView() {
    clearMain();

    const main = document.createElement('main');
    main.id = 'main-content';
    main.style.paddingTop = '4rem'; // account for fixed navbar

    // Portal login gating (simple toggle — no real auth)
    const loginGate = document.createElement('div');
    loginGate.id = 'portal-gate';
    loginGate.innerHTML = `
      <div class="min-h-screen flex items-center justify-center px-4 py-20"
           style="background: radial-gradient(ellipse 60% 40% at 50% 20%, rgba(6,182,212,.08) 0%, transparent 70%);">
        <div class="w-full max-w-sm">
          <div class="text-center mb-8">
            <div class="inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-4 animate-pulse-cyan"
                 style="background: linear-gradient(135deg,#0e7490,#0284c7);">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <h2 class="text-2xl font-bold text-white">Client Portal</h2>
            <p class="text-gray-400 text-sm mt-1">Sign in to manage your EV assets</p>
          </div>

          <div class="glass rounded-2xl p-8" style="border-color: rgba(34,211,238,.2);">
            <form id="login-form" class="space-y-4" novalidate>
              <div>
                <label class="block text-xs font-semibold text-gray-400 mb-1.5">Email Address</label>
                <input type="email" class="input-field" placeholder="rajesh@company.com" id="login-email" value="rajesh@ecogrid.in"/>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 mb-1.5">Password</label>
                <input type="password" class="input-field" placeholder="••••••••" id="login-pass" value="demo1234"/>
              </div>
              <div class="flex justify-between text-xs">
                <label class="flex items-center gap-2 text-gray-500 cursor-pointer">
                  <input type="checkbox" checked class="accent-cyan-500"/> Remember me
                </label>
                <a href="#" class="text-cyan-400 hover:text-cyan-300">Forgot password?</a>
              </div>
              <button type="submit" class="btn-cyan w-full py-3">Sign In to Portal</button>
              <div id="login-hint" class="text-center text-xs text-gray-600">
                Demo credentials are pre-filled — just click Sign In ✓
              </div>
            </form>
          </div>

          <div class="text-center mt-4">
            <button class="text-xs text-gray-500 hover:text-cyan-400 transition-colors" id="back-to-public">
              ← Back to Public Site
            </button>
          </div>
        </div>
      </div>
    `;
    main.appendChild(loginGate);

    // Wire login form
    loginGate.querySelector('#login-form').addEventListener('submit', e => {
      e.preventDefault();
      const btn = loginGate.querySelector('[type="submit"]');
      btn.textContent = 'Signing in…';
      btn.disabled = true;

      setTimeout(() => {
        loginGate.remove();
        main.appendChild(window.renderDashboard());
      }, 1000);
    });

    loginGate.querySelector('#back-to-public')?.addEventListener('click', () => switchTo('public'));

    app.appendChild(main);
  }

  // ── View switching ─────────────────────────────────────────────────────────
  function switchTo(view) {
    currentView = view;
    rebuildNavbar();

    if (view === 'public') {
      renderPublicView();
    } else {
      renderPortalView();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Navbar ─────────────────────────────────────────────────────────────────
  let navbar = null;

  function rebuildNavbar() {
    if (navbar) navbar.remove();
    navbar = window.renderNavbar(currentView, switchTo);
    document.body.insertBefore(navbar, app);
  }

  // ── Chatbot ────────────────────────────────────────────────────────────────
  function mountChatbot() {
    const existing = document.getElementById('chatbot-fab');
    if (existing) existing.remove();

    const chatbot = window.renderChatbot(() => {
      // On "Raise OEM ticket" from chatbot
      if (currentView !== 'portal') {
        switchTo('portal');
      }
      // After login, switch to new-ticket tab
      setTimeout(() => {
        const newTicketBtn = document.querySelector('[data-tab="new-ticket"]');
        if (newTicketBtn) newTicketBtn.click();
        else {
          // If still on login, remember intent
          sessionStorage.setItem('postLoginTab', 'new-ticket');
        }
      }, 1500);
    });

    document.body.appendChild(chatbot);
  }

  // ── Intersection Observer for animations ───────────────────────────────────
  function setupScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    // Re-run on DOM changes
    const mo = new MutationObserver(() => {
      document.querySelectorAll('.animate-fadeInUp[style*="opacity: 0"], .animate-fadeInUp[style*="opacity:0"]').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  // ── Init ───────────────────────────────────────────────────────────────────
  function init() {
    rebuildNavbar();
    renderPublicView();
    mountChatbot();
    setupScrollAnimations();

    // Tailwind custom config
    if (window.tailwind) {
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              cyan: {
                50:  '#ecfeff', 100: '#cffafe', 200: '#a5f3fc',
                300: '#67e8f9', 400: '#22d3ee', 500: '#06b6d4',
                600: '#0891b2', 700: '#0e7490', 800: '#155e75', 900: '#164e63'
              }
            }
          }
        }
      };
    }
  }

  // Boot when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
