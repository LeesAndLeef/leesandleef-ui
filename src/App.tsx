import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { FallbackPage } from './components/layout/FallbackPage'
import { ScrollManager } from './components/layout/ScrollManager'
import { SiteLayout } from './components/layout/SiteLayout'
import HomePage from './pages/Home/HomePage'
import {
  CART_ROUTE,
  CHECKOUT_ROUTE,
  CLUB_ROUTE,
  GROWER_ROUTE,
  GROWERS_ROUTE,
  JOURNAL_ROUTE,
  NOT_FOUND_ROUTE,
  OLIVE_OIL_ROUTE,
  OLIVE_OILS_ROUTE,
  QUIZ_ROUTE,
  SEARCH_ROUTE,
  WINE_ROUTE,
  WINES_ROUTE,
} from './routes'

const CartPage = lazy(() => import('./pages/Cart/CartPage'))
const CheckoutPage = lazy(() => import('./pages/Checkout/CheckoutPage'))
const ClubPage = lazy(() => import('./pages/Club/ClubPage'))
const GrowerPage = lazy(() => import('./pages/Grower/GrowerPage'))
const GrowersPage = lazy(() => import('./pages/Growers/GrowersPage'))
const JournalPage = lazy(() => import('./pages/Journal/JournalPage'))
const NotFoundPage = lazy(() => import('./pages/NotFound/NotFoundPage'))
const OliveOilPage = lazy(() => import('./pages/OliveOil/OliveOilPage'))
const OliveOilsPage = lazy(() => import('./pages/OliveOils/OliveOilsPage'))
const QuizPage = lazy(() => import('./pages/Quiz/QuizPage'))
const SearchPage = lazy(() => import('./pages/Search/SearchPage'))
const WinePage = lazy(() => import('./pages/Wine/WinePage'))
const WinesPage = lazy(() => import('./pages/Wines/WinesPage'))

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path={WINES_ROUTE} element={<WinesPage />} />
          <Route path={WINE_ROUTE} element={<WinePage />} />
          <Route path={GROWERS_ROUTE} element={<GrowersPage />} />
          <Route path={GROWER_ROUTE} element={<GrowerPage />} />
          <Route path={JOURNAL_ROUTE} element={<JournalPage />} />
          <Route path={OLIVE_OILS_ROUTE} element={<OliveOilsPage />} />
          <Route path={OLIVE_OIL_ROUTE} element={<OliveOilPage />} />
          <Route path={SEARCH_ROUTE} element={<SearchPage />} />
          <Route path={CLUB_ROUTE} element={<ClubPage />} />
          <Route path={QUIZ_ROUTE} element={<QuizPage />} />
          <Route path={CART_ROUTE} element={<CartPage />} />
          <Route path={NOT_FOUND_ROUTE} element={<NotFoundPage />} />
        </Route>
        <Route
          path={CHECKOUT_ROUTE}
          element={
            <Suspense fallback={<FallbackPage />}>
              <CheckoutPage />
            </Suspense>
          }
        />
      </Routes>
    </>
  )
}
