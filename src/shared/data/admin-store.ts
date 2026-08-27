import { useCallback, useEffect, useState } from "react";
import { DOCTORS } from "@/shared/data/mock";
import { TIME_SLOTS } from "@/shared/data/app-mock";

const KEY = "mediconnect.admin.v1";
const EVENT = "mediconnect:admin";

export interface VisitTypeConfig {
  id: string;
  label: string;
  description: string;
  surcharge: number;
  enabled: boolean;
}

export interface DoctorOverride {
  approved: boolean;
  availableToday: boolean;
  homeVisit: boolean;
  fee: number;
}

export interface AdminState {
  doctors: Record<string, DoctorOverride>;
  visitTypes: VisitTypeConfig[];
  /** doctorId -> slot labels that are blocked for booking */
  blockedSlots: Record<string, string[]>;
}

export const ALL_SLOTS = Object.values(TIME_SLOTS).flat();

export function defaultAdminState(): AdminState {
  return {
    doctors: Object.fromEntries(
      DOCTORS.map((d) => [
        d.id,
        {
          approved: d.verified,
          availableToday: d.availableToday,
          homeVisit: d.homeVisit,
          fee: d.fee,
        },
      ]),
    ),
    visitTypes: [
      {
        id: "clinic",
        label: "Clinic visit",
        description: "Patient visits the doctor at the clinic",
        surcharge: 0,
        enabled: true,
      },
      {
        id: "home",
        label: "Home visit",
        description: "Doctor visits the patient at home",
        surcharge: 300,
        enabled: true,
      },
    ],
    blockedSlots: {},
  };
}

function read(): AdminState {
  const base = defaultAdminState();
  if (typeof window === "undefined") return base;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw) as Partial<AdminState>;
    return {
      doctors: { ...base.doctors, ...(parsed.doctors ?? {}) },
      visitTypes: parsed.visitTypes?.length ? parsed.visitTypes : base.visitTypes,
      blockedSlots: parsed.blockedSlots ?? {},
    };
  } catch {
    return base;
  }
}

function write(next: AdminState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(EVENT));
}

/** Browser-persisted admin settings (mock backend). */
export function useAdminSettings() {
  const [state, setState] = useState<AdminState>(defaultAdminState);

  useEffect(() => {
    const sync = () => setState(read());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const updateDoctor = useCallback((id: string, patch: Partial<DoctorOverride>) => {
    const current = read();
    const existing = current.doctors[id] ?? defaultAdminState().doctors[id]!;
    write({ ...current, doctors: { ...current.doctors, [id]: { ...existing, ...patch } } });
  }, []);

  const updateVisitType = useCallback((id: string, patch: Partial<VisitTypeConfig>) => {
    const current = read();
    write({
      ...current,
      visitTypes: current.visitTypes.map((v) => (v.id === id ? { ...v, ...patch } : v)),
    });
  }, []);

  const toggleSlot = useCallback((doctorId: string, slot: string) => {
    const current = read();
    const blocked = current.blockedSlots[doctorId] ?? [];
    const next = blocked.includes(slot)
      ? blocked.filter((s) => s !== slot)
      : [...blocked, slot];
    write({ ...current, blockedSlots: { ...current.blockedSlots, [doctorId]: next } });
  }, []);

  const reset = useCallback(() => write(defaultAdminState()), []);

  return { state, updateDoctor, updateVisitType, toggleSlot, reset };
}
