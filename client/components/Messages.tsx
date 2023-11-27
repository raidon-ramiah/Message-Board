import { Message, MessageData } from '../../models/message.ts'

import { useState } from 'react'
import SelectedFruitForm from './SelectedFruit.tsx'
import AddMessageForm from './AddFruit.tsx'
import { ErrorMessage } from './Styled.tsx'
import { useMessage } from '../hooks.ts'
import { useAuth0 } from '@auth0/auth0-react'
import SelectedMessageForm from './SelectedFruit.tsx'

type FormState =
  | {
      selectedMessage: Message
      show: 'selected'
    }
  | {
      selectedMessage: null
      show: 'add' | 'none'
    }

function Messages() {
  const jwt = useAuth0().getAccessTokenSilently
  const [error, setError] = useState('')
  const [form, setForm] = useState<FormState>({
    selectedMessage: null,
    show: 'none',
  })
  const messages = useMessage()

  const handleMutationSuccess = () => {
    handleCloseForm()
    setError('')
  }

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      setError(error.message)
    } else {
      setError('Unknown error')
    }
  }

  const mutationOptions = {
    onSuccess: handleMutationSuccess,
    onError: handleError,
  }

  const handleAdd = async (message: MessageData) => {
    // TODO: use getAccessTokenSilently to get an access token
    const access = await jwt()
    // TODO: pass access token to mutate function
    messages.add.mutate({ message, token: access }, mutationOptions)
  }

  const handleUpdate = async (message: Message) => {
    // TODO: use getAccessTokenSilently to get an access token
    const access = await jwt()
    // TODO: pass access token to mutate function
    messages.update.mutate({ message, token: access }, mutationOptions)
  }

  const handleDeleteFruit = async (id: number) => {
    // TODO: use getAccessTokenSilently to get an access token
    const access = await jwt()
    // TODO: pass access token to mutate function
    messages.delete.mutate({ id, token: access }, mutationOptions)
  }

  const hideError = () => {
    setError('')
  }

  const handleOpenAddForm = () => {
    setForm({ show: 'add', selectedMessage: null })
  }

  const handleCloseForm = () => {
    setForm({ show: 'none', selectedMessage: null })
  }

  const handleSelectFruit = (fruit: Message) => {
    setForm({ show: 'selected', selectedMessage: fruit })
  }

  if (messages.isLoading) {
    let failures = ''
    if (messages.failureCount > 0) {
      failures = ` (failed ${messages.failureCount} times)`
    }

    return <div>Loading... {failures}</div>
  }

  let fetchStatus = ''
  if (messages.add.isLoading) fetchStatus = 'Adding...'
  if (messages.update.isLoading) fetchStatus = 'Updating...'
  if (messages.delete.isLoading) fetchStatus = 'Deleting...'
  if (messages.isRefetching) fetchStatus = 'Refreshing...'

  if (messages.error instanceof Error) {
    return (
      <ErrorMessage>
        Failed to load messages: {messages.error.message}
      </ErrorMessage>
    )
  }

  return (
    <>
      {error !== '' && (
        <ErrorMessage onClick={hideError}>Error: {error}</ErrorMessage>
      )}
      {fetchStatus !== '' && <div>{fetchStatus}</div>}
      <ul>
        {messages.status === 'success' &&
          messages.data.map((message) => (
            <li key={message.id}>
              {message.message}
              <button onClick={() => handleSelectFruit(message)}>⚙️</button>
            </li>
          ))}
      </ul>
      {form.show === 'add' ? (
        <AddMessageForm onAdd={handleAdd} onClose={handleCloseForm} />
      ) : (
        <button onClick={handleOpenAddForm}>Add a Message</button>
      )}
      {form.show === 'selected' && (
        <SelectedMessageForm
          key={form.selectedMessage.id}
          message={form.selectedMessage}
          onUpdate={handleUpdate}
          onDelete={handleDeleteFruit}
          onClose={handleCloseForm}
        />
      )}
    </>
  )
}

export default Messages
