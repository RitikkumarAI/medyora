import { createFileRoute } from "@tanstack/react-router";
import { AdminUsers } from "@/modules/admin/users/pages/AdminUsers";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsers,
});
