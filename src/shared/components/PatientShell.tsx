import type { ReactNode } from "react";
import { CalendarDays, FileText, LayoutDashboard, ListOrdered, User } from "lucide-react";
import { AppShell, type NavItem } from "./AppShell";

export const PATIENT_NAV: NavItem[] = [
  { to: "/patient", label: "Dashboard", icon: LayoutDashboard },
  { to: "/patient/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/patient/queue", label: "Live Queue", icon: ListOrdered },
  { to: "/patient/prescriptions", label: "Prescriptions", icon: FileText },
  { to: "/auth/profile", label: "Profile", icon: User },
];

export function PatientShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string | undefined;
  actions?: ReactNode | undefined;
  children: ReactNode;
}) {
  return (
    <AppShell title={title} subtitle={subtitle} nav={PATIENT_NAV} actions={actions}>
      {children}
    </AppShell>
  );
}
