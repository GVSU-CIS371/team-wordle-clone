<script setup lang="ts">
import { useAuthStore } from '../stores/auth.ts'; 
const authStore = useAuthStore();
</script>

<template>
  <nav class = 'navigation'>
    <div id="left">
      <router-link to="/game">Game</router-link>
      <router-link to="/stats">Stats</router-link>
    </div>
    <div id="right">
      <button v-if="authStore.user===null" @click="$router.push('/login'); authStore.$persist();">Login</button>
      <button v-else @click="authStore.signout(); $router.push('/login'); authStore.$persist();">Logout</button>
    </div>
  </nav>
</template>

<style lang="css" scoped>

.navigation {
  list-style: none;
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding: 1rem;
  position: sticky; 
  align-items: center;
  justify-items: top;
  background-color: rgb(37, 36, 36);
  position: sticky;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 1000;
  align-self: flex-start;
}

.left {
  display: flex;
  gap: 20px;
}

.right {
  margin-left: auto;
}

.navigation a:hover {
  color: #0084ff;
}
</style>