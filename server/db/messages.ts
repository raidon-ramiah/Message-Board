import connection from './connection.ts'
import { Message, MessageSnakeCase, MessageData } from '../../models/message.ts'

const columns = [
  'id',
  'message',
  'love as love',
  'added_by_user as addedByUser',
]

export async function getMessage(): Promise<Message[]> {
  return connection('messages')
    .select(...columns)
    .orderBy('id')
}

export async function addMessages(
  message: MessageData,
  userId: string,
  db = connection
): Promise<Message> {
  const messageSnakeCase: MessageSnakeCase = {
    message: message.message,
    love: message.love,
    added_by_user: userId,
  }

  return db('messages')
    .insert(messageSnakeCase)
    .returning(columns)
    .then((insertedEntries) => insertedEntries[0])
}

export async function updateMessages(
  id: number,
  updatedMes: MessageData,
  db = connection
): Promise<Message> {
  const messageSnakeCase: MessageSnakeCase = {
    message: updatedMes.message,
    love: updatedMes.love,
  }

  return db('messages')
    .where({ id })
    .update(messageSnakeCase)
    .returning(columns)
    .then((updatedEntries) => updatedEntries[0])
}

export async function deleteMessage(id: number, db = connection) {
  return db('messages').where({ id }).delete()
}

export async function userCanEdit(
  messageId: number,
  auth0Id: string,
  db = connection
) {
  return db('messages')
    .where({ id: messageId })
    .first()
    .then((message: MessageSnakeCase) => {
      if (message.added_by_user !== auth0Id) {
        throw new Error('Unauthorized')
      }
    })
}
