<template lang="jade">
span.collapsed(role="button", @click="fetchComments")
  slot(name="extend-button")
</template>

<script>
export default {
  props: ['itemId'],
  methods: {
    fetchComments () {
      const { itemId, $el, $store } = this
      const { className } = $el
      const { commit, dispatch } = $store
      //
      const hasCollapsedClass = (className.indexOf('collapsed') >= 0)
      // if hasCollapsedClass = true // it means the panel body is collapsed currently and
      // will open now....as the fetch-comments-button is clicked...
      if (hasCollapsedClass) {
        commit('HIDE_COMMENTS', { itemId })
        commit('SET_FETCH_COMMENTS_STATUS', { itemId, status: true })
        //
        dispatch('ENSURE_ITEM_COMMENTS', { itemId })
          .then(() => commit('SHOW_COMMENTS', { itemId }))
          .then(() => commit('SET_FETCH_COMMENTS_STATUS', {itemId, status: false}))
      } else {
        commit('HIDE_COMMENTS', { itemId })
      }
    }
  }
}
</script>

<style>

</style>
