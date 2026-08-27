/**
 * Medyora Platform & Runtime Environment Detection
 * Identifies iOS, Android, Windows, macOS, Desktop wrappers, PWA, and Web browser.
 */

export const getPlatform = () => {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return {
      isIOS: false,
      isAndroid: false,
      isNativeMobile: false,
      isMacOS: false,
      isWindows: false,
      isLinux: false,
      isDesktop: false,
      isPWA: false,
      isTouchDevice: false,
      platformName: "server",
    };
  }

  const userAgent = navigator.userAgent || navigator.vendor || (window as unknown as { opera?: string }).opera || "";
  
  // Mobile OS detection
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream;
  const isAndroid = /android/i.test(userAgent);
  const isNativeMobile = (window as unknown as { Capacitor?: { isNativePlatform: () => boolean } })?.Capacitor?.isNativePlatform?.() || false;

  // Desktop OS detection
  const isMacOS = /Macintosh|Mac OS X/i.test(userAgent) && !isIOS;
  const isWindows = /Windows/i.test(userAgent);
  const isLinux = /Linux/i.test(userAgent) && !isAndroid;
  const isDesktop = (isMacOS || isWindows || isLinux) && !isIOS && !isAndroid;

  // PWA detection
  const isPWA =
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true;

  // Touch support
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  let platformName = "web";
  if (isNativeMobile) platformName = isIOS ? "ios-native" : "android-native";
  else if (isPWA) platformName = isIOS ? "ios-pwa" : isAndroid ? "android-pwa" : "desktop-pwa";
  else if (isMacOS) platformName = "macos-web";
  else if (isWindows) platformName = "windows-web";
  else if (isIOS) platformName = "ios-web";
  else if (isAndroid) platformName = "android-web";

  return {
    isIOS,
    isAndroid,
    isNativeMobile,
    isMacOS,
    isWindows,
    isLinux,
    isDesktop,
    isPWA,
    isTouchDevice,
    platformName,
  };
};

export const platform = getPlatform();
