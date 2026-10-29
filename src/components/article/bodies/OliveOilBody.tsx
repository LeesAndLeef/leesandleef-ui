import { ArticleCallout } from '../ArticleCallout'
import { ArticleDataTable } from '../ArticleDataTable'
import { ArticleFigure } from '../ArticleFigure'
import { ArticlePullQuote } from '../ArticlePullQuote'
import { LABEL_LINES } from './constants'
import styles from './OliveOilBody.module.css'

export function OliveOilBody() {
  return (
    <>
      <h2 id="o1">Harvest date first</h2>
      <p>
        Olive oil is a fruit juice, and it starts fading the moment it’s pressed. That’s why the most useful line on a
        label is the harvest date — the season the olives were picked. Oil from the most recent harvest will taste
        greener and more vivid than the same oil a year later.
      </p>
      <p>
        A best-before date is less helpful. It is set from bottling, not from picking, so an oil bottled long after the
        harvest can still show a date far in the future. If a label only has a best-before, treat it as a warning, not a
        reassurance.
      </p>
      <ArticleFigure className={styles.fig}>
        <div className={`hatch ${styles.figArt}`}>
          <div className={styles.card}>
            <span className="disp" style={{ fontSize: 22 }}>
              Buža
            </span>
            <span style={{ fontSize: 12 }}>Extra virgin olive oil · 500 ml</span>
            {LABEL_LINES.map(([line], i) => (
              <div key={line} className={styles.line}>
                <span className="mono">{i + 1}</span>
                <span>{line}</span>
              </div>
            ))}
          </div>
        </div>
        <ol className={styles.notes}>
          {LABEL_LINES.map(([, name, text], i) => (
            <li key={name}>
              <span className="mono">{i + 1}</span>
              <span>
                <strong>{name}</strong> — {text}
              </span>
            </li>
          ))}
        </ol>
        <figcaption className="mono">Fig. 1 — Anatomy of a good label, using our Buža as the example.</figcaption>
      </ArticleFigure>

      <h2 id="o2">Cultivar and origin</h2>
      <p>
        Just like wine grapes, olive varieties have their own personalities. In Istria and Dalmatia you’ll meet Buža
        (grassy, almond, gently bitter), Istarska Bjelica (intensely bitter and peppery), Oblica and Levantinka (softer
        and riper). A label that names the cultivar is telling you what to expect.
      </p>
      <p>
        Origin matters for the same reason. “Single estate” or a named grove means you can trace the oil to real trees.
        “Blend of EU oils” or “EU and non-EU oils” means it could have come from almost anywhere.
      </p>

      <h2 id="o3">The two numbers that matter</h2>
      <p>Good producers often print lab results. Two are worth learning.</p>
      <ArticleDataTable
        head={['Number', 'What it measures', 'Legal / reference point', 'What good looks like']}
        rows={[
          [
            'Free acidity',
            'Breakdown of the oil — damage, delay, rot',
            '≤ 0.8% for extra virgin (EU)',
            'Well under 0.3%',
          ],
          [
            'Polyphenols',
            'Antioxidants behind bitterness & pepper',
            'EU health claim from ~250 mg/kg*',
            '300–800+ mg/kg',
          ],
        ]}
        caption="Table 1 — *The EU health claim needs 5 mg of hydroxytyrosol and derivatives per 20 g of oil, roughly 250 mg/kg."
      />
      <p>
        Low acidity tells you the olives were healthy and pressed quickly. High polyphenols tell you the oil is fresh,
        made from early or bitter varieties, and likely to keep well. They are also what you taste as bitterness and as
        that peppery tickle at the back of the throat.
      </p>
      <ArticlePullQuote by="Vina Brajko · on their Buža oil">
        “If it makes you cough, we did our job. That sting is the good stuff.”
      </ArticlePullQuote>

      <h2 id="o4">Bottle and storage</h2>
      <p>
        Light, heat and air are what ruin oil. Dark glass or a tin protects it; a clear bottle on a bright supermarket
        shelf doesn’t. At home, keep it away from the stove and close the cap. A large tin is fine if you decant into a
        small dark bottle for daily use.
      </p>

      <h2 id="o5">Red flags</h2>
      <ArticleCallout
        kicker="Before you buy"
        title="Five signs to put the bottle back"
        steps={[
          'No harvest date anywhere on the label.',
          '“Pure”, “light” or plain “olive oil” — these are refined, not extra virgin.',
          '“Blend of EU and non-EU oils” with no named origin.',
          'A clear bottle that has sat under shop lights.',
          'It tastes of crayons, old nuts or vinegar — that’s rancid or fusty oil.',
        ]}
      />
      <p>
        The good news: once you start reading the back label, most of the decision is made for you. Then the last test
        is simple — pour a spoonful, taste it on its own, and see if it makes you want bread.
      </p>
    </>
  )
}
