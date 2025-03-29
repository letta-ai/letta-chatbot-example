import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { v4 as uuid } from 'uuid'
import { LETTA_UID } from '@/types'
import { USE_COOKIE_BASED_AUTHENTICATION } from '@/constants'
import { lettaMiddleware } from '@letta-ai/letta-nextjs/server'
import { identityPlugin } from '@letta-ai/letta-nextjs/plugins'

const middlewareConfig = {
  baseUrl: process.env.LETTA_SERVER_URL,
  apiKey: process.env.LETTA_ACCESS_TOKEN
}

export async function middleware(request: NextRequest) {
  if (!USE_COOKIE_BASED_AUTHENTICATION) {
    return lettaMiddleware(request, {
      ...middlewareConfig,
      plugins: []
    })
  }

  let lettaUid = request.cookies.get(LETTA_UID)?.value
  let isNewUser = false

  if (!lettaUid) {
    lettaUid = uuid()
    isNewUser = true
  }

  let response = await lettaMiddleware(request, {
    ...middlewareConfig,
    plugins: [
      identityPlugin({
        getIdentity: async () => {
          return {
            identityId: lettaUid
          }
        }
      }),
    ]
  })

  if (!response) {
    response = NextResponse.next();
  }

  if (isNewUser) {
    response.cookies.set({
      name: LETTA_UID,
      value: lettaUid,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // expires 24 hours from now
      sameSite: 'lax', // Helps prevent csrf
      httpOnly: true, // Prevents client-side access
      secure: process.env.NODE_ENV === 'production' // send over https if we're on prod
    })
  }

  return response
}
