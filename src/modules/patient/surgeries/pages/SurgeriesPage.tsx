import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  Stethoscope,
  ShieldCheck,
  CreditCard,
  Sparkles,
  Building2,
  CheckCircle2,
  Clock,
  Calculator,
  PhoneCall,
  X,
  BadgeCheck,
  HeartPulse,
  UserCheck,
  Shield,
  ChevronRight,
  Award,
  FileText,
  UploadCloud,
  AlertTriangle,
  Download,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SURGERIES, type SurgeryProcedure } from "@/shared/data/superapp-mock";
import { SurgicalWoundVisionModal } from "../components/SurgicalWoundVisionModal";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const SURGICAL_SPECIALITIES = [
  { id: "all", label: "All Surgeries" },
  { id: "ophthalmology", label: "Eye Care & LASIK" },
  { id: "orthopaedics", label: "Bones & Joints" },
  { id: "general", label: "General & Laparoscopy" },
  { id: "urology", label: "Kidney & Urology" },
  { id: "proctology", label: "Laser Proctology" },
  { id: "cosmetic", label: "Cosmetic & Hair" },
];

export interface SecondOpinionCase {
  id: string;
  caseToken: string;
  condition: string;
  advisedSurgery: string;
  currentHospital: string;
  speciality: string;
  status: "Board Review Completed" | "In Clinical Audit";
  panelVerdict: string;
  recommendation: "Avoid Surgery - Try Conservative" | "Surgery Justified";
  costSaved?: number;
  reviewers: string[];
  reportDate: string;
}

export function SurgeriesPage() {
  const router = useRouter();
  const [selectedSurgery, setSelectedSurgery] = useState<SurgeryProcedure | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [patientCity, setPatientCity] = useState("Bangalore");
  const [hasInsurance, setHasInsurance] = useState(true);
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);
  const [isWoundVisionOpen, setIsWoundVisionOpen] = useState(false);

  // Feature 9: Second Opinion & Multi-Doctor Surgery Review Board
  const [isSecondOpinionModalOpen, setIsSecondOpinionModalOpen] = useState(false);
  const [soDiagnosis, setSoDiagnosis] = useState("");
  const [soAdvisedSurgery, setSoAdvisedSurgery] = useState("");
  const [soHospital, setSoHospital] = useState("");
  const [soSpeciality, setSoSpeciality] = useState("Orthopaedics");
  const [hasUploadedScan, setHasUploadedScan] = useState(false);
  const [secondOpinionCases, setSecondOpinionCases] = useState<SecondOpinionCase[]>([
    {
      id: "so-1",
      caseToken: "MED-2ND-7712",
      condition: "Severe Knee Pain - Grade 3 Osteoarthritis",
      advisedSurgery: "Bilateral Total Knee Replacement (TKR)",
      currentHospital: "City Ortho Center",
      speciality: "Orthopaedics",
      status: "Board Review Completed",
      panelVerdict:
        "Conservative trial indicated. MRI reveals intact joint space with medial compartment narrowing. Surgery can be deferred by 3-5 years with physical therapy and visco-supplementation.",
      recommendation: "Avoid Surgery - Try Conservative",
      costSaved: 280000,
      reviewers: ["Dr. Arvind Mehra (MS Ortho, AIIMS)", "Dr. Sanjay Gupta (MCh Ortho, PGI)"],
      reportDate: "Yesterday, 4:30 PM",
    },
    {
      id: "so-2",
      caseToken: "MED-2ND-5541",
      condition: "Symptomatic Cholelithiasis with 14mm Stone",
      advisedSurgery: "Laparoscopic Cholecystectomy",
      currentHospital: "Care Multi-Speciality",
      speciality: "General & Laparoscopy",
      status: "Board Review Completed",
      panelVerdict:
        "Surgery fully indicated. History of acute biliary colic and 14mm neck-impacting gallstone. Laparoscopic day-care removal recommended to prevent pancreatitis.",
      recommendation: "Surgery Justified",
      reviewers: ["Dr. Suniti Sen (MS, FAIS)", "Dr. Rajeshwar Rao (Surgical Gastro, Max)"],
      reportDate: "3 days ago",
    },
  ]);

  const filteredSurgeries = SURGERIES.filter((surg) => {
    const matchesCat =
      activeCategory === "all" || surg.speciality.toLowerCase().includes(activeCategory);
    const matchesSearch =
      surg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surg.speciality.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleBookConsultation = (surgeryName: string) => {
    toast.success(
      `Free surgical consultation booked for ${surgeryName}! Dedicated Medyora Care Manager will call you within 15 minutes.`,
    );
    setSelectedSurgery(null);
    setIsEstimateModalOpen(false);
  };

  const handleSubmitSecondOpinion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!soDiagnosis.trim() || !soAdvisedSurgery.trim()) {
      toast.error("Please enter diagnosis and advised surgical procedure");
      return;
    }

    const newCase: SecondOpinionCase = {
      id: `so-${Date.now()}`,
      caseToken: `MED-2ND-${Math.floor(1000 + Math.random() * 9000)}`,
      condition: soDiagnosis,
      advisedSurgery: soAdvisedSurgery,
      currentHospital: soHospital || "Private Clinic / Hospital",
      speciality: soSpeciality,
      status: "In Clinical Audit",
      panelVerdict:
        "Scans & clinical history under review by Dr. Arvind Mehra and Dr. Priya Sundaram. Formal consensus audit report will be dispatched within 24 hours.",
      recommendation: "Avoid Surgery - Try Conservative",
      reviewers: ["Dr. Arvind Mehra (MS Ortho, AIIMS)", "Dr. Priya Sundaram (Harvard Fellow)"],
      reportDate: "Just now (Estimated: 24h)",
    };

    setSecondOpinionCases([newCase, ...secondOpinionCases]);
    setIsSecondOpinionModalOpen(false);
    setSoDiagnosis("");
    setSoAdvisedSurgery("");
    setSoHospital("");
    setHasUploadedScan(false);
    toast.success(`Second Opinion Case ${newCase.caseToken} submitted to Multi-Doctor Audit Board!`, {
      duration: 5000,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20 font-sans transition-colors">
      {/* ================= EXPANSIVE HERO SECTION ================= */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold">
                <Sparkles className="h-3.5 w-3.5 text-blue-400 animate-pulse" />
                <span>0% No-Cost EMI Available • 100% Cashless Insurance</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Plan Elective & Day Care Surgeries <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-300 bg-clip-text text-transparent">
                  With Top Expert Surgeons
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Seamless surgical journey with transparent fixed pricing, NABH/JCI accredited
                hospitals, complete cashless insurance paperwork, and a dedicated 24/7 Care Manager.
              </p>

              {/* 3 Core Value Propositions */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <CreditCard className="h-4 w-4 text-emerald-400 mb-1" />
                  <p className="text-xs font-black">Zero-Cost EMI</p>
                  <p className="text-[10px] text-slate-400">From ₹1,850/mo</p>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <ShieldCheck className="h-4 w-4 text-blue-400 mb-1" />
                  <p className="text-xs font-black">100% Cashless</p>
                  <p className="text-[10px] text-slate-400">All major TPA covered</p>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <UserCheck className="h-4 w-4 text-rose-400 mb-1" />
                  <p className="text-xs font-black">Personal Care Manager</p>
                  <p className="text-[10px] text-slate-400">Admission to discharge</p>
                </div>
              </div>
            </div>

            {/* Right Hero Video Card Preview */}
            <div className="col-span-12 lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10 bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1551076805-e18690c5e531?auto=format&fit=crop&w=700&q=80"
                  alt="Modern Surgical Operation Theater"
                  className="h-64 sm:h-80 w-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-amber-400" />
                    <span className="text-xs font-bold text-amber-300">
                      15,000+ Successful Surgeries Facilitated
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug">
                    Advised Surgery? Get a Multi-Doctor 2nd Opinion
                  </h3>
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => setIsSecondOpinionModalOpen(true)}
                      className="w-full h-10 rounded-2xl bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-black text-xs shadow-lg shadow-teal-500/30"
                    >
                      Request 2nd Opinion Board Review (24h) →
                    </Button>
                    <Button
                      onClick={() => setIsWoundVisionOpen(true)}
                      className="w-full h-10 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-600 hover:from-rose-600 hover:to-amber-700 text-white font-black text-xs shadow-lg shadow-rose-500/30"
                    >
                      Post-Op Wound &amp; Stitches Vision AI 📸
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTAINER ================= */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Feature 9: Multi-Doctor Second Opinion Surgery Board Section */}
        <section className="rounded-3xl border border-teal-200/80 bg-gradient-to-br from-teal-50/70 via-white to-blue-50/70 p-6 shadow-sm dark:border-teal-900/40 dark:from-teal-950/20 dark:via-slate-900 dark:to-blue-950/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-teal-100 pb-5 dark:border-teal-900/40">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-teal-600 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                  Clinical Audit Panel
                </span>
                <span className="text-xs font-semibold text-teal-700 dark:text-teal-400">
                  24-Hour Super-Specialist Review Guarantee
                </span>
              </div>
              <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Multi-Doctor Surgical Second Opinion Board
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl mt-1">
                Before undergoing surgery, get your MRI/CT scans evaluated independently by 2 Super-Specialists (AIIMS / PGI / Harvard fellows). Over 34% of cases avoid surgery with conservative physical therapy.
              </p>
            </div>

            <Button
              onClick={() => setIsSecondOpinionModalOpen(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-2xl h-11 px-5 flex items-center gap-2 shadow-md shadow-teal-600/20 shrink-0"
            >
              <Users className="h-4 w-4" />
              Request New Opinion Board
            </Button>
          </div>

          {/* Active Case Audits */}
          <div className="mt-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Your Surgical Audit Board Cases ({secondOpinionCases.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {secondOpinionCases.map((so) => (
                <div
                  key={so.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-teal-600 dark:text-teal-400">
                        {so.caseToken}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          so.status === "Board Review Completed"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 animate-pulse"
                        }`}
                      >
                        {so.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{so.condition}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Advised Procedure: <strong className="text-slate-800 dark:text-slate-200">{so.advisedSurgery}</strong> (at {so.currentHospital})
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3 text-xs dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                      <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                        <BadgeCheck className="h-3.5 w-3.5 text-teal-600" /> Panel Consensus Verdict:
                      </p>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                        "{so.panelVerdict}"
                      </p>
                    </div>

                    {so.costSaved && (
                      <div className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Estimated surgery cost saved: ₹{so.costSaved.toLocaleString()}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Reviewed by: {so.reviewers.join(", ")}</span>
                    <button
                      onClick={() =>
                        toast.success(`Consensus Report for ${so.caseToken} downloaded (PDF)`, {
                          icon: "📄",
                        })
                      }
                      className="inline-flex items-center gap-1 text-blue-600 hover:underline dark:text-blue-400 font-semibold"
                    >
                      <Download className="h-3 w-3" />
                      PDF Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Category Filter Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {SURGICAL_SPECIALITIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all border ${
                activeCategory === cat.id
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ================= SURGERIES GRID ================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-blue-600" />
                Popular Elective & Day Care Procedures ({filteredSurgeries.length})
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Transparent package pricing with zero hidden charges & free post-operative follow-up
                consultations
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSurgeries.map((surg) => (
              <div
                key={surg.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={surg.image}
                      alt={surg.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-black uppercase px-2.5 py-1 rounded-md bg-black/60 text-white backdrop-blur-md">
                      {surg.speciality}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors leading-snug">
                      {surg.name}
                    </h3>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-0.5">
                      {surg.category}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">
                        Hospital Stay:
                      </span>
                      <strong className="text-slate-800 dark:text-slate-200">
                        {surg.hospitalStayDays}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">
                        Full Recovery:
                      </span>
                      <strong className="text-slate-800 dark:text-slate-200">
                        {surg.recoveryDays}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">
                        Estimated Package
                      </span>
                      <span className="text-sm font-black text-slate-900 dark:text-white">
                        ₹{surg.minPrice.toLocaleString()} - ₹{surg.maxPrice.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                      EMI from ₹{surg.emiStartsFrom}/mo
                    </span>
                  </div>

                  <Button
                    onClick={() => {
                      setSelectedSurgery(surg);
                      setIsEstimateModalOpen(true);
                    }}
                    className="w-full h-11 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md shadow-blue-600/20"
                  >
                    Get Free Estimate & Book →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ================= SURGERY ESTIMATE MODAL ================= */}
      <AnimatePresence>
        {isEstimateModalOpen && selectedSurgery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 p-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                    <Stethoscope className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      {selectedSurgery.name}
                    </h3>
                    <p className="text-xs text-blue-600 font-medium">
                      Free Second Opinion & Surgery Booking
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEstimateModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estimated Cost:</span>
                    <strong className="text-slate-900 dark:text-white">
                      ₹{selectedSurgery.minPrice.toLocaleString()} - ₹
                      {selectedSurgery.maxPrice.toLocaleString()}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">0% No-Cost EMI:</span>
                    <strong className="text-emerald-600">
                      Starting ₹{selectedSurgery.emiStartsFrom}/month
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Hospital Stay:</span>
                    <strong className="text-slate-800 dark:text-slate-200">
                      {selectedSurgery.hospitalStayDays}
                    </strong>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-600 dark:text-slate-300 font-bold block">
                    Your City
                  </label>
                  <Input
                    value={patientCity}
                    onChange={(e) => setPatientCity(e.target.value)}
                    placeholder="Enter city (e.g. Bangalore, Delhi, Pune)"
                    className="h-11 rounded-2xl text-xs font-medium"
                  />
                </div>

                <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 text-blue-900 dark:text-blue-200 flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    Our Senior Surgical Care Manager will call you to arrange surgeon consultation,
                    hospital visit & cashless paperwork.
                  </span>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <Button
                  onClick={() => setIsEstimateModalOpen(false)}
                  variant="outline"
                  className="flex-1 h-11 rounded-2xl border-slate-200 dark:border-slate-700 text-xs font-bold"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleBookConsultation(selectedSurgery.name)}
                  className="flex-1 h-11 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20"
                >
                  Confirm Free Booking
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Feature 9: Request Second Opinion Board Modal */}
        {isSecondOpinionModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-2xl bg-teal-50 dark:bg-teal-950 text-teal-600 flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      Request Multi-Doctor Second Opinion Board
                    </h3>
                    <p className="text-xs text-teal-600 font-medium">
                      2 Independent Super-Specialists • 24h Consensus Audit
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsSecondOpinionModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 rounded-full p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitSecondOpinion} className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">
                    Speciality Category
                  </label>
                  <select
                    value={soSpeciality}
                    onChange={(e) => setSoSpeciality(e.target.value)}
                    className="w-full h-11 px-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium"
                  >
                    <option value="Orthopaedics">Bones, Spine & Joint Replacement (Orthopaedics)</option>
                    <option value="General & Laparoscopy">General, Gallbladder & Laparoscopy</option>
                    <option value="Cardiology">Cardiology & Bypass / Stenting (CABG)</option>
                    <option value="Neurosurgery">Brain & Spine Neurosurgery</option>
                    <option value="Urology">Kidney Stones & Urology</option>
                    <option value="Ophthalmology">Eye Care & Retinal Surgeries</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">
                    Current Diagnosis & Symptoms
                  </label>
                  <Input
                    placeholder="e.g. Severe chronic knee pain, bone-on-bone friction, difficulty climbing stairs"
                    value={soDiagnosis}
                    onChange={(e) => setSoDiagnosis(e.target.value)}
                    className="h-11 rounded-2xl text-xs font-medium bg-slate-50 dark:bg-slate-800"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">
                      Advised Surgical Procedure
                    </label>
                    <Input
                      placeholder="e.g. Total Knee Replacement (TKR)"
                      value={soAdvisedSurgery}
                      onChange={(e) => setSoAdvisedSurgery(e.target.value)}
                      className="h-11 rounded-2xl text-xs font-medium bg-slate-50 dark:bg-slate-800"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">
                      Hospital / Clinic Advised
                    </label>
                    <Input
                      placeholder="e.g. City Ortho Hospital"
                      value={soHospital}
                      onChange={(e) => setSoHospital(e.target.value)}
                      className="h-11 rounded-2xl text-xs font-medium bg-slate-50 dark:bg-slate-800"
                    />
                  </div>
                </div>

                {/* Upload MRI / CT scan file simulation */}
                <div>
                  <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">
                    Upload Scans & Reports (MRI, CT, X-Ray, Blood, Rx)
                  </label>
                  <div
                    onClick={() => {
                      setHasUploadedScan(true);
                      toast.success("MRI_Scan_Report_DICOM.pdf attached successfully!");
                    }}
                    className={`cursor-pointer border-2 border-dashed rounded-2xl p-4 text-center transition-colors ${
                      hasUploadedScan
                        ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20"
                        : "border-slate-300 dark:border-slate-700 hover:border-teal-500 bg-slate-50 dark:bg-slate-800/50"
                    }`}
                  >
                    <UploadCloud className={`h-6 w-6 mx-auto mb-1 ${hasUploadedScan ? "text-emerald-500" : "text-slate-400"}`} />
                    {hasUploadedScan ? (
                      <div>
                        <span className="font-bold text-emerald-700 dark:text-emerald-400">
                          ✓ Knee_MRI_Scan_Series_Grade3.pdf (14.2 MB)
                        </span>
                        <p className="text-[10px] text-slate-400">Click to replace document</p>
                      </div>
                    ) : (
                      <div>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          Click to upload PDF or DICOM scan images
                        </span>
                        <p className="text-[10px] text-slate-400">Up to 50MB supported • 256-bit encrypted</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Independent Board Assignee Preview */}
                <div className="rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900 p-3 space-y-2">
                  <div className="flex items-center gap-1.5 text-teal-800 dark:text-teal-300 font-bold text-[11px]">
                    <ShieldCheck className="h-4 w-4" /> Assigned Independent Review Panel:
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
                    <p>• <strong>Dr. Arvind Mehra</strong> (MS Ortho, AIIMS New Delhi - 22 yrs exp)</p>
                    <p>• <strong>Dr. Priya Sundaram</strong> (Fellow, Harvard Medical School & Max Healthcare)</p>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <Button
                    type="button"
                    onClick={() => setIsSecondOpinionModalOpen(false)}
                    variant="outline"
                    className="flex-1 h-11 rounded-2xl border-slate-200 dark:border-slate-700 font-bold text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-11 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/30"
                  >
                    Submit for 24h Board Audit
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Post-Op Surgical Wound & Stitches Vision AI Modal */}
      <SurgicalWoundVisionModal
        isOpen={isWoundVisionOpen}
        onClose={() => setIsWoundVisionOpen(false)}
      />
    </div>
  );
}
