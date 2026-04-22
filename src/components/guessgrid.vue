<script setup lang="ts">
import GuessRow from './GuessRow.vue'
import type { Tile } from '../user/UI'

defineProps<{
  rows: Tile[][]
}>()
</script>

<template>
  <div class="guess-grid">
    <GuessRow v-for="(row, index) in rows" :key="index" :tiles="row" />
  </div>
</template>

<style scoped>
.guess-grid {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}
</style>