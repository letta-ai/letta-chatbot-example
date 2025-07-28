import { AppMessage } from '@/types'
import { useQuery } from '@tanstack/react-query'

export const getAgentMessagesQueryKey = (agentId: string) => [
  'agentMessages',
  agentId
]

export function useAgentMessages(agentId: string) {
  return useQuery({
    queryKey: getAgentMessagesQueryKey(agentId),
    queryFn: async () => {
      const response = await fetch(`/api/agents/${agentId}/messages`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    enabled: !!agentId
  })
}
