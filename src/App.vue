<template>
  <router-view/>
</template>
<script>
import { onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
  setup() {
    onMounted(()=>{
      const store = useStore()
      store.dispatch('user/auth')
    })
  },
}
</script>

<style scoped>
  *{
    margin:0;
    padding:0;
    font-family: 'Open Sans';
    color:rgb(53, 53, 53);
  }

  body{
    border:5px solid red;
  }
</style>

