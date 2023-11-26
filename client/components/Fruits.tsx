import { Message, MessageData } from '../../models/message.ts'

import { useState } from 'react'
import SelectedFruitForm from './SelectedFruit.tsx'
import AddFruitForm from './AddFruit.tsx'
import { ErrorMessage } from './Styled.tsx'
import { useMessage } from '../hooks.ts'
import { useAuth0 } from '@auth0/auth0-react'

type FormState =
  | {
      selectedFruit: Message
      show: 'selected'
    }
  | {
      selectedFruit: null
      show: 'add' | 'none'
    }

function Messages() {
  const jwt = useAuth0().getAccessTokenSilently
  const [error, setError] = useState('')
  const [form, setForm] = useState<FormState>({
    selectedFruit: null,
    show: 'none',
  })
  const fruits = useMessage()

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
    fruits.add.mutate({ message, token: access }, mutationOptions)
  }

  const handleUpdate = async (message: Message) => {
    // TODO: use getAccessTokenSilently to get an access token
    const access = await jwt()
    // TODO: pass access token to mutate function
    fruits.update.mutate({ message, token: access }, mutationOptions)
  }

  const handleDeleteFruit = async (id: number) => {
    // TODO: use getAccessTokenSilently to get an access token
    const access = await jwt()
    // TODO: pass access token to mutate function
    fruits.delete.mutate({ id, token: access }, mutationOptions)
  }

  const hideError = () => {
    setError('')
  }

  const handleOpenAddForm = () => {
    setForm({ show: 'add', selectedFruit: null })
  }

  const handleCloseForm = () => {
    setForm({ show: 'none', selectedFruit: null })
  }

  const handleSelectFruit = (fruit: Message) => {
    setForm({ show: 'selected', selectedFruit: fruit })
  }

  if (fruits.isLoading) {
    let failures = ''
    if (fruits.failureCount > 0) {
      failures = ` (failed ${fruits.failureCount} times)`
    }

    return <div>Loading... {failures}</div>
  }

  let fetchStatus = ''
  if (fruits.add.isLoading) fetchStatus = 'Adding...'
  if (fruits.update.isLoading) fetchStatus = 'Updating...'
  if (fruits.delete.isLoading) fetchStatus = 'Deleting...'
  if (fruits.isRefetching) fetchStatus = 'Refreshing...'

  if (fruits.error instanceof Error) {
    return (
      <ErrorMessage>
        Failed to load messages: {fruits.error.message}
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
        {fruits.status === 'success' &&
          fruits.data.map((fruit) => (
            <li key={fruit.id}>
              {fruit.message}
              <button onClick={() => handleSelectFruit(fruit)}>⚙️</button>
            </li>
          ))}
      </ul>
      {form.show === 'add' ? (
        <AddFruitForm onAdd={handleAdd} onClose={handleCloseForm} />
      ) : (
        <button onClick={handleOpenAddForm}>Add a Message</button>
      )}
      {form.show === 'selected' && (
        <SelectedFruitForm
          key={form.selectedFruit.id}
          message={form.selectedFruit}
          onUpdate={handleUpdate}
          onDelete={handleDeleteFruit}
          onClose={handleCloseForm}
        />
      )}
    </>
  )
}

export default Messages
