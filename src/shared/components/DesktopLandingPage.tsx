import { useState, useMemo } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Search,
  MapPin,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Clock,
  Users,
  Star,
  Video,
  Home,
  FileText,
  Lock,
  Bell,
  Headphones,
  Heart,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  X,
  Shield,
  Award,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DOCTORS, SPECIALIZATIONS } from "@/shared/data/mock";
import { FEATURED_ARTICLE_PREVIEWS } from "@/shared/data/article-previews";
import { LocationPickerModal } from "@/shared/components/LocationPickerModal";
import { SiteHeader } from "@/shared/components/SiteHeader";
import { SiteFooter } from "@/shared/components/SiteFooter";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const DATE_OPTIONS = ["Mon, 19 May", "Today, 27 Aug", "Tomorrow, 28 Aug", "This Weekend, 30 Aug"];

// Animation presets
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const badgeHover = {
  scale: 1.04,
  y: -4,
  transition: { type: "spring" as const, stiffness: 400, damping: 17 },
};

export function DesktopLandingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Bengaluru");
  const [selectedArea, setSelectedArea] = useState("Indiranagar");
  const [selectedDate, setSelectedDate] = useState("Mon, 19 May");
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  // Dynamically compute Top Recommended Specialists for the selected city
  const recommendedDoctors = useMemo(() => {
    const inCity = DOCTORS.filter((d) => d.city.toLowerCase() === selectedCity.toLowerCase());
    if (inCity.length >= 4) {
      return inCity.slice(0, 4);
    }
    return [...DOCTORS]
      .sort((a, b) => {
        const aCity = a.city.toLowerCase() === selectedCity.toLowerCase() ? 1 : 0;
        const bCity = b.city.toLowerCase() === selectedCity.toLowerCase() ? 1 : 0;
        if (aCity !== bCity) return bCity - aCity;
        return b.rating - a.rating;
      })
      .slice(0, 4);
  }, [selectedCity]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      to: "/doctors",
      search: {
        q: searchQuery || undefined,
        city: selectedCity || undefined,
        area: selectedArea || undefined,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden font-sans transition-colors">
      {/* 1. Desktop Site Header */}
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {/* 2. Expansive Full-Width Hero Section */}
        <section className="relative pt-6 pb-12 px-6 sm:px-10 lg:px-16 w-full max-w-[1536px] mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-12 gap-8 lg:gap-14 items-center"
          >
            {/* ================= LEFT COLUMN: Headline & 4 Feature Badges ================= */}
            <div className="col-span-12 lg:col-span-6 space-y-7">
              {/* Social Proof Pill with pulse animation */}
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-3.5 bg-white dark:bg-slate-900 px-4 py-2 rounded-full border border-slate-200/90 dark:border-slate-800 shadow-sm"
              >
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                  <div className="h-4 w-4 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </div>
                  <span>{t("hero.trusted_patients")}</span>
                </div>
                <div className="flex -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&q=80"
                    alt="Doctor"
                    className="h-6 w-6 rounded-full border-2 border-white dark:border-slate-900 object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&q=80"
                    alt="Doctor"
                    className="h-6 w-6 rounded-full border-2 border-white dark:border-slate-900 object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&q=80"
                    alt="Doctor"
                    className="h-6 w-6 rounded-full border-2 border-white dark:border-slate-900 object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=64&q=80"
                    alt="Doctor"
                    className="h-6 w-6 rounded-full border-2 border-white dark:border-slate-900 object-cover"
                  />
                </div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {t("hero.badge_count")}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-[64px] font-black tracking-tight text-slate-950 dark:text-white leading-[1.06]"
              >
                {t("hero.headline_1")}
                <br />
                {t("hero.headline_2_pre")}{" "}
                <span className="text-blue-600 dark:text-blue-400 font-serif italic">
                  {t("hero.headline_2_you")}
                </span>{" "}
                {t("hero.headline_2_post")}
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-xl"
              >
                {t("hero.subtitle")}
              </motion.p>

              {/* 4 Feature Badges (Positioned UP directly under subtitle with Hover Spring) */}
              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-1"
              >
                <motion.div
                  whileHover={badgeHover}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer transition-all hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500"
                >
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight truncate">
                      {t("hero.feat_instant_title")}
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {t("hero.feat_instant_desc")}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={badgeHover}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer transition-all hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500"
                >
                  <div className="h-10 w-10 rounded-xl bg-purple-50 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight truncate">
                      {t("hero.feat_verified_title")}
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {t("hero.feat_verified_desc")}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={badgeHover}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer transition-all hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500"
                >
                  <div className="h-10 w-10 rounded-xl bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight truncate">
                      {t("hero.feat_queue_title")}
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {t("hero.feat_queue_desc")}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={badgeHover}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer transition-all hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500"
                >
                  <div className="h-10 w-10 rounded-xl bg-sky-50 dark:bg-sky-950/70 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight truncate">
                      {t("hero.feat_payments_title")}
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {t("hero.feat_payments_desc")}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* ================= RIGHT COLUMN: Warm Happy Family on Couch ================= */}
            <motion.div
              variants={fadeInUp}
              className="col-span-12 lg:col-span-6 relative flex justify-center items-center pt-4 lg:pt-0"
            >
              {/* Ambient Lighting Behind Hero Image */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 rounded-[48px] -z-10 blur-2xl" />
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full border border-blue-200/50 dark:border-blue-800/40 -z-10 animate-pulse" />

              {/* Main Family Image Container with Floating Breathing Animation */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative w-full max-w-[620px] rounded-[36px] overflow-hidden border-2 border-white/40 dark:border-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.15)] bg-white dark:bg-slate-900"
              >
                <img
                  src="/hero-family.webp"
                  alt="Happy Family Using Medyora"
                  className="w-full h-auto object-cover object-center aspect-[4/3]"
                />

                {/* Floating Card 1: Available Today (Top Left) */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="absolute top-5 left-5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-lg border border-slate-100 dark:border-slate-800 space-y-0.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                      {t("search.available_today")}
                    </span>
                  </div>
                  <p className="text-sm font-black text-slate-900 dark:text-white">
                    {t("search.doctors_count")}
                  </p>
                </motion.div>

                {/* Floating Card 2: Average Rating (Bottom Left) */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="absolute bottom-5 left-5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-100 dark:border-slate-800 space-y-1"
                >
                  <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                    {t("search.avg_rating")}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">4.8</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {t("search.reviews_count")}
                  </p>
                </motion.div>

                {/* Floating Card 3: Top Rated Doctors Avatar Pill (Bottom Right) */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="absolute bottom-5 right-5 flex flex-col items-end"
                >
                  <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-full p-1.5 pl-2 shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
                    <div className="flex -space-x-2">
                      <img
                        src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=64&q=80"
                        alt="Doctor"
                        className="h-8 w-8 rounded-full border border-white dark:border-slate-800 object-cover"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=64&q=80"
                        alt="Doctor"
                        className="h-8 w-8 rounded-full border border-white dark:border-slate-800 object-cover"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=64&q=80"
                        alt="Doctor"
                        className="h-8 w-8 rounded-full border border-white dark:border-slate-800 object-cover"
                      />
                    </div>
                    <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                      +
                    </div>
                  </div>
                  <span className="text-xs font-serif italic text-slate-700 dark:text-slate-300 mt-1.5 mr-2 flex items-center gap-1">
                    <span>↩</span> {t("search.top_rated_scribble")}
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ================= PROMINENT WIDE SEARCH & BOOKING BAR (Full Width, Moved DOWN) ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12"
          >
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white dark:bg-slate-900 p-3.5 sm:p-5 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-[0_15px_50px_rgba(0,0,0,0.06)] dark:shadow-2xl flex flex-col md:flex-row items-center gap-4 relative z-30 transition-all hover:border-blue-300 dark:hover:border-blue-600"
            >
              {/* 1. Doctor / Speciality / Symptom Input */}
              <div className="flex items-center gap-3.5 px-4 py-2 flex-1 w-full relative">
                <Search className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                    {t("search.label_doctor")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("search.placeholder_doctor")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-sm font-bold text-slate-900 dark:text-white outline-none placeholder:text-slate-400 mt-0.5"
                  />
                </div>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="hidden md:block h-10 w-px bg-slate-200 dark:bg-slate-800" />

              {/* 2. Location Input with GPS trigger */}
              <div
                onClick={() => setIsLocationModalOpen(true)}
                className="flex items-center gap-3.5 px-4 py-2 flex-1 w-full cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-2xl transition-colors"
              >
                <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                    {t("search.label_location")}
                  </label>
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate mt-0.5">
                    {selectedArea ? `${selectedArea}, ${selectedCity}` : selectedCity}
                  </p>
                </div>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/80 px-3 py-1 rounded-md shrink-0">
                  Change
                </span>
              </div>

              <div className="hidden md:block h-10 w-px bg-slate-200 dark:bg-slate-800" />

              {/* 3. Appointment Date with dropdown */}
              <div className="relative flex-1 w-full">
                <div
                  onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                  className="flex items-center gap-3.5 px-4 py-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-2xl transition-colors"
                >
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                      {t("search.label_date")}
                    </label>
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate mt-0.5">
                      {selectedDate}
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                </div>

                <AnimatePresence>
                  {isDateDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute left-0 top-full mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl p-2 z-50 space-y-1"
                    >
                      {DATE_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setSelectedDate(opt);
                            setIsDateDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                            selectedDate === opt
                              ? "bg-blue-600 text-white font-bold"
                              : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 4. Find Doctors Action Button */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full md:w-auto"
              >
                <Button
                  type="submit"
                  className="w-full md:w-auto h-14 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 shrink-0"
                >
                  {t("search.btn_find_doctors")} <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </section>

        {/* 3. Bottom 5-Item Trust & Stats Bar with Viewport Reveal Animation */}
        <section className="px-6 sm:px-10 lg:px-16 w-full max-w-[1536px] mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-slate-900 rounded-[32px] p-7 border border-slate-200/90 dark:border-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-center"
          >
            {/* Stat 1: 100% Secure */}
            <motion.div whileHover={{ scale: 1.03 }} className="flex items-center gap-3.5">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-sm">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">
                  {t("trust_bar.secure_title")}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {t("trust_bar.secure_desc")}
                </p>
              </div>
            </motion.div>

            {/* Stat 2: 4.8/5 on Google */}
            <motion.div whileHover={{ scale: 1.03 }} className="flex items-center gap-3.5">
              <div className="h-12 w-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center shrink-0 font-black text-slate-800 dark:text-slate-200 text-base shadow-sm">
                <span className="text-blue-600 dark:text-blue-400">G</span>
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">
                  {t("trust_bar.google_title")}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {t("trust_bar.google_desc")}
                </p>
              </div>
            </motion.div>

            {/* Stat 3: 50K+ Appointments */}
            <motion.div whileHover={{ scale: 1.03 }} className="flex items-center gap-3.5">
              <div className="h-12 w-12 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-sm">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">
                  {t("trust_bar.appointments_title")}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {t("trust_bar.appointments_desc")}
                </p>
              </div>
            </motion.div>

            {/* Stat 4: Partnered with 500+ Clinics */}
            <motion.div whileHover={{ scale: 1.03 }} className="flex items-center gap-3.5">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-sm">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">
                  {t("trust_bar.partnered_title")}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {t("trust_bar.partnered_desc")}
                </p>
              </div>
            </motion.div>

            {/* Stat 5: 24/7 Support */}
            <motion.div whileHover={{ scale: 1.03 }} className="flex items-center gap-3.5">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-sm">
                <Headphones className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">
                  {t("trust_bar.support_title")}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {t("trust_bar.support_desc")}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* 4. Find Doctors by Speciality & Organ Section with Visual Images */}
        <section className="py-8 px-6 sm:px-10 lg:px-16 w-full max-w-[1536px] mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">
                Find Doctors by{" "}
                <span className="text-blue-600 dark:text-blue-400">Speciality & Organ</span>
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                Easily recognize doctors by visual organ illustrations, symptoms, and Hindi guides.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="rounded-2xl text-xs font-bold border-slate-200 dark:border-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <Link to="/specialities">See All Specialities ({SPECIALIZATIONS.length})</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5">
            {SPECIALIZATIONS.slice(0, 8).map((spec) => (
              <Link
                key={spec.id}
                to="/doctors"
                search={{ q: spec.name }}
                className="group flex flex-col items-center p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500 transition-all text-center"
              >
                <div className="relative h-18 w-18 rounded-2xl overflow-hidden mb-2.5 shadow-sm bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <img
                    src={spec.image}
                    alt={spec.name}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 leading-tight">
                  {spec.name}
                </span>
                {spec.hindiName && (
                  <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 line-clamp-1 leading-tight mt-0.5">
                    {spec.hindiName}
                  </span>
                )}
                <span className="text-[10px] text-slate-400 mt-1">{spec.doctors} Doctors</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. Featured Doctors Grid Section (Filtered by User's Selected City with Layout Animations) */}
        <section className="py-12 px-6 sm:px-10 lg:px-16 w-full max-w-[1536px] mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">
                  {t("recommended.title")}{" "}
                  <span className="text-blue-600 dark:text-blue-400">in {selectedCity}</span>
                </h2>
                <span className="bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800 hidden sm:inline-block">
                  📍 {selectedArea ? `${selectedArea}, ${selectedCity}` : selectedCity}
                </span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                Verified top specialists in {selectedCity} available for in-clinic or video
                appointments
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="rounded-2xl text-xs font-bold border-slate-200 dark:border-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <Link to="/doctors" search={{ city: selectedCity }}>
                {t("recommended.view_all")} (
                {DOCTORS.filter((d) => d.city.toLowerCase() === selectedCity.toLowerCase())
                  .length || DOCTORS.length}
                )
              </Link>
            </Button>
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {recommendedDoctors.map((doc) => (
                <motion.div
                  key={doc.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800">
                      <img
                        src={doc.image}
                        alt={doc.fullName}
                        className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                        {t("recommended.available_today")}
                      </span>
                      <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                        📍 {doc.city}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 dark:text-white leading-tight">
                      {doc.fullName}
                    </h3>
                    <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-1">
                      {doc.speciality}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
                      {doc.clinic.name},{" "}
                      {doc.clinic.area ? `${doc.clinic.area}, ${doc.clinic.city}` : doc.clinic.city}
                    </p>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                      <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {doc.rating}{" "}
                        ({doc.totalReviews})
                      </span>
                      <span className="font-black text-base text-slate-900 dark:text-white">
                        ₹{doc.fee}
                      </span>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="w-full mt-4 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20"
                  >
                    <Link to="/patient/doctor/$doctorId" params={{ doctorId: doc.id }}>
                      {t("recommended.book_btn")}
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* 6. Health & Wellness Articles Section */}
        <section className="py-12 px-6 sm:px-10 lg:px-16 w-full max-w-[1536px] mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">
                {t("articles.title")}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                {t("articles.subtitle")}
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="rounded-2xl text-xs font-bold border-slate-200 dark:border-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <Link to="/patient/articles">{t("articles.browse_all")}</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURED_ARTICLE_PREVIEWS.slice(0, 3).map((art) => (
              <motion.div key={art.id} whileHover={{ y: -5 }}>
                <Link
                  to="/patient/articles/$articleId"
                  params={{ articleId: art.id }}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500 transition-all flex flex-col justify-between group h-full block"
                >
                  <div>
                    <img
                      src={art.image}
                      alt={art.title}
                      className="h-48 w-full rounded-2xl object-cover mb-3.5 group-hover:scale-[1.02] transition-transform"
                    />
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-3 py-1 rounded-md uppercase tracking-wider">
                      {art.category}
                    </span>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug mt-2.5 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {art.title}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between pt-3.5 mt-3.5 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
                    <span className="font-semibold text-slate-600 dark:text-slate-300">
                      {art.author.name}
                    </span>
                    <span>
                      {art.readTime} {t("articles.read_time")}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Location Picker Modal with GPS and Popular Cities */}
      <LocationPickerModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        selectedCity={selectedCity}
        selectedArea={selectedArea}
        onSelect={(loc) => {
          setSelectedCity(loc.city);
          setSelectedArea(loc.area || "");
        }}
      />

      {/* Site Footer */}
      <SiteFooter />
    </div>
  );
}
