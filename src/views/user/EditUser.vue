<template>
  <v-user-form :requestLink="link" :editUser="true"/>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { onBeforeMount } from '@vue/runtime-core'
import { useRoute } from 'vue-router'

export default {
    setup(){
      const store = useStore()

      const userId = useRoute().params.id

      const checkRole = () =>store.commit('user/CHECK_ROLE', userId)
      
      onBeforeMount(()=> checkRole())
      
      const link = ref('user/updateUser')
        
      return { link }
    }
}
</script>

<style>

</style>