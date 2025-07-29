import * as React from 'react'
import { cn } from '@/lib/utils'
import Markdown from 'react-markdown'
import { Message as MessageType } from '@ai-sdk/ui-utils'
import { ROLE_TYPE } from '@/types'

type Sender = MessageType['role']

interface MessagePillProps {
  message: string
  sender: Sender
}

const MessagePill = (props: MessagePillProps) => {
  const { message, sender } = props

  return (
    <div
      className={cn(
        'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
        sender === ROLE_TYPE.USER
          ? 'ml-auto bg-primary text-primary-foreground'
          : 'bg-muted'
      )}
    >
      <Markdown>{message}</Markdown>
    </div>
  )
}

export { MessagePill }
