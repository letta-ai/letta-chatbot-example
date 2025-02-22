import { SidebarMenuButton, useSidebar } from '@/components/ui/sidebar'
import { useAgentContext } from '@/app/[agentId]/context/agent-context'
import { useIsMobile } from '@/components/hooks/use-mobile'
import { useAgentMessages } from '../hooks/use-agent-messages'
import { SkeletonLoadBlock } from '@/components/ui/skeleton-load-block'
import { DEFAULT_BOT_MESSAGE, NO_MESSAGES_LABEL } from '@/app/lib/labels'
import { AgentState } from '@letta-ai/letta-client/api'
import OptionsMenu from './options-menu'

export const AppSidebarMenuButton: React.FC<{
  agent: AgentState
}> = ({ agent }) => {
  const { data } = useAgentMessages(agent.id)
  const isMobile = useIsMobile()
  const { toggleSidebar } = useSidebar()
  const { agentId, setAgentId } = useAgentContext()

  // Get the last message safely
  const lastMessage =
    data && data.length > 0 ? data[data.length - 1]?.message : null

  return (
    <div
      className={`border-l-4 ${agent.id === agentId ? 'border-black' : 'border-gray-200'} hover:border-black`}
    >
      <SidebarMenuButton
        id={agent.id}
        asChild
        isActive={agent.id === agentId}
        className='overflow-hidden whitespace-nowrap h-full gap-0.5 text-gray-50 hover:text-black'
        onClick={() => {
          setAgentId(agent.id)
        }}
      >
        <div className='flex group justify-between'>
          <div
            className='overflow-hidden flex-col'
            onClick={() => {
              if (isMobile) {
                toggleSidebar()
              }
            }}
          >
            <span className='block w-full truncate text-primary'>
              {agent.name}
            </span>
            <span className='block w-full truncate text-muted-foreground'>
              {data ? (
                lastMessage === DEFAULT_BOT_MESSAGE ? (
                  <i>{NO_MESSAGES_LABEL}</i>
                ) : lastMessage ? (
                  `${lastMessage}`
                ) : (
                  <i>{NO_MESSAGES_LABEL}</i>
                )
              ) : (
                <SkeletonLoadBlock className='w-full h-[1.43em]' />
              )}
            </span>
          </div>
          <OptionsMenu agentId={agent.id} />
        </div>
      </SidebarMenuButton>
    </div>
  )
}
