import { createFileRoute, useRouter } from '@tanstack/react-router'
import { ArrowLeft, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute('/patient/notifications')({
  component: PatientNotifications,
})

function PatientNotifications() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
      {/* Header */}
      <header className="px-4 py-4 flex items-center sticky top-0 bg-[#F8FAFC]/90 dark:bg-slate-950/90 backdrop-blur-md z-40 border-b border-slate-100 dark:border-slate-800">
        <Button variant="ghost" size="icon" onClick={() => router.history.back()} className="h-10 w-10 -ml-2 shrink-0 bg-white dark:bg-slate-800 shadow-xs border border-slate-100 dark:border-slate-700 rounded-full">
          <ArrowLeft className="h-5 w-5 text-slate-700 dark:text-slate-200" />
        </Button>
        <div className="ml-3">
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Notifications</h1>
        </div>
      </header>
      
      <div className="flex flex-col items-center justify-center flex-1 p-6 text-center">
        <div className="h-20 w-20 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-4">
          <Bell className="h-10 w-10 text-slate-300 dark:text-slate-600" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">No new notifications</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">We'll notify you about your appointments, prescriptions and updates here.</p>
      </div>
    </div>
  )
}
