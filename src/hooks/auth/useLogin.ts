import { AuthService } from '../../services/auth/AuthService'
import type { LoginInput } from '../../types'
import { useSessionMutation } from './useSessionMutation'

export const useLogin = () => useSessionMutation((input: LoginInput) => AuthService.create().login(input))
