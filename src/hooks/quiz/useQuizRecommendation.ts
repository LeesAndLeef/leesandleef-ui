import { QuizService } from '../../services/quiz/QuizService'
import { useMutateData } from '../useMutateData'

export const useQuizRecommendation = () =>
  useMutateData((answers: readonly number[]) => QuizService.create().recommend(answers))
