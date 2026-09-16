import { createFileRoute } from "@tanstack/react-router";
import { LabTestsPage } from "@/modules/patient/lab-tests/pages/LabTestsPage";

export const Route = createFileRoute("/patient/lab-tests")({
  component: LabTestsPage,
});
