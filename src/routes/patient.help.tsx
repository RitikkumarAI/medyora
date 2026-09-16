import { createFileRoute } from "@tanstack/react-router";
import { HelpCenter } from "@/modules/patient/profile/pages/HelpCenter";

export const Route = createFileRoute("/patient/help")({
  component: HelpCenter,
});
