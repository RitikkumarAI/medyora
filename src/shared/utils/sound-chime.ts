// Audio synthesizer for hospital token chime and Web Speech API announcement
// Runs 100% in-browser using Web Audio API without needing external sound assets

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioCtx || audioCtx.state === "closed") {
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a realistic, soothing 2-tone medical clinic chime (C5 523.25Hz -> G5 783.99Hz)
 */
export function playHospitalChime(): Promise<void> {
  return new Promise((resolve) => {
    try {
      const ctx = getAudioContext();
      if (!ctx) {
        resolve();
        return;
      }

      const now = ctx.currentTime;

      // Tone 1: 523.25 Hz (C5)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(523.25, now);

      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.25, now + 0.05);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.65);

      // Tone 2: 783.99 Hz (G5)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(783.99, now + 0.28);

      gain2.gain.setValueAtTime(0, now + 0.28);
      gain2.gain.linearRampToValueAtTime(0.3, now + 0.33);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.28);
      osc2.stop(now + 1.15);

      setTimeout(() => resolve(), 900);
    } catch {
      resolve();
    }
  });
}

/**
 * Announces token number and patient name using Web Speech API after chime
 */
export async function announceToken(token: string, patientName?: string, cabin = "Cabin 1"): Promise<void> {
  if (typeof window === "undefined") return;

  await playHospitalChime();

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel(); // Stop any pending speech

    const cleanToken = token.replace("#", "");
    const speechText = patientName
      ? `Token number ${cleanToken}, ${patientName}, please proceed to ${cabin}.`
      : `Token number ${cleanToken}, please proceed to ${cabin}.`;

    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    utterance.volume = 0.9;

    // Pick English (Indian) or standard English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) => v.lang.includes("en-IN") || v.lang.includes("en-GB") || v.lang.includes("en-US")
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    window.speechSynthesis.speak(utterance);
  }
}

/**
 * Plays an urgent high-visibility warning alarm beep (two rapid pulses)
 * Used during the 10-second countdown for critical vitals breach (e.g., Low BP drop)
 */
export function playEmergencyAlarmBeep(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(880, now); // A5 note
    osc.frequency.setValueAtTime(1046.5, now + 0.1); // C6 note

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.18);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.28);
  } catch {
    // Audio context may be blocked before interaction
  }
}

/**
 * Plays a realistic telephone ring cadence (400Hz + 450Hz Indian / International PSTN ring)
 */
export function playTelephoneRing(): Promise<void> {
  return new Promise((resolve) => {
    try {
      const ctx = getAudioContext();
      if (!ctx) {
        resolve();
        return;
      }

      const now = ctx.currentTime;
      const duration = 1.2;

      // Indian standard PSTN ring: 400Hz + 450Hz dual tone
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(400, now);

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(450, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
      gain.gain.setValueAtTime(0.2, now + duration - 0.05);
      gain.gain.linearRampToValueAtTime(0, now + duration);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);

      setTimeout(() => resolve(), duration * 1000 + 100);
    } catch {
      resolve();
    }
  });
}

/**
 * Synthesizes autonomous AI Voice Agent speech for 108 Emergency Dispatch call
 */
export function speakEmergencyRescueAgent(text: string, onEnd?: () => void): void {
  if (typeof window === "undefined") return;

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const voices = window.speechSynthesis.getVoices();
    // Prioritize natural English Indian / UK / US voice
    const preferredVoice =
      voices.find((v) => v.lang.includes("en-IN")) ||
      voices.find((v) => v.lang.includes("en-GB") && v.name.includes("Female")) ||
      voices.find((v) => v.lang.includes("en-US")) ||
      voices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    if (onEnd) {
      utterance.onend = () => onEnd();
      utterance.onerror = () => onEnd();
    }

    window.speechSynthesis.speak(utterance);
  } else if (onEnd) {
    onEnd();
  }
}

/**
 * Stop any ongoing speech synthesis
 */
export function stopSpeech(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

