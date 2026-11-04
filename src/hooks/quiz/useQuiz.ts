import { QUERY_KEYS } from '../../constants'
import { QuizService } from '../../services/quiz/QuizService'
import { useGetData } from '../useGetData'

export const useQuiz = () => useGetData(QUERY_KEYS.QUIZ, (signal) => QuizService.create().getQuiz(signal))
