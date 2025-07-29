import client from '@/config/letta-client'
import { Context, LETTA_UID } from '@/types'
import { NextRequest, NextResponse } from 'next/server'
import { USE_COOKIE_BASED_AUTHENTICATION } from '@/constants'

export async function validateAgentOwner(
  req: NextRequest,
  context: Context<{ agentId: string }>
) {
  const { agentId } = await context.params

  if (!USE_COOKIE_BASED_AUTHENTICATION) {
    return {
      userId: 'default',
      agentId,
      agent: await getAgent(agentId)
    }
  }

  const userId = getUserId(req)
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  if (!agentId) {
    return NextResponse.json({ error: 'Agent ID is required' }, { status: 400 })
  }

  const agent = await getAgent(agentId)
  if (!agent) {
    return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
  }

  if (!agent.tags.includes(`user:${userId}`)) {
    return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
  }

  return {
    userId: userId,
    agentId: agentId,
    agent: agent
  }
}

export function getUserTagId(userId: string) {
  if (!USE_COOKIE_BASED_AUTHENTICATION) {
    return []
  }

  return [`user:${userId}`]
}

export function getUserId(req: NextRequest) {
  if (!USE_COOKIE_BASED_AUTHENTICATION) {
    return 'default'
  }

  return req.cookies.get(LETTA_UID)?.value
}

export async function getAgent(agentId: string) {
  const agent = await client.agents.retrieve(agentId)
  return agent
}
