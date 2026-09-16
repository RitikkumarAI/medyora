import { createFileRoute } from "@tanstack/react-router";
import { LanguageSelection } from "@/modules/auth/pages/LanguageSelection";

export const Route = createFileRoute("/auth/language")({
  component: LanguageSelection,
});
