import { useCallback, useEffect, useState } from "react";

export type VisitStatus = "Waiting" | "Consulting" | "Completed" | "Skipped";

export interface Visit {
  id: string;
  token: string;
  patient: string;
  age: number;
  gender: "Male" | "Female";
  reason: string;
  time: string;
  status: VisitStatus;
}

export interface IssuedPrescription {
  id: string;
  patient: string;
  date: string;
  diagnosis: string;
  advice: string;
  medicines: { name: string; dosage: string; duration: string }[];
}

export const DOCTOR_PROFILE = {
  name: "Dr. Rajesh Sharma",
  speciality: "Cardiologist",
  clinic: "City Heart Clinic, Connaught Place",
};

export const TODAY_VISITS: Visit[] = [
  {
    id: "V1",
    token: "#01",
    patient: "Rahul Sharma",
    age: 34,
    gender: "Male",
    reason: "Chest pain follow-up",
    time: "10:00 AM",
    status: "Consulting",
  },
  {
    id: "V2",
    token: "#02",
    patient: "Priya Patel",
    age: 41,
    gender: "Female",
    reason: "High BP review",
    time: "10:30 AM",
    status: "Waiting",
  },
  {
    id: "V3",
    token: "#03",
    patient: "Amit Joshi",
    age: 52,
    gender: "Male",
    reason: "ECG report reading",
    time: "11:00 AM",
    status: "Waiting",
  },
  {
    id: "V4",
    token: "#04",
    patient: "Neha Singh",
    age: 29,
    gender: "Female",
    reason: "Palpitations",
    time: "11:30 AM",
    status: "Waiting",
  },
  {
    id: "V5",
    token: "#05",
    patient: "Ankit Verma",
    age: 60,
    gender: "Male",
    reason: "Post-angioplasty check",
    time: "12:00 PM",
    status: "Waiting",
  },
  {
    id: "V6",
    token: "#06",
    patient: "Sunita Rao",
    age: 47,
    gender: "Female",
    reason: "Cholesterol counselling",
    time: "12:30 PM",
    status: "Waiting",
  },
];

const SEED_PRESCRIPTIONS: IssuedPrescription[] = [
  {
    id: "PR-3301",
    patient: "Amit Joshi",
    date: "20 Aug 2026",
    diagnosis: "Stable angina",
    advice: "Low-fat diet, 30 minutes walking daily, review in 4 weeks.",
    medicines: [
      { name: "Tab. Ecosprin AV 75", dosage: "1-0-1", duration: "30 days" },
      { name: "Tab. Metoprolol 25mg", dosage: "1-0-0", duration: "30 days" },
    ],
  },
];

const VISITS_KEY = "mediconnect.doctor.visits.v1";
const RX_KEY = "mediconnect.doctor.prescriptions.v1";
const EVENT = "mediconnect:doctor";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as T;
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignored
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

function useStoreSync<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);

  useEffect(() => {
    const sync = () => setValue(read(key, fallback));
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return value;
}

/** Today's clinic queue, persisted in the browser. */
export function useVisits() {
  const visits = useStoreSync<Visit[]>(VISITS_KEY, TODAY_VISITS);

  const setStatus = useCallback((id: string, status: VisitStatus) => {
    write(
      VISITS_KEY,
      read(VISITS_KEY, TODAY_VISITS).map((v) => (v.id === id ? { ...v, status } : v)),
    );
  }, []);

  const callNext = useCallback(() => {
    const list = read(VISITS_KEY, TODAY_VISITS).map((v) =>
      v.status === "Consulting" ? { ...v, status: "Completed" as const } : v,
    );
    const nextIndex = list.findIndex((v) => v.status === "Waiting");
    if (nextIndex === -1) {
      write(VISITS_KEY, list);
      return null;
    }
    const next = { ...list[nextIndex]!, status: "Consulting" as const };
    list[nextIndex] = next;
    write(VISITS_KEY, list);
    return next;
  }, []);

  const markNoShow = useCallback((id: string, reason = "Patient not present in lobby") => {
    const list = read(VISITS_KEY, TODAY_VISITS).map((v) =>
      v.id === id ? { ...v, status: "Skipped" as const, noShowReason: reason } : v,
    );
    // If we marked the active consulting patient as skipped, promote next waiting patient
    const hasConsulting = list.some((v) => v.status === "Consulting");
    if (!hasConsulting) {
      const nextWaitingIndex = list.findIndex((v) => v.status === "Waiting");
      if (nextWaitingIndex !== -1) {
        list[nextWaitingIndex] = { ...list[nextWaitingIndex]!, status: "Consulting" as const };
      }
    }
    write(VISITS_KEY, list);
  }, []);

  const recallPatient = useCallback((id: string) => {
    const list = read(VISITS_KEY, TODAY_VISITS).map((v) =>
      v.id === id ? { ...v, status: "Waiting" as const } : v,
    );
    write(VISITS_KEY, list);
  }, []);

  const reset = useCallback(() => write(VISITS_KEY, TODAY_VISITS), []);

  return { visits, setStatus, callNext, markNoShow, recallPatient, reset };
}

/** Prescriptions issued by the doctor, persisted in the browser. */
export function useIssuedPrescriptions() {
  const prescriptions = useStoreSync<IssuedPrescription[]>(RX_KEY, SEED_PRESCRIPTIONS);

  const issue = useCallback((rx: Omit<IssuedPrescription, "id" | "date">) => {
    const created: IssuedPrescription = {
      ...rx,
      id: `PR-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };
    write(RX_KEY, [created, ...read(RX_KEY, SEED_PRESCRIPTIONS)]);
    return created;
  }, []);

  return { prescriptions, issue };
}

export interface DoctorDelayStatus {
  isDelayed: boolean;
  delayMinutes: number;
  reason: string;
  updatedAt: string;
}

export const DEFAULT_DOCTOR_DELAY: DoctorDelayStatus = {
  isDelayed: false,
  delayMinutes: 0,
  reason: "",
  updatedAt: "",
};

const DELAY_KEY = "mediconnect.doctor.delay.v1";

export function useDoctorDelay() {
  const delay = useStoreSync<DoctorDelayStatus>(DELAY_KEY, DEFAULT_DOCTOR_DELAY);

  const setDelay = useCallback((delayMinutes: number, reason: string) => {
    const updated: DoctorDelayStatus = {
      isDelayed: delayMinutes > 0,
      delayMinutes,
      reason,
      updatedAt: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    };
    write(DELAY_KEY, updated);
    return updated;
  }, []);

  const clearDelay = useCallback(() => {
    write(DELAY_KEY, DEFAULT_DOCTOR_DELAY);
  }, []);

  return { delay, setDelay, clearDelay };
}

export interface DoctorVacationStatus {
  isOnLeave: boolean;
  startDate: string;
  endDate: string;
  reason: string;
}

export const DEFAULT_DOCTOR_VACATION: DoctorVacationStatus = {
  isOnLeave: false,
  startDate: "",
  endDate: "",
  reason: "",
};

const VACATION_KEY = "mediconnect.doctor.vacation.v1";

export function useDoctorVacation() {
  const vacation = useStoreSync<DoctorVacationStatus>(VACATION_KEY, DEFAULT_DOCTOR_VACATION);

  const setVacation = useCallback((startDate: string, endDate: string, reason: string) => {
    const updated: DoctorVacationStatus = {
      isOnLeave: true,
      startDate,
      endDate,
      reason,
    };
    write(VACATION_KEY, updated);
    return updated;
  }, []);

  const clearVacation = useCallback(() => {
    write(VACATION_KEY, DEFAULT_DOCTOR_VACATION);
  }, []);

  return { vacation, setVacation, clearVacation };
}
