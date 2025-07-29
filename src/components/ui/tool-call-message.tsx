import * as React from 'react'
import { LeftBar } from './left-bar'
import { Cogs } from '@/components/icons/cogs'

interface ToolCallMessageProps {
  message: string
  isEnabled: boolean
}

const ToolCallMessageBlock: React.FC<ToolCallMessageProps> = ({
  message,
  isEnabled
}) => {
  return (
    <div
      className={`flex w-max max-w-[100%] px-3 py-2 text-sm ${!isEnabled && 'hidden'}`}
    >
      <Cogs size={20}/>
      <div className='text-sm text-muted-foreground italic px-3'> {message}</div>
    </div>
  )
}

export { ToolCallMessageBlock }
