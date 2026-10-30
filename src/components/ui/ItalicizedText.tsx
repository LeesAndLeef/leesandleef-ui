import { italicSegments } from '../../lib/italics'

export function ItalicizedText({ text }: { text: string }) {
  return italicSegments(text).map((segment, i) => (segment.italic ? <em key={i}>{segment.text}</em> : segment.text))
}
