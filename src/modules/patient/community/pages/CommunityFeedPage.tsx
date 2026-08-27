import { useState, useMemo, useEffect } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { 
  ArrowLeft, MessageSquarePlus, Heart, Share2, CheckCircle2, 
  MessageSquare, Sparkles, X, Filter, Send, ThumbsUp, Eye, User,
  BookOpen, Bookmark, Clock, PenTool, Stethoscope, ChevronRight,
  ShieldCheck, Search, Plus, Check, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { COMMUNITY_QUESTIONS, type CommunityQuestion } from "@/shared/data/superapp-mock";
import { 
  getStoredArticles, 
  publishNewArticle, 
  type HealthArticle, 
  type ArticleCategory 
} from "@/shared/data/articles-data";
import { useAuth } from "@/shared/auth/useAuth";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const ARTICLE_CATEGORIES: { id: string; label: string; icon: string }[] = [
  { id: "All", label: "All Articles", icon: "✨" },
  { id: "Heart Health", label: "Heart & Cardio", icon: "🫀" },
  { id: "Nutrition", label: "10 Foods & Nutrition", icon: "🥗" },
  { id: "Diabetes", label: "Diabetes & Sugar", icon: "🩸" },
  { id: "Women's Health", label: "Women's Health", icon: "🌸" },
  { id: "Pediatrics", label: "Child Care & Fevers", icon: "👶" },
  { id: "Skin & Dermatology", label: "Skin & Hair", icon: "✨" },
  { id: "Gut & Digestion", label: "Gut & Acidity", icon: "🩺" },
  { id: "Joints & Orthopedics", label: "Bones & Joints", icon: "🦴" },
  { id: "Mental Health", label: "Mental Wellness", icon: "🧠" },
];

const QA_CATEGORIES = ["All", "Trending", "Women's Health", "Skin", "Pediatrics", "Cardiology", "Digestion"];

export function CommunityFeedPage() {
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();
  const isDoctor = isLoggedIn && user?.role === "doctor";
  
  // Tab Mode: "articles" (Doctor Articles & Blogs) vs "qa" (Community Q&A)
  const [activeTab, setActiveTab] = useState<"articles" | "qa">("articles");
  
  // Article State
  const [articles, setArticles] = useState<HealthArticle[]>([]);
  const [selectedArticleCategory, setSelectedArticleCategory] = useState<string>("All");
  const [selectedDoctorFilter, setSelectedDoctorFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);
  const [likedArticles, setLikedArticles] = useState<string[]>([]);
  
  // Doctor Publish Article Modal State
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [publishForm, setPublishForm] = useState({
    title: "",
    category: "Nutrition" as ArticleCategory,
    readTime: "5 min",
    doctorName: "Dr. Rajesh Sharma",
    doctorRole: "Senior Cardiologist",
    doctorAvatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80",
    image: "/specialities/heart_specialist.svg",
    summary: "",
    keyTakeaway1: "",
    keyTakeaway2: "",
    paragraph1: "",
  });

  // Community Q&A State
  const [selectedQACategory, setSelectedQACategory] = useState("All");
  const [questions, setQuestions] = useState<CommunityQuestion[]>(COMMUNITY_QUESTIONS);
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newQuestionCategory, setNewQuestionCategory] = useState("General");
  const [likedQuestions, setLikedQuestions] = useState<string[]>([]);

  // Load articles on mount
  useEffect(() => {
    setArticles(getStoredArticles());
  }, []);

  // Handle Article Like
  const handleLikeArticle = (id: string) => {
    if (likedArticles.includes(id)) {
      setLikedArticles((prev) => prev.filter((i) => i !== id));
      setArticles((prev) =>
        prev.map((a) => (a.id === id ? { ...a, likes: a.likes - 1 } : a))
      );
    } else {
      setLikedArticles((prev) => [...prev, id]);
      setArticles((prev) =>
        prev.map((a) => (a.id === id ? { ...a, likes: a.likes + 1 } : a))
      );
      toast.success("Article liked!");
    }
  };

  // Handle Article Bookmark
  const handleBookmarkArticle = (id: string) => {
    if (bookmarkedArticles.includes(id)) {
      setBookmarkedArticles((prev) => prev.filter((i) => i !== id));
      toast.info("Removed from bookmarks");
    } else {
      setBookmarkedArticles((prev) => [...prev, id]);
      toast.success("Saved to reading list");
    }
  };

  // Handle Question Like
  const handleLikeQuestion = (id: string) => {
    if (likedQuestions.includes(id)) {
      setLikedQuestions((prev) => prev.filter((item) => item !== id));
      setQuestions((prev) =>
        prev.map((q) => (q.id === id ? { ...q, likesCount: q.likesCount - 1 } : q))
      );
    } else {
      setLikedQuestions((prev) => [...prev, id]);
      setQuestions((prev) =>
        prev.map((q) => (q.id === id ? { ...q, likesCount: q.likesCount + 1 } : q))
      );
      toast.success("Helpful vote recorded!");
    }
  };

  // Handle Publish New Article by Doctor
  const handlePublishArticleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!publishForm.title.trim() || !publishForm.summary.trim()) {
      toast.error("Please fill in article title and summary");
      return;
    }

    const created = publishNewArticle({
      title: publishForm.title.trim(),
      summary: publishForm.summary.trim(),
      category: publishForm.category,
      readTime: publishForm.readTime || "5 min",
      image: publishForm.image || "/specialities/general_physician.jpg",
      author: {
        name: publishForm.doctorName,
        role: publishForm.doctorRole,
        avatar: publishForm.doctorAvatar,
        verified: true,
      },
      keyTakeaways: [
        publishForm.keyTakeaway1 || "Evidence-based medical advice from verified healthcare specialist.",
        publishForm.keyTakeaway2 || "Consult your physician before starting any significant dietary change.",
      ].filter(Boolean),
      sections: [
        {
          heading: "Clinical Insight & Recommendations",
          paragraph: publishForm.paragraph1 || publishForm.summary,
        },
      ],
      tags: [publishForm.category, "Health Tips", "Doctor Verified"],
    });

    setArticles([created, ...articles]);
    setIsPublishModalOpen(false);
    toast.success("Doctor Health Article successfully published to Medyora Feed! 🎉");
    setPublishForm({
      title: "",
      category: "Nutrition",
      readTime: "5 min",
      doctorName: "Dr. Rajesh Sharma",
      doctorRole: "Senior Cardiologist",
      doctorAvatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80",
      image: "/specialities/heart_specialist.svg",
      summary: "",
      keyTakeaway1: "",
      keyTakeaway2: "",
      paragraph1: "",
    });
  };

  // Handle Post Community Question
  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newQ: CommunityQuestion = {
      id: `q-${Date.now()}`,
      category: newQuestionCategory,
      question: newQuestionText.trim(),
      askedBy: "Ritik (You)",
      askedTime: "Just now",
      viewsCount: 1,
      likesCount: 0,
      commentsCount: 0,
      isAnswered: true,
      doctorAnswer: {
        doctorName: "Dr. Rajesh Sharma",
        speciality: "Senior Medical Consultant",
        avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80",
        verified: true,
        answerText:
          "Thank you for your question. Based on the symptoms described, maintain optimal hydration and consult a certified specialist if symptoms persist.",
        answeredAt: "Just now",
      },
    };

    setQuestions([newQ, ...questions]);
    setNewQuestionText("");
    setIsAskModalOpen(false);
    toast.success("Question posted! A verified doctor replied to your query.");
  };

  // Filtered Articles
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      if (selectedArticleCategory !== "All" && art.category !== selectedArticleCategory) {
        return false;
      }
      if (selectedDoctorFilter !== "All" && art.author.name !== selectedDoctorFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          art.title.toLowerCase().includes(q) ||
          art.summary.toLowerCase().includes(q) ||
          art.author.name.toLowerCase().includes(q) ||
          art.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [articles, selectedArticleCategory, selectedDoctorFilter, searchQuery]);

  // Unique list of authors for doctor filter
  const uniqueAuthors = useMemo(() => {
    const map = new Map<string, typeof articles[0]["author"]>();
    articles.forEach((a) => {
      if (!map.has(a.author.name)) {
        map.set(a.author.name, a.author);
      }
    });
    return Array.from(map.values());
  }, [articles]);

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return selectedQACategory === "All"
      ? questions
      : questions.filter((q) => q.category.toLowerCase().includes(selectedQACategory.toLowerCase()));
  }, [questions, selectedQACategory]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-24 font-sans transition-colors">
      
      {/* ================= STICKY HEADER ================= */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 pt-4 pb-3 border-b border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.history.back()}
              className="h-10 w-10 shrink-0 rounded-full border border-slate-200 dark:border-slate-800"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5 text-slate-700 dark:text-slate-300" />
            </Button>
            <div>
              <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                Medyora Health Feed <Sparkles className="h-4 w-4 text-blue-600 animate-pulse" />
              </h1>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Doctor-authored medical articles, health blogs & verified patient community
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === "articles" ? (
              isDoctor && (
                <Button
                  onClick={() => setIsPublishModalOpen(true)}
                  size="sm"
                  className="h-9 px-3 sm:px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center gap-1.5"
                >
                  <PenTool className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Doctor Publish Article</span>
                  <span className="sm:hidden">Write</span>
                </Button>
              )
            ) : (
              <Button
                onClick={() => setIsAskModalOpen(true)}
                size="sm"
                className="h-9 px-3 sm:px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center gap-1.5"
              >
                <MessageSquarePlus className="h-3.5 w-3.5" />
                <span>Ask Doctor</span>
              </Button>
            )}
          </div>
        </div>

        {/* Dual Mode Switcher: Health Articles vs Community Q&A */}
        <div className="p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center gap-1">
          <button
            onClick={() => setActiveTab("articles")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === "articles"
                ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Health Articles & Blogs ({articles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("qa")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === "qa"
                ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Patient Q&A Community</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        {activeTab === "articles" ? (
          <div className="space-y-2 pt-1">
            {/* Search Input for Articles */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input
                placeholder="Search articles (e.g., 10 foods, heart superfoods, micronutrients, PCOS)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-xs placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Horizontal Scrolling Category Pills */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {ARTICLE_CATEGORIES.map((cat) => {
                const isSelected = selectedArticleCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedArticleCategory(cat.id)}
                    className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 hover:bg-slate-200"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex gap-2 overflow-x-auto no-scrollbar pt-1">
            {QA_CATEGORIES.map((cat) => {
              const isSelected = selectedQACategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedQACategory(cat)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* ================= MAIN FEED CONTENT ================= */}
      <main className="p-4 space-y-5 max-w-2xl mx-auto w-full">
        
        {/* VIEW 1: HEALTH ARTICLES (DOCTOR AUTHORED) */}
        {activeTab === "articles" && (
          <div className="space-y-4">
            
            {/* Filter by Doctor Carousel */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Stethoscope className="h-3.5 w-3.5 text-blue-600" /> Browse by Author Doctor
                </span>
                {selectedDoctorFilter !== "All" && (
                  <button
                    onClick={() => setSelectedDoctorFilter("All")}
                    className="text-[10px] font-bold text-blue-600 hover:underline"
                  >
                    Show All Doctors
                  </button>
                )}
              </div>

              <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
                <button
                  onClick={() => setSelectedDoctorFilter("All")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 border transition-all ${
                    selectedDoctorFilter === "All"
                      ? "bg-blue-50 dark:bg-blue-950/50 border-blue-600 text-blue-600 dark:text-blue-400 shadow-xs"
                      : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <Award className="h-4 w-4 text-blue-600" />
                  <span>All Doctors</span>
                </button>

                {uniqueAuthors.map((author, idx) => {
                  const isSelected = selectedDoctorFilter === author.name;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedDoctorFilter(author.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 border transition-all ${
                        isSelected
                          ? "bg-blue-50 dark:bg-blue-950/50 border-blue-600 text-blue-600 dark:text-blue-400 shadow-xs"
                          : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <img
                        src={author.avatar}
                        alt={author.name}
                        className="h-5 w-5 rounded-full object-cover border border-slate-200"
                      />
                      <span>{author.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Articles List */}
            {filteredArticles.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
                <BookOpen className="h-12 w-12 text-slate-300 mx-auto" />
                <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300">
                  No articles found matching "{searchQuery}"
                </h3>
                <p className="text-xs text-slate-400">
                  Try searching for "10 foods", "micronutrients", or select another category.
                </p>
                <Button
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedArticleCategory("All");
                    setSelectedDoctorFilter("All");
                  }}
                  className="rounded-xl"
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              filteredArticles.map((article) => {
                const isLiked = likedArticles.includes(article.id);
                const isBookmarked = bookmarkedArticles.includes(article.id);

                return (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all space-y-4"
                  >
                    {/* Top Doctor Author Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={article.author.avatar}
                          alt={article.author.name}
                          className="h-10 w-10 rounded-2xl object-cover border-2 border-blue-100 dark:border-slate-700 shadow-xs"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-black text-xs sm:text-sm text-slate-900 dark:text-white">
                              {article.author.name}
                            </span>
                            {article.author.verified !== false && (
                              <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0" title="Verified Medical Doctor" />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium">
                            {article.author.role}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                          {article.category}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 justify-end">
                          <Clock className="h-3 w-3" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Article Media & Title */}
                    <Link
                      to="/patient/articles/$articleId"
                      params={{ articleId: article.id }}
                      className="block group space-y-2.5"
                    >
                      {/* Image Frame */}
                      <div className="h-44 sm:h-52 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                        <span className="absolute bottom-3 left-3 text-[11px] font-bold text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                          Published: {article.publishedDate}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors leading-snug">
                        {article.title}
                      </h2>

                      {/* Summary */}
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                        {article.summary}
                      </p>
                    </Link>

                    {/* Key Takeaways Box */}
                    {article.keyTakeaways && article.keyTakeaways.length > 0 && (
                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
                        <span className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                          💡 Key Medical Takeaways
                        </span>
                        <ul className="space-y-1">
                          {article.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                            <li key={idx} className="text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                              <span className="text-blue-600 font-bold">•</span>
                              <span className="line-clamp-1">{takeaway}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Footer Actions: Read Full Article CTA + Book Doctor Button */}
                    <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 gap-2">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          asChild
                          className="h-8 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                        >
                          <Link to="/patient/articles/$articleId" params={{ articleId: article.id }}>
                            Read Full Article <ChevronRight className="h-3.5 w-3.5 ml-1" />
                          </Link>
                        </Button>

                        {article.author.doctorId && (
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                            className="h-8 px-3 rounded-xl text-xs font-bold border-slate-200 dark:border-slate-700"
                          >
                            <Link to="/patient/consult">
                              <Stethoscope className="h-3 w-3 mr-1 text-emerald-600" />
                              <span>Consult Doctor</span>
                            </Link>
                          </Button>
                        )}
                      </div>

                      {/* Like, Bookmark & Share Buttons */}
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <button
                          onClick={() => handleLikeArticle(article.id)}
                          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                            isLiked
                              ? "bg-rose-50 dark:bg-rose-950/40 text-rose-600"
                              : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                          }`}
                          title="Like Article"
                        >
                          <Heart className={`h-4 w-4 ${isLiked ? "fill-rose-600 text-rose-600" : ""}`} />
                          <span>{article.likes}</span>
                        </button>

                        <button
                          onClick={() => handleBookmarkArticle(article.id)}
                          className={`p-2 rounded-xl transition-colors ${
                            isBookmarked
                              ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600"
                              : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                          }`}
                          title="Bookmark"
                        >
                          <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-blue-600 text-blue-600" : ""}`} />
                        </button>

                        <button
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                title: article.title,
                                text: article.summary,
                                url: window.location.href,
                              });
                            } else {
                              navigator.clipboard.writeText(window.location.href);
                              toast.success("Article link copied to clipboard!");
                            }
                          }}
                          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                          title="Share Article"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                );
              })
            )}
          </div>
        )}

        {/* VIEW 2: COMMUNITY Q&A */}
        {activeTab === "qa" && (
          <div className="space-y-4">
            {filteredQuestions.map((q) => {
              const isLiked = likedQuestions.includes(q.id);
              return (
                <div
                  key={q.id}
                  className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs space-y-3"
                >
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                    {q.question}
                  </h3>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="font-medium">Asked by {q.askedBy}</span>
                    <span>•</span>
                    <span>{q.askedTime}</span>
                  </div>

                  {/* Doctor Verified Answer */}
                  {q.doctorAnswer && (
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={q.doctorAnswer.avatar}
                            alt={q.doctorAnswer.doctorName}
                            className="h-9 w-9 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
                                {q.doctorAnswer.doctorName}
                              </span>
                              {q.doctorAnswer.verified && (
                                <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400">
                              {q.doctorAnswer.speciality}
                            </span>
                          </div>
                        </div>

                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full">
                          Doctor Answered
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-100/60 dark:border-slate-700/50">
                        {q.doctorAnswer.answerText}
                      </p>
                    </div>
                  )}

                  {/* Bottom Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-50 dark:border-slate-800/80 text-[11px] text-slate-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" /> {q.viewsCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3.5 w-3.5" /> {q.commentsCount}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleLikeQuestion(q.id)}
                        className={`flex items-center gap-1 font-bold ${
                          isLiked ? "text-rose-600" : "text-slate-500 hover:text-slate-700"
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${isLiked ? "fill-rose-600 text-rose-600" : ""}`} />
                        <span>{q.likesCount}</span>
                      </button>

                      <button
                        onClick={() => toast.success("Question link copied!")}
                        className="p-1 text-slate-400 hover:text-slate-600"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* ================= DOCTOR PUBLISH ARTICLE MODAL ================= */}
      <AnimatePresence>
        {isPublishModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-[32px] p-6 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                    <PenTool className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      Publish Doctor Health Article
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Share verified medical advice with over 100,000+ patients
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsPublishModalOpen(false)} className="p-1 text-slate-400">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handlePublishArticleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Article Title (e.g., 10 Superfoods for Better Heart, 10 Essential Micronutrients)
                  </label>
                  <Input
                    value={publishForm.title}
                    onChange={(e) => setPublishForm({ ...publishForm, title: e.target.value })}
                    placeholder="Example: 10 Foods for Better Heart Health & Lowering Triglycerides..."
                    className="rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Category
                    </label>
                    <select
                      value={publishForm.category}
                      onChange={(e) => setPublishForm({ ...publishForm, category: e.target.value as any })}
                      className="w-full h-10 px-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200"
                    >
                      <option value="Nutrition">10 Foods & Nutrition</option>
                      <option value="Heart Health">Heart Health & Cardiology</option>
                      <option value="Diabetes">Diabetes & Metabolism</option>
                      <option value="Women's Health">Women's Health & PCOS</option>
                      <option value="Pediatrics">Pediatrics & Child Care</option>
                      <option value="Skin & Dermatology">Skin & Dermatology</option>
                      <option value="Gut & Digestion">Gut Health & Digestion</option>
                      <option value="Joints & Orthopedics">Joints & Orthopedics</option>
                      <option value="Mental Health">Mental Wellness</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Estimated Read Time
                    </label>
                    <Input
                      value={publishForm.readTime}
                      onChange={(e) => setPublishForm({ ...publishForm, readTime: e.target.value })}
                      placeholder="e.g. 5 min read"
                      className="rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Article Summary / Lead Paragraph
                  </label>
                  <Textarea
                    rows={3}
                    value={publishForm.summary}
                    onChange={(e) => setPublishForm({ ...publishForm, summary: e.target.value })}
                    placeholder="Brief 2-3 line overview of why this article matters and what patients will learn..."
                    className="rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Key Medical Takeaways (Bullet Points)
                  </label>
                  <Input
                    value={publishForm.keyTakeaway1}
                    onChange={(e) => setPublishForm({ ...publishForm, keyTakeaway1: e.target.value })}
                    placeholder="Takeaway 1: Focus on soluble fiber and anti-inflammatory spices..."
                    className="rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs"
                  />
                  <Input
                    value={publishForm.keyTakeaway2}
                    onChange={(e) => setPublishForm({ ...publishForm, keyTakeaway2: e.target.value })}
                    placeholder="Takeaway 2: Maintain 30 minutes of moderate aerobic activity daily..."
                    className="rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Detailed Clinical Advice
                  </label>
                  <Textarea
                    rows={4}
                    value={publishForm.paragraph1}
                    onChange={(e) => setPublishForm({ ...publishForm, paragraph1: e.target.value })}
                    placeholder="Write detailed medical explanation, food recommendations, dosages, warnings..."
                    className="rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-lg shadow-blue-600/30"
                >
                  Publish Article to Medyora Health Feed
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= ASK QUESTION MODAL ================= */}
      <AnimatePresence>
        {isAskModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-[32px] sm:rounded-[32px] p-5 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Ask a Free Medical Question
                </h3>
                <button onClick={() => setIsAskModalOpen(false)} className="p-1 text-slate-400">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handlePostQuestion} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Your Health Query
                  </label>
                  <Textarea
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    placeholder="Describe your symptoms, duration, and any existing conditions in detail..."
                    className="rounded-2xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-xs min-h-[100px]"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Category
                  </label>
                  <select
                    value={newQuestionCategory}
                    onChange={(e) => setNewQuestionCategory(e.target.value)}
                    className="w-full h-11 px-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200"
                  >
                    <option value="General">General Physician</option>
                    <option value="Skin">Skin & Dermatology</option>
                    <option value="Women's Health">Women's Health / OB-GYN</option>
                    <option value="Pediatrics">Child Health / Pediatrics</option>
                    <option value="Cardiology">Heart / Cardiology</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/30"
                >
                  Post Question for Free
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
