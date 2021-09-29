<template>
  <v-layout>
        <template v-slot:content>
          <div class="grid grid-cols-2 gap-3" v-if="count">
            <div class="count-card admin">
              <h1>Administrator</h1>
              <p class="text-gray-200">Count: {{ count.admin }}</p>
              <img src="../../assets/img/profile-bg.png" class="absolute" alt="bg">
              <hr>
              <p class="font-semibold mt-2">
                Scope:
              </p>
             
              <p class="flex text-sm">
                <v-icon name="check_circle" class="mr-2 text-sm text-green-400"/>
                Dashboard
              </p>

              <p class="flex text-sm">
                <v-icon name="check_circle" class="mr-2 text-sm text-green-400"/>
                Change Password
              </p>
              <p class="flex text-sm">
                <v-icon name="check_circle" class="mr-2 text-sm text-green-400"/>
                Update Own Profile
              </p>
              <p class="flex text-sm">
                <v-icon name="check_circle" class="mr-2 text-sm text-green-400"/>
                User's Masterlist
              </p>
              <p class="flex text-sm">
                <v-icon name="check_circle" class="mr-2 text-sm text-green-400"/>
                View User Details
              </p>
              <p class="flex text-sm">
                <v-icon name="check_circle" class="mr-2 text-sm text-green-400"/>
                Add User
              </p>
              <p class="flex text-sm">
                <v-icon name="check_circle" class="mr-2 text-sm text-green-400"/>
                Edit User
              </p>
              <p class="flex text-sm">
                <v-icon name="check_circle" class="mr-2 text-sm text-green-400"/>
                Delete User
              </p>
            </div>

            <div class="count-card user">
              <h1>User</h1>
              <p class="text-gray-200">Count: {{ count.user }}</p>
              <img src="../../assets/img/profile-bg.png" class="absolute" alt="bg">
              <hr>
              <p class="font-semibold mt-2">
                Scope & Limitation:
              </p>
              <p class="flex text-sm">
                <v-icon name="check_circle" class="mr-2 text-sm text-green-400"/>
                Dashboard
              </p>

              <p class="flex text-sm">
                <v-icon name="check_circle" class="mr-2 text-sm text-green-400"/>
                Change Password
              </p>
              <p class="flex text-sm">
                <v-icon name="check_circle" class="mr-2 text-sm text-green-400"/>
                Update Own Profile
              </p>
              <p class="flex text-sm">
                <v-icon name="check_circle" class="mr-2 text-sm text-green-400"/>
                User's Masterlist
              </p>
              <p class="flex text-sm">
                <v-icon name="check_circle" class="mr-2 text-sm text-green-400"/>
                View User Details
              </p>
              <p class="flex text-sm">
                <v-icon name="highlight_off" class="mr-2 text-sm text-red-700"/>
                Add User
              </p>
              <p class="flex text-sm">
                <v-icon name="highlight_off" class="mr-2 text-sm text-red-700"/>
                Edit User
              </p>
              <p class="flex text-sm">
                <v-icon name="highlight_off" class="mr-2 text-sm text-red-700"/>
                Delete User
              </p>
            </div>
          </div>             
        </template>
    </v-layout>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { onBeforeMount } from '@vue/runtime-core'

export default {
    setup(){
        const store = useStore()
        const link = ref('user/register')

        const countFunc = () => store.dispatch('user/countUser')
        const count = computed(()=> store.state.user.count)

        onBeforeMount(()=> countFunc())

        return { link, count }
    }
}
</script>

<style scoped>
  .count-card{
    @apply border py-7 px-10 rounded-md shadow-sm relative overflow-hidden;
    
  }

  .count-card h1{
    font-size: 30px;
    color:white;
  }

    .count-card p{
      color:white;
    }

  .admin{
    background: #01577a;
  }

  .user{
    background: #00929f;
  }

  .admin img{
    top:-50px;
    right:-200px;
    opacity:.1;
  }

  .user img{
    top:-50px;
    left:-300px;
    opacity:.1;
  }
</style>