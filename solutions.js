// ─── Solutions Portfolio Component ────────────────────────────────────────────
window.renderSolutions = function() {
  const section = document.createElement('section');
  section.id = 'solutions';
  section.className = 'py-24 relative';

  const cards = [
    {
      id: 'ev',
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
      iconColor: '#22d3ee',
      iconBg: 'rgba(34,211,238,.12)',
      title: 'EV Charging Infrastructure',
      statusLabel: 'Active',
      statusClass: 'status-active',
      desc: 'Commercial and residential EV charging solutions. AC Level 1/2 and DC Fast Chargers with OCPP 2.0.1, dynamic load management, and remote diagnostics.',
      features: ['AC 3.3–22 kW', 'DC 30–150 kW', 'OCPP 2.0.1', 'App + RFID access', 'Dynamic load balancing'],
      gradient: 'linear-gradient(135deg, rgba(34,211,238,.08), rgba(6,182,212,.04))',
      accentColor: '#22d3ee',
    },
    {
      id: 'solar',
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
      iconColor: '#fbbf24',
      iconBg: 'rgba(251,191,36,.1)',
      title: 'Solar Integration',
      statusLabel: 'Next Phase',
      statusClass: 'status-next',
      desc: 'On-grid and off-grid solar systems integrated with EV charging stations. Smart energy routing maximizes solar self-consumption and reduces grid dependency.',
      features: ['Rooftop & carport solar', 'Solar-to-EV routing', 'BESS integration', 'Net metering support', 'Energy analytics'],
      gradient: 'linear-gradient(135deg, rgba(251,191,36,.06), rgba(245,158,11,.03))',
      accentColor: '#fbbf24',
    },
    {
      id: 'backup',
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="6" width="22" height="14" rx="2"/><path d="M7 6V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2"/><line x1="12" y1="11" x2="12" y2="15"/><line x1="10" y1="13" x2="14" y2="13"/></svg>`,
      iconColor: '#34d399',
      iconBg: 'rgba(52,211,153,.1)',
      title: 'Portable Emergency Backup',
      statusLabel: 'Active',
      statusClass: 'status-active',
      desc: 'Mobile battery units and UPS systems for critical loads. Bidirectional V2G-ready power banks that can charge vehicles and power essential circuits during outages.',
      features: ['5–30 kWh portable BESS', 'V2G / V2L capable', 'Auto-switchover <20ms', 'LFP battery chemistry', 'IP65 outdoor rated'],
      gradient: 'linear-gradient(135deg, rgba(52,211,153,.07), rgba(16,185,129,.03))',
      accentColor: '#34d399',
    },
    {
      id: 'dealerships',
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
      iconColor: '#a78bfa',
      iconBg: 'rgba(167,139,250,.1)',
      title: 'EV Dealerships',
      statusLabel: 'Coming Soon',
      statusClass: 'status-coming',
      desc: 'Turnkey charging infrastructure for EV dealerships — customer-facing fast chargers, service bay AC chargers, test-drive fleet management, and branded experience portals.',
      features: ['Showroom DC chargers', 'Fleet bay charging', 'Customer CRM integration', 'Branded portal', 'Revenue sharing model'],
      gradient: 'linear-gradient(135deg, rgba(167,139,250,.06), rgba(139,92,246,.03))',
      accentColor: '#a78bfa',
    }
  ];

  section.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6">

      <!-- Section header -->
      <div class="text-center mb-16 animate-fadeInUp">
        <div class="section-label mb-3">What We Do</div>
        <h2 class="text-3xl sm:text-4xl font-bold text-white">Solutions Portfolio</h2>
        <p class="mt-4 text-gray-400 max-w-xl mx-auto">
          End-to-end clean energy infrastructure from charging hardware to software management platforms.
        </p>
      </div>

      <!-- Cards grid -->
      <div class="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
        ${cards.map((c, i) => `
          <div class="solution-card animate-fadeInUp" style="background: ${c.gradient}; animation-delay: ${i * 0.1}s; opacity: 0;" id="sol-card-${c.id}">

            <!-- Top row: icon + status -->
            <div class="flex items-start justify-between mb-5">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                   style="background: ${c.iconBg}; color: ${c.iconColor}; border: 1px solid ${c.iconColor}22; box-shadow: 0 0 12px ${c.iconColor}22;">
                ${c.icon}
              </div>
              <span class="status-badge ${c.statusClass}">${c.statusLabel}</span>
            </div>

            <!-- Title -->
            <h3 class="text-base font-bold text-white leading-snug mb-3">${c.title}</h3>

            <!-- Description -->
            <p class="text-gray-400 text-sm leading-relaxed mb-5">${c.desc}</p>

            <!-- Features list -->
            <ul class="space-y-1.5 mb-6">
              ${c.features.map(f => `
                <li class="flex items-center gap-2 text-xs text-gray-300">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${c.accentColor}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  ${f}
                </li>
              `).join('')}
            </ul>

            <!-- CTA -->
            <button class="w-full py-2 rounded-lg text-xs font-semibold transition-all"
                    style="background: ${c.accentColor}14; border: 1px solid ${c.accentColor}33; color: ${c.accentColor};"
                    onmouseover="this.style.background='${c.accentColor}22'"
                    onmouseout="this.style.background='${c.accentColor}14'">
              ${c.statusLabel === 'Coming Soon' ? 'Join Waitlist →' : 'Learn More →'}
            </button>
          </div>
        `).join('')}
      </div>

      <!-- Bottom callout -->
      <div class="mt-16 glass rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 animate-fadeInUp"
           style="background: rgba(34,211,238,.04); border-color: rgba(34,211,238,.15);">
        <div>
          <h3 class="text-xl font-bold text-white">Ready to electrify your site?</h3>
          <p class="text-gray-400 text-sm mt-1">Get a customised feasibility report and ROI estimate — free of charge.</p>
        </div>
        <a href="#contact">
          <button class="btn-cyan flex-shrink-0 px-6 py-3">Schedule a Site Survey</button>
        </a>
      </div>
    </div>
  `;

  return section;
};
