import { useState } from "react";
import { Link, useRouter, useParams } from "@tanstack/react-router";
import { 
  ArrowLeft, Bookmark, Share2, Clock, Heart, ShieldCheck, 
  Sparkles, CheckCircle2, ChevronRight, MessageSquare, Calendar, 
  User, Info, Utensils, Award, HelpCircle, ArrowRight, Stethoscope,
  ChevronDown, Flame
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  HEALTH_ARTICLES_DATA, getStoredArticles, type HealthArticle, type FoodNutrientItem 
} from "@/shared/data/articles-data";
import { toast } from "sonner";
import { motion } from "framer-motion";

export function ArticleDetail() {
  const router = useRouter();
  const { articleId } = useParams({ strict: false }) as { articleId?: string };
  
  const allArticles = typeof window !== "undefined" ? getStoredArticles() : HEALTH_ARTICLES_DATA;
  const article = (allArticles.find((a) => a.id === articleId) || allArticles[0])!;
  
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likesCount, setLikesCount] = useState(article.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const toggleBookmark = () => {
    setIsBookmarked((prev) => {
      const next = !prev;
      toast.success(next ? "Article saved to reading bookmarks" : "Removed from bookmarks");
      return next;
    });
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikesCount((prev) => prev + 1);
      setHasLiked(true);
      toast.success("Thank you for marking this article helpful!");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Article link copied to clipboard!");
    }
  };

  const relatedArticles = allArticles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-28 font-sans transition-colors">
      
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 sm:px-8 py-3.5 shadow-xs border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.history.back()}
          className="h-10 w-10 shrink-0 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs rounded-2xl"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5 text-slate-700 dark:text-slate-200" />
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleBookmark}
            className="h-10 w-10 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs text-slate-700 dark:text-slate-200"
            aria-label="Bookmark"
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-blue-600 text-blue-600 dark:text-blue-400" : ""}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            className="h-10 w-10 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs text-slate-700 dark:text-slate-200"
            aria-label="Share"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 pt-4 space-y-6">
        
        {/* Cover Photo & Article Title Hero */}
        <div className="relative rounded-[32px] overflow-hidden bg-slate-900 shadow-lg border border-slate-200 dark:border-slate-800">
          <div className="relative h-64 sm:h-80 w-full">
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover opacity-90"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            <div className="absolute top-4 left-4">
              <span className="bg-blue-600 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-md backdrop-blur-xs">
                {article.category}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-xs">
                  <Clock className="h-3.5 w-3.5 text-blue-400" /> {article.readTime} read
                </span>
                <span>•</span>
                <span>Published {article.publishedDate}</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-black leading-tight text-white drop-shadow-md">
                {article.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Medically Reviewed Doctor Byline */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="h-14 w-14 rounded-2xl object-cover border-2 border-blue-100 dark:border-blue-900 shrink-0"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  {article.author.name}
                </h4>
                <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {article.author.role} {article.author.hospital ? `• ${article.author.hospital}` : ""}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Medically Reviewed & Verified
                </span>
                {article.author.experience && (
                  <span className="text-[10px] text-slate-400 font-bold hidden sm:inline">
                    {article.author.experience}
                  </span>
                )}
              </div>
            </div>
          </div>

          {article.author.doctorId && (
            <Button asChild size="sm" className="rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-10 px-5 shadow-sm shadow-blue-600/20 shrink-0">
              <Link to="/patient/doctor/$doctorId" params={{ doctorId: article.author.doctorId }}>
                <Stethoscope className="h-3.5 w-3.5 mr-1.5" /> View Doctor Profile
              </Link>
            </Button>
          )}
        </div>

        {/* Key Takeaways Highlight Box */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50/60 dark:from-slate-900 dark:to-slate-850 rounded-3xl p-6 border border-blue-100 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-blue-900 dark:text-blue-300">
            <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <h3 className="text-xs font-black uppercase tracking-wider">Key Clinical Takeaways</h3>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
            {article.keyTakeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5 bg-white/80 dark:bg-slate-800/80 p-3 rounded-2xl border border-blue-100/50 dark:border-slate-700">
                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Clinical Overview Sections */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
          {article.sections.map((section, idx) => (
            <section key={idx} className="space-y-3">
              {section.heading && (
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug pt-2 border-t border-slate-100 dark:border-slate-800 first:border-none first:pt-0">
                  {section.heading}
                </h2>
              )}

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                {section.paragraph}
              </p>

              {section.bullets && section.bullets.length > 0 && (
                <ul className="space-y-2 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                  {section.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.tip && (
                <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 p-4 rounded-2xl text-xs text-amber-950 dark:text-amber-200 flex items-start gap-3 leading-relaxed font-medium">
                  <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-900 dark:text-amber-300 block mb-0.5 font-black">Doctor's Clinical Note:</strong>
                    {section.tip}
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Featured Superfoods / Nutrients Breakdown Cards with Images */}
        {article.featuredItems && article.featuredItems.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <Utensils className="h-4 w-4 text-blue-600" /> Evidence-Based Items & Clinical Dosages
                </h3>
                <p className="text-xs text-slate-400">Nutrient compounds, mechanisms, and best times to consume</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {article.featuredItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3 }}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="h-40 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute bottom-2 left-2 text-[10px] font-black px-2.5 py-1 rounded-lg bg-black/70 text-white backdrop-blur-xs">
                        {item.compound}
                      </span>
                    </div>

                    <h4 className="text-sm font-black text-slate-900 dark:text-white">
                      {item.name}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="space-y-1.5 pt-1">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Clinical Benefits:</p>
                      {item.benefits.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                          <CheckCircle2 className="h-3 w-3 shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                      <span className="font-bold">⏰ Best Time:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{item.bestTime}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                      <span className="font-bold">💊 Dosage:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{item.dosage}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/60 text-[11px] text-blue-900 dark:text-blue-200">
                      <strong>🇮🇳 Indian Substitute:</strong> {item.indianAlternatives}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Dietary Alternatives & Indian Food Substitutes Table */}
        {article.foodAlternatives && article.foodAlternatives.length > 0 && (
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Award className="h-4 w-4 text-emerald-600" /> Budget-Friendly Indian Dietary Alternatives
              </h3>
              <p className="text-xs text-slate-400">Save money with native whole foods delivering equal or superior clinical nutrition</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">Expensive Food</th>
                    <th className="py-2.5 px-3">Indian Substitute</th>
                    <th className="py-2.5 px-3">Clinical Mechanism</th>
                    <th className="py-2.5 px-3">Cost Savings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {article.foodAlternatives.map((alt, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-700 dark:text-slate-300">{alt.expensiveFood}</td>
                      <td className="py-3 px-3 font-extrabold text-blue-600 dark:text-blue-400">{alt.indianSubstitute}</td>
                      <td className="py-3 px-3 text-slate-500 dark:text-slate-400">{alt.keyBenefit}</td>
                      <td className="py-3 px-3 font-bold text-emerald-600 dark:text-emerald-400">{alt.costComparison}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Doctor's Daily Nutrition Protocol Timeline */}
        {article.dailyProtocol && article.dailyProtocol.length > 0 && (
          <section className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 border border-slate-800 shadow-md space-y-4">
            <div className="flex items-center gap-2 text-blue-400">
              <Clock className="h-4 w-4" />
              <h3 className="text-xs font-black uppercase tracking-wider text-white">Doctor's 24-Hour Wellness Timeline</h3>
            </div>

            <div className="space-y-3 pt-2">
              {article.dailyProtocol.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3.5 bg-slate-850/80 p-3.5 rounded-2xl border border-slate-750">
                  <span className="text-[11px] font-black px-2.5 py-1 rounded-lg bg-blue-600 text-white shrink-0">
                    {step.time}
                  </span>
                  <div>
                    <h5 className="font-bold text-xs text-white leading-tight">{step.action}</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">{step.benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Frequently Asked Questions (FAQs) Accordion */}
        {article.faqs && article.faqs.length > 0 && (
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="h-4 w-4 text-blue-600" />
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Frequently Asked Patient Questions
              </h3>
            </div>

            <div className="space-y-2">
              {article.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-xs text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${expandedFaq === i ? "rotate-180 text-blue-600" : ""}`} />
                  </button>
                  {expandedFaq === i && (
                    <div className="p-4 pt-0 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Doctor Consultation CTA Card */}
        {article.author.doctorId && (
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-600/25 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-black text-lg text-white">Have specific medical questions?</h3>
              <p className="text-xs text-blue-100">
                Book an in-clinic appointment or instant video consultation directly with {article.author.name}.
              </p>
            </div>

            <Button asChild className="w-full sm:w-auto h-12 rounded-2xl bg-white text-blue-800 hover:bg-blue-50 font-black text-xs px-6 shrink-0 shadow-lg">
              <Link to="/booking/$doctorId" params={{ doctorId: article.author.doctorId }}>
                Book Appointment Now <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        )}

        {/* Tags & Was This Helpful? */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Related Medical Topics</p>
            <div className="flex flex-wrap gap-1.5">
              {article.tags.map((tag, idx) => (
                <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Was this medical article helpful?</span>
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl border text-xs font-bold transition-all ${
                hasLiked 
                  ? "bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950 dark:border-rose-900" 
                  : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100"
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${hasLiked ? "fill-rose-600 text-rose-600" : ""}`} />
              <span>{likesCount} Helpful</span>
            </button>
          </div>
        </div>

        {/* Related Articles Carousel */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">More Doctor Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                to="/patient/articles/$articleId"
                params={{ articleId: rel.id }}
                className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-blue-300 dark:hover:border-blue-700 transition-all flex flex-col justify-between group h-full"
              >
                <div className="space-y-2.5">
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="h-28 w-full rounded-2xl object-cover"
                    loading="lazy"
                  />
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    {rel.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {rel.title}
                  </h4>
                </div>
                <span className="text-[10px] text-slate-400 pt-2 block">{rel.readTime} read</span>
              </Link>
            ))}
          </div>
        </div>

      </main>

      {/* Floating Bottom Consultation Bar */}
      {article.author.doctorId && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 border-t border-slate-200 dark:border-slate-800 p-3 sm:p-4 backdrop-blur-md">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="h-9 w-9 rounded-xl object-cover border border-blue-200 shrink-0"
              />
              <div className="truncate">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{article.author.name}</p>
                <p className="text-[10px] text-emerald-600 font-semibold truncate">Available for consultation</p>
              </div>
            </div>

            <Button asChild size="sm" className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-10 px-5 shadow-md shadow-blue-600/20 shrink-0">
              <Link to="/booking/$doctorId" params={{ doctorId: article.author.doctorId }}>
                Consult Doctor
              </Link>
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}
