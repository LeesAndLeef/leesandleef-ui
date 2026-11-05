import { useSuspenseQuery } from '@tanstack/react-query'
import { quizQuery } from '../../lib/catalogQueries'

export const useQuiz = () => useSuspenseQuery(quizQuery()).data
