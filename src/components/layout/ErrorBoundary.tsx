import { Component, type ReactNode } from 'react'
import type { ErrorBoundaryProps, ErrorBoundaryState } from './types'

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { failed: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { failed: true }
  }

  retry = () => {
    this.props.onRetry?.()
    this.setState({ failed: false })
  }

  render(): ReactNode {
    return this.state.failed ? this.props.fallback(this.retry) : this.props.children
  }
}
