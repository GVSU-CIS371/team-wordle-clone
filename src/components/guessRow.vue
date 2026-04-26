<script setup lang="ts">
import type { Tile } from '../stores/UI'

defineProps<{
  tiles: Tile[]
}>()
</script>

<template>
  <div class="guess-row" aria-label="Guess row">
    <div
      v-for="(tile, index) in tiles"
      :key="index"
      class="guess-tile"
      :class="[`guess-tile--${tile.status}`]"
    >
      <span class="guess-tile__letter">{{ tile.letter }}</span>
    </div>
  </div>
</template>

<style scoped>
.guess-row {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.5rem;
  width: 100%;
  max-width: 20rem;
  margin: 0 auto;
}

.guess-tile {
  aspect-ratio: 1 / 1;
  border: 2px solid #d3d6da;
  display: grid;
  place-items: center;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.75rem;
  line-height: 1;
  background: #ffffff;
  color: #111827;
  user-select: none;
}

.guess-tile--empty {
  background: #ffffff;
  border-color: #d3d6da;
}

.guess-tile--correct {
  background: #6aaa64;
  border-color: #6aaa64;
  color: #ffffff;
}

.guess-tile--present {
  background: #c9b458;
  border-color: #c9b458;
  color: #ffffff;
}

.guess-tile--absent {
  background: #787c7e;
  border-color: #787c7e;
  color: #ffffff;
}

.guess-tile__letter {
  transform: translateY(1px);
}

@media (max-width: 480px) {
  .guess-row {
    gap: 0.35rem;
    max-width: 100%;
  }

  .guess-tile {
    font-size: 1.25rem;
  }
}
</style>
