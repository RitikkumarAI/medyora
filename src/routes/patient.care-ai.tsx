import { createFileRoute } from "@tanstack/react-router";
import React, { Suspense } from "react";

const CareAIPage = React.lazy(() =>
  import("@/modules/patient/care-ai/pages/CareAIPage").then((m) => ({ default: m.CareAIPage })),
);

export const Route = createFileRoute("/patient/care-ai")({
  component: () => (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center text-slate-500">
          Loading AI...
        </div>
      }
    >
      <CareAIPage />
    </Suspense>
  ),
});
