import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/patient/articles')({
  component: () => <Outlet />,
})
