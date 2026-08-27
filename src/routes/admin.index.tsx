import { createFileRoute } from '@tanstack/react-router'
import { AdminDashboard } from '@/modules/admin/dashboard/pages/AdminDashboard'

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
})
