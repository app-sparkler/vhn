<template lang="jade">
.container
  .row
    .col-sm-10.col-md-offset-1(style="padding-bottom:70px;")
      spinner(:loading="isLoading")
      // BS Pagination
      // story-list-pagination-nav(:maxPage="$store.getters.maxPage", :route-prefix=" '/top/' ")
      // LIST OF Item IDs
      include _jade/active-id-list 
      // BS Pagination
      story-list-pagination-nav.navbar-fixed-bottom(:maxPage="$store.getters.maxPage", :route-prefix=" `/stories/${$route.params.storyType}/` ")
</template> 

<script>
import { mapGetters } from 'vuex'
//
import { watchList } from '~plugins/api/app'
//
import Spinner from '~components/Spinner.vue'
import StoryListItem from '~components/Story-List-Item.vue'
import StoryListPaginationNav from '~components/Story-List-Pagination-Nav.vue'

export default {
  transition (to, from) {
    if (!from) return 'slide-left'
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  },
  // VALIDATE the route params
  validate ({ params, query }) {
    const result = /^\d+$/.test(params.pageNo)
    return result
  },
  data () {
    return {
      isLoading: true
    }
  },
  // ASSETS
  components: { StoryListItem, StoryListPaginationNav, Spinner },
  // DATA-MODEL
  computed: {
    ...mapGetters([
      'activeIds'
    ])
  },
  methods: {
    setStoryIds () {
      const { dispatch } = this.$store
      const { storyType } = this.$route.params
      //
      this.isLoading = true
      dispatch('FETCH_CURRENT_IDS_FOR_STORY_TYPE', { storyType })
        .then(() => dispatch('ENSURE_ACTIVE_ITEMS'))
        .then(() => (this.isLoading = false))
    }
  },
  watch: {
    $route () {
      this.setStoryIds()
    }
  },
  // LIFE-CYCLE-HOOKS
  beforeMount () {
    const vm = this
    this.setStoryIds()
    const updateStoryListAndEnsureItems = items => {
      vm.$store.commit('UPDATE_STORY_LIST', { items })
      vm.$store.dispatch('ENSURE_ACTIVE_ITEMS')
    }
    //
    vm.watchOff = watchList(this.$route.params.storyType, updateStoryListAndEnsureItems)
  },
  beforeDestroy () {
    this.watchOff()
  }
}
</script>

<style></style>
