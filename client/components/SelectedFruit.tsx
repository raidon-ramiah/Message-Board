import { Message } from '../../models/message.ts'

import { useState } from 'react'

import { GridForm, ColOne, ColTwoText, Button } from './Styled.tsx'
import { useAuth0 } from '@auth0/auth0-react'

interface Props {
  message: Message
  onUpdate: (updatedMessage: Message) => void
  onDelete: (id: number) => void
  onClose: () => void
}

function SelectedMessageForm({ message, onUpdate, onDelete, onClose }: Props) {
  const [updatedMessage, setUpdatedMessage] = useState(message)

  const { message: editingName, love: editingGrams } = updatedMessage
  const { message: currentName } = message

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setUpdatedMessage((prevMessage) => ({
      ...prevMessage,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    onUpdate(updatedMessage)
  }

  const handleDeleteButtonClick = () => {
    onDelete(message.id)
  }

  function IsAuthorised() {
    return useAuth0().user?.sub === message.addedByUser
  }

  return (
    <>
      <h2>Selected: {currentName}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">message:</label>
        <input
          type="text"
          name="message"
          id="message"
          value={editingName}
          onChange={handleTextChange}
        />

        <label htmlFor="love">Love:</label>
        <input
          type="text"
          name="love"
          id="love"
          value={editingGrams}
          onChange={handleTextChange}
        />

        {IsAuthorised() ? (
          <>
            <button
              type="submit"
              disabled={editingName === '' || editingGrams === 0}
            >
              Update fruit
            </button>
            <button type="button" onClick={handleDeleteButtonClick}>
              Delete fruit
            </button>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </>
        ) : null}
      </form>
    </>
  )
}

export default SelectedMessageForm
