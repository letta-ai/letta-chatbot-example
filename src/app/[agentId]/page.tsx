'use client'

import { Messages } from '@/components/message-area/messages'
import { MessageComposer } from '@/components/message-area/message-composer'
import { useAgentDetails } from '@/components/ui/agent-details'
import { AgentDetailDisplay } from '@/components/agent-details/agent-details-display'
import { useIsMobile } from '@/components/hooks/use-mobile'
import { useChat } from '@ai-sdk/react'
import { useAgentMessages } from '@/components/hooks/use-agent-messages'
import { useAgentIdParam } from '@/components/hooks/use-agentId-param'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { useEffect } from 'react'
import { DefaultChatTransport } from 'ai'
import { useState } from 'react'

export default function Home() {
  const agentId = useAgentIdParam()

  const { isOpen } = useAgentDetails()
  const isMobile = useIsMobile()

  if (!agentId) {
    return null
  }

  const {
    data: agentMessages,
    isLoading: agentMessagesIsLoading,
    error: agentMessagesError
  } = useAgentMessages(agentId)

  // Show toast when agent messages fail to load
  useEffect(() => {
    if (agentMessagesError) {
      toast.error(
        'Failed to load agent messages. Please check your Letta server connection.'
      )
    }
  }, [agentMessagesError])

  const { messages, setMessages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/agents/' + agentId + '/messages',
      body: {
        agentId: agentId
      }
    }),
    messages: agentMessages || [],
    onError: (error) => {
      console.error('error', error)
      toast.error(
        'Unable to send message. Please double check your environment setup.'
      )
    }
  })

  useEffect(() => {
    if (agentMessages && agentMessages.length > 0 && messages.length === 0) {
      setMessages(agentMessages)
    }
  }, [agentMessages, setMessages, messages.length])

  const [input, setInput] = useState('')

  return (
    <div className='flex flex-row flex-1 h-0'>
      {!isMobile || (isMobile && !isOpen) ? (
        <div className='relative flex flex-col flex-1 h-full min-w-0 gap-5 overflow-hidden bg-background pt-4'>
          <Messages
            messages={messages}
            status={status}
            sendMessage={sendMessage}
          />
          {!agentMessagesIsLoading && (
            <div className='relative flex flex-col'>
              <div className='absolute left-1/2 transform -translate-x-1/2'>
                <Toaster position='bottom-center' expand={true} />
              </div>
              <MessageComposer
                sendMessage={sendMessage}
                input={input}
                setInput={setInput}
                status={status}
              />
            </div>
          )}
        </div>
      ) : null}
      <AgentDetailDisplay />
    </div>
  )
}
