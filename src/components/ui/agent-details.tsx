'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { BrainIcon } from 'lucide-react'
import { createContext, forwardRef, useContext, useState } from 'react'

interface AgentDetailsContextProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const AgentDetailsContext = createContext<AgentDetailsContextProps | undefined>(
  undefined
)

const AgentDetailsProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <AgentDetailsContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </AgentDetailsContext.Provider>
  )
}

function useAgentDetails() {
  const context = useContext(AgentDetailsContext)
  if (!context) {
    throw new Error(
      'useAgentDetails must be used within a AgentDetailsProvider.'
    )
  }
  return context
}

const AgentDetailsTrigger = forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button> & {
    isLoading: boolean
  }
>(({ className, onClick, isLoading, ...props }, ref) => {
  const { isOpen, setIsOpen } = useAgentDetails()

  return (
    <Button
      ref={ref}
      data-sidebar='trigger'
      variant='ghost'
      size='icon'
      className={cn(
        `flex w-max px-2 h-full ${isOpen ? 'bg-accent' : ''}`,
        className
      )}
      onClick={(event) => {
        onClick?.(event)
        setIsOpen(!isOpen)
      }}
      disabled={isLoading}
      {...props}
    >
      {
        <div className='flex gap-2 text-xs'>
          <span className='font-bold'>
            {isOpen ? 'HIDE MEMORY' : 'SHOW MEMORY'}
          </span>
          <BrainIcon />
        </div>
      }
    </Button>
  )
})

export { AgentDetailsProvider, AgentDetailsTrigger, useAgentDetails }
