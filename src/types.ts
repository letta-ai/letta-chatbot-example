import { AssistantMessageContent } from '@letta-ai/letta-client/api/types'

export enum MESSAGE_TYPE {
  USER_MESSAGE = 'user_message',
  SYSTEM_MESSAGE = 'system_message',
}

export enum ROLE_TYPE {
  USER = 'user'
}

export const LETTA_UID = 'letta-uid'

export type Context<T> = { params: Promise<T> }
