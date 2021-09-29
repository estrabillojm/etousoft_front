<template>
    <v-profile :auth="auth"/>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
export default {
    setup(){
        const store = useStore()
        const auth = computed(()=> store.state.user.info)

        return { auth }
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