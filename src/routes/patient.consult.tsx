import { createFileRoute } from '@tanstack/react-router'
import React, { Suspense } from 'react'

const VideoConsultationPage = React.lazy(() => import('@/modules/patient/consult/pages/VideoConsultationPage').then(m => ({ default: m.VideoConsultationPage })))

export const Route = createFileRoute('/patient/consult')({
  component: () => (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center text-slate-500">Loading Consult...</div>}>
      <VideoConsultationPage />
    </Suspense>
  ),
})
