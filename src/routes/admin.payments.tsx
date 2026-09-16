import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/payments")({
  component: () => (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <Button variant="outline" className="mb-8" onClick={() => window.history.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
      </Button>
      <h1 className="text-2xl font-black text-slate-900 mb-2">Platform Payments</h1>
      <p className="text-slate-500">Coming soon in the next phase!</p>
    </div>
  ),
});
