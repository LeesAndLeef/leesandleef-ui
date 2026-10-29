import styles from './ProductOptionPicker.module.css'

export function ProductOptionPicker<T extends string>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string
  options: { id: T; name: string; info: string }[]
  value?: T
  onChange: (id: T) => void
}) {
  return (
    <fieldset>
      <legend className="mono label-muted" style={{ marginBottom: 10 }}>
        {legend}
      </legend>
      <div className="chip-row">
        {options.map((o) => (
          <button key={o.id} className={styles.option} aria-pressed={value === o.id} onClick={() => onChange(o.id)}>
            <span style={{ fontWeight: 600 }}>{o.name}</span>
            <span className="mono mono-sm">{o.info}</span>
          </button>
        ))}
      </div>
    </fieldset>
  )
}
