import React, { useState } from 'react'
import Fruits from './Messages'

export function Board() {
  const [displayBoards, setDisplayBoards] = useState([
    { id: 1, component: <Fruits /> },
  ])

  function createBoard() {
    setDisplayBoards((prevBoards) => [
      ...prevBoards,
      { id: prevBoards.length + 1, component: <Fruits /> },
    ])
  }

  function removeBoard(id) {
    setDisplayBoards((prevBoards) =>
      prevBoards.filter((board) => board.id !== id)
    )
  }

  function showBoard() {
    // Implement showBoard logic if needed
  }

  function hideBoard() {
    // Implement hideBoard logic if needed
  }

  return (
    <>
      <button onClick={createBoard}>Create a new board</button>

      {displayBoards.map((board) => (
        <div key={board.id}>
          {board.component}
          <button onClick={() => removeBoard(board.id)}>Remove Board</button>
        </div>
      ))}
    </>
  )
}

export default Board
