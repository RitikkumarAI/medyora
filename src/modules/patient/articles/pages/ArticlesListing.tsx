import { useState, useMemo } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { 
  ArrowLeft, Search, Bookmark, Clock, Sparkles, Heart, 
  Share2, Filter, BookOpen, Check, ShieldCheck, ChevronRight, User, Lightbulb 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  HEALTH_ARTICLES_DATA, getDailyTip, type HealthArticle 
} from "@/shared/data/articles-data";
import { toast } from "sonner";

const CATEGORIES = [
  "All",
  "Heart Health",
  "Nutrition",
  "Diabetes",
  "Mental Health",
  "Sleep & Fitness",
  "Pediatrics",
] as const;

export function ArticlesListing() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const dailyTip = getDailyTip();

  const toggleBookmark = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const isBookmarked = prev.includes(id);
      if (isBookmarked) {
        toast.info("Removed from saved articles");
        return prev.filter((item) => item !== id);
      } else {
        toast.success("Saved to bookmarks");
        return [...prev, id];
      }
    });
  };

  const filteredArticles = useMemo(() => {
    return HEALTH_ARTICLES_DATA.filter((article) => {
      if (selectedCategory !== "All" && article.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          article.title.toLowerCase().includes(q) ||
          article.summary.toLowerCase().includes(q) ||
          article.tags.some((t) => t.toLowerCase().includes(q)) ||
          article.author.name.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [searchQuery, selectedCategory]);

  const featuredArticle = HEALTH_ARTICLES_DATA[0]!;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 pt-6 pb-3 shadow-xs border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.history.back()}
            className="h-10 w-10 shrink-0 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xs rounded-full"
          >
            <ArrowLeft className="h-5 w-5 text-slate-700 dark:text-slate-200" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">Health & Wellness Articles</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Medically verified insights & daily tips</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search symptoms, diet plans, heart health..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-medium focus-visible:ring-blue-600 text-slate-900 dark:text-white"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>
      </header>

      {/* Category Filter Pills */}
      <div className="px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
        
        {/* ================= 1. DAILY HEALTH TIP CARD ================= */}
        {!searchQuery && selectedCategory === "All" && (
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-[32px] p-5 shadow-lg shadow-emerald-700/15 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Lightbulb className="h-32 w-32" />
            </div>

            <div className="relative z-10 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs">
                  <Sparkles className="h-3 w-3 text-amber-300" /> Daily Health Tip
                </span>
                <span className="text-[11px] text-emerald-100 font-medium">Updated Today</span>
              </div>

              <h2 className="text-base font-black leading-snug text-white drop-shadow-xs">
                {dailyTip.title}
              </h2>

              <p className="text-xs text-emerald-50 leading-relaxed font-normal">
                {dailyTip.tip}
              </p>

              <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-2.5 border border-white/15 text-[11px] text-emerald-100 flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-300 shrink-0" />
                <span><strong>Today's Action:</strong> {dailyTip.actionItem}</span>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] text-emerald-200">
                <span className="font-semibold">{dailyTip.doctor}</span>
                <span className="bg-emerald-800/40 px-2 py-0.5 rounded-md text-[10px]">{dailyTip.category}</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. FEATURED ARTICLE ================= */}
        {!searchQuery && selectedCategory === "All" && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Featured Article</h2>
            </div>

            <Link
              to={`/patient/articles/$articleId`}
              params={{ articleId: featuredArticle.id }}
              className="block bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900 transition-all group"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                    {featuredArticle.category}
                  </span>
                </div>

                <button
                  onClick={(e) => toggleBookmark(e, featuredArticle.id)}
                  className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-white transition-colors"
                >
                  <Bookmark
                    className={`h-4 w-4 ${
                      bookmarkedIds.includes(featuredArticle.id)
                        ? "fill-blue-600 text-blue-600"
                        : ""
                    }`}
                  />
                </button>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-medium text-slate-200 flex items-center gap-1.5 mb-1">
                    <Clock className="h-3 w-3" /> {featuredArticle.readTime} read • {featuredArticle.publishedDate}
                  </p>
                  <h3 className="font-bold text-base text-white leading-tight drop-shadow-xs line-clamp-2">
                    {featuredArticle.title}
                  </h3>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {featuredArticle.summary}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <img
                      src={featuredArticle.author.avatar}
                      alt={featuredArticle.author.name}
                      className="h-7 w-7 rounded-full object-cover border border-slate-100 dark:border-slate-800"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                        {featuredArticle.author.name}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">{featuredArticle.author.role}</p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    Read Article <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* ================= 3. ALL ARTICLES LIST ================= */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`} ({filteredArticles.length})
            </h2>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 text-center border border-slate-100 dark:border-slate-800">
              <BookOpen className="h-10 w-10 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">No articles found</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Try adjusting your search query or category filter.</p>
            </div>
          ) : (
            filteredArticles.map((article) => {
              const isBookmarked = bookmarkedIds.includes(article.id);
              return (
                <Link
                  key={article.id}
                  to={`/patient/articles/$articleId`}
                  params={{ articleId: article.id }}
                  className="flex gap-4 p-3.5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900 shadow-xs transition-all group"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-24 w-24 rounded-2xl object-cover border border-slate-100 dark:border-slate-800 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {article.category}
                        </span>
                        <button
                          onClick={(e) => toggleBookmark(e, article.id)}
                          className="text-slate-400 hover:text-blue-600 transition-colors p-0.5"
                        >
                          <Bookmark
                            className={`h-3.5 w-3.5 ${
                              isBookmarked ? "fill-blue-600 text-blue-600" : ""
                            }`}
                          />
                        </button>
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {article.title}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-50 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      <span>{article.author.name}</span>
                      <span className="flex items-center gap-1 text-[10px]">
                        <Clock className="h-3 w-3" /> {article.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>

      </main>
    </div>
  );
}
