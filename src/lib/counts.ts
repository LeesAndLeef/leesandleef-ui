export const sumCounts = (counts: Readonly<Record<string, number>>, keys: readonly string[] = Object.keys(counts)) =>
  keys.reduce((total, key) => total + (counts[key] ?? 0), 0)
