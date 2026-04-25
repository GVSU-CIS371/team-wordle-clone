import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import view from './components/view.vue'
import  { createPinia } from 'pinia'
import router from './router/index'

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.component('view', view);
app.use(router)
app.mount('#app');
