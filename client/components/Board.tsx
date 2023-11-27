import { useState } from 'react'
import Messages from './Messages'

export function Board() {
  const [displayBoards, setDisplayBoards] = useState([
    { id: 1, component: <Messages /> },
  ])

  function createBoard() {
    setDisplayBoards((prevBoards) => [
      ...prevBoards,
      { id: prevBoards.length + 1, component: <Messages /> },
    ])
  }

  function removeBoard(id: number) {
    setDisplayBoards((prevBoards) =>
      prevBoards.filter((board) => board.id !== id)
    )
  }

  function showBoard() {
    // Implement showBoard
  }

  function hideBoard() {
    // Implement hideBoard
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
