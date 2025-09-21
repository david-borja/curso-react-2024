import { WINNER_COMBOS } from '../enums'

export const checkWinner = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] && // existe X u O
      boardToCheck[a] === boardToCheck[b] && // mismo jugador en b
      boardToCheck[a] === boardToCheck[c] // mismo jugador en c
    ) {
      return boardToCheck[a]
    }
  }
  // no hay ganador
  return null
}

export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null)
}
