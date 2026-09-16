import { useState, useEffect } from "react";
import { Link, useRouter, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Share2,
  Heart,
  Star,
  MapPin,
  CheckCircle2,
  ChevronDown,
  PhoneCall,
  GraduationCap,
  Languages,
  Image as ImageIcon,
  Award,
  Clock,
  Sparkles,
  Building2,
  Stethoscope,
  Play,
  Video,
  Car,
  Accessibility,
  Navigation,
  ShieldCheck,
  Crown,
  Flame,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DOCTORS, REVIEWS } from "@/shared/data/mock";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

type TabOption = "about" | "clinics" | "experience" | "reviews" | "gallery";

export function DoctorProfile() {
  const router = useRouter();
  const { doctorId } = useParams({ strict: false }) as { doctorId?: string };
  const doctor = (DOCTORS.find((d) => d.id === doctorId) || DOCTORS[0])!;

  const [activeTab, setActiveTab] = useState<TabOption>("about");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  // Multi-clinic mock locations
  const clinicsList = [
    {
      id: "main-clinic",
      name: doctor.clinic.name,
      address: doctor.clinic.address,
      area: doctor.clinic.area || "Indiranagar",
      city: doctor.clinic.city,
      timings: "Mon - Fri: 09:00 AM - 01:00 PM",
      phone: doctor.phone || "+91 98765 43210",
      fee: doctor.fee,
      navigation: {
        parking: "Dedicated Car & Bike Parking Available 🚗",
        lift: "High-Speed Elevator Available 🛗",
        wheelchair: "Wheelchair Ramp & Stretcher Lift ♿",
        floor: "2nd Floor, Wing A",
        landmark: "Opposite Metro Pillar 104",
      },
    },
    {
      id: "evening-center",
      name: `${doctor.fullName.split(" ")[1] || "Medyora"} Speciality OPD & Diagnostics`,
      address: "100ft Road, Near Sony Signal",
      area: "Koramangala",
      city: doctor.clinic.city,
      timings: "Mon - Sat: 05:00 PM - 08:30 PM",
      phone: "+91 80 4030 5000",
      fee: doctor.fee,
      navigation: {
        parking: "Valet Parking Available 🚗",
        lift: "Elevator Access 🛗",
        wheelchair: "Wheelchair Accessible ♿",
        floor: "Ground Floor",
        landmark: "Near Forum Mall",
      },
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
      {/* Top Mobile Bar */}
      <div className="lg:hidden absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.history.back()}
          className="h-10 w-10 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toast.success("Doctor profile link copied!")}
            className="h-10 w-10 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white"
          >
            <Share2 className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFavorite(!isFavorite)}
            className="h-10 w-10 bg-white/20 backdrop-blur-md rounded-full border border-white/30"
          >
            <Heart
              className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`}
            />
          </Button>
        </div>
      </div>

      {/* ================= DESKTOP CONTAINER (>= lg) ================= */}
      <div className="hidden lg:block max-w-6xl mx-auto w-full px-6 py-8">
        {/* Desktop Back button & Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.history.back()}
            className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs px-3.5 py-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Doctors
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.success("Doctor profile link copied!")}
              className="rounded-xl text-xs font-bold gap-1.5 border-slate-200 dark:border-slate-800"
            >
              <Share2 className="h-3.5 w-3.5" /> Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFavorite(!isFavorite)}
              className="rounded-xl text-xs font-bold gap-1.5 border-slate-200 dark:border-slate-800"
            >
              <Heart
                className={`h-3.5 w-3.5 ${isFavorite ? "fill-red-500 text-red-500" : "text-slate-400"}`}
              />
              {isFavorite ? "Saved" : "Save"}
            </Button>
          </div>
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Left Column: Doctor Profile Card & CTAs */}
          <div className="col-span-4 sticky top-24 bg-white dark:bg-slate-900 rounded-[32px] p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs text-center space-y-5">
            {/* Doctor Photo with Verification Level Badge & Video Intro Trigger */}
            <div className="relative mx-auto h-44 w-44 rounded-3xl overflow-hidden shadow-md border-2 border-white dark:border-slate-800 group">
              <img
                src={doctor.image}
                alt={doctor.fullName}
                className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />

              {/* Doctor Intro Video Trigger Overlay */}
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="absolute inset-0 bg-black/40 hover:bg-black/30 flex flex-col items-center justify-center text-white transition-opacity backdrop-blur-xs opacity-90 group-hover:opacity-100"
                title="Watch Doctor Introduction Video"
              >
                <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/40 mb-1 animate-pulse">
                  <Play className="h-5 w-5 fill-white ml-0.5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-black/60 px-2 py-0.5 rounded-md">
                  Watch Intro (30s)
                </span>
              </button>

              {/* Verification Level Floating Pill */}
              <span className="absolute top-2 left-2 text-[10px] font-black px-2.5 py-0.5 rounded-md bg-amber-400 text-amber-950 flex items-center gap-1 shadow-sm">
                <Crown className="h-3 w-3 fill-amber-950" /> Elite Doctor
              </span>
            </div>

            <div>
              <div className="flex items-center justify-center gap-1.5">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  {doctor.fullName}
                </h2>
                <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
              </div>
              <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                {doctor.speciality}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {doctor.qualification}
              </p>
            </div>

            {/* Availability Prediction Pill */}
            <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60 text-[11px] text-blue-900 dark:text-blue-200 text-left flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-black text-blue-800 dark:text-blue-300">
                  Live OPD Prediction:
                </strong>
                Dr. {doctor.fullName.split(" ")[1] || "Sharma"} usually gets free after 05:30 PM
                (Avg wait: ~12 mins).
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-3 border border-slate-100 dark:border-slate-700">
              <div>
                <p className="text-base font-black text-slate-900 dark:text-white">
                  {doctor.experience}+
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Years Exp</p>
              </div>
              <div className="border-x border-slate-200 dark:border-slate-700">
                <p className="text-base font-black text-slate-900 dark:text-white flex items-center justify-center gap-1">
                  {doctor.rating} <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Rating</p>
              </div>
              <div>
                <p className="text-base font-black text-slate-900 dark:text-white">
                  {doctor.totalReviews}+
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Reviews</p>
              </div>
            </div>

            {/* Transparent Fee & Action CTAs */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-700 text-left space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span>Consultation Fee:</span>
                  <span className="font-bold text-slate-900 dark:text-white">₹{doctor.fee}</span>
                </div>
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span>Clinic Registration:</span>
                  <span className="font-bold text-emerald-600">₹0 (Free)</span>
                </div>
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span>Follow-up (within 7 days):</span>
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>
                <div className="flex items-center justify-between pt-1.5 border-t border-slate-200 dark:border-slate-700 font-black text-slate-900 dark:text-white">
                  <span>Total Transparent Amount:</span>
                  <span className="text-base text-blue-600 dark:text-blue-400">₹{doctor.fee}</span>
                </div>
              </div>

              <Button
                asChild
                className="w-full h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-lg shadow-blue-600/25"
              >
                <Link to="/patient/doctor/$doctorId/book" params={{ doctorId: doctor.id }}>
                  Book In-Clinic / Video Consultation
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full h-11 rounded-2xl border-slate-200 dark:border-slate-700 font-bold text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50"
              >
                <a
                  href={`tel:${doctor.phone || "+919876543210"}`}
                  className="flex items-center justify-center gap-2"
                >
                  <PhoneCall className="h-4 w-4 text-blue-600" />
                  Call Clinic Front Desk
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column: Tabbed Details */}
          <div className="col-span-8 space-y-6">
            {/* Desktop Tabs Header */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-1.5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex gap-1">
              {(["about", "clinics", "experience", "reviews", "gallery"] as TabOption[]).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold capitalize transition-all ${
                      activeTab === tab
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {tab === "about" ? "Overview" : tab === "clinics" ? "Multi-Clinics" : tab}
                  </button>
                ),
              )}
            </div>

            {/* Overview / About Tab */}
            {activeTab === "about" && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
                  <h3 className="font-black text-base text-slate-900 dark:text-white">
                    About Doctor & Treatment Philosophy
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {doctor.about}
                  </p>

                  {doctor.diseases && doctor.diseases.length > 0 && (
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Specialties & Conditions Treated
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {doctor.diseases.map((d, i) => (
                          <span
                            key={i}
                            className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Smart Clinic Navigation Card */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                      <Navigation className="h-5 w-5 text-blue-600" />
                      Smart Clinic Navigation & Accessibility
                    </h3>
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Wheelchair Friendly
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                      <Car className="h-5 w-5 text-blue-600 shrink-0" />
                      <div>
                        <strong className="block text-slate-900 dark:text-white">
                          Parking Facility:
                        </strong>
                        <span className="text-slate-500 dark:text-slate-400">
                          Dedicated Free Car & Bike Parking
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                      <Accessibility className="h-5 w-5 text-purple-600 shrink-0" />
                      <div>
                        <strong className="block text-slate-900 dark:text-white">
                          Wheelchair & Lift:
                        </strong>
                        <span className="text-slate-500 dark:text-slate-400">
                          Ramp Access & Stretcher Elevator
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-amber-600 shrink-0" />
                      <div>
                        <strong className="block text-slate-900 dark:text-white">
                          Floor & Wing:
                        </strong>
                        <span className="text-slate-500 dark:text-slate-400">
                          2nd Floor, Suite 204 (OPD Wing)
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-rose-600 shrink-0" />
                      <div>
                        <strong className="block text-slate-900 dark:text-white">
                          Prominent Landmark:
                        </strong>
                        <span className="text-slate-500 dark:text-slate-400">
                          Opposite Metro Pillar 104, Indiranagar
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full h-11 rounded-2xl border-blue-200 text-blue-700 font-bold text-xs hover:bg-blue-50"
                  >
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(`${doctor.clinic.name} ${doctor.clinic.address}`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <MapPin className="h-4 w-4 text-blue-600" />
                      Open Exact GPS Location on Google Maps →
                    </a>
                  </Button>
                </div>

                {/* Key Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-3.5">
                    <div className="h-11 w-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 font-bold uppercase">Experience</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {doctor.experience}+ Years Practice
                      </p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-3.5">
                    <div className="h-11 w-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                      <Languages className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 font-bold uppercase">Languages</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {doctor.languages.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* FAQs */}
                {doctor.faqs && doctor.faqs.length > 0 && (
                  <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      Frequently Asked Questions
                    </h3>
                    <div className="space-y-2">
                      {doctor.faqs.map((faq, i) => (
                        <div
                          key={i}
                          className="rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
                        >
                          <button
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            className="w-full flex items-center justify-between p-3.5 text-left bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-50 font-bold text-xs text-slate-900 dark:text-white"
                          >
                            <span>{faq.question}</span>
                            <ChevronDown
                              className={`h-4 w-4 text-slate-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                            />
                          </button>
                          {openFaq === i && (
                            <div className="p-3.5 text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 leading-relaxed">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Multi-Clinics Tab */}
            {activeTab === "clinics" && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-2xl border border-blue-100 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200">
                  💡 <strong>Multi-Clinic OPD Schedule:</strong> {doctor.fullName} consults at
                  multiple branches. Choose the clinic nearest to you.
                </div>

                {clinicsList.map((cln, i) => (
                  <div
                    key={cln.id}
                    className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-blue-100 text-blue-700">
                          Branch #{i + 1}
                        </span>
                        <h4 className="font-bold text-base text-slate-900 dark:text-white mt-1">
                          {cln.name}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {cln.address}, {cln.area}, {cln.city}
                        </p>
                      </div>
                      <span className="text-sm font-black text-slate-900 dark:text-white">
                        ₹{cln.fee}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 p-2.5 rounded-xl">
                      <Clock className="h-4 w-4 shrink-0" />
                      <span>{cln.timings}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                      <div>🚗 {cln.navigation.parking}</div>
                      <div>🛗 {cln.navigation.lift}</div>
                    </div>

                    <div className="pt-2 flex gap-2">
                      <Button
                        asChild
                        size="sm"
                        className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-10"
                      >
                        <Link to="/patient/doctor/$doctorId/book" params={{ doctorId: doctor.id }}>
                          Book at this Branch
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="rounded-xl border-slate-200 dark:border-slate-700 text-xs font-bold h-10"
                      >
                        <a href={`tel:${cln.phone}`}>Call Desk</a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Experience Tab */}
            {activeTab === "experience" && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Medical Background & Education
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                        {doctor.qualification}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Premier Medical Institute, Board Certified
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                        {doctor.experience}+ Years Active Practice
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Specialized in OPD consultations and inpatient medical supervision
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Verified Patient Reviews ({REVIEWS.length})
                  </h3>
                  <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> 100% Appointment-Verified Only
                  </span>
                </div>
                <div className="space-y-3">
                  {REVIEWS.map((review) => (
                    <div
                      key={review.id}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-slate-900 dark:text-white">
                            {review.patientName}
                          </span>
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        </div>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${star <= review.rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        "{review.comment}"
                      </p>
                      <span className="text-[10px] text-slate-400 block">
                        {review.date} • Verified Clinic Visit
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery Tab */}
            {activeTab === "gallery" && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Clinic & Facility Photos
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {doctor.gallery?.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="Clinic"
                      className="h-36 w-full object-cover rounded-2xl border border-slate-100 dark:border-slate-800"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= MOBILE CONTAINER (< lg) ================= */}
      <main className="lg:hidden flex-1 pb-40">
        <div className="relative h-[320px] w-full bg-slate-900">
          <img
            src={doctor.image}
            alt={doctor.fullName}
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] dark:from-slate-950 via-transparent to-transparent" />
        </div>

        <div className="px-5 -mt-20 relative z-10 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-[32px] p-5 shadow-lg border border-slate-100 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-md bg-amber-400 text-amber-950 flex items-center gap-1">
                <Crown className="h-3 w-3 fill-amber-950" /> Elite Doctor
              </span>
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md flex items-center gap-1"
              >
                <Play className="h-3 w-3 fill-blue-600" /> Intro Video (30s)
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                {doctor.fullName}
              </h1>
              {doctor.verified && <CheckCircle2 className="h-4 w-4 text-blue-600" />}
            </div>
            <p className="text-sm font-medium text-blue-600">
              {doctor.speciality} • {doctor.qualification}
            </p>

            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-3 border border-slate-100 dark:border-slate-700">
              <div className="text-center px-2 border-r border-slate-200 dark:border-slate-700 flex-1">
                <p className="text-lg font-black text-slate-900 dark:text-white">
                  {doctor.experience}+
                </p>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Years</p>
              </div>
              <div className="text-center px-2 border-r border-slate-200 dark:border-slate-700 flex-1">
                <p className="text-lg font-black text-slate-900 dark:text-white flex justify-center items-center gap-1">
                  {doctor.rating} <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                </p>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Rating</p>
              </div>
              <div className="text-center px-2 flex-1">
                <p className="text-lg font-black text-slate-900 dark:text-white">
                  {doctor.totalReviews}+
                </p>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Reviews</p>
              </div>
            </div>
          </div>

          <section className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">About Doctor</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {doctor.about}
            </p>
          </section>

          <section className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Clinic Location & Amenities
            </h3>
            <p className="text-xs font-bold text-slate-900 dark:text-white">{doctor.clinic.name}</p>
            <p className="text-xs text-slate-500">
              {doctor.clinic.address}, {doctor.clinic.city}
            </p>
            <div className="pt-2 text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
              <div>🚗 Free Parking Available</div>
              <div>♿ Wheelchair Accessible & Elevator</div>
            </div>
          </section>
        </div>
      </main>

      {/* Mobile Sticky Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 z-50 shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">
        <div className="flex gap-3 max-w-lg mx-auto">
          <a
            href={`tel:${doctor.phone || "+919876543210"}`}
            className="flex-1 flex flex-col items-center justify-center h-[56px] rounded-2xl bg-blue-50 text-blue-600 font-bold text-[13px] border border-blue-100 hover:bg-blue-100 transition-colors"
          >
            <PhoneCall className="h-4 w-4 mb-0.5" />
            Call Clinic
          </a>
          <Link
            to="/patient/doctor/$doctorId/book"
            params={{ doctorId: doctor.id }}
            className="flex-[2] flex items-center justify-between h-[56px] px-6 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all"
          >
            <div>
              <p className="text-[10px] font-medium text-blue-100">Transparent Fee</p>
              <p className="text-lg font-black leading-none">₹{doctor.fee}</p>
            </div>
            <div className="text-[14px] font-black tracking-wide">Book Now →</div>
          </Link>
        </div>
      </div>

      {/* Doctor 30-sec Introduction Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
            >
              <div className="p-4 bg-slate-850 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-blue-400" />
                  <span className="font-bold text-xs text-white">
                    {doctor.fullName} — 30s Doctor Intro
                  </span>
                </div>
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative aspect-video bg-black flex items-center justify-center">
                <img
                  src={doctor.image}
                  alt={doctor.fullName}
                  className="h-full w-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="h-16 w-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl shadow-blue-600/50 animate-bounce">
                    <Play className="h-8 w-8 fill-white ml-1" />
                  </div>
                  <p className="text-xs text-white/90 max-w-xs font-medium">
                    "Hello, I am {doctor.fullName}. I specialize in evidence-based{" "}
                    {doctor.speciality} care with transparent treatment protocols."
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-850 flex items-center justify-between text-xs text-slate-300">
                <span>
                  ⭐ {doctor.rating} Rating • {doctor.experience}+ Years Exp
                </span>
                <Button asChild size="sm" className="rounded-xl bg-blue-600 text-white font-bold">
                  <Link
                    to="/patient/doctor/$doctorId/book"
                    params={{ doctorId: doctor.id }}
                    onClick={() => setIsVideoModalOpen(false)}
                  >
                    Book Consultation
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
