import { createFileRoute } from "@tanstack/react-router";
import { CareAIPage } from "@/modules/patient/care-ai/pages/CareAIPage";

export const Route = createFileRoute("/patient/care-ai")({
  component: CareAIPage,
});
