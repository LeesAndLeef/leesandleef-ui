import type { ReactNode } from 'react'
import type { SceneKind } from '../../types'
import { Amphora } from './scene/Amphora'
import { BackLabel } from './scene/BackLabel'
import { Casks } from './scene/Casks'
import { Crates } from './scene/Crates'
import { FrontLabel } from './scene/FrontLabel'
import { Grove } from './scene/Grove'
import { Landscape } from './scene/Landscape'
import { Leaves } from './scene/Leaves'
import { MapScene } from './scene/MapScene'
import { Plate } from './scene/Plate'
import { Portrait } from './scene/Portrait'
import { Pour } from './scene/Pour'
import { Press } from './scene/Press'
import { Rack } from './scene/Rack'
import { Soil } from './scene/Soil'
import type { SceneContext } from './scene/types'
import { Vat } from './scene/Vat'
import { Walls } from './scene/Walls'

export const SCENES_BY_KIND: Record<SceneKind, (ctx: SceneContext) => ReactNode> = {
  landscape: Landscape,
  grove: Grove,
  soil: Soil,
  amphora: Amphora,
  casks: Casks,
  vat: Vat,
  press: Press,
  crates: Crates,
  walls: Walls,
  leaves: Leaves,
  rack: Rack,
  portrait: Portrait,
  map: MapScene,
  backlabel: BackLabel,
  frontlabel: FrontLabel,
  pour: Pour,
  plate: Plate,
}

export const BOTTLE = 'M24 0h12v52l14 18v130H10V70l14-18z'
