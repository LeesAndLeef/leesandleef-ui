import type { SceneKind } from '../../types'

export const DISPLAY_CHAR_WIDTH = 0.74

export const SCENE_RULES: [RegExp, SceneKind][] = [
  [/amphora/, 'amphora'],
  [/punching|fermenter|vat/, 'vat'],
  [/press/, 'press'],
  [/disgorg|pét-nat|riddl/, 'rack'],
  [/cask|barrel|cellar/, 'casks'],
  [/crate|basket/, 'crates'],
  [/wall|terrace/, 'walls'],
  [/leaves|leaf|bura/, 'leaves'],
  [/olive|net|grove/, 'grove'],
  [/soil|terra rossa in hand/, 'soil'],
  [/portrait/, 'portrait'],
]
