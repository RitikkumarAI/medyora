import { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { 
  Search, MapPin, Sparkles, Video, UserCheck, FlaskConical, 
  Stethoscope, Pill, ShieldCheck, ChevronRight, ChevronDown, 
  Star, Heart, MessageSquare, ArrowRight, CheckCircle2, 
  Clock, Share2, Award, Building2, Flame, BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DOCTORS, SPECIALIZATIONS, GENERAL_CARE_SPECIALITIES, ADVANCED_CARE_SPECIALITIES } from "@/shared/data/mock";
import { COMMUNITY_QUESTIONS } from "@/shared/data/superapp-mock";
import { HEALTH_ARTICLES_DATA } from "@/shared/data/articles-data";
import { LocationPickerModal } from "@/shared/components/LocationPickerModal";
import { CareAIChatModal } from "@/modules/patient/care-ai/components/CareAIChatModal";
import { DesktopLandingPage } from "@/shared/components/DesktopLandingPage";
import { motion, AnimatePresence } from "framer-motion";

export function PatientHome() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("Bangalore");
  const [selectedArea, setSelectedArea] = useState("Indiranagar");
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isCareAIOpen, setIsCareAIOpen] = useState(false);
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [specialityTab, setSpecialityTab] = useState<"general" | "advanced">("general");

  const banners = [
    {
      id: "b1",
      title: "Affordable Procedures by Expert Doctors",
      tag: "All insurances accepted",
      cta: "Get Cost Estimate",
      link: "/patient/surgeries",
      bgGradient: "from-blue-700 via-blue-800 to-indigo-900",
      image: "https://images.unsplash.com/photo-1551076805-e18690c5e531?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "b2",
      title: "Save upto 50% On Health Packages",
      tag: "Free Home Sample Collection",
      cta: "Book Now",
      link: "/patient/lab-tests",
      bgGradient: "from-indigo-800 via-purple-900 to-slate-900",
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "b3",
      title: "Flat 20% OFF On All Medicines",
      tag: "Delivered in 2 Hours",
      cta: "Order Now",
      link: "/patient/medicines",
      bgGradient: "from-teal-800 via-emerald-900 to-slate-900",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80",
    },
  ];

  // Auto slide banner
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBannerIndex((prev) => (prev + 1) % banners.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [banners.length]);

  const topServices = [
    {
      title: "In-Person Consultation",
      subtitle: "Find verified clinics",
      link: "/doctors",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=160&q=80",
      isDoctorImage: true,
      badge: "Verified",
    },
    {
      title: "Video Consultation",
      subtitle: "Connect in 60 secs",
      link: "/patient/consult",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=160&q=80",
      isDoctorImage: true,
      badge: "24/7 Available",
    },
    {
      title: "Book Lab Tests",
      subtitle: "Home sample pickup",
      link: "/patient/lab-tests",
      icon: FlaskConical,
      color: "from-blue-500 to-indigo-600",
      isDoctorImage: false,
    },
    {
      title: "Plan Surgeries",
      subtitle: "Expert surgeons & EMI",
      link: "/patient/surgeries",
      icon: Stethoscope,
      color: "from-indigo-500 to-purple-600",
      isDoctorImage: false,
    },
    {
      title: "Order Medicines",
      subtitle: "Flat 20% discount",
      link: "/patient/medicines",
      icon: Pill,
      color: "from-teal-500 to-emerald-600",
      isDoctorImage: false,
    },
    {
      title: "Buy Subscriptions",
      subtitle: "Medyora Care Plan",
      link: "/patient/subscriptions",
      icon: ShieldCheck,
      color: "from-amber-500 to-orange-600",
      isDoctorImage: false,
    },
  ];

  const featuredQuestion = COMMUNITY_QUESTIONS[0];

  return (
    <>
      {/* Desktop Landing View (>= lg) */}
      <div className="hidden lg:block">
        <DesktopLandingPage />
      </div>

      {/* Mobile Practo Super App Experience (< lg) */}
      <div className="block lg:hidden min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-24 font-sans transition-colors">
        
        {/* ================= 1. PRACTO-STYLE HEADER ================= */}
        <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 pt-3 pb-3 border-b border-slate-100 dark:border-slate-800 shadow-xs">
          
          {/* Location Selector Pill (Screen 1) */}
          <div className="flex items-center justify-between mb-2.5">
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>{selectedCity}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            <span className="text-[11px] font-bold text-slate-400">Medyora Health</span>
          </div>

          {/* Search Bar + "Ask Care AI" Pill */}
          <div className="flex items-center gap-2">
            <Link
              to="/patient/search"
              className="flex-1 flex items-center gap-2.5 h-11 px-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 text-xs text-slate-400 shadow-inner"
            >
              <Search className="h-4 w-4 text-slate-400 shrink-0" />
              <span className="truncate">Search for Doctors, Clinics, Tests...</span>
            </Link>

            <Button
              onClick={() => window.dispatchEvent(new CustomEvent("open-care-ai", { detail: { mode: "chat" } }))}
              size="sm"
              className="h-11 px-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 shrink-0 flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 animate-pulse text-amber-300" />
              <span>Ask Care AI</span>
            </Button>
          </div>
        </header>

        <main className="p-4 space-y-6">
          
          {/* ================= 2. TOP 6 SERVICES (SCREEN 1) ================= */}
          <section>
            <div className="grid grid-cols-2 gap-3">
              {/* Service 1: In-Person Consultation */}
              <Link
                to="/doctors"
                className="col-span-1 rounded-3xl p-3.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs flex flex-col justify-between h-36 relative overflow-hidden group hover:border-blue-500 transition-all"
              >
                <div>
                  <h3 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">
                    In-Person<br />Consultation
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1">Verified Doctors</p>
                </div>
                <div className="flex justify-end -mr-2 -mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=120&q=80"
                    alt="Doctor"
                    className="h-16 w-16 rounded-2xl object-cover"
                  />
                </div>
              </Link>

              {/* Service 2: Video Consultation */}
              <Link
                to="/patient/consult"
                className="col-span-1 rounded-3xl p-3.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs flex flex-col justify-between h-36 relative overflow-hidden group hover:border-blue-500 transition-all"
              >
                <div>
                  <h3 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">
                    Video<br />Consultation
                  </h3>
                  <p className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold mt-1">Connect in 60s</p>
                </div>
                <div className="flex justify-end -mr-2 -mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80"
                    alt="Doctor"
                    className="h-16 w-16 rounded-2xl object-cover"
                  />
                </div>
              </Link>
            </div>

            {/* Next 4 Services (4 grid tiles) */}
            <div className="grid grid-cols-4 gap-2.5 mt-3">
              {topServices.slice(2).map((srv) => {
                const IconComponent = srv.icon!;
                return (
                  <Link
                    key={srv.title}
                    to={srv.link}
                    className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs text-center hover:border-blue-500 transition-all"
                  >
                    <div className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${srv.color} text-white flex items-center justify-center shadow-xs mb-1.5`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200 line-clamp-2 leading-tight">
                      {srv.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* ================= 3. RECENTLY VIEWED (SCREEN 1) ================= */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Recently Viewed
              </h3>
            </div>

            <div className="flex gap-2.5 overflow-x-auto no-scrollbar">
              {/* Doctor 1 */}
              <Link
                to="/doctors/$doctorId"
                params={{ doctorId: DOCTORS[0].id }}
                className="shrink-0 flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs w-64"
              >
                <img
                  src={DOCTORS[0].image}
                  alt={DOCTORS[0].fullName}
                  className="h-11 w-11 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {DOCTORS[0].fullName}
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate">{DOCTORS[0].speciality}</p>
                </div>
              </Link>

              {/* Hospital */}
              <Link
                to="/doctors"
                search={{ q: "Manipal Hospital" }}
                className="shrink-0 flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs w-64"
              >
                <div className="h-11 w-11 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Building2 className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    Manipal Hospital
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate">Old Airport Road</p>
                </div>
              </Link>
            </div>
          </section>

          {/* ================= 4. PROMO HERO BANNER SLIDER (SCREEN 1) ================= */}
          <section className="relative">
            <div className="overflow-hidden rounded-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={banners[activeBannerIndex].id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`p-5 rounded-3xl bg-gradient-to-r ${banners[activeBannerIndex].bgGradient} text-white relative overflow-hidden shadow-lg`}
                >
                  <div className="max-w-[65%] space-y-2">
                    <span className="inline-block text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-md backdrop-blur-sm">
                      {banners[activeBannerIndex].tag}
                    </span>
                    <h3 className="font-bold text-base leading-tight">
                      {banners[activeBannerIndex].title}
                    </h3>
                    <Button
                      asChild
                      size="sm"
                      className="h-8 text-xs font-bold bg-white hover:bg-slate-100 text-slate-900 rounded-xl px-3.5 shadow-sm"
                    >
                      <Link to={banners[activeBannerIndex].link}>
                        {banners[activeBannerIndex].cta}
                      </Link>
                    </Button>
                  </div>

                  <img
                    src={banners[activeBannerIndex].image}
                    alt="Promo"
                    className="absolute right-0 bottom-0 top-0 w-36 h-full object-cover opacity-85 mix-blend-luminosity"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Dots */}
            <div className="flex justify-center gap-1.5 mt-2.5">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveBannerIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === activeBannerIndex ? "w-6 bg-blue-600" : "w-1.5 bg-slate-300 dark:bg-slate-700"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </section>

          {/* ================= 5. FIND DOCTORS BY SPECIALITY (PRACTO STYLE TABS) ================= */}
          <section className="space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Find doctors by speciality
              </h3>
              <Link to="/specialities" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                Explore all &gt;
              </Link>
            </div>

            {/* Segmented Tabs (General Care vs Advanced Care) */}
            <div className="bg-slate-100 dark:bg-slate-800/90 p-1 rounded-2xl flex border border-slate-200/60 dark:border-slate-700 shadow-inner">
              <button
                type="button"
                onClick={() => setSpecialityTab("general")}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  specialityTab === "general"
                    ? "bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-xs font-extrabold"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800"
                }`}
              >
                General Care
              </button>
              <button
                type="button"
                onClick={() => setSpecialityTab("advanced")}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  specialityTab === "advanced"
                    ? "bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-xs font-extrabold"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800"
                }`}
              >
                Advanced Care
              </button>
            </div>

            {/* 4x2 Grid of Visual Speciality Cards */}
            <div className="grid grid-cols-4 gap-2.5">
              {(specialityTab === "general" ? GENERAL_CARE_SPECIALITIES : ADVANCED_CARE_SPECIALITIES).map((item) => (
                <Link
                  key={item.id}
                  to="/doctors"
                  search={{ q: item.query }}
                  className="group flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-1.5 shadow-xs hover:shadow-md hover:border-blue-400 transition-all text-center overflow-hidden"
                >
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800 mb-1.5 border border-slate-100/80 dark:border-slate-800">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-[10px] font-bold text-slate-800 dark:text-slate-200 line-clamp-2 leading-tight px-0.5 min-h-[26px] flex items-center justify-center">
                    {item.name}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* ================= 6. HEALTH ARTICLES BY DOCTORS ================= */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-blue-600" /> Health Articles by Doctors
                </h3>
                <p className="text-[11px] text-slate-400">Diet, 10 foods, micronutrients & wellness</p>
              </div>
              <Link to="/patient/feed" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                Read all articles →
              </Link>
            </div>

            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 pt-1">
              {HEALTH_ARTICLES_DATA.slice(0, 5).map((art) => (
                <Link
                  key={art.id}
                  to="/patient/articles/$articleId"
                  params={{ articleId: art.id }}
                  className="w-64 sm:w-72 shrink-0 p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="h-28 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span className="absolute top-2 right-2 text-[9px] font-black px-2 py-0.5 rounded-md bg-white/90 dark:bg-slate-900/90 text-blue-600 backdrop-blur-xs">
                        {art.category}
                      </span>
                    </div>

                    <h4 className="text-xs font-black text-slate-900 dark:text-white line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                      {art.title}
                    </h4>

                    <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  <div className="pt-2.5 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <img
                        src={art.author.avatar}
                        alt={art.author.name}
                        className="h-5 w-5 rounded-full object-cover"
                      />
                      <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate max-w-[120px]">
                        {art.author.name}
                      </span>
                    </div>
                    <span className="text-[9px] font-semibold text-slate-400">
                      ⏱️ {art.readTime}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ================= 7. FREE EXPERT Q&A PREVIEW ================= */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Free Expert Q&A
              </h3>
              <Link to="/patient/feed" className="text-xs font-bold text-blue-600 dark:text-blue-400">
                See all
              </Link>
            </div>

            <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Community Question</span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                  Answered
                </span>
              </div>

              <p className="text-xs font-bold text-slate-900 dark:text-white leading-relaxed">
                {featuredQuestion.question}
              </p>

              {featuredQuestion.doctorAnswer && (
                <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <img
                    src={featuredQuestion.doctorAnswer.avatar}
                    alt={featuredQuestion.doctorAnswer.doctorName}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                        {featuredQuestion.doctorAnswer.doctorName}
                      </p>
                      <CheckCircle2 className="h-3 w-3 text-blue-600 shrink-0" />
                    </div>
                    <p className="text-[10px] text-slate-400 truncate">
                      {featuredQuestion.doctorAnswer.speciality}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400">
                <span>👁️ {featuredQuestion.viewsCount} views</span>
                <span>💬 {featuredQuestion.commentsCount} comments</span>
              </div>
            </div>

            {/* "Got a health query?" CTA Card */}
            <Link
              to="/patient/feed"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 text-blue-900 dark:text-blue-200 shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">Got a health query?</h4>
                  <p className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                    Ask and get answers from verified doctors for free
                  </p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
            </Link>
          </section>

        </main>

        {/* Location Picker Modal */}
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

        {/* Care AI Interactive Assistant */}
        <CareAIChatModal
          isOpen={isCareAIOpen}
          onClose={() => setIsCareAIOpen(false)}
        />

      </div>
    </>
  );
}
