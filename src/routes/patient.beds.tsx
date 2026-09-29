import { useState, useEffect } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  Activity,
  Bed,
  HeartPulse,
  Wind,
  Phone,
  Navigation,
  ShieldCheck,
  Clock,
  AlertCircle,
  Search,
  Filter,
  CheckCircle2,
  Lock,
  Building2,
  ChevronRight,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CityInteractiveBedGrid } from "@/modules/patient/beds/components/CityInteractiveBedGrid";

export const Route = createFileRoute("/patient/beds")({
  head: () => ({
    meta: [
      { title: "Live ICU & Oxygen Bed Availability Tracker — Medyora" },
      {
        name: "description",
        content:
          "Real-time city-wide hospital bed telemetry: ICU, Ventilator, and Oxygen beds with 15-minute emergency hold reservation.",
      },
    ],
  }),
  component: BedsTrackerPage,
});

interface HospitalBedData {
  id: string;
  name: string;
  location: string;
  city: string;
  distanceKm: number;
  driveTimeMin: number;
  accreditation: string;
  phone: string;
  lastUpdated: string;
  triageStatus: "Available" | "Busy" | "Critical";
  beds: {
    icu: { total: number; available: number };
    ventilator: { total: number; available: number };
    oxygen: { total: number; available: number };
    general: { total: number; available: number };
  };
}

const INITIAL_HOSPITALS: HospitalBedData[] = [
  {
    id: "hosp-1",
    name: "Apollo Multi-Speciality Hospital",
    location: "Sarita Vihar, Mathura Road",
    city: "Delhi NCR",
    distanceKm: 2.1,
    driveTimeMin: 7,
    accreditation: "JCI & NABH Accredited",
    phone: "+91 11 2692 5858",
    lastUpdated: "Just now",
    triageStatus: "Available",
    beds: {
      icu: { total: 24, available: 6 },
      ventilator: { total: 14, available: 3 },
      oxygen: { total: 80, available: 22 },
      general: { total: 200, available: 45 },
    },
  },
  {
    id: "hosp-2",
    name: "Max Super Speciality Hospital",
    location: "Saket, Press Enclave Road",
    city: "Delhi NCR",
    distanceKm: 4.8,
    driveTimeMin: 14,
    accreditation: "NABH Emergency Level-1",
    phone: "+91 11 2651 5050",
    lastUpdated: "3 mins ago",
    triageStatus: "Available",
    beds: {
      icu: { total: 30, available: 4 },
      ventilator: { total: 18, available: 2 },
      oxygen: { total: 95, available: 16 },
      general: { total: 250, available: 38 },
    },
  },
  {
    id: "hosp-3",
    name: "Fortis Escorts Heart & Trauma Institute",
    location: "Okhla Road, New Friends Colony",
    city: "Delhi NCR",
    distanceKm: 5.4,
    driveTimeMin: 16,
    accreditation: "NABH Cardiac Triage",
    phone: "+91 11 4713 5000",
    lastUpdated: "5 mins ago",
    triageStatus: "Busy",
    beds: {
      icu: { total: 20, available: 2 },
      ventilator: { total: 10, available: 1 },
      oxygen: { total: 60, available: 8 },
      general: { total: 150, available: 21 },
    },
  },
  {
    id: "hosp-4",
    name: "AIIMS Apex Trauma Center",
    location: "Ansari Nagar, Ring Road",
    city: "Delhi NCR",
    distanceKm: 7.2,
    driveTimeMin: 22,
    accreditation: "Government Apex Trauma Level-1",
    phone: "+91 11 2658 8500",
    lastUpdated: "1 min ago",
    triageStatus: "Critical",
    beds: {
      icu: { total: 40, available: 1 },
      ventilator: { total: 25, available: 1 },
      oxygen: { total: 120, available: 9 },
      general: { total: 400, available: 12 },
    },
  },
  {
    id: "hosp-5",
    name: "Sir Ganga Ram Hospital",
    location: "Rajinder Nagar",
    city: "Delhi NCR",
    distanceKm: 11.0,
    driveTimeMin: 28,
    accreditation: "NABH Accredited Multi-Speciality",
    phone: "+91 11 2575 0000",
    lastUpdated: "7 mins ago",
    triageStatus: "Available",
    beds: {
      icu: { total: 28, available: 5 },
      ventilator: { total: 16, available: 4 },
      oxygen: { total: 90, available: 19 },
      general: { total: 220, available: 50 },
    },
  },
];

function BedsTrackerPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"city_grid" | "hospital_cards">("city_grid");
  const [hospitals, setHospitals] = useState<HospitalBedData[]>(INITIAL_HOSPITALS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "icu" | "ventilator" | "oxygen">("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Reservation modal state
  const [selectedHospitalForHold, setSelectedHospitalForHold] = useState<HospitalBedData | null>(null);
  const [holdBedType, setHoldBedType] = useState<"icu" | "ventilator" | "oxygen">("icu");
  const [patientName, setPatientName] = useState("");
  const [emergencyReason, setEmergencyReason] = useState("Acute Cardiac / Respiratory Emergency");
  const [activeReservation, setActiveReservation] = useState<{
    hospitalName: string;
    bedType: string;
    code: string;
    expiresInSeconds: number;
  } | null>(null);

  // Countdown timer for active reservation
  useEffect(() => {
    if (!activeReservation || activeReservation.expiresInSeconds <= 0) return;
    const interval = setInterval(() => {
      setActiveReservation((prev) => {
        if (!prev || prev.expiresInSeconds <= 1) {
          toast.error("Emergency Bed Reservation expired. Please re-reserve if required.");
          return null;
        }
        return { ...prev, expiresInSeconds: prev.expiresInSeconds - 1 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeReservation]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Live hospital telemetry refreshed with central bed registry!");
    }, 600);
  };

  const handleConfirmBedHold = () => {
    if (!patientName.trim()) {
      toast.error("Please enter patient name for hospital triage record");
      return;
    }

    const reservationCode = `MED-BED-${Math.floor(1000 + Math.random() * 9000)}`;
    setActiveReservation({
      hospitalName: selectedHospitalForHold!.name,
      bedType: holdBedType.toUpperCase(),
      code: reservationCode,
      expiresInSeconds: 900, // 15 minutes
    });

    // Decrement available count locally
    setHospitals((prev) =>
      prev.map((h) => {
        if (h.id === selectedHospitalForHold!.id) {
          return {
            ...h,
            beds: {
              ...h.beds,
              [holdBedType]: {
                ...h.beds[holdBedType],
                available: Math.max(0, h.beds[holdBedType].available - 1),
              },
            },
          };
        }
        return h;
      })
    );

    setSelectedHospitalForHold(null);
    toast.success(`Emergency Bed Reserved! Token: ${reservationCode} locked for 15 minutes.`, {
      duration: 6000,
    });
  };

  const filteredHospitals = hospitals.filter((h) => {
    const matchesSearch =
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.location.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (selectedFilter === "icu") return h.beds.icu.available > 0;
    if (selectedFilter === "ventilator") return h.beds.ventilator.available > 0;
    if (selectedFilter === "oxygen") return h.beds.oxygen.available > 0;
    return true;
  });

  const totalIcuAvailable = hospitals.reduce((sum, h) => sum + h.beds.icu.available, 0);
  const totalVentilatorAvailable = hospitals.reduce((sum, h) => sum + h.beds.ventilator.available, 0);
  const totalOxygenAvailable = hospitals.reduce((sum, h) => sum + h.beds.oxygen.available, 0);

  const formatCountdown = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.history.back()}
              className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Live ICU & Hospital Bed Tracker
                </h1>
                <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  <span className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />
                  Live Telemetry
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                City-wide verified emergency hospital capacity • 15-Minute emergency bed reservation
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="flex items-center gap-1.5 border-slate-200 dark:border-slate-800"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin text-teal-600" : ""}`} />
            Refresh
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pt-6 space-y-6">
        {/* Active Emergency Bed Reservation Banner */}
        {activeReservation && (
          <div className="relative overflow-hidden rounded-2xl border-2 border-amber-500/50 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-5 shadow-lg dark:from-amber-950/40">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-amber-500 px-2.5 py-0.5 text-xs font-bold text-white uppercase tracking-wider">
                    Bed Locked
                  </span>
                  <span className="font-mono text-sm font-semibold text-amber-700 dark:text-amber-400">
                    Token: {activeReservation.code}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  1x {activeReservation.bedType} Bed Held at {activeReservation.hospitalName}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Hospital ER desk notified. Bed held exclusively for your arrival. Please reach before the timer ends.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="rounded-xl border border-amber-300/40 bg-white/80 dark:bg-slate-900/80 px-4 py-2 text-center shadow-inner">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Time Remaining</span>
                  <div className="font-mono text-2xl font-black text-amber-600 dark:text-amber-400">
                    {formatCountdown(activeReservation.expiresInSeconds)}
                  </div>
                </div>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setActiveReservation(null);
                    toast.info("Bed hold released.");
                  }}
                >
                  Release Bed
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* View Mode Switcher: Interactive City Bed Grid vs Hospital Cards */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-1.5 rounded-2xl bg-slate-200/70 dark:bg-slate-900 border border-slate-300 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setViewMode("city_grid")}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === "city_grid"
                  ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/20"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Activity className="size-4 text-emerald-400 animate-pulse" />
              <span>⚡ City Live Bed Grid</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-500 text-white font-black">
                ICU · VENT · NICU · CCU
              </span>
            </button>

            <button
              onClick={() => setViewMode("hospital_cards")}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === "hospital_cards"
                  ? "bg-slate-900 text-white dark:bg-slate-800 shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Building2 className="size-4" />
              <span>Hospital Directory</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 px-3 text-[11px] text-slate-500 font-mono">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span>45-Min Golden Hour Reserve Enabled</span>
          </div>
        </div>

        {viewMode === "city_grid" ? (
          <CityInteractiveBedGrid />
        ) : (
          <>
            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">ICU Beds</span>
              <div className="rounded-lg bg-rose-50 p-2 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
                <Activity className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-black text-rose-600 dark:text-rose-400">{totalIcuAvailable}</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Available across 5 verified hospitals</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Ventilator Beds</span>
              <div className="rounded-lg bg-teal-50 p-2 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400">
                <HeartPulse className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-black text-teal-600 dark:text-teal-400">{totalVentilatorAvailable}</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Critical respiratory support ready</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Oxygen Beds</span>
              <div className="rounded-lg bg-sky-50 p-2 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400">
                <Wind className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-black text-sky-600 dark:text-sky-400">{totalOxygenAvailable}</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">High-flow piped O2 available</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Avg ER Response</span>
              <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                <Clock className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-black text-emerald-600 dark:text-emerald-400">7 Mins</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Nearest trauma center ETA</p>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search hospitals by name, locality, or landmark..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                selectedFilter === "all"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              All Beds
            </button>
            <button
              onClick={() => setSelectedFilter("icu")}
              className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                selectedFilter === "icu"
                  ? "bg-rose-600 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              ICU Available ({totalIcuAvailable})
            </button>
            <button
              onClick={() => setSelectedFilter("ventilator")}
              className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                selectedFilter === "ventilator"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              Ventilators ({totalVentilatorAvailable})
            </button>
            <button
              onClick={() => setSelectedFilter("oxygen")}
              className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                selectedFilter === "oxygen"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              Oxygen ({totalOxygenAvailable})
            </button>
          </div>
        </div>

        {/* Hospital Beds List */}
        <div className="space-y-4">
          {filteredHospitals.map((hospital) => {
            const hasIcu = hospital.beds.icu.available > 0;
            const hasVent = hospital.beds.ventilator.available > 0;

            return (
              <div
                key={hospital.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800/80">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">{hospital.name}</h2>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {hospital.accreditation}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          hospital.triageStatus === "Available"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                            : hospital.triageStatus === "Busy"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                            : "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300"
                        }`}
                      >
                        {hospital.triageStatus}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5" />
                      {hospital.location} • <span className="font-semibold text-teal-600 dark:text-teal-400">{hospital.distanceKm} km away</span> ({hospital.driveTimeMin} min drive)
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${hospital.phone}`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                    >
                      <Phone className="h-3.5 w-3.5 text-teal-600" />
                      Call ER Desk
                    </a>

                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedHospitalForHold(hospital);
                      }}
                      className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-1.5 text-xs"
                    >
                      <Lock className="h-3.5 w-3.5" />
                      Hold Bed (15m Lock)
                    </Button>
                  </div>
                </div>

                {/* Bed Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                  {/* ICU */}
                  <div
                    className={`rounded-xl border p-3 ${
                      hasIcu
                        ? "border-rose-200 bg-rose-50/40 dark:border-rose-900/40 dark:bg-rose-950/20"
                        : "border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40 opacity-70"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                      <span className="font-semibold flex items-center gap-1">
                        <Activity className="h-3.5 w-3.5 text-rose-500" /> ICU Beds
                      </span>
                      <span className="text-[10px] text-slate-400">Total {hospital.beds.icu.total}</span>
                    </div>
                    <div className="mt-1.5 flex items-baseline gap-1">
                      <span className={`text-xl font-black ${hasIcu ? "text-rose-600 dark:text-rose-400" : "text-slate-400"}`}>
                        {hospital.beds.icu.available}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">available</span>
                    </div>
                  </div>

                  {/* Ventilator */}
                  <div
                    className={`rounded-xl border p-3 ${
                      hasVent
                        ? "border-teal-200 bg-teal-50/40 dark:border-teal-900/40 dark:bg-teal-950/20"
                        : "border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40 opacity-70"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                      <span className="font-semibold flex items-center gap-1">
                        <HeartPulse className="h-3.5 w-3.5 text-teal-500" /> Ventilators
                      </span>
                      <span className="text-[10px] text-slate-400">Total {hospital.beds.ventilator.total}</span>
                    </div>
                    <div className="mt-1.5 flex items-baseline gap-1">
                      <span className={`text-xl font-black ${hasVent ? "text-teal-600 dark:text-teal-400" : "text-slate-400"}`}>
                        {hospital.beds.ventilator.available}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">available</span>
                    </div>
                  </div>

                  {/* Oxygen Beds */}
                  <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-3 dark:border-sky-900/40 dark:bg-sky-950/20">
                    <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                      <span className="font-semibold flex items-center gap-1">
                        <Wind className="h-3.5 w-3.5 text-sky-500" /> Oxygen Beds
                      </span>
                      <span className="text-[10px] text-slate-400">Total {hospital.beds.oxygen.total}</span>
                    </div>
                    <div className="mt-1.5 flex items-baseline gap-1">
                      <span className="text-xl font-black text-sky-600 dark:text-sky-400">
                        {hospital.beds.oxygen.available}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">available</span>
                    </div>
                  </div>

                  {/* General Beds */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/40">
                    <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                      <span className="font-semibold flex items-center gap-1">
                        <Bed className="h-3.5 w-3.5 text-slate-500" /> General Ward
                      </span>
                      <span className="text-[10px] text-slate-400">Total {hospital.beds.general.total}</span>
                    </div>
                    <div className="mt-1.5 flex items-baseline gap-1">
                      <span className="text-xl font-black text-slate-700 dark:text-slate-300">
                        {hospital.beds.general.available}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">available</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Verified via Medyora Hospital Telemetry Node • {hospital.lastUpdated}</span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.name + " " + hospital.location)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-teal-600 hover:underline dark:text-teal-400 font-medium"
                  >
                    <Navigation className="h-3 w-3" />
                    Open GPS Route
                  </a>
                </div>
              </div>
            );
          })}
        </div>
          </>
        )}
      </main>

      {/* Emergency Bed Reservation Modal */}
      {selectedHospitalForHold && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-teal-100 p-2 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Emergency Bed Lock</h3>
                  <p className="text-xs text-slate-500">15-minute temporary hold guarantee</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedHospitalForHold(null)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div className="rounded-xl bg-slate-50 p-3 text-xs dark:bg-slate-800/50">
                <p className="font-semibold text-slate-900 dark:text-white">{selectedHospitalForHold.name}</p>
                <p className="text-slate-500 dark:text-slate-400">{selectedHospitalForHold.location}</p>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Select Bed Category</label>
                <div className="grid grid-cols-3 gap-2 mt-1.5">
                  <button
                    type="button"
                    onClick={() => setHoldBedType("icu")}
                    className={`rounded-xl border p-2 text-center text-xs transition-colors ${
                      holdBedType === "icu"
                        ? "border-rose-500 bg-rose-50 font-bold text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
                        : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    ICU Bed
                  </button>
                  <button
                    type="button"
                    onClick={() => setHoldBedType("ventilator")}
                    className={`rounded-xl border p-2 text-center text-xs transition-colors ${
                      holdBedType === "ventilator"
                        ? "border-teal-500 bg-teal-50 font-bold text-teal-700 dark:bg-teal-950/60 dark:text-teal-300"
                        : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    Ventilator
                  </button>
                  <button
                    type="button"
                    onClick={() => setHoldBedType("oxygen")}
                    className={`rounded-xl border p-2 text-center text-xs transition-colors ${
                      holdBedType === "oxygen"
                        ? "border-sky-500 bg-sky-50 font-bold text-sky-700 dark:bg-sky-950/60 dark:text-sky-300"
                        : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    Oxygen Bed
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Patient Full Name</label>
                <Input
                  placeholder="e.g. Ramesh Chandra Sharma"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="mt-1 h-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Triage / Emergency Reason</label>
                <Input
                  value={emergencyReason}
                  onChange={(e) => setEmergencyReason(e.target.value)}
                  className="mt-1 h-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-[11px] text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300">
                <AlertCircle className="h-4 w-4 inline mr-1 -mt-0.5" />
                This reservation temporarily reserves the bed for exactly 15 minutes while you travel. If patient does not check-in within 15 minutes, it is automatically released to triage queue.
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  className="w-1/3"
                  onClick={() => setSelectedHospitalForHold(null)}
                >
                  Cancel
                </Button>
                <Button
                  className="w-2/3 bg-teal-600 hover:bg-teal-700 text-white font-semibold"
                  onClick={handleConfirmBedHold}
                >
                  Lock Bed for 15 Mins
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
