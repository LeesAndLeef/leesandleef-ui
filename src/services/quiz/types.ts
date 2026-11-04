import type { QuizRecommendation, RawWine } from '../../types'

export interface RawQuizRecommendation extends Omit<QuizRecommendation, 'wines'> {
  wines: RawWine[]
}
