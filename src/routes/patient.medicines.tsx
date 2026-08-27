import { createFileRoute } from '@tanstack/react-router'
import { MedicinesPage } from '@/modules/patient/medicines/pages/MedicinesPage'

export const Route = createFileRoute('/patient/medicines')({
  component: MedicinesPage,
})
