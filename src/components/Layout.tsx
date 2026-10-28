import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { CartToast } from './CartToast'
import { Header } from './Header'

export function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

export function Layout() {
  return (
    <div className="page">
      <Header />
      <main className="page-main">
        <Outlet />
      </main>
      <CartToast />
    </div>
  )
}
