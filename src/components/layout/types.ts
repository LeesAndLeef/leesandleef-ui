import type { ReactNode } from 'react'
import type { NavMatch } from '../../lib/types'

export interface NavLink {
  to: string
  label: string
  activeOn: NavMatch
}

export interface ErrorBoundaryProps {
  fallback: (retry: () => void) => ReactNode
  onRetry?: () => void
  children: ReactNode
}

export interface ErrorBoundaryState {
  failed: boolean
}

export interface AsyncBoundaryProps {
  pending: ReactNode
  failed: (retry: () => void) => ReactNode
  children: ReactNode
}
