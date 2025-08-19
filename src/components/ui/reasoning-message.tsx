import * as React from 'react'
import { LeftBar } from './left-bar'

interface ReasoningMessageProps {
  message: string
  isEnabled: boolean
}

const ReasoningMessageBlock = (props: ReasoningMessageProps) => {
  const { message, isEnabled } = props

  return (
    <div
      className={`flex w-max max-w-[100%] px-3 py-2 text-sm ${!isEnabled && 'hidden'}`}
    >
      <LeftBar />
      <div className='text-sm text-muted-foreground italic'>{message}</div>
    </div>
  )
}

export { ReasoningMessageBlock }
