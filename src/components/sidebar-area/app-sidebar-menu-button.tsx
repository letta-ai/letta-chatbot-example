import {
  SidebarMenuButton,
  useSidebar,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { useAgentContext } from '@/app/[agentId]/context/agent-context'
import { useIsMobile } from '@/components/hooks/use-mobile'
import { useAgentMessages } from '../hooks/use-agent-messages'
import { SkeletonLoadBlock } from '../ui/skeleton-load-block'
import { DEFAULT_BOT_MESSAGE, NO_MESSAGES_LABEL } from '@/app/lib/labels'
import { AgentState } from '@letta-ai/letta-client/api'

export const AppSidebarMenuButton: React.FC<{
  agent: AgentState
}> = ({ agent }) => {
  const { data } = useAgentMessages(agent.id)
  const isMobile = useIsMobile()
  const { toggleSidebar } = useSidebar()
  const { agentId, setAgentId } = useAgentContext()

  return (
    <div
      className={`border-l-4 ${agent.id === agentId ? 'border-black' : 'border-gray-200'} hover:border-black`}
    >
      <SidebarMenuButton
        id={agent.id}
        asChild
        isActive={agent.id === agentId}
        className='overflow-hidden whitespace-nowrap h-full'
        onClick={() => {
          if (isMobile) {
            toggleSidebar()
          }
          setAgentId(agent.id)
        }}
      >
        <div className='overflow-hidden flex-col'>
          <span className='block w-full truncate'>{agent.name}</span>
          <span className='block w-full truncate text-muted-foreground'>
            {data ? (
              data[data.length - 1].message === DEFAULT_BOT_MESSAGE ? (
                <i>{NO_MESSAGES_LABEL}</i>
              ) : (
                `${data[data.length - 1].message}`
              )
            ) : (
              <SkeletonLoadBlock className='w-full h-[1.43em]' />
            )}
          </span>
        </div>
      </SidebarMenuButton>
    </div>
  )
}
