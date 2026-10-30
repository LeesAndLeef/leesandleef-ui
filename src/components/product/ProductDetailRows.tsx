export function ProductDetailRows({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="rows" style={{ margin: 0 }}>
      {rows.map(([k, v]) => (
        <div key={k} className="row">
          <dt className="mono label-muted">{k}</dt>
          <dd style={{ margin: 0 }}>{v}</dd>
        </div>
      ))}
    </dl>
  )
}
