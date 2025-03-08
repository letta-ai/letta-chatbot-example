import { DEFAULT_BOT_MESSAGE, NO_MESSAGES_LABEL } from '@/app/lib/labels'
import { useAgentMessages } from '@/components/hooks/use-agent-messages'
import { SkeletonLoadBlock } from '@/components/ui/skeleton-load-block'
import { extractMessageText } from '@/lib/utils'

export const MenuButtonMessage = ({ agentId }: { agentId: string }) => {
  const { data, isLoading } = useAgentMessages(agentId)

  // Get the last message safely
  const lastMessage = data?.[data.length - 1]?.message
    ? extractMessageText(data[data.length - 1]?.message)
    : null

  if (isLoading) {
    return <SkeletonLoadBlock className='w-full h-[1.43em]' />
  }

  if (!lastMessage || lastMessage === DEFAULT_BOT_MESSAGE) {
    return <i>{NO_MESSAGES_LABEL}</i>
  }

  return <span>{lastMessage}</span>
}
