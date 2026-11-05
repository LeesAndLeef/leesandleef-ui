import { useSuspenseQuery } from '@tanstack/react-query'
import { siteQuery } from '../../lib/catalogQueries'

export const useSite = () => useSuspenseQuery(siteQuery()).data
