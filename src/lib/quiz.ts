import { WINE_TYPES } from '../constants'
import { quiz, quizProfiles } from '../data/quiz'
import type { Wine, WineFilterType } from '../types'
import { MAX_PER_STYLE } from './constants'
import { wines } from './wine'

export { quiz, quizProfiles }

export function recommend(answers: number[]) {
  const styleScores = Object.fromEntries(WINE_TYPES.map((t) => [t, 0])) as Record<WineFilterType, number>
  let bold = 0
  answers.forEach((a, i) => {
    const ans = quiz[i].answers[a]
    for (const [t, n] of Object.entries(ans.styles)) styleScores[t as WineFilterType] += n
    bold += ans.bold ?? 0
  })

  const score = (w: Wine) => (styleScores[w.type as WineFilterType] ?? 0) * 3 + bold * (parseFloat(w.abv) - 12.5)
  const ranked = wines.filter((w) => !w.unlisted && w.left !== 0).sort((a, b) => score(b) - score(a))

  const six: Wine[] = []
  for (const w of ranked) {
    if (six.filter((x) => x.type === w.type).length < MAX_PER_STYLE) six.push(w)
    if (six.length === 6) break
  }
  const top = WINE_TYPES.reduce((a, b) => (styleScores[b] > styleScores[a] ? b : a))
  return { six, top }
}
