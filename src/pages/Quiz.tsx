import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../cart/context'
import { MiniFooter } from '../components/Footer'
import { Breadcrumb, WineCard } from '../components/ui'
import { euro, type ShopWineType, type Wine, wines, wineTypes } from '../data/products'
import { profiles, quiz } from '../data/quiz'
import './Quiz.css'

const MAX_PER_STYLE = 2

function recommend(answers: number[]) {
  const styles = Object.fromEntries(wineTypes.map((t) => [t, 0])) as Record<ShopWineType, number>
  let bold = 0
  answers.forEach((a, i) => {
    const ans = quiz[i].answers[a]
    for (const [t, n] of Object.entries(ans.styles)) styles[t as ShopWineType] += n
    bold += ans.bold ?? 0
  })

  const score = (w: Wine) => (styles[w.type as ShopWineType] ?? 0) * 3 + bold * (parseFloat(w.abv) - 12.5)
  const ranked = wines.filter((w) => !w.unlisted && w.left !== 0).sort((a, b) => score(b) - score(a))

  const six: Wine[] = []
  for (const w of ranked) {
    if (six.filter((x) => x.type === w.type).length < MAX_PER_STYLE) six.push(w)
    if (six.length === 6) break
  }
  const top = wineTypes.reduce((a, b) => (styles[b] > styles[a] ? b : a))
  return { six, top }
}

export default function Quiz() {
  const { add } = useCart()
  const [answers, setAnswers] = useState<number[]>([])
  const [current, setCurrent] = useState(0)
  const done = answers.length === quiz.length && current === quiz.length
  const result = useMemo(() => (done ? recommend(answers) : null), [done, answers])

  const question = quiz[current]
  const picked = answers[current]

  function pick(i: number) {
    const next = [...answers]
    next[current] = i
    setAnswers(next)
  }

  function restart() {
    setAnswers([])
    setCurrent(0)
  }

  return (
    <>
      <section className="section gridbg">
        <div className="container quiz-head">
          <Breadcrumb
            items={[{ label: 'Home', to: '/' }, { label: 'The Club', to: '/club' }, { label: 'Taste quiz' }]}
          />
          <div className="section-head">
            <h1 className="disp h-xl">
              Taste quiz<span className="accent">.</span>
            </h1>
            <p className="lede" style={{ maxWidth: 460, fontSize: 16 }}>
              Eight questions about coffee, citrus and cheese. No wine vocabulary needed — we’ll build you a mixed six.
            </p>
          </div>
        </div>
      </section>

      {!result ? (
        <section className="section quiz-body">
          <div className="container quiz-card-wrap">
            <div className="quiz-progress" aria-hidden="true">
              {quiz.map((_, i) => (
                <span key={i} className={i < current ? 'done' : i === current ? 'on' : undefined} />
              ))}
            </div>
            <form
              className="quiz-card"
              onSubmit={(e) => {
                e.preventDefault()
                if (picked !== undefined) setCurrent(current + 1)
              }}
            >
              <fieldset>
                <legend className="stack" style={{ gap: 12 }}>
                  <span className="mono label-wine">
                    Question {current + 1} of {quiz.length}
                  </span>
                  <span className="disp quiz-q">{question.q}</span>
                </legend>
                <div className="quiz-answers">
                  {question.answers.map((a, i) => (
                    <label key={a.label} className={'quiz-answer' + (picked === i ? ' is-picked' : '')}>
                      <input type="radio" name={`q${current}`} checked={picked === i} onChange={() => pick(i)} />
                      <span className="mono label-muted">{'ABCD'[i]}</span>
                      <span>{a.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="quiz-nav">
                <button
                  type="button"
                  className="btn btn-outline"
                  disabled={current === 0}
                  onClick={() => setCurrent(current - 1)}
                >
                  ← Back
                </button>
                <button type="submit" className="btn btn-primary" disabled={picked === undefined}>
                  {current === quiz.length - 1 ? 'See my six →' : 'Next →'}
                </button>
              </div>
            </form>
          </div>
        </section>
      ) : (
        <>
          <section className="section hatch-w on-dark quiz-result">
            <div className="block quiz-result-b" />
            <div className="container section-pad quiz-result-inner">
              <div className="stack" style={{ gap: 20 }}>
                <span className="mono label-rose">Your taste profile</span>
                <h2 className="disp h-xl">{profiles[result.top].title}</h2>
                <p className="lede" style={{ color: 'var(--wine-100)', maxWidth: 560 }}>
                  {profiles[result.top].text}
                </p>
              </div>
              <div className="glass quiz-result-card">
                <span className="mono label-rose">Your mixed six</span>
                <span className="disp" style={{ fontSize: 48 }}>
                  {euro(result.six.reduce((a, w) => a + w.price, 0))}
                </span>
                <span style={{ fontSize: 14, color: 'var(--wine-100)' }}>
                  Before the −10% mix-six discount, applied in the cart.
                </span>
                <button className="btn btn-paper btn-lg" onClick={() => result.six.forEach((w) => add(w.id))}>
                  Add all six to cart
                </button>
                <button className="btn btn-ghost-light" onClick={() => add('club-cellar', 1, 'season')}>
                  Or get a box like this every season →
                </button>
                <button
                  className="text-btn"
                  style={{ color: 'var(--paper)', alignSelf: 'flex-start' }}
                  onClick={restart}
                >
                  Retake the quiz
                </button>
              </div>
            </div>
          </section>
          <section className="section">
            <div className="container section-pad results-grid">
              {result.six.map((w) => (
                <WineCard key={w.id} wine={w} />
              ))}
            </div>
          </section>
        </>
      )}

      <section className="section" style={{ background: 'var(--bone)' }}>
        <div className="container quiz-foot">
          <span>Rather pick yourself?</span>
          <Link to="/shop" style={{ fontWeight: 600 }}>
            Browse the cellar →
          </Link>
        </div>
      </section>

      <MiniFooter />
    </>
  )
}
