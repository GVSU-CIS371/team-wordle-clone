<script setup lang="ts">
import { onMounted } from 'vue'
import router from '../router/index.ts'
import GuessGrid from '../components/guessgrid.vue'
import OnScreenKeyboard from '../components/OnScreenKeyboard.vue'
import { useAuthStore } from '../stores/auth.ts'
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useGameUIStore } from '../stores/UI.ts'
import { get_word, guess_word } from '../router/wordRoutes.ts';
import { date_convert } from '../../util/date.ts'

const authStore = useAuthStore()
const game = useGameUIStore()

onMounted(async () => {
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      authStore.setUser(user);
      game.setUser(user.email!);
    } else {
      authStore.setUser(null);
      router.push('/login');
    }
  });
  const date: string = date_convert(new Date);
  const word: string = await get_word(date);
  if (game.date === null) {
    game.setDate(date);
  } else if (game.date !== date) {
    game.resetBoard()
    game.setDate(date)
  }
  game.setWord(word);
});

function pressKey(letter: string) {
  game.addLetter(letter)
}

function pressEnter() {
  game.submitGuess(game.currentGuess, game.word)
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

      <OnScreenKeyboard v-if="game.message !== 'You won' && game.message !== 'You lost'"
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