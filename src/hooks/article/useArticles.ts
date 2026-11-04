import { QUERY_KEYS } from '../../constants'
import { ArticleService } from '../../services/article/ArticleService'
import { useGetData } from '../useGetData'

export const useArticles = () =>
  useGetData(QUERY_KEYS.ARTICLES, (signal) => ArticleService.create().getArticles(signal))
