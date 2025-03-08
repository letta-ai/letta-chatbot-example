import { useAgentContext } from '@/app/[agentId]/context/agent-context'
import { useIsMobile } from '@/components/hooks/use-mobile'
import { SidebarMenuButton, useSidebar } from '@/components/ui/sidebar'
import { AgentState } from '@letta-ai/letta-client/api'
import { MenuButtonMessage } from './app-sidebar-menu-message'
import OptionsMenu from './options-menu'

export const AppSidebarMenuButton: React.FC<{
  agent: AgentState
}> = ({ agent }) => {
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
              <MenuButtonMessage agentId={agent.id} />
            </span>
          </div>
          <OptionsMenu agentId={agent.id} />
        </div>
      </SidebarMenuButton>
    </div>
  )
}
