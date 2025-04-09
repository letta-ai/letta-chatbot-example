import { AssistantMessageContent } from '@letta-ai/letta-client/api/types'

export interface AppMessage {
  id: string
  date: number
  message: AssistantMessageContent
  messageType: MESSAGE_TYPE
}

export enum MESSAGE_TYPE {
  USER_MESSAGE = 'user_message',
  ASSISTANT_MESSAGE = 'assistant_message',
  TOOL_CALL_MESSAGE = 'tool_call_message',
  REASONING_MESSAGE = 'reasoning_message',
  ROUNDROBIN_MESSAGE = 'roundrobin_message'
}

export enum ROLE_TYPE {
  USER = 'user'
}

export const LETTA_UID = 'letta-uid'

export type Context<T> = { params: Promise<T> }
