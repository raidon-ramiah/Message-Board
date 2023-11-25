import request from 'superagent'
import { Message, MessageData } from '../models/message.ts'

const rootUrl = '/api/v1'

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getMessages(): Promise<Message[]> {
  // await sleep(1500)

  return request
    .get(`${rootUrl}/messages`)
    .then((res) => res.body.messages)
    .catch(logError)
}

interface AddMessageFunction {
  message: MessageData
  token: string
}
export async function addMessage({
  message,
  token,
}: AddMessageFunction): Promise<Message> {
  // await sleep(1500)

  return request
    .post(`${rootUrl}/messages`)
    .set('Authorization', `Bearer ${token}`)
    .send({ message })
    .then((res) => res.body.message)
    .catch(logError)
}

interface UpdateMessageFunction {
  message: Message
  token: string
}
export async function updateMessage({
  message,
  token,
}: UpdateMessageFunction): Promise<Message> {
  // await sleep(1500)

  return request
    .put(`${rootUrl}/messages/${message.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ message })
    .then((res) => res.body.message)
    .catch(logError)
}

interface DeleteMessageFunction {
  id: number
  token: string
}
export async function deleteMessage({
  id,
  token,
}: DeleteMessageFunction): Promise<void> {
  // await sleep(1500)

  return request
    .delete(`${rootUrl}/messages/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => res.body)
    .catch(logError)
}

function logError(err: Error) {
  console.log(err)
  if (err.message === 'Username Taken') {
    throw new Error('Username already taken - please choose another')
  } else if (err.message === 'Forbidden') {
    throw new Error(
      'Only the user who added the fruit may update and delete it'
    )
  } else {
    console.error('Error consuming the API (in client/api.js):', err.message)
    throw err
  }
}
