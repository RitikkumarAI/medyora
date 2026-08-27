import { createFileRoute } from '@tanstack/react-router'
import { PatientDashboard } from '@/modules/patient/profile/pages/PatientDashboard'

export const Route = createFileRoute('/patient/dashboard')({
  component: PatientDashboard,
})
