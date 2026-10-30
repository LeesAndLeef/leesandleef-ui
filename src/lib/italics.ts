import type { TextSegment } from './types'

export function italicSegments(text: string): TextSegment[] {
  return text.split(/<em>(.*?)<\/em>/).map((part, i) => ({ text: part, italic: i % 2 === 1 }))
}
