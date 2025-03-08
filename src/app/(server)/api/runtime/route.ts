import { NextResponse } from 'next/server'
import type { RuntimeInfo } from './types'
async function getRuntimeInfo() {
  return NextResponse.json<RuntimeInfo>({
    LETTA_SERVER_URL: process.env.LETTA_SERVER_URL
  })
}

export const GET = getRuntimeInfo
