import { fetchByStoryType, fetchItems, fetchUser } from '~plugins/api/app'

export default {
  FETCH_CURRENT_IDS_FOR_STORY_TYPE,
  ENSURE_ACTIVE_ITEMS,
  ENSURE_COMMENTS,
  ENSURE_ITEM_COMMENTS,
  ENSURE_USER,
  //
  FETCH_IDS,
  FETCH_ITEMS,
  FETCH_USER,
  ENSURE_USER_ITEMS
}

async function ENSURE_ITEM_COMMENTS ({ state, commit }, { itemId }) {
  const item = state.items[itemId]
  if (item.kids) {
    const unfetchedIds = item.kids.filter(id => !state.items[id])
    const items = await fetchItems(unfetchedIds)
    //
    commit('SET_ITEMS', { items })
  }
}

async function ENSURE_USER ({ state, commit }, { userId }) {
  if (!state.users[userId]) {
    const user = await fetchUser(userId)
    commit('SET_USER', { user })
  }
}

function ENSURE_COMMENTS (context, { itemId }) {
  const item = context.state.items[itemId]
  if (item.kids) {
    const unFetchedItemKids = item.kids.filter(id => !context.state.items[id])
    return fetchItems(unFetchedItemKids)
      .then(items => {
        context.commit('SET_ITEMS', { items })
        return Promise.all(items.map(item => context.dispatch('ENSURE_COMMENTS', { itemId: item.id })))
      })
  }
}

function FETCH_CURRENT_IDS_FOR_STORY_TYPE ({ commit, state }, { storyType }) {
  return fetchByStoryType(state.route.params.storyType)
    .then(ids => commit('SET_ACTIVE_STORY_TYPE_AND_IDS_AND_PAGENO', { storyType, ids }))
}

function FETCH_IDS ({ commit }, { storyType }) {
  return fetchByStoryType(storyType)
    .then(ids => commit('SET_ACTIVE_STORY_TYPE_AND_IDS', { storyType, ids }))
}

function ENSURE_ACTIVE_ITEMS ({ state, dispatch, getters }) {
  const activeIds = getters.activeIds
  const ids = activeIds.filter(id => !state.items[id])
  return dispatch('FETCH_ITEMS', { ids })
}

// this was created for comments, since ENSURE_ACTIVE_ITEMS analyzes which story is active and based on that pull those particular items.  FETCH_ITEMS is a general function.  Even ENSURE_AC.. works with it.
function FETCH_ITEMS ({ commit, state }, { ids }) {
  const unfetchedIds = ids.filter(id => !state.items[id])
  //
  return fetchItems(unfetchedIds)
    .then(items => {
      unfetchedIds.forEach((id, index) => {
        if (!items[index]) commit('REMOVE_ITEM_FROM_LIST', { id })
      })
      //
      items = items.filter(item => item)
      commit('SET_ITEMS', { items })
    })
}

// we have to keep this seperate from FETCH_ITEMS becuase fetchItems is for items >> 'item/:itemId' whereas fetchuser is for users >> 'user/:userId'
// also users are alphnumeric whereas items are numeric
function FETCH_USER ({ state, commit }, { userId }) {
  if (state.users[userId]) return Promise.resolve(true)
  //
  return fetchUser(userId)
    .then(user => commit('SET_USER', { user }))
}

function ENSURE_USER_ITEMS ({ state, dispatch }) {
  // based on the "userId" and "pageNo" in the route, we want to fetch the items from the total posts of the user
  const { userId, pageNo } = state.route.params
  const submitted = state.users[userId].submitted ? state.users[userId].submitted : []
  //
  const startSlice = (pageNo - 1) * state.itemsPerPage
  const endSlice = pageNo * state.itemsPerPage
  //
  const ids = submitted.slice(startSlice, endSlice)
  //
  return dispatch('FETCH_ITEMS', { ids })
}
