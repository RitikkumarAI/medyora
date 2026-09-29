import React, { useState, useEffect } from "react";
import {
  Bed,
  HeartPulse,
  Wind,
  Baby,
  Activity,
  ShieldCheck,
  Clock,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Building2,
  Filter,
  RefreshCw,
  Share2,
  QrCode,
  X,
  Phone,
  Navigation,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { sendLiveAlert } from "@/shared/components/LiveNotificationPhoneDrawer";

export type BedUnitType = "ICU" | "VENTILATOR" | "NICU" | "CCU";
export type BedStatus = "available" | "occupied" | "sanitizing" | "held";

export interface IndividualBed {
  id: string;
  code: string;
  unit: BedUnitType;
  hospitalId: string;
  hospitalName: string;
  ward: string;
  status: BedStatus;
  patientInitials?: string;
  vitals?: {
    spo2: number;
    hr: number;
    bp?: string;
  };
  ventilatorMode?: string;
  incubatorTemp?: string;
  heldUntil?: number; // timestamp
  heldBy?: string;
  token?: string;
}

const INITIAL_BEDS_DATA: IndividualBed[] = [
  // AIIMS Trauma Centre (hosp-4)
  { id: "aiims-icu-1", code: "ICU-01", unit: "ICU", hospitalId: "hosp-4", hospitalName: "AIIMS Apex Trauma Centre", ward: "3rd Floor Critical Block A", status: "occupied", patientInitials: "R.S.", vitals: { spo2: 96, hr: 82, bp: "125/84" } },
  { id: "aiims-icu-2", code: "ICU-02", unit: "ICU", hospitalId: "hosp-4", hospitalName: "AIIMS Apex Trauma Centre", ward: "3rd Floor Critical Block A", status: "available" },
  { id: "aiims-icu-3", code: "ICU-03", unit: "ICU", hospitalId: "hosp-4", hospitalName: "AIIMS Apex Trauma Centre", ward: "3rd Floor Critical Block A", status: "sanitizing" },
  { id: "aiims-icu-4", code: "ICU-04", unit: "ICU", hospitalId: "hosp-4", hospitalName: "AIIMS Apex Trauma Centre", ward: "3rd Floor Critical Block A", status: "available" },
  { id: "aiims-vent-1", code: "VENT-01", unit: "VENTILATOR", hospitalId: "hosp-4", hospitalName: "AIIMS Apex Trauma Centre", ward: "ICU Pod B", status: "occupied", patientInitials: "K.L.", vitals: { spo2: 98, hr: 88 }, ventilatorMode: "PRVC 450ml" },
  { id: "aiims-vent-2", code: "VENT-02", unit: "VENTILATOR", hospitalId: "hosp-4", hospitalName: "AIIMS Apex Trauma Centre", ward: "ICU Pod B", status: "available", ventilatorMode: "Hamilton G5 Standby" },
  { id: "aiims-nicu-1", code: "NICU-01", unit: "NICU", hospitalId: "hosp-4", hospitalName: "AIIMS Apex Trauma Centre", ward: "Pediatric Tower 2nd Fl", status: "occupied", incubatorTemp: "36.8°C", vitals: { spo2: 99, hr: 138 } },
  { id: "aiims-nicu-2", code: "NICU-02", unit: "NICU", hospitalId: "hosp-4", hospitalName: "AIIMS Apex Trauma Centre", ward: "Pediatric Tower 2nd Fl", status: "available", incubatorTemp: "Pre-Warmed 36.5°C" },
  { id: "aiims-ccu-1", code: "CCU-01", unit: "CCU", hospitalId: "hosp-4", hospitalName: "AIIMS Apex Trauma Centre", ward: "Cardiac Emergency 1st Fl", status: "occupied", patientInitials: "A.V.", vitals: { spo2: 95, hr: 104, bp: "150/95" } },
  { id: "aiims-ccu-2", code: "CCU-02", unit: "CCU", hospitalId: "hosp-4", hospitalName: "AIIMS Apex Trauma Centre", ward: "Cardiac Emergency 1st Fl", status: "available" },

  // Apollo Hospital (hosp-1)
  { id: "apollo-icu-1", code: "ICU-101", unit: "ICU", hospitalId: "hosp-1", hospitalName: "Apollo Multi-Speciality Hospital", ward: "Wing B, Level 4", status: "available" },
  { id: "apollo-icu-2", code: "ICU-102", unit: "ICU", hospitalId: "hosp-1", hospitalName: "Apollo Multi-Speciality Hospital", ward: "Wing B, Level 4", status: "occupied", patientInitials: "M.K.", vitals: { spo2: 94, hr: 76 } },
  { id: "apollo-icu-3", code: "ICU-103", unit: "ICU", hospitalId: "hosp-1", hospitalName: "Apollo Multi-Speciality Hospital", ward: "Wing B, Level 4", status: "available" },
  { id: "apollo-vent-1", code: "VENT-101", unit: "VENTILATOR", hospitalId: "hosp-1", hospitalName: "Apollo Multi-Speciality Hospital", ward: "Wing B Respiratory", status: "available", ventilatorMode: "Dräger Evita V800 Ready" },
  { id: "apollo-vent-2", code: "VENT-102", unit: "VENTILATOR", hospitalId: "hosp-1", hospitalName: "Apollo Multi-Speciality Hospital", ward: "Wing B Respiratory", status: "occupied", patientInitials: "P.T.", vitals: { spo2: 97, hr: 90 }, ventilatorMode: "SIMV 500ml" },
  { id: "apollo-nicu-1", code: "NICU-101", unit: "NICU", hospitalId: "hosp-1", hospitalName: "Apollo Multi-Speciality Hospital", ward: "Neonatal Care Level 3", status: "available", incubatorTemp: "Sterilized 36.6°C" },
  { id: "apollo-nicu-2", code: "NICU-102", unit: "NICU", hospitalId: "hosp-1", hospitalName: "Apollo Multi-Speciality Hospital", ward: "Neonatal Care Level 3", status: "sanitizing" },
  { id: "apollo-ccu-1", code: "CCU-101", unit: "CCU", hospitalId: "hosp-1", hospitalName: "Apollo Multi-Speciality Hospital", ward: "Cardiac Cath Lab Wing", status: "available" },
  { id: "apollo-ccu-2", code: "CCU-102", unit: "CCU", hospitalId: "hosp-1", hospitalName: "Apollo Multi-Speciality Hospital", ward: "Cardiac Cath Lab Wing", status: "occupied", patientInitials: "D.J.", vitals: { spo2: 98, hr: 72 } },

  // Max Saket (hosp-2)
  { id: "max-icu-1", code: "MICU-01", unit: "ICU", hospitalId: "hosp-2", hospitalName: "Max Super Speciality Saket", ward: "Tower 1, 5th Floor", status: "available" },
  { id: "max-icu-2", code: "MICU-02", unit: "ICU", hospitalId: "hosp-2", hospitalName: "Max Super Speciality Saket", ward: "Tower 1, 5th Floor", status: "occupied", patientInitials: "S.C.", vitals: { spo2: 95, hr: 84 } },
  { id: "max-vent-1", code: "VENT-201", unit: "VENTILATOR", hospitalId: "hosp-2", hospitalName: "Max Super Speciality Saket", ward: "Tower 1 Critical Care", status: "available", ventilatorMode: "Puritan Bennett 980 Ready" },
  { id: "max-vent-2", code: "VENT-202", unit: "VENTILATOR", hospitalId: "hosp-2", hospitalName: "Max Super Speciality Saket", ward: "Tower 1 Critical Care", status: "occupied", patientInitials: "N.P.", vitals: { spo2: 96, hr: 94 } },
  { id: "max-nicu-1", code: "NICU-201", unit: "NICU", hospitalId: "hosp-2", hospitalName: "Max Super Speciality Saket", ward: "Mother & Child Wing", status: "available", incubatorTemp: "Giraffe OmniBed Ready" },
  { id: "max-ccu-1", code: "CCU-201", unit: "CCU", hospitalId: "hosp-2", hospitalName: "Max Super Speciality Saket", ward: "Heart Institute Level 2", status: "available" },

  // Fortis Escorts (hosp-3)
  { id: "fortis-icu-1", code: "FICU-11", unit: "ICU", hospitalId: "hosp-3", hospitalName: "Fortis Escorts Heart Institute", ward: "Surgical ICU Block", status: "occupied", patientInitials: "G.R.", vitals: { spo2: 93, hr: 78 } },
  { id: "fortis-icu-2", code: "FICU-12", unit: "ICU", hospitalId: "hosp-3", hospitalName: "Fortis Escorts Heart Institute", ward: "Surgical ICU Block", status: "available" },
  { id: "fortis-vent-1", code: "FVENT-01", unit: "VENTILATOR", hospitalId: "hosp-3", hospitalName: "Fortis Escorts Heart Institute", ward: "Post-Op Cardiac ICU", status: "available", ventilatorMode: "Maquet Servo-u Ready" },
  { id: "fortis-ccu-1", code: "FCCU-01", unit: "CCU", hospitalId: "hosp-3", hospitalName: "Fortis Escorts Heart Institute", ward: "Coronary Suite 1", status: "occupied", patientInitials: "V.S.", vitals: { spo2: 96, hr: 68 } },
  { id: "fortis-ccu-2", code: "FCCU-02", unit: "CCU", hospitalId: "hosp-3", hospitalName: "Fortis Escorts Heart Institute", ward: "Coronary Suite 1", status: "available" },
];

export function CityInteractiveBedGrid() {
  const [beds, setBeds] = useState<IndividualBed[]>(INITIAL_BEDS_DATA);
  const [selectedHospital, setSelectedHospital] = useState<string>("all");
  const [selectedUnit, setSelectedUnit] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [targetBedForHold, setTargetBedForHold] = useState<IndividualBed | null>(null);

  // Form fields for Golden Hour Hold
  const [patientName, setPatientName] = useState("");
  const [attendantMobile, setAttendantMobile] = useState("+91 98765-43210");
  const [severityNote, setSeverityNote] = useState("Suspected ARDS / Critical Respiratory Distress");
  const [isHolding, setIsHolding] = useState(false);
  const [lastHoldToken, setLastHoldToken] = useState<string | null>(null);

  // Filter beds
  const filteredBeds = beds.filter((b) => {
    if (selectedHospital !== "all" && b.hospitalId !== selectedHospital) return false;
    if (selectedUnit !== "all" && b.unit !== selectedUnit) return false;
    if (selectedStatus !== "all" && b.status !== selectedStatus) return false;
    return true;
  });

  // Calculate live statistics
  const countAvailable = beds.filter((b) => b.status === "available").length;
  const countOccupied = beds.filter((b) => b.status === "occupied").length;
  const countSanitizing = beds.filter((b) => b.status === "sanitizing").length;
  const countHeld = beds.filter((b) => b.status === "held").length;

  const countIcuAvail = beds.filter((b) => b.unit === "ICU" && b.status === "available").length;
  const countVentAvail = beds.filter((b) => b.unit === "VENTILATOR" && b.status === "available").length;
  const countNicuAvail = beds.filter((b) => b.unit === "NICU" && b.status === "available").length;
  const countCcuAvail = beds.filter((b) => b.unit === "CCU" && b.status === "available").length;

  const handleHoldBedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetBedForHold) return;
    if (!patientName.trim()) {
      toast.error("Please enter the patient's full name for triage clearance");
      return;
    }

    setIsHolding(true);
    const token = `MED-HLD-${Math.floor(1000 + Math.random() * 9000)}`;

    setTimeout(() => {
      // Update bed state
      setBeds((prev) =>
        prev.map((b) =>
          b.id === targetBedForHold.id
            ? {
                ...b,
                status: "held",
                heldBy: patientName.trim(),
                token,
                heldUntil: Date.now() + 45 * 60 * 1000,
              }
            : b
        )
      );

      // Trigger Live WhatsApp & SMS Alerts to Family
      sendLiveAlert({
        type: "whatsapp",
        category: "bed_hold",
        sender: "Medyora Bed Command Center",
        recipient: attendantMobile,
        title: `🏥 ${targetBedForHold.unit} Bed Hold Confirmed (${targetBedForHold.code})`,
        body: `Priority Emergency Admission Pass Issued!\n• Hospital: ${targetBedForHold.hospitalName}\n• Bed: ${targetBedForHold.code} (${targetBedForHold.ward})\n• Patient: ${patientName.trim()}\n• Token ID: ${token}\n⏱️ Golden Hour 45-Minute Hold active until ${new Date(
          Date.now() + 45 * 60 * 1000
        ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}.\nShow this token at the Emergency Triage desk for instant bed allocation.`,
        actionText: "View Live City Bed Map",
        actionUrl: "/patient/beds",
        verifiedSender: true,
      });

      sendLiveAlert({
        type: "sms",
        category: "bed_hold",
        sender: "VM-MEDYOR",
        recipient: attendantMobile,
        title: `🏥 45-Min Bed Hold Pass: ${token}`,
        body: `EMERGENCY PASS: ${targetBedForHold.unit} Bed #${targetBedForHold.code} held for ${patientName.trim()} at ${targetBedForHold.hospitalName}. Token: ${token}. Valid for 45 mins.`,
        actionText: "Open Triage Gate Pass",
        actionUrl: "/patient/beds",
      });

      setLastHoldToken(token);
      setIsHolding(false);
      toast.success(
        `🚨 45-Minute Emergency Bed Hold Locked! Token #${token} generated and sent via WhatsApp.`,
        { duration: 8000 }
      );
    }, 700);
  };

  const handleReleaseBed = (bedId: string) => {
    setBeds((prev) =>
      prev.map((b) =>
        b.id === bedId
          ? {
              ...b,
              status: "available",
              heldBy: undefined,
              token: undefined,
              heldUntil: undefined,
            }
          : b
      )
    );
    toast.info("Emergency bed hold released back to general pool.");
  };

  return (
    <div className="space-y-6">
      {/* City Bed Grid Header Banner */}
      <div className="rounded-3xl p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/50 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                LIVE TELEMETRY
              </span>
              <span className="text-xs text-indigo-300 font-mono">
                Central ICU & Critical Care Command Grid
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <Activity className="size-6 text-emerald-400 animate-pulse" />
              Interactive City Live Bed Grid
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Real-time per-bed telemetry across Adult ICU, Invasive Ventilators, Neonatal NICU, and CCU. Tap any green vacant bed to lock a <strong>45-Minute Golden Hour Hold</strong> with instant WhatsApp family pass.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Total Vacant</p>
                <p className="text-lg font-black text-emerald-400">{countAvailable} Beds</p>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-amber-400" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">In Hold</p>
                <p className="text-lg font-black text-amber-400">{countHeld} Reserved</p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Counters by Unit Type */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10">
          <button
            onClick={() => setSelectedUnit(selectedUnit === "ICU" ? "all" : "ICU")}
            className={`p-3 rounded-2xl border text-left transition-all ${
              selectedUnit === "ICU"
                ? "bg-rose-500/20 border-rose-500 text-white"
                : "bg-white/5 border-white/10 hover:bg-white/10 text-slate-200"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-semibold text-rose-300">
              <span className="flex items-center gap-1.5">
                <Bed className="size-4" /> Adult ICU
              </span>
              <span className="text-lg font-black">{countIcuAvail}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Multi-organ support pods</p>
          </button>

          <button
            onClick={() => setSelectedUnit(selectedUnit === "VENTILATOR" ? "all" : "VENTILATOR")}
            className={`p-3 rounded-2xl border text-left transition-all ${
              selectedUnit === "VENTILATOR"
                ? "bg-teal-500/20 border-teal-500 text-white"
                : "bg-white/5 border-white/10 hover:bg-white/10 text-slate-200"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-semibold text-teal-300">
              <span className="flex items-center gap-1.5">
                <Wind className="size-4" /> Ventilator
              </span>
              <span className="text-lg font-black">{countVentAvail}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Invasive mechanical vents</p>
          </button>

          <button
            onClick={() => setSelectedUnit(selectedUnit === "NICU" ? "all" : "NICU")}
            className={`p-3 rounded-2xl border text-left transition-all ${
              selectedUnit === "NICU"
                ? "bg-purple-500/20 border-purple-500 text-white"
                : "bg-white/5 border-white/10 hover:bg-white/10 text-slate-200"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-semibold text-purple-300">
              <span className="flex items-center gap-1.5">
                <Baby className="size-4" /> NICU Pods
              </span>
              <span className="text-lg font-black">{countNicuAvail}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Heated infant incubators</p>
          </button>

          <button
            onClick={() => setSelectedUnit(selectedUnit === "CCU" ? "all" : "CCU")}
            className={`p-3 rounded-2xl border text-left transition-all ${
              selectedUnit === "CCU"
                ? "bg-sky-500/20 border-sky-500 text-white"
                : "bg-white/5 border-white/10 hover:bg-white/10 text-slate-200"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-semibold text-sky-300">
              <span className="flex items-center gap-1.5">
                <HeartPulse className="size-4" /> CCU / Cardiac
              </span>
              <span className="text-lg font-black">{countCcuAvail}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Telemetry & Cath lab</p>
          </button>
        </div>
      </div>

      {/* Grid Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Hospital selector */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Building2 className="size-4 text-slate-400 shrink-0" />
          <select
            value={selectedHospital}
            onChange={(e) => setSelectedHospital(e.target.value)}
            className="w-full sm:w-auto bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-semibold rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-hidden"
          >
            <option value="all">All Delhi NCR Hospitals (All Centers)</option>
            <option value="hosp-4">AIIMS Apex Trauma Centre</option>
            <option value="hosp-1">Apollo Multi-Speciality Hospital</option>
            <option value="hosp-2">Max Super Speciality Saket</option>
            <option value="hosp-3">Fortis Escorts Heart Institute</option>
          </select>
        </div>

        {/* Status Legend & Quick Status Filters */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <button
            onClick={() => setSelectedStatus("all")}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              selectedStatus === "all"
                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            All ({beds.length})
          </button>
          <button
            onClick={() => setSelectedStatus(selectedStatus === "available" ? "all" : "available")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              selectedStatus === "available"
                ? "bg-emerald-600 text-white"
                : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Vacant ({countAvailable})</span>
          </button>
          <button
            onClick={() => setSelectedStatus(selectedStatus === "held" ? "all" : "held")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              selectedStatus === "held"
                ? "bg-amber-600 text-white"
                : "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span>Held ({countHeld})</span>
          </button>
          <button
            onClick={() => setSelectedStatus(selectedStatus === "occupied" ? "all" : "occupied")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              selectedStatus === "occupied"
                ? "bg-rose-600 text-white"
                : "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            <span>In Use ({countOccupied})</span>
          </button>
          <button
            onClick={() => setSelectedStatus(selectedStatus === "sanitizing" ? "all" : "sanitizing")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              selectedStatus === "sanitizing"
                ? "bg-blue-600 text-white"
                : "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <span>Sanitizing ({countSanitizing})</span>
          </button>
        </div>
      </div>

      {/* Interactive Visual Bed Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBeds.map((bed) => {
          const isAvailable = bed.status === "available";
          const isOccupied = bed.status === "occupied";
          const isSanitizing = bed.status === "sanitizing";
          const isHeld = bed.status === "held";

          return (
            <div
              key={bed.id}
              className={`relative rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                isAvailable
                  ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/80 shadow-xs hover:border-emerald-500 hover:shadow-md cursor-pointer"
                  : isHeld
                  ? "bg-amber-50/60 dark:bg-amber-950/30 border-amber-400 dark:border-amber-700/80 shadow-md"
                  : isOccupied
                  ? "bg-slate-100/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 opacity-90"
                  : "bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/60"
              }`}
              onClick={() => {
                if (isAvailable) {
                  setTargetBedForHold(bed);
                  setLastHoldToken(null);
                }
              }}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider ${
                        bed.unit === "ICU"
                          ? "bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-800"
                          : bed.unit === "VENTILATOR"
                          ? "bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-300 dark:border-teal-800"
                          : bed.unit === "NICU"
                          ? "bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-300 dark:border-purple-800"
                          : "bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-300 dark:border-sky-800"
                      }`}
                    >
                      {bed.unit}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                      {bed.code}
                    </span>
                  </div>

                  {/* Status Indicator */}
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isAvailable
                        ? "bg-emerald-500 text-white animate-pulse"
                        : isHeld
                        ? "bg-amber-500 text-white"
                        : isOccupied
                        ? "bg-slate-300 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {isAvailable && "🟢 VACANT"}
                    {isHeld && "🔒 HELD"}
                    {isOccupied && "🔴 IN USE"}
                    {isSanitizing && "🟡 STERILIZING"}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                  {bed.hospitalName}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                  {bed.ward}
                </p>

                {/* Telemetry / Equipment specs */}
                <div className="mt-3 p-2.5 rounded-xl bg-white dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800/80 text-[11px] space-y-1">
                  {isAvailable && (
                    <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="size-3.5" /> Ready for Admission
                      </span>
                      <span>Oxygen: 15L Piped</span>
                    </div>
                  )}

                  {isHeld && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-amber-600 dark:text-amber-400 font-bold">
                        <span className="flex items-center gap-1">
                          <Lock className="size-3" /> Token #{bed.token}
                        </span>
                        <span>45m Hold</span>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate">Held for: {bed.heldBy}</p>
                    </div>
                  )}

                  {isOccupied && bed.vitals && (
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-300 font-mono text-[10px]">
                      <span>SpO2: {bed.vitals.spo2}%</span>
                      <span>HR: {bed.vitals.hr} bpm</span>
                      {bed.vitals.bp && <span>BP: {bed.vitals.bp}</span>}
                    </div>
                  )}

                  {bed.ventilatorMode && (
                    <p className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">
                      Ventilator: {bed.ventilatorMode}
                    </p>
                  )}

                  {bed.incubatorTemp && (
                    <p className="text-[10px] text-purple-600 dark:text-purple-400 font-medium">
                      Incubator: {bed.incubatorTemp}
                    </p>
                  )}

                  {isSanitizing && (
                    <p className="text-[10px] text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1">
                      <RefreshCw className="size-3 animate-spin" /> UV-C Disinfection in progress (7m remaining)
                    </p>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-3 pt-2">
                {isAvailable ? (
                  <Button
                    size="sm"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm h-8 flex items-center justify-center gap-1.5"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTargetBedForHold(bed);
                      setLastHoldToken(null);
                    }}
                  >
                    <Lock className="size-3.5" />
                    <span>Lock 45-Min Hold</span>
                  </Button>
                ) : isHeld ? (
                  <div className="flex items-center gap-2">
                    <span className="flex-1 text-center py-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-300 dark:border-amber-800">
                      Protected
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReleaseBed(bed.id);
                      }}
                      className="px-2 py-1 text-[10px] text-slate-400 hover:text-rose-500 font-medium"
                    >
                      Release
                    </button>
                  </div>
                ) : (
                  <span className="block text-center py-1 text-[11px] font-medium text-slate-400 bg-slate-100 dark:bg-slate-800/40 rounded-lg">
                    {isOccupied ? "Occupied" : "Turnover"}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Golden Hour 45-Minute Emergency Bed Hold Modal */}
      {targetBedForHold && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md">
                  <ShieldCheck className="size-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                    Golden Hour Emergency Bed Hold (45 Mins)
                  </h3>
                  <p className="text-xs text-emerald-100">
                    Instantly locks bed in central hospital registry & alerts family via WhatsApp
                  </p>
                </div>
              </div>
              <button
                onClick={() => setTargetBedForHold(null)}
                className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Selected Bed Summary Card */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase px-2 py-0.5 rounded bg-emerald-600 text-white tracking-wider">
                    {targetBedForHold.unit} BED
                  </span>
                  <span className="font-mono text-sm font-extrabold text-emerald-700 dark:text-emerald-300">
                    Bed Code: {targetBedForHold.code}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {targetBedForHold.hospitalName}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {targetBedForHold.ward}
                </p>
              </div>

              {lastHoldToken ? (
                /* Success Confirmation State */
                <div className="text-center py-4 space-y-4">
                  <div className="p-4 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 mx-auto w-16 h-16 flex items-center justify-center">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900 dark:text-white">
                      Bed Locked Successfully!
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Token <strong className="font-mono text-emerald-600 text-sm">{lastHoldToken}</strong> is active for 45 minutes.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 text-left space-y-1">
                    <p className="font-bold text-emerald-600 flex items-center gap-1.5">
                      📱 WhatsApp & SMS Dispatched!
                    </p>
                    <p className="text-[11px]">
                      A digital admission pass with QR Code has been delivered to <strong>{attendantMobile}</strong> and synchronized with the Live Notification Drawer.
                    </p>
                  </div>
                  <Button
                    onClick={() => setTargetBedForHold(null)}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                  >
                    Done & Return to Grid
                  </Button>
                </div>
              ) : (
                /* Patient Admission Hold Form */
                <form onSubmit={handleHoldBedSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="patName" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Patient Full Name *
                    </Label>
                    <Input
                      id="patName"
                      required
                      placeholder="e.g. Ramesh Chandra Verma"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="h-10 text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="attMobile" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Attendant / Family WhatsApp Mobile *
                    </Label>
                    <Input
                      id="attMobile"
                      required
                      placeholder="+91 98765-XXXXX"
                      value={attendantMobile}
                      onChange={(e) => setAttendantMobile(e.target.value)}
                      className="h-10 text-xs font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="critNote" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Emergency Clinical Notes / Symptoms
                    </Label>
                    <Input
                      id="critNote"
                      placeholder="e.g. Severe Breathlessness, Acute MI, Trauma"
                      value={severityNote}
                      onChange={(e) => setSeverityNote(e.target.value)}
                      className="h-10 text-xs"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 text-xs flex items-start gap-2">
                    <Clock className="size-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-[11px] leading-relaxed">
                      <strong>Hospital Triage Protocol:</strong> The bed will remain held for 45 minutes from confirmation. Paramedics / patient must check-in before expiry.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setTargetBedForHold(null)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isHolding}
                      className="flex-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                    >
                      {isHolding ? (
                        <>
                          <RefreshCw className="size-4 animate-spin mr-2" />
                          Locking Bed...
                        </>
                      ) : (
                        <>
                          <Lock className="size-4 mr-2" />
                          Lock Bed for 45 Mins
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
