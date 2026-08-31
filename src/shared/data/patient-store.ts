import { useCallback, useEffect, useState } from "react";
import { APPOINTMENTS, type Appointment } from "@/shared/data/app-mock";

const KEY = "mediconnect.appointments.v1";

function read(): Appointment[] {
  if (typeof window === "undefined") return APPOINTMENTS;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return APPOINTMENTS;
    const parsed = JSON.parse(raw) as Appointment[];
    return Array.isArray(parsed) ? parsed : APPOINTMENTS;
  } catch {
    return APPOINTMENTS;
  }
}

function write(list: Appointment[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // Ignored
  }
  window.dispatchEvent(new CustomEvent("mediconnect:appointments"));
}

export function addAppointment(appointment: Appointment) {
  write([appointment, ...read()]);
}

/** Human-friendly booking reference, e.g. MC-7F3K21. */
export function createBookingReference() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i += 1) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `MC-${out}`;
}

export function createAppointment(input: {
  doctorId: string;
  doctorName: string;
  speciality: string;
  clinic: string;
  city?: string | undefined;
  date: string;
  time: string;
  amount: number;
  patient: string;
  image: string;
  visitType?: "clinic" | "home" | undefined;
  reference?: string | undefined;
  bookedFor?: "self" | "other" | undefined;
  patientDetails?: import("@/shared/data/app-mock").PatientBookingDetails | undefined;
  paymentMode?: "online" | "pay_at_clinic" | undefined;
  discount?: number | undefined;
  whatsappNotified?: boolean | undefined;
}): Appointment {
  const token = `#${Math.floor(Math.random() * 20) + 1}`;
  return {
    id: `APT${Date.now().toString().slice(-6)}`,
    status: "Confirmed",
    token,
    ...input,
    reference: input.reference ?? createBookingReference(),
    whatsappNotified: true,
  };
}

/** Browser-persisted appointments (no backend). Seeded with sample data. */
export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>(APPOINTMENTS);

  useEffect(() => {
    const sync = () => setAppointments(read());
    sync();
    window.addEventListener("mediconnect:appointments", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("mediconnect:appointments", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const cancel = useCallback((id: string) => {
    write(read().map((a) => (a.id === id ? { ...a, status: "Cancelled" as const } : a)));
  }, []);

  const reschedule = useCallback((id: string, date: string, time: string) => {
    const newToken = `#${Math.floor(Math.random() * 20) + 1}`;
    write(read().map((a) => (a.id === id ? { ...a, date, time, token: newToken, status: "Confirmed" as const } : a)));
  }, []);

  const rescheduleToday = useCallback((id: string, newTime: string) => {
    const newToken = `#${Math.floor(Math.random() * 15) + 15}`; // later token for same day
    write(read().map((a) => (a.id === id ? { ...a, time: newTime, token: newToken, status: "Confirmed" as const } : a)));
  }, []);

  return { appointments, cancel, reschedule, rescheduleToday };
}
