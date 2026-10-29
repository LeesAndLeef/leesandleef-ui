import type { FormEvent } from 'react'

export const submitHandler = (onSubmit: () => void) => (e: FormEvent) => {
  e.preventDefault()
  onSubmit()
}
