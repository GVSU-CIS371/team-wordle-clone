<script setup lang="ts">
const emit = defineEmits<{
  (e: 'key', value: string): void
  (e: 'enter'): void
  (e: 'backspace'): void
}>()

const rows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
]

function handleKey(value: string) {
  if (value === 'ENTER') {
    emit('enter')
    return
  }

  if (value === '⌫') {
    emit('backspace')
    return
  }

  emit('key', value)
}
</script>

<template>
  <div class="keyboard" aria-label="On-screen keyboard">
    <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="keyboard-row">
      <button
        v-for="key in row"
        :key="key"
        type="button"
        class="keyboard-key"
        :class="{
          'keyboard-key--wide': key === 'ENTER' || key === '⌫'
        }"
        @click="handleKey(key)"
      >
        {{ key }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.keyboard {
  display: grid;
  gap: 0.5rem;
  width: 100%;
  max-width: 36rem;
  margin: 0 auto;
}

.keyboard-row {
  display: flex;
  justify-content: center;
  gap: 0.35rem;
  width: 100%;
}

.keyboard-key {
  min-width: 2.25rem;
  height: 3.5rem;
  padding: 0 0.55rem;
  border: none;
  border-radius: 0.35rem;
  background: #d3d6da;
  color: #111827;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  text-transform: uppercase;
  flex: 1 1 0;
  max-width: 2.75rem;
}

.keyboard-key--wide {
  flex: 1.5 1 0;
  max-width: 4.5rem;
  font-size: 0.75rem;
}

.keyboard-key:active {
  transform: translateY(1px);
  filter: brightness(0.96);
}

@media (max-width: 480px) {
  .keyboard {
    gap: 0.35rem;
  }

  .keyboard-row {
    gap: 0.25rem;
  }

  .keyboard-key {
    height: 3rem;
    min-width: 2rem;
    max-width: none;
    font-size: 0.78rem;
    padding: 0 0.35rem;
  }

  .keyboard-key--wide {
    flex: 1.35 1 0;
  }
}
</style>
