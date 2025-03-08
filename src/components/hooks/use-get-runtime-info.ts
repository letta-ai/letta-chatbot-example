import { useQuery } from '@tanstack/react-query'
import type { RuntimeInfo } from '@/app/(server)/api/runtime/types'
export function useGetRuntimeInfo() {
  return useQuery<RuntimeInfo>({
    queryKey: ['runtime-info'],
    refetchInterval: 5000,
    queryFn: async () => {
      const response = await fetch('/api/runtime', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
        throw new Error('Failed to get runtime info')
      }
      return response.json()
    }
  })
}
