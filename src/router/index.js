import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/user/User.vue'
import SingleUser from '../views/user/SingleUser.vue'
import AddUser from '../views/user/AddUser.vue'
import EditUser from '../views/user/EditUser.vue'
import Profile from '../views/user/Profile.vue'
import Dashboard from '../views/user/Dashboard.vue'
import axios from 'axios'

let redirect = (to, from, next) =>{
  axios.get('/authenticated').then(()=>{ 
    next()
   }).catch(()=>{return next({ name: 'Home' }) })
}

const routes = [

  { path: '/new-user', name: 'AddUser', component: AddUser, beforeEnter: redirect },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, beforeEnter: redirect },
  { path: '/edit-user/:id', name: 'EditUser', component: EditUser, beforeEnter: redirect },
  { path: '/user/:id', name: 'SingleUser', component: SingleUser, beforeEnter: redirect },
  { path: '/users', name: 'User', component: User, beforeEnter: redirect },
  { path: '/profile', name: 'Profile', component: Profile, beforeEnter: redirect },
  { path: '/', name: 'Home', component: Home},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
