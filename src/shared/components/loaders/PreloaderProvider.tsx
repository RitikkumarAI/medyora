import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface PreloaderContextType {
  isVisible: boolean;
  hidePreloader: () => void;
}

const PreloaderContext = createContext<PreloaderContextType | null>(null);

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  // Only trigger preloader on the very first visit in a session to keep navigation snappy & instant
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      const seen = window.sessionStorage.getItem("medyora_preloader_seen");
      return !seen;
    } catch {
      return false;
    }
  });

  const hidePreloader = useCallback(() => {
    setIsVisible(false);
    try {
      window.sessionStorage.setItem("medyora_preloader_seen", "true");
    } catch {
      // safe fallback
    }
  }, []);

  return (
    <PreloaderContext.Provider value={{ isVisible, hidePreloader }}>
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader(): PreloaderContextType {
  const context = useContext(PreloaderContext);
  if (!context) {
    return {
      isVisible: false,
      hidePreloader: () => {},
    };
  }
  return context;
}
