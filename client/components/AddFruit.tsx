import { MessageData } from '../../models/message.ts'

import { useState } from 'react'

import { GridForm, ColOne, ColTwoText, Button } from './Styled.tsx'

interface Props {
  onAdd: (message: MessageData) => void
  onClose: () => void
}

const emptyMessage: MessageData = {
  message: '',
  love: 0,
}

function AddMessageForm({ onAdd, onClose }: Props) {
  const [newMessage, setNewMessage] = useState(emptyMessage)

  const { message, love } = newMessage

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewMessage((prevMessage) => ({
      ...prevMessage,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(newMessage)
    onAdd(newMessage)
  }

  return (
    <>
      <h2>Add new</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Message:</label>
        <input
          type="text"
          name="message"
          id="message"
          value={message}
          onChange={handleChange}
        />

        <label htmlFor="love">Love:</label>
        <input
          type="number"
          name="love"
          id="love"
          value={love}
          onChange={handleChange}
        />

        <button type="submit" disabled={message === '' || love === 0}>
          Add fruit
        </button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </form>
    </>
  )
}

export default AddMessageForm
