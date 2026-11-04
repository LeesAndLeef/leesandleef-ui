export const apiPath = (base: string, ...segments: string[]) =>
  [base, ...segments.map((segment) => encodeURIComponent(segment))].join('/')
