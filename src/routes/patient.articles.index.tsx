import { createFileRoute } from '@tanstack/react-router'
import { ArticlesListing } from '@/modules/patient/articles/pages/ArticlesListing'

export const Route = createFileRoute('/patient/articles/')({
  component: ArticlesListing,
})
