import { useAgents } from './use-agents'

export function useIsConnected() {
  const { isError } = useAgents()
  return !isError
}
