/**
 * Privacy & HIPAA/GDPR Compliance Sensitive Data Masking Utility
 */

export const maskPhoneNumber = (phone: string): string => {
  if (!phone) return "";
  const cleaned = phone.replace(/\s+/g, "");
  if (cleaned.length < 7) return "***";
  return cleaned.replace(/(\+?\d{2,3})?(\d{2})(\d{4,6})(\d{2})/, "$1 $2*** ***$4");
};

export const maskEmail = (email: string): string => {
  if (!email || !email.includes("@")) return "***@***.com";
  const [user = "", domain = ""] = email.split("@");
  if (!user || !domain) return "***@***.com";
  const first = user[0] ?? "";
  const last = user[user.length - 1] ?? "";
  if (user.length <= 2) {
    return `${first}*@${domain}`;
  }
  return `${first}${"*".repeat(Math.min(user.length - 2, 5))}${last}@${domain}`;
};

export const maskHealthId = (healthId: string): string => {
  if (!healthId) return "";
  if (healthId.length <= 4) return "****";
  return `${healthId.slice(0, 2)}****${healthId.slice(-4)}`;
};
