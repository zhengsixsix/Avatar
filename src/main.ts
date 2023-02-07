import 'perfect-scrollbar/css/perfect-scrollbar.css'
import './styles/reset.css'
import './styles/global.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import i18n from './i18n'
createApp(App).use(i18n).use(createPinia()).mount('#app')
