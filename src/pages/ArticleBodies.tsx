import type { ReactNode } from 'react'

function PullQuote({ children, by }: { children: ReactNode; by: string }) {
  return (
    <figure className="hatch-w art-quote">
      <div className="block art-quote-b" aria-hidden="true" />
      <blockquote className="disp">{children}</blockquote>
      <figcaption className="mono">{by}</figcaption>
    </figure>
  )
}

function Callout({ kicker, title, steps }: { kicker: string; title: string; steps: string[] }) {
  return (
    <aside className="hatch art-callout">
      <div className="block art-callout-b" aria-hidden="true" />
      <div className="glass art-callout-panel">
        <span className="mono" style={{ color: 'var(--sage)' }}>
          {kicker}
        </span>
        <span className="disp art-callout-title">{title}</span>
        <ol>
          {steps.map((s, i) => (
            <li key={s}>
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  )
}

function DataTable({ head, rows, caption }: { head: string[]; rows: string[][]; caption: ReactNode }) {
  return (
    <figure className="art-table">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h} className="mono">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]}>
                {r.map((c, i) => (
                  <td key={i}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mono">{caption}</figcaption>
    </figure>
  )
}

interface SoilLayer {
  h: number
  bg: string
  label?: string
  light?: boolean
  lines?: string
}

const soils: { name: string; layers: SoilLayer[]; text: string }[] = [
  {
    name: 'Crvena · Red',
    layers: [
      { h: 90, bg: '#8A3A2A', label: 'Terra rossa 40–80 cm', light: true },
      { h: 110, bg: '#D9D9C0', label: 'Limestone / karst', lines: 'rgba(27,29,20,.18) 0 1px, transparent 1px 18px' },
    ],
    text: 'Iron-rich clay over fissured limestone. Drains fast. Teran, Refošk.',
  },
  {
    name: 'Siva · Grey',
    layers: [
      { h: 130, bg: '#8D8C80', label: 'Flysch marl & sandstone', light: true },
      { h: 70, bg: '#5E5D53', lines: 'rgba(239,236,227,.15) 0 1px, transparent 1px 10px' },
    ],
    text: 'Layered marl that holds more water. Malvazija, Muškat.',
  },
  {
    name: 'Bijela · White',
    layers: [
      { h: 130, bg: '#E3DFD2', label: 'Calcareous marl' },
      { h: 70, bg: '#CFCAB8', lines: 'rgba(27,29,20,.12) 0 1px, transparent 1px 10px' },
    ],
    text: 'Pale, chalky, hard work for the vine. Taut, saline whites.',
  },
]

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
      <figure className="art-fig">
        <div className="soil-grid">
          {soils.map((s) => (
            <div key={s.name} className="soil-col">
              <div className="mono soil-name">{s.name}</div>
              <div style={{ height: 40, background: '#6B733A' }} />
              {s.layers.map((l, i) => (
                <div
                  key={i}
                  className="soil-layer"
                  style={{
                    height: l.h,
                    background: l.bg,
                    backgroundImage: l.lines ? `repeating-linear-gradient(0deg, ${l.lines})` : undefined,
                  }}
                >
                  {l.label && (
                    <span className="mono" style={{ color: l.light ? 'var(--paper)' : 'var(--ink)' }}>
                      {l.label}
                    </span>
                  )}
                </div>
              ))}
              <div className="soil-text">{s.text}</div>
            </div>
          ))}
        </div>
        <figcaption className="mono">
          Fig. 1 — Istria’s three soils, as growers name them. Schematic, not to scale.
        </figcaption>
      </figure>

      <h2 id="t2">What it does to the vine</h2>
      <p>
        Terra rossa’s biggest effect is physical rather than chemical. The clay sits on cracked limestone, so water
        drains away quickly and roots are pushed down into the rock to find moisture. A vine that has to search for
        water grows fewer leaves, sets fewer bunches and ripens smaller berries.
      </p>
      <p>
        Smaller berries mean a higher ratio of skin to juice. Skins hold most of a red grape’s colour, tannin and aroma,
        so wines from these slopes tend to be deeply coloured and structured even at modest alcohol. Ana Brajko puts it
        more plainly: “On red soil the vine never gets lazy.”
      </p>
      <PullQuote by="Ana Brajko, Vina Brajko · Motovun">
        “On red soil the vine never gets lazy. In a wet year that saves you. In a dry one it can break your heart.”
      </PullQuote>

      <h2 id="t3">So — is it iron?</h2>
      <p>
        Here is where the romance needs a footnote. Vines don’t move noticeable amounts of iron from the soil into the
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
        <li>Savoury aromatics → the ‘bloody’, cured-meat note</li>
        <li>Limestone underneath → freshness in hot years</li>
      </ul>

      <h2 id="t4">Red, grey, white</h2>
      <p>
        Istrian growers usually split their peninsula into three soils, named simply by colour. The red is terra rossa,
        mostly in the west and south. The grey (<em>siva</em>) is flysch — layered marl and sandstone — in the hilly
        interior. The white (<em>bijela</em>) is a paler, more calcareous marl found in patches between the two.
      </p>
      <DataTable
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
        grapes from the same hill. You don’t need special glasses or a vocabulary. You just need two bottles open at the
        same time.
      </p>
      <Callout
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

const skinTimeline = [
  ['0 h', 'White', '#E8E2B8'],
  ['12 h', 'Golden', '#E2D49A'],
  ['2 d', 'Pale amber', '#D9B870'],
  ['1 wk', 'Orange', '#C9944A'],
  ['1 mo', 'Amber', '#A2562A'],
  ['6 mo', 'Deep amber', '#7A3A1C'],
]

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
      <figure className="art-fig skin-fig">
        <div className="skin-grid">
          {skinTimeline.map(([time, name, colour]) => (
            <div key={time}>
              <div style={{ height: 120, background: colour }} />
              <div className="skin-cell">
                <span className="disp">{time}</span>
                <span>{name}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mono skin-tannin">
          <span>Tannin: low</span>
          <span>Medium</span>
          <span>Firm</span>
        </div>
        <figcaption className="mono">
          Fig. 1 — Time on skins vs colour. Indicative only: grape, temperature and oxygen all shift the result.
        </figcaption>
      </figure>

      <h2 id="s3">How long is long?</h2>
      <p>
        There is no fixed rule. A few hours of contact gives a white wine extra texture without much colour. A week
        makes something clearly orange, with real tannin. Several months — common in amphora — produces wines that are
        deep amber, firm and very long-lived.
      </p>
      <PullQuote by="Radić family, Obitelj Radić · Momjan">
        “Seven days is where Malvazija starts to talk. Before that it whispers, after a month it shouts.”
      </PullQuote>

      <h2 id="s4">Clay, wood or steel</h2>
      <p>
        The vessel matters less than the time, but it still shapes the wine. Clay amphorae breathe slightly and keep a
        steady temperature, especially when buried. Old oak adds gentle oxygen without tasting of wood. Stainless steel
        keeps things fresh and fruit-forward. Many growers use more than one.
      </p>
      <DataTable
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
      <Callout
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

const labelLines = [
  ['Harvest: October 2025', 'Harvest date', 'the single most useful line. Fresher is better.'],
  ['Cultivar: 100% Buža', 'Cultivar', 'tells you the style before you open it.'],
  ['Origin: single grove, Istria', 'Origin', 'a place you could visit beats “EU blend”.'],
  ['Acidity 0.18% · Polyphenols 612 mg/kg', 'Lab numbers', 'producers proud of their oil print them.'],
  ['Best before: April 2027', 'Best before', 'set from bottling, not picking. Read it last.'],
]

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
      <figure className="art-fig label-fig">
        <div className="hatch label-fig-art">
          <div className="label-card">
            <span className="disp" style={{ fontSize: 22 }}>
              Buža
            </span>
            <span style={{ fontSize: 12 }}>Extra virgin olive oil · 500 ml</span>
            {labelLines.map(([line], i) => (
              <div key={line} className="label-line">
                <span className="mono">{i + 1}</span>
                <span>{line}</span>
              </div>
            ))}
          </div>
        </div>
        <ol className="label-notes">
          {labelLines.map(([, name, text], i) => (
            <li key={name}>
              <span className="mono">{i + 1}</span>
              <span>
                <strong>{name}</strong> — {text}
              </span>
            </li>
          ))}
        </ol>
        <figcaption className="mono">Fig. 1 — Anatomy of a good label, using our Buža as the example.</figcaption>
      </figure>

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
      <DataTable
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
      <PullQuote by="Vina Brajko · on their Buža oil">
        “If it makes you cough, we did our job. That sting is the good stuff.”
      </PullQuote>

      <h2 id="o4">Bottle and storage</h2>
      <p>
        Light, heat and air are what ruin oil. Dark glass or a tin protects it; a clear bottle on a bright supermarket
        shelf doesn’t. At home, keep it away from the stove and close the cap. A large tin is fine if you decant into a
        small dark bottle for daily use.
      </p>

      <h2 id="o5">Red flags</h2>
      <Callout
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
