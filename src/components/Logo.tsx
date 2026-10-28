import { Link } from 'react-router-dom'

export function Mark({ size = 28, gap = 2 }: { size?: number; gap?: number }) {
  return (
    <span className="mark" style={{ width: size, height: size, gap }} aria-hidden="true">
      <span className="mark-w" />
      <span className="mark-o" />
      <span className="mark-o" />
      <span className="mark-w" />
    </span>
  )
}

export function Logo() {
  return (
    <Link to="/" className="logo lnk">
      <Mark />
      <span className="disp">Lees &amp; Leaf</span>
    </Link>
  )
}
