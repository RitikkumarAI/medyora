import { useState, useEffect, useRef } from "react";
import {
  X,
  Watch,
  Activity,
  Heart,
  Droplets,
  AlertTriangle,
  PhoneCall,
  PhoneOff,
  MapPin,
  Send,
  CheckCircle2,
  Volume2,
  VolumeX,
  RefreshCw,
  Bluetooth,
  Battery,
  ShieldAlert,
  Radio,
  FileText,
  Clock,
  Sparkles,
  Ambulance,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  playEmergencyAlarmBeep,
  playTelephoneRing,
  speakEmergencyRescueAgent,
  stopSpeech,
} from "@/shared/utils/sound-chime";
import { toast } from "sonner";

interface AmbientSmartwatchSOSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type WatchModel = "Noise ColorFit Pro 5" | "Noise Halo Plus" | "boAt Wave Pro" | "Apple Watch Ultra";

export function AmbientSmartwatchSOSModal({ isOpen, onClose }: AmbientSmartwatchSOSModalProps) {
  // Device connection state
  const [deviceModel, setDeviceModel] = useState<WatchModel>("Noise ColorFit Pro 5");
  const [isConnected, setIsConnected] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [batteryLevel] = useState(86);

  // Vitals State
  const [systolic, setSystolic] = useState(118);
  const [diastolic, setDiastolic] = useState(78);
  const [heartRate, setHeartRate] = useState(72);
  const [spo2, setSpo2] = useState(99);
  const [isCriticalLowBP, setIsCriticalLowBP] = useState(false);

  // SOS Workflow State
  // "idle" -> "countdown" -> "dialing" -> "dispatch_active" -> "resolved"
  const [emergencyPhase, setEmergencyPhase] = useState<
    "idle" | "countdown" | "dialing" | "dispatch_active" | "resolved"
  >("idle");
  const [countdown, setCountdown] = useState(10);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [agentTranscript, setAgentTranscript] = useState("");

  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);

  // GPS Telemetry
  const patientLocation = {
    address: "Flat 402, Green Glen Layout, Outer Ring Road, Bellandur, Bengaluru, Karnataka 560103",
    lat: "12.9352° N",
    lng: "77.6245° E",
    nearestHospital: "Manipal Hospital Sarjapur (2.4 km | 6 mins ALS ETA)",
  };

  // Emergency Script
  const emergencyRescueSpeech = `Emergency dispatch 108. This is Medyora Autonomous AI Rescue Agent calling on behalf of patient Rahul Sharma, age 32. Patient's Noise smartwatch has detected a critical acute hypotension collapse: blood pressure 82 over 54 millimeters of mercury, heart rate 52, high syncopal shock risk. Patient is located at Flat 402, Green Glen Layout, Bellandur, Bengaluru. Immediate ALS ambulance with vasopressors is requested. Live vitals telemetry is streaming to 108 dispatch. Family contacts have been alerted via SMS.`;

  // Handle countdown ticks
  useEffect(() => {
    if (emergencyPhase === "countdown") {
      playEmergencyAlarmBeep();

      countdownTimerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownTimerRef.current!);
            trigger108DispatchCall();
            return 0;
          }
          playEmergencyAlarmBeep();
          return prev - 1;
        });
      }, 1000);
    } else {
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    }

    return () => {
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, [emergencyPhase]);

  // Handle call duration in dispatch active
  useEffect(() => {
    if (emergencyPhase === "dispatch_active") {
      callTimerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
    }

    return () => {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
    };
  }, [emergencyPhase]);

  // Stop sound if modal closes
  useEffect(() => {
    if (!isOpen) {
      stopSpeech();
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
      if (callTimerRef.current) clearInterval(callTimerRef.current);
      setEmergencyPhase("idle");
      setIsCriticalLowBP(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Simulate Critical Low BP Breach
  const triggerLowBPBreach = () => {
    setIsCriticalLowBP(true);
    setSystolic(82);
    setDiastolic(54);
    setHeartRate(52);
    setSpo2(94);
    setCountdown(10);
    setEmergencyPhase("countdown");
    toast.error("CRITICAL VITALS DROP DETECTED: Blood Pressure 82/54 mmHg!", {
      duration: 6000,
    });
  };

  // Restore Normal Vitals
  const restoreNormalVitals = () => {
    stopSpeech();
    setIsCriticalLowBP(false);
    setSystolic(118);
    setDiastolic(78);
    setHeartRate(72);
    setSpo2(99);
    setEmergencyPhase("idle");
    setCountdown(10);
    setCallDuration(0);
    toast.success("Vitals normalized: BP 118/78 mmHg, HR 72 bpm.");
  };

  // User aborts countdown (conscious and safe)
  const abortEmergencyCountdown = () => {
    stopSpeech();
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    setEmergencyPhase("idle");
    setIsCriticalLowBP(false);
    setSystolic(108);
    setDiastolic(70);
    setHeartRate(68);
    toast.success("Emergency dispatch safely aborted by user. Incident logged.");
  };

  // Autonomous trigger 108 call
  const trigger108DispatchCall = async () => {
    setEmergencyPhase("dialing");
    setAgentTranscript("Initiating encrypted WebRTC trunk to 108 Emergency Medical Services (EMS Karnataka)...");

    // Play telephone ring cadence
    await playTelephoneRing();
    await playTelephoneRing();

    setEmergencyPhase("dispatch_active");
    setCallDuration(1);
    setAgentTranscript(emergencyRescueSpeech);

    // Speak AI Voice Agent
    if (!isMuted) {
      speakEmergencyRescueAgent(emergencyRescueSpeech, () => {
        toast.info("108 Dispatcher confirmed: ALS Unit KA-01-EA-108 dispatched. ETA 7 mins.");
      });
    }
  };

  // Format call timer mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handlePairDevice = (model: WatchModel) => {
    setIsScanning(true);
    toast.info(`Scanning Bluetooth BLE GATT for ${model}...`);
    setTimeout(() => {
      setDeviceModel(model);
      setIsConnected(true);
      setIsScanning(false);
      toast.success(`Connected to ${model} (BLE: NOISE_88F1-PRO)`);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl text-slate-100 flex flex-col">
        {/* MODAL TOP HEADER */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Watch className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Ambient Smartwatch & 108 AI Voice Rescue
                </h2>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Autonomous hemodynamic telemetry & critical vital breach rescue
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Device Model Selector Dropdown */}
            <select
              value={deviceModel}
              onChange={(e) => handlePairDevice(e.target.value as WatchModel)}
              className="bg-slate-800 border border-slate-700 text-xs text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value="Noise ColorFit Pro 5">⚡ Noise ColorFit Pro 5 (Recommended)</option>
              <option value="Noise Halo Plus">⚡ Noise Halo Plus</option>
              <option value="boAt Wave Pro">🌊 boAt Wave Pro</option>
              <option value="Apple Watch Ultra">🍎 Apple Watch Ultra</option>
            </select>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg h-9 w-9"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* BODY CONTENT */}
        <div className="p-6 space-y-6">
          {/* DEVICE STATUS BAR */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-cyan-400 font-medium">
                <Bluetooth className="w-4 h-4 text-cyan-400" />
                <span>{deviceModel}</span>
              </div>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300">MAC: 3C:A6:F6:88:F1</span>
              <span className="text-slate-500">|</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <Radio className="w-3.5 h-3.5" /> 1 Hz Stream
              </span>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <div className="flex items-center gap-1 text-slate-300">
                <Battery className="w-4 h-4 text-emerald-400" />
                <span>{batteryLevel}% Battery</span>
              </div>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">Firmware: v4.2.1-SEC</span>
            </div>
          </div>

          {/* CRITICAL 10-SECOND SAFETY COUNTDOWN BANNER (WHEN TRIGGERED) */}
          {emergencyPhase === "countdown" && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-red-950/80 via-red-900/60 to-rose-950/80 border-2 border-red-500 shadow-xl shadow-red-500/20 animate-pulse">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-red-600 text-white flex flex-col items-center justify-center font-black text-2xl shadow-lg shadow-red-600/40">
                    <span>{countdown}</span>
                    <span className="text-[10px] tracking-wider uppercase font-semibold">SEC</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-xs font-bold uppercase rounded bg-red-500 text-white animate-bounce">
                        Vital Drop Alert
                      </span>
                      <h3 className="text-base font-bold text-red-200">
                        Critical Low BP Detected (&lt;90/60 mmHg)!
                      </h3>
                    </div>
                    <p className="text-xs text-red-300/90 mt-1 max-w-xl">
                      Medyora Autonomous AI Rescue is initiating an automatic 108 Emergency Ambulance dispatch and GPS broadcast in <strong className="text-white underline">{countdown} seconds</strong> unless aborted.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <Button
                    onClick={abortEmergencyCountdown}
                    className="w-full md:w-auto bg-white hover:bg-slate-100 text-red-600 font-bold px-5 py-2.5 rounded-xl shadow-lg text-sm"
                  >
                    I&apos;m Safe & Conscious (Abort)
                  </Button>
                  <Button
                    onClick={trigger108DispatchCall}
                    className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-lg text-sm flex items-center gap-2"
                  >
                    <Ambulance className="w-4 h-4" />
                    Dispatch Now
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* ACTIVE 108 AUTONOMOUS CALL SCREEN (WHEN DIALING OR ACTIVE) */}
          {(emergencyPhase === "dialing" || emergencyPhase === "dispatch_active") && (
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-red-500/80 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col lg:flex-row gap-6 relative z-10">
                {/* Left side: Call HUD */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
                        <PhoneCall className="w-6 h-6 animate-bounce" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs uppercase font-extrabold tracking-widest text-red-400">
                            {emergencyPhase === "dialing" ? "CONNECTING ENCRYPTED TRUNK..." : "108 RESCUE IN PROGRESS"}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-red-500/20 text-red-300 border border-red-500/30">
                            {formatTime(callDuration)}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-white">
                          Karnataka 108 Emergency Ambulance Command Center
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setIsMuted(!isMuted);
                          if (!isMuted) stopSpeech();
                        }}
                        className="text-slate-300 hover:text-white hover:bg-slate-800"
                        title={isMuted ? "Unmute AI Voice Agent" : "Mute AI Voice Agent"}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={restoreNormalVitals}
                        className="bg-red-600 hover:bg-red-700 text-xs font-semibold gap-1.5"
                      >
                        <PhoneOff className="w-3.5 h-3.5" /> End Call
                      </Button>
                    </div>
                  </div>

                  {/* AI Speech Transcript Terminal */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-red-900/40 font-mono text-xs space-y-2">
                    <div className="flex items-center justify-between text-slate-400 border-b border-slate-800/80 pb-2">
                      <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                        <Sparkles className="w-3.5 h-3.5" /> Medyora Autonomous AI Agent Voice Transcript
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono">STATUS: TRANSMITTING</span>
                    </div>

                    <p className="text-slate-200 leading-relaxed italic bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                      &ldquo;{agentTranscript}&rdquo;
                    </p>

                    <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                      <span>Synthesized via Web Speech API (en-IN Medical Model)</span>
                      <span className="text-cyan-400 font-semibold flex items-center gap-1">
                        <Activity className="w-3 h-3 animate-spin" /> Live Telemetry Synced
                      </span>
                    </div>
                  </div>

                  {/* Action alert cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Family SMS Broadcast Sent
                      </div>
                      <p className="text-slate-300 text-[11px]">
                        Dr. Ananya Sharma (+91 98765 43210): GPS tracker delivered via Twilio SMS.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-1">
                      <div className="flex items-center gap-1.5 text-blue-400 font-semibold">
                        <Ambulance className="w-3.5 h-3.5" /> Nearest ALS Hospital
                      </div>
                      <p className="text-slate-300 text-[11px]">
                        {patientLocation.nearestHospital}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right side: Live GPS Beacon */}
                <div className="w-full lg:w-72 p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
                      <span className="flex items-center gap-1.5 text-rose-400">
                        <MapPin className="w-4 h-4 animate-bounce" /> Live GPS Beacon
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono">ACCURACY: ±3m</span>
                    </div>

                    <div className="h-28 rounded-lg bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-center p-3 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]" />
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center animate-ping absolute" />
                      <div className="w-4 h-4 rounded-full bg-rose-500 relative z-10 shadow-lg shadow-rose-500" />
                      <span className="text-[10px] font-mono text-cyan-300 mt-3 relative z-10">
                        {patientLocation.lat}, {patientLocation.lng}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 mt-2 font-medium">
                      {patientLocation.address}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center justify-between">
                    <span>Medical ID: #MY-9821</span>
                    <span className="text-amber-400 font-medium">Allergies: Penicillin</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* REAL-TIME VITALS TELEMETRY TILES */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" /> Continuous Smartwatch Telemetry
              </h3>
              <span className="text-xs text-slate-400">
                Auto-evaluates every second for acute hemodynamic drops
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Blood Pressure Card */}
              <div
                className={`p-4 rounded-2xl border transition-all duration-300 ${
                  isCriticalLowBP
                    ? "bg-red-950/60 border-red-500 text-red-100 ring-2 ring-red-500/40 animate-pulse"
                    : "bg-slate-800/50 border-slate-700/70 text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-400">Blood Pressure</span>
                  <Activity
                    className={`w-4 h-4 ${isCriticalLowBP ? "text-red-400 animate-bounce" : "text-cyan-400"}`}
                  />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black tracking-tight">
                    {systolic}/{diastolic}
                  </span>
                  <span className="text-xs text-slate-400">mmHg</span>
                </div>
                <div className="mt-2 text-[11px] font-medium flex items-center justify-between">
                  <span
                    className={
                      isCriticalLowBP
                        ? "text-red-400 font-bold"
                        : "text-emerald-400"
                    }
                  >
                    {isCriticalLowBP ? "CRITICAL LOW BP (<90/60)" : "Optimal Normotensive"}
                  </span>
                  <span className="text-[10px] text-slate-500">Oscillometric</span>
                </div>
              </div>

              {/* Heart Rate Card */}
              <div
                className={`p-4 rounded-2xl border transition-all duration-300 ${
                  isCriticalLowBP
                    ? "bg-red-950/40 border-red-500/60 text-red-100"
                    : "bg-slate-800/50 border-slate-700/70 text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-400">Heart Rate</span>
                  <Heart
                    className={`w-4 h-4 ${isCriticalLowBP ? "text-red-400 animate-ping" : "text-rose-400"}`}
                  />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black tracking-tight">{heartRate}</span>
                  <span className="text-xs text-slate-400">BPM</span>
                </div>
                <div className="mt-2 text-[11px] font-medium flex items-center justify-between">
                  <span className={isCriticalLowBP ? "text-amber-400 font-semibold" : "text-emerald-400"}>
                    {isCriticalLowBP ? "Bradycardia Drop" : "Resting Normal"}
                  </span>
                  <span className="text-[10px] text-slate-500">Green PPG</span>
                </div>
              </div>

              {/* SpO2 Oxygen Card */}
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/70 text-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-400">Blood Oxygen</span>
                  <Droplets className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black tracking-tight">{spo2}</span>
                  <span className="text-xs text-slate-400">%</span>
                </div>
                <div className="mt-2 text-[11px] font-medium flex items-center justify-between">
                  <span className={spo2 < 95 ? "text-amber-400" : "text-emerald-400"}>
                    {spo2 < 95 ? "Mild Hypoxia" : "Excellent Saturation"}
                  </span>
                  <span className="text-[10px] text-slate-500">Red/IR PPG</span>
                </div>
              </div>

              {/* Fall & Syncope Sensor */}
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/70 text-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-400">Syncope Sensor</span>
                  <ShieldAlert className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-white">6-Axis Gyro</span>
                </div>
                <div className="mt-2 text-[11px] font-medium flex items-center justify-between">
                  <span className={isCriticalLowBP ? "text-red-400 font-bold" : "text-emerald-400"}>
                    {isCriticalLowBP ? "Shock Collapse Warning" : "Zero Falls Detected"}
                  </span>
                  <span className="text-[10px] text-slate-500">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* CLINICAL SIMULATION CONTROLS */}
          <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/70 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" /> Real-Life Clinical Stress Simulator
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Test the autonomous 108 emergency voice rescue protocol for your college viva demo.
                </p>
              </div>

              {isCriticalLowBP && (
                <Button
                  size="sm"
                  onClick={restoreNormalVitals}
                  variant="outline"
                  className="border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 text-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Reset to Normal (118/78)
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              <Button
                onClick={triggerLowBPBreach}
                className="bg-red-600/90 hover:bg-red-600 text-white font-semibold text-xs py-3 rounded-xl shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
              >
                <AlertTriangle className="w-4 h-4 text-yellow-300" />
                Simulate Low BP Drop (82/54 mmHg)
              </Button>

              <Button
                onClick={() => {
                  setIsCriticalLowBP(true);
                  setSystolic(188);
                  setDiastolic(115);
                  setHeartRate(142);
                  setCountdown(10);
                  setEmergencyPhase("countdown");
                  toast.error("HYPERTENSIVE CRISIS TRIGGERED: 188/115 mmHg!");
                }}
                className="bg-amber-600/90 hover:bg-amber-600 text-white font-semibold text-xs py-3 rounded-xl shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2"
              >
                <Activity className="w-4 h-4 text-white" />
                Simulate Hypertensive Crisis (188/115)
              </Button>

              <Button
                onClick={() => {
                  toast.info("Pairing physical Noise watch via Web Bluetooth GATT...");
                  if (typeof navigator !== "undefined" && "bluetooth" in navigator) {
                    (navigator as any).bluetooth
                      .requestDevice({
                        acceptAllDevices: true,
                        optionalServices: ["heart_rate", "battery_service"],
                      })
                      .then((dev: any) => {
                        toast.success(`Connected to physical ${dev.name}`);
                      })
                      .catch(() => {
                        toast.info("Fallback to Noise BLE virtual driver simulation.");
                      });
                  } else {
                    toast.info("Web Bluetooth not supported on this browser; using Noise BLE sandbox.");
                  }
                }}
                variant="outline"
                className="border-slate-700 hover:bg-slate-800 text-slate-300 text-xs py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <Bluetooth className="w-4 h-4 text-cyan-400" />
                Scan Physical Noise Watch (BLE)
              </Button>
            </div>
          </div>

          {/* VIVA HIGHLIGHT / ARCHITECTURE EXPLANATION */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold">
              <FileText className="w-3.5 h-3.5" /> Technical Viva Defence Architecture:
            </div>
            <p>
              Smartwatch transmits photoplethysmography (PPG) and oscillometric BP pulses over Bluetooth Low Energy (BLE GATT).
              When MAP (Mean Arterial Pressure) falls below 60 mmHg or Systolic &lt; 90 mmHg, Medyora fires a 10s pre-dispatch safety buffer to rule out sensor dislodgement, before autonomously dispatching 108 Emergency Ambulance via WebRTC trunk and Web Speech voice agent.
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Powered by Medyora Ambient Telemetry Engine & Web Audio / Speech Synthesis
          </div>

          <Button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-4"
          >
            Close Telemetry View
          </Button>
        </div>
      </div>
    </div>
  );
}
