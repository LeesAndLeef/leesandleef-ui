import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { WineCard } from '../../components/product/WineCard'
import { WineGrid } from '../../components/product/WineGrid'
import { Breadcrumb } from '../../components/ui/Breadcrumb'
import { formatCurrency } from '../../lib/currency'
import { quiz, quizProfiles, recommend } from '../../lib/quiz'
import { CLUB_ROUTE, HOME_ROUTE, WINES_ROUTE } from '../../routes'
import { useCart } from '../../state/cart/useCart'
import { COLORS } from '../../styles/colors'
import styles from './QuizPage.module.css'

export default function QuizPage() {
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
        <div className={`container ${styles.head}`}>
          <Breadcrumb
            items={[{ label: 'Home', to: HOME_ROUTE }, { label: 'The Club', to: CLUB_ROUTE }, { label: 'Taste quiz' }]}
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
        <section className={`section ${styles.body}`}>
          <div className={`container ${styles.cardWrap}`}>
            <div className={styles.progress} aria-hidden="true">
              {quiz.map((_, i) => (
                <span key={i} className={i < current ? styles.done : i === current ? styles.on : undefined} />
              ))}
            </div>
            <form
              className={styles.card}
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
                  <span className={`disp ${styles.q}`}>{question.q}</span>
                </legend>
                <div className={styles.answers}>
                  {question.answers.map((a, i) => (
                    <label key={a.label} className={`${styles.answer} ${picked === i ? styles.isPicked : ''}`}>
                      <input type="radio" name={`q${current}`} checked={picked === i} onChange={() => pick(i)} />
                      <span className="mono label-muted">{'ABCD'[i]}</span>
                      <span>{a.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className={styles.nav}>
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
          <section className={`section hatch-w on-dark ${styles.result}`}>
            <div className={`block ${styles.resultB}`} />
            <div className={`container section-pad ${styles.resultInner}`}>
              <div className="stack" style={{ gap: 20 }}>
                <span className="mono label-rose">Your taste profile</span>
                <h2 className="disp h-xl">{quizProfiles[result.top].title}</h2>
                <p className="lede" style={{ color: COLORS.wine100, maxWidth: 560 }}>
                  {quizProfiles[result.top].text}
                </p>
              </div>
              <div className={`glass ${styles.resultCard}`}>
                <span className="mono label-rose">Your mixed six</span>
                <span className="disp" style={{ fontSize: 48 }}>
                  {formatCurrency(result.six.reduce((a, w) => a + w.price, 0))}
                </span>
                <span style={{ fontSize: 14, color: COLORS.wine100 }}>
                  Before the −10% mix-six discount, applied in the cart.
                </span>
                <button className="btn btn-paper btn-lg" onClick={() => result.six.forEach((w) => add(w.id))}>
                  Add all six to cart
                </button>
                <button className="btn btn-ghost-light" onClick={() => add('club-cellar', 1, 'season')}>
                  Or get a box like this every season →
                </button>
                <button className="text-btn" style={{ color: COLORS.paper, alignSelf: 'flex-start' }} onClick={restart}>
                  Retake the quiz
                </button>
              </div>
            </div>
          </section>
          <section className="section">
            <WineGrid className="container section-pad">
              {result.six.map((w) => (
                <WineCard key={w.id} wine={w} onAdd={() => add(w.id)} />
              ))}
            </WineGrid>
          </section>
        </>
      )}

      <section className="section" style={{ background: COLORS.bone }}>
        <div className={`container ${styles.foot}`}>
          <span>Rather pick yourself?</span>
          <Link to={WINES_ROUTE} style={{ fontWeight: 600 }}>
            Browse the cellar →
          </Link>
        </div>
      </section>
    </>
  )
}
