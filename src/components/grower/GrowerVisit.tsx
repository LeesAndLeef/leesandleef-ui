import { type FormEvent, useState } from 'react'
import type { GrowerProfile } from '../../types'
import styles from './GrowerVisit.module.css'

export function GrowerVisit({ visit, label }: { visit: NonNullable<GrowerProfile['visit']>; label: string }) {
  const [sent, setSent] = useState(false)

  function submit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="visit" className="section">
      <div className={`container section-pad ${styles.root}`}>
        <div className="stack" style={{ gap: 20 }}>
          <span className="mono label-wine">{label}</span>
          <h2 className="disp h-m">{visit.title}</h2>
          <p className="lede">{visit.intro}</p>
          <dl className={styles.rows}>
            {visit.rows.map(([k, v]) => (
              <div key={k}>
                <dt className="mono label-muted">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        {sent ? (
          <div className={styles.form} role="status">
            <span className="disp" style={{ fontSize: 24 }}>
              Request sent
            </span>
            <p className="lede">We’ll pass your details to {visit.host} and confirm the date by email.</p>
            <button className="btn btn-outline" style={{ alignSelf: 'flex-start' }} onClick={() => setSent(false)}>
              Send another
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={submit}>
            <span className="disp" style={{ fontSize: 24 }}>
              {visit.formTitle}
            </span>
            <div className={styles.fields}>
              <label className="fld">
                Name
                <input className="input" type="text" name="name" autoComplete="name" required />
              </label>
              <label className="fld">
                Email
                <input className="input" type="email" name="email" autoComplete="email" required />
              </label>
              <label className="fld">
                Preferred date
                <input className="input" type="date" name="date" required />
              </label>
              <label className="fld">
                Guests
                <select className="input" name="guests" defaultValue="2">
                  {[2, 3, 4, 5, 6].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="fld">
              Anything {visit.host} should know?
              <textarea className="input" rows={4} name="notes" />
            </label>
            <button type="submit" className="btn btn-ink btn-lg">
              Send request
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
