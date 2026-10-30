export function splitInTwo(text: string): [string, string] {
  const words = text.split(' ')
  const half = Math.ceil(words.length / 2)
  return [words.slice(0, half).join(' '), words.slice(half).join(' ')]
}
