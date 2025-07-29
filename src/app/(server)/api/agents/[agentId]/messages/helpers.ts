import { extractMessageText, getMessageId } from '@/lib/utils'
import { AppMessage, MESSAGE_TYPE } from '@/types'
import * as Letta from '@letta-ai/letta-client/api'
import { LettaMessageUnion } from '@letta-ai/letta-client/api'


const isHeartbeatMessage = (message: string) => {
  try {
    const parsed = JSON.parse(message)
    if (parsed.type === 'heartbeat') {
      return true
    }
    return null
  } catch (e) {
    return null
  }
}

const tryParseAssistantExtractedMessage = (message: string): string | null => {
  try {
    const parsed = JSON.parse(message)
    if (parsed.message) {
      return parsed.message
    }

    return null
  } catch (e) {
    return null
  }
}

function extractMessage(item: Letta.LettaMessageUnion): AppMessage | null {
  const { messageType } = item

  if (messageType === MESSAGE_TYPE.USER_MESSAGE) {
    if (!item.content) {
      return null
    }
    const message = extractMessageText(item.content)
    if (!message) {
      return null
    }
    if (isHeartbeatMessage(message)) {
      return null
    }
    return {
      id: getMessageId(item),
      date: new Date(item.date).getTime(),
      message: message,
      messageType: MESSAGE_TYPE.USER_MESSAGE
    }
  }

  if (messageType === MESSAGE_TYPE.TOOL_CALL_MESSAGE) {
    const extractedMessage = tryParseAssistantExtractedMessage(
      item.toolCall.arguments || ''
    )
    if (!extractedMessage) {
      return null
    }
    return {
      id: getMessageId(item),
      date: new Date(item.date).getTime(),
      message: extractedMessage,
      messageType: MESSAGE_TYPE.ASSISTANT_MESSAGE
    }
  }

  if (messageType === MESSAGE_TYPE.ASSISTANT_MESSAGE) {
    if (!item.content) {
      return null
    }
    return {
      id: getMessageId(item),
      date: new Date(item.date).getTime(),
      message: item.content,
      messageType: MESSAGE_TYPE.ASSISTANT_MESSAGE
    }
  }

  if (messageType === MESSAGE_TYPE.REASONING_MESSAGE) {
    if (!item.reasoning) {
      return null
    }
    return {
      id: getMessageId(item),
      date: new Date(item.date).getTime(),
      message: item.reasoning,
      messageType: MESSAGE_TYPE.REASONING_MESSAGE
    }
  }

  return null
}

// export function filterMessages(data: Letta.LettaMessageUnion[]): AppMessage[] {
//   return data
//     .map((item) => extractMessage(item))
//     .filter((item) => item !== null)
//     .sort((a, b) => {
//       //// place reasoning_message always infront of the user message if they are in the same second
//       if (a.date === b.date) {
//         if (a.messageType === MESSAGE_TYPE.REASONING_MESSAGE) {
//           return -1
//         }
//
//         if (b.messageType === MESSAGE_TYPE.REASONING_MESSAGE) {
//           return 1
//         }
//       }
//
//       // otherwise sort by date
//       return a.date - b.date
//     })
// }

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
        if (MESSAGE_TYPES_TO_HIDE.includes(message.messageType)) {
          return false
        }
        // Keep message if content is not valid JSON
        return true;
      }
      if (MESSAGE_TYPES_TO_HIDE.includes(message.messageType)) {
        return false
      }
      return true; // Keep non-heartbeat, valid JSON messages
    })
    .sort((a, b) => a.date - b.date);
}
