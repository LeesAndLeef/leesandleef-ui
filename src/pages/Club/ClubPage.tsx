import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClubBox } from '../../components/club/ClubBox'
import { ClubCompare } from '../../components/club/ClubCompare'
import { ClubCta } from '../../components/club/ClubCta'
import { ClubFaq } from '../../components/club/ClubFaq'
import { ClubHero } from '../../components/club/ClubHero'
import { ClubHowItWorks } from '../../components/club/ClubHowItWorks'
import { ClubPlans } from '../../components/club/ClubPlans'
import { CART_ROUTE } from '../../routes'
import { useCart } from '../../state/cart/useCart'
import type { Freq } from '../../types'

export default function ClubPage() {
  const { add } = useCart()
  const navigate = useNavigate()
  const [freq, setFreq] = useState<Freq>('season')

  function join(planId: string) {
    add(planId, 1, freq)
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
