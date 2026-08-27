import { toast } from "sonner";

export interface ShareData {
  title: string;
  text?: string;
  url?: string;
}

export const shareContent = async (data: ShareData): Promise<boolean> => {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share(data);
      return true;
    } catch (err: unknown) {
      if ((err as Error)?.name !== "AbortError") {
        console.warn("[Share] Native share failed, falling back to clipboard:", err);
      }
    }
  }

  // Fallback to Clipboard API
  try {
    const textToCopy = data.url || data.text || data.title;
    await navigator.clipboard.writeText(textToCopy);
    toast.success("Link copied to clipboard!");
    return true;
  } catch {
    toast.error("Unable to share or copy link.");
    return false;
  }
};
