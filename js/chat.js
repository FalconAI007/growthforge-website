(function initChat() {

    const API_URL = "https://growthforge-api.onrender.com/chat";
    const CAPTURE_URL = "https://growthforge-api.onrender.com/capture-lead";
    const CALENDLY_LINK = "https://calendly.com/anifilebackup/30min";
    const STORAGE_KEY = "gf_chat_state";

    const chatHTML = `
    <div id="chat-widget">
        <div id="chat-popup">

            <!-- Header -->
            <div id="chat-header" style="
                background: #0D1B2A;
                padding: 14px 16px;
                display: flex;
                align-items: center;
                gap: 12px;
                border-radius: 16px 16px 0 0;
                flex-shrink: 0;
            ">
                <div style="
                    width: 40px; height: 40px;
                    background: linear-gradient(135deg, #1E90FF, #0066cc);
                    border-radius: 50%;
                    display: flex; align-items: center;
                    justify-content: center;
                    font-size: 20px; flex-shrink: 0;
                ">🪬</div>
                <div>
                    <div style="color:#fff; font-weight:700; font-size:15px;">
                        Chanakya
                    </div>
                    <div style="color:#1E90FF; font-size:11px;
                        display:flex; align-items:center; gap:4px;">
                        <span style="width:6px; height:6px;
                            background:#00C48C; border-radius:50%;
                            display:inline-block;"></span>
                        GrowthForge AI Strategist
                    </div>
                </div>
                <div style="margin-left:auto; display:flex;
                    gap:4px; align-items:center;">
                    <button id="chat-minimize-btn" title="Minimize" style="
                        background:none; border:none;
                        color:#aaa; font-size:20px; cursor:pointer;
                        line-height:1; padding: 0 6px;
                        border-radius: 4px;
                    ">—</button>
                    <button id="chat-close-btn" style="
                        background:none; border:none;
                        color:#aaa; font-size:22px; cursor:pointer;
                        line-height:1; padding: 0 4px;
                        border-radius: 4px;
                    ">×</button>
                </div>
            </div>

            <!-- Stage Progress Bar -->
            <div id="stage-bar" style="
                background: #f8f9fa;
                padding: 10px 16px;
                border-bottom: 1px solid #eee;
                flex-shrink: 0;
            ">
                <div style="display:flex; align-items:center;
                    justify-content:space-between;">
                    <div id="stage-awareness" style="display:flex;
                        flex-direction:column; align-items:center; gap:4px;">
                        <div class="stage-dot" style="width:12px; height:12px;
                            border-radius:50%; background:#1E90FF;
                            transition:background 0.4s;"></div>
                        <span style="font-size:10px; color:#1E90FF;
                            font-weight:700; transition:color 0.4s;">
                            Awareness
                        </span>
                    </div>
                    <div id="line-1" style="flex:1; height:2px;
                        background:#ddd; margin:0 6px; margin-bottom:16px;
                        transition:background 0.4s;"></div>
                    <div id="stage-consideration" style="display:flex;
                        flex-direction:column; align-items:center; gap:4px;">
                        <div class="stage-dot" style="width:12px; height:12px;
                            border-radius:50%; background:#ddd;
                            transition:background 0.4s;"></div>
                        <span style="font-size:10px; color:#999;
                            font-weight:500; transition:color 0.4s;">
                            Considering
                        </span>
                    </div>
                    <div id="line-2" style="flex:1; height:2px;
                        background:#ddd; margin:0 6px; margin-bottom:16px;
                        transition:background 0.4s;"></div>
                    <div id="stage-decision" style="display:flex;
                        flex-direction:column; align-items:center; gap:4px;">
                        <div class="stage-dot" style="width:12px; height:12px;
                            border-radius:50%; background:#ddd;
                            transition:background 0.4s;"></div>
                        <span style="font-size:10px; color:#999;
                            font-weight:500; transition:color 0.4s;">
                            Ready
                        </span>
                    </div>
                </div>
            </div>

            <!-- Email Capture Screen -->
            <div id="email-capture-screen" style="
                flex:1; display:flex; flex-direction:column;
                align-items:center; justify-content:center;
                padding:24px 20px; background:#fff;
            ">
                <div style="font-size:32px; margin-bottom:12px;">🪬</div>
                <h3 style="font-size:16px; font-weight:700;
                    color:#0D1B2A; margin-bottom:8px; text-align:center;">
                    Welcome to GrowthForge
                </h3>
                <p style="font-size:13px; color:#666; text-align:center;
                    margin-bottom:20px; line-height:1.6;">
                    Share your details so Chanakya can<br>
                    personalize your experience.
                </p>
                <input type="email" id="intro-email"
                    placeholder="Your Email Address *"
                    style="width:100%; padding:10px 14px; margin-bottom:10px;
                    border:1.5px solid #ddd; border-radius:8px;
                    font-size:13px; outline:none; font-family:inherit;
                    box-sizing:border-box; transition:border-color 0.2s;"/>
                <input type="text" id="intro-name"
                    placeholder="Your Name *"
                    style="width:100%; padding:10px 14px; margin-bottom:16px;
                    border:1.5px solid #ddd; border-radius:8px;
                    font-size:13px; outline:none; font-family:inherit;
                    box-sizing:border-box; transition:border-color 0.2s;"/>
                <button id="intro-submit-btn" style="
                    width:100%; padding:11px;
                    background:#1E90FF; color:white;
                    border:none; border-radius:8px;
                    font-weight:600; font-size:14px;
                    cursor:pointer; font-family:inherit;
                    transition:background 0.2s;">
                    Start Chatting →
                </button>
                <p style="font-size:11px; color:#aaa;
                    margin-top:10px; text-align:center;">
                    No spam. Only reached out if you want us to.
                </p>
            </div>

            <!-- Messages -->
            <div id="chat-messages" style="
                flex:1; overflow-y:auto; padding:16px;
                display:none; flex-direction:column; gap:10px;
            "></div>

            <!-- Lead Capture Form -->
            <div id="lead-form-container" style="display:none;
                padding:12px 16px; background:#f8f9ff;
                border-top:1px solid #eee; flex-shrink:0;">
                <div style="display:flex; align-items:center;
                    justify-content:space-between; margin-bottom:10px;">
                    <p style="font-size:13px; color:#555; margin:0;">
                        📋 Complete your profile for faster follow-up:
                    </p>
                    <button id="lead-form-minimize-btn" style="
                        background:none; border:none; color:#aaa;
                        font-size:18px; cursor:pointer; line-height:1;
                        padding:0 4px; font-family:inherit;">—</button>
                </div>
                <input type="tel" id="lead-phone"
                    placeholder="Phone Number (optional)"
                    style="width:100%; padding:8px 12px; margin-bottom:8px;
                    border:1px solid #ddd; border-radius:8px;
                    font-size:13px; box-sizing:border-box; outline:none;
                    font-family:inherit; transition:border-color 0.2s;"/>
                <input type="text" id="lead-business"
                    placeholder="Business Name"
                    style="width:100%; padding:8px 12px; margin-bottom:10px;
                    border:1px solid #ddd; border-radius:8px;
                    font-size:13px; box-sizing:border-box; outline:none;
                    font-family:inherit; transition:border-color 0.2s;"/>
                <button id="lead-submit-btn" style="
                    width:100%; padding:10px;
                    background:#1E90FF; color:white;
                    border:none; border-radius:8px;
                    font-weight:600; font-size:13px;
                    cursor:pointer; margin-bottom:6px;
                    font-family:inherit; transition:background 0.2s;">
                    Complete My Profile 🚀
                </button>
                <button id="lead-skip-btn" style="
                    width:100%; padding:6px;
                    background:none; color:#999;
                    border:none; font-size:12px;
                    cursor:pointer; text-decoration:underline;
                    font-family:inherit;">
                    Skip for now
                </button>
            </div>

            <!-- Lead Form Reopen Banner -->
            <div id="lead-form-banner" style="
                display:none; background:#f0f4ff;
                border-top:1px solid #c8d8ff;
                padding:8px 14px; flex-shrink:0;
                align-items:center; justify-content:space-between;
                cursor:pointer;
            " onclick="reopenLeadForm()">
                <span style="font-size:12px; color:#1E90FF; font-weight:600;">
                    📋 Complete your profile
                </span>
                <span style="font-size:11px; color:#1E90FF;">↑ Open</span>
            </div>

            <!-- Calendly Minimized Bar -->
            <div id="calendly-bar" style="
                display:none; background:#0D1B2A;
                padding:8px 14px; align-items:center;
                justify-content:space-between;
                border-top:1px solid rgba(255,255,255,0.1);
                flex-shrink:0; cursor:pointer;
            " onclick="expandCalendly()">
                <span style="color:#fff; font-size:12px; font-weight:600;">
                    📅 Book Your Free Strategy Call
                </span>
                <span style="color:#1E90FF; font-size:11px;">↑ Open</span>
            </div>

            <!-- Quick Reply Chips -->
            <div id="chat-chips" style="
                padding:8px 12px; display:flex;
                flex-wrap:wrap; gap:6px;
                border-top:1px solid #f0f0f0; flex-shrink:0;
            ">
                <button class="qr-chip">What services do you offer?</button>
                <button class="qr-chip">How much does it cost?</button>
                <button class="qr-chip">Show me results</button>
                <button class="qr-chip">How do I get started?</button>
            </div>

            <!-- Input Area -->
            <div id="chat-input-area" style="
                padding:10px 12px;
                border-top:1px solid #eee; flex-shrink:0;
            ">
                <form id="chat-form" style="display:flex;
                    gap:8px; align-items:center;">
                    <input type="text" id="chat-input"
                        placeholder="Ask me anything..."
                        autocomplete="off"
                        style="flex:1; border:1px solid #ddd;
                        border-radius:20px; padding:8px 14px;
                        font-size:13px; outline:none;
                        font-family:inherit; transition:border-color 0.2s;"/>
                    <button type="submit" style="
                        background:#1E90FF; color:white;
                        border:none; border-radius:50%;
                        width:36px; height:36px;
                        display:flex; align-items:center;
                        justify-content:center;
                        cursor:pointer; flex-shrink:0;">
                        <svg width="18" height="18" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2">
                            </polygon>
                        </svg>
                    </button>
                </form>
            </div>

        </div>

        <!-- Bubble Button -->
        <button id="chat-bubble" title="Chat with Chanakya" style="
            width:56px; height:56px; border-radius:50%;
            background:#1E90FF; border:none; cursor:pointer;
            display:flex; align-items:center; justify-content:center;
            color:white; box-shadow:0 4px 20px rgba(30,144,255,0.4);
            transition:transform 0.2s, box-shadow 0.2s;
        ">
            <svg width="28" height="28" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1
                    2-2h14a2 2 0 0 1 2 2v10z"></path>
            </svg>
        </button>
    </div>

    <style>
        #chat-widget {
            position: fixed; bottom: 24px; right: 24px;
            z-index: 9999;
            font-family: 'Inter', system-ui, sans-serif;
        }
        #chat-bubble:hover {
            transform: scale(1.08);
            box-shadow: 0 6px 24px rgba(30,144,255,0.5);
        }
        #chat-popup {
            position: absolute; bottom: 70px; right: 0;
            width: 360px; height: 560px; max-height: 84vh;
            background: #fff; border-radius: 16px;
            box-shadow: 0 8px 40px rgba(0,0,0,0.18);
            display: none; flex-direction: column; overflow: hidden;
        }
        #chat-popup.active { display: flex; }
        .chat-msg-row {
            display: flex; flex-direction: column;
            animation: msgFadeIn 0.3s ease;
        }
        @keyframes msgFadeIn {
            from { opacity:0; transform:translateY(6px); }
            to { opacity:1; transform:translateY(0); }
        }
        .chat-msg-row.bot { align-items: flex-start; }
        .chat-msg-row.user { align-items: flex-end; }
        .chat-bubble-inner {
            max-width: 82%; padding: 10px 14px;
            border-radius: 12px; font-size: 13.5px;
            line-height: 1.55; word-wrap: break-word;
        }
        .chat-msg-row.bot .chat-bubble-inner {
            background: #0D1B2A; color: #fff;
            border-bottom-left-radius: 4px;
        }
        .chat-msg-row.user .chat-bubble-inner {
            background: #1E90FF; color: #fff;
            border-bottom-right-radius: 4px;
        }
        .intent-badge {
            font-size: 10px; padding: 2px 8px;
            border-radius: 20px; margin-top: 4px;
            font-weight: 600; letter-spacing: 0.03em;
            width: fit-content;
        }
        .badge-PRICING  { background:#fff3cd; color:#856404; }
        .badge-SERVICE  { background:#cce5ff; color:#004085; }
        .badge-CASE     { background:#d4edda; color:#155724; }
        .badge-ROI      { background:#d1ecf1; color:#0c5460; }
        .badge-ONBOARDING { background:#d4edda; color:#155724; }
        .badge-FAQ      { background:#e2e3e5; color:#383d41; }
        .badge-OBJECTION { background:#f8d7da; color:#721c24; }
        .typing-indicator {
            display: flex; align-items: center; gap: 4px;
            padding: 10px 14px; background: #0D1B2A;
            border-radius: 12px; border-bottom-left-radius: 4px;
            width: fit-content;
        }
        .typing-dot {
            width: 7px; height: 7px; background: #1E90FF;
            border-radius: 50%; animation: typingBounce 1.2s infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typingBounce {
            0%,60%,100% { transform:translateY(0); opacity:0.5; }
            30% { transform:translateY(-6px); opacity:1; }
        }
        .calendly-btn {
            display: flex; align-items: center;
            justify-content: space-between;
            background: linear-gradient(135deg, #1E90FF, #0066cc);
            color: white !important; padding: 10px 14px;
            border-radius: 8px; text-decoration: none;
            font-weight: 600; font-size: 13px; margin-top: 8px;
            width: 100%; box-sizing: border-box; cursor: pointer;
        }
        .cal-min-btn {
            background: rgba(255,255,255,0.2); border: none;
            color: white; font-size: 11px; padding: 3px 8px;
            border-radius: 4px; cursor: pointer;
            font-family: inherit; white-space: nowrap; flex-shrink: 0;
        }
        .qr-chip {
            background: #f0f4ff; color: #1E90FF;
            border: 1px solid #c8d8ff; border-radius: 20px;
            padding: 5px 12px; font-size: 12px; cursor: pointer;
            font-weight: 500; white-space: nowrap;
            transition: background 0.2s; font-family: inherit;
        }
        .qr-chip:hover { background: #1E90FF; color: white; }
        #chat-minimize-btn:hover,
        #chat-close-btn:hover { color: #fff; }
        #chat-input:focus, #intro-email:focus,
        #intro-name:focus, #lead-phone:focus,
        #lead-business:focus { border-color: #1E90FF !important; }
        #intro-submit-btn:hover { background: #0066cc !important; }
        #lead-submit-btn:hover { background: #0066cc !important; }
        @media (max-width: 480px) {
            #chat-popup { width: calc(100vw - 48px); right: 0; }
        }
    </style>
    `;

    document.body.insertAdjacentHTML('beforeend', chatHTML);

    // ── STATE ──
    let isChatInitialized = false;
    let currentStage = 'AWARENESS';
    let currentIntent = null;
    let leadCaptured = false;
    let calendlyShown = false;
    let calendlyLink = null;
    let userName = '';
    let userEmail = '';
    let currentSessionId = null;

    const GREETING = "I'm Chanakya ⚡ — your GrowthForge AI strategist. Every great business starts with the right strategy. What are you trying to build?";

    // ── DOM REFS ──
    const chatPopup = document.getElementById('chat-popup');
    const chatBubble = document.getElementById('chat-bubble');
    const chatClose = document.getElementById('chat-close-btn');
    const chatMinimize = document.getElementById('chat-minimize-btn');
    const chatMessages = document.getElementById('chat-messages');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatChips = document.getElementById('chat-chips');
    const leadFormContainer = document.getElementById('lead-form-container');
    const leadFormBanner = document.getElementById('lead-form-banner');
    const emailScreen = document.getElementById('email-capture-screen');
    const calendlyBar = document.getElementById('calendly-bar');

    // ── SESSION STORAGE ──
    function saveState() {
        if (!currentSessionId) return;
        try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
                sessionId: currentSessionId,
                userName,
                userEmail,
                currentStage,
                currentIntent,
                leadCaptured,
                calendlyShown,
                calendlyLink,
                messagesHTML: chatMessages.innerHTML,
                emailCaptured: emailScreen.style.display === 'none',
                leadFormVisible: leadFormContainer.style.display === 'block',
                leadBannerVisible: leadFormBanner.style.display === 'flex',
                calendlyBarVisible: calendlyBar.style.display === 'flex',
                chipsHidden: chatChips.style.display === 'none',
                inputAreaVisible:
                    document.getElementById('chat-input-area')
                        .style.display !== 'none'
            }));
        } catch (e) {
            console.error('State save error:', e);
        }
    }

    function loadState() {
        try {
            const raw = sessionStorage.getItem(STORAGE_KEY);
            if (!raw) return false;

            const state = JSON.parse(raw);
            if (!state.sessionId || !state.emailCaptured) return false;

            currentSessionId = state.sessionId;
            userName = state.userName || '';
            userEmail = state.userEmail || '';
            currentStage = state.currentStage || 'AWARENESS';
            currentIntent = state.currentIntent || null;
            leadCaptured = state.leadCaptured || false;
            calendlyShown = state.calendlyShown || false;
            calendlyLink = state.calendlyLink || null;

            emailScreen.style.display = 'none';
            chatMessages.style.display = 'flex';
            chatMessages.innerHTML = state.messagesHTML || '';

            chatChips.style.display =
                state.chipsHidden ? 'none' : 'flex';

            document.getElementById('chat-input-area').style.display =
                state.inputAreaVisible ? 'block' : 'none';

            if (state.leadFormVisible) {
                leadFormContainer.style.display = 'block';
            }
            if (state.leadBannerVisible) {
                leadFormBanner.style.display = 'flex';
            }
            if (state.calendlyBarVisible) {
                calendlyBar.style.display = 'flex';
            }

            updateStageBar(currentStage);
            reAttachCalendlyListeners();

            isChatInitialized = true;
            scrollToBottom();

            console.log('Chat restored:', currentSessionId);
            return true;

        } catch (e) {
            console.error('State load error:', e);
            return false;
        }
    }

    function clearState() {
        sessionStorage.removeItem(STORAGE_KEY);
    }

    function reAttachCalendlyListeners() {
        const calBtn = document.querySelector('.cal-min-btn');
        if (calBtn) {
            calBtn.onclick = (e) => minimizeCalendly(e);
        }
    }

    // ── SESSION ID ──
    function generateSessionId() {
        return 'session_' + Date.now() + '_' +
            Math.random().toString(36).substr(2, 9);
    }

    function getSessionId() {
        return currentSessionId;
    }

    // ── AUTO RESTORE ON PAGE LOAD ──
    (function autoRestore() {
        try {
            const raw = sessionStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const state = JSON.parse(raw);
            if (!state.sessionId || !state.emailCaptured) return;

            currentSessionId = state.sessionId;
            userName = state.userName || '';
            userEmail = state.userEmail || '';
            currentStage = state.currentStage || 'AWARENESS';
            currentIntent = state.currentIntent || null;
            leadCaptured = state.leadCaptured || false;
            calendlyShown = state.calendlyShown || false;
            calendlyLink = state.calendlyLink || null;

            console.log('Chat pre-loaded:', currentSessionId);
        } catch (e) {
            console.error('Auto restore error:', e);
        }
    })();

    // ── TOGGLE CHAT ──
    function toggleChat() {
        chatPopup.classList.toggle('active');

        if (chatPopup.classList.contains('active')) {
            if (!isChatInitialized) {
                const restored = loadState();

                if (!restored) {
                    if (!currentSessionId) {
                        currentSessionId = generateSessionId();
                    }
                    emailScreen.style.display = 'flex';
                    chatMessages.style.display = 'none';
                    chatChips.style.display = 'none';
                    document.getElementById('chat-input-area')
                        .style.display = 'none';
                }

                isChatInitialized = true;
            }

            setTimeout(() => {
                if (emailScreen.style.display !== 'none') {
                    const emailInput =
                        document.getElementById('intro-email');
                    if (emailInput) emailInput.focus();
                } else {
                    chatInput.focus();
                }
            }, 100);
        }
    }

    chatBubble.addEventListener('click', toggleChat);

    chatClose.addEventListener('click', () => {
        chatPopup.classList.remove('active');
        saveState();
    });

    chatMinimize.addEventListener('click', () => {
        chatPopup.classList.remove('active');
        saveState();
    });

    // ── EMAIL CAPTURE ──
    document.getElementById('intro-submit-btn')
        .addEventListener('click', async () => {
            const email =
                document.getElementById('intro-email').value.trim();
            const name =
                document.getElementById('intro-name').value.trim();

            if (!email || !name) {
                alert('Please enter both your name and email.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            userEmail = email;
            userName = name;

            try {
                await fetch(CAPTURE_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        session_id: currentSessionId,
                        name: userName,
                        email: userEmail,
                        intent: 'initial_capture',
                        stage: 'AWARENESS'
                    })
                });
            } catch (err) {
                console.error('Initial capture error:', err);
            }

            emailScreen.style.display = 'none';
            chatMessages.style.display = 'flex';
            chatChips.style.display = 'flex';
            document.getElementById('chat-input-area')
                .style.display = 'block';

            setTimeout(() => {
                showTyping();
                setTimeout(() => {
                    hideTyping();
                    addBotMessage(`Hi ${userName}! ` + GREETING, null);
                    chatInput.focus();
                    saveState();
                }, 1200);
            }, 300);
        });

    document.getElementById('intro-email')
        .addEventListener('keydown', (e) => {
            if (e.key === 'Enter')
                document.getElementById('intro-name').focus();
        });

    document.getElementById('intro-name')
        .addEventListener('keydown', (e) => {
            if (e.key === 'Enter')
                document.getElementById('intro-submit-btn').click();
        });

    // ── QUICK REPLIES ──
    document.querySelectorAll('.qr-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            processMessage(chip.textContent.trim());
        });
    });

    // ── TYPING INDICATOR ──
    function showTyping() {
        const row = document.createElement('div');
        row.className = 'chat-msg-row bot';
        row.id = 'typing-indicator';
        row.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>`;
        chatMessages.appendChild(row);
        scrollToBottom();
    }

    function hideTyping() {
        const t = document.getElementById('typing-indicator');
        if (t) t.remove();
    }

    // ── ADD BOT MESSAGE ──
    function addBotMessage(text, intent) {
        const row = document.createElement('div');
        row.className = 'chat-msg-row bot';
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble-inner';
        bubble.textContent = text;
        row.appendChild(bubble);

        const showFor = [
            'PRICING', 'SERVICE', 'CASE', 'ROI',
            'ONBOARDING', 'FAQ', 'OBJECTION'
        ];
        if (intent && showFor.includes(intent)) {
            const badge = document.createElement('span');
            badge.className = `intent-badge badge-${intent}`;
            badge.textContent = intent;
            row.appendChild(badge);
        }

        chatMessages.appendChild(row);
        scrollToBottom();
        saveState();
    }

    // ── ADD USER MESSAGE ──
    function addUserMessage(text) {
        if (chatChips) chatChips.style.display = 'none';
        const row = document.createElement('div');
        row.className = 'chat-msg-row user';
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble-inner';
        bubble.textContent = text;
        row.appendChild(bubble);
        chatMessages.appendChild(row);
        scrollToBottom();
        saveState();
    }

    // ── CALENDLY ──
    function showCalendlyButton(link) {
        calendlyShown = true;
        calendlyLink = link;

        // Remove existing row so it re-renders in correct position
        const existing = document.getElementById('calendly-row');
        if (existing) existing.remove();

        // Hide minimized bar if showing
        calendlyBar.style.display = 'none';

        const row = document.createElement('div');
        row.className = 'chat-msg-row bot';
        row.id = 'calendly-row';

        const btn = document.createElement('a');
        btn.href = link;
        btn.target = '_blank';
        btn.rel = 'noopener noreferrer';
        btn.className = 'calendly-btn';
        btn.innerHTML = `
        <span>📅 Book Your Free Strategy Call</span>
        <button class="cal-min-btn"
            onclick="minimizeCalendly(event)">— Min</button>`;
        row.appendChild(btn);
        chatMessages.appendChild(row);
        scrollToBottom();

        if (!leadCaptured) {
            setTimeout(() => {
                leadFormContainer.style.display = 'block';
                scrollToBottom();
                saveState();
            }, 800);
        }
        saveState();
    }

    window.minimizeCalendly = function (e) {
        e.preventDefault();
        e.stopPropagation();
        const row = document.getElementById('calendly-row');
        if (row) row.style.display = 'none';
        calendlyBar.style.display = 'flex';
        saveState();
    };

    window.expandCalendly = function () {
        const row = document.getElementById('calendly-row');
        if (row) row.style.display = 'flex';
        calendlyBar.style.display = 'none';
        scrollToBottom();
        saveState();
    };

    // ── LEAD FORM ──
    document.getElementById('lead-form-minimize-btn')
        .addEventListener('click', () => {
            leadFormContainer.style.display = 'none';
            if (!leadCaptured) {
                leadFormBanner.style.display = 'flex';
            }
            saveState();
        });

    document.getElementById('lead-skip-btn')
        .addEventListener('click', () => {
            leadFormContainer.style.display = 'none';
            if (!leadCaptured) {
                leadFormBanner.style.display = 'flex';
            }
            saveState();
        });

    window.reopenLeadForm = function () {
        leadFormContainer.style.display = 'block';
        leadFormBanner.style.display = 'none';
        scrollToBottom();
        saveState();
    };

    document.getElementById('lead-submit-btn')
        .addEventListener('click', async () => {
            const phone =
                document.getElementById('lead-phone').value.trim();
            const business =
                document.getElementById('lead-business').value.trim();

            try {
                const res = await fetch(CAPTURE_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        session_id: currentSessionId,
                        name: userName,
                        email: userEmail,
                        phone,
                        business,
                        intent: currentIntent,
                        stage: currentStage
                    })
                });

                if (res.ok) {
                    leadCaptured = true;
                    leadFormContainer.style.display = 'none';
                    leadFormBanner.style.display = 'none';
                    addBotMessage(
                        `Perfect ${userName}! 🎉 Your profile is complete. ` +
                        `A GrowthForge strategist will reach out within 24 hours.`,
                        null
                    );
                    saveState();
                }
            } catch (err) {
                console.error('Lead update error:', err);
                leadFormContainer.style.display = 'none';
            }
        });

    // ── STAGE BAR ──
    function updateStageBar(stage) {
        currentStage = stage;

        const aw = document.getElementById('stage-awareness');
        const co = document.getElementById('stage-consideration');
        const de = document.getElementById('stage-decision');
        const l1 = document.getElementById('line-1');
        const l2 = document.getElementById('line-2');

        const active = '#1E90FF';
        const done = '#00C48C';
        const off = '#ddd';
        const offTxt = '#999';

        [aw, co, de].forEach(el => {
            el.querySelector('.stage-dot').style.background = off;
            el.querySelector('span').style.color = offTxt;
            el.querySelector('span').style.fontWeight = '500';
        });
        [l1, l2].forEach(el => el.style.background = off);

        if (stage === 'AWARENESS') {
            aw.querySelector('.stage-dot').style.background = active;
            aw.querySelector('span').style.color = active;
            aw.querySelector('span').style.fontWeight = '700';
        } else if (stage === 'CONSIDERATION') {
            aw.querySelector('.stage-dot').style.background = done;
            aw.querySelector('span').style.color = done;
            l1.style.background = done;
            co.querySelector('.stage-dot').style.background = active;
            co.querySelector('span').style.color = active;
            co.querySelector('span').style.fontWeight = '700';
        } else if (
            stage === 'DECISION' ||
            stage === 'OBJECTION_HANDLING'
        ) {
            aw.querySelector('.stage-dot').style.background = done;
            aw.querySelector('span').style.color = done;
            l1.style.background = done;
            co.querySelector('.stage-dot').style.background = done;
            co.querySelector('span').style.color = done;
            l2.style.background = done;
            de.querySelector('.stage-dot').style.background = active;
            de.querySelector('span').style.color = active;
            de.querySelector('span').style.fontWeight = '700';
        }
    }

    // ── MAIN PROCESSOR ──
    async function processMessage(text) {
        if (!text.trim()) return;

        addUserMessage(text);
        chatInput.value = '';
        showTyping();

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    session_id: currentSessionId,
                    name: userName,
                    email: userEmail
                })
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const data = await res.json();
            hideTyping();

            setTimeout(() => {
                addBotMessage(data.response, data.intent);
                currentIntent = data.intent;
                if (data.stage) updateStageBar(data.stage);
                saveState();

                if (data.show_calendly && data.calendly_link) {
                    setTimeout(() => {
                        showCalendlyButton(data.calendly_link);
                    }, 600);
                }
            }, 300);

        } catch (err) {
            hideTyping();
            addBotMessage(
                "I'm having trouble connecting. Please try again.",
                null
            );
            console.error('Chat error:', err);
        }
    }

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (text) processMessage(text);
    });

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // ── SAVE ON PAGE EVENTS ──
    document.addEventListener('visibilitychange', saveState);
    window.addEventListener('beforeunload', saveState);

    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (
            link &&
            link.href &&
            !link.href.startsWith('javascript') &&
            !link.href.startsWith('#') &&
            link.href !== window.location.href
        ) {
            saveState();
        }
    });

})();