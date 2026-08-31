import { createFileRoute } from '@tanstack/react-router'
import React, { Suspense } from 'react'

const PatientDashboard = React.lazy(() => import('@/modules/patient/profile/pages/PatientDashboard').then(m => ({ default: m.PatientDashboard })))

export const Route = createFileRoute('/patient/dashboard')({
  component: () => (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center text-slate-500">Loading Dashboard...</div>}>
      <PatientDashboard />
    </Suspense>
  ),
})
