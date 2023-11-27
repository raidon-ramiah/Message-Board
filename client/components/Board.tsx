import { useState } from 'react'
import Messages from './Messages'
import AddBoardForm from './AddBoard'

export function Board() {
  const [boardForm, setBoardForm] = useState(false)

  function createBoardForm() {
    setBoardForm(!boardForm)
    /* TO DO:
     CREATE AN AUTH REQUIRED ROUTE THAT CREATES A NEW BOARD, THAT HAS ALL FIELDS (USE MORE TREES FOR HELP)

     CREATE AND USE CUSTOM BOARD HOOK, TO BE KEPT IN HOOKS.TS

     UPDATE AND MANAGE TRELLO KANBAN

     FIX LOVE ATTRIBUTE 
     */
  }

  function removeBoard(id: number) {}

  function showBoard() {
    // Implement showBoard
  }

  function hideBoard() {
    // Implement hideBoard
  }

  return (
    <>
      <button onClick={createBoardForm}>Create a new board</button>
      {boardForm ? <AddBoardForm /> : null}

      {/* {displayBoards.map((board) => (
        <div key={board.id}>
          {board.component}
          <button onClick={() => removeBoard(board.id)}>Remove Board</button>
        </div>
      ))} */}
      <Messages />
    </>
  )
}

export default Board
