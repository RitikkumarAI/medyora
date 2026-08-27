import { useState, useEffect } from "react";
import { toast } from "sonner";

interface NetworkInformation extends EventTarget {
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== "undefined" ? navigator.onLine : true;
  });

  const [networkInfo, setNetworkInfo] = useState<{
    effectiveType: string;
    downlink?: number;
    rtt?: number;
  }>({
    effectiveType: "4g",
  });

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success("Back online", {
        description: "Reconnected to Medyora network. Syncing live data...",
        duration: 3000,
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.warning("Network connection lost", {
        description: "Operating in offline mode. Cached records and appointments are available.",
        duration: 5000,
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const nav = navigator as unknown as { connection?: NetworkInformation };
    if (nav.connection) {
      const updateConnection = () => {
        setNetworkInfo({
          effectiveType: nav.connection?.effectiveType || "4g",
          downlink: nav.connection?.downlink,
          rtt: nav.connection?.rtt,
        });
      };
      updateConnection();
      nav.connection.addEventListener?.("change", updateConnection);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return {
    isOnline,
    isOffline: !isOnline,
    ...networkInfo,
  };
}
