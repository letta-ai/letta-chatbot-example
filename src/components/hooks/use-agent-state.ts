'use client'

import { Letta } from '@letta-ai/letta-client'
import { useMutation, useQuery } from '@tanstack/react-query'

export const getUseAgentStateKey = (agentId: string) => ['agentState', agentId]

export function useAgentState(agentId: string) {
  return useQuery<Letta.AgentState>({
    queryKey: getUseAgentStateKey(agentId),
    queryFn: async () => {
      const response = await fetch(`/api/agents/${agentId}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    refetchInterval: 3000,
    enabled: !!agentId
  })
}

export function useModifyAgent(agentId: string) {
  return useMutation({
    mutationFn: async (newData: { name: string }) => {
      const response = await fetch(`/api/agents/${agentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      })
      if (!response.ok) {
        throw new Error('Failed to modify agent')
      }
      return response.json()
    }
  })
}

export function useDeleteAgent() {
  return useMutation({
    mutationFn: async (agentId: string) => {
      const response = await fetch(`/api/agents/${agentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
        throw new Error('Failed to delete agent')
      }
      return response.json()
    }
  })
}
