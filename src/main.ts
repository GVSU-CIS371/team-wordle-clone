import { createApp } from 'vue'
import App from './App.vue'
import { get_word, create_word, guess_word } from './router/wordRoutes.ts'
import { update_score } from './router/statRoutes.ts'


console.log(guess_word('crant', 'crane'));

createApp(App).mount('#app');
