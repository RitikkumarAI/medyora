import { createFileRoute } from "@tanstack/react-router";
import { BloodBankPage } from "@/modules/patient/blood/pages/BloodBankPage";

export const Route = createFileRoute("/patient/blood")({
  component: BloodBankPage,
});
