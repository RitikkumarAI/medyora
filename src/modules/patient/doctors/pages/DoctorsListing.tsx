import { useState, useEffect } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  Grid2X2,
  List as ListIcon,
  Star,
  MapPin,
  Clock,
  Heart,
  ShieldCheck,
  ChevronDown,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DOCTORS } from "@/shared/data/mock";
import { DoctorCardSkeleton } from "@/components/shared/SkeletonLoader";
import { EmptyState } from "@/components/shared/EmptyState";
import type { Doctor } from "@/shared/types";

type SortOption = "relevance" | "price_low" | "price_high" | "rating" | "experience";

export function DoctorsListing() {
  const router = useRouter();

  // State
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(DOCTORS.filter((d) => d.isFavorite).map((d) => d.id)),
  );
  const [compareList, setCompareList] = useState<Set<string>>(new Set());

  // Filter States
  const [filterFee, setFilterFee] = useState<number>(2000);
  const [filterVerified, setFilterVerified] = useState(false);
  const [filterGender, setFilterGender] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    const newFavs = new Set(favorites);
    if (newFavs.has(id)) newFavs.delete(id);
    else newFavs.add(id);
    setFavorites(newFavs);
  };

  const toggleCompare = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    const newCompare = new Set(compareList);
    if (newCompare.has(id)) {
      newCompare.delete(id);
    } else {
      if (newCompare.size >= 3) return alert("You can only compare up to 3 doctors.");
      newCompare.add(id);
    }
    setCompareList(newCompare);
  };

  // Apply Search, Filters, and Sort
  let displayDoctors = DOCTORS.filter((doc) => {
    // Search
    if (
      searchQuery &&
      !doc.fullName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !doc.speciality.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    // Filters
    if (doc.fee > filterFee) return false;
    if (filterVerified && !doc.verified) return false;
    if (filterGender && doc.gender !== filterGender) return false;
    return true;
  });

  // Sort
  displayDoctors = [...displayDoctors].sort((a, b) => {
    if (sortBy === "price_low") return a.fee - b.fee;
    if (sortBy === "price_high") return b.fee - a.fee;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "experience") return b.experience - a.experience;
    return 0; // relevance (default mock order)
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-24 transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 px-4 pt-6 pb-3 shadow-sm border-b border-slate-100 dark:border-slate-800 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.history.back()}
              className="h-10 w-10 shrink-0 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm rounded-full"
            >
              <ArrowLeft className="h-5 w-5 text-slate-700 dark:text-slate-200" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white">Find Doctors</h1>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {displayDoctors.length} Specialists
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
              className="h-10 w-10 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              {viewMode === "list" ? (
                <Grid2X2 className="h-4 w-4" />
              ) : (
                <ListIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white h-10 text-xs focus-visible:ring-blue-600"
            />
          </div>
          <Button
            onClick={() => setIsFilterOpen(true)}
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-xl border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm text-blue-600 dark:text-blue-400 shrink-0 relative"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {(filterVerified || filterGender || filterFee < 2000) && (
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 border-2 border-white dark:border-slate-900" />
            )}
          </Button>
        </div>

        {/* Sort Pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mt-3 pb-1">
          {(["relevance", "rating", "price_low", "experience"] as SortOption[]).map((sort) => (
            <button
              key={sort}
              onClick={() => setSortBy(sort)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${sortBy === sort ? "bg-blue-600 text-white shadow-sm" : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
            >
              {sort === "relevance"
                ? "All"
                : sort === "rating"
                  ? "Top Rated"
                  : sort === "price_low"
                    ? "Lowest Fee"
                    : "Most Experienced"}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4 relative">
        {isLoading ? (
          <div className={viewMode === "grid" ? "grid grid-cols-2 gap-3" : "space-y-3"}>
            <DoctorCardSkeleton />
            <DoctorCardSkeleton />
            <DoctorCardSkeleton />
            <DoctorCardSkeleton />
          </div>
        ) : displayDoctors.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="No Doctors Found"
              description="Try adjusting your filters or search query."
            />
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-2 gap-3" : "space-y-3"}>
            {displayDoctors.map((doc) => (
              <Link
                key={doc.id}
                to={`/patient/doctor/$doctorId`}
                params={{ doctorId: doc.id }}
                className={`relative flex ${viewMode === "grid" ? "flex-col p-3" : "flex-row p-3 gap-3"} rounded-3xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 transition-colors`}
              >
                {/* Favorite Icon */}
                <button
                  onClick={(e) => toggleFavorite(e, doc.id)}
                  className="absolute top-3 right-3 z-10 h-7 w-7 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center shadow-sm"
                >
                  <Heart
                    className={`h-3.5 w-3.5 ${favorites.has(doc.id) ? "fill-red-500 text-red-500" : "text-slate-400"}`}
                  />
                </button>

                <img
                  src={doc.image}
                  alt={doc.fullName}
                  className={`${viewMode === "grid" ? "h-24 w-full mb-3" : "h-[90px] w-[90px]"} rounded-2xl object-cover`}
                />

                <div className="flex flex-1 flex-col justify-center min-w-0">
                  <div className="flex items-center gap-1 mb-0.5">
                    <h4 className="font-bold text-[14px] text-slate-900 dark:text-white truncate">
                      {doc.fullName}
                    </h4>
                    {doc.verified && (
                      <ShieldCheck className="h-3 w-3 text-blue-600 dark:text-blue-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate mb-1">
                    {doc.speciality}
                  </p>

                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-200">
                      {doc.rating}
                    </span>
                    <span className="text-[10px] text-slate-400">({doc.totalReviews})</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700 mx-1" />
                    <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                      {doc.distance} km
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50 dark:border-slate-800">
                    <div className="font-black text-blue-600 dark:text-blue-400 text-[13px]">
                      ₹{doc.fee}
                    </div>

                    <button
                      onClick={(e) => toggleCompare(e, doc.id)}
                      className={`text-[9px] font-bold px-2 py-1 rounded-lg transition-colors ${compareList.has(doc.id) ? "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"}`}
                    >
                      {compareList.has(doc.id) ? "Comparing" : "Compare"}
                    </button>
                  </div>
                </div>
              </Link>
            ))}

            {/* Infinite Scroll Simulation */}
            <div className="py-6 text-center">
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-2">
                Loading more...
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Floating Compare Button */}
      {compareList.size > 0 && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm animate-in slide-in-from-bottom-10">
          <div className="bg-slate-900 text-white rounded-2xl p-3 px-5 shadow-2xl flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400">Comparing</p>
              <p className="text-sm font-bold">{compareList.size} out of 3 Doctors</p>
            </div>
            <Link
              to="/patient/compare"
              search={{ doctors: Array.from(compareList) }}
              className="h-9 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold flex items-center justify-center"
            >
              View
            </Link>
          </div>
        </div>
      )}

      {/* Filter Bottom Sheet */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in"
            onClick={() => setIsFilterOpen(false)}
          />
          <div className="relative bg-white dark:bg-slate-900 rounded-t-[40px] p-6 flex flex-col max-h-[85vh] animate-in slide-in-from-bottom-full duration-300 shadow-2xl border-t border-slate-100 dark:border-slate-800">
            <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-6 shrink-0" />

            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Filters</h2>
              <button
                onClick={() => {
                  setFilterFee(2000);
                  setFilterVerified(false);
                  setFilterGender(null);
                }}
                className="text-xs font-bold text-blue-600 dark:text-blue-400"
              >
                Reset
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-8 pb-6 pr-2">
              {/* Fee Filter */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Max Consultation Fee
                  </h3>
                  <span className="text-sm font-black text-blue-600 dark:text-blue-400">
                    ₹{filterFee}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="100"
                  value={filterFee}
                  onChange={(e) => setFilterFee(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] font-medium text-slate-400 mt-2">
                  <span>Free</span>
                  <span>₹2000+</span>
                </div>
              </section>

              {/* Gender Filter */}
              <section>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3">
                  Doctor Gender
                </h3>
                <div className="flex gap-3">
                  {["male", "female"].map((g) => (
                    <button
                      key={g}
                      onClick={() => setFilterGender(filterGender === g ? null : g)}
                      className={`flex-1 py-2.5 rounded-xl border text-xs font-bold capitalize transition-colors ${filterGender === g ? "border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700"}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </section>

              {/* Verified Filter */}
              <section>
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      Verified Doctors Only
                    </h3>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Medyora certified specialists
                    </p>
                  </div>
                  <div
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${filterVerified ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700"}`}
                    onClick={() => setFilterVerified(!filterVerified)}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${filterVerified ? "translate-x-6" : "translate-x-1"}`}
                    />
                  </div>
                </label>
              </section>
            </div>

            <div className="pt-4 mt-auto border-t border-slate-100 dark:border-slate-800 shrink-0">
              <Button
                onClick={() => setIsFilterOpen(false)}
                className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/20"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
