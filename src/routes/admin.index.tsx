import { createFileRoute } from "@tanstack/react-router";
import React, { Suspense } from "react";

const AdminDashboard = React.lazy(() =>
  import("@/modules/admin/dashboard/pages/AdminDashboard").then((m) => ({
    default: m.AdminDashboard,
  })),
);

export const Route = createFileRoute("/admin/")({
  component: () => (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center text-slate-500">
          Loading Dashboard...
        </div>
      }
    >
      <AdminDashboard />
    </Suspense>
  ),
});
