import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { 
  Sparkles, Bot, Send, Mic, MicOff, X, User, Stethoscope, 
  AlertTriangle, ArrowRight, RefreshCw, Volume2, VolumeX, ShieldCheck, 
  HeartPulse, FileText, Image as ImageIcon, Upload, Activity, 
  Pill, AlertCircle, CheckCircle2, ChevronRight, Phone, MapPin, 
  Maximize2, Minimize2, History, Search, Trash2, Calendar, 
  Flame, Plus, ExternalLink, Dumbbell, Apple, Clock, Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { 
  analyzeSymptoms, 
  analyzeMedicalImage, 
  analyzeLabReport, 
  analyzePrescription, 
  analyzeMedicineSafety, 
  calculateHealthScore,
  loadSavedSessions,
  saveSessions,
  type ChatMessage,
  type ConversationSession,
  type ImageAnalysisResult,
  type LabReportAnalysisResult,
  type ParsedPrescription,
  type MedicineAnalysisResult,
  type HealthScoreAssessment,
  AI_FOLLOW_UP_TEMPLATES
} from "../services/care-ai-engine";
import { DOCTORS } from "@/shared/data/mock";
import { useAuth } from "@/shared/auth/useAuth";

type ActiveViewMode = "chat" | "symptom_checker" | "image_analyzer" | "lab_analyzer" | "prescription_reader" | "health_score" | "emergency_sos";

export function GlobalAICopilot() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAuthOrOnboarding = pathname === "/" || pathname.startsWith("/auth");
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveViewMode>("chat");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historySearch, setHistorySearch] = useState("");
  
  // Audio Speech Synthesis / Recognition State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Chat State
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessions, setSessions] = useState<ConversationSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  // Specialized Tool Forms State
  const [symptomInput, setSymptomInput] = useState("");
  const [selectedCity, setSelectedCity] = useState("Bangalore");
  const [imageCategory, setImageCategory] = useState<ImageAnalysisResult["imageType"]>("xray");
  const [labReportType, setLabReportType] = useState<"cbc" | "lipid" | "thyroid" | "diabetes" | "lft">("lipid");
  const [medicineSearchInput, setMedicineSearchInput] = useState("Augmentin 625");
  
  // Health Score Inputs
  const [healthInputs, setHealthInputs] = useState({
    age: 28,
    gender: "male" as "male" | "female" | "other",
    weightKg: 72,
    heightCm: 175,
    systolicBp: 122,
    diastolicBp: 78,
    fastingSugar: 98,
    dailySteps: 7500,
    sleepHours: 7,
    smokingStatus: false,
  });
  const [healthScoreResult, setHealthScoreResult] = useState<HealthScoreAssessment | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize Speech & Sessions
  useEffect(() => {
    // Check Speech Recognition support
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      setSpeechSupported(true);
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = "en-IN";
      recog.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        handleSendMessage(transcript);
      };
      recog.onerror = () => setIsListening(false);
      recog.onend = () => setIsListening(false);
      recognitionRef.current = recog;
    }

    // Load saved sessions from storage
    const saved = loadSavedSessions();
    const firstSaved = saved[0];
    if (firstSaved) {
      setSessions(saved);
      setCurrentSessionId(firstSaved.id);
      setMessages(firstSaved.messages);
    } else {
      startNewSession();
    }

    // Listen to global open event
    const handleGlobalOpen = (e: any) => {
      setIsOpen(true);
      if (e.detail?.mode) setActiveTab(e.detail.mode);
      if (e.detail?.query) {
        setTimeout(() => handleSendMessage(e.detail.query), 300);
      }
    };
    window.addEventListener("open-care-ai", handleGlobalOpen);

    // Keyboard shortcut (⌘+K / Ctrl+K / Alt+A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-care-ai", handleGlobalOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Sync session changes
  useEffect(() => {
    if (!currentSessionId || messages.length === 0) return;
    const updated = sessions.map((s) => {
      if (s.id === currentSessionId) {
        return {
          ...s,
          updatedAt: new Date().toISOString(),
          preview: messages[messages.length - 1]?.text.slice(0, 60) || "Conversation",
          messages,
        };
      }
      return s;
    });
    setSessions(updated);
    saveSessions(updated);
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isTyping, isOpen, activeTab]);

  const startNewSession = () => {
    const newId = `session-${Date.now()}`;
    const initialWelcomeMsg: ChatMessage = {
      id: "welcome-msg",
      sender: "ai",
      text: "👋 Hello! I am your Medyora AI Healthcare Copilot. I can analyze symptoms, interpret X-rays and scans, explain blood test reports, review prescriptions, and find the best verified doctors near you.",
      timestamp: "Just now",
      actionLinks: [
        { label: "🩺 Check Symptoms", to: "#", variant: "default" },
        { label: "📸 Analyze Scan / X-Ray", to: "#", variant: "outline" },
        { label: "📑 Check Lab Report", to: "#", variant: "outline" },
        { label: "💊 Scan Prescription", to: "#", variant: "outline" },
      ],
    };

    const newSession: ConversationSession = {
      id: newId,
      title: "New Health Consultation",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      preview: "New consultation started",
      messages: [initialWelcomeMsg],
    };

    const updated = [newSession, ...sessions];
    setSessions(updated);
    setCurrentSessionId(newId);
    setMessages([initialWelcomeMsg]);
    saveSessions(updated);
  };

  const switchSession = (sessionId: string) => {
    const target = sessions.find((s) => s.id === sessionId);
    if (target) {
      setCurrentSessionId(target.id);
      setMessages(target.messages);
      setIsHistoryOpen(false);
    }
  };

  const deleteSession = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    const filtered = sessions.filter((s) => s.id !== sessionId);
    setSessions(filtered);
    saveSessions(filtered);
    if (currentSessionId === sessionId) {
      const firstFiltered = filtered[0];
      if (firstFiltered) {
        setCurrentSessionId(firstFiltered.id);
        setMessages(firstFiltered.messages);
      } else {
        startNewSession();
      }
    }
    toast.success("Session deleted");
  };

  // Voice Interaction
  const toggleSpeechRecognition = () => {
    if (!speechSupported || !recognitionRef.current) {
      toast.error("Voice input is not supported in this browser. Please type your query.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      try {
        recognitionRef.current.start();
      } catch {
        setIsListening(false);
      }
    }
  };

  const speakText = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const cleanText = text.replace(/[#*⚠️🚨📸💊📑🩺]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Main Message Handler with Realistic Triage Engine
  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // AI Reasoning Dispatch
    setTimeout(() => {
      const triage = analyzeSymptoms(query, selectedCity);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: triage.explanation,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "symptom_checker",
        severity: triage.severity,
        confidence: triage.confidence,
        possibleConditions: triage.possibleConditions,
        emergencyAlert: triage.emergencyAlert,
        recommendedSpecialty: triage.recommendedSpecialty,
        suggestedTests: triage.suggestedTests,
        followUpQuestions: triage.followUpQuestions,
        recommendedDoctors: triage.recommendedDoctors,
        actionLinks: triage.actionLinks,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);

      // Auto title session based on first user query
      setSessions((prev) =>
        prev.map((s) => {
          if (s.id === currentSessionId && s.title === "New Health Consultation") {
            return { ...s, title: query.slice(0, 28) };
          }
          return s;
        })
      );
    }, 900);
  };

  // Action Dispatcher for Specialized Tools
  const runImageAnalyzer = (type: ImageAnalysisResult["imageType"]) => {
    setIsTyping(true);
    setTimeout(() => {
      const result = analyzeMedicalImage(type, `${type}_scan.png`, selectedCity);
      const aiMsg: ChatMessage = {
        id: `ai-img-${Date.now()}`,
        sender: "ai",
        text: `📸 AI Medical Scan Analysis Complete (${type.toUpperCase()}): ${result.simpleExplanation}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "image_analysis",
        imageAnalysis: result,
        severity: result.severity,
        confidence: result.confidence,
        possibleConditions: result.possibleConditions,
        recommendedSpecialty: result.recommendedSpecialty,
        suggestedTests: result.suggestedTests,
        recommendedDoctors: result.recommendedDoctors,
        actionLinks: [
          { label: `Book Top ${result.recommendedSpecialty}`, to: `/doctors?q=${result.recommendedSpecialty}`, variant: "default" },
          { label: "Book Confirmatory Test", to: "/patient/lab-tests", variant: "outline" },
        ],
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      setActiveTab("chat");
      toast.success("Medical image analyzed successfully");
    }, 1200);
  };

  const runLabAnalyzer = (type: "cbc" | "lipid" | "thyroid" | "diabetes" | "lft") => {
    setIsTyping(true);
    setTimeout(() => {
      const result = analyzeLabReport(type, selectedCity);
      const aiMsg: ChatMessage = {
        id: `ai-lab-${Date.now()}`,
        sender: "ai",
        text: `📑 Lab Report Analysis (${result.reportTitle}): ${result.overallSummary}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "lab_report",
        labAnalysis: result,
        recommendedSpecialty: result.recommendedSpecialist,
        suggestedTests: result.recommendedNextTests,
        recommendedDoctors: result.recommendedDoctors,
        actionLinks: [
          { label: `Consult ${result.recommendedSpecialist}`, to: `/doctors?q=${result.recommendedSpecialist}`, variant: "default" },
          { label: "Book Recommended Tests", to: "/patient/lab-tests", variant: "outline" },
        ],
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      setActiveTab("chat");
      toast.success("Lab report analyzed successfully");
    }, 1200);
  };

  const runPrescriptionReader = () => {
    setIsTyping(true);
    setTimeout(() => {
      const result = analyzePrescription("dr_prescription.jpg");
      const aiMsg: ChatMessage = {
        id: `ai-rx-${Date.now()}`,
        sender: "ai",
        text: `💊 Prescription Extracted Successfully: Prescribed by ${result.doctorName} at ${result.hospitalOrClinic}. 4 Medicines identified with dosage timetables.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "prescription_reader",
        prescriptionAnalysis: result,
        actionLinks: [
          { label: "Order Medicines with 20% OFF", to: "/patient/medicines", variant: "default" },
          { label: "Set Daily Pill Reminders", to: "/patient/prescriptions", variant: "outline" },
        ],
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      setActiveTab("chat");
      toast.success("Prescription scanned & parsed");
    }, 1100);
  };

  const runMedicineScanner = (medName: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const result = analyzeMedicineSafety(medName);
      const aiMsg: ChatMessage = {
        id: `ai-med-${Date.now()}`,
        sender: "ai",
        text: `🔍 Safety & Pharmacology Profile for ${result.medicineName}: ${result.dosageGuidelines}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "medicine_scanner",
        medicineAnalysis: result,
        actionLinks: [
          { label: `Order ${result.medicineName}`, to: "/patient/medicines", variant: "default" },
          { label: "Consult Pharmacist / Doctor", to: "/doctors", variant: "outline" },
        ],
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      setActiveTab("chat");
      toast.success("Medicine safety profile generated");
    }, 1000);
  };

  const runHealthScoreAssessment = () => {
    const result = calculateHealthScore(healthInputs);
    setHealthScoreResult(result);
    toast.success("AI Health Score Calculated!");
  };

  return (
    <>
      {/* ================= 1. GLOBAL FLOATING AI TRIGGER BUTTON (Visible only when logged in and inside main app) ================= */}
      {isLoggedIn && !isAuthOrOnboarding && (
        <div className="fixed bottom-24 md:bottom-6 right-5 z-40 flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setIsOpen(true)}
            className="relative group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-bold text-xs shadow-xl shadow-blue-600/35 border border-white/20 hover:shadow-2xl transition-all"
            aria-label="Open Care AI Copilot"
          >
            {/* Animated Glowing Pulse */}
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
            </span>

            <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-xs">
              <Sparkles className="h-3.5 w-3.5 text-white animate-pulse" />
            </div>
            <span className="hidden sm:inline font-extrabold tracking-wide">Ask Care AI</span>
            <span className="sm:hidden font-extrabold">Care AI</span>
            <span className="bg-white/20 text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
              24/7
            </span>
          </motion.button>
        </div>
      )}

      {/* ================= 2. EXPANDABLE AI HEALTHCARE COPILOT MODAL ================= */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`relative flex flex-col bg-white dark:bg-slate-950 shadow-2xl overflow-hidden ${
                isFullScreen
                  ? "w-full h-full rounded-none"
                  : "w-full sm:max-w-2xl md:max-w-3xl h-[92vh] sm:h-[85vh] sm:rounded-3xl border border-slate-200 dark:border-slate-800"
              }`}
            >
              {/* Top Header Bar */}
              <div className="px-4 sm:px-6 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white flex items-center justify-between shadow-md shrink-0">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center backdrop-blur-md shadow-inner">
                    <Sparkles className="h-5 w-5 text-white animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-extrabold text-sm sm:text-base leading-tight text-white flex items-center gap-1.5">
                        Medyora Care AI
                        <span className="text-[10px] bg-emerald-500 text-white font-black px-2 py-0.5 rounded-full shadow-xs">
                          COPILOT
                        </span>
                      </h2>
                    </div>
                    <p className="text-[11px] text-blue-100 font-medium flex items-center gap-1.5 mt-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      Active 24/7 Clinical Assistant • Location: {selectedCity}
                    </p>
                  </div>
                </div>

                {/* Header Actions */}
                <div className="flex items-center gap-1.5">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                    className="h-8 px-2 text-white hover:bg-white/20 rounded-xl text-xs gap-1.5"
                    title="Conversation History"
                  >
                    <History className="h-4 w-4" />
                    <span className="hidden sm:inline">History</span>
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={startNewSession}
                    className="h-8 px-2 text-white hover:bg-white/20 rounded-xl text-xs gap-1.5"
                    title="New Consultation"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">New</span>
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsFullScreen(!isFullScreen)}
                    className="h-8 w-8 text-white hover:bg-white/20 rounded-xl hidden sm:flex"
                    title={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
                  >
                    {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 text-white hover:bg-white/20 rounded-xl"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Mode Navigation Tabs */}
              <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 overflow-x-auto no-scrollbar shrink-0 text-xs">
                {[
                  { id: "chat", label: "Assistant Chat", icon: Bot },
                  { id: "symptom_checker", label: "Symptom Triage", icon: Activity },
                  { id: "image_analyzer", label: "Scan & X-Ray AI", icon: ImageIcon },
                  { id: "lab_analyzer", label: "Lab Report OCR", icon: FileText },
                  { id: "prescription_reader", label: "Prescription & Meds", icon: Pill },
                  { id: "health_score", label: "Health Score & Risk", icon: Flame },
                  { id: "emergency_sos", label: "Emergency SOS", icon: AlertTriangle, danger: true },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as ActiveViewMode)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                        isActive
                          ? tab.danger
                            ? "bg-rose-600 text-white shadow-xs"
                            : "bg-blue-600 text-white shadow-xs"
                          : tab.danger
                          ? "text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Body Content Area */}
              <div className="relative flex-1 overflow-hidden flex">
                
                {/* Conversation History Drawer */}
                <AnimatePresence>
                  {isHistoryOpen && (
                    <motion.div
                      initial={{ x: -280, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -280, opacity: 0 }}
                      className="absolute inset-y-0 left-0 z-30 w-72 bg-slate-900 text-white p-4 flex flex-col shadow-2xl border-r border-slate-800"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Chat Sessions
                        </h3>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setIsHistoryOpen(false)}
                          className="h-7 w-7 text-slate-400 hover:text-white"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="mt-3 relative">
                        <Search className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                        <Input
                          value={historySearch}
                          onChange={(e) => setHistorySearch(e.target.value)}
                          placeholder="Search consultations..."
                          className="h-8 pl-8 text-xs bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 rounded-xl"
                        />
                      </div>

                      <div className="flex-1 overflow-y-auto mt-3 space-y-1.5 pr-1">
                        {sessions
                          .filter((s) => s.title.toLowerCase().includes(historySearch.toLowerCase()))
                          .map((s) => (
                            <div
                              key={s.id}
                              onClick={() => switchSession(s.id)}
                              className={`group flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                                currentSessionId === s.id
                                  ? "bg-blue-600 text-white font-bold"
                                  : "hover:bg-slate-800/80 text-slate-300"
                              }`}
                            >
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-semibold truncate leading-tight">{s.title}</p>
                                <p className="text-[10px] text-slate-400 mt-0.5">
                                  {new Date(s.updatedAt).toLocaleDateString([], { month: "short", day: "numeric" })}
                                </p>
                              </div>
                              <button
                                onClick={(e) => deleteSession(e, s.id)}
                                className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-400 transition-opacity"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ))}
                      </div>

                      <Button
                        onClick={startNewSession}
                        className="w-full mt-3 h-9 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
                      >
                        <Plus className="h-3.5 w-3.5 mr-1" /> New Consultation
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Active Tab View Rendering */}
                <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50/50 dark:bg-slate-900/50">
                  
                  {/* TAB 1: MAIN ASSISTANT CHAT */}
                  {activeTab === "chat" && (
                    <>
                      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                        {messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                          >
                            {msg.sender === "ai" && (
                              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                                <Sparkles className="h-4 w-4" />
                              </div>
                            )}

                            <div
                              className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 shadow-xs space-y-3 ${
                                msg.sender === "user"
                                  ? "bg-blue-600 text-white rounded-br-none"
                                  : "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800 rounded-tl-none"
                              }`}
                            >
                              {/* Severity Badge / Emergency Alert */}
                              {msg.emergencyAlert && (
                                <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 rounded-xl flex items-start gap-2.5 text-rose-700 dark:text-rose-300">
                                  <AlertTriangle className="h-5 w-5 shrink-0 text-rose-600" />
                                  <div className="text-xs">
                                    <strong className="block font-bold">EMERGENCY MEDICAL WARNING</strong>
                                    Symptoms indicate acute urgent care required. Do not delay emergency consultation.
                                  </div>
                                </div>
                              )}

                              {/* Message Text */}
                              <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                                {msg.text}
                              </div>

                              {/* Probable Conditions Breakdown (Probabilities) */}
                              {msg.possibleConditions && msg.possibleConditions.length > 0 && (
                                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                    Estimated Possible Conditions (Non-Confirmed)
                                  </span>
                                  <div className="space-y-1.5">
                                    {msg.possibleConditions.map((cond, idx) => (
                                      <div key={idx} className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs">
                                        <div className="flex items-center justify-between">
                                          <span className="font-bold text-slate-800 dark:text-slate-200">
                                            {cond.condition}
                                          </span>
                                          <span className="font-extrabold text-blue-600 dark:text-blue-400">
                                            {cond.probability}% Match
                                          </span>
                                        </div>
                                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-1.5 overflow-hidden">
                                          <div
                                            className={`h-full rounded-full ${
                                              cond.probability > 70
                                                ? "bg-blue-600"
                                                : cond.probability > 50
                                                ? "bg-amber-500"
                                                : "bg-slate-400"
                                            }`}
                                            style={{ width: `${cond.probability}%` }}
                                          />
                                        </div>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                                          {cond.explanation}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Suggested Diagnostic Tests */}
                              {msg.suggestedTests && msg.suggestedTests.length > 0 && (
                                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                                    Recommended Diagnostic Tests
                                  </span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {msg.suggestedTests.map((test, idx) => (
                                      <span
                                        key={idx}
                                        className="text-[11px] font-medium bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800 px-2 py-0.5 rounded-lg"
                                      >
                                        🧪 {test}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Recommended Doctors Engine Preview */}
                              {msg.recommendedDoctors && msg.recommendedDoctors.length > 0 && (
                                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                      Top Verified Specialists in {selectedCity}
                                    </span>
                                    <Link to="/doctors" search={{ city: selectedCity }} className="text-[10px] font-bold text-blue-600 hover:underline">
                                      View All &gt;
                                    </Link>
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {msg.recommendedDoctors.map((doc) => (
                                      <div
                                        key={doc.id}
                                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700 flex items-center justify-between gap-2"
                                      >
                                        <div className="flex items-center gap-2 min-w-0">
                                          <img
                                            src={doc.image}
                                            alt={doc.fullName}
                                            className="h-10 w-10 rounded-xl object-cover shrink-0"
                                          />
                                          <div className="min-w-0">
                                            <p className="font-bold text-xs text-slate-900 dark:text-white truncate">
                                              {doc.fullName}
                                            </p>
                                            <p className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold truncate">
                                              {doc.speciality} • {doc.experience} yrs
                                            </p>
                                            <p className="text-[9px] text-slate-500 truncate">
                                              ⭐ {doc.rating} • ₹{doc.fee}
                                            </p>
                                          </div>
                                        </div>
                                        <Button
                                          size="sm"
                                          asChild
                                          className="h-7 px-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold shrink-0"
                                        >
                                          <Link to="/patient/doctor/$doctorId" params={{ doctorId: doc.id }}>
                                            Book
                                          </Link>
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Follow-up Question Chips */}
                              {msg.followUpQuestions && msg.followUpQuestions.length > 0 && (
                                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                    Suggested Follow-ups
                                  </span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {msg.followUpQuestions.map((q, idx) => (
                                      <button
                                        key={idx}
                                        onClick={() => handleSendMessage(q)}
                                        className="text-[11px] font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 transition-colors text-left"
                                      >
                                        💬 {q}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Action Link Buttons */}
                              {msg.actionLinks && msg.actionLinks.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-1">
                                  {msg.actionLinks.map((link, idx) => (
                                    <Button
                                      key={idx}
                                      size="sm"
                                      variant={link.variant || "default"}
                                      asChild={link.to.startsWith("/")}
                                      onClick={() => {
                                        if (link.to.startsWith("tel:")) window.location.href = link.to;
                                      }}
                                      className="h-7 px-3 text-xs font-bold rounded-xl"
                                    >
                                      {link.to.startsWith("/") ? (
                                        <Link to={link.to}>{link.label}</Link>
                                      ) : (
                                        <span>{link.label}</span>
                                      )}
                                    </Button>
                                  ))}
                                </div>
                              )}

                              {/* Timestamp and TTS speech button */}
                              <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1">
                                <span>{msg.timestamp}</span>
                                {msg.sender === "ai" && (
                                  <button
                                    onClick={() => speakText(msg.text)}
                                    className="flex items-center gap-1 hover:text-blue-600 transition-colors p-1"
                                    title="Read Out Loud"
                                  >
                                    <Volume2 className="h-3 w-3" /> Read
                                  </button>
                                )}
                              </div>
                            </div>

                            {msg.sender === "user" && (
                              <div className="h-8 w-8 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                                <User className="h-4 w-4" />
                              </div>
                            )}
                          </div>
                        ))}

                        {/* Typing Animation */}
                        {isTyping && (
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                              <Sparkles className="h-4 w-4 animate-spin" />
                            </div>
                            <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center gap-1.5 shadow-xs">
                              <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce"></span>
                              <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]"></span>
                              <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]"></span>
                              <span className="text-xs font-semibold text-slate-500 ml-1">
                                Care AI is analyzing medical protocols...
                              </span>
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>

                      {/* Bottom Input Area */}
                      <div className="p-3 sm:p-4 bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 shrink-0 space-y-2">
                        {/* Quick Prompt Bar */}
                        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                          {[
                            "Fever & severe headache from 3 days",
                            "Chest heaviness & breathing trouble",
                            "Stomach burning & acid reflux",
                            "Knee joint swelling on walking",
                            "Acne breakouts and red skin rash",
                          ].map((prompt, i) => (
                            <button
                              key={i}
                              onClick={() => handleSendMessage(prompt)}
                              className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 px-3 py-1 rounded-full whitespace-nowrap transition-colors border border-slate-200/60 dark:border-slate-700"
                            >
                              {prompt}
                            </button>
                          ))}
                        </div>

                        {/* Input Box and Action Controls */}
                        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                          {/* Multi-modal Attach Menu */}
                          <div className="relative group">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-9 w-9 text-slate-500 hover:text-blue-600 rounded-xl"
                              title="Attach Medical Record / Scan"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <Upload className="h-4 w-4" />
                            </Button>
                            <input
                              ref={fileInputRef}
                              type="file"
                              className="hidden"
                              accept="image/*,application/pdf"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  toast.success(`Attached ${e.target.files[0].name}. Analyzing image...`);
                                  runImageAnalyzer("xray");
                                }
                              }}
                            />
                          </div>

                          {/* Text input */}
                          <Input
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                              }
                            }}
                            placeholder="Type symptoms (e.g. fever, headache, chest pain) or ask medical questions..."
                            className="flex-1 bg-transparent border-0 focus-visible:ring-0 text-xs sm:text-sm px-2 text-slate-900 dark:text-white placeholder:text-slate-400"
                          />

                          {/* Voice STT Button */}
                          <Button
                            size="icon"
                            variant={isListening ? "destructive" : "ghost"}
                            onClick={toggleSpeechRecognition}
                            className={`h-9 w-9 rounded-xl transition-all ${
                              isListening ? "animate-pulse" : "text-slate-500 hover:text-blue-600"
                            }`}
                            title={isListening ? "Listening..." : "Voice Input (Speech to Text)"}
                          >
                            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                          </Button>

                          {/* Send Button */}
                          <Button
                            size="icon"
                            disabled={!inputText.trim() || isTyping}
                            onClick={() => handleSendMessage()}
                            className="h-9 w-9 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Medical Disclaimer Note */}
                        <p className="text-[10px] text-center text-slate-400 font-medium leading-tight">
                          🔒 Medyora Care AI provides informational medical triage. Not a confirmed diagnosis. Always consult a doctor.
                        </p>
                      </div>
                    </>
                  )}

                  {/* TAB 2: SYMPTOM CHECKER MODE */}
                  {activeTab === "symptom_checker" && (
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 border border-blue-100 dark:border-slate-700 space-y-2">
                        <div className="flex items-center gap-2">
                          <Activity className="h-5 w-5 text-blue-600" />
                          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                            Intelligent AI Symptom Triage
                          </h3>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          Describe your symptoms to receive condition estimates, urgency ratings, and top doctor recommendations in {selectedCity}.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          Enter Symptoms & Duration
                        </label>
                        <textarea
                          rows={3}
                          value={symptomInput}
                          onChange={(e) => setSymptomInput(e.target.value)}
                          placeholder="Example: I have high fever (102 F) since 2 days with severe throat pain, difficulty swallowing and headache..."
                          className="w-full p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xs text-slate-400">Location: 📍 {selectedCity}</span>
                          <Button
                            disabled={!symptomInput.trim()}
                            onClick={() => {
                              handleSendMessage(symptomInput);
                              setActiveTab("chat");
                            }}
                            className="h-10 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                          >
                            Analyze Symptoms <ArrowRight className="h-4 w-4 ml-1.5" />
                          </Button>
                        </div>
                      </div>

                      {/* Common symptom templates */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Or Select Common Clinical Symptoms
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {[
                            { name: "Fever & Chills", desc: "Body ache, temperature > 100°F" },
                            { name: "Persistent Headache", desc: "Throbbing pain or migraine" },
                            { name: "Chest Heaviness", desc: "Pressure, breathless" },
                            { name: "Stomach Acidity & Gas", desc: "Reflux, upper belly pain" },
                            { name: "Knee & Joint Ache", desc: "Stiffness on walking" },
                            { name: "Skin Rash & Pimples", desc: "Acne, itchy red spots" },
                          ].map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                handleSendMessage(`I am experiencing ${item.name} (${item.desc})`);
                                setActiveTab("chat");
                              }}
                              className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-400 hover:shadow-md transition-all text-left group"
                            >
                              <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600">
                                {item.name}
                              </p>
                              <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: IMAGE & SCAN AI ANALYZER */}
                  {activeTab === "image_analyzer" && (
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
                      <div className="p-4 rounded-2xl bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-800 space-y-1.5">
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                          <ImageIcon className="h-5 w-5 text-blue-600" />
                          AI Medical Image & Radiology Analyzer
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          Upload or select a clinical scan (X-Ray, MRI, Skin Photo, ECG) for instant AI pattern recognition and specialist recommendations.
                        </p>
                      </div>

                      {/* Preset Sample Radiographs & Photos */}
                      <div className="space-y-3">
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          Select Scan Type to Analyze
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {[
                            { id: "xray", name: "Chest X-Ray", icon: "🫁", desc: "Lungs & Bronchial Haziness" },
                            { id: "mri", name: "Brain MRI Scan", icon: "🧠", desc: "Neuro & White Matter" },
                            { id: "skin", name: "Skin / Acne Photo", icon: "✨", desc: "Dermatological Lesions" },
                            { id: "ecg", name: "12-Lead ECG Tracing", icon: "❤️", desc: "Cardiac Rhythm & ST-T" },
                          ].map((item) => (
                            <button
                              key={item.id}
                              onClick={() => setImageCategory(item.id as any)}
                              className={`p-3 rounded-2xl border text-left transition-all ${
                                imageCategory === item.id
                                  ? "bg-blue-600 text-white border-blue-600 shadow-md font-bold"
                                  : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-blue-300"
                              }`}
                            >
                              <span className="text-xl">{item.icon}</span>
                              <p className="text-xs font-bold mt-1.5">{item.name}</p>
                              <p className={`text-[10px] mt-0.5 ${imageCategory === item.id ? "text-blue-100" : "text-slate-400"}`}>
                                {item.desc}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Dropzone Upload */}
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="p-8 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 bg-white dark:bg-slate-900/50 flex flex-col items-center justify-center text-center cursor-pointer transition-all space-y-2 group"
                      >
                        <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Upload className="h-6 w-6" />
                        </div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          Drop your scan here or click to browse
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Supports JPEG, PNG, WEBP, DICOM, and PDF (Max 25MB)
                        </p>
                      </div>

                      <Button
                        onClick={() => runImageAnalyzer(imageCategory)}
                        className="w-full h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20"
                      >
                        Run AI Analysis on {imageCategory.toUpperCase()} Scan <ArrowRight className="h-4 w-4 ml-1.5" />
                      </Button>
                    </div>
                  )}

                  {/* TAB 4: LAB REPORT ANALYZER */}
                  {activeTab === "lab_analyzer" && (
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
                      <div className="p-4 rounded-2xl bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-800 space-y-1.5">
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                          <FileText className="h-5 w-5 text-blue-600" />
                          AI Blood & Pathology Report Reader
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          Extract and translate complex medical values (CBC, Lipid, Thyroid, Sugar, LFT) into clear explanations with abnormal parameter highlights.
                        </p>
                      </div>

                      {/* Select Lab Test Type */}
                      <div className="space-y-3">
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          Select Lab Report Category
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {[
                            { id: "lipid", name: "Lipid Profile", desc: "Cholesterol, LDL, HDL, Triglycerides" },
                            { id: "diabetes", name: "Diabetes & HbA1c", desc: "Glycated Hemoglobin & Fasting Sugar" },
                            { id: "cbc", name: "Complete Blood Count", desc: "Hemoglobin, Platelets, WBC Count" },
                            { id: "thyroid", name: "Thyroid Profile (TSH)", desc: "TSH, Total T3 & T4 Hormones" },
                            { id: "lft", name: "Liver Function Test", desc: "SGPT, SGOT, Bilirubin Enzymes" },
                          ].map((item) => (
                            <button
                              key={item.id}
                              onClick={() => setLabReportType(item.id as any)}
                              className={`p-3 rounded-2xl border text-left transition-all ${
                                labReportType === item.id
                                  ? "bg-blue-600 text-white border-blue-600 shadow-md font-bold"
                                  : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-blue-300"
                              }`}
                            >
                              <p className="text-xs font-bold">{item.name}</p>
                              <p className={`text-[10px] mt-0.5 ${labReportType === item.id ? "text-blue-100" : "text-slate-400"}`}>
                                {item.desc}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>

                      <Button
                        onClick={() => runLabAnalyzer(labReportType)}
                        className="w-full h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20"
                      >
                        Interpret {labReportType.toUpperCase()} Report Values <ArrowRight className="h-4 w-4 ml-1.5" />
                      </Button>
                    </div>
                  )}

                  {/* TAB 5: PRESCRIPTION & MEDICINE AI */}
                  {activeTab === "prescription_reader" && (
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
                      <div className="p-4 rounded-2xl bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-800 space-y-1.5">
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                          <Pill className="h-5 w-5 text-blue-600" />
                          AI Prescription Reader & Drug Safety Scanner
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          Parse handwriting prescriptions, verify dosage schedules (Morning/Noon/Night), check drug interactions, and find affordable generic substitutes.
                        </p>
                      </div>

                      {/* Action 1: Upload Doctor Prescription */}
                      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                          Option 1: Scan Handwritten Prescription Photo
                        </h4>
                        <Button
                          onClick={runPrescriptionReader}
                          className="w-full h-11 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                        >
                          <Upload className="h-4 w-4 mr-2" /> Upload & Parse Prescription
                        </Button>
                      </div>

                      {/* Action 2: Search Specific Medicine */}
                      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                          Option 2: Check Medicine Safety & Generics
                        </h4>
                        <div className="flex gap-2">
                          <Input
                            value={medicineSearchInput}
                            onChange={(e) => setMedicineSearchInput(e.target.value)}
                            placeholder="Enter medicine (e.g. Dolo 650, Augmentin 625, Metformin)..."
                            className="text-xs rounded-xl"
                          />
                          <Button
                            onClick={() => runMedicineScanner(medicineSearchInput)}
                            className="rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold text-xs shrink-0"
                          >
                            Check Safety
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 6: HEALTH SCORE & DISEASE RISK */}
                  {activeTab === "health_score" && (
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
                      <div className="p-4 rounded-2xl bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-800 space-y-1.5">
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                          <Flame className="h-5 w-5 text-amber-500" />
                          Medyora AI Health Score & Disease Risk Engine
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          Calculate your dynamic 0-100 Health Score and predictive risk radars for Diabetes, Cardiac Health, Hypertension, and Fatty Liver.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-slate-500">Age</label>
                          <Input
                            type="number"
                            value={healthInputs.age}
                            onChange={(e) => setHealthInputs({ ...healthInputs, age: Number(e.target.value) })}
                            className="text-xs rounded-xl mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-slate-500">Weight (kg)</label>
                          <Input
                            type="number"
                            value={healthInputs.weightKg}
                            onChange={(e) => setHealthInputs({ ...healthInputs, weightKg: Number(e.target.value) })}
                            className="text-xs rounded-xl mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-slate-500">Height (cm)</label>
                          <Input
                            type="number"
                            value={healthInputs.heightCm}
                            onChange={(e) => setHealthInputs({ ...healthInputs, heightCm: Number(e.target.value) })}
                            className="text-xs rounded-xl mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-slate-500">Fasting Sugar (mg/dL)</label>
                          <Input
                            type="number"
                            value={healthInputs.fastingSugar}
                            onChange={(e) => setHealthInputs({ ...healthInputs, fastingSugar: Number(e.target.value) })}
                            className="text-xs rounded-xl mt-1"
                          />
                        </div>
                      </div>

                      <Button
                        onClick={runHealthScoreAssessment}
                        className="w-full h-11 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md"
                      >
                        Calculate My AI Health Score & Risk Plan
                      </Button>

                      {/* Display Computed Health Score Assessment */}
                      {healthScoreResult && (
                        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                Overall Health Score
                              </span>
                              <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-black text-blue-600">
                                  {healthScoreResult.overallScore}
                                </span>
                                <span className="text-sm font-bold text-slate-400">/ 100</span>
                                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                                  {healthScoreResult.category}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">BMI</span>
                              <p className="text-base font-black text-slate-900 dark:text-white">
                                {healthScoreResult.bmi} ({healthScoreResult.bmiCategory})
                              </p>
                            </div>
                          </div>

                          {/* Risk Radars */}
                          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                              <span className="text-[10px] font-bold text-slate-400 block">Cardiovascular Risk</span>
                              <span className="text-xs font-extrabold text-blue-600">
                                {healthScoreResult.metrics.cardiovascularRisk.level} ({healthScoreResult.metrics.cardiovascularRisk.score}%)
                              </span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                              <span className="text-[10px] font-bold text-slate-400 block">Diabetes Risk</span>
                              <span className="text-xs font-extrabold text-amber-600">
                                {healthScoreResult.metrics.diabetesRisk.level} ({healthScoreResult.metrics.diabetesRisk.score}%)
                              </span>
                            </div>
                          </div>

                          {/* Custom Diet & Workout */}
                          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 text-xs space-y-1">
                            <strong className="block text-emerald-800 dark:text-emerald-300 font-bold flex items-center gap-1.5">
                              <Apple className="h-4 w-4" /> AI Custom Nutrition Target
                            </strong>
                            <p className="text-emerald-700 dark:text-emerald-400">
                              Target: {healthScoreResult.customDietPlan.caloriesTarget} kcal • Hydration: {healthScoreResult.customDietPlan.hydrationTarget}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 7: EMERGENCY SOS */}
                  {activeTab === "emergency_sos" && (
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                      <div className="p-5 rounded-3xl bg-rose-600 text-white shadow-xl space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                            <AlertTriangle className="h-7 w-7 text-white animate-bounce" />
                          </div>
                          <div>
                            <h3 className="text-base font-black uppercase tracking-wider">
                              Emergency Medical SOS
                            </h3>
                            <p className="text-xs text-rose-100 font-medium">
                              Immediate assistance in {selectedCity}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                          <Button
                            asChild
                            className="h-12 rounded-2xl bg-white text-rose-700 hover:bg-rose-50 font-black text-sm shadow-md"
                          >
                            <a href="tel:112">
                              <Phone className="h-5 w-5 mr-2" /> CALL 112 EMERGENCY
                            </a>
                          </Button>

                          <Button
                            asChild
                            className="h-12 rounded-2xl bg-rose-900/80 hover:bg-rose-900 text-white font-black text-sm border border-white/20"
                          >
                            <a href="tel:108">
                              <Phone className="h-5 w-5 mr-2" /> CALL 108 AMBULANCE
                            </a>
                          </Button>
                        </div>
                      </div>

                      {/* Nearest Emergency Hospitals */}
                      <div className="space-y-2.5">
                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          Nearest 24/7 Emergency Rooms & Trauma Centers
                        </h4>
                        {[
                          { name: "Manipal Hospital Emergency", area: "Old Airport Road", dist: "1.4 km", time: "5 mins", phone: "+91 80 2502 4444" },
                          { name: "Apollo Hospital ER & ICU", area: "Indiranagar 100ft Road", dist: "2.1 km", time: "8 mins", phone: "+91 80 4030 4050" },
                          { name: "Fortis Hospital Emergency", area: "Cunningham Road", dist: "4.5 km", time: "14 mins", phone: "+91 80 6621 4444" },
                        ].map((hosp, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-xs"
                          >
                            <div>
                              <p className="font-bold text-xs text-slate-900 dark:text-white">{hosp.name}</p>
                              <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                                <MapPin className="h-3 w-3 text-rose-500" /> {hosp.area} • {hosp.dist} ({hosp.time})
                              </p>
                            </div>
                            <Button
                              size="sm"
                              asChild
                              className="h-8 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
                            >
                              <a href={`tel:${hosp.phone}`}>Call ER</a>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
