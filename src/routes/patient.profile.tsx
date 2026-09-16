import { createFileRoute } from "@tanstack/react-router";
import { PatientProfile } from "@/modules/patient/profile/pages/PatientProfile";

export const Route = createFileRoute("/patient/profile")({
  component: PatientProfile,
});
