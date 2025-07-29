import { NextRequest, NextResponse } from 'next/server'
import client from '@/config/letta-client'
import { filterMessages } from './helpers'
import { validateAgentOwner } from '../../helpers'
import { Context } from '@/types'
import { convertToAiSdkMessage, createLetta } from '@letta-ai/vercel-ai-sdk-provider'
import { streamText } from 'ai'

async function getAgentMessages(
  req: NextRequest,
  context: Context<{ agentId: string }>
) {
  const result = await validateAgentOwner(req, context)
  if (result instanceof NextResponse) {
    return result
  }
  const { agentId } = result

  try {
    const messages = await client.agents.messages.list(agentId, { limit: 100 })

    const result = filterMessages(messages)
    return NextResponse.json(convertToAiSdkMessage(result))
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      { error: 'Error fetching messages' },
      { status: 500 }
    )
  }
}

async function sendMessage(req: NextRequest, context: Context<{ agentId: string }>) {
  const { agentId } = await context.params;

  const validate = await validateAgentOwner(req, context)
  if (!('agentId' in validate)) {
    console.error('Error:', validate)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const letta = createLetta({
    token: process.env.LETTA_API_KEY,
    baseUrl: process.env.LETTA_BASE_URL,
  })

  const { messages } = await req.json()

  const result = streamText({
    model: letta(agentId),
    messages
  });

  return result.toDataStreamResponse({ sendReasoning: true })
}

export const GET = getAgentMessages
export const POST = sendMessage
