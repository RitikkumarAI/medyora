import os

# 1. Generate medyora_college_presentation_deck.md
markdown_content = """# 🎯 Medyora College Project Presentation & Claude Master Prompt
**Project Name:** Medyora — India's Smartest AI Healthcare Ecosystem  
**Created & Presented By:** Ritik Kumar & Team (Binarize Technologies)  
**Target Format:** 15-Slide Modern, Diagrammatic, Minimal-Text Presentation Deck  
**Primary Assets Folder:** `presentation_assets/` (Included in project root)

---

## 📋 PART 1: MASTER PROMPT FOR CLAUDE (Direct Copy-Paste)

> **How to use this with Claude:**
> 1. Copy the entire prompt below between the `<CLAUDE_PROMPT>` tags.
> 2. Open [Claude.ai](https://claude.ai) (Claude 3.7 Sonnet or Claude 3.5 Sonnet).
> 3. Upload the images from your `presentation_assets/` folder to Claude.
> 4. Paste the prompt and press Enter. Claude will generate an interactive, beautifully animated React / HTML / PPTX presentation artifact!

```markdown
<CLAUDE_PROMPT>
You are an elite Silicon Valley product designer and technical presentation expert.
I need you to build a stunning, professional, and visually engaging 15-SLIDE PRESENTATION for my final college engineering project submission.

### PROJECT OVERVIEW:
- Name: Medyora — India's Smartest AI Healthcare Platform & Consultation Ecosystem
- Developed by: Ritik Kumar & Team (Binarize Technologies)
- Tech Stack: TanStack Start (SSR), React 19, Tailwind CSS v4, Nitro Engine, Supabase PostgreSQL, Capacitor (iOS/Android), jspdf, i18next (English, Hindi, Marathi).
- Core Value Proposition: Eliminates the 2-3 hour clinic OPD queue chaos in India using real-time digital token telemetry, combined with a 24/7 Smart Care AI Copilot, 1-minute e-prescriptions, and a unified patient-doctor-admin super-app.

### CRITICAL PRESENTATION RULES (IMPORTANT):
1. MINIMAL TEXT / HIGH IMPACT: No long paragraphs or walls of text! Use punchy headlines, key metric badges, short bullet points, and structured cards.
2. DIAGRAMMATIC & VISUAL: Every slide MUST feature a clear diagram, architecture flow, step-by-step process pipeline, or comparison card.
3. SUBTLE ANIMATIONS: Include smooth micro-transitions between cards, hover states, and step-by-step reveals suitable for an interactive slide deck.
4. CLINICAL & MODERN AESTHETIC: Use Medyora's signature palette:
   - Primary: Medical Royal Blue (#2563EB)
   - Secondary: Health Emerald Green (#10B981)
   - Dark Mode / Deep Slate: #0F172A and #1E293B
   - Accents: Cyan (#0EA5E9) & Light Blue (#EFF6FF)
5. SPEAKER NOTES: Under each slide, provide a concise 20-30 second spoken script that I can read during my college presentation to impress professors and external examiners.
6. ASSETS & IMAGES: Reference the uploaded project images (Logo, Hero Doctors, AI Robot, Holographic Body, Glowing Heart, etc.) in the appropriate slides.

Here is the exact slide-by-slide structured content to use:

---------------------------------------------------------------------------------
[SLIDE 1: COVER SLIDE — MEDYORA ECOSYSTEM]
- Title: MEDYORA
- Subtitle: India's Smartest AI Healthcare Platform & OPD Queue Ecosystem
- Presenter: Ritik Kumar & Team | Binarize Technologies
- Tagline: "Zero Waiting Rooms. Intelligent Triage. Lifelong Digital Health."
- Visual Elements: Medyora Brand Logo, Clean Hero Medical Badges, 3-Pillar Tag (Patients • Doctors • Clinics)
- Image: Logo.png or hero-doctor-female.webp
- Speaker Script: "Respected faculty and examiners, today we present Medyora — an enterprise fullstack healthcare platform designed to solve one of India's biggest healthcare bottlenecks: the unorganized, 2 to 3-hour clinic waiting room experience."

---------------------------------------------------------------------------------
[SLIDE 2: THE PROBLEM STATEMENT — THE INDIAN HEALTHCARE CRISIS]
- Headline: Outpatient Care is Broken in India
- 4 Core Pain Points:
  1. ⏳ 120–180 Min Queue Chaos: Patients waste half a day in crowded waiting rooms with zero live visibility.
  2. 📄 Lost & Illegible Paper Prescriptions: Physical handwriting errors cause medication confusion and drug misuse.
  3. 🧩 Fragmented Medical History: No continuity of care when switching doctors or visiting multiple clinics.
  4. 🏥 Clinic Administrative Burnout: Receptionists struggle to balance walk-in crowds with online appointments.
- Visual Layout: 4 Danger/Red-accented problem cards with icons (Clock, FileX, ShieldAlert, Users).
- Speaker Script: "Across Indian clinics, patients wait up to 3 hours just for a 5-minute doctor consultation. Paper prescriptions get lost, and medical records are completely fragmented. Medyora was engineered to fix this end-to-end."

---------------------------------------------------------------------------------
[SLIDE 3: THE MEDYORA SOLUTION — 3 CONNECTED PILLARS]
- Headline: A Unified Healthcare Super-App
- Pillar 1 (Patients): Instant specialist discovery, live digital token queue tracker, 24/7 AI symptom triaging, and lifelong family health records.
- Pillar 2 (Doctors): Web-based clinical cockpit, 1-click 'Call Next' OPD queue board, and 60-second e-prescription authoring.
- Pillar 3 (Platform Admin): Verified medical license audits (MCI/NMC registration), appointment ledger, and CMS health knowledge base.
- Visual Layout: 3 interconnected architectural pillar cards with blue and emerald borders.
- Speaker Script: "Medyora bridges all three healthcare stakeholders onto a single ecosystem: patients get zero-wait appointments, doctors get a streamlined digital cockpit, and administrators verify medical practitioners."

---------------------------------------------------------------------------------
[SLIDE 4: SYSTEM ARCHITECTURE & FULLSTACK TOPOLOGY]
- Headline: Production-Ready Fullstack Architecture
- Architecture Layers:
  - Layer 1 (Client): Desktop Web (React 19), Mobile PWA (Service Worker), Native Android/iOS (Capacitor).
  - Layer 2 (SSR & Application Server): TanStack Start with Nitro SSR Engine, type-safe file routes, and enterprise CSP headers.
  - Layer 3 (Intelligence Layer): 2,300+ Rule Clinical Knowledge Engine + Specialty-XAI Triaging.
  - Layer 4 (Data & Backend): Supabase PostgreSQL 14+, Row Level Security (RLS), and encrypted document vault.
- Visual Layout: 4-tier vertical architecture diagram with directional data-flow arrows.
- Speaker Script: "Under the hood, Medyora is built with TanStack Start and React 19 for isomorphic server-side rendering, backed by Supabase PostgreSQL with strict Row Level Security, and wrapped in Capacitor for native mobile distribution."

---------------------------------------------------------------------------------
[SLIDE 5: PATIENT JOURNEY — DISCOVERY TO BOOKING]
- Headline: 5-Step Frictionless Consultation Booking (< 60 Seconds)
- Process Pipeline:
  - Step 1: Intelligent Search (Filter by Speciality, Symptoms, Location, Fees).
  - Step 2: Doctor Profile (Verified badges, experience, clinic location, patient reviews).
  - Step 3: Patient Selection (Book for Self or Family member with custom medical notes).
  - Step 4: Consultation Mode (In-Clinic OPD, Encrypted Video Call, or Doctor Home Visit).
  - Step 5: Instant Token Generation (Real-time Token #14 and booking reference issued).
- Visual Layout: Horizontal numbered process stepper with blue progress connectors.
- Image: hero-doctor-female.webp
- Speaker Script: "Booking takes under 60 seconds. The patient searches for a doctor or symptom, selects whether they want an in-clinic visit or video call, picks a slot, and instantly receives their digital queue token."

---------------------------------------------------------------------------------
[SLIDE 6: LIVE DIGITAL TOKEN & QUEUE TRACKER (THE CORE INNOVATION)]
- Headline: Eliminating Waiting Rooms with Real-Time Telemetry
- Core Mechanics:
  - Dynamic Token Tracker: Shows My Token (#14), Now Consulting (#11), and Patients Ahead (3).
  - Live Turn ETA: Automatically calculates waiting time (~15 mins/patient).
  - Audio & Visual Chimes: Automated notification alert: 'Token #13 has been called. Please proceed to clinic cabin!'
  - 1-Click Reschedule: Patients running late can dynamically shift to a later slot with an updated token.
- Visual Layout: Live OPD Queue simulation card with animated circular progress bar and chime badge.
- Speaker Script: "This is Medyora's game-changer: the Live Digital Token Tracker. Patients don't wait in the clinic. They track the live counter from home, and Medyora alerts them with an audio chime when their turn is next."

---------------------------------------------------------------------------------
[SLIDE 7: 24/7 SMART CARE AI COPILOT]
- Headline: Clinical Intelligence & Triage Engine
- AI Capabilities:
  - 15 Clinical Modes: Symptom Checker, Lab Report Parser, Prescription Reader, Medicine Scanner, Diet & Fitness.
  - 2,300+ Medical Rules: Evaluates symptoms against ICD clinical conditions and calculates probability scores.
  - 4 Triage Levels: Low Risk, Moderate, High, and Immediate Emergency Red Alerts.
  - Specialist Matching: Instantly connects high-risk symptoms with verified cardiologists, neurologists, etc.
- Visual Layout: Triage pipeline diagram (Input -> Clinical Parser -> Risk Score -> 1-Click Doctor Match).
- Image: ai_doctor_robot.jpg or holographic_body.jpg
- Speaker Script: "Our Smart Care AI Copilot isn't just a generic chatbot. It's a clinical triaging engine that analyzes symptoms against 2,300+ rules, flags emergency red flags, and immediately points patients to the right medical specialist."

---------------------------------------------------------------------------------
[SLIDE 8: TELECONSULTATION & VIRTUAL CARE ROOM]
- Headline: Encrypted HD Video Consultation
- Features:
  - Zero-Install Video Room: Runs directly in the browser and mobile app with WebRTC video/audio.
  - Clinical Tools: Camera & mic toggling, real-time consultation chat, and doctor screen sharing.
  - Instant Rx Integration: Doctor can author and push prescriptions while remaining on the video call.
  - Rural Accessibility: Connects Tier-2 & Tier-3 patients with premier metro medical specialists.
- Visual Layout: Video consultation UI mock with doctor feed, patient picture-in-picture, and live chat panel.
- Speaker Script: "For remote consultations, Medyora provides an encrypted teleconsultation room where doctors and patients interact over HD video, exchange chat messages, and receive their digital prescription before hanging up."

---------------------------------------------------------------------------------
[SLIDE 9: DOCTOR CLINICAL COCKPIT & QUEUE MANAGER]
- Headline: Empowering Doctors with a Zero-Paperwork OPD
- Doctor Features:
  - OPD Queue Board: Real-time count of 'Now Consulting', 'Waiting', and 'Completed' visits.
  - 1-Click 'Call Next': Advances the queue token instantly and sends live telemetry to the waiting patient.
  - Patient Dossier: Instant access to patient age, gender, medical history, allergies, and uploaded lab PDFs.
  - Revenue & Analytics: Real-time tracking of in-clinic vs video consultation revenue.
- Visual Layout: Split dashboard card (Left: Doctor controls & metrics; Right: Live waiting list).
- Speaker Script: "In the Doctor Portal, physicians have full control over their OPD. A single click on 'Call Next' advances the queue, notifies the next patient, and loads their historical medical file."

---------------------------------------------------------------------------------
[SLIDE 10: 1-MINUTE E-PRESCRIPTION BUILDER & PDF ENGINE]
- Headline: Standardized, Legible & Instant Digital Prescriptions
- Builder Features:
  - Typeahead Medication Lookup: Fast selection of brand and generic medicines.
  - Structured Timings: Morning / Afternoon / Night, Before/After Food, and Duration in days.
  - Dietary & Lifestyle Advice: Pre-formatted clinical instructions.
  - Client-Side PDF Generation: Powered by `jspdf` — exports a branded, tamper-evident PDF with doctor registration seal.
- Visual Layout: Sample digital prescription card with medicine rows, dosage icons, and digital stamp.
- Speaker Script: "Doctors author e-prescriptions in under 60 seconds. Our system standardizes dosages and meal timings, generating a signed vector PDF that patients can download directly to their phones."

---------------------------------------------------------------------------------
[SLIDE 11: HEALTHCARE SUPER-APP ECOSYSTEM]
- Headline: Comprehensive Health Services in One Platform
- 3 Ancillary Services:
  1. 💊 Online Pharmacy & Salt Discovery: Search medicines by generic salt composition with home delivery.
  2. 🧪 Diagnostic Lab Tests: Book blood tests and health checkup packages with at-home sample collection.
  3. 👨‍👩‍👧 Family Health Vault: Manage profiles, vaccination logs, and health records for parents and children under 1 account.
- Visual Layout: 3 modern service cards with high-contrast icon badges and feature bullet points.
- Image: hero-family.webp or glowing_heart.jpg
- Speaker Script: "Beyond appointments, Medyora is a complete super-app offering medicine delivery with salt composition search, home sample lab tests, and a family health vault for parents and children."

---------------------------------------------------------------------------------
[SLIDE 12: DATA PRIVACY, SECURITY & AUTHENTICATION]
- Headline: Institutional-Grade Healthcare Security
- Security Architecture:
  - Role-Based Access Control (RBAC): Hard separation between Patients, Verified Doctors, and Admins (`has_role()`).
  - Enterprise SecureStorage: Base64 session payload encryption with Time-To-Live (TTL) auto-expiration.
  - Security Headers & CSP: Strict Content Security Policy, HSTS preloading, and `X-Frame-Options: DENY`.
  - Supabase Row Level Security (RLS): Zero data leakage; patients only read their own appointments and records.
- Visual Layout: 4 security shield cards with green verification checkmarks.
- Speaker Script: "Medical data requires zero-compromise security. Medyora enforces Supabase Row-Level Security, custom TTL encrypted session storage, and enterprise security headers to protect patient confidentiality."

---------------------------------------------------------------------------------
[SLIDE 13: LIVE PROTOTYPE STATUS & TECHNICAL METRICS]
- Headline: Fully Functional Working Prototype
- Core Project Metrics:
  - ⚡ 68 Dynamic File Routes: 100% type-safe routing across Patient, Doctor, and Admin domains.
  - 🌐 3 Supported Languages: Fully localized in English, Hindi (हिन्दी), and Marathi (मराठी) via i18next.
  - 📱 Tri-Platform Ready: Responsive Desktop Web + PWA Service Worker + Capacitor Native Android/iOS.
  - ⏱️ Zero Runtime Errors: Strict TypeScript architecture across all components and stores.
- Visual Layout: 4 key metric stat counters (68 Routes, 3 Languages, 100% Type-Safe, <1s SSR Load).
- Image: image.png or full-logo.webp
- Speaker Script: "Our prototype is 100% functional today. It features 68 type-safe routes, full multi-language support in English, Hindi, and Marathi, and runs identically on desktop, mobile web, and native mobile apps."

---------------------------------------------------------------------------------
[SLIDE 14: ENGINEERING HONESTY — GAPS & TRADE-OFFS]
- Headline: Transparent Engineering Assessment
- Current Implementation Status vs Production Path:
  1. Database: Schema & RLS complete; currently backed by client mock stores for local offline demonstration. -> Next: Cut over live Supabase queries.
  2. Teleconsultation: Full UI and media controls built. -> Next: Integrate LiveKit / Agora WebRTC SFU for multi-peer calls.
  3. Payments: Interactive UPI/Card checkout complete. -> Next: Implement Razorpay server-side webhook signatures.
  4. AI Engine: 2,300+ deterministic rules active. -> Next: Bridge streaming LLM (Gemini 2.5 Flash) for rare diseases.
- Visual Layout: Clean 4-row comparison table with Status badges (Ready vs Next Milestone).
- Speaker Script: "As good engineers, we assess our current trade-offs honestly: our database schemas, video rooms, and payment UIs are fully built; the next step before commercial launch is wiring up live Razorpay webhooks and WebRTC SFU servers."

---------------------------------------------------------------------------------
[SLIDE 15: FUTURE VISION & SCALABILITY ROADMAP]
- Headline: The Path to National Healthcare Infrastructure
- 4-Phase Roadmap:
  - Phase 1: Ayushman Bharat (ABDM) Integration — Link 14-digit ABHA IDs for national health record exchange.
  - Phase 2: Realtime Redis Pub/Sub — Sub-second WebSocket queue broadcasting and automated WhatsApp arrival alerts.
  - Phase 3: Regional Voice AI — Spoken voice symptom checks in Hindi, Marathi, and Tamil using multimodal models.
  - Phase 4: Hospital Receptionist Kiosks — Physical touch-screen kiosks with Bluetooth thermal token printers for walk-ins.
- Visual Layout: Strategic horizontal roadmap timeline with milestone markers.
- Speaker Script: "Our long-term roadmap aligns with the Ayushman Bharat Digital Mission, bringing national ABHA health ID integration, sub-second Redis live queue updates, and voice-assisted healthcare in every regional Indian language. Thank you!"
---------------------------------------------------------------------------------

Generate an engaging, beautiful, responsive, and animated slide deck artifact using these exact specifications!
</CLAUDE_PROMPT>
```

---

## 🖼️ PART 2: PRESENTATION ASSET GUIDE (Which Image for Which Slide)

All key image assets have been gathered into the clean folder:  
📁 **`presentation_assets/`** (in your Medyora project root)

| Slide # | Recommended Image | File Path | Why This Image |
|---|---|---|---|
| **Slide 1: Cover** | Brand Logo / Hero Doctor | `presentation_assets/Logo.png` or `full-logo.webp` | Clean, premium branding for title slide. |
| **Slide 5: Booking** | Doctor In-Clinic Care | `presentation_assets/hero-doctor-female.webp` | Shows a warm, verified doctor-patient interaction. |
| **Slide 7: AI Copilot** | AI Robot Doctor / Hologram | `presentation_assets/ai_doctor_robot.jpg` or `holographic_body.jpg` | Stunning visual depicting futuristic clinical intelligence. |
| **Slide 11: SuperApp** | Family Healthcare & Heart | `presentation_assets/hero-family.webp` or `glowing_heart.jpg` | Represents comprehensive family care and wellness. |
| **Slide 13: Prototype** | Live App Screenshot | `presentation_assets/image.png` | Shows real proof of the working UI and design excellence. |

---

## 🎤 PART 3: COLLEGE PRESENTATION PITCH STRATEGY (How to Present to Professors)

Here is your **winning presentation strategy** for tomorrow:

1. **The 3-Minute Hook (Slides 1–3)**:
   - Start with a personal story or relatable observation: *"Sir, whenever anyone in our family visits a doctor's clinic, we waste 2 to 3 hours just sitting on plastic chairs waiting for our turn. Paper prescriptions get lost, and doctors have no past records. We built Medyora to eliminate this waiting room anxiety completely."*

2. **The Tech Demonstration (Slides 4–6 & 9–10)**:
   - Emphasize that this is **not just a simple static React website**: *"We used TanStack Start with SSR and React 19 for instantaneous page loads, Supabase PostgreSQL with strict Row-Level Security, and Capacitor so the exact same codebase runs as an Android/iOS mobile app."*
   - Show the **Live Queue Token Tracker**: Point out how Token #14 updates live and gives an estimated arrival time.

3. **Clinical Intelligence & Security (Slides 7–8 & 12)**:
   - Show that Medyora has a **2,300+ rule clinical knowledge engine** and enterprise TTL encrypted session storage for patient data privacy.

4. **Engineering Maturity (Slides 13–15)**:
   - Professors love students who are **honest about trade-offs**: Mention that the UI is 100% functional, and explain your future roadmap (ABDM/ABHA ID integration and Redis live queues).
"""

with open("medyora_college_presentation_deck.md", "w", encoding="utf-8") as f:
    f.write(markdown_content)

print("Generated medyora_college_presentation_deck.md")
