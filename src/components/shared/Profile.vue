<template>
    <v-layout>
        <template v-slot:content>
            <div class="profile-grid relative">
                <div class="img-container">
                    <img src="../../assets/img/dummy.png" alt="">
                </div>
                <div class="main-info" v-if="auth">
                    <h2 class="uppercase name">
                        <span class="lastname blue">{{auth.last_name}} {{auth.suffix}},</span> <span class="firstname">{{auth.first_name}} {{auth.middle_name.charAt(0)}}.</span>
                    </h2>
                    <h3 class="uppercase">
                        {{ auth.brgy }}, {{ auth.city }}, {{ auth.province }}, {{ auth.region }}
                    </h3>
                    <h3 class="uppercase">
                        {{ auth.contact }}
                    </h3>
                    <h3 class="uppercase font-bold blue">
                        {{ auth.role }}
                    </h3>
                </div>
                <div class="cp-container" v-if="auth">
                    <button class="cp-btn" v-if="auth.id == me.id">Change Password</button>
                    <router-link :to="{ name: 'EditUser', params: { id: me.id }}">
                        <button class="cp-btn mt-1" v-if="auth.id == me.id">Update My Profile</button>
                    </router-link>
                </div>
                <div class="profile-content" v-if="auth">
                    <div>
                        <p class="text-sm uppercase"><span class="font-semibold">Username: </span>{{ auth.username }}</p>
                        <p class="text-sm uppercase"><span class="font-semibold">Gender: </span> {{ auth.gender }}</p>
                    </div>
                    <div>
                        <p class="text-sm uppercase"><span class="font-semibold">Date of Birth: </span>{{ auth.dob }}</p>
                        <p class="text-sm uppercase"><span class="font-semibold">Age: </span>{{ auth.age }} y.o</p>
                    </div>
                </div>
                <img src="../../assets/img/profile-bg.png" alt="etousoft" class="absolute profile-bg">
            </div>
        </template>
    </v-layout>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import { onMounted } from '@vue/runtime-core'

export default {
    props: {
        auth:{
            required:true
        }
    },
    setup(){
        const store = useStore()
        onMounted(()=> store.dispatch('user/auth'))
        const me = computed(()=> store.state.user.info)

        
        return { me }
    }
   

}
</script>

<style scoped>
    .profile-grid{
        display: grid;
        padding:20px;
        border-radius:10px;
        grid-template-columns: repeat(4, 1fr);
        grid-auto-rows:minmax(200px, auto);
        gap:20px;
        @apply shadow-md;
        box-sizing:border-box;
        background:rgb(248, 248, 248);
        overflow:hidden;
        min-height:420px;
    }


    .profile-bg{
        right:-300px;
        bottom:-300px;
        opacity:.2;
    }

    .cp-btn{
        @apply border w-full p-1 rounded-md text-white;
        background:#01577a;
        transition:all .3s ease;
    }

    .cp-btn:hover{
        opacity:.7;
    }



    .profile-grid .main-info{
        grid-column:2/5;
        border-bottom: 3px solid #01577a;
        
    }

    .profile-grid .profile-content{
        grid-column:2/5;
        grid-row:2/3;
        display:grid;
        grid-template-columns: repeat(2, 1fr); 
        grid-auto-rows: minmax(30px, auto);
    }

    .name{
        font-size:2.3rem;
        @apply font-semibold;
    }

    .blue{
        color:#01577a;
    }

    .firstname{
        color: #00929f;
    }

    h3{
        color: #00929f;
    }
</style>