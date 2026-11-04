import { AuthService } from '../../services/auth/AuthService'
import type { SignupInput } from '../../types'
import { useSessionMutation } from './useSessionMutation'

export const useSignup = () => useSessionMutation((input: SignupInput) => AuthService.create().signup(input))
