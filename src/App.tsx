import { Route, Routes } from 'react-router-dom'
import { ScrollManager } from './components/layout/ScrollManager'
import { SiteLayout } from './components/layout/SiteLayout'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout'
import Club from './pages/Club/Club'
import Grower from './pages/Grower/Grower'
import Growers from './pages/Growers/Growers'
import Home from './pages/Home/Home'
import Journal from './pages/Journal/Journal'
import NotFound from './pages/NotFound/NotFound'
import OliveOil from './pages/OliveOil/OliveOil'
import OliveOils from './pages/OliveOils/OliveOils'
import Quiz from './pages/Quiz/Quiz'
import Search from './pages/Search/Search'
import Wine from './pages/Wine/Wine'
import Wines from './pages/Wines/Wines'
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

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path={WINES_ROUTE} element={<Wines />} />
          <Route path={WINE_ROUTE} element={<Wine />} />
          <Route path={GROWERS_ROUTE} element={<Growers />} />
          <Route path={GROWER_ROUTE} element={<Grower />} />
          <Route path={JOURNAL_ROUTE} element={<Journal />} />
          <Route path={OLIVE_OILS_ROUTE} element={<OliveOils />} />
          <Route path={OLIVE_OIL_ROUTE} element={<OliveOil />} />
          <Route path={SEARCH_ROUTE} element={<Search />} />
          <Route path={CLUB_ROUTE} element={<Club />} />
          <Route path={QUIZ_ROUTE} element={<Quiz />} />
          <Route path={CART_ROUTE} element={<Cart />} />
          <Route path={NOT_FOUND_ROUTE} element={<NotFound />} />
        </Route>
        <Route path={CHECKOUT_ROUTE} element={<Checkout />} />
      </Routes>
    </>
  )
}
