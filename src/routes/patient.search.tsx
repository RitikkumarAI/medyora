import { createFileRoute } from "@tanstack/react-router";
import { SearchPage } from "@/modules/patient/search/pages/SearchPage";

export const Route = createFileRoute("/patient/search")({
  component: SearchPage,
});
