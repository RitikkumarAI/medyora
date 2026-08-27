import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { 
  ArrowLeft, Stethoscope, ShieldCheck, CreditCard, Sparkles, 
  Building2, CheckCircle2, Clock, Calculator, PhoneCall, X,
  BadgeCheck, HeartPulse, UserCheck, Shield, ChevronRight, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SURGERIES, type SurgeryProcedure } from "@/shared/data/superapp-mock";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const SURGICAL_SPECIALITIES = [
  { id: "all", label: "All Surgeries" },
  { id: "ophthalmology", label: "Eye Care & LASIK" },
  { id: "orthopaedics", label: "Bones & Joints" },
  { id: "general", label: "General & Laparoscopy" },
  { id: "urology", label: "Kidney & Urology" },
  { id: "proctology", label: "Laser Proctology" },
  { id: "cosmetic", label: "Cosmetic & Hair" }
];

export function SurgeriesPage() {
  const router = useRouter();
  const [selectedSurgery, setSelectedSurgery] = useState<SurgeryProcedure | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [patientCity, setPatientCity] = useState("Bangalore");
  const [hasInsurance, setHasInsurance] = useState(true);
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);

  const filteredSurgeries = SURGERIES.filter((surg) => {
    const matchesCat = activeCategory === "all" || surg.speciality.toLowerCase().includes(activeCategory);
    const matchesSearch = surg.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          surg.speciality.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleBookConsultation = (surgeryName: string) => {
    toast.success(`Free surgical consultation booked for ${surgeryName}! Dedicated Medyora Care Manager will call you within 15 minutes.`);
    setSelectedSurgery(null);
    setIsEstimateModalOpen(false);
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
                Seamless surgical journey with transparent fixed pricing, NABH/JCI accredited hospitals, complete cashless insurance paperwork, and a dedicated 24/7 Care Manager.
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
                    <span className="text-xs font-bold text-amber-300">15,000+ Successful Surgeries Facilitated</span>
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug">
                    Get Free Surgeon Second Opinion & Cost Estimate
                  </h3>
                  <Button
                    onClick={() => {
                      setSelectedSurgery(SURGERIES[0]);
                      setIsEstimateModalOpen(true);
                    }}
                    className="w-full h-11 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-lg shadow-blue-600/40"
                  >
                    Book Free Consultation & Second Opinion →
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= MAIN CONTAINER ================= */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
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
                Transparent package pricing with zero hidden charges & free post-operative follow-up consultations
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
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-0.5">{surg.category}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Hospital Stay:</span>
                      <strong className="text-slate-800 dark:text-slate-200">{surg.hospitalStayDays}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Full Recovery:</span>
                      <strong className="text-slate-800 dark:text-slate-200">{surg.recoveryDays}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimated Package</span>
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
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">{selectedSurgery.name}</h3>
                    <p className="text-xs text-blue-600 font-medium">Free Second Opinion & Surgery Booking</p>
                  </div>
                </div>
                <button onClick={() => setIsEstimateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estimated Cost:</span>
                    <strong className="text-slate-900 dark:text-white">₹{selectedSurgery.minPrice.toLocaleString()} - ₹{selectedSurgery.maxPrice.toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">0% No-Cost EMI:</span>
                    <strong className="text-emerald-600">Starting ₹{selectedSurgery.emiStartsFrom}/month</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Hospital Stay:</span>
                    <strong className="text-slate-800 dark:text-slate-200">{selectedSurgery.hospitalStayDays}</strong>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-600 dark:text-slate-300 font-bold block">Your City</label>
                  <Input 
                    value={patientCity} 
                    onChange={(e) => setPatientCity(e.target.value)} 
                    placeholder="Enter city (e.g. Bangalore, Delhi, Pune)"
                    className="h-11 rounded-2xl text-xs font-medium"
                  />
                </div>

                <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 text-blue-900 dark:text-blue-200 flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Our Senior Surgical Care Manager will call you to arrange surgeon consultation, hospital visit & cashless paperwork.</span>
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
      </AnimatePresence>

    </div>
  );
}
