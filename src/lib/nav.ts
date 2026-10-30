import type { NavMatch } from './types'

export function isNavActive({ paths = [], prefixes = [] }: NavMatch, pathname: string) {
  return paths.includes(pathname) || prefixes.some((prefix) => pathname.startsWith(prefix))
}
