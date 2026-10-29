import { HomeAnnouncement } from '../../components/home/HomeAnnouncement'
import { HomeClub } from '../../components/home/HomeClub'
import { HomeGrowers } from '../../components/home/HomeGrowers'
import { HomeHero } from '../../components/home/HomeHero'
import { HomeJournal } from '../../components/home/HomeJournal'
import { HomeOils } from '../../components/home/HomeOils'
import { HomeRegionStrip } from '../../components/home/HomeRegionStrip'
import { HomeRelease } from '../../components/home/HomeRelease'
import { HomeShipping } from '../../components/home/HomeShipping'

export default function Home() {
  return (
    <>
      <HomeAnnouncement />
      <HomeHero />
      <HomeRegionStrip />
      <HomeRelease />
      <HomeOils />
      <HomeGrowers />
      <HomeClub />
      <HomeJournal />
      <HomeShipping />
    </>
  )
}
