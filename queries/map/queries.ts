import { useQuery } from '@tanstack/react-query'
import { QUERIES } from '@/constants/queries'
import type { Station } from './types'

export const useStationsQuery = () => {
  return useQuery<Station[], Error>({
    queryKey: [QUERIES.stations.key],
    queryFn: async () => {
      const response = await fetch(QUERIES.stations.path)
      if (!response.ok) {
        throw new Error('Failed to fetch stations')
      }
      return response.json()
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  })
}