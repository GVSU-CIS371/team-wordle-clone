<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import GuessGrid from '../components/GuessGrid.vue'
import OnScreenKeyboard from '../components/OnScreenKeyboard.vue'
import { useAuthStore } from '../stores/auth.ts'
import { useGameUIStore } from '../stores/gameUI.ts'

const router = useRouter()
const auth = useAuthStore()
const game = useGameUIStore()

onMounted(() => {
  auth.hydrateFromStorage()
  if (!auth.user) {
    router.push('/login')
  }
})

function pressKey(letter: string) {
  game.addLetter(letter)
}

function pressEnter() {
  game.submitGuess()
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
        <p v-if="auth.user" class="user-email">{{ auth.user.email }}</p>
      </div>

      <GuessGrid :rows="game.rows" />

      <p class="message">{{ game.message }}</p>

      <OnScreenKeyboard @key="pressKey" @enter="pressEnter" @backspace="pressBackspace" />
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