import { useState, useEffect } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { 
  ArrowLeft, Search, Mic, Sparkles, Stethoscope, HeartPulse, 
  Smile, Baby, Flower2, Bone, Brain, CheckCircle2, ChevronRight, 
  MessageSquare, X, Clock, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DOCTORS, SPECIALIZATIONS, GENERAL_CARE_SPECIALITIES, ADVANCED_CARE_SPECIALITIES } from "@/shared/data/mock";
import { COMMUNITY_QUESTIONS } from "@/shared/data/superapp-mock";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { CareAIChatModal } from "@/modules/patient/care-ai/components/CareAIChatModal";
export function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isCareAIOpen, setIsCareAIOpen] = useState(false);
  const [specialityTab, setSpecialityTab] = useState<"general" | "advanced">("general");
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState<typeof DOCTORS>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const q = debouncedQuery.toLowerCase();
    const matches = DOCTORS.filter((doc) => {
      return (
        doc.fullName.toLowerCase().includes(q) ||
        doc.speciality.toLowerCase().includes(q) ||
        doc.clinic.name.toLowerCase().includes(q) ||
        doc.city.toLowerCase().includes(q) ||
        Boolean(doc.diseases?.some((d) => d.toLowerCase().includes(q))) ||
        Boolean(doc.symptoms?.some((s) => s.toLowerCase().includes(q)))
      );
    });

    setResults(matches);
    setIsSearching(false);
  }, [debouncedQuery]);

  const featuredQuestion = COMMUNITY_QUESTIONS[0];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-24 font-sans transition-colors">
      
      {/* ================= HEADER WITH SEARCH & CARE AI ================= */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 pt-4 pb-3 border-b border-slate-100 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.history.back()}
            className="h-10 w-10 shrink-0 rounded-full border border-slate-200 dark:border-slate-800"
            aria-label="Go Back"
          >
            <ArrowLeft className="h-5 w-5 text-slate-700 dark:text-slate-300" />
          </Button>

          <h1 className="text-base font-bold text-slate-900 dark:text-white">Search</h1>
        </div>

        {/* Search input with Ask Care AI button */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for Doctors, Clinics, Hospitals..."
              className="h-11 pl-9 pr-8 rounded-2xl bg-slate-100/90 dark:bg-slate-800 border-slate-200/60 dark:border-slate-700 text-xs focus-visible:ring-2 focus-visible:ring-blue-600"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <Button
            onClick={() => window.dispatchEvent(new CustomEvent("open-care-ai", { detail: { mode: "chat" } }))}
            size="sm"
            className="h-11 px-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 shrink-0 flex items-center gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
            <span>Ask Care AI</span>
          </Button>
        </div>
      </header>

      {/* ================= SEARCH RESULTS OR PRACTO DISCOVERY ================= */}
      <main className="p-4 space-y-6">
        {query.trim() ? (
          /* Live Search Results */
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Search Results ({results.length})
            </p>

            {results.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                <Search className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">No doctors found</h4>
                <p className="text-xs text-slate-400 mt-1">Try searching by condition, speciality or another city.</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {results.map((doc) => (
                  <Link
                    key={doc.id}
                    to="/doctors/$doctorId"
                    params={{ doctorId: doc.id }}
                    className="flex gap-3 p-3.5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs hover:border-blue-500 transition-colors"
                  >
                    <img
                      src={doc.image}
                      alt={doc.fullName}
                      className="h-16 w-16 rounded-2xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {doc.fullName}
                      </h4>
                      <p className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">{doc.speciality}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{doc.clinic.name}, {doc.city}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] font-bold text-slate-900 dark:text-slate-100">₹{doc.fee}</span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
                          ★ {doc.rating}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Practo Screen 2 Default View: Top Specialities 4x2 + Free Q&A */
          <>
            {/* Top Specialities Segmented Tabs (Screen 2) */}
            <section className="space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Top Specialities
                </h3>
                <Link to="/specialities" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                  See all &gt;
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

            {/* Free Expert Q&A Community Question (Screen 2) */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Free Expert Q&A
                </h3>
                <Link to="/patient/feed" className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  See all
                </Link>
              </div>

              {featuredQuestion && (
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
              )}

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
          </>
        )}
      </main>

      {/* Care AI Assistant Modal */}
      <CareAIChatModal
        isOpen={isCareAIOpen}
        onClose={() => setIsCareAIOpen(false)}
      />

    </div>
  );
}
