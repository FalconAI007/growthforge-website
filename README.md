# GrowthForge — AI Sales Agent Demo Website

**Live Website:** https://growthforge-website.vercel.app

**Dashboard:** https://growthforge-dashboard.vercel.app — Password: `growthforge2025`

**Backend Repo:** https://github.com/FalconAI007/growthforge-backend

**Dashboard Repo:** https://github.com/FalconAI007/growthforge-dashboard

---

## Project Overview

To demonstrate Chanakya in a real-world context, we built a fully functional mock website for a fictional Social Media Marketing Agency called **GrowthForge Media**. Rather than showing the AI agent in isolation, we deployed it inside a complete multi-page business website with real content, real services, and a realistic visitor journey — exactly how it would work for any real local business.

The problem Chanakya solves is real: local businesses lose leads every day because their website does nothing after hours and they cannot afford a full-time sales rep. Chanakya is an AI-powered sales agent embedded directly into the website — qualifying visitors, handling objections, recommending packages, and booking strategy calls, 24/7, automatically.

---

**Screenshot:**

![Homepage](https://github.com/user-attachments/assets/f50d52fe-76cb-4f9d-a0c3-64697a19f834)
*GrowthForge homepage with Chanakya chat bubble visible in the bottom right corner*

![Chat Open](https://github.com/user-attachments/assets/d795f862-c3d2-4c22-9f4a-9264e352b01a)
*Chat widget open — email and name capture screen where every visitor is tracked from second one*

![Conversation](https://github.com/user-attachments/assets/11077cfb-dce7-4e84-8c81-b259dded238c)
*Active conversation showing intent badge and stage progress bar moving from Awareness to Considering*

---

## Repository Structure

```
growthforge-website/
├── index.html                  # Homepage
├── services.html               # Services page
├── pricing.html                # Pricing page
├── faq.html                    # FAQ page
├── contact.html                # Contact page
├── css/
│   └── style.css               # Global styles
├── js/
│   ├── chat.js                 # Chanakya chat widget — all logic
│   └── main.js                 # Page animations and scroll effects
├── .env.example
└── .gitignore
```

---

## Features

- **AI Sales Conversation** — Chanakya uses GPT-4o-mini with a 6-layer pipeline. Every message is analysed for intent, emotional tone, and business relevance before generating a response. No hardcoded rules.
- **Lead Capture from First Message** — Chat opens with an email and name capture screen. Every visitor is saved to the database before they even start chatting — no lead is ever missed.
- **Real-Time Stage Tracking** — Visual progress bar shows the visitor's buying journey: Awareness → Considering → Ready — updating live as the conversation progresses.
- **Intent Badges** — Every response is tagged with the detected intent (PRICING, SERVICE, CASE, ROI, ONBOARDING, FAQ, OBJECTION) so the sales team understands any conversation at a glance.
- **Calendly Booking** — When genuine booking intent is detected, a strategy call button appears automatically inside the chat. GPT reads the full conversation before deciding — not keyword matching.
- **Lead Profile Form** — Visitors are prompted to share their phone and business name for faster follow-up.
- **Session Persistence** — Chat state is preserved across page navigation using sessionStorage. Visitors can browse the site and return to their exact conversation without losing messages.
- **Quick Reply Chips** — Pre-built buttons for common questions help visitors engage instantly.

---

## Mentor Suggestions Implemented

**Email and Name Capture Upfront**
Originally the lead form appeared mid-conversation. Based on mentor feedback we moved it to the very start — before the first message — so every visitor is tracked from second one regardless of how long they chat.

**Chat Persistence Across Pages**
Mentor suggested the chat should survive page navigation. We implemented full sessionStorage persistence — all messages, stage, and session ID are saved on every message, every navigation click, and every page unload.

---

## Setup and Installation

No build tools needed — this is a static HTML/CSS/JS website.

```bash
# Clone
git clone https://github.com/FalconAI007/growthforge-website.git
cd growthforge-website

# Open in browser
open index.html
# Or use Live Server in VS Code
```

For local development, update the API URLs in `js/chat.js` lines 3-4:

```javascript
const API_URL = "http://localhost:5000/chat";
const CAPTURE_URL = "http://localhost:5000/capture-lead";
```

**Deployment:** Deployed on Vercel. Connect GitHub repo — no build command, no output directory needed. Auto-deploys on every push to `main`.

---

## Future Ideas

- **WhatsApp Channel** — Deploy Chanakya as a WhatsApp Business bot
- **Multi-language Support** — Detect visitor language and respond in Tamil, Hindi, or other regional languages
- **A/B Testing** — Test different greetings, CTA timings, and lead form positions to optimise conversion
- **Voice Input** — Allow visitors to speak to Chanakya instead of typing

---

## Novelty

Most website chatbots follow fixed decision trees. Chanakya reasons about intent using a 4-dimension GPT framework, adapts its tone to match the visitor, and adjusts its sales strategy based on conversation stage — all without any hardcoded paths.

---

## Tech Stack

`HTML5` `CSS3` `Vanilla JavaScript` `sessionStorage` `Vercel`
