<template lang="jade">

li(v-if="item" style="list-style-type:none")
  .panel.panel-primary
    
    // PANEL HEADING
    .panel-heading
      fetch-comments-button.pull-right.glyphicon.glyphicon-menu-hamburger(role="button", 
      data-toggle="collapse", :data-target=" '#item' + item.id ", :itemId="item.id")
    
      // PANEL TITLE
      .panel-title
        // ITEM TITLE AND SCORE
        table.table
          tr
            // ITEM SCORE
            td(style="width:10%")
              span.badge
                i.glyphicon.glyphicon-star
                | &nbsp;
                | {{ item.score }}
            // ITEM TITLE
            td(style="padding-right:20px;")
              h4(v-if="item.title", slot="panel-title") {{ item.title }}
              
        // ADDITIONAL ITEM DATA
        table.table
          tr
            // USER INFO
            td(style="width:20%")
              user-info-modal-button(:userId="item.by")
                span(data-toggle="modal", data-target="#user-info-modal", slot="extend-button")
                  img(:src=" `https://api.adorable.io/avatars/65/${item.by}@hackernews.png` ", height="40", width="40")
                  | &nbsp; {{ item.by }}
            // COMMENTS SUMMARY
            td(style="width:20%")
              fetch-comments-button(data-toggle="collapse", 
              :data-target=" '#item' + item.id ", :itemId="item.id")
                  i.glyphicon.glyphicon-list(slot="extend-button")
                  span(slot="extend-button") &nbsp; {{ item.descendants }} comments
            // ITEM TYPE ( STORY or COMMENT or USER)
            td(style="width:20%")
              i.glyphicon.glyphicon-tag
              | &nbsp; {{ item.type }}
            // Time passed since it was posted...
            td(style="width:20%")
              i.glyphicon.glyphicon-time
              | &nbsp; {{ item.time | fromNow }}
    
    // COLLAPSABLE PANEL  
    div.collapse(:id=" 'item' + item.id")
      // PANEL-BODY
      .panel-body
        .row
          .col-xs-12
            // COMMENT THREAD
            comment-thread(v-if="$store.state.activeItems[item.id] && $store.state.activeItems[item.id].showComments && $store.state.items[item.id].kids" v-for="commentId in item.kids", :commentId="commentId", :key="commentId")
            // WHEN ASYNC CALL IN PROGRESS FOR FETCHING COMMENTS
            spinner(v-if="$store.state.activeItems[item.id] && $store.state.items[item.id].kids && $store.state.activeItems[item.id].fetchingComments", :loading="$store.state.activeItems[item.id].fetchingComments")
            // WHEN NO COMMENTS ARE AVAILABLE
            h4(v-if="!$store.state.items[item.id].kids") No Comments for this item.
      
      // PANEL FOOTER
      .panel-footer
        // Just information about the keys on the Item Object...
        pre.bg-info {{ Object.keys(item).join(', ') }}

</template>

<script>
import Spinner from '~components/Spinner.vue'
import CommentThread from '~components/Comment-Thread.vue'
import FetchCommentsButton from '~components/Fetch-Comments-Button.vue'
import UserInfoModalButton from '~components/User-Info-Modal-Button.vue'

export default {
  props: [ 'itemId' ],
  beforeMount () {
    const { itemId, $store } = this
    //
    $store.commit('ADD_ACTIVE_ITEM', { itemId })
  },
  computed: {
    item () {
      return this.$store.state.items[this.itemId]
    }
  },
  components: { FetchCommentsButton, CommentThread, Spinner, UserInfoModalButton }
}
</script>

<style scoped>
span.glyphicon.glyphicon-menu-hamburger.collapsed {
  transform: rotate(0deg);
}
span.glyphicon.glyphicon-menu-hamburger {
  transform: rotate(-90deg);
  transition: all .5s;
}
</style>
