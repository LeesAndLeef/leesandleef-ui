export type Pay = 'card' | 'wallet' | 'bank'

export interface CheckoutDetails {
  first: string
  last: string
  email: string
  phone: string
  age: boolean
  news: boolean
}

export interface CheckoutAddress {
  street: string
  postcode: string
  city: string
  country: string
  door: string
}
