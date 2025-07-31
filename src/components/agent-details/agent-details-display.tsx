'use client'

import { AgentCoreMemoryBlock } from './agent-core-memory-block'
import { AgentArchivalMemory } from './agent-archival-memory'
import { useAgentDetails } from '../ui/agent-details'
import { useIsMobile } from '../hooks/use-mobile'
import { LeftBar } from '../ui/left-bar'

export function AgentDetailDisplay() {
  const { isOpen } = useAgentDetails()
  const isMobile = useIsMobile()

  return (
    <div
      className={`bg-secondary max-w-[450px] overflow-y-auto transition-transform transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full w-0'} ${isMobile && isOpen ? 'flex-1' : ''}`}
    >
      <AgentDetailDisplayContent />
    </div>
  )
}

function AgentDetailDisplayContent() {
  return (
    <div data-id={'agent-details-display-content'} className='pt-2 px-6'>
      {[
        {
          title: 'CORE MEMORY',
          component: <AgentCoreMemoryBlock />
        },
        {
          title: 'ARCHIVAL MEMORY',
          component: <AgentArchivalMemory />
        }
      ].map((section, index) => (
        <section key={index} className='pb-4'>
          <header className='text-[0.75rem] font-bold py-4'>
            {section.title}
          </header>
          <div className='flex'>
            <LeftBar />
            {section.component}
          </div>
        </section>
      ))}
    </div>
  )
}
