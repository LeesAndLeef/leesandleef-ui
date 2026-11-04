import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query'
import type { MutationRunner } from './types'

export function useMutateData<T, V = void>(
  mutationFn: MutationRunner<T, V>,
  options?: Omit<UseMutationOptions<T, DefaultError, V>, 'mutationFn'>,
) {
  return useMutation({ ...options, mutationFn })
}
