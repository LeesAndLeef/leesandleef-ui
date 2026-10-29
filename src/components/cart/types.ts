import type { ReactNode } from 'react'

export interface CartLayoutProps {
  main: ReactNode
  summary: ReactNode
  variant?: 'cart' | 'checkout'
}
