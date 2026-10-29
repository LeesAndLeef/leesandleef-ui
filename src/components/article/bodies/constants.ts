import { COLORS } from '../../../styles/colors'
import type { SoilLayer } from './types'

export const SOILS: { name: string; layers: SoilLayer[]; text: string }[] = [
  {
    name: 'Crvena · Red',
    layers: [
      { h: 90, bg: COLORS.terraRossa, label: 'Terra rossa 40–80 cm', light: true },
      { h: 110, bg: COLORS.sage, label: 'Limestone / karst', lines: `${COLORS.rule} 0 1px, transparent 1px 18px` },
    ],
    text: 'Iron-rich clay over fissured limestone. Drains fast. Teran, Refošk.',
  },
  {
    name: 'Siva · Grey',
    layers: [
      { h: 130, bg: COLORS.flysch, label: 'Flysch marl & sandstone', light: true },
      { h: 70, bg: COLORS.flyschDark, lines: `${COLORS.paperA15} 0 1px, transparent 1px 10px` },
    ],
    text: 'Layered marl that holds more water. Malvazija, Muškat.',
  },
  {
    name: 'Bijela · White',
    layers: [
      { h: 130, bg: COLORS.bone, label: 'Calcareous marl' },
      { h: 70, bg: COLORS.chalk, lines: `${COLORS.inkA12} 0 1px, transparent 1px 10px` },
    ],
    text: 'Pale, chalky, hard work for the vine. Taut, saline whites.',
  },
]

export const LABEL_LINES = [
  ['Harvest: October 2025', 'Harvest date', 'the single most useful line. Fresher is better.'],
  ['Cultivar: 100% Buža', 'Cultivar', 'tells you the style before you open it.'],
  ['Origin: single grove, Istria', 'Origin', 'a place you could visit beats “EU blend”.'],
  ['Acidity 0.18% · Polyphenols 612 mg/kg', 'Lab numbers', 'producers proud of their oil print them.'],
  ['Best before: April 2027', 'Best before', 'set from bottling, not picking. Read it last.'],
]

export const SKIN_TIMELINE = [
  ['0 h', 'White', COLORS.tintWhite],
  ['12 h', 'Golden', COLORS.tintGolden],
  ['2 d', 'Pale amber', COLORS.tintPaleAmber],
  ['1 wk', 'Orange', COLORS.tintOrange],
  ['1 mo', 'Amber', COLORS.glassAmber],
  ['6 mo', 'Deep amber', COLORS.tintDeepAmber],
]
