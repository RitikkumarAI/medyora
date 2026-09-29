import os

# Complete, exhaustive presentation markdown with every single feature
deck_content = """# 🎯 Medyora Healthcare Super-App — Master College Presentation Deck & Claude Prompt
**Project Name:** Medyora — India's Smartest AI Healthcare Super-App & OPD Queue Ecosystem  
**Created & Presented By:** Ritik Kumar & Team (Binarize Technologies)  
**Target:** 15-Slide Modern, Diagrammatic, Minimal-Text Presentation Deck  
**Primary Assets Folder:** `presentation_assets/` (Included in project root)

---

## 🌟 COMPLETE MEDYORA FEATURE ECOSYSTEM SCAN (Nothing Missing)

Medyora is an all-in-one healthcare super-app integrating **12 major medical subsystems**:
1. **Doctor Discovery & In-Clinic Booking**: Search by 22+ specialties, symptoms, diseases, fees, and location. Real-time slot availability, wheelchair accessibility, and instant booking (<60s).
2. **Live Digital Token & OPD Queue Tracker**: Real-time Token #14, live queue countdown, estimated arrival times (~15 mins/patient), audio chimes, and 1-click slot rescheduling.
3. **24/7 Smart Care AI Copilot**: 2,300+ clinical rules, 15 diagnostic modes, symptom triage, lab report parser, prescription OCR, drug interaction checker, and 108/112 emergency red flags.
4. **Encrypted Teleconsultation (Video Care)**: WebRTC video consultation room, camera/mic toggling, live consultation chat, and instant e-prescription delivery.
5. **Emergency SOS & 108/112 Ambulance Dispatch**: Immediate emergency triggers in the AI copilot and help center for cardiac distress, severe trauma, or acute breathing difficulty.
6. **Online Pharmacy & Generic Salt Discovery**: Search medicines by brand or generic salt, view dosage forms (tablets, syrups, drops), upload prescriptions, and order doorstep delivery.
7. **Diagnostic Lab Tests & Home Blood Sample Collection**: 100+ lab tests (CBC, Thyroid, Lipid, HbA1c, Vitamin D/B12, LFT, KFT) and full-body health packages with certified at-home blood collection within 8–24h.
8. **Planned Surgeries & Second Opinions**: Daycare laser procedures (Cataract, Contoura LASIK, Kidney Stone RIRS, Hernia repair, Robotic Knee Replacement) with EMI calculators and insurance coverage indicators.
9. **Medyora Care+ & Plus Family Subscriptions**: Annual family health protection plans covering 4–8 family members with free in-person visits, unlimited video consults, and 20–30% discounts.
10. **Family Health Manager & Lifetime Medical Vault**: Multi-profile management (parents, spouse, children) under 1 login with digital record uploads and lifetime history.
11. **Doctor Clinical Cockpit & E-Prescription Builder**: Single-click 'Call Next' patient calling board, 60-second e-prescription builder with `jspdf` vector PDF download, and revenue analytics.
12. **Platform Governance & Admin Verification**: Medical Council (MCI/NMC) registration audits, appointment ledgers, and CMS wellness articles.

---

## 📋 PART 1: MASTER PROMPT FOR CLAUDE (Direct Copy-Paste)

> **How to use this with Claude:**
> 1. Copy the entire prompt below between the `<CLAUDE_PROMPT>` tags.
> 2. Open [Claude.ai](https://claude.ai) (Claude 3.7 or 3.5 Sonnet).
> 3. Attach images from `presentation_assets/` (Logo, Doctors, Robot AI, Family, Heart).
> 4. Paste the prompt and press Enter. Claude will generate an interactive, complete 15-slide presentation!

```markdown
<CLAUDE_PROMPT>
You are an elite product designer and fullstack engineering presentation specialist.
Build an ultra-modern, visually diagrammatic, minimal-text 15-SLIDE PRESENTATION for my final college engineering project submission.

### PROJECT DETAILS:
- Name: Medyora — India's Smartest AI Healthcare Super-App & OPD Queue Ecosystem
- Developed by: Ritik Kumar & Team (Binarize Technologies)
- Tech Stack: TanStack Start (SSR), React 19, Tailwind CSS v4, Nitro Engine, Supabase PostgreSQL, Capacitor (iOS/Android), jspdf, i18next (English, Hindi, Marathi).
- Core Value: Eliminates 2-3 hour clinic OPD queues using real-time digital token telemetry, paired with an all-in-one super-app (Online Pharmacy, At-Home Blood Tests, Video Consults, Emergency Ambulance SOS, 24/7 AI Triage, Daycare Surgeries, and Doctor Cockpit).

### CRITICAL PRESENTATION CONSTRAINTS:
1. ZERO WALLS OF TEXT: Use bold headlines, stat badges, icon cards, and process steps.
2. DIAGRAMMATIC & VISUAL: Every slide MUST feature a clear diagram, pipeline, or comparison card.
3. COLOR PALETTE: Medical Royal Blue (#2563EB), Health Emerald (#10B981), Dark Slate (#0B1120, #131D33), and Cyan (#60A5FA).
4. SPEAKER NOTES: Under each slide, provide a concise 20-30 second spoken script that I can deliver directly to college professors.
5. COMPLETE ECOSYSTEM COVERAGE: Ensure Pharmacy, Blood Tests, Ambulance SOS, Video Consults, Surgeries, Queue, and AI are highlighted.

---------------------------------------------------------------------------------
[SLIDE 1: COVER SLIDE — MEDYORA SUPER-APP]
- Title: MEDYORA
- Subtitle: India's Smartest AI Healthcare Super-App & OPD Queue Ecosystem
- Presenter: Ritik Kumar & Team | Binarize Technologies
- Tagline: "Zero Waiting Rooms. Intelligent Triage. Complete Health Super-App."
- Visual: Brand Logo, 3 Stakeholder Badges (Patients • Doctors • Clinics)
- Image: Logo.png or hero-doctor-female.webp
- Speaker Script: "Respected faculty, today we present Medyora — an enterprise fullstack healthcare super-app solving India's 2 to 3-hour clinic queue chaos while integrating pharmacy, lab tests, video consultations, and AI triage into one unified platform."

---------------------------------------------------------------------------------
[SLIDE 2: THE PROBLEM STATEMENT — THE OUTPATIENT HEALTHCARE CRISIS]
- Headline: Outpatient Care in India is Broken
- 4 Core Pain Points:
  1. ⏳ 120–180 Min Queue Chaos: Patients waste half their day waiting on clinic benches with zero live visibility.
  2. 📄 Lost & Illegible Paper Prescriptions: Physical handwriting errors cause dangerous medication dispensing mistakes.
  3. 🧩 Fragmented Healthcare Services: Patients must use separate apps for doctor booking, pharmacy, blood tests, and medical records.
  4. 🚑 Delayed Emergency Response: No integration between symptom triage, urgent specialist booking, and ambulance dispatch.
- Visual: 4 Red danger cards with icons (Clock, FileX, Grid, Ambulance).
- Speaker Script: "Across Indian clinics, patients wait 3 hours for a 5-minute consultation. Healthcare is completely fragmented — booking doctors, buying medicines, and getting blood tests require different apps. Medyora unifies this entire journey."

---------------------------------------------------------------------------------
[SLIDE 3: THE MEDYORA SOLUTION — A UNIFIED SUPER-APP]
- Headline: Everything Healthcare in One Unified Ecosystem
- 4 Ecosystem Pillars:
  - 🩺 OPD & Video Consultation: Real-time token queue tracking + encrypted HD video calls.
  - 🧠 24/7 Smart Care AI Copilot: 2,300+ clinical rules, symptom checking, and emergency SOS.
  - 💊 Pharmacy & At-Home Blood Tests: Generic salt discovery, 100+ lab tests with home sample collection.
  - 👨‍⚕️ Doctor Clinical Cockpit: 1-click 'Call Next' queue manager, 60s e-prescriptions, and family vault.
- Visual: 4 connected ecosystem cards with blue and emerald border accents.
- Speaker Script: "Medyora is a complete healthcare super-app: from finding verified doctors and tracking live OPD tokens, to ordering medicines, booking blood tests at home, and consulting over video — all under one login."

---------------------------------------------------------------------------------
[SLIDE 4: SYSTEM ARCHITECTURE & FULLSTACK TOPOLOGY]
- Headline: Production-Grade Fullstack Engineering
- 4 Architecture Layers:
  - Client Layer: Desktop Web (React 19), Mobile PWA (Service Worker), Native Android & iOS (Capacitor).
  - Server & SSR Layer: TanStack Start with Nitro SSR Engine, 100% type-safe file routes, strict CSP headers.
  - Intelligence Layer: 2,300+ Clinical Heuristic Rules + Specialty-XAI Triage Engine.
  - Backend & Cloud: Supabase PostgreSQL 14+, Row Level Security (RLS), encrypted document storage vault.
- Visual: 4-tier vertical architecture diagram with directional data-flow arrows.
- Speaker Script: "Under the hood, Medyora is built with TanStack Start and React 19 for instantaneous SSR page loads, Supabase PostgreSQL with Row Level Security for data privacy, and Capacitor for native Android and iOS mobile apps."

---------------------------------------------------------------------------------
[SLIDE 5: DOCTOR DISCOVERY & IN-CLINIC BOOKING]
- Headline: Frictionless Specialist Discovery & Booking (< 60 Seconds)
- Features:
  - Multi-Filter Search: Filter by 22+ specialties, symptoms, diseases, locality, and consultation fee.
  - Real-Time Availability: View 'Available Today' flags and morning/afternoon/evening slots.
  - Wheelchair & Accessibility: Verified clinic badges with accessibility and parking information.
  - 3 Consultation Modes: In-Clinic OPD Visit, Encrypted HD Video Call, or Doctor Home Visit.
- Visual: Horizontal 5-step process stepper with specialty icons (Cardiology, Dermatology, Orthopedics, Pediatrics).
- Image: hero-doctor-female.webp
- Speaker Script: "Booking takes under a minute. Patients search by symptom or specialty, view doctor credentials and fees, choose in-clinic, video, or home visit, and instantly secure their slot and digital queue token."

---------------------------------------------------------------------------------
[SLIDE 6: LIVE DIGITAL TOKEN & QUEUE TRACKER (FLAGSHIP INNOVATION)]
- Headline: Zero Waiting Rooms with Real-Time Queue Telemetry
- Core Mechanics & Stats:
  - #14 Your Token | #11 Now In Doctor Cabin | ~25 Mins Estimated Wait Time
  - 🔔 Smart Audio Chimes: Automated notification alert: 'Token #13 consulting. Your turn is next!'
  - 🔄 Dynamic 1-Click Reschedule: Running late? Shift to a later afternoon slot without losing booking validity.
  - 🏡 Remote Waiting: Patients wait at home or a nearby café and walk in precisely when called.
- Visual: Live OPD Queue card with animated progress bar and live telemetry stats.
- Speaker Script: "This is our core innovation: patients track their token live from home. They only walk into the clinic when their turn is called, completely eliminating crowded waiting rooms."

---------------------------------------------------------------------------------
[SLIDE 7: 24/7 SMART CARE AI COPILOT & CLINICAL TRIAGE]
- Headline: Clinical Intelligence & Diagnostic Triaging
- Capabilities:
  - 🧠 2,300+ Clinical Rules: Evaluates complaints against ICD-10 medical conditions and computes probability scores.
  - 🎯 15 Diagnostic Modes: Symptom Checker, Lab Report Parser, Prescription Reader, Medicine Scanner, Diet/Fitness.
  - 🚨 4 Triage Risk Levels: Low, Moderate, High, and Immediate Emergency Red Alerts.
  - 🩺 Instant Specialist Routing: Maps high-risk complaints directly to verified specialists in the patient's city.
- Visual: Triage pipeline diagram (Input -> Clinical Parser -> Risk Score -> Specialist Match).
- Image: ai_doctor_robot.jpg or holographic_body.jpg
- Speaker Script: "Our Care AI Copilot evaluates patient symptoms against 2,300+ clinical rules, flags emergency red flags, and immediately points patients to the exact medical specialist they need."

---------------------------------------------------------------------------------
[SLIDE 8: ENCRYPTED TELECONSULTATION & VIRTUAL CARE ROOM]
- Headline: High-Definition Virtual Doctor Consultation
- Features:
  - 🎥 Zero-Install Video Room: WebRTC video/audio directly in web browsers and mobile apps.
  - 💬 Live In-Call Messaging: Share text, scans, and symptoms while remaining on the video stream.
  - 🌐 Rural Tele-Health Reach: Connects Tier-2 & Tier-3 patients with premier metro specialists.
  - 📄 In-Call E-Prescription: Doctors author and deliver digital prescriptions before the call terminates.
- Visual: Teleconsultation layout mockup with doctor feed, patient PIP, and chat panel.
- Speaker Script: "For remote care, Medyora provides an encrypted teleconsultation room where doctors and patients interact over HD video, chat, and receive signed digital prescriptions instantly."

---------------------------------------------------------------------------------
[SLIDE 9: EMERGENCY SOS & 108/112 AMBULANCE DISPATCH]
- Headline: Rapid Life-Saving Emergency Protocol
- Emergency Capabilities:
  - 🚨 Critical Symptom Triggers: Detects cardiac arrest indicators, stroke signs, and severe trauma in real time.
  - 🚑 1-Tap 108/112 Ambulance Dispatch: One-click call trigger with auto-dialing and nearest emergency room locator.
  - 📍 Live GPS Location Sharing: Transmits the patient's location to the nearest ambulance dispatch network.
  - 👨‍👩‍👧 Family Emergency Alerts: Automatically broadcasts SMS alerts to registered family members.
- Visual: Emergency response card with prominent red 108/112 badge, pulsing beacon icon, and hospital locator.
- Speaker Script: "In medical emergencies, every second counts. Medyora features a built-in Emergency SOS system: if our AI detects critical cardiac or trauma symptoms, it immediately triggers 108 ambulance dispatch and notifies family members."

---------------------------------------------------------------------------------
[SLIDE 10: ONLINE PHARMACY & GENERIC SALT DISCOVERY]
- Headline: Doorstep Medicine Delivery with Salt Transparency
- Features:
  - 🔬 Generic Salt Search: Search by active chemical composition (e.g. Paracetamol 650mg) to find affordable alternatives.
  - 📋 Prescription Upload: Upload handwritten or digital prescriptions for automated pharmacist verification.
  - 📦 6 Major Categories: Pain Relief, Antibiotics, Diabetes, Cardiac Care, Vitamins, and Baby Care.
  - ⚡ Rapid Doorstep Delivery: Integration with local licensed pharmacy fulfillment networks.
- Visual: 3 medicine product cards (Brand vs Generic Salt, Pack Size, Price Savings Badge).
- Speaker Script: "Our online pharmacy doesn't just sell branded medicines; it empowers patients with generic salt discovery, helping families save up to 50% on chronic medications with fast doorstep delivery."

---------------------------------------------------------------------------------
[SLIDE 11: DIAGNOSTIC LAB TESTS & AT-HOME BLOOD COLLECTION]
- Headline: Certified Diagnostics with 8-Hour Home Sample Collection
- Features:
  - 🩸 100+ Diagnostic Tests: CBC, Thyroid Profile, Lipid Profile, HbA1c, Vitamin D/B12, Liver & Kidney Function Tests.
  - 🏥 Full-Body Health Packages: Comprehensive Diabetes Care, Women's Wellness, Senior Citizen Health Shield.
  - 💉 At-Home Phlebotomist Sample Collection: Certified technicians collect blood/urine samples from home.
  - 📊 Digital Reports in 8–24 Hours: Lab reports automatically upload into the patient's digital health vault.
- Visual: 3 health package cards with test count badges, savings percentages, and report timing chips.
- Image: glowing_heart.jpg
- Speaker Script: "For diagnostic tests, certified phlebotomists visit the patient's home for blood sample collection. Reports are delivered digitally in 8 to 24 hours and automatically analyzed by our AI."

---------------------------------------------------------------------------------
[SLIDE 12: DAYCARE SURGERIES, CARE+ SUBSCRIPTIONS & FAMILY VAULT]
- Headline: Complete Healthcare Financing & Lifelong Records
- 3 Value Pillars:
  - 🏥 Daycare Laser Surgeries: Cataract, LASIK, Kidney Stone RIRS, Hernia Repair with EMI options and insurance support.
  - ⭐ Medyora Care+ & Plus: Annual family subscriptions covering 4–8 members with free visits and 20–30% discounts.
  - 👨‍👩‍👧 Family Health Vault: Manage profiles, vaccination schedules, and lifetime health records for parents and kids.
- Visual: 3-column split card (Surgeries with EMI | Care+ Subscription | Family Health Vault).
- Image: hero-family.webp
- Speaker Script: "Medyora also guides patients through planned daycare surgeries with EMI options, offers annual family healthcare subscriptions, and provides a centralized health vault for the entire family."

---------------------------------------------------------------------------------
[SLIDE 13: DOCTOR CLINICAL COCKPIT & 60-SECOND E-PRESCRIPTIONS]
- Headline: Paperless OPD Management for Healthcare Specialists
- Doctor Cockpit Features:
  - 📊 Live OPD Queue Board: Real-time count of 'Now Consulting', 'Waiting' (~12 min clear time), and 'Completed' visits.
  - ⚡ 1-Click 'Call Next': Advances the queue token instantly and sends live telemetry to the waiting patient.
  - 💊 Smart E-Prescription Builder: Typeahead medicines, dosage timings (Morning/Afternoon/Night, Food timing), and advice.
  - 📄 Instant Vector PDF Export: Powered by `jspdf` — branded PDF with doctor registration seal and QR badge.
- Visual: Split dashboard mockup (Left: Queue manager; Right: Prescription builder).
- Speaker Script: "The Doctor Portal eliminates clinic paperwork. Doctors call the next patient with one click and author standardized, signed e-prescriptions in under 60 seconds."

---------------------------------------------------------------------------------
[SLIDE 14: DATA SECURITY, AUTHENTICATION & MULTI-LINGUAL REACH]
- Headline: Institutional-Grade Security & National Inclusivity
- Core Pillars:
  - 🛡️ PostgreSQL Row Level Security (RLS): Supabase policies guarantee zero cross-tenant medical record leakage.
  - 🔐 Enterprise SecureStorage (TTL): Custom Base64 encryption with automatic Time-To-Live session expiration.
  - 🌐 Strict Security Headers (CSP): Enforced via `server.ts` with Content Security Policy, HSTS, and X-Frame-Options DENY.
  - 🇮🇳 3 Supported Languages: Fully localized in English, Hindi (हिन्दी), and Marathi (मराठी) via i18next.
- Visual: 4 security shield cards with green verification checkmarks.
- Speaker Script: "Handling health data requires institutional security. We enforce Row-Level Security, TTL encrypted session storage, and support 3 languages to ensure Medyora reaches every Indian household."

---------------------------------------------------------------------------------
[SLIDE 15: FUTURE ROADMAP: AMBIENT IOT & NATIONAL ABDM EXPANSION]
- Headline: The Autonomous Healthcare Ecosystem of Tomorrow
- 4-Phase Roadmap:
  - Phase 01: Ayushman Bharat (ABDM) Integration — Connect 14-digit ABHA IDs for national health record exchange.
  - Phase 02: Ambient IoT Wearables & Auto-Rescue — Continuous smartwatch/ECG sync; AI auto-dispatches 108 ambulances on cardiac distress.
  - Phase 03: Regional Voice AI — Voice-first symptom checker in Hindi, Marathi, and Tamil using multimodal speech models.
  - Phase 04: Hospital Receptionist Kiosks — Physical touchscreen kiosks with Bluetooth thermal token printers for walk-ins.
- Visual: Strategic horizontal roadmap timeline with milestone markers.
- Speaker Script: "Our future roadmap bridges Medyora with IoT wearables and smartwatches for 24/7 ambient vital monitoring, automatically dispatching 108 ambulances during cardiac emergencies, aligned with the Ayushman Bharat Digital Mission. Thank you!"
---------------------------------------------------------------------------------
</CLAUDE_PROMPT>
```

---

## 🎙️ PART 2: THE 2-MINUTE SUPER-APP OPENING PITCH (WORD-FOR-WORD SCRIPT)

*(Dhyan se khade ho jao, examiners ki taraf dekho, aur confident tone mein bolo)*

> **[0:00 - 0:30 | The Real Pain]**  
> *"Good morning respected professors and examiners.*  
> *Sir, aapse ek chhota sa sawaal hai: Aakhiri baar aap ya aapki family mein koi doctor ke paas kab gaya tha?*  
> *Aapko achhi tarah yaad hoga — clinic mein 2 se 3 ghante un uncomfortable plastic chairs par baith kar apni baari ka wait karna, fir doctor ki parchi leke alag medical store par jana, aur blood test karane ke liye kisi teesri lab ki line mein lagna.*  
> *India mein healthcare hamesha **reactive, unorganized aur fragmented** raha hai."*

> **[0:30 - 1:00 | Medyora Ka All-in-One Solution]**  
> *"Isi problem ko solve karne ke liye humne develop kiya hai **MEDYORA: India's Smartest AI Healthcare Super-App**.*  
> *Medyora sirf ek doctor directory nahi hai; yeh ek **complete digital healthcare ecosystem** hai:*  
> *• Patient ko clinic mein ghanto baithna nahi padta — hamara **Live Queue Token Tracker** unhe ghar baithe Token #14 aur live ETA deta hai, aur turn aane par audio chime bajti hai.*  
> *• Lekin sirf doctor appointment hi nahi — Medyora ke andar **Online Pharmacy** hai jahan aap generic salt se sasti dawaiyan book kar sakte hain, **At-Home Blood Tests** hain jahan certified technician ghar aake sample leta hai, aur **Encrypted Video Teleconsultation** hai."*

> **[1:00 - 1:30 | 24/7 AI Copilot & Emergency SOS]**  
> *"Is pure system ke dimaag (brain) ke roop mein kaam karta hai hamara **24/7 Smart Care AI Copilot**.*  
> *Isme 2,300 clinical rules embedded hain. Yeh patient ke symptoms aur lab report PDFs ko instantly scan karta hai, aur emergency red-flags ko pehchan kar turant **1-Tap 108 Ambulance Dispatch** trigger kar deta hai taaki critical time par jaan bachai ja sake."*

> **[1:30 - 2:00 | Futuristic IoT Hardware & Autonomous Rescue]**  
> *(Ab tone mein excitement aur pause lao)*  
> *"Aur hamara sabse bada future vision hai: **Healthcare ko hospital ki 4 deewaron se bahar nikalna**.*  
> *Future mein Medyora seedha **IoT Wearables aur Smartwatch ECG sensors** se connect hoga.*  
> *Medyora ka AI patient ke vitals ko 24/7 background mein monitor karega. Agar raat ko sote waqt patient ka heart rate abnormal hota hai, ya cardiac distress detect hoti hai, toh Medyora wait nahi karega:  
> **Hamara AI autonomously emergency doctor call book karega, family ko live alert bhejega, aur GPS telemetry ke saath turant 108 Ambulance dispatch kar dega!***  
> *From eliminating crowded waiting rooms today, to autonomous life-saving care tomorrow — this is Medyora. Welcome to our live prototype demonstration!"*
"""

with open("medyora_college_presentation_deck.md", "w", encoding="utf-8") as f:
    f.write(deck_content)

print("Updated medyora_college_presentation_deck.md with all features!")
