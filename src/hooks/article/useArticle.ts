import { useSuspenseQuery } from '@tanstack/react-query'
import { articlesQuery } from '../../lib/catalogQueries'

export const useArticle = (slug: string | undefined) =>
  useSuspenseQuery({ ...articlesQuery(), select: (articles) => articles.find((article) => article.slug === slug) }).data
