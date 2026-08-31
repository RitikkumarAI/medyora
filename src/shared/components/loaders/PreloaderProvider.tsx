import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface PreloaderContextType {
  isVisible: boolean;
  hidePreloader: () => void;
}

const PreloaderContext = createContext<PreloaderContextType | null>(null);

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  // Always trigger loading screen on initial mount / page load
  const [isVisible, setIsVisible] = useState(true);

  const hidePreloader = useCallback(() => {
    setIsVisible(false);
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
