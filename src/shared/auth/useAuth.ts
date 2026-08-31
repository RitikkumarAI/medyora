import { useState, useEffect, useCallback } from "react";
import { safeStorage } from "@/shared/utils/safeStorage";

export interface AuthUser {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  role: "patient" | "doctor" | "admin";
  email?: string | undefined;
  medicalRegNo?: string | undefined;
  speciality?: string | undefined;
  clinicName?: string | undefined;
}

const AUTH_STORAGE_KEY = "medyora_auth_user_v2";

// Default seed user for demonstration
const DEFAULT_PATIENT_USER: AuthUser = {
  id: "usr_ritik_1",
  name: "Ritik Kumar",
  phone: "+91 98765 43210",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
  role: "patient",
  email: "ritik@medyora.health",
};

const DEFAULT_DOCTOR_USER: AuthUser = {
  id: "doc_specialist_1",
  name: "Dr. Medical Specialist",
  phone: "+91 98765 43210",
  avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80",
  role: "doctor",
  email: "doctor@medyora.health",
  medicalRegNo: "MCI-74892",
  speciality: "Senior Consultant Specialist",
  clinicName: "Apex Multi-Speciality Clinic",
};

function getStoredUser(): AuthUser | null {
  try {
    const raw = safeStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw || raw === "logged_out") return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());

  useEffect(() => {
    const syncAuth = () => {
      setUser(getStoredUser());
    };
    window.addEventListener("medyora:auth", syncAuth);
    window.addEventListener("storage", syncAuth);
    return () => {
      window.removeEventListener("medyora:auth", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  const loginAsPatient = useCallback((phone: string, name?: string) => {
    const newUser: AuthUser = {
      id: `usr_${Date.now()}`,
      name: name || "Patient User",
      phone: phone.startsWith("+91") ? phone : `+91 ${phone}`,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      role: "patient",
      email: "patient@medyora.health",
    };
    safeStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    window.dispatchEvent(new CustomEvent("medyora:auth"));
    setUser(newUser);
    return newUser;
  }, []);

  const loginAsDoctor = useCallback((doctorInfo?: {
    name?: string;
    medicalRegNo?: string;
    phone?: string;
    speciality?: string;
    clinicName?: string;
  }) => {
    const newUser: AuthUser = {
      id: `doc_${Date.now()}`,
      name: doctorInfo?.name || DEFAULT_DOCTOR_USER.name,
      phone: doctorInfo?.phone || DEFAULT_DOCTOR_USER.phone,
      avatar: DEFAULT_DOCTOR_USER.avatar,
      role: "doctor",
      email: "doctor@medyora.health",
      medicalRegNo: doctorInfo?.medicalRegNo || DEFAULT_DOCTOR_USER.medicalRegNo,
      speciality: doctorInfo?.speciality || DEFAULT_DOCTOR_USER.speciality,
      clinicName: doctorInfo?.clinicName || DEFAULT_DOCTOR_USER.clinicName,
    };
    safeStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    window.dispatchEvent(new CustomEvent("medyora:auth"));
    setUser(newUser);
    return newUser;
  }, []);

  const login = useCallback((phone: string, name?: string, role: "patient" | "doctor" = "patient") => {
    if (role === "doctor") {
      return loginAsDoctor({ phone, name });
    }
    return loginAsPatient(phone, name);
  }, [loginAsDoctor, loginAsPatient]);

  const logout = useCallback(() => {
    safeStorage.setItem(AUTH_STORAGE_KEY, "logged_out");
    window.dispatchEvent(new CustomEvent("medyora:auth"));
    setUser(null);
  }, []);

  return {
    user,
    isLoggedIn: !!user,
    isDoctor: user?.role === "doctor",
    isPatient: user?.role === "patient",
    isAdmin: user?.role === "admin",
    login,
    loginAsPatient,
    loginAsDoctor,
    logout,
  };
}
