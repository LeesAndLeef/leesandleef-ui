export type CartNoticeTone = 'added' | 'error'

export interface CartNotice {
  tone: CartNoticeTone
  text: string
}

export interface CartNoticeState {
  notice: CartNotice | null
  show: (notice: CartNotice) => void
  dismiss: () => void
}
