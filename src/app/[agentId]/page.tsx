'use client'

import { Messages } from '@/components/message-area/messages'
import { MessageComposer } from '@/components/message-area/message-composer'
import { useAgentDetails } from '@/components/ui/agent-details'
import { AgentDetailDisplay } from '@/components/agent-details/agent-details-display'
import { useIsMobile } from '@/components/hooks/use-mobile'
import { useChat, useCompletion } from '@ai-sdk/react';
import { useAgentMessages } from '@/components/hooks/use-agent-messages'
import { useAgentIdParam } from '@/components/hooks/use-agentId-param'

export default function Home() {
  const agentId = useAgentIdParam()

  const { isOpen } = useAgentDetails()
  const isMobile = useIsMobile()

  if (!agentId) {
    return null
  }

  const { data: agentMessages, isLoading: agentMessagesIsLoading } = useAgentMessages(agentId)
  console.log(agentMessages)

  const { messages, input, handleInputChange, handleSubmit, status, append } = useChat({
    body: {
      agentId: agentId
    },
    api: `/api/agents/${agentId}/messages`,
    initialMessages: agentMessages,
    streamProtocol: 'data',
    onFinish: (message, { usage, finishReason }) => {
      console.log('Finished streaming message:', message);
      console.log('Token usage:', usage);
      console.log('Finish reason:', finishReason);
    },
    onError: error => {
      console.error('An error occurred:', error);
    },
    onResponse: response => {
      console.log('Received HTTP response from server:', response);
    },
  });

  return (
    <div className='flex flex-row flex-1 h-0'>
      {!isMobile || (isMobile && !isOpen) ? (
        <div className='relative flex flex-col flex-1 h-full min-w-0 gap-5 overflow-hidden bg-background pt-4'>
          <Messages messages={messages} status={status} append={append}/>
          {!agentMessagesIsLoading && <MessageComposer
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            input={input}
            status={status}
          />}
        </div>
      ) : null}
      <AgentDetailDisplay />
    </div>
  )
}
