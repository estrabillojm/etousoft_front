<template>
  <v-profile :auth="user"/>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
    setup(){
        const store = useStore()
        const id = useRoute().params.id
        
        
        onMounted(async ()=>{
            
            await store.dispatch('user/singleUser', id)
        })
        const user = computed(()=> store.state.user.user)

        if(user.value){
            console.log('usEEEEEER', user.value)
        }
        
        return { user }
    }
}
</script>

<style>

</style>