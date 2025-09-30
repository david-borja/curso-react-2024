import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { WinnerModal } from './components/WinnerModal'
import { Board } from './components/Board'
import { checkEndGame, checkWinner } from './utils/board'
import { BOARD, TURN, TURNS } from './enums'
import {
  getGameFromStorage,
  resetGameStorage,
  saveGameToStorage
} from './utils/storage'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = getGameFromStorage(BOARD)
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = getGameFromStorage(TURN)
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null) // null es que no hay ganador, false es que hay un empate

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    saveGameToStorage({ board: newBoard, turn: newTurn })

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <Board board={board} updateBoard={updateBoard} />
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
