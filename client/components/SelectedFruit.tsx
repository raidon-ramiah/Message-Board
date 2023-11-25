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

function SelectedFruitForm({ message, onUpdate, onDelete, onClose }: Props) {
  const [updatedMessage, setUpdatedFruit] = useState(message)

  const { message: editingName, love: editingGrams } = updatedMessage
  const { message: currentName } = message

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setUpdatedFruit({
      ...updatedMessage,
      [name]: value,
    })
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
      <GridForm onSubmit={handleSubmit}>
        <ColOne htmlFor="name">Name:</ColOne>
        <ColTwoText
          type="text"
          name="name"
          id="name"
          value={editingName}
          onChange={handleTextChange}
        />

        <ColOne htmlFor="averageGramsEach">Average Grams Each:</ColOne>
        <ColTwoText
          type="text"
          name="averageGramsEach"
          id="averageGramsEach"
          value={editingGrams}
          onChange={handleTextChange}
        />

        {IsAuthorised() ? (
          <>
            <Button
              type="submit"
              disabled={editingName === '' || editingGrams === 0}
            >
              Update fruit
            </Button>
            <Button type="button" onClick={handleDeleteButtonClick}>
              Delete fruit
            </Button>
            <Button type="button" onClick={onClose}>
              Close
            </Button>
          </>
        ) : null}
      </GridForm>
    </>
  )
}

export default SelectedFruitForm
