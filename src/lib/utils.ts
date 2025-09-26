import { Letta } from '@letta-ai/letta-client'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { AssistantMessageContent } from '@letta-ai/letta-client/api/types'
import type { UIMessage } from 'ai'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const extractMessageText = (
  data: UIMessage[] | AssistantMessageContent
) => {
  // Handle the new case: search backwards through messages for text-only parts
  if (Array.isArray(data) && data.length > 0 && 'role' in data[0]) {
    const messages = data as UIMessage[]

    // Search backwards from the end
    for (let i = messages.length - 1; i >= 0; i--) {
      const message: UIMessage = messages[i]
      if (message?.parts && Array.isArray(message.parts)) {
        const textParts = message.parts.filter((part) => part.type === 'text')
        if (textParts.length > 0) {
          return textParts.map((part) => part.text).join(' ')
        }
      }
    }
  }
  return null
}
