<script setup lang="ts">
import { computed, onMounted } from 'vue'
import router from '../router/index.ts'
import GuessGrid from '../components/guessgrid.vue'
import OnScreenKeyboard from '../components/OnScreenKeyboard.vue'
import { useAuthStore } from '../stores/auth.ts'
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useGameUIStore } from '../stores/UI.ts'
import { get_word } from '../router/wordRoutes.ts';
import { date_convert } from '../../util/date.ts'
import type { TileStatus } from '../stores/UI.ts'

const authStore = useAuthStore()
const game = useGameUIStore()

const statusPriority: Record<TileStatus, number> = {
  empty: 0,
  filled: 1,
  absent: 2,
  present: 3,
  correct: 4
}

const keyStates = computed<Partial<Record<string, TileStatus>>>(() => {
  const states: Partial<Record<string, TileStatus>> = {}

  for (const row of game.rows) {
    for (const tile of row) {
      if (!tile.letter || tile.status === 'empty' || tile.status === 'filled') {
        continue
      }

      const currentStatus = states[tile.letter]
      if (!currentStatus || statusPriority[tile.status] > statusPriority[currentStatus]) {
        states[tile.letter] = tile.status
      }
    }
  }

  return states
})

onMounted(async () => {
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      if (game.user !== user.email) {
        game.resetBoard();
        game.setUser(user.email!);
        game.$persist()
      }
    } else {
      game.setUser('');
      router.push('/login');
    }
  });
  const date: string = date_convert(new Date);
  const word: string = await get_word(date);
  if (game.date === '') {
    game.setDate(date);
  } else if (game.date !== date) {
    game.resetBoard()
    game.setDate(date)
    game.$persist()
  }
  game.setWord(word);
});

function pressKey(letter: string) {
  game.addLetter(letter)
}

async function pressEnter() {
  await game.submitGuess(game.currentGuess, game.word)
  game.$persist()
}

function pressBackspace() {
  game.removeLetter()
}
</script>

<template>
  <section class="game-view">
    <div class="game-card">
      <div class="game-head">
        <h1>Wordle Game</h1>
        <p v-if="authStore.user" class="user-email">{{ game.user }}</p>
      </div>

      <GuessGrid :rows="game.rows" />

      <p class="message">{{ game.message }}</p>

      <OnScreenKeyboard v-if="(game.message!=='You win' && game.message!=='You lost')"
      :key-states="keyStates"
      @key="pressKey" @enter="pressEnter" @backspace="pressBackspace" />
    </div>
  </section>
</template>

<style scoped>
.game-view {
  display: flex;
  justify-content: center;
}

.game-card {
  width: min(100%, 32rem);
  background: #f9f8f5;
  border: 1px solid #dcd9d5;
  border-radius: 0.75rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.game-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
}

.user-email {
  color: #7a7974;
  font-size: 0.9rem;
}

.message {
  min-height: 1.25rem;
  text-align: center;
  color: #a12c7b;
  font-weight: 500;
}
</style>