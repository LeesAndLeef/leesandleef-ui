import { useState } from 'react'

export function useKeyedState<T>(key: string, initial: T) {
  const [state, setState] = useState({ key, value: initial })
  const value = state.key === key ? state.value : initial
  const setValue = (next: T) => setState({ key, value: next })
  return [value, setValue] as const
}
