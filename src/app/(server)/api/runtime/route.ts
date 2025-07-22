import { NextResponse } from 'next/server'
import type { RuntimeInfo } from './types'
async function getRuntimeInfo() {
  return NextResponse.json<RuntimeInfo>({
    LETTA_BASE_URL: process.env.LETTA_BASE_URL
  })
}

export const GET = getRuntimeInfo
