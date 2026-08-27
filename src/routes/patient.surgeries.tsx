import { createFileRoute } from '@tanstack/react-router'
import { SurgeriesPage } from '@/modules/patient/surgeries/pages/SurgeriesPage'

export const Route = createFileRoute('/patient/surgeries')({
  component: SurgeriesPage,
})
