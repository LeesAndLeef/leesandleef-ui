export type Ship = 'std' | 'sat' | 'pick'
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

export interface ShipOption {
  id: Ship
  name: string
  desc: string
  price: number
}
