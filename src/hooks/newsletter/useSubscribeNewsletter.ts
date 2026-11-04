import { NewsletterService } from '../../services/newsletter/NewsletterService'
import type { NewsletterSignup } from '../../types'
import { useMutateData } from '../useMutateData'

export const useSubscribeNewsletter = () =>
  useMutateData((signup: NewsletterSignup) => NewsletterService.create().subscribe(signup))
