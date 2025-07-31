'use client'

import { Button } from '@/components/ui/button'
import { useEffect, useRef } from 'react'
import { ArrowUpIcon } from 'lucide-react'
import type { UseChatHelpers } from '@ai-sdk/react'
import { TEXTBOX_PLACEHOLDER } from '@/app/lib/labels'

interface MessageComposerProps {
  handleSubmit: UseChatHelpers['handleSubmit']
  handleInputChange: UseChatHelpers['handleInputChange']
  input: UseChatHelpers['input']
  status: UseChatHelpers['status']
}

export function MessageComposer(props: MessageComposerProps) {
  const { handleSubmit, handleInputChange, input, status } = props

  const parentRef = useRef<HTMLDivElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)


  useEffect(() => { // Adjust the height of the textarea based on its content
    const textarea = textAreaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight > 500 ? '500px' : textarea.scrollHeight + 'px';
    }
  }, [input]);

  return (
    <div className='flex min-w-0 flex-col justify-end'>
      <div className='relative mx-auto flex w-full gap-2 p-2 md:max-w-3xl md:pb-6'>
        <div
          ref={parentRef}
          tabIndex={-1}
          className='block max-h-[calc(75dvh)] w-full flex-col rounded-md border border-input bg-muted px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
        >
          <form data-id='message-input' onSubmit={handleSubmit}>
            <textarea
              name='message'
              ref={textAreaRef}
              value={input}
              placeholder={TEXTBOX_PLACEHOLDER}
              onChange={handleInputChange}
              className={
                'appearance-none focus:outline-none focus:ring-0 focus:border-transparent flex w-full min-h-20 resize-none border-none bg-transparent text-base shadow-none ring-0 placeholder:text-muted-foreground hover:border-none md:text-sm'
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <div className='flex justify-end'>
              <Button
                type='submit'
                className='flex h-8 w-1 items-center justify-center rounded-full'
                disabled={status === 'submitted'}
              >
                <ArrowUpIcon width={14} height={16} />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
