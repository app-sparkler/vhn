import Vue from 'vue'
// import Immutable from 'immutable'

export default {
  SET_ACTIVE_STORY_TYPE_AND_IDS_AND_PAGENO,
  SET_ITEMS,
  LOADING_COMMENTS,
  SET_ACTIVE_USERID,
  UPDATE_STORY_LIST,
  //
  ADD_ACTIVE_ITEM,
  HIDE_COMMENTS,
  SHOW_COMMENTS,
  SET_FETCH_COMMENTS_STATUS,
  ADD_TO_ACTIVE_ITEMS,
  ACTIVATE_ITEM,
  DEACTIVATE_ITEM,
  REMOVE_ITEM_FROM_LIST,
  //
  SET_ACTIVE_STORY_TYPE_AND_IDS,
  SET_USER
}

function SET_ACTIVE_USERID (state, { userId }) {
  state.activeUserId = userId
}

function ADD_ACTIVE_ITEM (state, { itemId }) {
  Vue.set(state.activeItems, itemId, {
    showComments: false,
    fetchingComments: false
  })
}

function SET_FETCH_COMMENTS_STATUS (state, { itemId, status }) {
  state.activeItems[itemId].fetchingComments = status
}

function ADD_TO_ACTIVE_ITEMS (state, { itemId }) {
  Vue.set(state.activeItems, itemId, true)
}

function SHOW_COMMENTS (state, { itemId }) {
  state.activeItems[itemId].showComments = true
}

function HIDE_COMMENTS (state, { itemId }) {
  state.activeItems[itemId].showComments = false
}

function ACTIVATE_ITEM (state, { itemId }) {
  state.activeItems[itemId] = true
}

function DEACTIVATE_ITEM (state, { itemId }) {
  state.activeItems[itemId] = false
}

function LOADING_COMMENTS (state, isLoading) {
  state.loadingComments = isLoading
}

function UPDATE_STORY_LIST (state, { items }) {
  const { stories, activeStoryType } = state
  stories[activeStoryType] = items
}

function REMOVE_ITEM_FROM_LIST (state, { id }) {
  // If an ID doesn't fetch a corresponding item, lets remove it from the list
  const { stories, activeStoryType } = state
  const idIndex = stories[activeStoryType].indexOf(id)
  stories[activeStoryType].splice(idIndex, 1)
}

function SET_ACTIVE_STORY_TYPE_AND_IDS_AND_PAGENO (state, { storyType, ids }) {
  state.activeStoryType = storyType
  state.stories[storyType] = ids.filter(id => !!id)
}

function SET_ACTIVE_STORY_TYPE_AND_IDS (state, { storyType, ids }) {
  state.activeStoryType = storyType
  state.stories[storyType] = ids.filter(id => !!id)
}

function SET_ITEMS (state, { items }) {
  items = items
    .filter(item => !!item)
  items.forEach(item => (Vue.set(state.items, item.id, item)))
}

function SET_USER (state, { user }) {
  if (user.id) Vue.set(state.users, user.id, user)
}
