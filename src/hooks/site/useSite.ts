import { QUERY_KEYS } from '../../constants'
import { SiteService } from '../../services/site/SiteService'
import { useGetData } from '../useGetData'

export const useSite = () => useGetData(QUERY_KEYS.SITE, (signal) => SiteService.create().getSite(signal))
