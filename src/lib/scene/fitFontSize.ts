import { DISPLAY_CHAR_WIDTH } from './constants'

export function fitFontSize(lines: string[], maxSize: number, width: number) {
  const longest = Math.max(...lines.map((l) => l.length))
  return Math.min(maxSize, width / (longest * DISPLAY_CHAR_WIDTH))
}
