import { useMutation } from '@tanstack/react-query'

export function useCreateAgent() {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
        throw new Error('Failed to create agent')
      }
      return response.json()
    }
  })
}
