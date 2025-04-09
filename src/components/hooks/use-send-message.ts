import { useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { getAgentMessagesQueryKey } from './use-agent-messages'
import { AppMessage, MESSAGE_TYPE, ROLE_TYPE } from '../../types'
import * as Letta from '@letta-ai/letta-client/api'
import { extractMessageText, getMessageId } from '@/lib/utils'

export interface UseSendMessageType {
  agentId: string
  text: string
}

export function useSendMessage() {
  const queryClient = useQueryClient()

  async function sendMessage(options: UseSendMessageType) {
    const { agentId, text } = options
    const url = `/api/agents/${agentId}/messages`
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
      try {
        await fetchEventSource(url, {
          signal: controller.signal,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ role: ROLE_TYPE.USER, text }),
          onmessage: (message) => {
            const response = JSON.parse(
              message.data
            ) as Letta.agents.LettaStreamingResponse
            queryClient.setQueriesData<AppMessage[] | undefined>(
              {
                queryKey: getAgentMessagesQueryKey(agentId)
              },
              (_data) => {
                if (!_data) {
                  return _data
                }

                const data = _data.filter(
                  (message) => message.id !== 'deleteme_'
                )

                const existingMessage = data.find(
                  (message) => message.id === getMessageId(response)
                )

                if (response.messageType === MESSAGE_TYPE.ASSISTANT_MESSAGE) {
                  // hack to remove the { "message": part of the response
                  const extractedMessage = extractMessageText(
                    response.content
                  ).replace('{"message":"', '')

                  if (existingMessage) {
                    return data.map((message) => {
                      if (message.id === getMessageId(response)) {
                        return {
                          id: getMessageId(response),
                          date: new Date(response.date).getTime(),
                          messageType: MESSAGE_TYPE.ASSISTANT_MESSAGE,
                          message: `${existingMessage.message || ''}${extractedMessage || ''}`
                        }
                      }
                      return message
                    })
                  }

                  return [
                    ...data,
                    {
                      id: getMessageId(response),
                      date: new Date(response.date).getTime(),
                      messageType: MESSAGE_TYPE.ASSISTANT_MESSAGE,
                      message: extractedMessage || ''
                    }
                  ]
                }

                if (response.messageType === MESSAGE_TYPE.REASONING_MESSAGE) {
                  if (existingMessage) {
                    return data.map((message) => {
                      if (message.id === getMessageId(response)) {
                        return {
                          id: getMessageId(response),
                          date: new Date(response.date).getTime(),
                          messageType: MESSAGE_TYPE.REASONING_MESSAGE,
                          message: `${existingMessage.message || ''}${response.reasoning || ''}`
                        }
                      }
                      return message
                    })
                  }

                  return [
                    ...data,
                    {
                      id: getMessageId(response),
                      date: new Date(response.date).getTime(),
                      messageType: MESSAGE_TYPE.REASONING_MESSAGE,
                      message: response.reasoning || ''
                    }
                  ]
                }

                // Add logic to handle the response from multiagent roundrobin agents
                if (response.messageType === MESSAGE_TYPE.ROUNDROBIN_MESSAGE) {
                  if (existingMessage) {
                    return data.map((message) => {
                      if (message.id === getMessageId(response)) {
                        return {
                          id: getMessageId(response),
                          date: new Date(response.date).getTime(),
                          messageType: MESSAGE_TYPE.ROUNDROBIN_MESSAGE,
                          message: `${existingMessage.message || ''}${response.content || ''}`
                        }
                      }
                      return message
                    })
                  }

                  return [
                    ...data,
                    {
                      id: getMessageId(response),
                      date: new Date(response.date).getTime(),
                      messageType: MESSAGE_TYPE.ROUNDROBIN_MESSAGE,
                      message: response.content || ''
                    }
                  ]
                }

                return data
              }
            )
          }
        })
      } finally {
        // Invalidate the messages query after stream ends
        queryClient.invalidateQueries({
          queryKey: getAgentMessagesQueryKey(agentId)
        })
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }
  return useMutation<void, undefined, UseSendMessageType>({
    mutationFn: (options) => sendMessage(options)
  })
}
