<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.ts'
import { get_score } from '../router/statRoutes.ts'

const router = useRouter()
const auth = useAuthStore()


onMounted(async () => {
  if (!auth.user) {
    router.push('/login')
    return
  }
})
</script>

<template>
  <section class="stats-view">
    <div class="stats-card">
      <h1>Stats</h1>

      <div class="stats-grid">
        <div class="stat-box">
          <span class="stat-label">Games Played</span>
          <span class="stat-value">{{ (await get_score(auth.getEmail)).games }}</span>
        </div>

        <div class="stat-box">
          <span class="stat-label">Wins</span>
          <span class="stat-value">{{ (await get_score(auth.getEmail)).wins }}</span>
        </div>

        <div class="stat-box">
          <span class="stat-label">Average Guesses</span>
          <span class="stat-value">{{ (await get_score(auth.getEmail)).av }}</span>
        </div>

        <div class="stat-box">
          <span class="stat-label">Best Game</span>
          <span class="stat-value">{{ (await get_score(auth.getEmail)).short }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats-view {
  display: flex;
  justify-content: center;
}

.stats-card {
  width: min(100%, 32rem);
  background: #f9f8f5;
  border: 1px solid #dcd9d5;
  border-radius: 0.75rem;
  padding: 1.25rem;
}

.stats-grid {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
}

.stat-box {
  padding: 0.9rem;
  border: 1px solid #d4d1ca;
  border-radius: 0.5rem;
  background: #fbfbf9;
}

.stat-label {
  display: block;
  color: #7a7974;
  font-size: 0.85rem;
  margin-bottom: 0.3rem;
}

.stat-value {
  font-size: 1.35rem;
  font-weight: 700;
}
</style>