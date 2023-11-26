import { useState } from 'react'
import Fruits from './Fruits'

export function Board() {
  const [displayBoard, setDisplayBoard] = useState([<Fruits />])

  function createBoard() {
    setDisplayBoard((...prev) => [...prev, <Fruits />])
  }

  function showBoard() {}

  function hideBoard() {}

  return (
    <>
      <button onClick={createBoard}> Create a new board</button>

      {[displayBoard]}
    </>
  )
}

export default Board
