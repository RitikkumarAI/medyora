import { createFileRoute } from "@tanstack/react-router";
import React, { Suspense } from "react";

const DoctorDashboard = React.lazy(() =>
  import("@/modules/doctor/dashboard/pages/DoctorDashboard").then((m) => ({
    default: m.DoctorDashboard,
  })),
);

export const Route = createFileRoute("/doctor/")({
  component: () => (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center text-slate-500">
          Loading Dashboard...
        </div>
      }
    >
      <DoctorDashboard />
    </Suspense>
  ),
});
