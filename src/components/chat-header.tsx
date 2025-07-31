import { AgentDetailsTrigger } from './ui/agent-details'
import { useAgentContext } from '@/app/[agentId]/context/agent-context'
import { useAgents } from './hooks/use-agents'
import { SkeletonLoadBlock } from './ui/skeleton-load-block'
import { SidebarTrigger } from './ui/sidebar'
import { ReasoningMessageSwitch } from './toggle-reasoning-messages'
import { LoaderCircle } from 'lucide-react'
import { useMemo } from 'react'

export const ChatHeader = () => {
  const { agentId } = useAgentContext()
  const { data: agentData, isLoading } = useAgents()

  const selectedAgent = useMemo(() => {
    if (!agentData) return null

    if (agentData.length === 0) return null

    return agentData.find((a: { id: string }) => a.id === agentId)
  }, [agentData, agentId])

  return (
    <>
      <div className='flex-1 overflow-hidden'>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center gap-2 w-1/2 overflow-hidden'>
            <SidebarTrigger />
            <div className='w-full overflow-hidden hidden sm:block'>
              {isLoading ? (
                <SkeletonLoadBlock className='w-[10em] h-[1em]' />
              ) : (
                <div className='text-l font-bold truncate'>
                  {selectedAgent?.name}
                </div>
              )}
            </div>
          </div>
          <div className='flex'>
            {isLoading ? (
              <LoaderCircle
                className='w-max h-full px-2 animate-spin'
                size={17}
              />
            ) : (
              <div className='flex flex-row gap-1'>
                <ReasoningMessageSwitch data-id={'reasoning-message-switch'}/>
                <AgentDetailsTrigger data-id={'agent-details-trigger'} isLoading={isLoading} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
