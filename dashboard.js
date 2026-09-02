// ─── Client Dashboard Component ───────────────────────────────────────────────
window.renderDashboard = function() {
  const section = document.createElement('section');
  section.id = 'dashboard';
  section.className = 'py-10 min-h-screen relative';

  const assets = window.mockData.assets;
  const tickets = window.mockData.tickets;

  // ── Warranty helpers ────────────────────────────────────────────────────────
  function warrantyPct(asset) {
    const installed = new Date(asset.installed);
    const expiry    = new Date(asset.warrantyExpiry);
    const now       = new Date();
    const total = expiry - installed;
    const elapsed = Math.min(now - installed, total);
    const pct = Math.max(0, Math.round((1 - elapsed / total) * 100));
    return pct;
  }
  function warrantyColor(pct) {
    if (pct > 60) return '#22d3ee';
    if (pct > 25) return '#fbbf24';
    return '#f87171';
  }
  function daysLeft(expiry) {
    const ms = new Date(expiry) - new Date();
    return Math.max(0, Math.ceil(ms / 86400000));
  }

  // ── Status helpers ──────────────────────────────────────────────────────────
  function ticketStatusBadge(status) {
    const map = {
      received: 'status-badge status-next',
      escalated: 'status-badge status-coming',
      resolved: 'status-badge status-active'
    };
    const labels = { received:'Received', escalated:'OEM Escalated', resolved:'Resolved' };
    return `<span class="${map[status] || 'status-badge status-next'}">${labels[status] || status}</span>`;
  }

  section.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6">

      <!-- Dashboard Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div class="section-label mb-1">Client Portal</div>
          <h2 class="text-2xl font-bold text-white">Welcome back, Rajesh K.</h2>
          <p class="text-gray-500 text-sm mt-0.5">Account #ECGRD-2024-0042 · Mumbai Site A &amp; B</p>
        </div>
        <div class="flex items-center gap-3">
          <div class="glass rounded-xl px-4 py-2.5 text-sm">
            <span class="text-gray-500">Last login:</span>
            <span class="text-gray-200 ml-1.5">Today, 4:12 PM</span>
          </div>
          <button class="btn-ghost text-sm">⚙ Settings</button>
        </div>
      </div>

      <!-- Summary Stats -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        ${[
          ['3', 'Installed Assets', '#22d3ee', '⚡'],
          ['142', 'Total Sessions', '#34d399', '🔌'],
          ['7,307 kWh', 'Energy Delivered', '#fbbf24', '📊'],
          ['2', 'Open Tickets', '#a78bfa', '🎫']
        ].map(([val, label, color, icon]) => `
          <div class="glass rounded-xl p-4 glow-border">
            <div class="text-xl mb-1">${icon}</div>
            <div class="text-2xl font-bold" style="color: ${color}">${val}</div>
            <div class="text-xs text-gray-500 mt-0.5">${label}</div>
          </div>
        `).join('')}
      </div>

      <!-- Dashboard tabs -->
      <div class="flex gap-2 mb-8 flex-wrap" id="dash-tabs">
        <button class="tab-btn active" data-tab="assets">🔌 My Assets</button>
        <button class="tab-btn" data-tab="tickets">🎫 Support Tickets</button>
        <button class="tab-btn" data-tab="new-ticket">➕ New Ticket</button>
      </div>

      <!-- Tab content -->
      <div id="dash-content"></div>
    </div>
  `;

  // ── Render tab content ──────────────────────────────────────────────────────
  function renderAssets() {
    return `
      <div class="space-y-5">
        ${assets.map(asset => {
          const wpct = warrantyPct(asset);
          const wcolor = warrantyColor(wpct);
          const dl = daysLeft(asset.warrantyExpiry);
          return `
          <div class="asset-card animate-fadeIn">
            <div class="flex flex-col lg:flex-row lg:items-start gap-6">

              <!-- Left: icon + identity -->
              <div class="flex items-start gap-4 min-w-0">
                <div class="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                     style="background: rgba(34,211,238,.08); border: 1px solid rgba(34,211,238,.2);">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
                <div class="min-w-0">
                  <div class="flex items-center gap-2 flex-wrap">
                    <h3 class="font-bold text-white text-base">${asset.name}</h3>
                    <span class="status-badge ${asset.status === 'online' ? 'status-active' : 'status-coming'} text-xs">
                      ${asset.status === 'online' ? '● Online' : '● Offline'}
                    </span>
                  </div>
                  <div class="text-xs text-gray-500 mt-1">ID: <span class="text-gray-300 font-mono">${asset.id}</span></div>
                  <div class="text-xs text-gray-500">S/N: <span class="text-gray-300 font-mono">${asset.serial}</span></div>
                  <div class="text-xs text-gray-500 mt-0.5">📍 ${asset.location}</div>
                </div>
              </div>

              <!-- Middle: specs grid -->
              <div class="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
                ${Object.entries(asset.specs).map(([k, v]) => `
                  <div class="bg-white/[0.03] rounded-lg p-2.5 border border-white/5">
                    <div class="text-[10px] text-gray-500 uppercase tracking-wider">${k.replace(/([A-Z])/g,' $1').trim()}</div>
                    <div class="text-sm font-semibold text-white mt-0.5">${v}</div>
                  </div>
                `).join('')}
              </div>

              <!-- Right: warranty + meta -->
              <div class="lg:w-52 flex-shrink-0 space-y-3">
                <div>
                  <div class="flex justify-between text-xs mb-1.5">
                    <span class="text-gray-500">Warranty remaining</span>
                    <span class="font-semibold" style="color:${wcolor}">${wpct}%</span>
                  </div>
                  <div class="warranty-bar">
                    <div class="warranty-fill" style="width:${wpct}%; background: linear-gradient(90deg, ${wcolor}99, ${wcolor});"></div>
                  </div>
                  <div class="text-[10px] text-gray-600 mt-1">${dl} days · Expires ${asset.warrantyExpiry}</div>
                </div>
                <div class="flex justify-between text-xs">
                  <span class="text-gray-500">Firmware</span>
                  <span class="text-gray-200 font-mono">${asset.firmware}</span>
                </div>
                <div class="flex justify-between text-xs">
                  <span class="text-gray-500">Sessions</span>
                  <span class="text-gray-200">${asset.sessions}</span>
                </div>
                <div class="flex justify-between text-xs">
                  <span class="text-gray-500">Energy Delivered</span>
                  <span class="text-cyan-400 font-semibold">${asset.energyDelivered}</span>
                </div>
                <div class="flex gap-2 pt-2">
                  <button class="flex-1 text-xs py-1.5 rounded-lg font-medium transition-all"
                          style="background:rgba(34,211,238,.08); border:1px solid rgba(34,211,238,.2); color:#22d3ee;"
                          onmouseover="this.style.background='rgba(34,211,238,.15)'"
                          onmouseout="this.style.background='rgba(34,211,238,.08)'">
                    Diagnostics
                  </button>
                  <button class="flex-1 text-xs py-1.5 rounded-lg font-medium transition-all"
                          style="background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08); color:#9ca3af;"
                          onmouseover="this.style.background='rgba(255,255,255,.08)'"
                          onmouseout="this.style.background='rgba(255,255,255,.04)'">
                    History
                  </button>
                </div>
              </div>
            </div>
          </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderTickets() {
    return `
      <div class="space-y-6">
        ${tickets.map(t => `
          <div class="glass rounded-2xl p-6 animate-fadeIn" style="border-color: rgba(34,211,238,.12);">
            <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="font-mono text-cyan-400 font-bold text-sm">${t.id}</span>
                  ${ticketStatusBadge(t.status)}
                </div>
                <h3 class="font-semibold text-white mt-1">${t.category}</h3>
                <p class="text-gray-400 text-sm mt-1 max-w-lg">${t.description}</p>
              </div>
              <div class="text-right flex-shrink-0 text-xs text-gray-500">
                <div>Asset: <span class="text-gray-300 font-medium">${t.assetName}</span></div>
                <div class="mt-0.5">Created: ${t.created}</div>
              </div>
            </div>

            <!-- Timeline -->
            <div class="space-y-4 mt-4 pt-4 border-t" style="border-color: rgba(255,255,255,.06);">
              <div class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Status Timeline</div>
              ${t.steps.map((s, idx) => {
                const isLast = idx === t.steps.length - 1;
                let dotClass = s.done ? (s.inprog ? 'inprog' : 'done') : 'pend';
                return `
                <div class="ticket-step ${s.done && !s.inprog ? 'done' : ''}" ${isLast ? '' : ''}>
                  <div class="step-dot ${dotClass}">${s.done ? (s.inprog ? '●' : '✓') : idx + 1}</div>
                  <div class="pt-0.5 pb-4">
                    <div class="text-sm font-semibold ${s.done ? 'text-white' : 'text-gray-600'}">${s.label}</div>
                    <div class="text-xs ${s.done ? 'text-gray-400' : 'text-gray-700'} mt-0.5">${s.time || 'Pending'}</div>
                  </div>
                </div>
              `}).join('')}
            </div>

            ${t.resolution ? `
              <div class="mt-3 rounded-xl px-4 py-3 text-sm"
                   style="background: rgba(16,185,129,.08); border: 1px solid rgba(16,185,129,.2);">
                <span class="text-emerald-400 font-semibold">Resolution: </span>
                <span class="text-gray-300">${t.resolution}</span>
              </div>
            ` : `
              <div class="mt-3 flex gap-3 flex-wrap">
                <button class="btn-ghost text-xs px-3 py-1.5">📎 Add Attachment</button>
                <button class="btn-ghost text-xs px-3 py-1.5">💬 Add Comment</button>
              </div>
            `}
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderNewTicket() {
    return `
      <div class="max-w-2xl animate-fadeIn">
        <div class="glass rounded-2xl p-8" style="border-color: rgba(34,211,238,.15);">
          <h3 class="text-xl font-bold text-white mb-6">Create Support Ticket</h3>

          <form id="ticket-form" class="space-y-5">

            <div>
              <label class="block text-xs font-semibold text-gray-400 mb-1.5">Asset *</label>
              <select class="input-field" required id="tk-asset">
                <option value="">Select an installed asset...</option>
                ${assets.map(a => `<option value="${a.id}">${a.name} — ${a.id}</option>`).join('')}
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-gray-400 mb-1.5">Issue Category *</label>
              <select class="input-field" required id="tk-category">
                <option value="">Select issue type...</option>
                <option>Connectivity Issue</option>
                <option>Charging Session Failure</option>
                <option>Billing / Meter Issue</option>
                <option>Hardware Damage</option>
                <option>Firmware / Software Error</option>
                <option>LED / Display Fault</option>
                <option>Cable or Connector Issue</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-gray-400 mb-1.5">Issue Description *</label>
              <textarea class="input-field" rows="4" required id="tk-desc"
                        placeholder="Describe the issue in detail — include LED colour, error codes, when it started, and steps already tried..."></textarea>
            </div>

            <div>
              <label class="block text-xs font-semibold text-gray-400 mb-1.5">Severity</label>
              <div class="grid grid-cols-3 gap-2">
                ${[['Low','🟢','Minor inconvenience'],['Medium','🟡','Charging disrupted'],['High','🔴','Site-critical / safety']].map(([level, dot, hint]) => `
                  <label class="cursor-pointer">
                    <input type="radio" name="severity" value="${level}" class="sr-only" ${level === 'Medium' ? 'checked' : ''}/>
                    <div class="sev-opt text-center p-2.5 rounded-lg border transition-all text-xs font-medium"
                         style="background: rgba(255,255,255,.03); border-color: rgba(255,255,255,.08); color: #6b7280;"
                         data-level="${level}">
                      <div class="text-lg mb-0.5">${dot}</div>
                      <div>${level}</div>
                      <div class="text-[10px] opacity-60 mt-0.5">${hint}</div>
                    </div>
                  </label>
                `).join('')}
              </div>
            </div>

            <!-- File upload -->
            <div>
              <label class="block text-xs font-semibold text-gray-400 mb-1.5">Attach Files (optional)</label>
              <label class="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed cursor-pointer transition-all hover:border-cyan-500/40"
                     style="border-color: rgba(34,211,238,.18); background: rgba(34,211,238,.02);">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" stroke-width="1.8" stroke-linecap="round" class="mb-2 opacity-60">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <div class="text-xs text-gray-500">Drop files here or <span class="text-cyan-400">browse</span></div>
                <div class="text-[10px] text-gray-600 mt-1">PNG, JPG, PDF, MP4 — Max 25MB</div>
                <input type="file" class="sr-only" id="tk-file" multiple accept="image/*,video/*,.pdf"/>
              </label>
              <div id="tk-file-list" class="mt-2 space-y-1 text-xs text-gray-500"></div>
            </div>

            <div class="flex gap-3 pt-2">
              <button type="submit" class="btn-cyan flex-1 py-3">Submit Ticket</button>
              <button type="button" class="btn-ghost px-5" id="tk-cancel">Cancel</button>
            </div>

            <!-- Success message -->
            <div id="tk-success" class="hidden rounded-xl p-4 text-center"
                 style="background: rgba(16,185,129,.08); border: 1px solid rgba(16,185,129,.25);">
              <div class="text-2xl mb-1">🎫</div>
              <div class="text-emerald-400 font-bold">Ticket Created!</div>
              <div class="text-gray-400 text-sm mt-1">Your ticket has been logged. Our team will respond within 4 business hours.</div>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  // ── Tab switching ───────────────────────────────────────────────────────────
  function switchTab(tab) {
    const btns = section.querySelectorAll('.tab-btn');
    btns.forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tab);
    });
    const content = section.querySelector('#dash-content');
    if (tab === 'assets') content.innerHTML = renderAssets();
    else if (tab === 'tickets') content.innerHTML = renderTickets();
    else if (tab === 'new-ticket') {
      content.innerHTML = renderNewTicket();
      wireNewTicketForm(content);
    }
  }

  function wireNewTicketForm(ctx) {
    // File list preview
    ctx.querySelector('#tk-file')?.addEventListener('change', function() {
      const list = ctx.querySelector('#tk-file-list');
      list.innerHTML = [...this.files].map(f =>
        `<div class="flex items-center gap-1.5 text-gray-400">📎 <span>${f.name}</span> <span class="text-gray-600">(${(f.size/1024).toFixed(1)} KB)</span></div>`
      ).join('');
    });

    // Severity radio highlight
    ctx.querySelectorAll('input[name="severity"]').forEach(radio => {
      const update = () => {
        ctx.querySelectorAll('.sev-opt').forEach(opt => {
          const selected = ctx.querySelector(`input[name="severity"]:checked`)?.value;
          const isThis = opt.dataset.level === selected;
          opt.style.borderColor = isThis ? 'rgba(34,211,238,.5)' : 'rgba(255,255,255,.08)';
          opt.style.background  = isThis ? 'rgba(34,211,238,.08)' : 'rgba(255,255,255,.03)';
          opt.style.color       = isThis ? '#22d3ee' : '#6b7280';
        });
      };
      radio.addEventListener('change', update);
      update();
    });

    // Cancel
    ctx.querySelector('#tk-cancel')?.addEventListener('click', () => switchTab('tickets'));

    // Submit
    ctx.querySelector('#ticket-form')?.addEventListener('submit', e => {
      e.preventDefault();
      const asset    = ctx.querySelector('#tk-asset').value;
      const category = ctx.querySelector('#tk-category').value;
      const desc     = ctx.querySelector('#tk-desc').value.trim();

      if (!asset || !category || !desc) {
        alert('Please fill in all required fields.');
        return;
      }

      const btn = ctx.querySelector('[type="submit"]');
      btn.textContent = 'Submitting…';
      btn.disabled = true;

      setTimeout(() => {
        ctx.querySelector('#ticket-form').querySelectorAll('input, select, textarea, button, label[for]').forEach(el => el.style.display = 'none');
        ctx.querySelector('#tk-success').classList.remove('hidden');
      }, 1400);
    });
  }

  // ── Init ───────────────────────────────────────────────────────────────────
  requestAnimationFrame(() => {
    section.querySelector('#dash-tabs')?.addEventListener('click', e => {
      const btn = e.target.closest('.tab-btn');
      if (btn) switchTab(btn.dataset.tab);
    });
    // Default tab
    const content = section.querySelector('#dash-content');
    if (content) content.innerHTML = renderAssets();
  });

  return section;
};
