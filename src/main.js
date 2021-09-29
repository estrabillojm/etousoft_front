import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:8000/api"
axios.defaults.withCredentials = true

import LoginForm from './components/LoginForm'
import UserForm from './components/shared/UserForm'
import Profile from './components/shared/Profile'
import Button from './components/shared/Button'
import Icon from './components/shared/Icon'
import Layout from './components/shared/Layout'
import Table from './components/shared/Table'
import VueTailwindPagination from '@ocrv/vue-tailwind-pagination'


const app = createApp(App)

app.component('v-login', LoginForm)
.component('v-user-form', UserForm)
.component('v-btn', Button)
.component('v-icon', Icon)
.component('v-layout', Layout)
.component('v-tbl', Table)
.component('v-paginate', VueTailwindPagination)
.component('v-profile', Profile)
app.use(store).use(router)
app.mount('#app')
