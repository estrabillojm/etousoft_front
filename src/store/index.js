import { createStore } from 'vuex'
import user from './modules/user'
import location from './modules/location'

export default createStore({
  modules: {
    user,
    location
  }
})
