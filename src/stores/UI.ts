import { defineStore } from 'pinia'

export type TileStatus = 'empty' | 'filled' | 'correct' | 'present' | 'absent'

export type Tile = {
  letter: string
  status: TileStatus
}

type GameUIState = {
  rows: Tile[][]
  currentRow: number
  currentCol: number
  message: string
}

function makeRow(): Tile[] {
  return Array.from({ length: 5 }, () => ({
    letter: '',
    status: 'empty' as TileStatus
  }))
}

export const useGameUIStore = defineStore('gameUI', {
  state: (): GameUIState => ({
    rows: Array.from({ length: 6 }, () => makeRow()),
    currentRow: 0,
    currentCol: 0,
    message: ''
  }),
  getters: {
    currentGuess(state): string {
      return state.rows[state.currentRow] ? state.rows[state.currentRow]!.map(tile => tile.letter).join('') : ''
    }
  },
  actions: {
    resetBoard() {
      this.rows = Array.from({ length: 6 }, () => makeRow())
      this.currentRow = 0
      this.currentCol = 0
    },
    addLetter(letter: string) {
      if (this.currentRow > 5 || this.currentCol > 4) return
      this.rows[this.currentRow]![this.currentCol]!.letter = letter.toUpperCase()
      this.rows[this.currentRow]![this.currentCol]!.status = 'filled'
      this.currentCol++
      this.message = ''
    },
    removeLetter() {
      if (this.currentCol === 0 || this.currentRow > 5) return
      this.currentCol--
      this.rows[this.currentRow]![this.currentCol]!.letter = ''
      this.rows[this.currentRow]![this.currentCol]!.status = 'empty'
      this.message = ''
    },
    submitGuess() {
      if (this.currentGuess.length < 5) {
        this.message = 'Not enough letters'
        return
      }

      this.message = 'Guess submitted'
      this.currentRow++
      this.currentCol = 0

      if (this.currentRow > 5) {
        this.message = 'No more guesses left'
      }
    }
  }
})