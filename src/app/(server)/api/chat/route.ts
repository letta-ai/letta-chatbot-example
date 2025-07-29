import { NextRequest, NextResponse } from 'next/server'
import { Context } from '@/types'
import { validateAgentOwner } from '@/app/(server)/api/agents/helpers'
import { streamText } from 'ai'
import { lettaCloud } from '@letta-ai/vercel-ai-sdk-provider'

export async function POST(req: NextRequest, context: Context<{ agentId: string }>) {
  const { agentId } = await context.params;

  const validate = await validateAgentOwner(req, context)
  if (!('agentId' in validate)) {
    console.error('Error:', validate)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // const letta = createLetta({
  //   baseUrl: process.env.LETTA_BASE_URL,
  // })

  const { messages } = await req.json()

  // console.log('messages', messages, agentId)

  const result = streamText({
    model: lettaCloud(agentId),
    messages
  });

  return result.toDataStreamResponse({ sendReasoning: true })
}

