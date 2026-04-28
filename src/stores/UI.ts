import { defineStore } from 'pinia'
import { guess_word } from '../router/wordRoutes.ts'
import { all_list } from '../../util/word_list.ts'
import { play_game, update_score } from '../router/statRoutes.ts'

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
  date: string
  user: string
  gameComplete: boolean
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
    word: '',
    date: '',
    user: '',
    gameComplete: false
  }),
  persist: true,
  getters: {
    currentGuess(state): string {
      return (state.rows[state.currentRow] ? state.rows[state.currentRow]!.map(tile => tile.letter).join('') : '').toLowerCase();
    }
  },
  actions: {
    resetBoard() {
      this.rows = Array.from({ length: 6 }, () => makeRow())
      this.currentRow = 0
      this.currentCol = 0
      this.message = ''
      this.date = ''
      this.gameComplete = false
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
    setDate(date: string) {
      this.date = date;
    },
    setUser(user: string) {
      this.user = user;
    },
    async submitGuess(guess: string, word: string) {
      if (this.currentGuess.length < 5) {
        this.message = 'Not enough letters'
        return
      } else if (!all_list.includes(this.currentGuess)){
        this.message = 'Not a word'
        return
      }
      const result = guess_word(guess, word)
      for (let i = 0; i < 5; i++){
        this.rows[this.currentRow]![i]!.status = result[i]! as TileStatus;
      }
      for (let j = 0; j < 5; j++){
        if (this.rows[this.currentRow]![j]!.status !== 'correct'){
          this.message = 'Guess submitted';
          this.currentRow++;
          if (this.currentRow > 5) {
            this.gameComplete = true
            this.message = 'You lost'
            await play_game(this.user);
            return
          }
          this.currentCol = 0;
          return;
        }
      }
      this.gameComplete = true
      this.message = 'You won';
      await update_score(this.user, this.currentRow+1);
    }
  }
})