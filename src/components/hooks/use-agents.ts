'use client'
import { Letta } from '@letta-ai/letta-client'
import { useQuery } from '@tanstack/react-query'

export const USE_AGENTS_KEY = ['agents']

export function useAgents() {
  return useQuery<Letta.AgentState[]>({
    queryKey: USE_AGENTS_KEY,
    retry: 0,
    queryFn: async () => {
      const response = await fetch('/api/agents')
      if (!response.ok) {
        throw new Error('Failed to fetch agents')
      }
      return response.json()
    }
  })
}
