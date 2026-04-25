import { defineStore } from 'pinia'
import { guess_word } from '../router/wordRoutes'

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
  word: string
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
    message: '',
    word: ''
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
    setWord(word: string) {
      this.word = word;
    },
    submitGuess(guess: string, word: string) {
      if (this.currentGuess.length < 5) {
        this.message = 'Not enough letters'
        return
      } else if (this.currentRow > 5) {
        this.message = 'No more guesses left'
        return
      }
      const result = guess_word(guess, word)
      for (let i = 0; i < 6; i++){
        this.rows[this.currentRow]![i]!.status = result[i]! as TileStatus;
      }
      this.message = 'Guess submitted'
      this.currentRow++
      this.currentCol = 0
    }
  }
})