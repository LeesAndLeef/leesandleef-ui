const STEP_BY_KEY: Record<string, (index: number, count: number) => number> = {
  ArrowRight: (i, n) => (i + 1) % n,
  ArrowLeft: (i, n) => (i - 1 + n) % n,
  Home: () => 0,
  End: (_, n) => n - 1,
}

export function tabIndexAfterKey(key: string, index: number, count: number): number | undefined {
  return STEP_BY_KEY[key]?.(index, count)
}
