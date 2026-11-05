import { useProducts } from './useProducts'

export const useProduct = (id: string | undefined) => useProducts().find((product) => product.id === id)
