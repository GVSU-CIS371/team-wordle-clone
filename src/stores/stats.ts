import { get_score, update_score } from '../router/statRoutes'
import type { User } from 'firebase/auth'
import { defineStore } from 'pinia'

type StatsState = {
  gamesPlayed: number
  wins: number
  averageGuesses: number
  bestGame: number | string
  winDates: Array<string>
}

export const useStatsStore = defineStore('stats', {
  state: (): StatsState => ({
    gamesPlayed: 0,
    wins: 0,
    averageGuesses: 0,
    bestGame: 0,
    winDates: []
  }),
  actions: {
    async update(user: User, score: number, date: string) {
      if (user.email != null) {
        await update_score(user.email, score, date);
      }
    },
    async getStats(user: User) {
      if (user.email != null) {
        const stats = await get_score(user.email);
        this.gamesPlayed = stats.games;
        this.wins = stats.wins;
        this.averageGuesses = stats.av;
        this.bestGame = stats.short;
      }
    }
  }
})