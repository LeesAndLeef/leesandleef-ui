import { ArticleCallout } from '../ArticleCallout'
import { ArticleDataTable } from '../ArticleDataTable'
import { ArticleFigure } from '../ArticleFigure'
import { ArticlePullQuote } from '../ArticlePullQuote'
import { SKIN_TIMELINE } from './constants'
import styles from './SkinContactBody.module.css'

export function SkinContactBody() {
  return (
    <>
      <h2 id="s1">White wine, made like red</h2>
      <p>
        Most white wine is made by pressing the grapes straight away and fermenting only the juice. Red wine is the
        opposite: the juice ferments together with the skins for days or weeks, which is where its colour and tannin
        come from. Skin-contact wine simply applies the red-wine method to white grapes.
      </p>
      <p>
        The result goes by many names — orange, amber, skin-macerated — but they all describe the same idea. It’s also
        one of the oldest ways of making wine there is. In Georgia, white grapes have been fermented on their skins in
        buried clay vessels called <em>qvevri</em> for millennia, and the tradition never stopped. Closer to us, growers
        in Friuli, Slovenian Brda and Istria revived it in the late twentieth century.
      </p>

      <h2 id="s2">What the skins add</h2>
      <p>
        Grape skins are packed with phenolic compounds: pigments, tannins and aromatics. Left in contact with fermenting
        juice, they leach into the wine. Three things change at once.
      </p>
      <ul>
        <li>
          <span>
            <strong>Colour.</strong> From gold to copper to deep amber, depending on grape and time.
          </span>
        </li>
        <li>
          <span>
            <strong>Tannin and texture.</strong> A gentle grip, like strong black tea — unusual in a white.
          </span>
        </li>
        <li>
          <span>
            <strong>Aroma.</strong> Dried apricot, orange peel, chamomile, honey, sometimes nuts and spice.
          </span>
        </li>
      </ul>
      <p>
        Aromatic varieties like Malvazija and Muškat are especially good at this: their skins carry a lot of perfume,
        and maceration turns that perfume into something deeper and more savoury.
      </p>
      <ArticleFigure className={styles.fig}>
        <div className={styles.grid}>
          {SKIN_TIMELINE.map(([time, name, colour]) => (
            <div key={time}>
              <div style={{ height: 120, background: colour }} />
              <div className={styles.cell}>
                <span className="disp">{time}</span>
                <span>{name}</span>
              </div>
            </div>
          ))}
        </div>
        <div className={`mono ${styles.tannin}`}>
          <span>Tannin: low</span>
          <span>Medium</span>
          <span>Firm</span>
        </div>
        <figcaption className="mono">
          Fig. 1 — Time on skins vs colour. Indicative only: grape, temperature and oxygen all shift the result.
        </figcaption>
      </ArticleFigure>

      <h2 id="s3">How long is long?</h2>
      <p>
        There is no fixed rule. A few hours of contact gives a white wine extra texture without much colour. A week
        makes something clearly orange, with real tannin. Several months — common in amphora — produces wines that are
        deep amber, firm and very long-lived.
      </p>
      <ArticlePullQuote by="Radić family, Obitelj Radić · Momjan">
        “Seven days is where Malvazija starts to talk. Before that it whispers, after a month it shouts.”
      </ArticlePullQuote>

      <h2 id="s4">Clay, wood or steel</h2>
      <p>
        The vessel matters less than the time, but it still shapes the wine. Clay amphorae breathe slightly and keep a
        steady temperature, especially when buried. Old oak adds gentle oxygen without tasting of wood. Stainless steel
        keeps things fresh and fruit-forward. Many growers use more than one.
      </p>
      <ArticleDataTable
        head={['Vessel', 'Oxygen', 'Temperature', 'Typical result']}
        rows={[
          ['Clay amphora / qvevri', 'Slow, gentle', 'Very stable if buried', 'Textured, earthy, long'],
          ['Old oak barrel', 'Gentle', 'Follows the cellar', 'Rounded, nutty'],
          ['Stainless steel', 'Almost none', 'Easy to control', 'Fresh, fruity, precise'],
        ]}
        caption="Table 1 — Common vessels for skin-contact wine."
      />

      <h2 id="s5">Serving and food</h2>
      <p>
        Because of its tannin, skin-contact wine shows best a little warmer than a typical white. Too cold and it tastes
        hard; too warm and it loses freshness. Open it a while before dinner — many improve over a day or two.
      </p>
      <ArticleCallout
        kicker="How to serve it"
        title="Four rules for orange wine"
        steps={[
          'Serve at 12–14 °C — about 20 minutes out of the fridge.',
          'Use a red-wine glass, not a narrow white one.',
          'Pair it with food that has texture: roast vegetables, aged cheese, spiced dishes.',
          'Don’t be scared of day two. Recork and keep it in the fridge.',
        ]}
      />
      <p>
        And one myth to retire: skin-contact doesn’t mean cloudy, funky or faulty. Plenty of orange wines are perfectly
        clear and clean. When one of ours is deliberately wild, the tasting card says so.
      </p>
    </>
  )
}
