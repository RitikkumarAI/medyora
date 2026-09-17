import { useState } from "react";
import { useSearch } from "@tanstack/react-router";
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
import { OrganSystemGridView } from "../components/OrganSystemGridView";
import { ORGAN_SYSTEMS, type OrganSystemItem } from "../data/organ-systems-data";
import { toast } from "sonner";

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

  // Modals state
  const [isDeepDiveOpen, setIsDeepDiveOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedReportTitle, setSelectedReportTitle] = useState<string | undefined>(undefined);
  const [isAddVitalsOpen, setIsAddVitalsOpen] = useState(false);

  // Chat Trigger from Hero Actions
  const [chatInitiateTrigger, setChatInitiateTrigger] = useState(0);

  const handleHeroAction = (action: "chat" | "upload" | "symptoms" | "recommendations") => {
    if (action === "chat") {
      setChatInitiateTrigger((prev) => prev + 1);
      toast.info("Starting AI consultation...");
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
            {/* 1. Your Health Overview (2x2 Grid + View Details) */}
            <HealthOverviewCard
              vitals={vitals}
              onSyncDevices={() => setIsAddVitalsOpen(true)}
            />

            {/* 2. Body Explorer (Systems list + 3D Hologram + Tooltip) */}
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

        {/* ================= BOTTOM SECTION: 15 ORGAN SYSTEM VIEWS GRID ================= */}
        <OrganSystemGridView
          onSelectSystem={(id) => {
            setSelectedOrganId(id);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onOpenDeepDive={(id) => {
            setSelectedOrganId(id);
            setIsDeepDiveOpen(true);
          }}
        />
      </main>

      {/* ================= INTERACTIVE MODALS ================= */}

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

      {/* Sync Devices / Add Vitals Modal */}
      <AddVitalsModal
        isOpen={isAddVitalsOpen}
        onClose={() => setIsAddVitalsOpen(false)}
        currentVitals={vitals}
        onSaveVitals={(updated) => setVitals(updated)}
      />
    </div>
  );
}
