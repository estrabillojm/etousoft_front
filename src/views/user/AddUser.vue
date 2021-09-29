<template>
  <v-user-form :requestLink="link"/>
</template>

<script>
import { ref } from '@vue/reactivity'
import { onBeforeMount } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
    setup(){
        const link = ref('user/register')

        const store = useStore()

      const checkRole = () =>store.commit('user/CHECK_ROLE')
      
      onBeforeMount(()=> checkRole())

        return { link }
    }
}
</script>

<style>

</style>