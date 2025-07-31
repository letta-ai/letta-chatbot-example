import React from 'react'
import { Button } from '@/components/ui/button'
import { useDialogDetails } from '@/components/ui/agent-dialog'
import { useAgentState } from '../hooks/use-agent-state'

const DeleteAgentConfirmation: React.FC<{
  agentId: string
  handleDelete: () => void
}> = ({ agentId, handleDelete }) => {
  const { closeAgentDialog } = useDialogDetails()
  const { data: agent } = useAgentState(agentId)

  return (
    <div data-id={'delete-agent-confirmation'} className='space-y-4'>
      <span className='text-sm'>This will delete the agent</span>
      <span className='text-sm font-bold'> {agent?.name} </span>
      <span className='text-sm'>(this action cannot be undone)</span>
      <div className='flex justify-end space-x-3'>
        <Button variant='outline' onClick={() => closeAgentDialog()}>
          Cancel
        </Button>
        <Button
          data-id={'delete-agent-confirmation-button'}
          variant='destructive'
          onClick={() => {
            handleDelete()
            closeAgentDialog()
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

export default DeleteAgentConfirmation
