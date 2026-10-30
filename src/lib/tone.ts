export const contrastingTone = (preferred: string, fallback: string, against: string) =>
  preferred === against ? fallback : preferred
