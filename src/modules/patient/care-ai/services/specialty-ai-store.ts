import { useState, useEffect, useCallback } from "react";
import {
  type SpecialtyCategoryId,
  type SpecialtyReportItem,
  INITIAL_SPECIALTY_REPORTS,
} from "./specialty-xai-engine";

const STORAGE_KEY = "medyora.specialty_reports.v2";
const EVENT_NAME = "medyora:specialty-reports";

// In-memory fallback for SSR
let memoryStore: Record<SpecialtyCategoryId, SpecialtyReportItem[]> | null = null;

function readAllReports(): Record<SpecialtyCategoryId, SpecialtyReportItem[]> {
  if (typeof window === "undefined") {
    return memoryStore || INITIAL_SPECIALTY_REPORTS;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with initial realistic clinical cases
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SPECIALTY_REPORTS));
      return INITIAL_SPECIALTY_REPORTS;
    }
    const parsed = JSON.parse(raw);
    return parsed;
  } catch {
    return INITIAL_SPECIALTY_REPORTS;
  }
}

function writeAllReports(data: Record<SpecialtyCategoryId, SpecialtyReportItem[]>) {
  memoryStore = data;
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage quota errors
  }
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

/** Get reports list for a given specialty category */
export function getReportsForSpecialty(specialtyId: SpecialtyCategoryId): SpecialtyReportItem[] {
  const all = readAllReports();
  return all[specialtyId] || [];
}

/** Add a new report to a specialty */
export function addSpecialtyReport(report: SpecialtyReportItem) {
  const all = readAllReports();
  const currentList = all[report.specialtyId] || [];
  all[report.specialtyId] = [report, ...currentList];
  writeAllReports(all);
}

/** Delete a report by ID from a specialty */
export function deleteSpecialtyReport(specialtyId: SpecialtyCategoryId, reportId: string) {
  const all = readAllReports();
  const currentList = all[specialtyId] || [];
  all[specialtyId] = currentList.filter((r) => r.id !== reportId);
  writeAllReports(all);
}

/** Reset a specialty or all specialties to factory sample cases */
export function resetSpecialtyReports(specialtyId?: SpecialtyCategoryId) {
  const all = readAllReports();
  if (specialtyId) {
    all[specialtyId] = INITIAL_SPECIALTY_REPORTS[specialtyId] || [];
  } else {
    Object.assign(all, INITIAL_SPECIALTY_REPORTS);
  }
  writeAllReports(all);
}

/** React Hook to subscribe to real-time reports of a given specialty */
export function useSpecialtyReports(specialtyId: SpecialtyCategoryId) {
  const [reports, setReports] = useState<SpecialtyReportItem[]>(() =>
    getReportsForSpecialty(specialtyId),
  );

  const refresh = useCallback(() => {
    setReports(getReportsForSpecialty(specialtyId));
  }, [specialtyId]);

  useEffect(() => {
    refresh();
    const handleSync = () => refresh();
    if (typeof window !== "undefined") {
      window.addEventListener(EVENT_NAME, handleSync);
      window.addEventListener("storage", handleSync);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener(EVENT_NAME, handleSync);
        window.removeEventListener("storage", handleSync);
      }
    };
  }, [specialtyId, refresh]);

  return {
    reports,
    addReport: addSpecialtyReport,
    deleteReport: (reportId: string) => deleteSpecialtyReport(specialtyId, reportId),
    resetReports: () => resetSpecialtyReports(specialtyId),
  };
}
