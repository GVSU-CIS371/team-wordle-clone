import { defineStore } from 'pinia'

type StatsState = {
  gamesPlayed: number
  wins: number
  averageGuesses: number
  bestGame: number
}

export const useStatsStore = defineStore('stats', {
  state: (): StatsState => ({
    gamesPlayed: 0,
    wins: 0,
    averageGuesses: 0,
    bestGame: 0
  }),
  actions: {
    loadPlaceholderStats() {
      this.gamesPlayed = 4
      this.wins = 3
      this.averageGuesses = 4
      this.bestGame = 2
    }
  }
})