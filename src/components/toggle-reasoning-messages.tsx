'use client'

import { Switch } from '@/components/ui/switch'
import { createContext, useContext, useState } from 'react'

interface ReasoningMessageContextProps {
  isEnabled: boolean
  setIsEnabled: (enabled: boolean) => void
}

const ReasoningMessageContext = createContext<
  ReasoningMessageContextProps | undefined
>(undefined)

const ReasoningMessageProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(true)

  return (
    <ReasoningMessageContext.Provider value={{ isEnabled, setIsEnabled }}>
      {children}
    </ReasoningMessageContext.Provider>
  )
}

function useReasoningMessage() {
  const context = useContext(ReasoningMessageContext)
  if (!context) {
    throw new Error(
      'useReasoningMessage must be used within a ReasoningMessageProvider.'
    )
  }
  return context
}

function ReasoningMessageSwitch(props: React.ComponentProps<typeof Switch>) {
  const { isEnabled, setIsEnabled } = useReasoningMessage()

  return (
    <div className='flex w-max px-2 h-full'>
      <div className='flex items-center gap-2 text-xs'>
        <span className='font-bold'>REASONING MESSAGES</span>
        <Switch
          {...props}
          id='show-reasoning-messages'
          checked={isEnabled}
          onCheckedChange={setIsEnabled}
        />
      </div>
    </div>
  )
}

export { ReasoningMessageProvider, useReasoningMessage, ReasoningMessageSwitch }
