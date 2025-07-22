import { LettaClient } from '@letta-ai/letta-client'
import { config } from 'dotenv'

config()

const LETTA_API_KEY = process.env.LETTA_API_KEY || 'DEFAULT_TOKEN'
const LETTA_BASE_URL = process.env.LETTA_BASE_URL || 'http://localhost:8283'

if (!LETTA_API_KEY) {
  console.error(
    "LETTTA_TOKEN is not set. You might not be able to use Letta's full functionality."
  )
}

if (!LETTA_BASE_URL) {
  console.error('BASE_URL is not set. We are using your localhost.')
}

const client = new LettaClient({
  token: LETTA_API_KEY,
  baseUrl: LETTA_BASE_URL
})

export default client
