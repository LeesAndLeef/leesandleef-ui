import { QueryClientProvider } from '@tanstack/react-query'
import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { prefetchCatalog } from './lib/catalogQueries'
import { queryClient } from './lib/queryClient'
import { CartProvider } from './state/cart/CartProvider'
import './styles/global.css'
import App from './App.tsx'

const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(() => import('@tanstack/react-query-devtools').then((m) => ({ default: m.ReactQueryDevtools })))
  : null

prefetchCatalog(queryClient)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
      {ReactQueryDevtools && (
        <Suspense fallback={null}>
          <ReactQueryDevtools />
        </Suspense>
      )}
    </QueryClientProvider>
  </StrictMode>,
)
