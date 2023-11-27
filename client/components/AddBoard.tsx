import { MessageData } from '../../models/message.ts'

import { useState } from 'react'

const emptyBoard = {
  name: '',
  tag: '',
}

function AddBoardForm() {
  const [newBoard, setNewBoard] = useState(emptyBoard)

  const { name, tag } = newBoard

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewBoard((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(newBoard)
    addBoard(newBoard)
  }

  return (
    <>
      <h2>Add new</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleChange}
        />

        <label htmlFor="tag">Tag:</label>
        <input
          type="text"
          name="tag"
          id="tag"
          value={tag}
          onChange={handleChange}
        />

        <button type="submit" disabled={name === ''}>
          Add Board
        </button>
      </form>
    </>
  )
}

export default AddBoardForm
