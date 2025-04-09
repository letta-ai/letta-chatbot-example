import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { AppSidebarMenuButton } from './app-sidebar-menu-button'
import { AgentState } from '@letta-ai/letta-client/api'

export function AppSidebar({ agents }: { agents: AgentState[] }) {
  // Add multiagent roundrobin logic
  const roundRobinAgents = agents.filter(agent => agent.tags.includes('roundrobin'))
  const nonRoundRobinAgents = agents.filter(agent => !agent.tags.includes('roundrobin'))

  const finalAgents = [...roundRobinAgents, ...nonRoundRobinAgents]

  return (
    <SidebarContent id='agents-list'>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu className='cursor-pointer'>
            {finalAgents &&
              finalAgents.map((agent) => (
                <SidebarMenuItem key={agent.id}>
                  <AppSidebarMenuButton agent={agent} />
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  )
}
