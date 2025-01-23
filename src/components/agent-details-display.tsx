'use client';

import { AgentCoreMemoryBlock } from './agent-core-memory-block';
import { AgentArchivalMemory } from './agent-archival-memory';
import { useAgentDetails } from './ui/agent-details';
import { useIsMobile } from './hooks/use-mobile';

export function AgentDetailDisplay() {
  const { isOpen } = useAgentDetails();
  const isMobile = useIsMobile();

  // TODO: FIX TRANSITION
  return (
    <div
      className={`bg-secondary transition-transform transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full w-0'} ${isMobile && isOpen ? 'flex-1' : ''}`}
    >
      <AgentDetailDisplayContent />
    </div>
  );
}

function AgentDetailDisplayContent() {
  return (
    <div className="pt-2 px-6">
      {[
        { title: 'CORE MEMORY', component: <AgentCoreMemoryBlock /> },
        { title: 'ARCHIVAL MEMORY', component: <AgentArchivalMemory /> },
      ].map((section, index) => (
        <section key={index} className="pb-4">
          <header className="text-[0.75rem] font-bold py-4">{section.title}</header>
          <div className="flex">
            <div className="w-[0.25em] bg-gray-200 mr-4" />
            {section.component}
          </div>
        </section>
      ))}
    </div>
  );
}
