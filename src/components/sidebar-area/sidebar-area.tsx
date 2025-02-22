import { useAgentContext } from '@/app/[agentId]/context/agent-context'
import { AppSidebar } from '@/components/sidebar-area/app-sidebar'
import { Button } from '@/components/ui/button'
import { Sidebar } from '@/components/ui/sidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { AgentState } from '@letta-ai/letta-client/api'
import { useQueryClient } from '@tanstack/react-query'
import { LoaderCircle, PlusIcon } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { useDeleteAgent } from '@/components/hooks/use-agent-state'
import { USE_AGENTS_KEY, useAgents } from '@/components/hooks/use-agents'
import { useCreateAgent } from '@/components/hooks/use-create-agent'
import { useGetRuntimeInfo } from '@/components/hooks/use-get-runtime-info'
import { useIsConnected } from '@/components/hooks/use-is-connected'
import {
  AgentDialog,
  DialogType,
  useDialogDetails
} from '@/components/ui/agent-dialog'
import { StatusCircle } from '@/components/ui/status-circle'
import DeleteAgentConfirmation from './delete-agent-confirmation'
import EditAgentForm from './edit-agent-form'

export function SidebarArea() {
  const queryClient = useQueryClient()
  const { agentId, setAgentId } = useAgentContext()
  const { mutate: createAgent, isPending } = useCreateAgent()
  const { data: runtimeInfo, isLoading: isRuntimeInfoLoading } =
    useGetRuntimeInfo()

  const { data, isLoading: isAgentsLoading } = useAgents()
  const isConnected = useIsConnected()
  const { mutate: deleteAgent } = useDeleteAgent()

  const { dialogType, closeAgentDialog } = useDialogDetails()

  const scrollSidebarToTop = () => {
    const divToScroll = document.getElementById('agents-list')
    if (divToScroll) {
      divToScroll.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const scrollSidebarToCurrentAgent = () => {
    document.getElementById(agentId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCreateAgent = () => {
    if (isPending) return
    createAgent(undefined, {
      onSuccess: (data) => {
        queryClient.setQueriesData(
          { queryKey: USE_AGENTS_KEY },
          (oldData: AgentState[]) => {
            return [data, ...oldData]
          }
        )
        setAgentId(data.id)
        scrollSidebarToTop()
      }
    })
  }

  const handleDelete = () => {
    deleteAgent(agentId, {
      onSuccess: () => {
        queryClient.setQueriesData(
          { queryKey: USE_AGENTS_KEY },
          (oldData: AgentState[]) => {
            const updatedData = [
              ...oldData.filter((agent) => agent.id !== agentId)
            ]
            if (updatedData.length > 0) {
              setAgentId(updatedData[0].id)
              scrollSidebarToTop()
            }
            return updatedData
          }
        )
        closeAgentDialog()
      }
    })
  }

  useEffect(() => {
    if (data && data.length === 0) {
      handleCreateAgent()
    }
  }, [data])

  const hostname = useMemo(() => {
    if (runtimeInfo?.LETTA_SERVER_URL) {
      const lettaServerHostname = new URL(runtimeInfo.LETTA_SERVER_URL).hostname
      return lettaServerHostname === 'localhost' ||
        lettaServerHostname === '127.0.0.1' ||
        lettaServerHostname === '0.0.0.0'
        ? 'LOCAL SERVER'
        : 'REMOTE SERVER'
    }

    return 'LOCAL SERVER'
  }, [runtimeInfo])

  const isLoading = isAgentsLoading || isRuntimeInfoLoading

  return (
    <Sidebar className='mt-1'>
      <div className='flex flex-row items-center justify-between'>
        <div className='text-xs font-bold relative flex w-full min-w-0 cursor-default p-2.5 pl-4'>
          <Tooltip>
            <TooltipTrigger>
              <div
                className='flex items-center w-full'
                onClick={() => {
                  scrollSidebarToCurrentAgent()
                }}
              >
                <StatusCircle isConnected={isConnected} isLoading={isLoading} />
                {isLoading ? (
                  <LoaderCircle className='animate-spin' size={12} />
                ) : (
                  hostname
                )}
              </div>
              <TooltipContent>
                {isLoading ? (
                  <LoaderCircle className='animate-spin' size={12} />
                ) : (
                  runtimeInfo?.LETTA_SERVER_URL || 'http://localhost:8283'
                )}
              </TooltipContent>
            </TooltipTrigger>
          </Tooltip>
        </div>
        <div className='flex justify-end p-2'>
          {process.env.NEXT_PUBLIC_CREATE_AGENTS_FROM_UI === 'true' && (
            <Button
              disabled={isPending}
              type='button'
              onClick={() => {
                handleCreateAgent()
              }}
              className='inline-flex size-3 h-fit items-center justify-center whitespace-nowrap bg-transparent font-medium text-primary shadow-none ring-offset-background transition-colors hover:hover:bg-sidebar-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
            >
              {isPending ? (
                <LoaderCircle className='animate-spin' size={17} />
              ) : (
                <PlusIcon width={16} height={16} />
              )}
            </Button>
          )}
        </div>
      </div>

      {data && data.length > 0 && <AppSidebar agents={data} />}
      {dialogType === DialogType.EditAgent && (
        <AgentDialog
          title='Edit agent'
          content={<EditAgentForm agentId={agentId} />}
        />
      )}
      {dialogType === DialogType.DeleteAgent && (
        <AgentDialog
          title='Delete agent?'
          content={
            <DeleteAgentConfirmation
              agentId={agentId}
              handleDelete={handleDelete}
            />
          }
        />
      )}
    </Sidebar>
  )
}
