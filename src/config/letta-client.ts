import { LettaClient } from '@letta-ai/letta-client'
import { config } from 'dotenv'

config()

const LETTA_ACCESS_TOKEN = process.env.LETTA_ACCESS_TOKEN || 'DEFAULT_TOKEN'
const LETTA_BASE_URL = process.env.LETTA_BASE_URL || 'http://localhost:8283'

if (!LETTA_ACCESS_TOKEN) {
  console.error(
    "LETTTA_TOKEN is not set. You might not be able to use Letta's full functionality."
  )
}

if (!LETTA_BASE_URL) {
  console.error('BASE_URL is not set. We are using your localhost.')
}

const client = new LettaClient({
  token: LETTA_ACCESS_TOKEN,
  baseUrl: LETTA_BASE_URL
})

export default client
