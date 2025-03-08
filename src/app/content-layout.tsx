'use client'

import { ChatHeader } from '@/components/chat-header'
import { useAgents } from '@/components/hooks/use-agents'
import { SidebarArea } from '@/components/sidebar-area/sidebar-area'
import { useEffect } from 'react'
import { useAgentContext } from './[agentId]/context/agent-context'

export default function ContentLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { data } = useAgents()
  const { agentId, setAgentId } = useAgentContext()

  useEffect(() => {
    if (data?.[0]?.id && !agentId) {
      setAgentId(data[0].id)
    }
  }, [data, agentId])

  return (
    <>
      <SidebarArea
        canCreate={process.env.NEXT_PUBLIC_CREATE_AGENTS_FROM_UI === 'true'}
      />
      <main className='relative flex h-dvh w-dvw flex-col overflow-hidden'>
        <div className='flex border-b border-border p-2.5 gap-3 w-full'>
          <ChatHeader />
        </div>
        {children}
      </main>
    </>
  )
}
