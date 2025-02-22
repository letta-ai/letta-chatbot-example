import { useParams } from 'next/navigation'

export function useAgentIdParam() {
  const params = useParams<{ agentId: string }>()
  const agentId =
    // nextjs 14 returns 'undefined' for params when the param is not present
    params.agentId !== 'undefined' ? params.agentId || undefined : undefined
  return agentId
}
