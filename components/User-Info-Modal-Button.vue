<template lang="jade">

span(role="button", @click="fetchUser")
  slot(name="extend-button")
</template>

<script>
export default {
  name: 'user-info-modal-button',
  props: [ 'userId' ],
  methods: {
    fetchUser () {
      const { userId } = this
      const { commit, dispatch } = this.$store
      //
      commit('SET_ACTIVE_USERID', { userId: null })
      dispatch('ENSURE_USER', { userId })
        .then(() => commit('SET_ACTIVE_USERID', { userId }))
    }
  }
}
</script>
