import { Outlet, useLocation } from 'react-router-dom'
import { CartToast } from '../cart/CartToast'
import { Header } from './Header'
import { PageLayout } from './PageLayout'
import { SiteFooter } from './SiteFooter'

export function SiteLayout() {
  const { pathname } = useLocation()
  return (
    <>
      <PageLayout header={<Header />} footer={<SiteFooter />}>
        <Outlet key={pathname} />
      </PageLayout>
      <CartToast />
    </>
  )
}
