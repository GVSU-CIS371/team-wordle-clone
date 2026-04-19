<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.ts'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')

async function submitLogin() {
  await auth.login(email.value, password.value)
  if (auth.user) {
    router.push('/game')
  }
}
</script>

<template>
  <section class="login-view">
    <div class="login-card">
      <h1>Login</h1>

      <label class="field">
        <span>Email</span>
        <input v-model="email" type="email" />
      </label>

      <label class="field">
        <span>Password</span>
        <input v-model="password" type="password" />
      </label>

      <p v-if="auth.error" class="error-text">{{ auth.error }}</p>

      <button type="button" class="primary-btn" @click="submitLogin">Sign In</button>
    </div>
  </section>
</template>

<style scoped>
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
}

.login-card {
  width: min(100%, 24rem);
  padding: 1.5rem;
  background: #f9f8f5;
  border: 1px solid #dcd9d5;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.field input {
  padding: 0.65rem 0.75rem;
  border: 1px solid #d4d1ca;
  border-radius: 0.35rem;
}

.primary-btn {
  border: none;
  padding: 0.7rem 0.9rem;
  border-radius: 0.4rem;
  background: #01696f;
  color: #f9f8f4;
  font-weight: 600;
}

.error-text {
  color: #a12c7b;
}
</style>