<template lang="jade">
#app(v-cloak)
  include _default/navbar 
  
  include _default/nuxt-container  
  
  include _default/app-state-modal 

  user-info-modal 
  
</template>

<script>
import UserInfoModal from '~components/User-Info-Modal.vue'

export default {
  components: { UserInfoModal }
}
</script>

<style>
.v-cloak {
  display: none;
}
</style>
