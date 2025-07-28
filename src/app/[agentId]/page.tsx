'use client'

import { Messages } from '@/components/message-area/messages'
import { MessageComposer } from '@/components/message-area/message-composer'
import { useAgentDetails } from '@/components/ui/agent-details'
import { AgentDetailDisplay } from '@/components/agent-details/agent-details-display'
import { useIsMobile } from '@/components/hooks/use-mobile'
import { useSendMessage } from '@/components/hooks/use-send-message'
import { useChat, useCompletion } from '@ai-sdk/react';
import { useAgentMessages } from '@/components/hooks/use-agent-messages'
import {lettaCloud, convertToAiSdkMessage} from '@letta-ai/vercel-ai-sdk-provider'

export default function Home() {
  const { isOpen } = useAgentDetails()
  const isMobile = useIsMobile()

  const { isPending, mutate: sendMessage } = useSendMessage()

  const { data: agentMessages, isLoading: agentMessagesIsLoading } = useAgentMessages('agent-338196a3-3a09-4766-bc09-ce56e5cc4cbd')
  console.log(agentMessages)

  const { messages, input, handleInputChange, handleSubmit, error, reload, stop, status } = useChat({
    body: {
      agentId: 'agent-338196a3-3a09-4766-bc09-ce56e5cc4cbd'
    },
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
          <Messages sendMessage={sendMessage} messages={messages} status={status}/>
          <MessageComposer
            sendMessage={handleSubmit}
            isSendingMessage={isPending}
            handleInputChange={handleInputChange}
            input={input}
          />
          {/*{messages.map(message => (*/}
          {/*  <div key={message.id}>*/}
          {/*    {message.role === 'user' ? 'User: ' : 'AI: '}*/}
          {/*    {message.parts.map((part, i) => {*/}
          {/*      switch (part.type) {*/}
          {/*        case 'reasoning':*/}
          {/*          return <div key={`${message.id}-${i}`}>{part.reasoning}</div>*/}
          {/*        default:*/}
          {/*          return null*/}
          {/*      }*/}
          {/*    })}*/}
          {/*    {message.content}*/}
          {/*  </div>*/}
          {/*))}*/}

          {/*<form onSubmit={handleSubmit}>*/}
          {/*  <input name="prompt" value={input} onChange={handleInputChange} />*/}
          {/*  <button type="submit">Submit</button>*/}
          {/*</form>*/}

        </div>
      ) : null}
      <AgentDetailDisplay />
    </div>
  )
}
