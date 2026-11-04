export const API_BASE_URL = import.meta.env.VITE_API_URL ?? '/api/v1'

export const API_ENDPOINTS = {
  SITE: '/site',
  WINES: '/wines',
  OILS: '/oils',
  CLUB_PLANS: '/club-plans',
  GROWERS: '/growers',
  ARTICLES: '/articles',
  SEARCH: '/search',
  QUIZ: '/quiz',
  QUIZ_RECOMMENDATIONS: '/quiz/recommendations',
  CART: '/cart',
  CART_SHIPPING_OPTIONS: '/cart/shipping-options',
  CART_LINES: '/cart/lines',
  CART_SAVED: '/cart/saved',
  CART_PROMO: '/cart/promo',
  CART_GIFT_NOTE: '/cart/gift-note',
  AUTH_SIGNUP: '/auth/signup',
  AUTH_LOGIN: '/auth/login',
  AUTH_LOGOUT: '/auth/logout',
  ACCOUNT: '/account',
  ORDERS: '/orders',
  NEWSLETTER: '/newsletter',
} as const

export const API_SEGMENTS = {
  VISITS: 'visits',
  SAVE_FOR_LATER: 'save-for-later',
  MOVE_TO_CART: 'move-to-cart',
} as const

export const HTTP_STATUS = {
  NETWORK_ERROR: 0,
  UNAUTHORIZED: 401,
  SERVER_ERROR: 500,
} as const
