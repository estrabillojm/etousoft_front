<template>
  <div class="parent-grid">
      <div class="user-info flex justify-between items-center">
            <div>
                <img src="../../assets/img/logo.png" alt="etousoft-logo" class="logo">
            </div>
            <div class="flex">
                
                <v-icon name="account_circle"  class="mr-2 text-gray-500" />
                <p class="text-gray-500 uppercase text-right">  
                    {{ `${auth.first_name} ${auth.middle_name.charAt(0)}. ${auth.last_name}` }}
                    <br>
                    <span class="text-sm">{{ auth.role }}</span>
                </p>

            </div>
      </div>
      <div class="nav">
          <div class="nav-content">
                <ul class="nav-list">
                    <li>
                        <router-link class="r-link" :to="{name: 'Dashboard' }">
                        Dashboard
                        </router-link>
                    </li>
                    <li>
                        <router-link class="r-link" :to="{name: 'Profile' }">
                        My Profile
                        </router-link>
                    </li>
                    <li>
                        <router-link class="r-link" :to="{name: 'User' }">
                        User List
                        </router-link>
                    </li>
              </ul>


              <ul>
                  <li><a class="cursor-pointer hover:text-gray-400" @click="signOut()"> Log out</a></li>
              </ul>
          </div>
      </div>
      <div class="content">
          <div class="content-main">
              <slot name="content"></slot>
          </div>
      </div>
      <!-- <div class="img-container">
          <img src="../../assets/img/bg.png" alt="">
      </div> -->
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
    setup(){
        const store = useStore()
        onMounted(()=> store.dispatch('user/auth'))
        const auth = computed(()=> store.state.user.info)

        const signOut = ()=> {
            store.dispatch('user/signOut')
        }
        
        return { auth, signOut }
    }
}
</script>

<style>
    .logo{
        height:4rem;
    }
    .parent-grid{
        display: flex;
        flex-direction: column;
        height:100vh;
        position:relative;
    }

    .content{
        min-height:80vh;
        grid-column: 1/3;
    }

    .user-info , .nav {
        height:10vh;
    }

    .nav{
        display:flex;
        align-items:center;
    }

    .nav-flex, .user-info{
        max-width:960px;
        margin:0 auto;
        display:flex;
        width:100%;
        padding:0 20px;
    }


    .nav-content{
        max-width:960px;
        margin:0 auto;
        display:flex;
        width:100%;
        padding:0 20px;
        justify-content:space-between;
    }

    .nav-list  .r-link{
        @apply font-semibold;
        padding-right:30px;
        color: #01577a;
    }

    .nav-list  .r-link:hover{
        color:#01587ace
    }

    .nav-list{
        display:flex;
    }

    .nav-flex{
        justify-content: space-between;
    }

    .content-main{
        max-width:960px;
        margin:0 auto;
       
        height:100%;
        padding:0 20px;
    }

    .nav-flex li{
        @apply w-full;
        text-align:center;
    }

    .nav-flex li a{
        font-weight:400;
        @apply uppercase;
    }

    .nav-flex li:hover a{
        color:rgb(128, 128, 128);
        transition:all .3s ease;
    }


    


    
</style>