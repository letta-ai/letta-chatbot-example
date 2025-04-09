import { useMutation } from '@tanstack/react-query'

export function useCreateAgent() {
  return useMutation({
    mutationFn: async (agentData: { roundrobin?: boolean }) => {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(agentData)
      })
      if (!response.ok) {
        throw new Error('Failed to create agent')
      }
      return response.json()
    }
  })
}
