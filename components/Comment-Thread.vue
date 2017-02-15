<template lang="jade">
// MEDIA OBJECT
.media(v-if="comment")
  // MEDIA-LEFT
  .media-left.hidden-xs
    // PARENT COMMENT AVATAR
    user-info-modal-button(:userId="comment.by", data-toggle="modal", data-target="#user-info-modal")
      img.img-circle.media-object(slot="extend-button", :src=" `https://api.adorable.io/avatars/65/${comment.by}@hackernews.png` ")
  
  // MEDIA-BODY
  .media-body
    // PARENT COMMENT HEADING
    h4.bg-info(style="padding:10px;margin-top:0")
      span(v-if="comment.kids")
        i.glyphicon.glyphicon-menu-hamburger.collapsed(role="button", data-toggle="collapse", 
        :data-target=" '#item-' + comment.id ", @click="fetchSubComments")
        | &nbsp; &nbsp; &nbsp;
        | Comment thread by
      span(v-else) Comment by
      // COMMENT BY (USERID)
      user-info-modal-button(:userId="comment.by", data-toggle="modal", data-target="#user-info-modal")
        span(slot="extend-button") &nbsp {{ comment.by }}

    // PARENT COMMENT TEXT
    p(v-html="comment.text", v-if="comment.text")
    samp.text-danger(v-else) 
      i.glyphicon.glyphicon-exclamation-sign
      | &nbsp; This comment was deleted!
    
    // KIDS (COLLAPSED INITIALLY - are fetched when the trigger is clicked)
    .collapse(:id=" 'item-' + comment.id ", v-if="comment.kids")
      comment-thread(v-for="kidId in comment.kids", :commentId="kidId")

</template>

<script>
import UserInfoModalButton from '~components/User-Info-Modal-Button.vue'

export default {
  name: 'comment-thread',
  props: [ 'commentId' ],
  beforeMount () {
    this.$store.commit('ADD_ACTIVE_ITEM', { itemId: this.commentId })
  },
  computed: {
    comment () {
      return this.$store.state.items[this.commentId]
    }
  },
  methods: {
    fetchSubComments () {
      const itemId = this.comment.id
      this.$store.dispatch('ENSURE_ITEM_COMMENTS', { itemId })
    }
  },
  components: { UserInfoModalButton }
}
</script>

<style scoped>
span > i.glyphicon.glyphicon-menu-hamburger.collapsed {
  transform: rotate(0deg);
  opacity: 1;
}
span > i.glyphicon.glyphicon-menu-hamburger {
  transform: rotate(90deg);
  opacity: .5;
  transition: all .25s;
}
</style>
