import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import {
  Sparkles,
  Bot,
  Send,
  Mic,
  X,
  User,
  Stethoscope,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Volume2,
  ShieldCheck,
  HeartPulse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { DOCTORS } from "@/shared/data/mock";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  recommendedDoctors?: typeof DOCTORS;
  actionLinks?: { label: string; to: string }[];
}

const QUICK_PROMPTS = [
  "I have a throbbing headache & fever",
  "Is chest pain serious?",
  "Suggest home remedies for acid reflux",
  "When should I see a dermatologist for acne?",
  "Recommend top cardiologists near me",
];

export function CareAIChatModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-msg",
      sender: "ai",
      text: "Hello! I am Medyora Care AI, your 24/7 intelligent health assistant. Describe your symptoms, ask medical questions, or request doctor recommendations.",
      timestamp: "Just now",
      actionLinks: [
        { label: "Book Doctor", to: "/doctors" },
        { label: "Book Lab Tests", to: "/patient/lab-tests" },
        { label: "Ask Community", to: "/patient/feed" },
      ],
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // AI Response Engine Simulation
    setTimeout(() => {
      let aiResponseText = "";
      let recDocs: typeof DOCTORS | undefined = undefined;
      let links: { label: string; to: string }[] | undefined = undefined;

      const lower = query.toLowerCase();

      if (
        lower.includes("chest pain") ||
        lower.includes("heart") ||
        lower.includes("stroke") ||
        lower.includes("emergency")
      ) {
        aiResponseText =
          "⚠️ EMERGENCY ALERT: Chest pain or sudden shortness of breath can be a sign of a cardiac event. If you experience radiating pain to the arm, jaw, sweating, or dizziness, call an ambulance (112) or go to the nearest emergency room immediately.";
        recDocs = DOCTORS.filter((d) => d.speciality.toLowerCase().includes("cardio")).slice(0, 2);
        links = [{ label: "Book Senior Cardiologist", to: "/doctors" }];
      } else if (lower.includes("headache") || lower.includes("fever")) {
        aiResponseText =
          "Mild headache and low-grade fever are commonly associated with viral infections, tension, or dehydration. Stay well-hydrated, rest in a quiet dark room, and monitor your temperature. If fever exceeds 102°F or lasts >3 days, consult a physician.";
        recDocs = DOCTORS.filter((d) => d.speciality.toLowerCase().includes("physician")).slice(
          0,
          2,
        );
        links = [
          { label: "Book General Physician", to: "/doctors" },
          { label: "Complete Blood Count Test", to: "/patient/lab-tests" },
        ];
      } else if (lower.includes("skin") || lower.includes("acne") || lower.includes("hair")) {
        aiResponseText =
          "For persistent acne and skin inflammation, a dermatologist can formulate a personalized routine with active ingredients like Salicylic acid, Retinoids, or Azelaic acid. Avoid picking blemishes to prevent scarring.";
        recDocs = DOCTORS.filter((d) => d.speciality.toLowerCase().includes("derma")).slice(0, 2);
        links = [{ label: "Consult Dermatologist", to: "/doctors" }];
      } else {
        aiResponseText = `Thank you for sharing your query regarding "${query}". Based on general medical protocols, persistent symptoms should always be clinically evaluated by a verified specialist. Here are top recommended doctors available today:`;
        recDocs = DOCTORS.slice(0, 2);
        links = [
          { label: "Find Doctors", to: "/doctors" },
          { label: "Book Video Consult", to: "/patient/consult" },
        ];
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        recommendedDoctors: recDocs,
        actionLinks: links,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleVoiceSimulate = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setInputText("I have continuous stomach ache and acidity since yesterday");
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-2xl h-[85vh] max-h-[720px] bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden"
          role="dialog"
          aria-label="Medyora Care AI Assistant"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center justify-between shrink-0 shadow-md">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white shadow-inner">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base">Ask Care AI</h3>
                  <span className="text-[10px] font-black uppercase bg-emerald-400 text-slate-950 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-950 animate-ping" /> Online
                  </span>
                </div>
                <p className="text-xs text-blue-100">Medical Q&A, Symptom Checker & Doctor Match</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Close Care AI Modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50 dark:bg-slate-950/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "ai" && (
                  <div className="h-8 w-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 text-sm leading-relaxed shadow-sm ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-700/80 rounded-bl-none"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Recommended Doctors Card Preview */}
                  {msg.recommendedDoctors && msg.recommendedDoctors.length > 0 && (
                    <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-700 space-y-2">
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Recommended Specialists
                      </p>
                      <div className="grid gap-2">
                        {msg.recommendedDoctors.map((doc) => (
                          <Link
                            key={doc.id}
                            to="/doctors/$doctorId"
                            params={{ doctorId: doc.id }}
                            onClick={onClose}
                            className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 hover:border-blue-500 transition-colors"
                          >
                            <img
                              src={doc.image}
                              alt={doc.fullName}
                              className="h-10 w-10 rounded-xl object-cover"
                            />
                            <div className="min-w-0 flex-1">
                              <h5 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                                {doc.fullName}
                              </h5>
                              <p className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
                                {doc.speciality} • ₹{doc.fee}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              className="h-7 text-[11px] rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              Book
                            </Button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Link Chips */}
                  {msg.actionLinks && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {msg.actionLinks.map((link) => (
                        <Link
                          key={link.to + link.label}
                          to={link.to}
                          onClick={onClose}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-colors"
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      ))}
                    </div>
                  )}

                  <span
                    className={`block mt-2 text-[10px] text-right ${
                      msg.sender === "user" ? "text-blue-200" : "text-slate-400"
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === "user" && (
                  <div className="h-8 w-8 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 mt-1">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs font-medium pl-11">
                <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce" />
                <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce delay-100" />
                <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce delay-200" />
                <span>Medyora AI is analyzing symptoms...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-x-auto flex gap-2 no-scrollbar shrink-0">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200/60 dark:border-slate-700 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleVoiceSimulate}
                className={`rounded-2xl shrink-0 h-12 w-12 ${
                  isRecording
                    ? "bg-red-50 text-red-600 border-red-300 animate-pulse"
                    : "border-slate-200 dark:border-slate-700"
                }`}
                title="Voice symptom input"
              >
                <Mic className="h-5 w-5" />
              </Button>

              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask Care AI about symptoms, medicines, tests..."
                className="h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-sm px-4 focus-visible:ring-2 focus-visible:ring-blue-600"
              />

              <Button
                type="submit"
                disabled={!inputText.trim()}
                className="h-12 px-5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold shrink-0 shadow-md shadow-blue-600/30"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>

            <p className="mt-2 text-[10px] text-center text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck className="h-3 w-3 text-blue-500" />
              Care AI provides educational insights and does not replace official physician
              diagnosis.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
