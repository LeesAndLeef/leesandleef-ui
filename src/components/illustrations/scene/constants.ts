import { COLORS } from '../../../styles/colors'

export const LEAF =
  'M0 -40 C12 -30 30 -34 34 -18 C46 -12 44 4 30 8 C34 22 22 34 8 28 L0 40 L-8 28 C-22 34 -34 22 -30 8 C-44 4 -46 -12 -34 -18 C-30 -34 -12 -30 0 -40 Z'

export const AMPHORA_ROWS = [
  { y: 186, s: 0.6, xs: [70, 160, 250, 340] },
  { y: 222, s: 0.85, xs: [40, 160, 280, 400] },
  { y: 272, s: 1.15, xs: [100, 280] },
]

export const GROVE_TREES = [
  [70, 214, 0.75],
  [210, 206, 0.6],
  [330, 222, 0.85],
  [140, 268, 1.15],
] as const

export const TREE_FILLS = [COLORS.olive300, COLORS.olive400, COLORS.sage, COLORS.olive500]

export const DARK_TONES: ReadonlySet<string> = new Set([
  COLORS.ink,
  COLORS.inkBody,
  COLORS.olive900,
  COLORS.wine800,
  COLORS.grapeDark,
  COLORS.bottleDark,
  COLORS.soilDeep,
  COLORS.glassRed,
  COLORS.glassGarnet,
])
