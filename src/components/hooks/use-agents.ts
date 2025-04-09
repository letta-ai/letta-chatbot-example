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
      const agents = await response.json()

      // Add multiagent roundrobin logic
      const roundRobinAgents = agents.filter((agent: Letta.AgentState) => agent.tags.includes('roundrobin'))
      const nonRoundRobinAgents = agents.filter((agent: Letta.AgentState) => !agent.tags.includes('roundrobin'))

      return [...roundRobinAgents, ...nonRoundRobinAgents]
    }
  })
}
