import { MESSAGE_TYPE } from '@/types'
import { LettaMessageUnion } from '@letta-ai/letta-client/api'


export function filterMessages(
  messages: LettaMessageUnion[]
) {
  // console.log(messages)
  const MESSAGE_TYPES_TO_HIDE = [MESSAGE_TYPE.SYSTEM_MESSAGE]

  return messages
    .filter((message) => {
      try {
        if (message.messageType === MESSAGE_TYPE.USER_MESSAGE) {
          const parsed = JSON.parse(message.content);
          if (parsed?.type === 'heartbeat') { // hide heartbeat messages
            return false;
          }
        }
      } catch {
        // Keep message if content is not valid JSON
        if (MESSAGE_TYPES_TO_HIDE.includes(message.messageType)) {
          return false
        }
        return true;
      }
      // Keep non-heartbeat, valid JSON messages
      if (MESSAGE_TYPES_TO_HIDE.includes(message.messageType)) {
        return false
      }
      return true;
    })
    .sort((a, b) => a.date - b.date);
}
