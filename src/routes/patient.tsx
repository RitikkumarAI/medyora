import { createFileRoute } from "@tanstack/react-router";
import { PatientLayout } from "@/modules/patient/components/PatientLayout";

export const Route = createFileRoute("/patient")({
  component: PatientLayout,
});
