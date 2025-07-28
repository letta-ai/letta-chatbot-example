import { useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { getAgentMessagesQueryKey } from './use-agent-messages'
import { AppMessage, MESSAGE_TYPE, ROLE_TYPE } from '../../types'
import * as Letta from '@letta-ai/letta-client/api'
import { extractMessageText, getMessageId } from '@/lib/utils'
import { useChat } from '@ai-sdk/react'

export interface UseSendMessageType {
  agentId: string
  text: string
}

export function useSendMessage() {
  const queryClient = useQueryClient()

  async function sendMessage(options: UseSendMessageType) {
    const { agentId, text } = options
    // const url = `/api/agents/${agentId}/messages`
    const url = `/api/chat` // Use the chat route for streaming messages
    try {
      queryClient.setQueriesData<AppMessage[]>(
        {
          queryKey: getAgentMessagesQueryKey(agentId)
        },
        (data) => {
          if (!data) {
            return data
          }

          return [
            ...data,
            {
              id: 'new_' + Date.now(),
              date: Date.now(),
              message: text,
              messageType: MESSAGE_TYPE.USER_MESSAGE
            }
          ]
        }
      )

      const controller = new AbortController()

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, agentId }),
      })

      if (!res.ok) {
        throw new Error(`Chat request failed: ${res.statusText}`)
      }

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let done = false
      let full = ''

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        if (value) {
          const chunk = decoder.decode(value)
          full += chunk
          // e.g. append to your UI
          console.log('Chunk:', chunk)
        }
      }

      console.log('Final:', full)

    } catch (error) {
      console.error('Error sending message:', error)
    }
  }
  return useMutation<void, undefined, UseSendMessageType>({
    mutationFn: (options) => sendMessage(options)
  })
}
