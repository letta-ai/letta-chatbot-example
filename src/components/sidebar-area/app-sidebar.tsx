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
  return (
    <SidebarContent id='agents-list'>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu className='cursor-pointer' data-id='agents-list'>
            {agents &&
              agents.map((agent) => (
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
