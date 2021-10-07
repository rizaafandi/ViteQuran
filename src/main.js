import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import './assets/css/style.css'
import 'sweetalert2/dist/sweetalert2.css'

import router from './routes'

createApp(App)
.use(createPinia())
.use(router)
.mount('#app')
