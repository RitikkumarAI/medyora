import { useState, useEffect, useCallback } from "react";

export interface AuthUser {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  role: "patient" | "doctor" | "admin";
  email?: string | undefined;
}

const AUTH_STORAGE_KEY = "medyora_auth_user_v2";

// Default seed user when user has signed up / logged in during demo
const DEFAULT_USER: AuthUser = {
  id: "usr_ritik_1",
  name: "Ritik Kumar",
  phone: "+91 98765 43210",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
  role: "patient",
  email: "ritik@medyora.health",
};

function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return DEFAULT_USER;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return DEFAULT_USER; // Default authenticated session for testing/demo
    if (raw === "logged_out") return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return DEFAULT_USER;
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

  const login = useCallback((phone: string, name?: string, role: "patient" | "doctor" = "patient") => {
    const newUser: AuthUser = {
      id: `usr_${Date.now()}`,
      name: name || (role === "doctor" ? "Dr. Rajesh Sharma" : "Ritik Kumar"),
      phone: phone.startsWith("+91") ? phone : `+91 ${phone}`,
      avatar: role === "doctor"
        ? "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80"
        : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      role,
      email: "user@medyora.health",
    };
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
      window.dispatchEvent(new CustomEvent("medyora:auth"));
    }
    setUser(newUser);
    return newUser;
  }, []);

  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_STORAGE_KEY, "logged_out");
      window.dispatchEvent(new CustomEvent("medyora:auth"));
    }
    setUser(null);
  }, []);

  return {
    user,
    isLoggedIn: !!user,
    login,
    logout,
  };
}
