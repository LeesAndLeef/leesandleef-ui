import { skipToken } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../constants'
import { ArticleService } from '../../services/article/ArticleService'
import { useGetData } from '../useGetData'

export const useArticle = (slug: string | undefined) =>
  useGetData(
    [...QUERY_KEYS.ARTICLES, slug],
    slug ? (signal) => ArticleService.create().getArticle(slug, signal) : skipToken,
  )
