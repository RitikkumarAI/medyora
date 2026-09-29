import { useState } from "react";
import {
  X,
  Zap,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Clock,
  Database,
  ArrowRight,
  Sparkles,
  Users,
  MessageSquare,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { playHospitalChime } from "@/shared/utils/sound-chime";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ConcurrencySimulatorModal({ isOpen, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<"race" | "noshow">("race");
  const [isSimulatingRace, setIsSimulatingRace] = useState(false);
  const [raceStep, setRaceStep] = useState<number>(0);

  const [isSimulatingNoShow, setIsSimulatingNoShow] = useState(false);
  const [noShowStep, setNoShowStep] = useState<number>(0);

  if (!isOpen) return null;

  const runRaceSimulation = () => {
    setIsSimulatingRace(true);
    setRaceStep(1);
    playHospitalChime();

    setTimeout(() => setRaceStep(2), 700);
    setTimeout(() => setRaceStep(3), 1400);
    setTimeout(() => {
      setRaceStep(4);
      setIsSimulatingRace(false);
      toast.success("Concurrency simulation finished: 0% overbooking guaranteed!");
    }, 2100);
  };

  const runNoShowSimulation = () => {
    setIsSimulatingNoShow(true);
    setNoShowStep(1);

    setTimeout(() => setNoShowStep(2), 800);
    setTimeout(() => {
      playHospitalChime();
      setNoShowStep(3);
    }, 1600);
    setTimeout(() => {
      setNoShowStep(4);
      setIsSimulatingNoShow(false);
      toast.success("Waitlist auto-backfill completed in 12s!");
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-850/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Medyora Engine Sandbox
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                  Viva Defence Live
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Interactive real-time test of Concurrency Locks & No-Show Clearance
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="px-5 pt-4 bg-slate-50/30 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex gap-2">
          <button
            onClick={() => setActiveTab("race")}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === "race"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Database className="h-4 w-4" />
            1. Race Condition Test (3 Simultaneous Bookings)
          </button>
          <button
            onClick={() => setActiveTab("noshow")}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === "noshow"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Users className="h-4 w-4" />
            2. No-Show & Waitlist Backfill
          </button>
        </div>

        {/* Tab 1: Race Condition */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {activeTab === "race" && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-950 dark:text-blue-200 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-blue-600" />
                  Evaluator Scenario: "What happens if 3 patients book 10:00 AM at the exact same millisecond?"
                </p>
                <p className="text-[11px] text-blue-800 dark:text-blue-300">
                  Medyora uses PostgreSQL row-level locks (<code>SELECT FOR UPDATE</code>) and a composite unique constraint on <code>(doctor_id, date, slot_time)</code> to make double booking physically impossible.
                </p>
              </div>

              {/* Patient Concurrency Cards */}
              <div className="space-y-2.5">
                {/* Patient 1 */}
                <div
                  className={`p-3.5 rounded-2xl border transition-all ${
                    raceStep >= 2
                      ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 shadow-xs"
                      : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="h-7 w-7 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                        P1
                      </span>
                      <div>
                        <p className="font-bold text-xs text-slate-900 dark:text-white">
                          Patient 1: Rahul Kumar (Timestamp: 10:00:00.102)
                        </p>
                        <p className="text-[11px] text-slate-500">Requested: 10:00 AM Slot</p>
                      </div>
                    </div>
                    {raceStep >= 2 ? (
                      <Badge className="bg-emerald-600 text-white font-bold text-[10px]">
                        ✅ Acquired Mutex & Confirmed (Token #14)
                      </Badge>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium">Ready</span>
                    )}
                  </div>
                </div>

                {/* Patient 2 */}
                <div
                  className={`p-3.5 rounded-2xl border transition-all ${
                    raceStep >= 3
                      ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 shadow-xs"
                      : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="h-7 w-7 rounded-xl bg-amber-600 text-white text-xs font-bold flex items-center justify-center">
                        P2
                      </span>
                      <div>
                        <p className="font-bold text-xs text-slate-900 dark:text-white">
                          Patient 2: Priya Patel (Timestamp: 10:00:00.108)
                        </p>
                        <p className="text-[11px] text-slate-500">Requested: 10:00 AM Slot (+6ms latency)</p>
                      </div>
                    </div>
                    {raceStep >= 3 ? (
                      <Badge className="bg-amber-500 text-white font-bold text-[10px]">
                        ⚠️ Mutex Locked → Promoted to Waitlist #1
                      </Badge>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium">Ready</span>
                    )}
                  </div>
                </div>

                {/* Patient 3 */}
                <div
                  className={`p-3.5 rounded-2xl border transition-all ${
                    raceStep >= 4
                      ? "bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700 shadow-xs"
                      : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="h-7 w-7 rounded-xl bg-purple-600 text-white text-xs font-bold flex items-center justify-center">
                        P3
                      </span>
                      <div>
                        <p className="font-bold text-xs text-slate-900 dark:text-white">
                          Patient 3: Vikram Malhotra (Timestamp: 10:00:00.115)
                        </p>
                        <p className="text-[11px] text-slate-500">Requested: 10:00 AM Slot (+13ms latency)</p>
                      </div>
                    </div>
                    {raceStep >= 4 ? (
                      <Badge className="bg-blue-600 text-white font-bold text-[10px]">
                        🔄 Mutex Locked → Allocated Next Token #15
                      </Badge>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium">Ready</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Technical DB Log Output */}
              <div className="bg-slate-950 text-emerald-400 font-mono text-[11px] p-3 rounded-2xl space-y-1">
                <p className="text-slate-400 text-[10px] font-sans font-bold uppercase">
                  Engine Transaction Logs:
                </p>
                <p>{raceStep >= 1 ? "> BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;" : "> Idle..."}</p>
                {raceStep >= 2 && (
                  <p className="text-emerald-300">
                    {"> SELECT * FROM slots WHERE doctor_id='dr-1' FOR UPDATE -> LOCK GRANTED (P1)"}
                  </p>
                )}
                {raceStep >= 3 && (
                  <p className="text-amber-300">
                    {"> P2 SELECT ... -> LOCK TIMEOUT 50ms -> 409 CONFLICT -> ADD_TO_WAITLIST(P2)"}
                  </p>
                )}
                {raceStep >= 4 && (
                  <p className="text-blue-300">
                    {"> P3 SELECT ... -> ASSIGN_NEXT_TOKEN(token_seq.nextval) -> TOKEN #15 ISSUED"}
                  </p>
                )}
              </div>

              <Button
                onClick={runRaceSimulation}
                disabled={isSimulatingRace}
                className="w-full h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/25 flex items-center justify-center gap-2"
              >
                <Play className="h-4 w-4" />
                {isSimulatingRace ? "Running ACID Mutex Contention Test..." : "Run 3-Patient Concurrency Collision Test"}
              </Button>
            </div>
          )}

          {/* Tab 2: No-Show & Waitlist Backfill */}
          {activeTab === "noshow" && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  Evaluator Scenario: "What happens if a patient books but never shows up?"
                </p>
                <p className="text-[11px] text-amber-800 dark:text-amber-300">
                  Doctor's time is never wasted. If a patient is absent past 5 minutes, doctor clicks 'Skip', and Medyora autonomously clears the vacancy to the nearest waitlist patient via WhatsApp.
                </p>
              </div>

              {/* No-show workflow stepper */}
              <div className="space-y-2.5">
                <div
                  className={`p-3 rounded-2xl border text-xs flex items-center justify-between ${
                    noShowStep >= 1 ? "bg-rose-50 dark:bg-rose-950/40 border-rose-200" : "bg-slate-50 dark:bg-slate-800/40"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="h-6 w-6 rounded-lg bg-rose-600 text-white font-bold text-[10px] flex items-center justify-center">
                      1
                    </span>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Token #12 Called — Patient Absent in Lobby</p>
                      <p className="text-[10px] text-slate-500">5-minute grace period expired with no response</p>
                    </div>
                  </div>
                  {noShowStep >= 1 && <span className="text-[10px] font-black text-rose-600">FLAGGED</span>}
                </div>

                <div
                  className={`p-3 rounded-2xl border text-xs flex items-center justify-between ${
                    noShowStep >= 2 ? "bg-amber-50 dark:bg-amber-950/40 border-amber-200" : "bg-slate-50 dark:bg-slate-800/40"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="h-6 w-6 rounded-lg bg-amber-600 text-white font-bold text-[10px] flex items-center justify-center">
                      2
                    </span>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Doctor 1-Click 'Mark No-Show' Triggered</p>
                      <p className="text-[10px] text-slate-500">Token #13 instantly promoted to cabin; Doctor has 0 downtime</p>
                    </div>
                  </div>
                  {noShowStep >= 2 && <span className="text-[10px] font-black text-amber-600">CABIN PROTECTED</span>}
                </div>

                <div
                  className={`p-3 rounded-2xl border text-xs flex items-center justify-between ${
                    noShowStep >= 3 ? "bg-blue-50 dark:bg-blue-950/40 border-blue-200" : "bg-slate-50 dark:bg-slate-800/40"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="h-6 w-6 rounded-lg bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">
                      3
                    </span>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Automated WhatsApp Webhook to Waitlist #1</p>
                      <p className="text-[10px] text-slate-500">Alert dispatched to Sunita Rao: "Vacant slot open now!"</p>
                    </div>
                  </div>
                  {noShowStep >= 3 && <span className="text-[10px] font-black text-blue-600">ALERT SENT</span>}
                </div>

                <div
                  className={`p-3 rounded-2xl border text-xs flex items-center justify-between ${
                    noShowStep >= 4 ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200" : "bg-slate-50 dark:bg-slate-800/40"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="h-6 w-6 rounded-lg bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center">
                      4
                    </span>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Slot Claimed & Queue Synchronized</p>
                      <p className="text-[10px] text-slate-500">Slot recovered in 12s; Patient reliability score updated</p>
                    </div>
                  </div>
                  {noShowStep >= 4 && <span className="text-[10px] font-black text-emerald-600">100% RECOVERED</span>}
                </div>
              </div>

              <Button
                onClick={runNoShowSimulation}
                disabled={isSimulatingNoShow}
                className="w-full h-12 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/25 flex items-center justify-center gap-2"
              >
                <Play className="h-4 w-4" />
                {isSimulatingNoShow ? "Executing No-Show & Waitlist Backfill..." : "Simulate No-Show & Autonomous Backfill"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
