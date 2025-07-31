import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  getUseAgentStateKey,
  useAgentState,
  useModifyAgent
} from '../hooks/use-agent-state'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { AgentState } from '@letta-ai/letta-client/api'
import { useQueryClient } from '@tanstack/react-query'
import { USE_AGENTS_KEY } from '../hooks/use-agents'
import { useDialogDetails } from '../ui/agent-dialog'

const EditAgentForm: React.FC<{ agentId: string }> = ({ agentId }) => {
  const { data } = useAgentState(agentId)
  const { mutate: modifyAgent } = useModifyAgent(agentId)
  const queryClient = useQueryClient()
  const { closeAgentDialog } = useDialogDetails()

  const formSchema = z.object({
    agentName: z.string().min(1, {
      message: 'Agent name must be at least 1 characters.'
    })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agentName: data?.name || ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    modifyAgent(
      { name: values.agentName },
      {
        onSuccess: (data) => {
          queryClient.setQueriesData(
            { queryKey: getUseAgentStateKey(agentId) },
            () => {
              return data
            }
          )
          queryClient.setQueriesData(
            { queryKey: USE_AGENTS_KEY },
            (oldData: AgentState[]) => {
              return oldData.map((agent) => {
                if (agent.id === agentId) {
                  return data
                }
                return agent
              })
            }
          )
          closeAgentDialog()
        }
      }
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='agentName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input data-id={'agent-name-input'} placeholder='Enter a new agent name...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end space-x-3'>
          <Button variant='outline' onClick={() => closeAgentDialog()}>
            Cancel
          </Button>
          <Button data-id={'agent-name-input-save'} variant='default' type='submit'>
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default EditAgentForm
