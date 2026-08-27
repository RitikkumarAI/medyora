import { createFileRoute } from '@tanstack/react-router'
import { DoctorDashboard } from '@/modules/doctor/dashboard/pages/DoctorDashboard'

export const Route = createFileRoute('/doctor/')({
  component: DoctorDashboard,
})
