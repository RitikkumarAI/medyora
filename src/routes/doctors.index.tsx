import { useState, useMemo, useEffect } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import {
  Search,
  ArrowLeft,
  Star,
  Clock,
  Heart,
  SlidersHorizontal,
  X,
  MapPin,
  Scale,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DOCTORS, LANGUAGES } from "@/shared/data/mock";
import { toast } from "sonner";

import { LocationPickerModal } from "@/shared/components/LocationPickerModal";

export const Route = createFileRoute("/doctors/")({
  validateSearch: (
    search: Record<string, unknown>,
  ): {
    q?: string | undefined;
    city?: string | undefined;
    area?: string | undefined;
  } => ({
    q: typeof search["q"] === "string" ? (search["q"] as string) : undefined,
    city: typeof search["city"] === "string" ? (search["city"] as string) : undefined,
    area: typeof search["area"] === "string" ? (search["area"] as string) : undefined,
  }),
  component: DoctorsListing,
});

const QUICK_FILTERS = ["All", "Available Today", "Home Visit", "Top Rated", "Nearby"];

function DoctorsListing() {
  const router = useRouter();
  const searchParams = Route.useSearch();
  const [searchQuery, setSearchQuery] = useState(searchParams.q || "");
  const [selectedCity, setSelectedCity] = useState(searchParams.city || "");
  const [selectedArea, setSelectedArea] = useState(searchParams.area || "");
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [activeQuick, setActiveQuick] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  // Advanced Filter State
  const [gender, setGender] = useState("any"); // any, male, female
  const [maxFee, setMaxFee] = useState(1500);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [homeVisitOnly, setHomeVisitOnly] = useState(false);
  const [onlineOnly, setOnlineOnly] = useState(false);

  // Compare State
  const [compareList, setCompareList] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    if (searchParams.q !== undefined) setSearchQuery(searchParams.q);
    if (searchParams.city !== undefined) setSelectedCity(searchParams.city);
    if (searchParams.area !== undefined) setSelectedArea(searchParams.area);
  }, [searchParams.q, searchParams.city, searchParams.area]);

  useEffect(() => {
    setVisibleCount(12);
  }, [
    searchQuery,
    selectedCity,
    selectedArea,
    activeQuick,
    gender,
    maxFee,
    selectedLanguages,
    homeVisitOnly,
    onlineOnly,
  ]);

  // Toggle Compare
  const toggleCompare = (e: React.MouseEvent, docId: string) => {
    e.preventDefault();
    setCompareList((prev) => {
      if (prev.includes(docId)) {
        return prev.filter((id) => id !== docId);
      }
      if (prev.length >= 4) {
        toast.error("You can only compare up to 4 doctors at a time");
        return prev;
      }
      return [...prev, docId];
    });
  };

  // Toggle Language
  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang],
    );
  };

  const resetFilters = () => {
    setGender("any");
    setMaxFee(1500);
    setSelectedLanguages([]);
    setHomeVisitOnly(false);
    setOnlineOnly(false);
    setSearchQuery("");
    setActiveQuick("All");
    setSelectedCity("");
    setSelectedArea("");
  };

  // Filter Logic
  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doc) => {
      // City & Area Filters
      if (selectedCity && doc.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }
      if (
        selectedArea &&
        (!doc.clinic.area || !doc.clinic.area.toLowerCase().includes(selectedArea.toLowerCase()))
      ) {
        return false;
      }

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        doc.fullName.toLowerCase().includes(q) ||
        doc.speciality.toLowerCase().includes(q) ||
        doc.city.toLowerCase().includes(q) ||
        doc.clinic.name.toLowerCase().includes(q) ||
        Boolean(doc.diseases?.some((d) => d.toLowerCase().includes(q))) ||
        Boolean(doc.symptoms?.some((s) => s.toLowerCase().includes(q)));

      if (!matchesSearch) return false;

      if (activeQuick === "Available Today" && !doc.availableToday) return false;
      if (activeQuick === "Home Visit" && !doc.homeVisit) return false;
      if (activeQuick === "Top Rated" && doc.rating < 4.8) return false;
      if (
        activeQuick === "Nearby" &&
        selectedCity &&
        doc.city.toLowerCase() !== selectedCity.toLowerCase()
      )
        return false;

      if (gender !== "any" && doc.gender !== gender) return false;
      if (doc.fee > maxFee) return false;
      if (homeVisitOnly && !doc.homeVisit) return false;
      if (onlineOnly && !doc.clinic.online) return false;

      if (selectedLanguages.length > 0) {
        const hasLang = selectedLanguages.some((l) => doc.languages.includes(l));
        if (!hasLang) return false;
      }

      return true;
    });
  }, [
    searchQuery,
    selectedCity,
    selectedArea,
    activeQuick,
    gender,
    maxFee,
    selectedLanguages,
    homeVisitOnly,
    onlineOnly,
  ]);

  const displayLocation = selectedArea
    ? `${selectedArea}, ${selectedCity}`
    : selectedCity || "All Locations";

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
      {/* Header */}
      {/* Top Header & Search Area */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 sm:px-6 pt-4 pb-3 border-b border-slate-100 dark:border-slate-800 shadow-xs">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.history.back()}
                className="h-10 w-10 shrink-0 bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 shadow-xs rounded-full"
              >
                <ArrowLeft className="h-5 w-5 text-slate-700 dark:text-slate-200" />
              </Button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                  Find Verified Doctors
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {filteredDoctors.length} specialists available
                </p>
              </div>
            </div>

            {/* Location Chip */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-blue-600 dark:text-blue-400 shadow-xs hover:bg-blue-50 dark:hover:bg-slate-750 transition-all max-w-[200px] truncate"
            >
              <MapPin className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="truncate">{displayLocation}</span>
            </button>
          </div>

          {/* Search Bar & Mobile Filter Trigger */}
          <div className="flex gap-2 mb-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search doctors, specialities, symptoms, clinics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 rounded-2xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-xs h-12 text-sm font-medium focus-visible:ring-blue-600 text-slate-900 dark:text-white"
              />
            </div>
            <Button
              onClick={() => setShowFilters(true)}
              variant="outline"
              className="lg:hidden h-12 w-12 shrink-0 rounded-2xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100"
            >
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {QUICK_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveQuick(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                  activeQuick === f
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </header>

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex gap-6">
        {/* ================= DESKTOP FILTER SIDEBAR (Screen 02) ================= */}
        <aside className="hidden lg:block w-72 shrink-0 space-y-6 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs h-fit sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-blue-600" />
              Filters
            </h3>
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Reset All
            </button>
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Doctor Gender
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["any", "male", "female"].map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                    gender === g
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Max Consultation Fee */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-400">Max Fee</span>
              <span className="font-bold text-slate-900 dark:text-white">₹{maxFee}</span>
            </div>
            <input
              type="range"
              min="200"
              max="2000"
              step="100"
              value={maxFee}
              onChange={(e) => setMaxFee(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Languages */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Languages Spoken
            </label>
            <div className="flex flex-wrap gap-1.5">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  onClick={() => toggleLanguage(lang)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedLanguages.includes(lang)
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Home Visit & Online Checkboxes */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={homeVisitOnly}
                onChange={(e) => setHomeVisitOnly(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              Home Visit Available
            </label>
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={onlineOnly}
                onChange={(e) => setOnlineOnly(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              Online Video Consultation
            </label>
          </div>
        </aside>

        {/* ================= DOCTOR CARDS (Screen 02) ================= */}
        <main className={`flex-1 min-w-0 space-y-4 ${compareList.length > 0 ? "pb-28" : "pb-8"}`}>
          {filteredDoctors.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Search className="h-12 w-12 text-slate-200 dark:text-slate-800 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No doctors found</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <>
              {filteredDoctors.slice(0, visibleCount).map((doc) => {
                const isComparing = compareList.includes(doc.id);
                return (
                  <Link
                    key={doc.id}
                    to={`/doctors/$doctorId`}
                    params={{ doctorId: doc.id }}
                    className={`flex gap-4 rounded-3xl bg-white dark:bg-slate-900 p-3 shadow-xs border transition-colors relative overflow-hidden group ${isComparing ? "border-blue-600 bg-blue-50/10 dark:bg-blue-950/20" : "border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"}`}
                    style={{ contentVisibility: "auto", containIntrinsicSize: "1px 130px" }}
                  >
                    <img
                      src={doc.image}
                      alt={doc.fullName}
                      className="h-24 w-24 rounded-2xl object-cover border border-slate-100 dark:border-slate-800 shrink-0"
                      loading="lazy"
                    />
                    <div className="flex flex-1 flex-col py-1 justify-center relative min-w-0">
                      {/* Action Buttons */}
                      <div className="absolute top-0 right-0 flex items-center gap-1 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs rounded-bl-xl pl-1 pb-1">
                        <button
                          onClick={(e) => toggleCompare(e, doc.id)}
                          className={`p-1.5 rounded-full transition-colors ${isComparing ? "text-blue-600 bg-blue-50 dark:bg-blue-950" : "text-slate-400 hover:text-blue-600"}`}
                        >
                          <Scale className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toast.success("Added to favorites");
                          }}
                          className="p-1.5 rounded-full text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Heart className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="pr-12">
                        <h4 className="font-bold text-[15px] text-slate-900 dark:text-white line-clamp-1">
                          {doc.fullName}
                        </h4>
                        <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-0.5">
                          {doc.speciality}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 mt-2.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-md">
                          <Clock className="h-3 w-3" />
                          {doc.experience} Yrs
                        </div>
                        <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-md">
                          <MapPin className="h-3 w-3" />
                          {doc.city}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.5 rounded text-amber-700 dark:text-amber-300">
                          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                          <span className="text-[11px] font-bold">{doc.rating}</span>
                        </div>
                        <div className="font-black text-slate-900 dark:text-white text-[15px]">
                          ₹{doc.fee}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}

              {filteredDoctors.length > visibleCount && (
                <div className="pt-4 pb-2 flex justify-center">
                  <Button
                    variant="outline"
                    onClick={() => setVisibleCount((prev) => prev + 12)}
                    className="h-12 px-6 rounded-2xl border-slate-200 dark:border-slate-700 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 cursor-pointer shadow-xs"
                  >
                    Show More Specialists ({filteredDoctors.length - visibleCount} remaining)
                  </Button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Floating Compare Bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 pb-safe shadow-2xl z-40">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
              {compareList.length} / 4 Selected
            </span>
            <button
              onClick={() => setCompareList([])}
              className="text-xs font-bold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              Clear
            </button>
          </div>
          <Button
            asChild
            disabled={compareList.length < 2}
            className="w-full h-14 rounded-2xl text-[15px] font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25"
          >
            <Link to="/patient/compare" search={{ doctors: compareList }}>
              Compare Doctors
            </Link>
          </Button>
        </div>
      )}

      {/* Advanced Filter Drawer (Bottom Sheet) */}
      {showFilters && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-slate-900/50 backdrop-blur-xs transition-opacity">
          <div className="w-full sm:max-w-md bg-white dark:bg-slate-900 rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-200 dark:border-slate-800">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Filters</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFilters(false)}
                className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-6 overflow-y-auto space-y-8 flex-1">
              {/* Gender */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Gender</h3>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
                  {["any", "male", "female"].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`flex-1 py-2 text-sm font-bold rounded-xl capitalize transition-all ${
                        gender === g
                          ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                  Languages Spoken
                </h3>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => toggleLanguage(lang)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                        selectedLanguages.includes(lang)
                          ? "bg-blue-50 dark:bg-blue-950 border-blue-600 text-blue-700 dark:text-blue-300"
                          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferences */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                  Preferences
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 cursor-pointer">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      Home Visit Available
                    </span>
                    <input
                      type="checkbox"
                      checked={homeVisitOnly}
                      onChange={(e) => setHomeVisitOnly(e.target.checked)}
                      className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                    />
                  </label>
                  <label className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 cursor-pointer">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      Online Consultation
                    </span>
                    <input
                      type="checkbox"
                      checked={onlineOnly}
                      onChange={(e) => setOnlineOnly(e.target.checked)}
                      className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                    />
                  </label>
                </div>
              </div>

              {/* Price Range */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Max Consultation Fee
                  </h3>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    ₹{maxFee}
                  </span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="3000"
                  step="100"
                  value={maxFee}
                  onChange={(e) => setMaxFee(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-2">
                  <span>₹300</span>
                  <span>₹3000+</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 sticky bottom-0">
              <Button
                onClick={() => setShowFilters(false)}
                className="w-full h-14 rounded-2xl text-[15px] font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25"
              >
                Apply Filters ({filteredDoctors.length} found)
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
