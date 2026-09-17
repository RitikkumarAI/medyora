import { useState, useRef, useEffect } from "react";
import {
  Mic,
  MicOff,
  Send,
  Paperclip,
  Image as ImageIcon,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Heart,
  Activity,
  Smile,
  Stethoscope,
  Maximize2,
  AlertCircle,
  FileCheck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ORGAN_SYSTEMS, type OrganSystemItem } from "../data/organ-systems-data";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import {
  analyzeQueryWithClinicalAI,
  formatClinicalConsultationMarkdown,
  type ClinicalConsultationResult,
} from "../services/clinical-knowledge-engine";

export interface AnatomicalVisualData {
  organName: string;
  systemName: string;
  image: string;
  focusArea: string;
  keyMetric: string;
  status: string;
  recommendedSpecialist: string;
  suggestedTests: string[];
  lifestylePrecautions: string[];
}

export interface ChatWorkspaceMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
  isOrganFeaturedCard?: boolean;
  systemId?: string;
  anatomicalVisual?: AnatomicalVisualData;
  consultationResult?: ClinicalConsultationResult;
}

interface CareAIChatWorkspaceProps {
  selectedOrgan: OrganSystemItem;
  onOpenUpload: () => void;
  onOpenAddVitals: () => void;
  onOpenDeepDive: () => void;
  onSelectActionCard: (actionType: "upload" | "symptoms" | "vitals" | "recommendations") => void;
  chatInitiateTrigger?: number;
}


export function CareAIChatWorkspace({
  selectedOrgan,
  onOpenUpload,
  onOpenAddVitals,
  onOpenDeepDive,
  onSelectActionCard,
  chatInitiateTrigger,
}: CareAIChatWorkspaceProps) {
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Initial State: EMPTY. No pre-started conversation.
  const [conversation, setConversation] = useState<ChatWorkspaceMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Triggered when user clicks "Chat with AI" in the hero banner
  useEffect(() => {
    if (chatInitiateTrigger && chatInitiateTrigger > 0) {
      initiateConversation();
    }
  }, [chatInitiateTrigger]);

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

  const initiateConversation = (customQuery?: string) => {
    const userQueryText = customQuery || `I want to understand my ${selectedOrgan.shortName.toLowerCase()} health`;

    // 1. Initial AI Greeting
    const greetingMsg: ChatWorkspaceMessage = {
      id: `ai-greet-${Date.now()}`,
      sender: "ai",
      text: `Hello Ritik! 👋\nI'm Medyora AI. You can ask me anything about your ${selectedOrgan.shortName.toLowerCase()} health — symptoms, reports, medicines, lifestyle, or preventive care.\n\nHow can I help you today?`,
      timestamp: "10:24 AM",
      systemId: selectedOrgan.id,
    };

    // 2. User Query Message
    const userMsg: ChatWorkspaceMessage = {
      id: `user-query-${Date.now() + 1}`,
      sender: "user",
      text: userQueryText,
      timestamp: "10:25 AM",
      systemId: selectedOrgan.id,
    };

    // 3. AI Structured Response with 3D Organ Banner matching Reference Image
    const organBannerMsg: ChatWorkspaceMessage = {
      id: `ai-card-${Date.now() + 2}`,
      sender: "ai",
      text: "",
      timestamp: "10:25 AM",
      isOrganFeaturedCard: true,
      systemId: selectedOrgan.id,
    };

    setConversation([greetingMsg, userMsg, organBannerMsg]);
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSendMessage = (textToSend?: string) => {
    const raw = (textToSend || inputText).trim();
    if (!raw) return;

    // If conversation is not started yet, initiate with user's prompt
    if (conversation.length === 0) {
      initiateConversation(raw);
      setInputText("");
      return;
    }

    const userMsg: ChatWorkspaceMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: raw,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setConversation((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // AI Medical Intelligence Response with World-Class Clinical Engine & Embedded Anatomical Visual
    setTimeout(() => {
      const result = analyzeQueryWithClinicalAI(raw, selectedOrgan.id);
      const replyText = formatClinicalConsultationMarkdown(result);

      const aiReply: ChatWorkspaceMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        anatomicalVisual: result.anatomicalVisual,
        consultationResult: result,
      };

      setConversation((prev) => [...prev, aiReply]);
      setIsTyping(false);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, 600);
  };

  return (
    <div className="flex flex-col h-[520px] sm:h-[600px] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm font-sans overflow-hidden">
      {/* Scrollable Conversation Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-thin">
        {/* If conversation is empty: Show the clean Ready State */}
        {conversation.length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center text-center p-6 space-y-4">
            <div className="h-16 w-16 rounded-3xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 flex items-center justify-center p-2 shadow-inner">
              <img
                src="/ai_doctor_robot.jpg"
                alt="Medyora AI Robot"
                className="w-full h-full object-cover object-[50%_20%] rounded-2xl"
              />
            </div>
            <div className="space-y-1.5 max-w-md">
              <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                Medyora Care AI is Ready
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Ask anything about any health symptom, disease, or organ to receive an in-depth clinical explanation with an anatomical visual.
              </p>
            </div>

            {/* Ready State Quick Action Pills */}
            <div className="flex flex-wrap justify-center gap-2 pt-2 max-w-lg">
              {selectedOrgan.promptPills.map((pill, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => initiateConversation(pill)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-850 hover:bg-blue-50 dark:hover:bg-blue-950 border border-slate-200 dark:border-slate-750 hover:border-blue-400 text-slate-700 dark:text-slate-300 hover:text-blue-600 text-xs font-bold shadow-2xs transition-all hover:scale-102 flex items-center gap-1.5"
                >
                  <span className="text-blue-500">⦿</span>
                  <span>{pill}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          conversation.map((msg, index) => {
            if (msg.sender === "user") {
              return (
                <div key={msg.id} className="flex justify-end items-end gap-2.5">
                  <div className="max-w-xl space-y-1 text-right">
                    <div className="inline-block px-4 py-2.5 rounded-2xl rounded-tr-none bg-blue-600 text-white text-xs font-semibold shadow-md leading-relaxed text-left">
                      {msg.text}
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium pr-1">{msg.timestamp}</p>
                  </div>
                  <div className="h-8 w-8 rounded-full overflow-hidden border border-blue-200 dark:border-blue-800 bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-700 dark:text-blue-300 shrink-0 font-black text-xs">
                    <span>R</span>
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
                  {/* Clinical Triage & Guideline Badges Header */}
                  {msg.consultationResult && (
                    <div className="flex flex-wrap items-center gap-2">
                      {msg.consultationResult.severity === "emergency" && (
                        <span className="px-2.5 py-1 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 font-black text-[10px] flex items-center gap-1 animate-pulse">
                          <AlertCircle className="h-3 w-3 text-rose-400" />
                          <span>🚨 Critical Emergency Triage</span>
                        </span>
                      )}
                      {msg.consultationResult.severity === "urgent" && (
                        <span className="px-2.5 py-1 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-black text-[10px] flex items-center gap-1">
                          <AlertCircle className="h-3 w-3 text-amber-400" />
                          <span>⚠️ Urgent Clinical Review</span>
                        </span>
                      )}
                      {msg.consultationResult.severity === "moderate" && (
                        <span className="px-2.5 py-1 rounded-xl bg-blue-500/20 border border-blue-500/40 text-cyan-300 font-black text-[10px] flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3 text-cyan-400" />
                          <span>Clinical Diagnostic Assessment</span>
                        </span>
                      )}
                      {msg.consultationResult.severity === "routine" && (
                        <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-black text-[10px] flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                          <span>Evidence-Based Clinical Protocol</span>
                        </span>
                      )}

                      {/* Clinical Guideline Tags */}
                      {msg.consultationResult.guidelineCitations.slice(0, 2).map((guide, gIdx) => (
                        <span
                          key={gIdx}
                          className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700 text-slate-300 text-[9px] font-bold"
                        >
                          {guide.split(":")[0].split(" ")[0]} Verified
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Bubble Text with Markdown/Clinical Formatting */}
                  {msg.text && (
                    <div className="p-4 sm:p-5 rounded-2xl rounded-tl-none bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-750 text-slate-800 dark:text-slate-200 text-xs font-medium leading-relaxed whitespace-pre-line shadow-xs">
                      {msg.text}
                    </div>
                  )}

                  {/* Differential Diagnosis Probabilities Visualizer */}
                  {msg.consultationResult && msg.consultationResult.differentialDiagnoses.length > 0 && (
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-750 shadow-xs space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-black text-slate-900 dark:text-white">
                        <span className="flex items-center gap-1.5">
                          <Activity className="h-3.5 w-3.5 text-blue-500" />
                          <span>Differential Diagnosis Probabilities (Clinical Triage)</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">Confidence Weighted</span>
                      </div>
                      <div className="space-y-2">
                        {msg.consultationResult.differentialDiagnoses.map((diff, dIdx) => (
                          <div key={dIdx} className="space-y-1">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                                <span>{diff.condition}</span>
                                {diff.isUrgent && (
                                  <span className="text-rose-500 text-[8px] font-black px-1 py-0.2 rounded bg-rose-100 dark:bg-rose-950 border border-rose-300 dark:border-rose-800">
                                    URGENT
                                  </span>
                                )}
                              </span>
                              <span className="font-black text-blue-600 dark:text-blue-400 text-[11px]">
                                {diff.probability}%
                              </span>
                            </div>
                            <Progress value={diff.probability} className="h-1.5 bg-slate-100 dark:bg-slate-800" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interactive Clinical Follow-Up Questions (Tap to Continue Consultation) */}
                  {msg.consultationResult && msg.consultationResult.followUpTriageQuestions.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <div className="text-[11px] font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3 text-blue-500" />
                        <span>Clinical Triage: Tap a follow-up to refine the diagnosis:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.consultationResult.followUpTriageQuestions.map((q, qIdx) => (
                          <button
                            key={qIdx}
                            onClick={() => handleSendMessage(q)}
                            className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900 border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs font-semibold shadow-2xs transition-all hover:scale-102 active:scale-98 text-left flex items-center gap-1"
                          >
                            <span className="text-blue-500 font-black">?</span>
                            <span>{q}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matched Medyora Super-Specialists Direct Booking Cards */}
                  {msg.consultationResult && msg.consultationResult.matchedDoctors.length > 0 && (
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-850/80 border border-slate-200/80 dark:border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                          <Stethoscope className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                          <span>Recommended {msg.consultationResult.recommendedSpecialist}s</span>
                        </span>
                        <Link to="/doctors" className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline">
                          View All
                        </Link>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {msg.consultationResult.matchedDoctors.slice(0, 2).map((doc) => (
                          <div
                            key={doc.id}
                            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-750 flex items-center justify-between gap-2 shadow-2xs"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <img
                                src={doc.image}
                                alt={doc.name}
                                className="h-8 w-8 rounded-full object-cover shrink-0 border border-blue-200 dark:border-blue-800"
                              />
                              <div className="min-w-0">
                                <div className="text-xs font-black text-slate-900 dark:text-white truncate">{doc.name}</div>
                                <div className="text-[10px] text-slate-500 truncate">
                                  {doc.hospital} • {doc.experience}y exp
                                </div>
                              </div>
                            </div>
                            <Link
                              to="/doctors"
                              className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] shrink-0 shadow-xs transition-all hover:scale-102"
                            >
                              Consult
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* AI Provided Anatomical Visual for Specific Disease */}
                  {msg.anatomicalVisual && (
                    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#03112c] via-[#071a3d] to-[#041229] border border-blue-900/60 p-4 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                      {/* Left: Disease / Organ Context Details */}
                      <div className="space-y-2 max-w-xs text-center sm:text-left z-10">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-[10px] font-black uppercase">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>AI Visual Clinical Anchor</span>
                        </div>

                        <div>
                          <h4 className="text-sm font-black text-white">
                            {msg.anatomicalVisual.organName} ({msg.anatomicalVisual.systemName})
                          </h4>
                          <p className="text-[11px] text-slate-300 font-medium">
                            Target: {msg.anatomicalVisual.focusArea}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {msg.anatomicalVisual.suggestedTests.map((test, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded-lg bg-slate-900/80 border border-blue-800/60 text-slate-200 text-[9px] font-bold"
                            >
                              {test}
                            </span>
                          ))}
                        </div>

                        <div className="pt-2 flex items-center gap-2">
                          <Button
                            onClick={onOpenDeepDive}
                            size="sm"
                            className="h-7 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-[10px] shadow-sm flex items-center gap-1"
                          >
                            <span>Explore Anatomy Scan</span>
                            <Maximize2 className="h-3 w-3" />
                          </Button>

                          <Link
                            to="/doctors"
                            className="h-7 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] shadow-sm flex items-center gap-1 transition-all"
                          >
                            <Stethoscope className="h-3 w-3" />
                            <span>Consult Specialist</span>
                          </Link>
                        </div>
                      </div>

                      {/* Right: Anatomical Scan Visual */}
                      <div className="relative h-32 w-32 sm:h-36 sm:w-36 rounded-2xl overflow-hidden bg-[#020718] border border-blue-900/60 p-2 flex items-center justify-center shrink-0 shadow-inner">
                        <img
                          src={msg.anatomicalVisual.image}
                          alt={msg.anatomicalVisual.organName}
                          className="h-full w-full object-contain drop-shadow-[0_8px_16px_rgba(34,211,238,0.4)]"
                        />
                        <div className="absolute bottom-1.5 left-1 right-1 text-center">
                          <span className="text-[8px] font-black text-cyan-200 bg-slate-950/90 px-1.5 py-0.5 rounded border border-blue-800/60">
                            {msg.anatomicalVisual.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}


                  {/* Prompt Pills (Shown below the initial greeting) */}
                  {index === 0 && (
                    <div className="flex flex-wrap gap-2 pt-0.5">
                      {selectedOrgan.promptPills.map((pill, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => handleSendMessage(pill)}
                          className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 text-[11px] font-bold shadow-2xs transition-all hover:scale-102 flex items-center gap-1.5"
                        >
                          <span className="text-blue-500">⦿</span>
                          <span>{pill}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* AI Response Card: Wide Organ Banner with 3D Heart + Take Care Today */}
                  {msg.isOrganFeaturedCard && (
                    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#03112c] via-[#071a3d] to-[#041229] border border-blue-900/50 p-4 sm:p-5 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                      {/* Left: Tagline & Explore Button */}
                      <div className="space-y-3 max-w-xs text-center sm:text-left z-10">
                        <div className="space-y-1">
                          <h3 className="text-sm sm:text-base font-black text-white leading-snug">
                            {selectedOrgan.featuredCardTagline || `A healthier ${selectedOrgan.shortName} leads to a brighter tomorrow.`}
                          </h3>
                          <p className="text-[11px] text-slate-300 font-medium">
                            Understand. Prevent. Live Better.
                          </p>
                        </div>

                        <Button
                          onClick={onOpenDeepDive}
                          size="sm"
                          className="h-8 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs shadow-md inline-flex items-center gap-1.5 transition-all hover:scale-102 active:scale-98"
                        >
                          <span>Explore {selectedOrgan.shortName} Health</span>
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Center: 3D Anatomical Organ Illustration */}
                      <div className="relative h-28 w-28 sm:h-32 sm:w-32 flex items-center justify-center shrink-0 z-10">
                        <img
                          src={selectedOrgan.illustration}
                          alt={selectedOrgan.name}
                          className="h-full w-full object-contain drop-shadow-[0_8px_16px_rgba(59,130,246,0.45)]"
                        />
                      </div>

                      {/* Right: Take Care Today 4 Action Pills in 2x2 Grid */}
                      <div className="space-y-2 text-center sm:text-right z-10">
                        <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                          Take Care Today
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => onSelectActionCard("vitals")}
                            className="px-2.5 py-1.5 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 border border-blue-800/60 text-slate-200 text-[10px] font-bold flex items-center justify-center gap-1 transition-all"
                          >
                            <Activity className="h-3 w-3 text-cyan-400" />
                            <span>Regular Checkups</span>
                          </button>

                          <button
                            onClick={() => handleSendMessage("What is the healthiest diet for this?")}
                            className="px-2.5 py-1.5 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 border border-blue-800/60 text-slate-200 text-[10px] font-bold flex items-center justify-center gap-1 transition-all"
                          >
                            <Sparkles className="h-3 w-3 text-emerald-400" />
                            <span>Healthy Diet</span>
                          </button>

                          <button
                            onClick={() => handleSendMessage("Recommend active lifestyle habits")}
                            className="px-2.5 py-1.5 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 border border-blue-800/60 text-slate-200 text-[10px] font-bold flex items-center justify-center gap-1 transition-all"
                          >
                            <Heart className="h-3 w-3 text-rose-400" />
                            <span>Stay Active</span>
                          </button>

                          <button
                            onClick={() => handleSendMessage("How to manage health stress?")}
                            className="px-2.5 py-1.5 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 border border-blue-800/60 text-slate-200 text-[10px] font-bold flex items-center justify-center gap-1 transition-all"
                          >
                            <Smile className="h-3 w-3 text-amber-400" />
                            <span>Manage Stress</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {msg.timestamp && (
                    <p className="text-[10px] text-slate-400 font-medium pl-1">{msg.timestamp}</p>
                  )}
                </div>
              </div>
            );
          })
        )}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 italic">
            <div className="h-2 w-2 rounded-full bg-blue-600 animate-ping" />
            <span>Medyora AI is analyzing clinical evidence...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Bar: Input with Voice, Attach, Image icons + Send Button + Disclaimer */}
      <div className="p-3 sm:p-3.5 bg-slate-50/90 dark:bg-slate-950/90 border-t border-slate-200/80 dark:border-slate-800 space-y-2 backdrop-blur-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center gap-2"
        >
          {/* Action Icons on the Left (Voice, Attachment, Image) */}
          <div className="flex items-center gap-1 pl-1 text-slate-400">
            <button
              type="button"
              onClick={toggleVoice}
              aria-label="Voice input"
              className={`h-8 w-8 rounded-xl flex items-center justify-center transition-all ${
                isListening
                  ? "bg-rose-50 text-rose-600 border border-rose-300 animate-pulse"
                  : "hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-600"
              }`}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={onOpenUpload}
              aria-label="Attach file"
              className="h-8 w-8 rounded-xl flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-600 transition-all"
            >
              <Paperclip className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={onOpenUpload}
              aria-label="Attach medical image"
              className="h-8 w-8 rounded-xl flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-600 transition-all"
            >
              <ImageIcon className="h-4 w-4" />
            </button>
          </div>

          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask anything about your health..."
            className="h-11 rounded-2xl bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium text-slate-900 dark:text-white shadow-inner focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <Send className="h-4 w-4" />
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
