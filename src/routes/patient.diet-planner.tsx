import { createFileRoute } from "@tanstack/react-router";
import { DietMealPlannerPage } from "@/modules/patient/care-ai/pages/DietMealPlannerPage";

export const Route = createFileRoute("/patient/diet-planner")({
  component: DietMealPlannerPage,
});
