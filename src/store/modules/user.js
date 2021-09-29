import axios from 'axios'
import router from '@/router/index'
import Swal from 'sweetalert2'

const user = {
    namespaced: true, 
    state: {
        users: [],
        error: '',
        info: null,
        user: null,
        page_info: null,
        count: null
    },
    mutations: {
        CHECK_ROLE: (state, id)=>{
            if(state.info.role == 'user' && state.info.id != id){
                router.push({ name: 'User' })
            }
        },  
        COUNT_USER: (state, data)=>{
            console.log(data)
            state.count = data
        },
        SET_PAGINATION: (state, data)=>{
            state.page_info = data
        },
        UPDATE_USER: ()=>{
            router.push({name: 'User'})
        },
        CLEAR_USER: (state)=>{
            state.user = null
        },
        SINGLE_USER: (state, data)=>{
            state.user = data
        },
        PAGE_USERS: (state, data)=>{
            state.users = data
        },
        LOGIN: (state)=>{
           state.error = ''
        },
        REGISTER: ()=>{
            router.push({name: 'User'})
        },
        ERROR_HANDLING: (state, error)=>{
            state.error = error
        },
        AUTH: (state, data)=>{
            state.info = data
        }
    },
    actions: {

        deleteUser: async ({ dispatch }, id)=>{
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#01577a',
                cancelButtonColor: '#00929f',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`/user/${id}`).then(()=>{
                        dispatch('pageUsers', '/users')
                    })
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
              })
            
        },
        countUser: async ({ commit })=>{
            axios.get(`/all-users`).then(res=>{
                commit('COUNT_USER', res.data)
            })
        },

        updateUser: async ({ commit }, data)=>{
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#01577a',
                cancelButtonColor: '#00929f',
                confirmButtonText: 'Yes, Update it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    axios.patch(`/user/${data[0]}`, data[1]).then(res=>{
                        commit('UPDATE_USER', res.data)
                    })
                    Swal.fire(
                        'Updated!',
                        'Your file has been updated.',
                        'success'
                    )
                }
              })
            
        },
        singleUser: async ({ commit }, id)=>{
            commit('CLEAR_USER')
            await axios.get(`/user/${id}`).then(res=>{
                commit('SINGLE_USER', res.data)
            })
        },
        pageUsers: async ({ commit }, url)=>{
            await axios.get(`${url}`).then(res=>{
                commit('SET_PAGINATION', {
                    next: res.data.next_page_url,
                    prev: res.data.prev_page_url,
                    current: res.data.current_page,
                    total: res.data.total
                })
                commit('PAGE_USERS', res.data.data)
            })
        },
        login: ({ commit, dispatch }, data)=>{ 
            axios.post('/login', {
                username: data.username,
                password: data.password
            }).then(()=>{
                commit('LOGIN')
                dispatch('auth')
                router.push({name: 'Dashboard'})
            }).catch(err=>{
                commit('ERROR_HANDLING', err.response.data.error)
            })
        },
        register: ({ commit },data)=>{
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#01577a',
                cancelButtonColor: '#00929f',
                confirmButtonText: 'Yes, Save it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    axios.post('/register', data).then(()=>{
                        commit('REGISTER')
                    })
                    Swal.fire(
                        'Updated!',
                        'Your file has been updated.',
                        'success'
                    )
                }
              })
            
        },
        auth: ({ commit })=>{
            axios.get('/authenticated').then(res=>{
                commit('AUTH', res.data)
            })
        },
        signOut: ()=>{
            axios.post('/logout').then(()=>{
                router.push({ name: 'Home' })
            })
        }
    },
}

export default user