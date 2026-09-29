import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Smartphone,
  X,
  Bell,
  CheckCheck,
  Send,
  Sparkles,
  PhoneCall,
  ShieldAlert,
  HeartPulse,
  Bed,
  FileText,
  Volume2,
  VolumeX,
  Trash2,
  Clock,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export interface MedyoraNotificationItem {
  id: string;
  type: "whatsapp" | "sms";
  category: "emergency" | "bed_hold" | "prescription" | "opd_token" | "blood_donor" | "general";
  sender: string;
  recipient: string;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  actionText?: string;
  actionUrl?: string;
  verifiedSender?: boolean;
}

// Global dispatcher helper
export function sendLiveAlert(notification: Omit<MedyoraNotificationItem, "id" | "timestamp" | "read">) {
  if (typeof window === "undefined") return;
  const item: MedyoraNotificationItem = {
    ...notification,
    id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    read: false,
  };
  window.dispatchEvent(new CustomEvent("medyora:live-notification", { detail: item }));
}

const INITIAL_NOTIFICATIONS: MedyoraNotificationItem[] = [
  {
    id: "init-1",
    type: "whatsapp",
    category: "bed_hold",
    sender: "Medyora Emergency Central",
    recipient: "+91 98765-XXXXX (Family)",
    title: "🏥 ICU Bed Hold Confirmed (Token #ICU-492)",
    body: "Priority Adult ICU Bed #B-04 reserved at AIIMS Trauma Centre for Rahul Sharma.\n⏱️ 45-Minute Emergency Grace Period active until 20:30.\nToken ID: MED-ICU-8821.\nClick below to show QR at Hospital Triage Reception.",
    timestamp: "19:42",
    read: false,
    actionText: "Open Bed Hold QR Token",
    actionUrl: "/patient/beds",
    verifiedSender: true,
  },
  {
    id: "init-2",
    type: "sms",
    category: "emergency",
    sender: "VM-MEDYOR",
    recipient: "+91 98765-XXXXX",
    title: "🚨 SOS Alert: Emergency Contact Notified",
    body: "EMERGENCY: Smartwatch Fall SOS triggered for Sunita Devi at Connaught Place, New Delhi. 108 Ambulance Unit #DL-04-AB-1920 dispatched. Live GPS: https://medyora.org/sos/track?id=9928",
    timestamp: "19:35",
    read: false,
    actionText: "Track Live 108 Ambulance",
    actionUrl: "/patient/emergency-transport",
  },
  {
    id: "init-3",
    type: "whatsapp",
    category: "prescription",
    sender: "Dr. Ananya Sharma Clinic",
    recipient: "+91 98765-XXXXX",
    title: "💊 Digital Prescription Issued",
    body: "Namaste Rahul,\nYour e-Prescription (Rx-2026-9921) from Dr. Ananya Sharma is now ready with digital signature & QR code verification.\n• Tab. Augmentin 625 (1-0-1)\n• Tab. Dolo 650 (1-1-1)\nDelivery available via Medyora QuickMeds (30 mins).",
    timestamp: "18:50",
    read: true,
    actionText: "View Digital Rx",
    actionUrl: "/doctor/prescriptions",
    verifiedSender: true,
  },
  {
    id: "init-4",
    type: "sms",
    category: "opd_token",
    sender: "VK-MEDHLT",
    recipient: "+91 98765-XXXXX",
    title: "🎫 OPD Token Alert: 2 Patients Ahead",
    body: "Max Healthcare OPD: Token #A-14 for Dr. Rajesh Verma (Cardiology) is now active. You are Token #A-16 (approx 8 mins wait). Please report to OPD Consultation Room 204.",
    timestamp: "17:15",
    read: true,
    actionText: "View Live Token Queue",
    actionUrl: "/patient/appointments",
  },
];

export function LiveNotificationPhoneDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"whatsapp" | "sms" | "simulator">("whatsapp");
  const [notifications, setNotifications] = useState<MedyoraNotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentTime, setCurrentTime] = useState("");

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Soft notification chime generator via Web Audio API
  const playChime = () => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
      osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.25); // D6

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  useEffect(() => {
    const updateClock = () => {
      const d = new Date();
      setCurrentTime(d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    updateClock();
    const interval = setInterval(updateClock, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleIncoming = (e: Event) => {
      const customEvent = e as CustomEvent<MedyoraNotificationItem>;
      if (!customEvent.detail) return;
      const newItem = customEvent.detail;
      setNotifications((prev) => [newItem, ...prev]);
      playChime();
      toast.info(`📱 Live Alert: ${newItem.title}`, {
        description: newItem.body.slice(0, 75) + "...",
      });
    };

    window.addEventListener("medyora:live-notification", handleIncoming);
    return () => window.removeEventListener("medyora:live-notification", handleIncoming);
  }, [soundEnabled]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
    toast.success("Notification inbox cleared");
  };

  // Preset triggers for test demonstrations
  const triggerSimulation = (scenario: "sos" | "icu" | "blood" | "token" | "rx") => {
    if (scenario === "sos") {
      sendLiveAlert({
        type: "sms",
        category: "emergency",
        sender: "VM-MEDYOR",
        recipient: "+91 98765-XXXXX (Family)",
        title: "🚨 SOS: Heart Rate Spike (142 BPM)",
        body: "CRITICAL: Patient Vikram's smartwatch recorded tachycardia (142 BPM resting). 108 Emergency triage opened. Nearest responder dispatched.",
        actionText: "View Emergency Dashboard",
        actionUrl: "/patient/smartwatch-sync",
      });
      setActiveTab("sms");
    } else if (scenario === "icu") {
      sendLiveAlert({
        type: "whatsapp",
        category: "bed_hold",
        sender: "Medyora Bed Command Center",
        recipient: "+91 98765-XXXXX (Attendant)",
        title: "🏥 Ventilator Bed Hold Active (45-Min Pass)",
        body: "Bed #VEN-02 at Fortis Escorts Hospital held for emergency transfer.\nExpires in 45 minutes.\nToken: #MED-HLD-7731.\nParamedic handover coordinated.",
        actionText: "View Bed Live Grid",
        actionUrl: "/patient/beds",
        verifiedSender: true,
      });
      setActiveTab("whatsapp");
    } else if (scenario === "blood") {
      sendLiveAlert({
        type: "sms",
        category: "blood_donor",
        sender: "VK-MEDBLD",
        recipient: "+91 98765-XXXXX (Donor)",
        title: "🩸 Urgent O-ve Donor Matched",
        body: "Urgent Blood Need: 2 Units O-Negative required at Safdarjung Trauma Centre (2.4 km away). Medyora Uber-Health cab dispatched for free hospital pickup. OTP: 4492.",
        actionText: "Accept Hospital Pickup",
        actionUrl: "/patient/blood-bank",
      });
      setActiveTab("sms");
    } else if (scenario === "token") {
      sendLiveAlert({
        type: "whatsapp",
        category: "opd_token",
        sender: "Medyora OPD SmartQueue",
        recipient: "+91 98765-XXXXX",
        title: "🎫 Your Turn Calling: Room 102",
        body: "Dear Rahul, Doctor is now calling Token #A-12. Please proceed to Room 102 for Consultation with Dr. Rajesh Verma.",
        actionText: "Open Digital Token Pass",
        actionUrl: "/patient/appointments",
        verifiedSender: true,
      });
      setActiveTab("whatsapp");
    } else if (scenario === "rx") {
      sendLiveAlert({
        type: "whatsapp",
        category: "prescription",
        sender: "Medyora Digital Health",
        recipient: "+91 98765-XXXXX",
        title: "💊 Voice AI Prescription Ready",
        body: "Dr. Ananya Sharma issued your signed voice prescription (Acute Viral Bronchitis). 3 medicines prescribed. Tap below to order home delivery.",
        actionText: "View Prescription Details",
        actionUrl: "/doctor/prescriptions",
        verifiedSender: true,
      });
      setActiveTab("whatsapp");
    }
    toast.success("Simulated alert dispatched to family phone simulator!");
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "simulator") return true;
    return n.type === activeTab;
  });

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) */}
      <div className="fixed bottom-6 right-5 z-40">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) markAllAsRead();
          }}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900 dark:bg-slate-800 text-white shadow-2xl hover:shadow-emerald-500/20 border border-slate-700/80 hover:border-emerald-500/50 hover:scale-105 active:scale-95 transition-all group"
          title="Live WhatsApp & SMS Patient/Family Notification Simulator"
        >
          <div className="relative flex items-center justify-center">
            <Smartphone className="size-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-extrabold text-white animate-pulse">
                {unreadCount}
              </span>
            )}
          </div>
          <span className="text-xs font-bold tracking-tight flex items-center gap-1.5">
            <span>Live Alerts</span>
            <span className="hidden sm:inline text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-medium">
              WhatsApp · SMS
            </span>
          </span>
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
        </button>
      </div>

      {/* Floating Phone Simulator Drawer */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 z-50 flex max-w-full pl-6 sm:pl-16">
          {/* Backdrop on mobile */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity lg:hidden"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative w-screen max-w-md bg-slate-950 text-white shadow-2xl border-l border-slate-800 flex flex-col h-full overflow-hidden animate-in slide-in-from-right duration-300">
            {/* Phone Bezel Top / Dynamic Island Bar */}
            <div className="bg-slate-950 px-4 pt-3 pb-2 border-b border-slate-800/80 shrink-0">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-2">
                <span className="font-semibold text-slate-200">{currentTime || "19:45"}</span>
                {/* Dynamic Island Pill */}
                <div className="px-3 py-1 rounded-full bg-black/80 border border-slate-800 flex items-center gap-2 shadow-inner">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-emerald-400 font-sans font-bold">Medyora Live Feed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold">5G</span>
                  <div className="w-5 h-2.5 border border-slate-400 rounded-xs p-0.5 flex items-center">
                    <div className="h-full w-4/5 bg-emerald-400 rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* Title & Controls */}
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Smartphone className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                      Family Notification Simulator
                    </h3>
                    <p className="text-[11px] text-slate-400">Real-time patient WhatsApp & SMS alerts</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    title={soundEnabled ? "Mute notification sounds" : "Unmute notification sounds"}
                  >
                    {soundEnabled ? <Volume2 className="size-4 text-emerald-400" /> : <VolumeX className="size-4 text-slate-500" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="grid grid-cols-3 gap-1 mt-3 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab("whatsapp")}
                  className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === "whatsapp"
                      ? "bg-emerald-600 text-white shadow-sm font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <MessageSquare className="size-3.5" />
                  <span>WhatsApp</span>
                  <span className="text-[10px] px-1 rounded-full bg-emerald-700/80 font-mono">
                    {notifications.filter((n) => n.type === "whatsapp").length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("sms")}
                  className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === "sms"
                      ? "bg-sky-600 text-white shadow-sm font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Bell className="size-3.5" />
                  <span>SMS Gateway</span>
                  <span className="text-[10px] px-1 rounded-full bg-sky-700/80 font-mono">
                    {notifications.filter((n) => n.type === "sms").length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("simulator")}
                  className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === "simulator"
                      ? "bg-purple-600 text-white shadow-sm font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Sparkles className="size-3.5 text-amber-300" />
                  <span>Simulate</span>
                </button>
              </div>
            </div>

            {/* Main Phone Screen Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-900/90 dark:bg-slate-950">
              {activeTab === "simulator" ? (
                /* Live Simulation Control Panel for Examiners */
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-200 text-xs">
                    <p className="font-bold flex items-center gap-1.5 text-purple-300">
                      <Sparkles className="size-3.5" /> Examiner Live Test Suite
                    </p>
                    <p className="text-[11px] text-purple-300/80 mt-1">
                      Click any scenario below to trigger realistic live WhatsApp and SMS dispatch with synthesized audio chimes.
                    </p>
                  </div>

                  <div className="grid gap-2.5">
                    <button
                      onClick={() => triggerSimulation("icu")}
                      className="p-3 text-left rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 transition-all flex items-start gap-3 group"
                    >
                      <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                        <Bed className="size-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                          🏥 ICU Bed Hold Token (WhatsApp)
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                          Sends family WhatsApp notification with 45-minute golden hour grace period & admission token.
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() => triggerSimulation("sos")}
                      className="p-3 text-left rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-rose-500/50 transition-all flex items-start gap-3 group"
                    >
                      <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0">
                        <ShieldAlert className="size-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white group-hover:text-rose-300 transition-colors">
                          🚨 Smartwatch Fall / HR Spike (SMS)
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                          Sends emergency family SMS with GPS tracking link & 108 ambulance dispatch ID.
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() => triggerSimulation("blood")}
                      className="p-3 text-left rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-red-500/50 transition-all flex items-start gap-3 group"
                    >
                      <div className="p-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 shrink-0">
                        <HeartPulse className="size-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white group-hover:text-red-300 transition-colors">
                          🩸 Blood Donor Urgent Match (SMS)
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                          Sends SMS to matched rare blood donor with free hospital transit OTP.
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() => triggerSimulation("rx")}
                      className="p-3 text-left rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-blue-500/50 transition-all flex items-start gap-3 group"
                    >
                      <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 shrink-0">
                        <FileText className="size-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                          💊 Doctor Voice Rx Signed (WhatsApp)
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                          Sends patient verified WhatsApp message with instant medicine delivery options.
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() => triggerSimulation("token")}
                      className="p-3 text-left rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/50 transition-all flex items-start gap-3 group"
                    >
                      <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                        <Clock className="size-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                          🎫 OPD Queue Turn Calling (WhatsApp)
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                          Alerts patient that OPD doctor is calling their token number into room 102.
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                /* Notification List */
                <div className="space-y-3">
                  {filteredNotifications.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">
                      <Smartphone className="size-8 mx-auto mb-2 opacity-40" />
                      <p className="text-xs font-semibold">No messages in this tab yet</p>
                      <p className="text-[11px] text-slate-600 mt-1">Switch to Simulate tab to test alerts</p>
                    </div>
                  ) : (
                    filteredNotifications.map((item) => (
                      <div
                        key={item.id}
                        className={`rounded-2xl p-3.5 transition-all text-xs border ${
                          item.type === "whatsapp"
                            ? "bg-[#0b141a] border-emerald-900/60 shadow-lg"
                            : "bg-slate-800/90 border-slate-700/80 shadow-md"
                        }`}
                      >
                        {/* Header of message bubble */}
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span
                              className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded tracking-wider ${
                                item.type === "whatsapp"
                                  ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                                  : "bg-sky-950 text-sky-300 border border-sky-800"
                              }`}
                            >
                              {item.type === "whatsapp" ? "WhatsApp Business" : "SMS Gateway"}
                            </span>
                            <span className="font-bold text-slate-200 truncate text-[11px]">
                              {item.sender}
                            </span>
                            {item.verifiedSender && (
                              <span className="text-emerald-400 font-black text-xs" title="Verified Business">
                                ✓
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono shrink-0">
                            {item.timestamp}
                          </span>
                        </div>

                        {/* Title & Body */}
                        <h4 className="font-bold text-white mb-1.5 text-xs flex items-center gap-1.5">
                          {item.title}
                        </h4>
                        <p className="text-[11px] leading-relaxed text-slate-300 whitespace-pre-line font-sans">
                          {item.body}
                        </p>

                        {/* Interactive Action CTA */}
                        {item.actionText && item.actionUrl && (
                          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
                            <a
                              href={item.actionUrl}
                              onClick={() => setIsOpen(false)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                                item.type === "whatsapp"
                                  ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
                                  : "bg-sky-600 hover:bg-sky-500 text-white shadow-sm"
                              }`}
                            >
                              <span>{item.actionText}</span>
                              <ArrowRight className="size-3" />
                            </a>
                            <div className="flex items-center gap-1 text-[10px] text-slate-400">
                              <span>Delivered</span>
                              <CheckCheck className="size-3.5 text-sky-400" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Bottom Toolbar */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs shrink-0">
              <button
                onClick={clearAll}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-rose-400 transition-colors"
              >
                <Trash2 className="size-3" />
                <span>Clear history</span>
              </button>
              <span className="text-[10px] text-slate-500 font-mono">
                Medyora Notification Gateway v2.4
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
