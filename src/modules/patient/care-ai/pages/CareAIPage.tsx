import { useState } from "react";
import { useSearch, useNavigate } from "@tanstack/react-router";
import {
  type SpecialtyCategoryId,
} from "../services/specialty-xai-engine";
import { CareAISidebar } from "../components/CareAISidebar";
import { CareAIHero } from "../components/CareAIHero";
import { OrganSystemSelector } from "../components/OrganSystemSelector";
import { HealthOverviewCard, type HealthVitalsData } from "../components/HealthOverviewCard";
import { BodyExplorer } from "../components/BodyExplorer";
import {
  RecentReportsCard,
  type RecentReportItem,
  DEFAULT_RECENT_REPORTS,
} from "../components/RecentReportsCard";
import { CareAIChatWorkspace } from "../components/CareAIChatWorkspace";
import { OrganSystemDeepDiveModal } from "../components/OrganSystemDeepDiveModal";
import { ReportAnalysisModal } from "../components/ReportAnalysisModal";
import { AddVitalsModal } from "../components/AddVitalsModal";
import { DeviceSyncModal } from "../components/DeviceSyncModal";
import { AmbientSmartwatchSOSModal } from "../components/AmbientSmartwatchSOSModal";
import { SmartAmbulanceCorridorModal } from "../components/SmartAmbulanceCorridorModal";
import { AshaRuralHealthModal } from "../components/AshaRuralHealthModal";
import { PrescriptionDDIModal } from "@/modules/patient/prescriptions/components/PrescriptionDDIModal";
import { ScanMedVerifierModal } from "@/modules/patient/medicines/components/ScanMedVerifierModal";
import { ORGAN_SYSTEMS } from "../data/organ-systems-data";
import { toast } from "sonner";
import { Ambulance, WifiOff, ShieldAlert, Scan, Droplets } from "lucide-react";

export function CareAIPage() {
  const search = useSearch({ strict: false }) as Record<string, string | undefined>;
  const initialSpecialty = (search?.["specialty"] as SpecialtyCategoryId) || "cardiology";

  // Map initial specialty query param to organ ID
  const mapSpecialtyToOrgan = (spec: string): string => {
    const found = ORGAN_SYSTEMS.find((s) => s.specialtyId === spec);
    return found ? found.id : "heart";
  };

  const [selectedOrganId, setSelectedOrganId] = useState<string>(
    mapSpecialtyToOrgan(initialSpecialty)
  );

  const selectedOrgan =
    ORGAN_SYSTEMS.find((s) => s.id === selectedOrganId) || ORGAN_SYSTEMS[0]!;

  // Vitals State
  const [vitals, setVitals] = useState<HealthVitalsData>({
    heartRate: 72,
    bpSystolic: 120,
    bpDiastolic: 80,
    spo2: 98,
    temperature: 36.6,
    lastUpdated: "Just now",
  });

  // Recent Reports State
  const [reports, setReports] = useState<RecentReportItem[]>(DEFAULT_RECENT_REPORTS);

  const navigate = useNavigate();

  // Modals state
  const [isDeepDiveOpen, setIsDeepDiveOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedReportTitle, setSelectedReportTitle] = useState<string | undefined>(undefined);
  const [isAddVitalsOpen, setIsAddVitalsOpen] = useState(false);
  const [isDeviceSyncOpen, setIsDeviceSyncOpen] = useState(false);
  const [isAmbientSOSOpen, setIsAmbientSOSOpen] = useState(false);
  const [isAmbulanceModalOpen, setIsAmbulanceModalOpen] = useState(false);
  const [isAshaModalOpen, setIsAshaModalOpen] = useState(false);
  const [isDDIOpen, setIsDDIOpen] = useState(false);
  const [isScanMedOpen, setIsScanMedOpen] = useState(false);

  // Chat Trigger from Hero Actions
  const [chatInitiateTrigger, setChatInitiateTrigger] = useState(0);

  const handleHeroAction = (
    action:
      | "chat"
      | "upload"
      | "symptoms"
      | "recommendations"
      | "food-scan"
      | "diet-planner"
      | "smartwatch-sos"
  ) => {
    if (action === "diet-planner") {
      navigate({ to: "/patient/diet-planner" });
    } else if (action === "smartwatch-sos") {
      setIsAmbientSOSOpen(true);
    } else if (action === "chat") {
      setChatInitiateTrigger((prev) => prev + 1);
      toast.info("Starting AI consultation...");
    } else if (action === "food-scan") {
      navigate({ to: "/patient/diet-planner" });
    } else if (action === "upload") {
      setSelectedReportTitle(undefined);
      setIsReportModalOpen(true);
    } else if (action === "symptoms") {
      setSelectedOrganId("heart");
      setChatInitiateTrigger((prev) => prev + 1);
      toast.info("Symptom triage ready in Care AI chat.");
    } else if (action === "recommendations") {
      setIsDeepDiveOpen(true);
    }
  };

  const handleSelectActionCard = (
    actionType: "upload" | "symptoms" | "vitals" | "recommendations"
  ) => {
    if (actionType === "upload") {
      setSelectedReportTitle(undefined);
      setIsReportModalOpen(true);
    } else if (actionType === "vitals") {
      setIsAddVitalsOpen(true);
    } else if (actionType === "recommendations") {
      setIsDeepDiveOpen(true);
    } else {
      toast.info(`Reviewing ${selectedOrgan.shortName} symptoms...`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-16 font-sans transition-colors">
      {/* ================= MAIN 3-COLUMN CARE AI WORKSPACE (EXACT REFERENCE UI) ================= */}
      <main className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        <div className="grid grid-cols-12 gap-5 items-start">
          {/* COLUMN 1: LEFT NAVIGATION SIDEBAR (Desktop 2 cols) */}
          <div className="hidden xl:block col-span-2 sticky top-24">
            <CareAISidebar
              onSelectNav={(item) => {
                if (item === "Upgrade Premium") {
                  toast.success("Medyora Premium features unlocked!");
                }
              }}
            />
          </div>

          {/* COLUMN 2: CENTER CARE AI WORKSPACE (7 cols) */}
          <div className="col-span-12 lg:col-span-8 xl:col-span-7 space-y-4">
            {/* 1. Care AI Hero Banner with 4 Two-Line Buttons & Small 3D Robot */}
            <CareAIHero onActionClick={handleHeroAction} />

            {/* 1.5 Clinical Innovation & Telemetry Quick Actions Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
              <button
                onClick={() => navigate({ to: "/patient/blood" })}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600/10 hover:bg-rose-600/20 text-rose-500 dark:text-rose-400 border border-rose-500/20 font-bold whitespace-nowrap transition-all shadow-xs"
              >
                <Droplets className="w-3.5 h-3.5 fill-rose-500" />
                <span>Blood Radar &amp; Home Pickup 🩸</span>
              </button>

              <button
                onClick={() => setIsAmbulanceModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-500 dark:text-red-400 border border-red-500/20 font-bold whitespace-nowrap transition-all shadow-xs"
              >
                <Ambulance className="w-3.5 h-3.5" />
                <span>Ambulance Green Corridor 🚑</span>
              </button>

              <button
                onClick={() => setIsAshaModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20 font-bold whitespace-nowrap transition-all shadow-xs"
              >
                <WifiOff className="w-3.5 h-3.5" />
                <span>ASHA Rural Offline Locker 📡</span>
              </button>

              <button
                onClick={() => setIsScanMedOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600/10 hover:bg-amber-600/20 text-amber-500 dark:text-amber-400 border border-amber-500/20 font-bold whitespace-nowrap transition-all shadow-xs"
              >
                <Scan className="w-3.5 h-3.5" />
                <span>ScanMed Drug Verifier 🔍</span>
              </button>

              <button
                onClick={() => setIsDDIOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 font-bold whitespace-nowrap transition-all shadow-xs"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Prescription DDI Shield 🛡️</span>
              </button>
            </div>

            {/* 2. Horizontal Organ System Selector Pill Row */}
            <OrganSystemSelector
              selectedOrganId={selectedOrganId}
              onSelectOrgan={(id) => {
                setSelectedOrganId(id);
                toast.info(`Switched context to ${id.toUpperCase()} Health`);
              }}
            />

            {/* 3. Central AI Consultation Workspace (Empty on load, user-initiated) */}
            <CareAIChatWorkspace
              selectedOrgan={selectedOrgan}
              onOpenUpload={() => {
                setSelectedReportTitle(undefined);
                setIsReportModalOpen(true);
              }}
              onOpenAddVitals={() => setIsAddVitalsOpen(true)}
              onOpenDeepDive={() => setIsDeepDiveOpen(true)}
              onSelectActionCard={handleSelectActionCard}
              chatInitiateTrigger={chatInitiateTrigger}
            />
          </div>

          {/* COLUMN 3: RIGHT INFORMATION PANEL (3 cols) */}
          <div className="col-span-12 lg:col-span-4 xl:col-span-3 space-y-4 sticky top-24">
            {/* 1. Your Health Overview (2x2 Grid + Sync Device Smartwatch QR + View Details) */}
            <HealthOverviewCard
              vitals={vitals}
              onSyncDevices={() => setIsAddVitalsOpen(true)}
              onOpenDeviceSync={() => setIsDeviceSyncOpen(true)}
            />

            {/* 2. Body Explorer (Systems list + 3D Hologram with Dynamic Highlighting) */}
            <BodyExplorer
              selectedOrganId={selectedOrganId}
              onSelectOrgan={(id) => {
                setSelectedOrganId(id);
                toast.info(`Highlighting ${id.toUpperCase()} on anatomical scan`);
              }}
              onOpenDeepDive={() => setIsDeepDiveOpen(true)}
            />

            {/* 3. Recent Reports List (3 reports + View All) */}
            <RecentReportsCard
              reports={reports}
              onSelectReport={(rep) => {
                setSelectedReportTitle(rep.name);
                setIsReportModalOpen(true);
              }}
              onUploadNew={() => {
                setSelectedReportTitle(undefined);
                setIsReportModalOpen(true);
              }}
              onViewAll={() => {
                setSelectedReportTitle(undefined);
                setIsReportModalOpen(true);
              }}
            />
          </div>
        </div>
      </main>

      {/* ================= INTERACTIVE MODALS ================= */}

      {/* Universal Smartwatch & BLE Device Sync Modal (QR Code & Protocols) */}
      <DeviceSyncModal
        isOpen={isDeviceSyncOpen}
        onClose={() => setIsDeviceSyncOpen(false)}
        currentVitals={vitals}
        onSyncVitals={(updated) => setVitals(updated)}
      />

      {/* Organ System Deep-Dive Viewer */}
      <OrganSystemDeepDiveModal
        isOpen={isDeepDiveOpen}
        onClose={() => setIsDeepDiveOpen(false)}
        activeSystemId={selectedOrganId}
        onSelectSystem={(id) => setSelectedOrganId(id)}
      />

      {/* Structured Medical Report Analyzer Modal */}
      <ReportAnalysisModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        initialReportTitle={selectedReportTitle}
      />

      {/* Sync Devices / Add Vitals Manual Modal */}
      <AddVitalsModal
        isOpen={isAddVitalsOpen}
        onClose={() => setIsAddVitalsOpen(false)}
        currentVitals={vitals}
        onSaveVitals={(updated) => setVitals(updated)}
      />

      {/* Ambient Smartwatch & Autonomous 108 Emergency Voice Rescue Modal */}
      <AmbientSmartwatchSOSModal
        isOpen={isAmbientSOSOpen}
        onClose={() => setIsAmbientSOSOpen(false)}
      />

      {/* Smart Ambulance & Traffic Green Corridor Preemption Modal */}
      <SmartAmbulanceCorridorModal
        isOpen={isAmbulanceModalOpen}
        onClose={() => setIsAmbulanceModalOpen(false)}
      />

      {/* ASHA / Rural Offline-First Health Records Modal */}
      <AshaRuralHealthModal
        isOpen={isAshaModalOpen}
        onClose={() => setIsAshaModalOpen(false)}
      />

      {/* Prescription Vision OCR & Fatal Drug Interaction Shield Modal */}
      <PrescriptionDDIModal
        isOpen={isDDIOpen}
        onClose={() => setIsDDIOpen(false)}
      />

      {/* ScanMed Counterfeit Drug & Cold-Chain Verifier Modal */}
      <ScanMedVerifierModal
        isOpen={isScanMedOpen}
        onClose={() => setIsScanMedOpen(false)}
      />
    </div>
  );
}
