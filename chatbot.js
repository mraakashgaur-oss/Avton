// ─── EcoAssist AI Chatbot Widget ───────────────────────────────────────────────
window.renderChatbot = function(onCreateTicket) {
  const faq = window.mockData.chatFAQ;

  // ── Simple keyword matcher ──────────────────────────────────────────────────
  function getBotResponse(userMsg) {
    const lower = userMsg.toLowerCase();
    const matched = faq.find(entry => entry.triggers.some(t => lower.includes(t)));
    if (matched) return { text: matched.response, showTicketCTA: lower.includes('not working') || lower.includes('offline') || lower.includes('error') || lower.includes('fail') };

    // Greeting
    if (/^(hi|hello|hey|namaste|good).*/i.test(lower))
      return { text: "Hello! 👋 I'm **EcoAssist AI**, your EV charging expert.\n\nI can help with:\n• AC vs DC charging explained\n• kW / power levels guide\n• Phase loading & load balancing\n• OCPP protocol overview\n• Charger troubleshooting\n\nWhat would you like to know?" };

    // Ticket intent
    if (lower.includes('ticket') || lower.includes('support') || lower.includes('raise') || lower.includes('log'))
      return { text: "I can help you raise a support ticket right from here.\n\nClick the button below to log an issue with our support team — they'll respond within 4 business hours.", showTicketCTA: true };

    // Default
    return {
      text: "I'm not sure about that specific query. Here are topics I can help with:\n\n• Type `AC` or `DC` — charging types explained\n• Type `kW` — power levels guide\n• Type `phase` — phase loading & load management\n• Type `OCPP` — smart charging protocol\n• Type `offline` or `not working` — troubleshooting\n\nOr ask me anything about EV charging! ⚡"
    };
  }

  // ── Markdown renderer (minimal) ─────────────────────────────────────────────
  function renderMarkdown(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code style="background:rgba(34,211,238,.1);padding:.1em .35em;border-radius:4px;font-family:monospace;font-size:.85em;">$1</code>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>')
      .replace(/^• (.+)$/gm, '<span style="display:block;padding-left:1em;">• $1</span>')
      .replace(/\|(.+)\|/g, (_, row) => {
        const cells = row.split('|').map(c => c.trim());
        return `<tr>${cells.map(c => `<td style="padding:.2em .6em;border:1px solid rgba(34,211,238,.15);">${c}</td>`).join('')}</tr>`;
      });
  }

  // ── Suggested questions ─────────────────────────────────────────────────────
  const suggestions = [
    'What is AC vs DC charging?',
    'Explain kW power levels',
    'What is phase loading?',
    'Charger shows offline — help!',
    'What does OCPP mean?',
    'Warranty coverage?'
  ];

  // ── Build DOM ───────────────────────────────────────────────────────────────
  const fab = document.createElement('div');
  fab.id = 'chatbot-fab';

  fab.innerHTML = `
    <!-- Floating button -->
    <button class="chat-bubble" id="chat-toggle" aria-label="Open EcoAssist AI chat" title="EcoAssist AI">
      <svg id="chat-icon-open" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
      <svg id="chat-icon-close" class="hidden" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>

    <!-- Unread badge -->
    <div id="chat-badge" class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-[10px] text-white font-bold">1</div>

    <!-- Chat window -->
    <div class="chat-window hidden" id="chat-window">

      <!-- Header -->
      <div class="chat-header">
        <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
             style="background: rgba(255,255,255,.15);">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        </div>
        <div class="flex-1 min-w-0">
          <div class="font-bold text-white text-sm">EcoAssist AI</div>
          <div class="text-cyan-200 text-[11px]">EV Charging Expert · Always available</div>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span class="text-[10px] text-emerald-300">Live</span>
        </div>
      </div>

      <!-- Messages -->
      <div class="chat-messages" id="chat-messages">
        <!-- Welcome message injected by JS -->
      </div>

      <!-- Suggestions -->
      <div id="chat-suggestions" class="px-3 pb-2 flex flex-wrap gap-1.5">
        ${suggestions.map(s => `
          <button class="suggestion-pill text-[11px] px-2.5 py-1 rounded-full transition-all font-medium"
                  style="background:rgba(34,211,238,.08); border:1px solid rgba(34,211,238,.18); color:#22d3ee;"
                  onmouseover="this.style.background='rgba(34,211,238,.18)'"
                  onmouseout="this.style.background='rgba(34,211,238,.08)'">${s}</button>
        `).join('')}
      </div>

      <!-- Input row -->
      <div class="chat-input-row">
        <textarea id="chat-input" rows="1" placeholder="Ask about EV charging…" aria-label="Chat message"></textarea>
        <button id="chat-send" class="btn-cyan text-sm flex-shrink-0 px-3 py-2" title="Send">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>
  `;

  // ── State ───────────────────────────────────────────────────────────────────
  let isOpen = false;
  const history = [];

  // ── Helpers ─────────────────────────────────────────────────────────────────
  function addMessage(role, text, showTicketCTA = false) {
    const msgs = fab.querySelector('#chat-messages');
    const el = document.createElement('div');
    el.className = role === 'bot' ? 'msg-bot animate-fadeIn' : 'msg-user animate-fadeIn';
    el.innerHTML = renderMarkdown(text);

    if (role === 'bot' && showTicketCTA) {
      const cta = document.createElement('button');
      cta.className = 'ticket-cta-btn';
      cta.innerHTML = '🎫 Raise OEM Support Ticket';
      cta.addEventListener('click', () => {
        closeChat();
        if (typeof onCreateTicket === 'function') onCreateTicket();
      });
      el.appendChild(cta);
    }

    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
    history.push({ role, text });
  }

  function addTypingIndicator() {
    const msgs = fab.querySelector('#chat-messages');
    const el = document.createElement('div');
    el.className = 'msg-bot';
    el.id = 'typing-indicator';
    el.innerHTML = `
      <div class="flex gap-1 items-center py-1">
        <span class="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style="animation-delay:0s;"></span>
        <span class="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style="animation-delay:.15s;"></span>
        <span class="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style="animation-delay:.3s;"></span>
      </div>`;
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
    return el;
  }

  function sendMessage(text) {
    if (!text.trim()) return;
    addMessage('user', text);

    const input = fab.querySelector('#chat-input');
    if (input) { input.value = ''; input.style.height = 'auto'; }

    // Hide suggestions after first interaction
    const sug = fab.querySelector('#chat-suggestions');
    if (sug) sug.style.display = 'none';

    // Typing indicator
    const typing = addTypingIndicator();

    setTimeout(() => {
      typing.remove();
      const { text: resp, showTicketCTA } = getBotResponse(text);
      addMessage('bot', resp, showTicketCTA);
    }, 700 + Math.random() * 600);
  }

  function openChat() {
    isOpen = true;
    fab.querySelector('#chat-window').classList.remove('hidden');
    fab.querySelector('#chat-icon-open').classList.add('hidden');
    fab.querySelector('#chat-icon-close').classList.remove('hidden');
    fab.querySelector('#chat-badge')?.remove();
    setTimeout(() => fab.querySelector('#chat-input')?.focus(), 100);
  }

  function closeChat() {
    isOpen = false;
    fab.querySelector('#chat-window').classList.add('hidden');
    fab.querySelector('#chat-icon-open').classList.remove('hidden');
    fab.querySelector('#chat-icon-close').classList.add('hidden');
  }

  // ── Wire events ─────────────────────────────────────────────────────────────
  requestAnimationFrame(() => {
    // Toggle
    fab.querySelector('#chat-toggle')?.addEventListener('click', () => {
      isOpen ? closeChat() : openChat();
    });

    // Send button
    fab.querySelector('#chat-send')?.addEventListener('click', () => {
      sendMessage(fab.querySelector('#chat-input')?.value || '');
    });

    // Enter key (shift+enter = newline)
    fab.querySelector('#chat-input')?.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage(e.target.value);
      }
      // Auto-resize textarea
      setTimeout(() => {
        e.target.style.height = 'auto';
        e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
      }, 0);
    });

    // Suggestion pills
    fab.querySelectorAll('.suggestion-pill').forEach(pill => {
      pill.addEventListener('click', () => sendMessage(pill.textContent));
    });

    // Initial welcome message
    addMessage('bot', "👋 Hi! I'm **EcoAssist AI** — your EV charging expert.\n\nAsk me anything about AC/DC charging, kW levels, phase loading, OCPP, or charger troubleshooting. I can also raise an OEM support ticket directly from this chat!\n\nClick a suggestion below or type your question ⬇️");
  });

  return fab;
};
