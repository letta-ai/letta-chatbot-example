import { streamText, generateText } from 'ai';
import { lettaCloud, lettaLocal, createLetta } from '@letta-ai/vercel-ai-sdk-provider';
import { validateAgentOwner } from '@/app/(server)/api/agents/helpers'
import { NextRequest, NextResponse } from 'next/server'
import { Context, ROLE_TYPE } from '@/types'


// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  console.log('hello')
  const { agentId, messages: prompt } = await req.json()
  // console.log(agentId, prompt)
  console.log('-->', agentId, prompt, req)

  // const validate = await validateAgentOwner(req, agentId)
  // if (validate instanceof NextResponse) {
  //   console.error('Error:', validate)
  //   return validate
  // }
  // const { agentId: newAgentId } = validate
  // console.log('validate', validate)

  // const letta = createLetta({
  //   baseUrl: process.env.LETTA_BASE_URL,
  // })

  console.log('lettaCloud', lettaCloud(agentId))

  const result = streamText({
    model: lettaCloud(agentId),
    // messages: [
    //   {
    //     role: ROLE_TYPE.USER,
    //     content: prompt
    //   }
    // ],
    messages: prompt
  });

  return result.toDataStreamResponse({ sendReasoning: true })
}