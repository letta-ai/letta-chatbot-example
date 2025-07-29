import { MESSAGE_TYPE } from '@/types'
import { LettaMessageUnion } from '@letta-ai/letta-client/api'


export function filterMessages(
  messages: LettaMessageUnion[]
) {
  const MESSAGE_TYPES_TO_HIDE = [MESSAGE_TYPE.SYSTEM_MESSAGE]

  return messages
    .filter((message) => {
      try {
        if (message.messageType === MESSAGE_TYPE.USER_MESSAGE && typeof message.content === 'string') {
          const parsed = JSON.parse(message.content)
          if (parsed?.type === 'heartbeat') { // hide heartbeat messages
            return false;
          }
        }
      } catch {
        // Keep message if content is not valid JSON
        if (MESSAGE_TYPES_TO_HIDE.includes(<MESSAGE_TYPE>message.messageType)) {
          return false
        }
        return true;
      }
      // Keep non-heartbeat, valid JSON messages
      if (MESSAGE_TYPES_TO_HIDE.includes(<MESSAGE_TYPE>message.messageType)) {
        return false
      }
      return true;
    })
    // @ts-ignore
    .sort((a, b) => a.date - b.date);
}
