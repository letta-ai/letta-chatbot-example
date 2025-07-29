import React from 'react'
import { Card, CardDescription, CardHeader } from '../ui/card'
import { useIsMobile } from '@/hooks/use-mobile'
import {
  MESSAGE_POPOVER_DESCRIPTION,
  suggestedChatActions
} from '@/app/lib/labels'
import Markdown from 'react-markdown'
import { ROLE_TYPE } from '@/types'

interface MessagePopoverProps {
  append: any
}

export const MessagePopover = (props: MessagePopoverProps) => {
  const isMobile = useIsMobile()
  const { append } = props

  return (
    <div className='flex flex-col items-center h-full justify-between'>
      <div className='flex top-component pt-20'>
        <div className='text-center'>
          <Markdown>{MESSAGE_POPOVER_DESCRIPTION}</Markdown>
        </div>
      </div>
      <div
        className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-2 w-full`}
      >
        {suggestedChatActions
          .slice(0, isMobile ? 2 : suggestedChatActions.length)
          .map((card, index) => (
            <Card
              key={index}
              onClick={() => {
                append({
                  role: ROLE_TYPE.USER,
                  content: card.action,
                })
              }}
              className='cursor-pointer shadow-none hover:bg-accent transition-shadow duration-300'
            >
              <CardHeader>
                <p className='text-sm font-medium leading-none !font-bold'>
                  {card.title}
                </p>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
      </div>
    </div>
  )
}
