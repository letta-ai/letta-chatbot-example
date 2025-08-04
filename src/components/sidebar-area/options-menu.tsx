import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Ellipsis, PenBox, Trash2Icon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { DialogType, useDialogDetails } from '../ui/agent-dialog'

const OptionsMenu: React.FC<{ agentId: string }> = ({ agentId }) => {
  const { setDialogType } = useDialogDetails()

  return (
    <div className='flex'>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenu>
            <DropdownMenuTrigger data-id={`options-menu-${agentId}`}>
              <Ellipsis size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='flex flex-col gap-1 p-3'>
              <DropdownMenuItem
                data-id={`edit-agent-button-${agentId}`}
                id={`edit-agent-${agentId}`}
                onClick={() => {
                  setDialogType(DialogType.EditAgent)
                }}
              >
                <PenBox size={16} />
                Edit Agent
              </DropdownMenuItem>
              <DropdownMenuItem
                data-id={`delete-agent-button-${agentId}`}
                className='text-red-500 hover:text-red-500 focus:text-red-500'
                onClick={() => {
                  setDialogType(DialogType.DeleteAgent)
                }}
              >
                <Trash2Icon size={16} />
                Delete Agent
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent>
          <span>Options</span>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}

export default OptionsMenu
