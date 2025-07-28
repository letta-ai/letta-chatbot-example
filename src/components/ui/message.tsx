import * as React from 'react'
import { cn } from '@/lib/utils'
import { Letta } from '@letta-ai/letta-client'
import Markdown from 'react-markdown'

interface MessagePillProps {
  message: string
  sender: 'user' | 'assistant'
}

const MessagePill: React.FC<MessagePillProps> = ({ message, sender }) => {
  return (
    <div
      className={cn(
        'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
        sender === 'user'
          ? 'ml-auto bg-primary text-primary-foreground'
          : 'bg-muted'
      )}
    >
      <Markdown>{message}</Markdown>
    </div>
  )
}

export { MessagePill }
