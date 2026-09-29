import { useState, useEffect } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  Users,
  Clock,
  AlertCircle,
  CheckCircle2,
  MapPin,
  RefreshCcw,
  Bell,
  Repeat,
  X,
  Sparkles,
  Navigation,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DOCTORS } from "@/shared/data/mock";
import { useDoctorDelay } from "@/shared/data/doctor-store";
import { announceToken, playHospitalChime } from "@/shared/utils/sound-chime";
import { toast } from "sonner";

// Simulate 15 min per patient
const MINS_PER_PATIENT = 15;

const TODAY_LATER_SLOTS = ["02:30 PM", "03:30 PM", "04:30 PM", "05:30 PM", "06:30 PM", "07:30 PM"];

export function LiveQueue() {
  const router = useRouter();
  const { delay } = useDoctorDelay();

  // Simulated Queue State
  const [myToken, setMyToken] = useState(14);
  const [currentToken, setCurrentToken] = useState(11);
  const [notification, setNotification] = useState<string | null>(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedRescheduleSlot, setSelectedRescheduleSlot] = useState("04:30 PM");

  // Derived State with Doctor Delay Recalibration
  const patientsAhead = myToken - currentToken;
  const baseWaitTime = patientsAhead > 0 ? patientsAhead * MINS_PER_PATIENT : 0;
  const estWaitTime = baseWaitTime + (delay.isDelayed ? delay.delayMinutes : 0);
  const progressPercent = Math.min(100, Math.max(0, (currentToken / myToken) * 100));

  // Simulating Queue Progression with Voice Announcements
  useEffect(() => {
    if (currentToken >= myToken) return;

    // Simulate token advancing every 8 seconds for demo purposes
    const timer = setInterval(() => {
      setCurrentToken((prev) => {
        const next = prev + 1;

        // Trigger Audio Chime & Speech Notification
        if (next === myToken) {
          announceToken(String(myToken), "Rahul Kumar", "Doctor Cabin 1");
          setNotification(`It's your turn! Token #${myToken}, please enter the cabin.`);
          toast.success(`Ding-Dong! It is your turn! Please enter Doctor Cabin 1.`);
          clearInterval(timer);
        } else if (next === myToken - 1) {
          playHospitalChime();
          setNotification(`You're next! Token #${next} called. Please proceed to clinic door.`);
          toast.info(`Token #${next} called. You are next!`);
        } else {
          setNotification(`Token #${next} has been called in.`);
        }

        setTimeout(() => setNotification(null), 3500); // Hide toast after 3.5s
        return next;
      });
    }, 8000);

    return () => clearInterval(timer);
  }, [currentToken, myToken]);

  // Hardcoded to first doctor for demo
  const doctor = DOCTORS[0]!;

  const handleConfirmReschedule = () => {
    const newToken = Math.floor(Math.random() * 8) + 20; // e.g. token #22
    setMyToken(newToken);
    setShowRescheduleModal(false);
    toast.success(
      `Rescheduled to today at ${selectedRescheduleSlot}. Your new Token is #${newToken}`,
    );
    setNotification(`Slot rescheduled to ${selectedRescheduleSlot}. New Token #${newToken}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors pb-24">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm animate-in slide-in-from-top-10 fade-in duration-300">
          <div className="bg-slate-900 dark:bg-slate-800 text-white rounded-2xl p-4 shadow-2xl flex items-center gap-3 border border-slate-700">
            <Bell className="h-5 w-5 text-blue-400 shrink-0 animate-bounce" />
            <p className="text-sm font-medium">{notification}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 pt-6 pb-4 shadow-xs border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.history.back()}
            className="h-10 w-10 shrink-0 bg-slate-50 dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-700"
          >
            <ArrowLeft className="h-5 w-5 text-slate-700 dark:text-slate-200" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">Live Queue</h1>
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Tracking Active
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowRescheduleModal(true)}
            className="h-9 px-3 rounded-xl text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800 hover:bg-amber-100"
          >
            <Repeat className="h-3.5 w-3.5 mr-1 text-amber-600" /> Running Late?
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 shrink-0 bg-slate-50 dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-700"
            onClick={() => window.location.reload()}
          >
            <RefreshCcw className="h-4 w-4 text-slate-700 dark:text-slate-200" />
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* ================= LEFT COLUMN: Token Card & Status ================= */}
          <div className="md:col-span-6 space-y-6">
            {/* Clinic Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={doctor.image}
                  alt={doctor.clinic.name}
                  className="h-12 w-12 rounded-2xl object-cover border border-slate-100 dark:border-slate-800"
                />
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                    {doctor.clinic.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3" /> {doctor.clinic.address}, {doctor.clinic.city}
                  </p>
                </div>
              </div>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="rounded-xl text-xs font-bold border-slate-200 dark:border-slate-700"
              >
                <a href={`tel:${doctor.phone || "+919876543210"}`}>Call</a>
              </Button>
            </div>

            {/* ================= LIVE DOCTOR DELAY ALERT BANNER ================= */}
            {delay.isDelayed && (
              <div className="bg-amber-50 dark:bg-amber-950/70 border-2 border-amber-300 dark:border-amber-700/80 rounded-3xl p-5 shadow-md animate-in fade-in slide-in-from-top-4 duration-300 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-700 dark:text-amber-300 shrink-0">
                    <AlertCircle className="h-6 w-6 animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 dark:text-amber-300 bg-amber-200/60 dark:bg-amber-900/60 px-2 py-0.5 rounded-full">
                        Doctor Schedule Update
                      </span>
                      <span className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                        Updated {delay.updatedAt || "Just now"}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-amber-950 dark:text-amber-100 mt-1">
                      {doctor.fullName} is running ~{delay.delayMinutes} mins late
                    </h4>
                    <p className="text-xs text-amber-800/90 dark:text-amber-300/90 mt-0.5 leading-relaxed">
                      Reason: <strong className="font-semibold">{delay.reason}</strong>. Your estimated arrival time has been automatically shifted to prevent waiting room crowding.
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-amber-200/60 dark:border-amber-800/60 flex items-center justify-between text-xs text-amber-900 dark:text-amber-200">
                  <span className="flex items-center gap-1 font-medium">
                    ☕ <span>Take your time from home or visit a nearby café</span>
                  </span>
                  <button type="button" className="font-bold underline hover:opacity-80" onClick={() => setShowRescheduleModal(true)}>
                    Reschedule slot →
                  </button>
                </div>
              </div>
            )}

            {/* Smart Queue Acceleration Notice (Demonstrating No-Show Auto-Advance) */}
            <div className="bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-3 flex items-center gap-2.5 text-xs">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <p className="text-emerald-900 dark:text-emerald-200">
                <strong>Queue Auto-Pacing Active:</strong> If a prior patient is absent, the system bypasses their token within 5 mins, accelerating wait times so you are seen without delay.
              </p>
            </div>

            {/* Big Status Card (Screen 07) */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-[32px] p-6 shadow-xl shadow-blue-600/20 relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles className="h-32 w-32" />
              </div>

              <div className="relative z-10 space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
                  Live Queue Status
                </span>

                <div>
                  <p className="text-xs font-medium text-blue-100">Your Assigned Token</p>
                  <p className="text-6xl font-black tracking-tight text-white mt-1">#{myToken}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 border border-white/15">
                    <p className="text-2xl font-black">{patientsAhead > 0 ? patientsAhead : 0}</p>
                    <p className="text-[11px] font-medium text-blue-100 uppercase tracking-wider">
                      Patients Ahead
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 border border-white/15">
                    <p className="text-2xl font-black">
                      {estWaitTime} <span className="text-xs font-normal">MIN</span>
                    </p>
                    <p className="text-[11px] font-medium text-blue-100 uppercase tracking-wider">
                      Est. Wait Time
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-bold text-blue-100">
                    <span>Now Serving Token #{currentToken}</span>
                    <span>{Math.round(progressPercent)}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SMART GEO-ETA & DEPARTURE ALARM (Why Medyora beats a phone call) */}
            <div className="bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-3xl p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-indigo-600" />
                  <h4 className="text-xs font-bold text-indigo-950 dark:text-indigo-200">
                    Smart Travel & Clinic Arrival GPS Sync
                  </h4>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-200/60 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300">
                  GPS Live
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white dark:bg-slate-900 p-2.5 rounded-2xl border border-indigo-100 dark:border-indigo-900/40">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Your Distance</p>
                  <p className="font-black text-slate-900 dark:text-white mt-0.5">5.2 km (~18 mins)</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-2.5 rounded-2xl border border-indigo-100 dark:border-indigo-900/40">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Leave Home By</p>
                  <p className="font-black text-indigo-600 dark:text-indigo-400 mt-0.5">10:42 AM (in 14 mins)</p>
                </div>
              </div>

              <p className="text-[11px] text-indigo-800/80 dark:text-indigo-300/80">
                🔔 Medyora will ring an audio departure chime 10 mins before you need to leave.
              </p>
            </div>

            {/* Late Arrival / Reschedule Callout */}
            <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-3xl p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Repeat className="h-5 w-5 text-amber-600 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200">
                    Running late for this appointment?
                  </h4>
                  <p className="text-[11px] text-amber-700 dark:text-amber-400">
                    Reschedule to a later slot today without paying again.
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setShowRescheduleModal(true)}
                size="sm"
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shrink-0"
              >
                Reschedule
              </Button>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Live Queue Timeline ================= */}
          <div className="md:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                Clinic Live Queue
              </h3>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
                Active OPD
              </span>
            </div>

            <div className="space-y-2.5">
              {[
                { token: myToken - 3, status: "Completed", isCurrent: false, isUser: false },
                { token: myToken - 2, status: "Completed", isCurrent: false, isUser: false },
                { token: myToken - 1, status: "Completed", isCurrent: false, isUser: false },
                {
                  token: currentToken,
                  status: "Consulting",
                  isCurrent: true,
                  isUser: currentToken === myToken,
                },
                { token: myToken, status: "Your Turn", isCurrent: false, isUser: true },
              ]
                .filter((item) => item.token > 0)
                .map((item) => (
                  <div
                    key={item.token}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                      item.isUser
                        ? "bg-blue-50/80 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800 shadow-xs"
                        : item.isCurrent
                          ? "bg-amber-50/80 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800"
                          : "bg-slate-50 dark:bg-slate-800/60 border-slate-100 dark:border-slate-800 opacity-70"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-8 w-8 rounded-xl flex items-center justify-center font-black text-xs ${
                          item.isUser
                            ? "bg-blue-600 text-white"
                            : item.isCurrent
                              ? "bg-amber-500 text-white"
                              : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        #{item.token}
                      </span>
                      <div>
                        <p className="font-bold text-xs text-slate-900 dark:text-white">
                          {item.isUser ? "You (Rahul Kumar)" : `Patient #${item.token}`}
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">
                          {doctor.fullName}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md ${
                        item.isUser
                          ? "bg-blue-600 text-white"
                          : item.isCurrent
                            ? "bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 animate-pulse"
                            : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                Clinic Arrival Instructions
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Please arrive at {doctor.clinic.name} 15 minutes before your estimated turn time.
                Token calls are announced over the clinic audio system.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Same-day Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
            onClick={() => setShowRescheduleModal(false)}
          />

          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-t-[36px] sm:rounded-3xl p-6 shadow-2xl space-y-4 animate-in slide-in-from-bottom-full duration-300 z-10 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
                  <Repeat className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Running Late?
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Pick a later token today without losing queue priority
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl text-xs space-y-1">
              <p className="font-bold text-slate-800 dark:text-slate-200">
                {doctor.fullName} • {doctor.clinic.name}
              </p>
              <p className="text-slate-500 dark:text-slate-400">Current Token: #{myToken}</p>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                Select Today's Later Slot
              </label>
              <div className="grid grid-cols-3 gap-2">
                {TODAY_LATER_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedRescheduleSlot(slot)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                      selectedRescheduleSlot === slot
                        ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 p-3 rounded-2xl text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <span>A new token will be generated immediately and sent to your WhatsApp.</span>
            </div>

            <div className="pt-2 flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowRescheduleModal(false)}
                className="flex-1 h-12 rounded-2xl font-bold text-xs border-slate-200 dark:border-slate-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmReschedule}
                className="flex-1 h-12 rounded-2xl bg-blue-600 text-white font-bold text-xs shadow-lg shadow-blue-600/25"
              >
                Reschedule Slot
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Turn Ready Actions */}
      {patientsAhead === 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 z-40 animate-in slide-in-from-bottom-full duration-500">
          <Button className="w-full h-14 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-bold text-sm shadow-lg shadow-green-500/30">
            I'm Ready, Enter Cabin
          </Button>
        </div>
      )}
    </div>
  );
}
