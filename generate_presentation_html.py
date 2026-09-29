import os

html_code = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Medyora — College Project Presentation (15 Slides)</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');

  :root {
    --bg-dark: #0B1120;
    --card-dark: #131D33;
    --card-border: #1E293B;
    --primary: #3B82F6;
    --primary-glow: rgba(59, 130, 246, 0.35);
    --emerald: #10B981;
    --emerald-glow: rgba(16, 185, 129, 0.3);
    --rose: #F43F5E;
    --amber: #F59E0B;
    --text-main: #F8FAFC;
    --text-muted: #94A3B8;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background-color: var(--bg-dark);
    color: var(--text-main);
    font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
    overflow: hidden;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    user-select: none;
  }

  /* Presentation Container */
  #deck-container {
    flex: 1;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 50px;
  }

  .slide {
    position: absolute;
    width: 100%;
    max-width: 1200px;
    height: 90%;
    max-height: 740px;
    background: radial-gradient(circle at 10% 10%, rgba(30, 58, 138, 0.15), transparent 40%), var(--card-dark);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 24px;
    padding: 45px 55px;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    opacity: 0;
    transform: scale(0.96) translateY(20px);
    pointer-events: none;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .slide.active {
    opacity: 1;
    transform: scale(1) translateY(0);
    pointer-events: auto;
  }

  /* Slide Headers */
  .slide-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
  }

  .tag-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(59, 130, 246, 0.12);
    border: 1px solid rgba(59, 130, 246, 0.3);
    color: #93C5FD;
    padding: 6px 14px;
    border-radius: 9999px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .slide-title {
    font-size: 32px;
    font-weight: 800;
    color: #FFFFFF;
    letter-spacing: -0.5px;
    line-height: 1.2;
    margin-top: 8px;
  }

  .slide-title span {
    background: linear-gradient(90deg, #60A5FA, #34D399);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .slide-number-indicator {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 600;
    color: var(--text-muted);
    background: rgba(255, 255, 255, 0.05);
    padding: 6px 14px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  /* Slide Body */
  .slide-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  /* Layout Grids */
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .grid-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 18px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease, border-color 0.2s ease;
  }

  .card:hover {
    transform: translateY(-3px);
    border-color: rgba(59, 130, 246, 0.4);
  }

  .card.danger {
    border-color: rgba(244, 63, 94, 0.3);
    background: rgba(244, 63, 94, 0.04);
  }

  .card.success {
    border-color: rgba(16, 185, 129, 0.3);
    background: rgba(16, 185, 129, 0.04);
  }

  .card-icon {
    font-size: 26px;
    margin-bottom: 12px;
  }

  .card-title {
    font-size: 17px;
    font-weight: 700;
    color: #FFFFFF;
    margin-bottom: 8px;
  }

  .card-desc {
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.5;
  }

  /* Stepper */
  .step-row {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
  }

  .step-box {
    flex: 1;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: 14px;
    padding: 18px;
    text-align: center;
  }

  .step-arrow {
    color: #64748B;
    font-size: 20px;
    font-weight: bold;
  }

  /* Metric Stat Card */
  .stat-card {
    text-align: center;
    padding: 26px 18px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  .stat-number {
    font-size: 40px;
    font-weight: 800;
    color: #60A5FA;
    letter-spacing: -1px;
    margin-bottom: 6px;
  }

  .stat-label {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--text-muted);
    letter-spacing: 0.5px;
  }

  /* Speaker Notes Bar */
  .speaker-notes-drawer {
    margin-top: 18px;
    background: rgba(0, 0, 0, 0.35);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 12px;
    padding: 12px 18px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .speaker-badge {
    background: #3B82F6;
    color: white;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 4px;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }

  .speaker-text {
    font-size: 12px;
    color: #CBD5E1;
    font-style: italic;
    line-height: 1.4;
  }

  /* Bottom Controls Bar */
  #controls-bar {
    height: 60px;
    background: rgba(11, 17, 32, 0.95);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    backdrop-filter: blur(10px);
  }

  .nav-btn {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: white;
    padding: 8px 18px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nav-btn:hover {
    background: var(--primary);
    border-color: var(--primary);
  }

  /* Progress Bar */
  #progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, #3B82F6, #10B981);
    width: 6.66%;
    transition: width 0.3s ease;
    z-index: 100;
  }
</style>
</head>
<body>

<div id="progress-bar"></div>

<div id="deck-container">

  <!-- SLIDE 1: COVER -->
  <div class="slide active" data-slide="1">
    <div class="slide-header">
      <div class="tag-badge">College Final Project Submission • 2026</div>
      <div class="slide-number-indicator">01 / 15</div>
    </div>
    <div class="slide-body" style="text-align: center; align-items: center;">
      <div style="width: 72px; height: 72px; background: linear-gradient(135deg, #3B82F6, #1D4ED8); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 38px; font-weight: 900; color: white; margin-bottom: 20px; box-shadow: 0 10px 25px rgba(59,130,246,0.4);">M</div>
      <h1 class="slide-title" style="font-size: 44px; margin-bottom: 12px;">MEDYORA</h1>
      <p style="font-size: 20px; color: #93C5FD; font-weight: 600; margin-bottom: 25px;">India's Smartest AI Healthcare Platform & OPD Queue Ecosystem</p>
      
      <div class="grid-3" style="max-width: 850px; margin-top: 15px;">
        <div class="card" style="padding: 16px;">
          <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Designed & Engineered By</div>
          <div style="font-size: 15px; font-weight: 700; color: white; margin-top: 4px;">Ritik Kumar & Team</div>
          <div style="font-size: 12px; color: #60A5FA;">Binarize Technologies</div>
        </div>
        <div class="card" style="padding: 16px;">
          <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Core Tech Stack</div>
          <div style="font-size: 15px; font-weight: 700; color: white; margin-top: 4px;">TanStack Start (SSR)</div>
          <div style="font-size: 12px; color: #34D399;">React 19 + Supabase</div>
        </div>
        <div class="card" style="padding: 16px;">
          <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Core Mission</div>
          <div style="font-size: 15px; font-weight: 700; color: white; margin-top: 4px;">Zero Waiting Rooms</div>
          <div style="font-size: 12px; color: #F59E0B;">Real-Time Queue Telemetry</div>
        </div>
      </div>
    </div>
    <div class="speaker-notes-drawer">
      <span class="speaker-badge">Pitch</span>
      <span class="speaker-text">"Respected faculty and examiners, today we present Medyora — an enterprise healthcare ecosystem designed to eliminate India's 2-3 hour clinic waiting room friction through real-time queue telemetry and AI triage."</span>
    </div>
  </div>

  <!-- SLIDE 2: PROBLEM STATEMENT -->
  <div class="slide" data-slide="2">
    <div class="slide-header">
      <div>
        <div class="tag-badge" style="border-color: rgba(244,63,94,0.4); color: #FDA4AF; background: rgba(244,63,94,0.1);">The Healthcare Bottleneck</div>
        <div class="slide-title">The OPD Crisis in <span>Indian Healthcare</span></div>
      </div>
      <div class="slide-number-indicator">02 / 15</div>
    </div>
    <div class="slide-body">
      <div class="grid-2">
        <div class="card danger">
          <div class="card-icon">⏳</div>
          <div class="card-title">120–180 Min Queue Delays</div>
          <div class="card-desc">Patients waste half their working day in crowded, unhygienic waiting rooms with zero estimated arrival timing or queue visibility.</div>
        </div>
        <div class="card danger">
          <div class="card-icon">📄</div>
          <div class="card-title">Lost & Illegible Paper Prescriptions</div>
          <div class="card-desc">Poor handwriting causes dangerous medication dosage errors. Physical prescriptions frequently get lost, damaged, or misplaced.</div>
        </div>
        <div class="card danger">
          <div class="card-icon">🧩</div>
          <div class="card-title">Fragmented Medical History</div>
          <div class="card-desc">Zero continuity of health data when patients transition across clinics. Doctors lack historical lab reports and allergy logs during diagnosis.</div>
        </div>
        <div class="card danger">
          <div class="card-icon">🏥</div>
          <div class="card-title">Clinic Administrative Burnout</div>
          <div class="card-desc">Clinic staff face chaotic counter crowding trying to manually juggle walk-in patients alongside pre-booked online consultations.</div>
        </div>
      </div>
    </div>
    <div class="speaker-notes-drawer">
      <span class="speaker-badge">Pitch</span>
      <span class="speaker-text">"Across India, visiting a doctor means losing an entire day in waiting rooms. Paper prescriptions get lost and clinics operate without digital coordination. We built Medyora to solve all four of these pain points."</span>
    </div>
  </div>

  <!-- SLIDE 3: SOLUTION PILLARS -->
  <div class="slide" data-slide="3">
    <div class="slide-header">
      <div>
        <div class="tag-badge">Product Vision</div>
        <div class="slide-title">The Medyora Solution: <span>3 Connected Pillars</span></div>
      </div>
      <div class="slide-number-indicator">03 / 15</div>
    </div>
    <div class="slide-body">
      <div class="grid-3">
        <div class="card success">
          <div class="card-icon">👤</div>
          <div class="card-title">1. Patient Super-App</div>
          <div class="card-desc">• Multi-filter Doctor & Specialty Search<br>• Live OPD Queue Token Tracker<br>• 24/7 Smart Care AI Copilot<br>• Lifelong Family Health Vault</div>
        </div>
        <div class="card success">
          <div class="card-icon">🩺</div>
          <div class="card-title">2. Doctor Clinical Cockpit</div>
          <div class="card-desc">• Real-time Live OPD Queue Board<br>• Single-click 'Call Next' Patient Dispatch<br>• 60-Second Digital E-Prescription Builder<br>• Clinical History & Revenue Analytics</div>
        </div>
        <div class="card success">
          <div class="card-icon">🛡️</div>
          <div class="card-title">3. Platform Administration</div>
          <div class="card-desc">• Doctor License (MCI/NMC) Verification<br>• Unified Appointments & Payment Ledger<br>• CMS Clinical Health Articles Hub<br>• Enterprise Role-Based Access Barriers</div>
        </div>
      </div>
    </div>
    <div class="speaker-notes-drawer">
      <span class="speaker-badge">Pitch</span>
      <span class="speaker-text">"Medyora unites all three stakeholders into one seamless system: patients get zero-wait clinic appointments, doctors get an effortless clinical cockpit, and administrators maintain medical trust and verification."</span>
    </div>
  </div>

  <!-- SLIDE 4: ARCHITECTURE & TECH STACK -->
  <div class="slide" data-slide="4">
    <div class="slide-header">
      <div>
        <div class="tag-badge">Fullstack Engineering</div>
        <div class="slide-title">System Architecture & <span>Technology Stack</span></div>
      </div>
      <div class="slide-number-indicator">04 / 15</div>
    </div>
    <div class="slide-body">
      <div class="grid-4">
        <div class="card">
          <div class="card-icon">💻</div>
          <div class="card-title">Client Layer</div>
          <div class="card-desc">React 19 • Tailwind CSS v4 • Radix UI • Framer Motion • Recharts Data Viz</div>
        </div>
        <div class="card">
          <div class="card-icon">⚡</div>
          <div class="card-title">SSR & Server</div>
          <div class="card-desc">TanStack Start • Nitro Engine • 100% Type-Safe File Routes • Strict CSP Headers</div>
        </div>
        <div class="card">
          <div class="card-icon">🗄️</div>
          <div class="card-title">Data & Cloud</div>
          <div class="card-desc">Supabase PostgreSQL 14+ • Row Level Security (RLS) • Encrypted Storage Vault</div>
        </div>
        <div class="card">
          <div class="card-icon">📱</div>
          <div class="card-title">Mobile Distribution</div>
          <div class="card-desc">Capacitor v6 (Android/iOS) • Service Worker (PWA Offline) • i18n (EN/HI/MR)</div>
        </div>
      </div>
      <div class="card" style="margin-top: 18px; padding: 14px; background: rgba(59,130,246,0.06); border-color: rgba(59,130,246,0.2);">
        <div style="font-size: 13px; color: #93C5FD; font-weight: 600;">Data Flow: Client Request → Nitro SSR Server Function → PostgreSQL RLS Validation → Realtime State Cache</div>
      </div>
    </div>
    <div class="speaker-notes-drawer">
      <span class="speaker-badge">Pitch</span>
      <span class="speaker-text">"We chose TanStack Start and React 19 for instantaneous SSR page loading, Supabase PostgreSQL with strict Row Level Security for data integrity, and Capacitor to deploy identically to Android and iOS."</span>
    </div>
  </div>

  <!-- SLIDE 5: PATIENT JOURNEY -->
  <div class="slide" data-slide="5">
    <div class="slide-header">
      <div>
        <div class="tag-badge">Frictionless UX</div>
        <div class="slide-title">Patient Journey: <span>Discovery to Booking</span></div>
      </div>
      <div class="slide-number-indicator">05 / 15</div>
    </div>
    <div class="slide-body">
      <div class="step-row">
        <div class="step-box">
          <div style="font-size: 11px; font-weight: 800; color: #60A5FA;">STEP 01</div>
          <div style="font-size: 14px; font-weight: 700; color: white; margin: 4px 0;">Search & Filter</div>
          <div style="font-size: 12px; color: var(--text-muted);">Specialty, symptom or city</div>
        </div>
        <div class="step-arrow">→</div>
        <div class="step-box">
          <div style="font-size: 11px; font-weight: 800; color: #60A5FA;">STEP 02</div>
          <div style="font-size: 14px; font-weight: 700; color: white; margin: 4px 0;">Doctor Profile</div>
          <div style="font-size: 12px; color: var(--text-muted);">Fees, reviews & next slot</div>
        </div>
        <div class="step-arrow">→</div>
        <div class="step-box">
          <div style="font-size: 11px; font-weight: 800; color: #60A5FA;">STEP 03</div>
          <div style="font-size: 14px; font-weight: 700; color: white; margin: 4px 0;">Patient Select</div>
          <div style="font-size: 12px; color: var(--text-muted);">Self or Family profile</div>
        </div>
        <div class="step-arrow">→</div>
        <div class="step-box">
          <div style="font-size: 11px; font-weight: 800; color: #60A5FA;">STEP 04</div>
          <div style="font-size: 14px; font-weight: 700; color: white; margin: 4px 0;">Consult Mode</div>
          <div style="font-size: 12px; color: var(--text-muted);">In-Clinic, Video or Home</div>
        </div>
        <div class="step-arrow">→</div>
        <div class="step-box" style="border-color: #10B981; background: rgba(16,185,129,0.06);">
          <div style="font-size: 11px; font-weight: 800; color: #34D399;">STEP 05</div>
          <div style="font-size: 14px; font-weight: 700; color: white; margin: 4px 0;">Token Issued</div>
          <div style="font-size: 12px; color: #A7F3D0;">Token #14 Confirmed</div>
        </div>
      </div>
      <div class="grid-2" style="margin-top: 24px;">
        <div class="card" style="padding: 16px;">
          <div style="font-size: 14px; font-weight: 700; color: white;">⚡ Speed to Book: &lt; 60 Seconds</div>
          <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Streamlined 5-step modal completely removes registration friction.</div>
        </div>
        <div class="card" style="padding: 16px;">
          <div style="font-size: 14px; font-weight: 700; color: white;">💳 Flexible Payment Options</div>
          <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Supports instant online UPI/Cards or Pay-at-Clinic upon arrival.</div>
        </div>
      </div>
    </div>
    <div class="speaker-notes-drawer">
      <span class="speaker-badge">Pitch</span>
      <span class="speaker-text">"Booking an appointment takes under 60 seconds. A patient finds a doctor by symptom or specialty, chooses between in-clinic, video, or home visit, and instantly receives their digital token."</span>
    </div>
  </div>

  <!-- SLIDE 6: LIVE QUEUE TRACKER -->
  <div class="slide" data-slide="6">
    <div class="slide-header">
      <div>
        <div class="tag-badge" style="border-color: rgba(16,185,129,0.4); color: #6EE7B7; background: rgba(16,185,129,0.1);">Flagship Innovation</div>
        <div class="slide-title">Live Digital Token & <span>Queue Telemetry</span></div>
      </div>
      <div class="slide-number-indicator">06 / 15</div>
    </div>
    <div class="slide-body">
      <div class="grid-3">
        <div class="stat-card" style="border-color: rgba(59,130,246,0.3);">
          <div class="stat-number">#14</div>
          <div class="stat-label">Your Issued Token</div>
        </div>
        <div class="stat-card" style="border-color: rgba(245,158,11,0.3);">
          <div class="stat-number" style="color: #FBBF24;">#11</div>
          <div class="stat-label">Now In Doctor Cabin</div>
        </div>
        <div class="stat-card" style="border-color: rgba(16,185,129,0.3);">
          <div class="stat-number" style="color: #34D399;">~25m</div>
          <div class="stat-label">Estimated Wait Time</div>
        </div>
      </div>
      <div class="grid-2" style="margin-top: 20px;">
        <div class="card">
          <div class="card-title">🔔 Smart Audio Chimes & Notifications</div>
          <div class="card-desc">When Token #13 enters the cabin, Medyora fires an audio chime and mobile notification: "Your turn is next! Please proceed to the clinic cabin."</div>
        </div>
        <div class="card">
          <div class="card-title">🔄 Dynamic Slot Rescheduling</div>
          <div class="card-desc">Running late due to traffic? A patient can tap 1 button to shift to an afternoon slot and receive a fresh updated token without cancelling.</div>
        </div>
      </div>
    </div>
    <div class="speaker-notes-drawer">
      <span class="speaker-badge">Pitch</span>
      <span class="speaker-text">"This is Medyora's game-changer: patients track their token live from home. They only walk into the clinic when their turn is next, completely eliminating crowded waiting rooms."</span>
    </div>
  </div>

  <!-- SLIDE 7: SMART CARE AI COPILOT -->
  <div class="slide" data-slide="7">
    <div class="slide-header">
      <div>
        <div class="tag-badge">AI Clinical Intelligence</div>
        <div class="slide-title">24/7 Smart Care AI <span>Copilot & Triage</span></div>
      </div>
      <div class="slide-number-indicator">07 / 15</div>
    </div>
    <div class="slide-body">
      <div class="grid-2">
        <div class="card">
          <div class="card-title">🧠 2,300+ Heuristic Medical Rules</div>
          <div class="card-desc">Evaluates patient symptoms against ICD clinical conditions, calculating percentage probability scores and identifying emergency indicators.</div>
        </div>
        <div class="card">
          <div class="card-title">🎯 15 Specialized Diagnostic Modes</div>
          <div class="card-desc">Symptom Checker • Prescription OCR Reader • Lab Report Evaluation • Drug Interactions • Medicine Scanner • Diet & Fitness Planner.</div>
        </div>
        <div class="card">
          <div class="card-title">🚨 4-Tier Automated Triage Levels</div>
          <div class="card-desc">Classifies complaints into Low, Moderate, High, or Immediate Emergency Red Alerts with prominent 108/112 SOS call triggers.</div>
        </div>
        <div class="card">
          <div class="card-title">🩺 1-Click Specialist Doctor Routing</div>
          <div class="card-desc">Directly bridges triaged symptoms to verified medical specialists in the patient's city with instant pre-filled booking context.</div>
        </div>
      </div>
    </div>
    <div class="speaker-notes-drawer">
      <span class="speaker-badge">Pitch</span>
      <span class="speaker-text">"Our Care AI Copilot evaluates patient symptoms against 2,300+ clinical rules, flags emergency red flags, and immediately points patients to the exact medical specialist they need."</span>
    </div>
  </div>

  <!-- SLIDE 8: TELECONSULTATION -->
  <div class="slide" data-slide="8">
    <div class="slide-header">
      <div>
        <div class="tag-badge">Virtual Healthcare</div>
        <div class="slide-title">Encrypted Teleconsultation & <span>Video Care</span></div>
      </div>
      <div class="slide-number-indicator">08 / 15</div>
    </div>
    <div class="slide-body">
      <div class="grid-3">
        <div class="card">
          <div class="card-icon">🎥</div>
          <div class="card-title">Zero-Install Video Room</div>
          <div class="card-desc">Runs directly in modern web browsers and mobile apps with responsive camera and audio toggles.</div>
        </div>
        <div class="card">
          <div class="card-icon">💬</div>
          <div class="card-title">Live In-Call Messaging</div>
          <div class="card-desc">Patients and doctors can share text messages, image scans, and symptoms while remaining on the video stream.</div>
        </div>
        <div class="card">
          <div class="card-icon">🌐</div>
          <div class="card-title">Rural Tele-Health Reach</div>
          <div class="card-desc">Bridges Tier-2 and Tier-3 rural patients directly with premier metro medical specialists without travel costs.</div>
        </div>
      </div>
      <div class="card" style="margin-top: 18px; border-color: rgba(59,130,246,0.3); background: rgba(59,130,246,0.04);">
        <div style="font-size: 14px; font-weight: 700; color: white;">Seamless E-Prescription Delivery</div>
        <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">Doctors write and issue the digital prescription during the video call; the patient receives the PDF before the call terminates.</div>
      </div>
    </div>
    <div class="speaker-notes-drawer">
      <span class="speaker-badge">Pitch</span>
      <span class="speaker-text">"For remote care, Medyora provides an encrypted teleconsultation room where doctors and patients interact over video, exchange messages, and receive signed digital prescriptions instantly."</span>
    </div>
  </div>

  <!-- SLIDE 9: DOCTOR CLINICAL COCKPIT -->
  <div class="slide" data-slide="9">
    <div class="slide-header">
      <div>
        <div class="tag-badge">Doctor Experience</div>
        <div class="slide-title">Doctor Cockpit & <span>OPD Queue Manager</span></div>
      </div>
      <div class="slide-number-indicator">09 / 15</div>
    </div>
    <div class="slide-body">
      <div class="grid-3">
        <div class="card">
          <div class="card-title">📊 Live Queue Board</div>
          <div class="card-desc">Real-time status counters for 'Now Consulting', 'Waiting' (~12 min clear time), and 'Completed' patient visits today.</div>
        </div>
        <div class="card success">
          <div class="card-title">⚡ 1-Click 'Call Next'</div>
          <div class="card-desc">Single click advances the token counter and automatically fires an audio chime and notification to the waiting patient.</div>
        </div>
        <div class="card">
          <div class="card-title">📁 Instant Patient Dossier</div>
          <div class="card-desc">Instant access to the patient's age, gender, medical history, past allergies, and uploaded diagnostic lab reports.</div>
        </div>
      </div>
      <div class="grid-2" style="margin-top: 18px;">
        <div class="card">
          <div class="card-title">🔒 Verified Doctor Auth Gate</div>
          <div class="card-desc">Enforces Medical Council (MCI/NMC) registration number checks before unlocking the clinical console.</div>
        </div>
        <div class="card">
          <div class="card-title">💰 Analytics & Financial Ledger</div>
          <div class="card-desc">Tracks OPD vs Video consultation revenue, daily earnings, and patient retention analytics in real time.</div>
        </div>
      </div>
    </div>
    <div class="speaker-notes-drawer">
      <span class="speaker-badge">Pitch</span>
      <span class="speaker-text">"The Doctor Portal gives physicians total control over their OPD. A single tap on 'Call Next' summons the next patient, updates the live queue, and loads the patient's full medical dossier."</span>
    </div>
  </div>

  <!-- SLIDE 10: E-PRESCRIPTION BUILDER -->
  <div class="slide" data-slide="10">
    <div class="slide-header">
      <div>
        <div class="tag-badge">Clinical Documentation</div>
        <div class="slide-title">1-Minute E-Prescription & <span>PDF Engine</span></div>
      </div>
      <div class="slide-number-indicator">10 / 15</div>
    </div>
    <div class="slide-body">
      <div class="grid-2">
        <div class="card">
          <div class="card-title">💊 Structured Medication Rows</div>
          <div class="card-desc">• Typeahead medicine name search<br>• Dosage instructions (Morning / Afternoon / Night)<br>• Food timing: Before Meal / After Meal<br>• Course duration (e.g. 5 days)</div>
        </div>
        <div class="card">
          <div class="card-title">📄 Instant Vector PDF Export</div>
          <div class="card-desc">Powered by <code>jspdf</code>. Generates an official, publication-grade digital prescription complete with clinic header, diagnosis, advice, and doctor registration badge.</div>
        </div>
        <div class="card">
          <div class="card-title">🍏 Lifestyle & Follow-Up Advice</div>
          <div class="card-desc">Standardized clinical guidelines for dietary precautions, physical rest, hydration, and automated follow-up calendar reminders.</div>
        </div>
        <div class="card">
          <div class="card-title">📱 Zero Paper Loss</div>
          <div class="card-desc">Every issued prescription is permanently synced into the patient's cloud health vault for instant lifetime retrieval.</div>
        </div>
      </div>
    </div>
    <div class="speaker-notes-drawer">
      <span class="speaker-badge">Pitch</span>
      <span class="speaker-text">"Doctors can author an e-prescription in under a minute. Our system standardizes dosages and meal timings, generating a signed vector PDF that patients can download directly to their phones."</span>
    </div>
  </div>

  <!-- SLIDE 11: HEALTHCARE SUPERAPP -->
  <div class="slide" data-slide="11">
    <div class="slide-header">
      <div>
        <div class="tag-badge">Super-App Ecosystem</div>
        <div class="slide-title">Healthcare Super-App: <span>Ancillary Services</span></div>
      </div>
      <div class="slide-number-indicator">11 / 15</div>
    </div>
    <div class="slide-body">
      <div class="grid-3">
        <div class="card">
          <div class="card-icon">💊</div>
          <div class="card-title">Online Pharmacy</div>
          <div class="card-desc">Search medicines by brand or generic salt composition. Order doorstep delivery with automated prescription uploads.</div>
        </div>
        <div class="card">
          <div class="card-icon">🧪</div>
          <div class="card-title">Diagnostic Lab Tests</div>
          <div class="card-desc">100+ diagnostic tests and full-body health checkups with certified phlebotomists collecting blood samples at home.</div>
        </div>
        <div class="card">
          <div class="card-icon">👨‍👩‍👧</div>
          <div class="card-title">Family Health Manager</div>
          <div class="card-desc">Store medical records, vaccination dates, and prescriptions for parents, children, and spouses under 1 single phone login.</div>
        </div>
      </div>
      <div class="card" style="margin-top: 18px; border-color: rgba(16,185,129,0.3); background: rgba(16,185,129,0.04);">
        <div style="font-size: 14px; font-weight: 700; color: white;">End-to-End Patient Convenience</div>
        <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">Patients consult a doctor, receive their prescription, order prescribed medicines, and book follow-up lab tests without leaving Medyora.</div>
      </div>
    </div>
    <div class="speaker-notes-drawer">
      <span class="speaker-badge">Pitch</span>
      <span class="speaker-text">"Beyond doctor bookings, Medyora is a complete healthcare super-app offering medicine delivery, home-sample lab testing, and a family health vault for parents and children."</span>
    </div>
  </div>

  <!-- SLIDE 12: SECURITY & AUTH -->
  <div class="slide" data-slide="12">
    <div class="slide-header">
      <div>
        <div class="tag-badge">Security Architecture</div>
        <div class="slide-title">Data Privacy & <span>Institutional Security</span></div>
      </div>
      <div class="slide-number-indicator">12 / 15</div>
    </div>
    <div class="slide-body">
      <div class="grid-2">
        <div class="card success">
          <div class="card-title">🛡️ Row Level Security (RLS)</div>
          <div class="card-desc">Enforced directly inside Supabase PostgreSQL. Patients can only query their own appointments and medical records; zero cross-tenant data leakage.</div>
        </div>
        <div class="card success">
          <div class="card-title">🔐 Enterprise SecureStorage (TTL)</div>
          <div class="card-desc">Custom implementation in <code>secureStorage.ts</code>. Serializes sessions with Base64 encoding and automatic Time-To-Live expiration, auto-purging expired tokens.</div>
        </div>
        <div class="card success">
          <div class="card-title">🌐 Strict Security Headers (CSP)</div>
          <div class="card-desc">SSR responses enforced via <code>server.ts</code> with Content Security Policy, <code>X-Frame-Options: DENY</code>, <code>X-Content-Type-Options: nosniff</code>, and HSTS.</div>
        </div>
        <div class="card success">
          <div class="card-title">👥 Multi-Role Authorization (RBAC)</div>
          <div class="card-desc">Strict layout barrier segregation between <code>patient</code>, <code>doctor</code>, and <code>admin</code> roles using custom PostgreSQL stored procedures (<code>has_role()</code>).</div>
        </div>
      </div>
    </div>
    <div class="speaker-notes-drawer">
      <span class="speaker-badge">Pitch</span>
      <span class="speaker-text">"Handling medical data demands institutional security. Medyora enforces Supabase Row-Level Security, custom TTL encrypted session storage, and enterprise security headers to protect patient confidentiality."</span>
    </div>
  </div>

  <!-- SLIDE 13: LIVE PROTOTYPE & METRICS -->
  <div class="slide" data-slide="13">
    <div class="slide-header">
      <div>
        <div class="tag-badge">Prototype Validation</div>
        <div class="slide-title">Live Working Prototype: <span>Core Metrics</span></div>
      </div>
      <div class="slide-number-indicator">13 / 15</div>
    </div>
    <div class="slide-body">
      <div class="grid-4">
        <div class="stat-card">
          <div class="stat-number">68</div>
          <div class="stat-label">Dynamic File Routes</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" style="color: #34D399;">3</div>
          <div class="stat-label">Languages (EN/HI/MR)</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" style="color: #A78BFA;">100%</div>
          <div class="stat-label">TypeScript Type-Safe</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" style="color: #FBBF24;">&lt; 1s</div>
          <div class="stat-label">Isomorphic SSR Load</div>
        </div>
      </div>
      <div class="grid-2" style="margin-top: 20px;">
        <div class="card">
          <div class="card-title">📱 Tri-Platform Deployment</div>
          <div class="card-desc">Runs as a high-performance web app, an installable Progressive Web App (PWA) with offline service worker, and native Android/iOS apps via Capacitor.</div>
        </div>
        <div class="card">
          <div class="card-title">🌐 Native Indian Language Reach</div>
          <div class="card-desc">Full internationalization via <code>i18next</code> in English, Hindi (हिन्दी), and Marathi (मराठी) ensures accessibility for Tier-2 and Tier-3 users.</div>
        </div>
      </div>
    </div>
    <div class="speaker-notes-drawer">
      <span class="speaker-badge">Pitch</span>
      <span class="speaker-text">"Our prototype is 100% functional today. It features 68 type-safe routes, full multi-language support in English, Hindi, and Marathi, and runs identically on desktop, mobile web, and native mobile apps."</span>
    </div>
  </div>

  <!-- SLIDE 14: CURRENT GAPS & TRADE-OFFS -->
  <div class="slide" data-slide="14">
    <div class="slide-header">
      <div>
        <div class="tag-badge" style="border-color: rgba(245,158,11,0.4); color: #FDE68A; background: rgba(245,158,11,0.1);">Engineering Honesty</div>
        <div class="slide-title">Current Limitations & <span>Trade-offs</span></div>
      </div>
      <div class="slide-number-indicator">14 / 15</div>
    </div>
    <div class="slide-body">
      <div class="grid-2">
        <div class="card">
          <div class="card-title">1. Database Bridge</div>
          <div class="card-desc"><strong>Status:</strong> Supabase schema and types are ready, but UI currently relies on rich mock stores for standalone local demonstration.<br><strong>Next Step:</strong> Complete live Supabase query hook cutover.</div>
        </div>
        <div class="card">
          <div class="card-title">2. Video SFU Scaling</div>
          <div class="card-desc"><strong>Status:</strong> Front-end teleconsultation layout and controls are complete.<br><strong>Next Step:</strong> Wire up an enterprise WebRTC SFU (LiveKit Cloud or Agora) for multi-peer calls under low bandwidth.</div>
        </div>
        <div class="card">
          <div class="card-title">3. Payment Settlement</div>
          <div class="card-desc"><strong>Status:</strong> Interactive checkout UI supports UPI/Cards with client confirmation.<br><strong>Next Step:</strong> Implement server-side Razorpay webhook signature verification for escrow release.</div>
        </div>
        <div class="card">
          <div class="card-title">4. AI LLM Streaming</div>
          <div class="card-desc"><strong>Status:</strong> Local 2,300+ deterministic heuristic rule engine runs instantly at zero cost.<br><strong>Next Step:</strong> Connect streaming multimodal LLM (Gemini 2.5 Flash) for rare medical cases.</div>
        </div>
      </div>
    </div>
    <div class="speaker-notes-drawer">
      <span class="speaker-badge">Pitch</span>
      <span class="speaker-text">"As good engineers, we evaluate our system honestly: the entire UI, database schemas, and workflows are complete. The next steps before public launch are wiring up live Razorpay webhooks and WebRTC SFU servers."</span>
    </div>
  </div>

  <!-- SLIDE 15: FUTURE ROADMAP -->
  <div class="slide" data-slide="15">
    <div class="slide-header">
      <div>
        <div class="tag-badge">Strategic Vision</div>
        <div class="slide-title">Future Scalability: <span>National Roadmap</span></div>
      </div>
      <div class="slide-number-indicator">15 / 15</div>
    </div>
    <div class="slide-body">
      <div class="grid-4">
        <div class="card" style="border-color: rgba(59,130,246,0.3);">
          <div style="font-size: 11px; font-weight: 800; color: #60A5FA;">PHASE 01</div>
          <div class="card-title" style="margin-top: 6px;">ABDM / ABHA ID</div>
          <div class="card-desc">Integration with Ayushman Bharat Digital Mission (14-digit ABHA health ID) for national medical records exchange.</div>
        </div>
        <div class="card" style="border-color: rgba(16,185,129,0.3);">
          <div style="font-size: 11px; font-weight: 800; color: #34D399;">PHASE 02</div>
          <div class="card-title" style="margin-top: 6px;">Redis Pub/Sub</div>
          <div class="card-desc">Sub-second WebSocket queue broadcasting and automated WhatsApp arrival alerts when patients are 2 tokens away.</div>
        </div>
        <div class="card" style="border-color: rgba(167,139,250,0.3);">
          <div style="font-size: 11px; font-weight: 800; color: #A78BFA;">PHASE 03</div>
          <div class="card-title" style="margin-top: 6px;">Regional Voice AI</div>
          <div class="card-desc">Voice-first symptom checker in Hindi, Marathi, and Tamil using Whisper and Gemini multimodal speech models.</div>
        </div>
        <div class="card" style="border-color: rgba(245,158,11,0.3);">
          <div style="font-size: 11px; font-weight: 800; color: #FBBF24;">PHASE 04</div>
          <div class="card-title" style="margin-top: 6px;">Hospital Kiosks</div>
          <div class="card-desc">Physical touchscreen receptionist kiosks with Bluetooth thermal token printers for walk-in OPD patients.</div>
        </div>
      </div>
      <div class="card" style="margin-top: 20px; text-align: center; border-color: rgba(59,130,246,0.3); background: rgba(59,130,246,0.06); padding: 16px;">
        <div style="font-size: 16px; font-weight: 800; color: white;">Thank You! We are now open for Questions & Live Demo.</div>
        <div style="font-size: 12px; color: #93C5FD; margin-top: 4px;">Ritik Kumar & Team • Binarize Technologies • Medyora Healthcare</div>
      </div>
    </div>
    <div class="speaker-notes-drawer">
      <span class="speaker-badge">Pitch</span>
      <span class="speaker-text">"Our future vision aligns with the Ayushman Bharat Digital Mission, bringing national ABHA health ID integration, sub-second Redis live queue updates, and voice-assisted healthcare in every regional Indian language. Thank you!"</span>
    </div>
  </div>

</div>

<!-- BOTTOM NAVIGATION BAR -->
<div id="controls-bar">
  <button class="nav-btn" id="prev-btn">← Previous Slide</button>
  <div style="font-size: 12px; color: var(--text-muted);">
    Navigate: <kbd style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">←</kbd> <kbd style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">→</kbd> or <kbd style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">Space</kbd> • Fullscreen: <kbd style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">F</kbd>
  </div>
  <button class="nav-btn" id="next-btn">Next Slide →</button>
</div>

<script>
  let currentSlide = 1;
  const totalSlides = 15;
  const slides = document.querySelectorAll('.slide');
  const progressBar = document.getElementById('progress-bar');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  function updateSlide(index) {
    if (index < 1 || index > totalSlides) return;
    currentSlide = index;

    slides.forEach((s, idx) => {
      s.classList.toggle('active', idx + 1 === currentSlide);
    });

    progressBar.style.width = (currentSlide / totalSlides * 100) + '%';
    prevBtn.disabled = (currentSlide === 1);
    nextBtn.innerText = (currentSlide === totalSlides) ? 'Finish Demo' : 'Next Slide →';
  }

  prevBtn.addEventListener('click', () => updateSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => updateSlide(currentSlide + 1));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      updateSlide(currentSlide + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      updateSlide(currentSlide - 1);
    } else if (e.key === 'f' || e.key === 'F') {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    }
  });

  updateSlide(1);
</script>

</body>
</html>
"""

with open("medyora_presentation.html", "w", encoding="utf-8") as f:
    f.write(html_code)

print("Generated medyora_presentation.html successfully!")
