<template>
  <v-user-form :requestLink="link" :editUser="true"/>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { onBeforeMount } from '@vue/runtime-core'

export default {
    setup(){
      const store = useStore()

      const checkRole = () =>store.commit('user/CHECK_ROLE')
      
      onBeforeMount(()=> checkRole())
      
      const link = ref('user/updateUser')
        
      return { link }
    }
}
</script>

<style>

</style>