import { useState } from 'react'
import { site } from '../../lib/site'
import { FAQ } from './constants'
import styles from './ClubFaq.module.css'

export function ClubFaq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="section">
      <div className={`container section-pad ${styles.faqSection}`}>
        <div className="stack" style={{ gap: 16 }}>
          <span className="mono label-wine">05 — Questions</span>
          <h2 className="disp h-m">Before you join</h2>
          <p className="lede" style={{ fontSize: 16 }}>
            Still unsure? Write to <a href={`mailto:${site.email}`}>{site.email}</a> — a person who has tasted every
            wine in the box will answer.
          </p>
        </div>
        <div className={styles.faq}>
          {FAQ.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q}>
                <button aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span>{f.q}</span>
                  <span className={styles.faqIcon} aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && <p id={`faq-${i}`}>{f.a}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
