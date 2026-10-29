import type { ComponentType } from 'react'
import type { ArticleSlug } from '../../types'
import { OliveOilBody } from './bodies/OliveOilBody'
import { SkinContactBody } from './bodies/SkinContactBody'
import { TerroirBody } from './bodies/TerroirBody'

export const ARTICLE_BODIES: Record<ArticleSlug, ComponentType> = {
  terroir: TerroirBody,
  'skin-contact': SkinContactBody,
  'olive-oil': OliveOilBody,
}
