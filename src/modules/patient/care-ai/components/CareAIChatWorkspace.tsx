import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  Mic,
  MicOff,
  Upload,
  Activity,
  Heart,
  FileText,
  ChevronRight,
  ArrowRight,
  ShieldAlert,
  Bot,
  User,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ORGAN_SYSTEMS, type OrganSystemItem } from "../data/organ-systems-data";
import { toast } from "sonner";

export interface ChatWorkspaceMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  isInitialStructure?: boolean;
  systemId?: string;
}

interface CareAIChatWorkspaceProps {
  selectedOrgan: OrganSystemItem;
  onOpenUpload: () => void;
  onOpenAddVitals: () => void;
  onOpenDeepDive: () => void;
  onSelectActionCard: (actionType: "upload" | "symptoms" | "vitals" | "recommendations") => void;
}

export function CareAIChatWorkspace({
  selectedOrgan,
  onOpenUpload,
  onOpenAddVitals,
  onOpenDeepDive,
  onSelectActionCard,
}: CareAIChatWorkspaceProps) {
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Dynamic conversation state tailored to active organ
  const [conversation, setConversation] = useState<ChatWorkspaceMessage[]>([
    {
      id: "ai-initial-1",
      sender: "ai",
      text: `Hello Ritik! 👋\nI'm Medyora AI. You can ask me anything about your ${selectedOrgan.shortName.toLowerCase()} health — symptoms, reports, medicines, lifestyle, diet or even upload your diagnostic log for analysis.\n\nHow can I help you today?`,
      timestamp: "10:24 AM",
      systemId: selectedOrgan.id,
    },
    {
      id: "user-initial-2",
      sender: "user",
      text: `I want to understand my ${selectedOrgan.shortName.toLowerCase()} health`,
      timestamp: "10:25 AM",
      systemId: selectedOrgan.id,
    },
    {
      id: "ai-initial-3",
      sender: "ai",
      text: `Great! I can help you understand your ${selectedOrgan.shortName.toLowerCase()} health. You can explore the options below:`,
      timestamp: "10:25 AM",
      isInitialStructure: true,
      systemId: selectedOrgan.id,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // When organ switches, adapt the conversation context smoothly
  useEffect(() => {
    setConversation([
      {
        id: `ai-${selectedOrgan.id}-1`,
        sender: "ai",
        text: `Hello Ritik! 👋\nI'm Medyora AI. You can ask me anything about your ${selectedOrgan.shortName.toLowerCase()} health — symptoms, reports, medicines, lifestyle, diet or even upload your diagnostic log for analysis.\n\nHow can I help you today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        systemId: selectedOrgan.id,
      },
      {
        id: `user-${selectedOrgan.id}-2`,
        sender: "user",
        text: `I want to understand my ${selectedOrgan.shortName.toLowerCase()} health`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        systemId: selectedOrgan.id,
      },
      {
        id: `ai-${selectedOrgan.id}-3`,
        sender: "ai",
        text: `Great! I can help you understand your ${selectedOrgan.shortName.toLowerCase()} health. You can explore the options below:`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isInitialStructure: true,
        systemId: selectedOrgan.id,
      },
    ]);
  }, [selectedOrgan.id]);

  // Voice setup
  useEffect(() => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-IN";

      rec.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        if (transcript) {
          handleSendMessage(transcript);
        }
        setIsListening(false);
      };

      rec.onerror = () => setIsListening(false);
      rec.onend = () => setIsListening(false);
      recognitionRef.current = rec;
    }
  }, []);

  const toggleVoice = () => {
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
      toast.info("Listening... Speak your health question clearly.");
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const raw = (textToSend || inputText).trim();
    if (!raw) return;

    const userMsg: ChatWorkspaceMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: raw,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setConversation((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // AI Medical Intelligence Response
    setTimeout(() => {
      let replyText = "";
      const lower = raw.toLowerCase();

      if (lower.includes("bp") || lower.includes("blood pressure")) {
        replyText = `Based on clinical guidelines for ${selectedOrgan.name}, an optimal blood pressure target is under 120/80 mmHg. High readings increase shear stress on endothelial blood vessel walls. Would you like to upload your BP log for automated trend analysis?`;
      } else if (lower.includes("ecg") || lower.includes("report")) {
        replyText = `I can analyze your ${selectedOrgan.shortName} diagnostic reports (ECG, blood panels, or imaging). Tap the "Upload Report" button below to extract biomarker values, check reference ranges, and view potential concerns.`;
      } else if (lower.includes("diet") || lower.includes("food") || lower.includes("eat")) {
        replyText = `For ${selectedOrgan.shortName} optimization, current evidence recommends: ${selectedOrgan.lifestyleTips[0]} and ${selectedOrgan.lifestyleTips[1]}. Avoid excess ultra-processed foods and high sodium intake.`;
      } else if (lower.includes("symptom") || lower.includes("pain")) {
        replyText = `Common symptoms associated with the ${selectedOrgan.systemName} include: ${selectedOrgan.symptoms.slice(0, 3).join(", ")}. If you are experiencing sudden severe pain or shortness of breath, seek emergency medical care immediately (112/108).`;
      } else {
        replyText = `I have analyzed your query regarding ${selectedOrgan.name}. In clinical practice, monitoring ${selectedOrgan.quickStats.map((s) => s.label).join(", ")} provides early indicators. Would you like to explore targeted lifestyle precautions or consult a verified ${selectedOrgan.doctorSpecialistName}?`;
      }

      const aiReply: ChatWorkspaceMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setConversation((prev) => [...prev, aiReply]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="flex flex-col h-[740px] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm font-sans overflow-hidden">
      {/* Scrollable Conversation Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 scrollbar-thin">
        {conversation.map((msg, index) => {
          if (msg.sender === "user") {
            return (
              <div key={msg.id} className="flex justify-end gap-2.5">
                <div className="max-w-xl space-y-1 text-right">
                  <div className="inline-block px-4 py-2.5 rounded-2xl rounded-tr-none bg-blue-600 text-white text-xs font-semibold shadow-md leading-relaxed text-left">
                    {msg.text}
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium pr-1">{msg.timestamp}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-700 dark:text-blue-300 shrink-0 font-black text-xs">
                  R
                </div>
              </div>
            );
          }

          // AI Sender Message
          return (
            <div key={msg.id} className="flex items-start gap-3">
              {/* AI Brand Avatar */}
              <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-cyan-400/40 shadow-md shadow-blue-500/20 shrink-0 bg-slate-900">
                <img
                  src="/ai_doctor_robot.jpg"
                  alt="Medyora AI Robot Doctor"
                  className="w-full h-full object-cover object-[50%_25%]"
                />
              </div>

              <div className="space-y-3 max-w-2xl w-full">
                {/* Bubble Text */}
                <div className="p-4 rounded-2xl rounded-tl-none bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-750 text-slate-800 dark:text-slate-200 text-xs font-medium leading-relaxed whitespace-pre-line shadow-xs">
                  {msg.text}
                </div>

                {/* Prompt Pills (Shown below the initial greeting) */}
                {index === 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {selectedOrgan.promptPills.map((pill, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => handleSendMessage(pill)}
                        className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 text-[11px] font-bold shadow-2xs transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
                      >
                        <span className="text-blue-500">⦿</span>
                        <span>{pill}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Structured Interactive Action Cards + 3D Featured Organ Banner (Matching Reference Images 1 & 2!) */}
                {msg.isInitialStructure && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
                    {/* Left Column: 4 Interactive Action Cards (7 cols) */}
                    <div className="md:col-span-7 flex flex-col gap-2">
                      {selectedOrgan.actionCards.map((card, cIdx) => (
                        <div
                          key={cIdx}
                          onClick={() => onSelectActionCard(card.actionType)}
                          className="p-3 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-400 dark:hover:border-blue-600 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="h-8 w-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                              {card.actionType === "upload" && <FileText className="h-4 w-4" />}
                              {card.actionType === "symptoms" && <Activity className="h-4 w-4" />}
                              {card.actionType === "vitals" && <Heart className="h-4 w-4" />}
                              {card.actionType === "recommendations" && <Sparkles className="h-4 w-4" />}
                            </div>

                            <div className="min-w-0">
                              <h4 className="text-xs font-black text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {card.title}
                              </h4>
                              <p className="text-[10px] text-slate-400 font-medium truncate">
                                {card.description}
                              </p>
                            </div>
                          </div>

                          <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-transform group-hover:translate-x-1 shrink-0" />
                        </div>
                      ))}
                    </div>

                    {/* Right Column: Featured Organ Card with 3D Holographic Visual (5 cols) */}
                    <div className="md:col-span-5 relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#071530] via-[#091b3d] to-[#040c1d] border border-blue-900/50 p-4 text-white shadow-xl flex flex-col justify-between group">
                      <div className="relative z-10 space-y-1">
                        <h3 className="text-xs sm:text-sm font-black text-white leading-snug">
                          {selectedOrgan.featuredCardTagline}
                        </h3>
                        <p className="text-[10px] text-slate-300 font-medium">
                          Understand. Prevent. Live Better.
                        </p>
                      </div>

                      {/* 3D Anatomical Organ Image with Glow */}
                      <div className="relative my-2 h-28 w-full flex items-center justify-center overflow-hidden">
                        <img
                          src={selectedOrgan.illustration}
                          alt={selectedOrgan.name}
                          className="h-full w-auto object-contain transform transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_10px_20px_rgba(59,130,246,0.35)]"
                        />
                      </div>

                      {/* Explore Button */}
                      <div className="relative z-10 pt-1">
                        <Button
                          onClick={onOpenDeepDive}
                          size="sm"
                          className="w-full h-8 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-[11px] shadow-md flex items-center justify-center gap-1.5 transition-all hover:scale-102 active:scale-98"
                        >
                          <span>Explore {selectedOrgan.shortName} Health</span>
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <p className="text-[10px] text-slate-400 font-medium pl-1">{msg.timestamp}</p>
              </div>
            </div>
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 italic">
            <div className="h-2 w-2 rounded-full bg-blue-600 animate-ping" />
            <span>Medyora AI is analyzing clinical evidence...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Bar: Action Toolbar + Chat Input + Disclaimer */}
      <div className="p-3 sm:p-4 bg-slate-50/80 dark:bg-slate-950/80 border-t border-slate-200/80 dark:border-slate-800 space-y-2.5 backdrop-blur-md">
        {/* Quick Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={onOpenUpload}
            size="sm"
            variant="outline"
            className="h-8 px-3 rounded-xl bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] shadow-2xs flex items-center gap-1.5 hover:border-blue-400 hover:text-blue-600"
          >
            <Upload className="h-3 w-3 text-blue-500" />
            <span>Upload Report</span>
          </Button>

          <Button
            onClick={onOpenAddVitals}
            size="sm"
            variant="outline"
            className="h-8 px-3 rounded-xl bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] shadow-2xs flex items-center gap-1.5 hover:border-blue-400 hover:text-blue-600"
          >
            <Heart className="h-3 w-3 text-rose-500" />
            <span>Add Vitals</span>
          </Button>

          <Button
            onClick={toggleVoice}
            size="sm"
            variant="outline"
            className={`h-8 px-3 rounded-xl border font-bold text-[11px] shadow-2xs flex items-center gap-1.5 transition-all ${
              isListening
                ? "bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-600 animate-pulse"
                : "bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400 hover:text-blue-600"
            }`}
          >
            {isListening ? <MicOff className="h-3 w-3 text-rose-600" /> : <Mic className="h-3 w-3 text-rose-500" />}
            <span>{isListening ? "Listening..." : "Voice Input"}</span>
          </Button>

          <Button
            onClick={onOpenDeepDive}
            size="sm"
            variant="outline"
            className="h-8 px-3 rounded-xl bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] shadow-2xs flex items-center gap-1.5 hover:border-indigo-400 hover:text-indigo-600"
          >
            <Zap className="h-3 w-3 text-indigo-500" />
            <span>Deep Analysis</span>
          </Button>
        </div>

        {/* Input Field with Mic and Send Button */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center"
        >
          <div className="absolute left-3.5 flex items-center text-slate-400 pointer-events-none">
            <Mic className="h-4 w-4" />
          </div>

          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask anything about your health..."
            className="h-12 pl-10 pr-14 rounded-2xl bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white shadow-inner focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="absolute right-2 h-8 w-8 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>

        {/* Official Medical Disclaimer */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500 font-medium text-center">
          <ShieldAlert className="h-3 w-3 text-amber-500 shrink-0" />
          <span>
            Medyora AI provides general health information and is not a substitute for professional medical advice, diagnosis, or treatment.
          </span>
        </div>
      </div>
    </div>
  );
}
