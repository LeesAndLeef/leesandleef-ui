import { useSuspenseQuery } from '@tanstack/react-query'
import { articlesQuery } from '../../lib/catalogQueries'

export const useArticles = () => useSuspenseQuery(articlesQuery()).data
