import { Outlet, useLocation } from 'react-router-dom'
import { CartToast } from '../cart/CartToast'
import { AsyncBoundary } from './AsyncBoundary'
import { ErrorPage } from './ErrorPage'
import { FallbackPage } from './FallbackPage'
import { Header } from './Header'
import { PageLayout } from './PageLayout'
import { SiteFooter } from './SiteFooter'

export function SiteLayout() {
  const { pathname } = useLocation()
  return (
    <>
      <PageLayout
        header={<Header />}
        footer={
          <AsyncBoundary pending={null} failed={() => null}>
            <SiteFooter />
          </AsyncBoundary>
        }
      >
        <AsyncBoundary key={pathname} pending={<FallbackPage />} failed={(retry) => <ErrorPage onRetry={retry} />}>
          <Outlet />
        </AsyncBoundary>
      </PageLayout>
      <CartToast />
    </>
  )
}
