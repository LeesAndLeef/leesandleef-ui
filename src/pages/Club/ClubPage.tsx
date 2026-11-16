import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClubBox } from '../../components/club/ClubBox'
import { ClubCompare } from '../../components/club/ClubCompare'
import { ClubCta } from '../../components/club/ClubCta'
import { ClubFaq } from '../../components/club/ClubFaq'
import { ClubHero } from '../../components/club/ClubHero'
import { ClubHowItWorks } from '../../components/club/ClubHowItWorks'
import { ClubPlans } from '../../components/club/ClubPlans'
import { useAddToCart } from '../../hooks/cart/useAddToCart'
import { CART_ROUTE } from '../../routes'
import type { Freq } from '../../types'

export default function ClubPage() {
  const addToCart = useAddToCart()
  const navigate = useNavigate()
  const [freq, setFreq] = useState<Freq>('season')

  function join(planId: string) {
    addToCart([{ id: planId, option: freq }])
    navigate(CART_ROUTE)
  }

  return (
    <>
      <ClubHero />
      <ClubPlans freq={freq} onFreqChange={setFreq} onJoin={join} />
      <ClubBox />
      <ClubHowItWorks />
      <ClubCompare />
      <ClubFaq />
      <ClubCta onJoin={() => join('club-cellar')} />
    </>
  )
}
