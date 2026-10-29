export function ProductTags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null
  return (
    <div className="chip-row">
      {tags.map((t) => (
        <span key={t} className="tag">
          {t}
        </span>
      ))}
    </div>
  )
}
