import { Route, Routes } from 'react-router-dom'
import { Layout, ScrollManager } from './components/Layout'
import Article from './pages/Article'
import Cart from './pages/Cart'
import Catalog from './pages/Catalog'
import Checkout from './pages/Checkout'
import Club from './pages/Club'
import Grower from './pages/Grower'
import Growers from './pages/Growers'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import OliveOil from './pages/OliveOil'
import Product from './pages/Product'
import Quiz from './pages/Quiz'
import Search from './pages/Search'

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Catalog />} />
          <Route path="wine/:id" element={<Product />} />
          <Route path="growers" element={<Growers />} />
          <Route path="growers/:id" element={<Grower />} />
          <Route path="journal/:slug" element={<Article />} />
          <Route path="olive-oil" element={<OliveOil />} />
          <Route path="olive-oil/:id" element={<Product />} />
          <Route path="search" element={<Search />} />
          <Route path="club" element={<Club />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="checkout" element={<Checkout />} />
      </Routes>
    </>
  )
}
