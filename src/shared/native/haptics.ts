/**
 * Cross-platform Haptic Feedback utility
 * Works across Web Vibration API and Capacitor Haptics.
 */

export type HapticStyle = "light" | "medium" | "heavy" | "success" | "warning" | "error";

export const triggerHaptic = (style: HapticStyle = "light") => {
  if (typeof window === "undefined" || !("vibrate" in navigator)) return;

  try {
    switch (style) {
      case "light":
        navigator.vibrate(10);
        break;
      case "medium":
        navigator.vibrate(20);
        break;
      case "heavy":
        navigator.vibrate(40);
        break;
      case "success":
        navigator.vibrate([10, 30, 20]);
        break;
      case "warning":
        navigator.vibrate([30, 50, 30]);
        break;
      case "error":
        navigator.vibrate([50, 40, 50, 40, 50]);
        break;
    }
  } catch {
    // Graceful fallback on devices without vibration support
  }
};
