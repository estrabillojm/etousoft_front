<template>
    <v-layout>
        <template v-slot:content>
            <div class="flex justify-between">
                <div class="btn-container" v-if="auth.role == 'admin'">

                        <router-link :to="{name: 'AddUser'}">
                            <button class="new-btn text-sm h-full">
                            New
                            </button>
                        </router-link>
                  
                </div>

                <div class="btn-container">
                   
                </div>
            </div>
            <v-tbl :headers="headers">
                <template v-slot:tdata>
                    <tr class="uppercase relative" v-for="(user, index) in users" :key="user.id" :class="{'auth-data': user.id == auth.id}">
                        <td>{{ index+1 }}</td>
                        <td class="text-center">
                            <v-icon name="admin_panel_settings" title="Administrator" v-if="user.role == 'admin'"/>
                            <v-icon name="person_outline" class="text-gray-500" title="User" v-else/>
                        </td>
                        <td>{{ user.last_name }} {{ user.suffix }}, {{ user.first_name }} <span v-if="user.middle_name">{{ user.middle_name.charAt(0) }}.</span></td>
                        <td>{{ user.contact }}</td>
                        <td>{{ user.city }}, {{ user.province }}</td>
                        <td class="text-center action">
                            <span v-if="auth.id != user.id">
                                <v-icon name="visibility" class="visibility action-icon" title="View User Details" @click="viewUser(user.id)"/>
                                <span v-if="auth.role == 'admin'">
                                    <v-icon name="edit" class="edit action-icon" title="Edit User"  @click="editUser(user.id)"/>
                                    <v-icon name="delete" class="delete action-icon" title="Delete User" @click="deleteUser(user.id)"/>
                                </span>
                            </span>
                            <v-icon v-else name="account_circle" class="user action-icon" title="My Profile" @click="viewUser(auth.id)"/>
                            
                        </td>   
                    </tr>
                </template>
                <template v-slot:paginate-btn>
                    <div class="page-container"  v-if="pageInfo">
                        <div>
                            <p class="text-sm">Current Page: {{ pageInfo.current}}</p>
                            <p class="text-sm">Total Data: {{ pageInfo.total}}</p>
                        </div>
                        <div>
                            <button class="border px-3 rounded-sm btn-paginate" :disabled="!pageInfo.prev" @click="switchPage(pageInfo.prev)">Prev</button>
                            <button class="border px-3 ml-1 rounded-sm btn-paginate" :disabled="!pageInfo.next" @click="switchPage(pageInfo.next)">Next</button>
                        </div>
                    </div>
                </template>
            </v-tbl>
        </template>
    </v-layout>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
import router from '@/router/index'
export default {
    setup(){
        const store = useStore()
        const headers = ['#','Role', 'Full Name', 'Contact No.', 'Address', 'Action']
        

        const pageUsers = (url)=> store.dispatch('user/pageUsers', url)
        const users = computed(()=> store.state.user.users)

        const auth = computed(()=> store.state.user.info)

        const pageInfo = computed(()=> store.state.user.page_info)

        onMounted(async ()=>{
            await pageUsers('/users?page=1')
        })


        const viewUser = (id) => {
            router.push({ name: 'SingleUser', params: { id: id }})
        }

        const editUser = (id) => {
            router.push({ name: 'EditUser', params: { id: id }})
        }

        const deleteUser = (id)=> store.dispatch('user/deleteUser', id)

        const switchPage = (url)=> {
            pageUsers(url)
        }
        

        return {
            headers,
            users,
            viewUser,
            auth,
            editUser,
            pageInfo,
            switchPage,
            deleteUser
 
        }
    }
}
</script>

<style>

    
    .go-btn{
        @apply border px-2 py-1 text-sm;
        border-left:none;
        border-radius: 0 3px 3px 0;
        background: #00929f;
        color:white;
        transition:all .3s ease;
    }

    .search-tb{
        @apply border px-2 py-1 text-sm;
        border-radius: 3px 0 0 3px;
        outline:none;
    }

    .go-btn:hover{
        opacity:.8;
    }

    tr td{
        @apply text-sm;
    }

    thead tr th:nth-child(6), thead tr th:nth-child(2){
        text-align:center;
    }

    .action-icon{
        font-size:1.2rem;
        @apply px-1;
    }

    .edit{
        @apply text-gray-500;
    }

    .delete{
        @apply text-red-400;
    }

    .edit:hover, .delete:hover{
        opacity:.7;
        transition:all .3s ease;
    }

    .new-btn{
        @apply border px-4 rounded-sm overflow-hidden;
        transition:all .4s ease;
        background:#ccc;
    }

    .new-btn:hover{
        background:#00929f;
        color:white;
        z-index:1;
    }

    .new-btn:hover .add-btn{
        color:white;
    }

    .page-container{
        display:flex;
        justify-content:space-between;
    }

    .btn-paginate{
        background: #01577a;
        color:white;
        @apply text-sm py-1;
        transition:all .3s ease;
    }

    .btn-paginate:hover{
        opacity:.7;
    }

    .auth-data{
        background:rgb(255, 255, 211);
    }

    .btn-paginate[disabled]{
        cursor:not-allowed;
    }

    .btn-paginate[disabled]{
        cursor:not-allowed;
        opacity:.7;
    }
</style>