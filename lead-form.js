// ─── Lead Capture / Consultation Form ─────────────────────────────────────────
window.renderLeadForm = function() {
  const section = document.createElement('section');
  section.id = 'contact';
  section.className = 'py-24 relative';

  section.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-start">

      <!-- Left copy -->
      <div class="animate-fadeInUp">
        <div class="section-label mb-3">Get In Touch</div>
        <h2 class="text-3xl sm:text-4xl font-bold text-white leading-tight">
          Book a Free<br/>
          <span style="background: linear-gradient(135deg, #22d3ee, #0284c7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
            EV Infrastructure
          </span><br/>
          Consultation
        </h2>
        <p class="text-gray-400 mt-5 leading-relaxed">
          Our certified energy engineers will assess your site, recommend the right charging mix, and provide a no-obligation proposal within 48 hours.
        </p>

        <!-- Process steps -->
        <div class="mt-10 space-y-6">
          ${[
            ['01', 'Submit Your Enquiry', 'Fill out the form with your site details and requirements.'],
            ['02', 'Site Assessment', 'Our team visits or conducts a virtual survey of your electrical infrastructure.'],
            ['03', 'Proposal & Pricing', 'Receive a detailed proposal with hardware specs, timeline, and ROI analysis.'],
            ['04', 'Installation & Go-Live', 'Certified installation with OCPP onboarding and staff training included.']
          ].map(([num, title, desc]) => `
            <div class="flex gap-4">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold text-cyan-400"
                   style="background: rgba(34,211,238,.1); border: 1px solid rgba(34,211,238,.2);">
                ${num}
              </div>
              <div>
                <div class="font-semibold text-white text-sm">${title}</div>
                <div class="text-gray-500 text-sm mt-0.5">${desc}</div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Contact info tiles -->
        <div class="grid grid-cols-2 gap-3 mt-10">
          ${[
            ['📧', 'Email', 'info@ecogridenergy.in'],
            ['📞', 'Phone', '+91 98765 43210'],
            ['📍', 'Location', 'Mumbai, Maharashtra'],
            ['🕐', 'Response Time', 'Within 24 hours']
          ].map(([icon, label, val]) => `
            <div class="glass rounded-xl p-3">
              <div class="text-xs text-gray-500">${icon} ${label}</div>
              <div class="text-sm font-medium text-gray-200 mt-0.5">${val}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Right: Form -->
      <div class="glass rounded-2xl p-8 animate-fadeInUp delay-200" style="border-color: rgba(34,211,238,.15);">
        <h3 class="text-xl font-bold text-white mb-6">Request a Consultation</h3>

        <form id="lead-form" class="space-y-4" novalidate>

          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-400 mb-1.5">Full Name *</label>
              <input type="text" class="input-field" placeholder="Rajesh Kumar" required id="lf-name"/>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-400 mb-1.5">Company / Organisation</label>
              <input type="text" class="input-field" placeholder="Acme Pvt. Ltd."/>
            </div>
          </div>

          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-400 mb-1.5">Email Address *</label>
              <input type="email" class="input-field" placeholder="name@company.com" required id="lf-email"/>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-400 mb-1.5">Phone Number *</label>
              <input type="tel" class="input-field" placeholder="+91 98765 00000" required id="lf-phone"/>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-400 mb-1.5">Solution of Interest *</label>
            <select class="input-field" required id="lf-solution">
              <option value="">Select a solution...</option>
              <option>EV Charging Infrastructure</option>
              <option>Solar Integration</option>
              <option>Portable Emergency Backup</option>
              <option>EV Dealership Setup</option>
              <option>Integrated (Multiple Solutions)</option>
            </select>
          </div>

          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-400 mb-1.5">Site Type</label>
              <select class="input-field">
                <option>Residential Complex</option>
                <option>Commercial Building</option>
                <option>Industrial / Warehouse</option>
                <option>Retail / Mall</option>
                <option>Hotel / Hospitality</option>
                <option>EV Dealership</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-400 mb-1.5">Number of Chargers Needed</label>
              <select class="input-field">
                <option>1–5</option>
                <option>6–20</option>
                <option>21–50</option>
                <option>50+</option>
                <option>Not sure yet</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-400 mb-1.5">Site Location / City</label>
            <input type="text" class="input-field" placeholder="e.g. Andheri, Mumbai, Maharashtra"/>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-400 mb-1.5">Additional Requirements</label>
            <textarea class="input-field" rows="3" placeholder="Tell us about your timeline, existing electrical capacity, specific charger models, or any other requirements..."
                      style="resize: vertical;"></textarea>
          </div>

          <!-- Consent -->
          <div class="flex items-start gap-3">
            <input type="checkbox" id="lf-consent"
                   class="mt-0.5 rounded accent-cyan-500"
                   style="width:16px; height:16px; flex-shrink:0;" required/>
            <label for="lf-consent" class="text-xs text-gray-500 leading-relaxed">
              I agree to be contacted by EcoGrid Energy regarding my enquiry. We never share your data with third parties.
            </label>
          </div>

          <!-- Submit -->
          <button type="submit" class="btn-cyan w-full py-3 text-base mt-2" id="lf-submit">
            Send Enquiry →
          </button>

          <!-- Success message (hidden) -->
          <div id="lf-success" class="hidden text-center py-4">
            <div class="text-3xl mb-2">✅</div>
            <div class="text-emerald-400 font-bold">Enquiry Received!</div>
            <div class="text-gray-400 text-sm mt-1">We'll get back to you within 24 hours.</div>
          </div>

        </form>
      </div>
    </div>
  `;

  // Wire form submission
  requestAnimationFrame(() => {
    const form = section.querySelector('#lead-form');
    const successBox = section.querySelector('#lf-success');

    form?.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.querySelector('#lf-name').value.trim();
      const email = form.querySelector('#lf-email').value.trim();
      const phone = form.querySelector('#lf-phone').value.trim();
      const solution = form.querySelector('#lf-solution').value;
      const consent = form.querySelector('#lf-consent').checked;

      if (!name || !email || !phone || !solution || !consent) {
        const btn = form.querySelector('#lf-submit');
        btn.textContent = 'Please fill all required fields';
        btn.style.background = 'linear-gradient(135deg,#dc2626,#b91c1c)';
        setTimeout(() => {
          btn.textContent = 'Send Enquiry →';
          btn.style.background = '';
        }, 2500);
        return;
      }

      // Simulate submission
      const btn = form.querySelector('#lf-submit');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(() => {
        form.querySelectorAll('input, select, textarea, button').forEach(el => {
          el.style.display = 'none';
        });
        successBox.classList.remove('hidden');
      }, 1200);
    });
  });

  return section;
};
