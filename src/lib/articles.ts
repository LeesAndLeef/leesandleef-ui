import { articles } from '../data/articles'

export { articles }

export const getArticle = (slug?: string) => articles.find((a) => a.slug === slug)
