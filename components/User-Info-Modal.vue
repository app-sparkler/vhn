<template lang="jade">
#user-info-modal.modal
  .modal-dialog(tabindex="-1", role="dialog")
    .modal-content(role="document")
      // MODAL HEADER
      .modal-header
        span.pull-right(data-dismiss="modal", role="button") &#x274C;
        // MODAL TITLE
        .modal-title
          h4(v-if="user")
            img.img-circle(:src=" `https://api.adorable.io/avatars/65/${user.id}@hackernews.png` ") 
            | &nbsp; {{ user.id }}
      // MODAL BODY
      .modal-body
        div(v-if="user")
          // ABOUT USER
          blockquote(v-show="user.about") 
            p(v-html="user.about")
            footer {{ user.id }}
          // USER INFO - POSTS 
          table.table
            tr
              // USER KARMA
              td(style="width:20%")
                span(role="button", data-toggle="tooltip", data-placement="bottom", :title=" `${user.id}'s karma...` ")
                  i.glyphicon.glyphicon-star
                  | &nbsp; {{ user.karma}}
              // USER POSTS
              td(style="width:20%")
                span(role="button", data-toggle="tooltip", data-placement="bottom", :title="`# of posts submitted by ${user.id}`")
                  i.glyphicon.glyphicon-pencil
                  | &nbsp; {{ user.submitted.length }}
        
        spinner(v-else, :loading="true")
      
      // MODAL FOOTER
      .modal-footer
        button.btn.btn-info(data-dismiss="modal") Done
</template>

<script>
import Vue from 'vue'
import $ from 'jquery'
import Spinner from '~components/Spinner.vue'

export default {
  components: { Spinner },
  computed: {
    user () {
      const { users, activeUserId } = this.$store.state
      //
      return users[activeUserId]
    }
  },
  watch: {
    user (newVal) {
      if (newVal) {
        Vue.nextTick(() => {
          $('[data-toggle="tooltip"]').tooltip()
        }, 1000)
      }
    }
  }
}
</script>
