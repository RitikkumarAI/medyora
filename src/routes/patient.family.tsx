import { createFileRoute } from '@tanstack/react-router'
import { FamilyManagement } from '@/modules/patient/profile/pages/FamilyManagement'

export const Route = createFileRoute('/patient/family')({
  component: FamilyManagement,
})
