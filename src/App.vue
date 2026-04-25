<script setup lang="ts">
import { useAuthStore } from './stores/auth'; 
const authStore = useAuthStore();
</script>

<template>
  <div id = 'app'>
    <nav class = 'navigation'>
      <router-link to="/game">Game</router-link>
      <router-link to="/stats">Stats</router-link>
      <button v-if="authStore.user===null" @click="$router.push('/login')">Login</button>
      <button v-else @click="authStore.signout">Logout</button>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
