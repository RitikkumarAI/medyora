import { createFileRoute } from '@tanstack/react-router'
import { AdminCMS } from '@/modules/admin/cms/pages/AdminCMS'

export const Route = createFileRoute('/admin/cms')({
  component: AdminCMS,
})
