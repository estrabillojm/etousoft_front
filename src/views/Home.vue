<template>
  <div>
    <v-login/>
    
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import router from '@/router/index'
export default {
  setup(){
    onMounted(()=>{
      router.push({name: 'User'})
    })
  }
}
</script>
