import { createFileRoute } from '@tanstack/react-router'
import { ArticleDetail } from '@/modules/patient/articles/pages/ArticleDetail'

export const Route = createFileRoute('/patient/articles/$articleId')({
  component: ArticleDetail,
})
