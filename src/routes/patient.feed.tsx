import { createFileRoute } from "@tanstack/react-router";
import { CommunityFeedPage } from "@/modules/patient/community/pages/CommunityFeedPage";

export const Route = createFileRoute("/patient/feed")({
  component: CommunityFeedPage,
});
