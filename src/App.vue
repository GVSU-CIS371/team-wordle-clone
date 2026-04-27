<script setup lang="ts">
import navbar from './components/navbar.vue';
</script>

<template>
  <navbar />
  <div id = 'app'>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<style scoped>

body, html {
  margin: 0;
  height: 100%;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  height: 100vh;
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
