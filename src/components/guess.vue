<script setup lang="ts">
import type { Tile } from '../stores/UI.ts'

defineProps<{
  tiles: Tile[]
}>()
</script>

<template>
  <div class="guess-row">
    <div
      v-for="(tile, index) in tiles"
      :key="index"
      class="tile"
      :class="tile.status"
    >
      {{ tile.letter }}
    </div>
  </div>
</template>

<style scoped>
.guess-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.45rem;
}

.tile {
  width: 3.1rem;
  height: 3.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d4d1ca;
  border-radius: 0.35rem;
  background: #fbfbf9;
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
}

.tile.filled {
  border-color: #01696f;
}

.tile.correct {
  background: #437a22;
  color: #f9f8f4;
  border-color: #437a22;
}

.tile.present {
  background: #d19900;
  color: #f9f8f4;
  border-color: #d19900;
}

.tile.absent {
  background: #797876;
  color: #f9f8f4;
  border-color: #797876;
}
</style>