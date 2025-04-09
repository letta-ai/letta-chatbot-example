import { NextRequest, NextResponse } from 'next/server'
import client from '@/config/letta-client'
import defaultAgent from '@/default-agent'
import { getUserTagId, getUserId } from './helpers'

async function getAgents(req: NextRequest) {
  const userId = getUserId(req)
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  try {
    const agents = await client.agents.list({
      tags: getUserTagId(userId),
      matchAllTags: true
    })
    const sortedAgents = agents.sort((a, b) => {
      const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0
      const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0
      return dateB - dateA
    })

    // Add multiagent roundrobin logic
    const roundRobinAgents = sortedAgents.filter(agent => agent.tags.includes('roundrobin'))
    const nonRoundRobinAgents = sortedAgents.filter(agent => !agent.tags.includes('roundrobin'))

    const finalAgents = [...roundRobinAgents, ...nonRoundRobinAgents]

    return NextResponse.json(finalAgents)
  } catch (error) {
    console.error('Error fetching agents:', error)
    return NextResponse.json(
      { error: 'Error fetching agents' },
      { status: 500 }
    )
  }
}

async function createAgent(req: NextRequest) {
  // ADD YOUR OWN AGENTS HERE
  const DEFAULT_MEMORY_BLOCKS = defaultAgent.DEFAULT_MEMORY_BLOCKS
  const DEFAULT_LLM = defaultAgent.DEFAULT_LLM
  const DEFAULT_EMBEDDING = defaultAgent.DEFAULT_EMBEDDING

  const userId = getUserId(req)
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  try {
    const body = await req.json()
    const newAgent = await client.agents.create({
      memoryBlocks: DEFAULT_MEMORY_BLOCKS,
      model: DEFAULT_LLM,
      embedding: DEFAULT_EMBEDDING,
      tags: getUserTagId(userId)
    })

    // Add multiagent roundrobin creation logic
    if (body && body.roundrobin) {
      newAgent.tags.push('roundrobin')
    }

    return NextResponse.json(newAgent)
  } catch (error) {
    console.error('Error creating agent:', error)
    return NextResponse.json({ error: 'Error creating agent' }, { status: 500 })
  }
}

export const GET = getAgents
export const POST = createAgent
