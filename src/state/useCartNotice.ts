import { create } from 'zustand'
import type { CartNoticeState } from './types'

export const useCartNotice = create<CartNoticeState>()((set) => ({
  notice: null,
  show: (notice) => set({ notice }),
  dismiss: () => set({ notice: null }),
}))
