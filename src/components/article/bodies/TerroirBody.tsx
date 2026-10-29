import { COLORS } from '../../../styles/colors'
import { ArticleCallout } from '../ArticleCallout'
import { ArticleDataTable } from '../ArticleDataTable'
import { ArticleFigure } from '../ArticleFigure'
import { ArticlePullQuote } from '../ArticlePullQuote'
import { SOILS } from './constants'
import styles from './TerroirBody.module.css'

export function TerroirBody() {
  return (
    <>
      <h2 id="t1">What terra rossa is</h2>
      <p>
        Walk the slopes below Motovun after autumn rain and the earth looks almost painted. This is <em>terra rossa</em>{' '}
        — “red earth” — a clay soil that forms across the Mediterranean wherever limestone sits close to the surface.
        Over very long periods, rain dissolves the limestone and leaves behind the insoluble residue: fine clay, rich in
        iron oxides. Those oxides are what turn it rust-red.
      </p>
      <p>
        In Istria it is rarely deep. Growers talk about tens of centimetres of red clay before the spade hits fissured
        white rock. The same soil type turns up far from the Adriatic, too — most famously in Coonawarra in South
        Australia — which is one reason winemakers like to compare notes across hemispheres.
      </p>
      <ArticleFigure>
        <div className={styles.grid}>
          {SOILS.map((s) => (
            <div key={s.name} className={styles.col}>
              <div className={`mono ${styles.name}`}>{s.name}</div>
              <div style={{ height: 40, background: COLORS.olive500 }} />
              {s.layers.map((l, i) => (
                <div
                  key={i}
                  className={styles.layer}
                  style={{
                    height: l.h,
                    background: l.bg,
                    backgroundImage: l.lines ? `repeating-linear-gradient(0deg, ${l.lines})` : undefined,
                  }}
                >
                  {l.label && (
                    <span className="mono" style={{ color: l.light ? COLORS.paper : COLORS.ink }}>
                      {l.label}
                    </span>
                  )}
                </div>
              ))}
              <div className={styles.text}>{s.text}</div>
            </div>
          ))}
        </div>
        <figcaption className="mono">
          Fig. 1 — Istria's three soils, as growers name them. Schematic, not to scale.
        </figcaption>
      </ArticleFigure>

      <h2 id="t2">What it does to the vine</h2>
      <p>
        Terra rossa's biggest effect is physical rather than chemical. The clay sits on cracked limestone, so water
        drains away quickly and roots are pushed down into the rock to find moisture. A vine that has to search for
        water grows fewer leaves, sets fewer bunches and ripens smaller berries.
      </p>
      <p>
        Smaller berries mean a higher ratio of skin to juice. Skins hold most of a red grape's colour, tannin and aroma,
        so wines from these slopes tend to be deeply coloured and structured even at modest alcohol. Ana Brajko puts it
        more plainly: “On red soil the vine never gets lazy.”
      </p>
      <ArticlePullQuote by="Ana Brajko, Vina Brajko · Motovun">
        “On red soil the vine never gets lazy. In a wet year that saves you. In a dry one it can break your heart.”
      </ArticlePullQuote>

      <h2 id="t3">So — is it iron?</h2>
      <p>
        Here is where the romance needs a footnote. Vines don't move noticeable amounts of iron from the soil into the
        grape, and the trace minerals that do end up in wine sit far below what anyone could taste. When we call a Teran
        “ferrous” or “bloody”, we are describing a <em>sensation</em>, not a mineral transfer.
      </p>
      <p>
        That sensation has real causes. Teran is a naturally high-acid variety, and that sharp, mouth-watering acidity
        reads as metallic on the palate. Add sour-cherry and red-currant fruit, a savoury, slightly smoky aroma and fine
        tannin, and you get something that reminds people of iron or blood. The soil shapes the wine — through water,
        vigour and skin thickness — but indirectly.
      </p>
      <ul>
        <li>High acidity → the metallic, mouth-watering edge</li>
        <li>Small, thick-skinned berries → colour and grip</li>
        <li>Savoury aromatics → the ‘bloody', cured-meat note</li>
        <li>Limestone underneath → freshness in hot years</li>
      </ul>

      <h2 id="t4">Red, grey, white</h2>
      <p>
        Istrian growers usually split their peninsula into three soils, named simply by colour. The red is terra rossa,
        mostly in the west and south. The grey (<em>siva</em>) is flysch — layered marl and sandstone — in the hilly
        interior. The white (<em>bijela</em>) is a paler, more calcareous marl found in patches between the two.
      </p>
      <ArticleDataTable
        head={['Soil', 'What it is', 'Water', 'Typical grapes', 'Wine style']}
        rows={[
          ['Crvena — red', 'Iron-rich clay over limestone', 'Drains fast', 'Teran, Refošk', 'Dark, high acid, grippy'],
          ['Siva — grey', 'Flysch: marl & sandstone layers', 'Holds more', 'Malvazija, Muškat', 'Rounder, aromatic'],
          ['Bijela — white', 'Calcareous marl', 'Moderate', 'Malvazija', 'Taut, saline, linear'],
        ]}
        caption="Table 1 — How growers in Istria talk about their soils. Simplified."
      />

      <h2 id="t5">Taste it yourself</h2>
      <p>
        The best way to understand soil is to taste the same grape from two of them side by side — or, failing that, two
        grapes from the same hill. You don't need special glasses or a vocabulary. You just need two bottles open at the
        same time.
      </p>
      <ArticleCallout
        kicker="Try this at home"
        title="A two-bottle terroir test"
        steps={[
          'Open a red-soil Teran and a grey-soil Malvazija at the same time.',
          'Taste the white first, then the red, then the white again.',
          'Notice where the acidity hits: tip of the tongue, or the sides?',
          'Leave both open overnight. Taste again the next day — the soil shows more on day two.',
        ]}
      />
      <p>
        Our Brajko trio was put together for exactly this: one Teran from <em>crvena zemlja</em>, one Malvazija from
        white marl, and a dry Muškat from grey flysch. Three soils, one family, one cellar.
      </p>
    </>
  )
}
