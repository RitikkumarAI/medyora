import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import {
  Sparkles,
  Bot,
  Send,
  Mic,
  MicOff,
  User,
  Stethoscope,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Volume2,
  VolumeX,
  ShieldCheck,
  HeartPulse,
  FileText,
  Upload,
  Activity,
  CheckCircle2,
  Phone,
  History,
  Trash2,
  Plus,
  Apple,
  Dumbbell,
  Shield,
  Wind,
  Bone,
  Brain,
  Eye,
  Flower2,
  Baby,
  Smile,
  Zap,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  SPECIALTY_CATEGORIES,
  type SpecialtyCategoryId,
  type SpecialtyReportItem,
  type SpecialtyXAIAnalysisResult,
  INITIAL_SPECIALTY_REPORTS,
  runSpecialtyExplainableAIAnalysis,
} from "../services/specialty-xai-engine";
import { useSpecialtyReports } from "../services/specialty-ai-store";
import { DOCTORS } from "@/shared/data/mock";

// Icon lookup helper
const ICON_MAP: Record<string, typeof HeartPulse> = {
  HeartPulse,
  Sparkles,
  Bone,
  Activity,
  Zap,
  Wind,
  Brain,
  Shield,
  Baby,
  Flower2,
  Stethoscope,
  Eye,
  ShieldCheck,
  Smile,
};

// Common Category chips data
const CATEGORY_CHIPS = [
  { id: "cardiology", label: "Cardio & Heart", icon: HeartPulse, hindi: "हृदय रोग", desc: "Chest pain, BP, palpitations" },
  { id: "pulmonology", label: "Breathing & Lungs", icon: Wind, hindi: "सांस व फेफड़े", desc: "Asthma, cough, wheezing" },
  { id: "orthopedics", label: "Bones & Joint Pain", icon: Bone, hindi: "हड्डी व जोड़", desc: "Knee pain, backache, arthritis" },
  { id: "neurology", label: "Head, Brain & Nerves", icon: Brain, hindi: "सिरदर्द व नसें", desc: "Migraine, dizziness, numbness" },
  { id: "ophthalmology", label: "Eyes & Vision", icon: Eye, hindi: "आंखों की समस्या", desc: "Blurry vision, strain, eye pain" },
  { id: "dermatology", label: "Skin & Hair", icon: Sparkles, hindi: "त्वचा एवं बाल", desc: "Acne, eczema, rash, hair fall" },
  { id: "endocrinology", label: "Diabetes & Thyroid", icon: Activity, hindi: "शुगर व थायरॉयड", desc: "Sugar levels, HbA1c, thyroid" },
  { id: "gastroenterology", label: "Stomach & Digestion", icon: Zap, hindi: "पेट व पाचन", desc: "Acidity, gas, fatty liver" },
  { id: "pediatrics", label: "Child Specialist", icon: Baby, hindi: "बच्चों के डॉक्टर", desc: "Infant fever, vaccination, growth" },
  { id: "gynecology", label: "Women's Health", icon: Flower2, hindi: "महिला रोग", desc: "PCOD/PCOS, periods, pregnancy" },
  { id: "urology", label: "Kidney & Urinary", icon: Shield, hindi: "किडनी व यूरिन", desc: "Kidney stones, UTI, burning" },
  { id: "ent", label: "Ear, Nose & Throat", icon: Stethoscope, hindi: "कान, नाक, गला", desc: "Sinus, tonsils, ear pain" },
  { id: "general_medicine", label: "Viral & Fevers", icon: ShieldCheck, hindi: "वायरल व बुखार", desc: "CBC, dengue, weakness" },
  { id: "mental_wellness", label: "Mental Wellness", icon: Smile, hindi: "तनाव व अनिद्रा", desc: "Anxiety, depression, sleep" },
];

const SYMPTOM_PILLS_BY_SPECIALTY: Record<string, string[]> = {
  cardiology: [
    "Chest tightness / heaviness",
    "High Blood Pressure (140/90+)",
    "Rapid or irregular palpitations",
    "Shortness of breath on stairs",
    "High Cholesterol / Lipid concern",
  ],
  pulmonology: [
    "Persistent dry / wet cough",
    "Difficulty breathing at night",
    "Wheezing sound in chest",
    "Chest congestion / phlegm",
    "Low oxygen saturation (SpO2)",
  ],
  orthopedics: [
    "Knee pain when climbing stairs",
    "Lower back stiffness & ache",
    "Morning joint swelling & crackling",
    "High Uric Acid / Gout suspicion",
    "Neck & shoulder stiffness",
  ],
  neurology: [
    "Throbbing one-sided migraine",
    "Dizziness / loss of balance",
    "Hand or foot numbness / tingling",
    "Frequent severe headaches",
    "Brain fog & low Vitamin B12",
  ],
  ophthalmology: [
    "Blurry vision / specs power change",
    "Eye redness & burning sensation",
    "Watery / gritty dry eyes",
    "High eye pressure / glaucoma check",
    "Night driving glare & strain",
  ],
  dermatology: [
    "Persistent acne & cystic pimples",
    "Itchy red skin rash / eczema",
    "Excessive hair fall & thinning",
    "Skin pigmentation & dark patches",
    "Fungal infection / ringworm",
  ],
  endocrinology: [
    "High fasting blood sugar (140+)",
    "Elevated HbA1c (> 7.0%)",
    "Thyroid TSH imbalance / sluggishness",
    "Sudden unexplained weight gain",
    "PCOD hormonal symptoms & fatigue",
  ],
  gastroenterology: [
    "Frequent acid reflux & heartburn",
    "Chronic constipation / bloating",
    "Grade 2 Fatty Liver ultrasound report",
    "Stomach cramps after eating",
    "Elevated SGPT/SGOT liver enzymes",
  ],
  pediatrics: [
    "Child high fever (> 101 F)",
    "Infant cold & persistent cough",
    "Poor appetite & iron deficiency",
    "Vaccination milestone check",
    "Colic pain & vomiting",
  ],
  gynecology: [
    "Irregular / delayed periods",
    "Severe menstrual cramps (Dysmenorrhea)",
    "PCOD / PCOS ultrasound diagnosis",
    "Hormonal acne & facial hair",
    "Pregnancy first trimester guidance",
  ],
  urology: [
    "Burning sensation during urination",
    "Right/left flank pain (Kidney stone)",
    "Frequent night urination",
    "Elevated serum creatinine",
    "Foamy urine (microalbuminuria)",
  ],
  ent: [
    "Throat pain & difficulty swallowing",
    "Nasal blockage & sinus headache",
    "Ear pain / blocked fluid sensation",
    "Tinnitus (ringing in ear)",
    "Frequent morning sneezing",
  ],
  general_medicine: [
    "High fever with body chills",
    "Severe weakness & body fatigue",
    "Low platelet count (< 100k)",
    "Viral flu / Dengue suspicion",
    "Loss of taste & appetite",
  ],
  mental_wellness: [
    "Chronic anxiety & restless thoughts",
    "Depressed mood & low motivation",
    "Difficulty falling asleep (Insomnia)",
    "Workplace burnout & panic attacks",
    "Concentration & focus difficulties",
  ],
};

const STARTER_PROMPTS = [
  "Hi Doctor",
  "I have chest tightness & high BP",
  "Knee joint pain climbing stairs",
  "Severe migraine headache",
  "Skin rash & itching",
  "Persistent cough & breathing trouble",
];

export interface ChatBotMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  categoryChips?: typeof CATEGORY_CHIPS;
  symptomPills?: string[];
  reportUploadPrompt?: {
    specialtyId: SpecialtyCategoryId;
    specialtyName: string;
  };
  attachedReport?: {
    title: string;
    date: string;
    labName: string;
  };
  xaiResult?: SpecialtyXAIAnalysisResult;
}

export interface ChatSessionHistory {
  id: string;
  title: string;
  date: string;
  messages: ChatBotMessage[];
}

const STORAGE_KEY_SESSIONS = "medyora.clinical_chatbot_sessions.v1";

export interface ClinicalAIChatbotProps {
  initialSpecialty?: SpecialtyCategoryId;
}

export function ClinicalAIChatbot({ initialSpecialty }: ClinicalAIChatbotProps = {}) {
  const [messages, setMessages] = useState<ChatBotMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeSpecialty, setActiveSpecialty] = useState<SpecialtyCategoryId | null>(null);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sessions, setSessions] = useState<ChatSessionHistory[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Welcome Message or Pre-selected Specialty
  useEffect(() => {
    const saved = loadSavedChatSessions();
    setSessions(saved);

    const initialId = `session-${Date.now()}`;
    setCurrentSessionId(initialId);

    if (initialSpecialty && CATEGORY_CHIPS.some((c) => c.id === initialSpecialty)) {
      const cat = CATEGORY_CHIPS.find((c) => c.id === initialSpecialty);
      const pills = SYMPTOM_PILLS_BY_SPECIALTY[initialSpecialty] || SYMPTOM_PILLS_BY_SPECIALTY["cardiology"]!;
      setActiveSpecialty(initialSpecialty);
      setMessages([
        {
          id: "welcome-1",
          sender: "ai",
          text: `Hello! I am your Medyora Clinical AI Doctor. I've opened the ${cat?.label} Clinic (${cat?.hindi}). What symptoms or discomfort are you experiencing? Tap a common symptom below, or describe your condition in chat:`,
          timestamp: "Just now",
          symptomPills: pills,
        },
      ]);
    } else {
      setMessages([
        {
          id: "welcome-1",
          sender: "ai",
          text: "Hello! I am your Medyora Clinical AI Doctor & Health Copilot. What health concern or medical specialty would you like to explore today? You can select a category below, tap a quick prompt, or type your symptoms freely:",
          timestamp: "Just now",
          categoryChips: CATEGORY_CHIPS,
        },
      ]);
    }
  }, [initialSpecialty]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Save session updates
  useEffect(() => {
    if (!currentSessionId || messages.length <= 1) return;
    saveCurrentSession(currentSessionId, messages);
  }, [messages, currentSessionId]);

  // Voice recognition setup
  useEffect(() => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-IN";

      rec.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        if (text) {
          handleSendMessage(text);
        }
        setIsListening(false);
      };

      rec.onerror = () => setIsListening(false);
      rec.onend = () => setIsListening(false);
      recognitionRef.current = rec;
    }
  }, []);

  const toggleVoiceListen = () => {
    if (!recognitionRef.current) {
      toast.error("Speech recognition is not supported in this browser.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
      toast.info("Listening... Speak your symptoms clearly.");
    }
  };

  const speakText = (text: string) => {
    if (!isVoiceEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const clean = text.replace(/[*_#`]/g, "");
    const utterance = new SpeechSynthesisUtterance(clean.slice(0, 200));
    utterance.rate = 1.0;
    utterance.lang = "en-IN";
    window.speechSynthesis.speak(utterance);
  };

  // Helper to append a user message
  const appendUserMessage = (text: string): ChatBotMessage => {
    const msg: ChatBotMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, msg]);
    return msg;
  };

  // Core Conversational Logic Handler
  const handleSendMessage = (textToSend?: string) => {
    const raw = (textToSend || inputText).trim();
    if (!raw) return;

    appendUserMessage(raw);
    setInputText("");
    setIsTyping(true);

    const lower = raw.toLowerCase();

    setTimeout(() => {
      // 1. GREETING INTENT ("Hi", "Hello", "Hey", "Namaste")
      if (
        lower === "hi" ||
        lower === "hello" ||
        lower === "hey" ||
        lower === "hi doctor" ||
        lower === "namaste" ||
        lower.startsWith("hi ") ||
        lower.startsWith("hello ")
      ) {
        const reply: ChatBotMessage = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: "Hello! What medical issue or specialty would you like to discuss today? Please select any category below to begin, or type what you are experiencing:",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          categoryChips: CATEGORY_CHIPS,
        };
        setMessages((prev) => [...prev, reply]);
        speakText(reply.text);
        setIsTyping(false);
        return;
      }

      // 2. CHECK IF USER MENTIONED A SPECIFIC SPECIALTY KEYWORD
      const matchedSpecialty = CATEGORY_CHIPS.find(
        (cat) =>
          lower.includes(cat.label.toLowerCase()) ||
          lower.includes(cat.id.toLowerCase()) ||
          (cat.id === "cardiology" && (lower.includes("cardio") || lower.includes("heart") || lower.includes("bp"))) ||
          (cat.id === "pulmonology" && (lower.includes("breath") || lower.includes("lung") || lower.includes("asthma"))) ||
          (cat.id === "orthopedics" && (lower.includes("bone") || lower.includes("joint") || lower.includes("knee") || lower.includes("pain"))) ||
          (cat.id === "neurology" && (lower.includes("head") || lower.includes("migraine") || lower.includes("brain") || lower.includes("nerve"))) ||
          (cat.id === "ophthalmology" && (lower.includes("eye") || lower.includes("vision") || lower.includes("specs"))) ||
          (cat.id === "dermatology" && (lower.includes("skin") || lower.includes("hair") || lower.includes("acne") || lower.includes("rash"))) ||
          (cat.id === "endocrinology" && (lower.includes("sugar") || lower.includes("diabetes") || lower.includes("thyroid"))) ||
          (cat.id === "gastroenterology" && (lower.includes("stomach") || lower.includes("digestion") || lower.includes("gas") || lower.includes("acidity")))
      );

      if (matchedSpecialty && !activeSpecialty) {
        handleSelectSpecialty(matchedSpecialty.id as SpecialtyCategoryId);
        return;
      }

      // 3. IF SPECIALTY IS ACTIVE AND USER PROVIDED SYMPTOMS -> ASK FOR REPORTS
      if (activeSpecialty) {
        const specialtyMeta = SPECIALTY_CATEGORIES.find((s) => s.id === activeSpecialty);
        const reply: ChatBotMessage = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: `Thank you for sharing your symptoms. To evaluate your ${specialtyMeta?.name || "health"} risk accurately and calculate biomarker evidence, do you have any recent medical reports (such as an ECG, Lipid Profile, Blood Test, MRI, or Prescription)? You can upload it below, or test with our verified sample patient case:`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          reportUploadPrompt: {
            specialtyId: activeSpecialty,
            specialtyName: specialtyMeta?.name || "Specialty",
          },
        };
        setMessages((prev) => [...prev, reply]);
        speakText(reply.text);
        setIsTyping(false);
        return;
      }

      // 4. GENERAL MEDICAL CONVERSATION FALLBACK
      // If none matched, auto-detect likely specialty from symptom words, default to cardiology or general medicine
      const detectedSpecialty: SpecialtyCategoryId = lower.includes("chest") || lower.includes("heart") || lower.includes("bp")
        ? "cardiology"
        : lower.includes("breath") || lower.includes("cough")
        ? "pulmonology"
        : lower.includes("knee") || lower.includes("joint") || lower.includes("back")
        ? "orthopedics"
        : lower.includes("head") || lower.includes("dizzy")
        ? "neurology"
        : lower.includes("eye")
        ? "ophthalmology"
        : lower.includes("skin") || lower.includes("hair")
        ? "dermatology"
        : lower.includes("sugar")
        ? "endocrinology"
        : "general_medicine";

      setActiveSpecialty(detectedSpecialty);
      const specMeta = SPECIALTY_CATEGORIES.find((s) => s.id === detectedSpecialty);

      const reply: ChatBotMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: `I understand you have symptoms related to ${specMeta?.name || "General Health"}. Do you have any diagnostic reports or blood tests for this? Upload your report below, or load our clinical test report to run the Explainable AI (XAI) risk diagnosis:`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        reportUploadPrompt: {
          specialtyId: detectedSpecialty,
          specialtyName: specMeta?.name || "Specialty",
        },
      };
      setMessages((prev) => [...prev, reply]);
      speakText(reply.text);
      setIsTyping(false);
    }, 450);
  };

  // When patient clicks any category chip
  const handleSelectSpecialty = (specialtyId: SpecialtyCategoryId) => {
    setActiveSpecialty(specialtyId);
    const cat = CATEGORY_CHIPS.find((c) => c.id === specialtyId);
    const pills = SYMPTOM_PILLS_BY_SPECIALTY[specialtyId] || SYMPTOM_PILLS_BY_SPECIALTY["cardiology"]!;

    appendUserMessage(`I want to consult about ${cat?.label || specialtyId}`);
    setIsTyping(true);

    setTimeout(() => {
      const reply: ChatBotMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: `I've opened the ${cat?.label} Clinic (${cat?.hindi}). Could you tell me what symptoms or discomfort you are experiencing? You can type in your own words, or tap any common symptoms below:`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        symptomPills: pills,
      };
      setMessages((prev) => [...prev, reply]);
      speakText(reply.text);
      setIsTyping(false);
    }, 400);
  };

  // When patient clicks a quick symptom pill
  const handleSelectSymptom = (symptomText: string) => {
    appendUserMessage(symptomText);
    setIsTyping(true);

    const specialty = activeSpecialty || "cardiology";
    const specialtyMeta = SPECIALTY_CATEGORIES.find((s) => s.id === specialty);

    setTimeout(() => {
      const reply: ChatBotMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: `Noted: "${symptomText}". Do you have any diagnostic reports (ECG, Lipid Profile, Blood Test, MRI, or Prescription) for your ${specialtyMeta?.name}? Upload your report below, or click "Load Sample Report" to generate the full Explainable AI assessment:`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        reportUploadPrompt: {
          specialtyId: specialty,
          specialtyName: specialtyMeta?.name || "Specialty",
        },
      };
      setMessages((prev) => [...prev, reply]);
      speakText(reply.text);
      setIsTyping(false);
    }, 400);
  };

  // When patient uploads or loads a sample report -> Run XAI Engine!
  const handleAnalyzeReport = (customReport?: SpecialtyReportItem) => {
    const specialty = activeSpecialty || "cardiology";
    const sampleReports = INITIAL_SPECIALTY_REPORTS[specialty] || INITIAL_SPECIALTY_REPORTS["cardiology"];
    const reportsToAnalyze = customReport ? [customReport] : sampleReports;
    const reportTitle = customReport ? customReport.title : sampleReports[0]?.title || "Clinical Report";
    const reportLab = customReport ? customReport.labName : sampleReports[0]?.labName || "Diagnostic Center";
    const reportDate = customReport ? customReport.date : sampleReports[0]?.date || "Recent";

    appendUserMessage(`Uploaded Report: ${reportTitle} (${reportLab})`);
    setIsTyping(true);

    setTimeout(() => {
      const xaiResult = runSpecialtyExplainableAIAnalysis(specialty, reportsToAnalyze);

      const reply: ChatBotMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: `I have completed the Explainable AI (XAI) clinical analysis for your ${xaiResult.primaryConditionTitle}. Below is your calculated risk score, biological cause breakdown ("Kyun ho raha hai"), deficiencies, and your 4-quadrant action plan:`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        attachedReport: {
          title: reportTitle,
          date: reportDate,
          labName: reportLab,
        },
        xaiResult,
      };

      setMessages((prev) => [...prev, reply]);
      speakText(`Analysis complete for ${xaiResult.primaryConditionTitle}. Severity is ${xaiResult.severity}.`);
      setIsTyping(false);
    }, 700);
  };

  // Start a fresh consultation
  const handleStartNewConsultation = () => {
    if (messages.length > 1 && currentSessionId) {
      saveCurrentSession(currentSessionId, messages);
    }
    const newId = `session-${Date.now()}`;
    setCurrentSessionId(newId);
    setActiveSpecialty(null);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "ai",
        text: "Hello! I am your Medyora Clinical AI Doctor & Health Copilot. What health concern or medical specialty would you like to explore today? You can select a category below or type freely:",
        timestamp: "Just now",
        categoryChips: CATEGORY_CHIPS,
      },
    ]);
    toast.success("Started a new clinical consultation.");
  };

  // Restore past session from history
  const handleRestoreSession = (session: ChatSessionHistory) => {
    setCurrentSessionId(session.id);
    setMessages(session.messages);
    toast.info(`Restored consultation from ${session.date}`);
  };

  // Delete past session
  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = sessions.filter((s) => s.id !== sessionId);
    setSessions(updated);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(updated));
    }
    toast.success("Consultation removed from history.");
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] max-w-7xl mx-auto w-full bg-white dark:bg-slate-950 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden">
      {/* ================= LEFT SIDEBAR (HISTORY & SPECIALTIES) ================= */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="h-full border-r border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/90 flex flex-col justify-between shrink-0 overflow-hidden z-20"
          >
            <div className="p-4 space-y-4 overflow-y-auto flex-1 no-scrollbar">
              {/* Top Action */}
              <Button
                onClick={handleStartNewConsultation}
                className="w-full h-11 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" /> New Health Consultation
              </Button>

              {/* Specialty Quick Nav */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider px-2">
                  Specialty Clinics
                </span>
                <div className="space-y-1">
                  {CATEGORY_CHIPS.slice(0, 7).map((cat) => {
                    const Icon = cat.icon;
                    const isCurrent = activeSpecialty === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleSelectSpecialty(cat.id as SpecialtyCategoryId)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                          isCurrent
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800"
                        }`}
                      >
                        <Icon className={`h-4 w-4 shrink-0 ${isCurrent ? "text-white" : "text-blue-500"}`} />
                        <span className="truncate">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Saved Consultation History */}
              <div className="space-y-1.5 pt-2 border-t border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center justify-between px-2">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    Recent History ({sessions.length})
                  </span>
                  <History className="h-3 w-3 text-slate-400" />
                </div>

                {sessions.length === 0 ? (
                  <p className="text-[11px] text-slate-400 px-2 font-medium">No past sessions yet.</p>
                ) : (
                  <div className="space-y-1 max-h-48 overflow-y-auto no-scrollbar">
                    {sessions.map((ses) => (
                      <div
                        key={ses.id}
                        onClick={() => handleRestoreSession(ses)}
                        className={`group p-2 rounded-xl cursor-pointer text-xs transition-colors flex items-center justify-between ${
                          currentSessionId === ses.id
                            ? "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold"
                            : "hover:bg-slate-200/50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        <div className="overflow-hidden space-y-0.5">
                          <p className="truncate text-xs font-semibold">{ses.title}</p>
                          <p className="text-[10px] opacity-75">{ses.date}</p>
                        </div>
                        <button
                          onClick={(e) => handleDeleteSession(ses.id, e)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500"
                          title="Delete session"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Emergency Hotlines Footer */}
            <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-rose-50/50 dark:bg-rose-950/20 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-bold">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>Emergency Medical Services</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="tel:112"
                  className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-[11px] font-black flex items-center gap-1"
                >
                  <Phone className="h-3 w-3" /> 112
                </a>
                <a
                  href="tel:108"
                  className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200 text-[11px] font-black flex items-center gap-1"
                >
                  <Phone className="h-3 w-3" /> 108
                </a>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ================= MAIN CHAT WORKSPACE ================= */}
      <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-950 min-w-0">
        {/* Header Bar */}
        <header className="h-16 px-4 sm:px-6 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between shrink-0 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-600/30">
                <Bot className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-sm font-black text-slate-900 dark:text-white">
                    Medyora Clinical AI Copilot
                  </h2>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {activeSpecialty ? `${SPECIALTY_CATEGORIES.find(s => s.id === activeSpecialty)?.name} Clinic Active` : "Interactive Triage & Explainable AI (XAI)"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVoiceEnabled((prev) => !prev)}
              className={`rounded-xl h-9 px-2.5 text-xs font-bold ${
                isVoiceEnabled ? "text-blue-600 bg-blue-50 dark:bg-blue-950/60" : "text-slate-400"
              }`}
              title={isVoiceEnabled ? "Voice output enabled" : "Voice output muted"}
            >
              {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleStartNewConsultation}
              className="rounded-xl h-9 px-2.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
              title="Reset conversation"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 no-scrollbar">
          {/* Quick Starter Chips Bar if only 1 message */}
          {messages.length === 1 && (
            <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 space-y-2">
              <span className="text-[11px] font-black uppercase text-blue-700 dark:text-blue-300">
                ⚡ Quick Health Prompts (Tap to ask)
              </span>
              <div className="flex flex-wrap gap-2">
                {STARTER_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-slate-700 dark:text-slate-200 shadow-xs transition-all"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Render All Messages */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${
                msg.sender === "user" ? "ml-auto justify-end" : "mr-auto justify-start"
              }`}
            >
              {msg.sender === "ai" && (
                <div className="h-8 w-8 rounded-xl bg-blue-600 text-white shrink-0 flex items-center justify-center shadow-xs">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div className="space-y-3 max-w-2xl">
                {/* Bubble */}
                <div
                  className={`p-4 rounded-3xl text-xs sm:text-sm font-medium leading-relaxed shadow-xs ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-tr-sm"
                      : "bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-tl-sm border border-slate-200/80 dark:border-slate-800"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>

                {/* 1. INTERACTIVE CATEGORY SELECTOR CHIPS */}
                {msg.categoryChips && (
                  <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        Choose Medical Specialty (14 Categories)
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">1-Click Triage</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {msg.categoryChips.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <button
                            key={cat.id}
                            onClick={() => handleSelectSpecialty(cat.id as SpecialtyCategoryId)}
                            className="flex items-start gap-2 p-2.5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-750 hover:border-blue-500 text-left transition-all group shadow-xs"
                          >
                            <div className="p-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 shrink-0 group-hover:scale-110 transition-transform">
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="overflow-hidden">
                              <h5 className="text-xs font-black text-slate-900 dark:text-white truncate">
                                {cat.label}
                              </h5>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                                {cat.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2. QUICK SYMPTOM PILLS */}
                {msg.symptomPills && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      Common Symptoms (Tap to confirm)
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.symptomPills.map((pill, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => handleSelectSymptom(pill)}
                          className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-blue-500 font-bold text-xs shadow-xs transition-all"
                        >
                          + {pill}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. REPORT UPLOAD PROMPT IN CHAT */}
                {msg.reportUploadPrompt && (
                  <div className="p-4 rounded-3xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-black text-blue-900 dark:text-blue-200">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span>Attach {msg.reportUploadPrompt.specialtyName} Medical Report</span>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <Button
                        size="sm"
                        onClick={() => handleAnalyzeReport()}
                        className="rounded-xl h-10 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center gap-1.5"
                      >
                        <Sparkles className="h-3.5 w-3.5" /> ⚡ Load Verified Clinical Case
                      </Button>

                      <label className="cursor-pointer inline-flex items-center gap-1.5 h-10 px-4 rounded-xl border border-blue-300 dark:border-blue-800 bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-300 font-bold text-xs hover:bg-blue-50 transition-colors">
                        <Upload className="h-3.5 w-3.5" />
                        <span>Upload Custom PDF / Image</span>
                        <input
                          type="file"
                          accept=".pdf,image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              const file = e.target.files[0];
                              const customRep: SpecialtyReportItem = {
                                id: `custom-${Date.now()}`,
                                specialtyId: msg.reportUploadPrompt!.specialtyId,
                                title: file.name.replace(/\.[^/.]+$/, ""),
                                date: "Today",
                                labName: "Uploaded Diagnostic",
                                fileType: "lab_blood",
                                extractedTextSnippet: "Patient uploaded diagnostic file.",
                                parameters: [],
                              };
                              handleAnalyzeReport(customRep);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                )}

                {/* 4. EMBEDDED EXPLAINABLE AI (XAI) DIAGNOSTIC CARD */}
                {msg.xaiResult && (
                  <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 text-xs">
                    {/* Header: Title & Risk % */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                            Explainable AI Diagnosis
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold">
                            {msg.attachedReport?.title}
                          </span>
                        </div>
                        <h4 className="text-base font-black text-slate-900 dark:text-white mt-1">
                          {msg.xaiResult.primaryConditionTitle}
                        </h4>
                        <p className="text-[11px] text-blue-600 dark:text-blue-400 font-bold">
                          {msg.xaiResult.hindiConditionTitle}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 rounded-xl bg-slate-900 text-white dark:bg-slate-800 font-black text-xs">
                          {msg.xaiResult.overallConfidenceScore}% Confidence
                        </div>
                        <span
                          className={`px-2.5 py-1 rounded-xl font-black uppercase text-[10px] ${
                            msg.xaiResult.severity === "critical"
                              ? "bg-rose-600 text-white animate-pulse"
                              : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200"
                          }`}
                        >
                          {msg.xaiResult.severity} Risk
                        </span>
                      </div>
                    </div>

                    {/* Pathophysiology: "Kyun Ho Raha Hai" */}
                    <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 space-y-1">
                      <span className="text-[10px] font-black uppercase text-blue-900 dark:text-blue-300">
                        🔍 Kyun Ho Raha Hai? (Why is this happening?)
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {msg.xaiResult.pathophysiologyExplanation}
                      </p>
                    </div>

                    {/* Biomarker Evidence Weights */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-black uppercase text-slate-400">
                        Biomarker Evidence Chain
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {msg.xaiResult.biomarkerEvidenceChain.slice(0, 4).map((ev, eIdx) => (
                          <div
                            key={eIdx}
                            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-900 dark:text-white truncate">
                                {ev.biomarker}
                              </span>
                              <span className="text-[10px] font-black text-blue-600">
                                {ev.diagnosticContributionPercentage}% Weight
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-slate-500">
                              <span className="text-rose-600 font-bold">{ev.observedValue}</span>
                              <span>•</span>
                              <span>Baseline: {ev.standardBaseline}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* The 4 Guidance Quadrants */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {/* Precautions */}
                      <div className="p-3 rounded-2xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40 space-y-1">
                        <span className="text-[10px] font-black uppercase text-rose-700 dark:text-rose-300 flex items-center gap-1">
                          <Shield className="h-3 w-3" /> 1. What Precautions to Take
                        </span>
                        <p className="text-slate-700 dark:text-slate-300 leading-snug">
                          {msg.xaiResult.precautions[0]?.instruction}
                        </p>
                      </div>

                      {/* What to Avoid */}
                      <div className="p-3 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 space-y-1">
                        <span className="text-[10px] font-black uppercase text-amber-700 dark:text-amber-300 flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" /> 2. What to Avoid
                        </span>
                        <p className="text-slate-700 dark:text-slate-300 leading-snug">
                          Avoid: <strong>{msg.xaiResult.whatToAvoid[0]?.item}</strong>. {msg.xaiResult.whatToAvoid[0]?.whyAvoid}
                        </p>
                      </div>

                      {/* What to Eat */}
                      <div className="p-3 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 space-y-1">
                        <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                          <Apple className="h-3 w-3" /> 3. What to Eat (Diet)
                        </span>
                        <p className="text-slate-700 dark:text-slate-300 leading-snug">
                          Consume: <strong>{msg.xaiResult.whatToEat[0]?.food}</strong> ({msg.xaiResult.whatToEat[0]?.portion}). {msg.xaiResult.whatToEat[0]?.benefits}
                        </p>
                      </div>

                      {/* What to Do */}
                      <div className="p-3 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 space-y-1">
                        <span className="text-[10px] font-black uppercase text-blue-700 dark:text-blue-300 flex items-center gap-1">
                          <Dumbbell className="h-3 w-3" /> 4. What to Do (Actions)
                        </span>
                        <p className="text-slate-700 dark:text-slate-300 leading-snug">
                          {msg.xaiResult.whatToDo[0]?.action} ({msg.xaiResult.whatToDo[0]?.frequency}). {msg.xaiResult.whatToDo[0]?.instruction}
                        </p>
                      </div>
                    </div>

                    {/* Recommended Doctors with 1-Click Booking */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-slate-400">
                          Recommended Medyora Specialists
                        </span>
                        <Link
                          to="/doctors"
                          search={{ q: msg.xaiResult.recommendedDoctorQuery }}
                          className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-0.5"
                        >
                          View all <ArrowRight className="h-2.5 w-2.5" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {msg.xaiResult.suggestedDoctors.slice(0, 2).map((doc) => (
                          <div
                            key={doc.id}
                            className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 flex items-center justify-between gap-2"
                          >
                            <div className="flex items-center gap-2.5 overflow-hidden">
                              <img
                                src={doc.image}
                                alt={doc.fullName}
                                className="w-10 h-10 rounded-xl object-cover shrink-0"
                              />
                              <div className="overflow-hidden space-y-0.5">
                                <h5 className="font-black text-slate-900 dark:text-white truncate">
                                  {doc.fullName}
                                </h5>
                                <p className="text-[10px] text-blue-600 font-bold truncate">
                                  {doc.speciality} • ₹{doc.fee}
                                </p>
                              </div>
                            </div>
                            <Button
                              asChild
                              size="sm"
                              className="h-8 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0"
                            >
                              <Link to="/booking/$doctorId" params={{ doctorId: doc.id }}>
                                Book
                              </Link>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {msg.sender === "user" && (
                <div className="h-8 w-8 rounded-xl bg-slate-900 dark:bg-slate-800 text-white shrink-0 flex items-center justify-center shadow-xs">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-2 items-center text-slate-400 text-xs pl-2">
              <Bot className="h-4 w-4 animate-spin text-blue-500" />
              <span>Medyora Clinical AI is analyzing...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            {/* Attachment Button */}
            <label
              className="p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 cursor-pointer transition-colors shrink-0"
              title="Attach Medical Report"
            >
              <Upload className="h-5 w-5" />
              <input
                type="file"
                accept=".pdf,image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    const file = e.target.files[0];
                    const customRep: SpecialtyReportItem = {
                      id: `rep-${Date.now()}`,
                      specialtyId: activeSpecialty || "cardiology",
                      title: file.name.replace(/\.[^/.]+$/, ""),
                      date: "Today",
                      labName: "Uploaded Diagnostic",
                      fileType: "lab_blood",
                      extractedTextSnippet: "Uploaded file",
                      parameters: [],
                    };
                    handleAnalyzeReport(customRep);
                  }
                }}
              />
            </label>

            {/* Speech Microphone Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={toggleVoiceListen}
              className={`h-11 w-11 rounded-2xl shrink-0 transition-colors ${
                isListening
                  ? "bg-rose-600 text-white animate-pulse"
                  : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900"
              }`}
              title={isListening ? "Listening..." : "Click to speak"}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>

            {/* Text Input */}
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                activeSpecialty
                  ? `Describe your ${activeSpecialty} symptoms or ask a question...`
                  : "Type 'Hi', describe your symptoms, or ask any health question..."
              }
              className="h-12 rounded-2xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500"
            />

            {/* Send Button */}
            <Button
              type="submit"
              disabled={!inputText.trim()}
              className="h-12 px-5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/20 shrink-0 flex items-center gap-1.5"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Storage helpers
function loadSavedChatSessions(): ChatSessionHistory[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_SESSIONS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCurrentSession(id: string, messages: ChatBotMessage[]) {
  if (typeof window === "undefined" || messages.length <= 1) return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_SESSIONS);
    const existing: ChatSessionHistory[] = raw ? JSON.parse(raw) : [];
    const firstUserMsg = messages.find((m) => m.sender === "user")?.text.slice(0, 35) || "Health Consultation";
    const title = firstUserMsg.length > 30 ? `${firstUserMsg}...` : firstUserMsg;

    const filtered = existing.filter((s) => s.id !== id);
    const updated: ChatSessionHistory[] = [
      {
        id,
        title,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        messages,
      },
      ...filtered.slice(0, 15),
    ];

    window.localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(updated));
  } catch {
    // Ignore storage quota
  }
}
