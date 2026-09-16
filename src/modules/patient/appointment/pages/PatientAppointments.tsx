import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  Search,
  Clock,
  MapPin,
  Ticket,
  MessageSquare,
  Repeat,
  User,
  AlertCircle,
  X,
  Bell,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  FileText,
  CalendarPlus,
  Download,
  Stethoscope,
  Pill,
  FlaskConical,
  ArrowRight,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAppointments } from "@/shared/data/patient-store";
import { type Appointment } from "@/shared/data/app-mock";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const TABS = ["Upcoming", "Completed", "Cancelled"] as const;

const TODAY_SLOTS = ["02:30 PM", "03:30 PM", "04:30 PM", "05:30 PM", "06:30 PM", "07:30 PM"];

export function PatientAppointments() {
  const router = useRouter();
  const { appointments, rescheduleToday, cancel } = useAppointments();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Upcoming");
  const [searchQuery, setSearchQuery] = useState("");

  // Reschedule Modal State
  const [rescheduleTarget, setRescheduleTarget] = useState<Appointment | null>(null);
  const [selectedRescheduleSlot, setSelectedRescheduleSlot] = useState<string>("04:30 PM");

  // Digital OPD Card Target State
  const [opdModalTarget, setOpdModalTarget] = useState<Appointment | null>(null);

  // WhatsApp simulation modal
  const [whatsAppModalTarget, setWhatsAppModalTarget] = useState<Appointment | null>(null);

  const list = appointments
    .filter((a) => (tab === "Upcoming" ? a.status === "Confirmed" : a.status === tab))
    .filter(
      (a) =>
        a.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.clinic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (a.patient && a.patient.toLowerCase().includes(searchQuery.toLowerCase())),
    );

  const handleConfirmReschedule = () => {
    if (!rescheduleTarget) return;
    rescheduleToday(rescheduleTarget.id, selectedRescheduleSlot);
    toast.success(`Rescheduled to today at ${selectedRescheduleSlot}. New Token Issued!`);
    setRescheduleTarget(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-24 font-sans transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 px-4 pt-6 pb-3 shadow-xs border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.history.back()}
            className="h-10 w-10 shrink-0 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xs rounded-full"
          >
            <ArrowLeft className="h-5 w-5 text-slate-700 dark:text-slate-200" />
          </Button>
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
              My Appointments
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {appointments.length} Total Bookings
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by doctor, clinic, or patient name..."
            className="pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-11 rounded-2xl text-xs font-medium focus-visible:ring-blue-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      {/* Smart Follow-up Reminder Banner (If completed visits exist) */}
      <div className="px-4 pt-3">
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-xs">
              <CalendarPlus className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-black">Smart Follow-up Due</p>
              <p className="text-[11px] text-blue-100">
                Dr. Rajesh Sharma recommended a 15-day review consultation
              </p>
            </div>
          </div>
          <Button
            asChild
            size="sm"
            className="h-8 px-3 rounded-xl bg-white text-blue-800 hover:bg-blue-50 font-black text-xs shrink-0 shadow-xs"
          >
            <Link to="/booking/$doctorId" params={{ doctorId: "dr-rajesh-sharma" }}>
              Book (₹0 Fee)
            </Link>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-2xl p-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
                tab === t
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4 max-w-3xl mx-auto w-full">
        {list.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-14 w-14 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mb-3">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              No {tab.toLowerCase()} appointments
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-[240px]">
              {tab === "Upcoming"
                ? "You don't have any active appointments scheduled."
                : `No appointments in ${tab.toLowerCase()} list.`}
            </p>
            {tab === "Upcoming" && (
              <Button
                asChild
                className="mt-4 rounded-2xl bg-blue-600 font-bold text-xs h-10 px-5 shadow-md shadow-blue-600/20"
              >
                <Link to="/doctors">Book an Appointment</Link>
              </Button>
            )}
          </div>
        ) : (
          list.map((a) => (
            <div
              key={a.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-4.5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3.5"
            >
              {/* Top Row: Date, Token & Status */}
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{a.date}</span>
                  <span className="text-xs font-semibold text-slate-500">• {a.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-lg border border-blue-100 dark:border-blue-900">
                    Token {a.token}
                  </span>
                  <Badge
                    variant={
                      a.status === "Confirmed"
                        ? "default"
                        : a.status === "Completed"
                          ? "secondary"
                          : "outline"
                    }
                    className={`text-[10px] font-bold ${a.status === "Confirmed" ? "bg-emerald-600 text-white" : ""}`}
                  >
                    {a.status}
                  </Badge>
                </div>
              </div>

              {/* Middle Row: Doctor & Patient info */}
              <div className="flex gap-3.5 items-start">
                <img
                  src={a.image}
                  alt={a.doctorName}
                  className="h-14 w-14 rounded-2xl object-cover border border-slate-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-[15px] text-slate-900 dark:text-white truncate">
                    {a.doctorName}
                  </h4>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {a.speciality}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {a.clinic} {a.city ? `• ${a.city}` : ""}
                  </p>

                  {/* Booked For Badge */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                      <User className="h-3 w-3 text-slate-500" />
                      For: {a.patient || "Self"}{" "}
                      {a.patientDetails?.relation ? `(${a.patientDetails.relation})` : ""}
                    </span>
                    {a.paymentMode && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${a.paymentMode === "online" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" : "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300"}`}
                      >
                        {a.paymentMode === "online" ? "Prepaid Online" : "Pay at Clinic"}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Row: Actions */}
              <div className="pt-1 flex flex-wrap gap-2">
                {a.status === "Confirmed" && (
                  <>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="flex-1 h-9 rounded-xl text-xs font-bold border-blue-200 text-blue-700 bg-blue-50/50 hover:bg-blue-100"
                    >
                      <Link to="/patient/queue">
                        <Clock className="h-3.5 w-3.5 mr-1" /> Live Queue (Token {a.token})
                      </Link>
                    </Button>

                    <Button
                      onClick={() => {
                        setRescheduleTarget(a);
                        setSelectedRescheduleSlot("04:30 PM");
                      }}
                      variant="outline"
                      size="sm"
                      className="flex-1 h-9 rounded-xl text-xs font-bold border-amber-200 text-amber-800 bg-amber-50/50 hover:bg-amber-100"
                    >
                      <Repeat className="h-3.5 w-3.5 mr-1" /> Reschedule Today
                    </Button>

                    <button
                      onClick={() => setWhatsAppModalTarget(a)}
                      className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 flex items-center justify-center shrink-0 border border-emerald-200"
                      title="Simulate WhatsApp Alert"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </button>
                  </>
                )}

                {a.status === "Completed" && (
                  <div className="flex gap-2 w-full">
                    <Button
                      onClick={() => setOpdModalTarget(a)}
                      size="sm"
                      className="flex-1 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <FileText className="h-4 w-4" /> Digital OPD Card & Prescription
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="flex-1 h-10 rounded-xl border-emerald-300 text-emerald-700 dark:text-emerald-300 bg-emerald-50/60 font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <Link to="/booking/$doctorId" params={{ doctorId: a.doctorId }}>
                        <CalendarPlus className="h-4 w-4 text-emerald-600" /> Book Follow-up
                      </Link>
                    </Button>
                  </div>
                )}

                {a.status === "Cancelled" && (
                  <Button
                    asChild
                    variant="default"
                    size="sm"
                    className="w-full h-9 rounded-xl text-xs font-bold bg-blue-600"
                  >
                    <Link to="/booking/$doctorId" params={{ doctorId: a.doctorId }}>
                      Rebook Appointment
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </main>

      {/* Digital OPD Card Modal */}
      <AnimatePresence>
        {opdModalTarget && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col"
            >
              {/* OPD Header */}
              <div className="p-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-xs">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-base text-white">Digital OPD Case Card</h3>
                    <p className="text-[11px] text-blue-100">
                      Token: {opdModalTarget.token} • Ref: {opdModalTarget.reference}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpdModalTarget(null)}
                  className="text-white/80 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* OPD Body */}
              <div className="p-6 overflow-y-auto space-y-4 text-xs">
                {/* Doctor & Clinic Stamp */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h4 className="font-black text-sm text-slate-900 dark:text-white">
                      {opdModalTarget.doctorName}
                    </h4>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold">
                      {opdModalTarget.speciality}
                    </p>
                    <p className="text-slate-400 text-[10px]">{opdModalTarget.clinic}</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-200">
                    Verified Digital OPD
                  </span>
                </div>

                {/* Patient Details & Vitals */}
                <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Patient:</span>
                    <strong className="text-slate-900 dark:text-white">
                      {opdModalTarget.patient || "Ritik Kumar"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">BP & Pulse:</span>
                    <strong className="text-slate-900 dark:text-white">120/80 • 74 bpm</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Consult Date:</span>
                    <strong className="text-slate-900 dark:text-white">
                      {opdModalTarget.date}
                    </strong>
                  </div>
                </div>

                {/* Clinical Diagnosis */}
                <div className="space-y-1.5 p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900">
                  <div className="flex items-center gap-1.5 text-blue-900 dark:text-blue-300 font-bold">
                    <Stethoscope className="h-4 w-4 text-blue-600" />
                    <span>Primary Clinical Diagnosis:</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">
                    Essential Hypertension (Stage 1) with Mild Exertional Fatigue. Cardiac rhythm
                    regular.
                  </p>
                </div>

                {/* Prescribed Medicines */}
                <div className="space-y-2">
                  <h5 className="font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Pill className="h-4 w-4 text-emerald-600" /> Prescribed Rx Medicines:
                  </h5>
                  <div className="space-y-1.5">
                    {[
                      {
                        name: "Tab. Telmisartan 40mg",
                        dosage: "1 Tab - Morning (After Breakfast)",
                        days: "30 Days",
                      },
                      {
                        name: "Tab. Rosuvastatin 10mg",
                        dosage: "1 Tab - Night (Bedtime)",
                        days: "30 Days",
                      },
                      {
                        name: "Cap. Vitamin D3 60K IU",
                        dosage: "1 Cap - Weekly Once (Sunday Morning)",
                        days: "8 Weeks",
                      },
                    ].map((med, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex justify-between items-center"
                      >
                        <div>
                          <strong className="text-slate-900 dark:text-white">{med.name}</strong>
                          <p className="text-[10px] text-slate-500">{med.dosage}</p>
                        </div>
                        <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md">
                          {med.days}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Advised Lab Tests */}
                <div className="space-y-1.5">
                  <h5 className="font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <FlaskConical className="h-4 w-4 text-purple-600" /> Advised Diagnostic Tests:
                  </h5>
                  <div className="flex gap-2">
                    <span className="p-2 rounded-xl bg-purple-50 text-purple-800 font-semibold border border-purple-200">
                      Lipid Profile (Fasting)
                    </span>
                    <span className="p-2 rounded-xl bg-purple-50 text-purple-800 font-semibold border border-purple-200">
                      Serum Creatinine & Electrolytes
                    </span>
                  </div>
                </div>

                {/* Follow-up Note */}
                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-950 dark:text-amber-200 flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Recommended Follow-up:</strong>
                    Doctor recommended follow-up review in 15 days with fresh Lipid Profile report.
                  </div>
                </div>
              </div>

              {/* OPD Actions */}
              <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex gap-2 shrink-0">
                <Button
                  onClick={() => toast.success("Digital OPD Card downloaded as PDF!")}
                  variant="outline"
                  className="flex-1 h-11 rounded-2xl border-slate-200 dark:border-slate-700 text-xs font-bold gap-1.5"
                >
                  <Download className="h-4 w-4" /> Download PDF
                </Button>
                <Button
                  asChild
                  className="flex-1 h-11 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20"
                >
                  <Link
                    to="/booking/$doctorId"
                    params={{ doctorId: opdModalTarget.doctorId }}
                    onClick={() => setOpdModalTarget(null)}
                  >
                    Book Follow-up Now
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Same-Day Reschedule Modal */}
      {rescheduleTarget && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in"
            onClick={() => setRescheduleTarget(null)}
          />

          <div className="relative w-full max-w-md bg-white rounded-t-[36px] sm:rounded-3xl p-6 shadow-2xl space-y-4 animate-in slide-in-from-bottom-full duration-300 z-10">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Repeat className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Reschedule for Today</h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Running late? Pick a later slot today
                  </p>
                </div>
              </div>
              <button
                onClick={() => setRescheduleTarget(null)}
                className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl text-xs space-y-1">
              <p className="font-bold text-slate-800">
                {rescheduleTarget.doctorName} • {rescheduleTarget.clinic}
              </p>
              <p className="text-slate-500">
                Current Slot: {rescheduleTarget.time} (Token {rescheduleTarget.token})
              </p>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                Available Later Slots Today
              </label>
              <div className="grid grid-cols-3 gap-2">
                {TODAY_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedRescheduleSlot(slot)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                      selectedRescheduleSlot === slot
                        ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-3 rounded-2xl text-xs text-blue-900 flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                A new token number will be generated immediately and sent to your WhatsApp.
              </span>
            </div>

            <div className="pt-2 flex gap-2">
              <Button
                variant="outline"
                onClick={() => setRescheduleTarget(null)}
                className="flex-1 h-12 rounded-2xl font-bold text-xs"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmReschedule}
                className="flex-1 h-12 rounded-2xl bg-blue-600 text-white font-bold text-xs shadow-lg shadow-blue-600/25"
              >
                Confirm Reschedule
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Message Preview Modal */}
      {whatsAppModalTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-[#ECE5DD] w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95">
            <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-sm">
                  MC
                </div>
                <div>
                  <h4 className="font-bold text-sm">MediConnect Alerts</h4>
                  <p className="text-[10px] text-emerald-200">Live Appointment Reminders</p>
                </div>
              </div>
              <button
                onClick={() => setWhatsAppModalTarget(null)}
                className="text-white hover:text-emerald-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 space-y-3 max-h-[380px] overflow-y-auto">
              <div className="bg-white p-3.5 rounded-2xl rounded-tl-sm shadow-sm text-xs text-slate-800 space-y-2 border border-slate-200">
                <p className="font-bold text-emerald-800 text-sm">✅ Live Appointment Update</p>
                <p>
                  Hello <strong>{whatsAppModalTarget.patient || "Rahul"}</strong>,
                </p>
                <p>
                  Your appointment reminder with <strong>{whatsAppModalTarget.doctorName}</strong>:
                </p>
                <div className="bg-slate-50 p-2.5 rounded-xl space-y-1 font-medium text-[11px]">
                  <p>
                    📍 <strong>Clinic:</strong> {whatsAppModalTarget.clinic}
                  </p>
                  <p>
                    🗓️ <strong>Scheduled For:</strong> {whatsAppModalTarget.date} at{" "}
                    {whatsAppModalTarget.time}
                  </p>
                  <p>
                    🎟️ <strong>Current Token:</strong> {whatsAppModalTarget.token}
                  </p>
                </div>
                <div className="bg-amber-50 p-2 rounded-lg text-amber-900 font-bold text-[11px]">
                  ⚠️ Arrive 15 minutes before your scheduled appointment time.
                </div>
                <p className="text-[10px] text-slate-400 text-right">
                  Sent via WhatsApp • Delivered
                </p>
              </div>

              {/* Countdown Reminder */}
              <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm text-xs text-slate-800 space-y-1 border border-slate-200">
                <p className="font-bold text-blue-700">⏰ Hourly Queue Tracker</p>
                <p className="text-[11px]">
                  Queue is moving on schedule. 2 patients currently ahead of you.
                </p>
                <p className="text-[10px] text-slate-400 text-right">Active Sync</p>
              </div>
            </div>

            <div className="p-3 bg-white border-t border-slate-200">
              <Button
                onClick={() => setWhatsAppModalTarget(null)}
                className="w-full rounded-xl bg-[#075E54] text-white font-bold text-xs h-10"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CalendarDaysIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}
