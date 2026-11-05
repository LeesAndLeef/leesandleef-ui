import { type QueryClient, queryOptions } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants'
import { ArticleService } from '../services/article/ArticleService'
import { ClubPlanService } from '../services/clubPlan/ClubPlanService'
import { GrowerService } from '../services/grower/GrowerService'
import { OilService } from '../services/oil/OilService'
import { QuizService } from '../services/quiz/QuizService'
import { SiteService } from '../services/site/SiteService'
import { WineService } from '../services/wine/WineService'
import { CATALOG_STALE_TIME } from './constants'

export const siteQuery = () =>
  queryOptions({
    queryKey: QUERY_KEYS.SITE,
    queryFn: ({ signal }) => SiteService.create().getSite(signal),
    staleTime: CATALOG_STALE_TIME,
  })

export const winesQuery = () =>
  queryOptions({
    queryKey: QUERY_KEYS.WINES,
    queryFn: ({ signal }) => WineService.create().getWines(signal),
    staleTime: CATALOG_STALE_TIME,
  })

export const oilsQuery = () =>
  queryOptions({
    queryKey: QUERY_KEYS.OILS,
    queryFn: ({ signal }) => OilService.create().getOils(signal),
    staleTime: CATALOG_STALE_TIME,
  })

export const clubPlansQuery = () =>
  queryOptions({
    queryKey: QUERY_KEYS.CLUB_PLANS,
    queryFn: ({ signal }) => ClubPlanService.create().getClubPlans(signal),
    staleTime: CATALOG_STALE_TIME,
  })

export const growersQuery = () =>
  queryOptions({
    queryKey: QUERY_KEYS.GROWERS,
    queryFn: ({ signal }) => GrowerService.create().getGrowers(signal),
    staleTime: CATALOG_STALE_TIME,
  })

export const articlesQuery = () =>
  queryOptions({
    queryKey: QUERY_KEYS.ARTICLES,
    queryFn: ({ signal }) => ArticleService.create().getArticles(signal),
    staleTime: CATALOG_STALE_TIME,
  })

export const quizQuery = () =>
  queryOptions({
    queryKey: QUERY_KEYS.QUIZ,
    queryFn: ({ signal }) => QuizService.create().getQuiz(signal),
    staleTime: CATALOG_STALE_TIME,
  })

export function prefetchCatalog(queryClient: QueryClient) {
  void queryClient.prefetchQuery(siteQuery())
  void queryClient.prefetchQuery(winesQuery())
  void queryClient.prefetchQuery(oilsQuery())
  void queryClient.prefetchQuery(clubPlansQuery())
  void queryClient.prefetchQuery(growersQuery())
  void queryClient.prefetchQuery(articlesQuery())
}
