const getters = {
  activeIds,
  activeItems,
  maxPage,
  items,
  userData,
  userMaxPage
}

export default getters

function activeIds (state, getters) {
  const { pageNo } = state.route.params || { pageNo: 1 }
  const { activeStoryType, stories, itemsPerPage } = state
  //
  const activeStoryIds = stories[activeStoryType] || []
  const startSlice = (pageNo - 1) * itemsPerPage
  const endSlice = (pageNo * itemsPerPage)
  const activeIds = activeStoryIds.slice(startSlice, endSlice)
  //
  return activeIds
}

function activeItems (state, getters) {
  let activeItems = getters.activeIds.map(id => state.items[id])
  if (!activeItems) []
  activeItems = activeItems.filter(item => !!item)
  return activeItems
}

function maxPage (state, getters) {
  const {activeStoryType, itemsPerPage, stories} = state
  if (!activeStoryType) return null
  const maxPage = Math.ceil((stories[activeStoryType].length || itemsPerPage) / itemsPerPage)
  //
  return maxPage
}

function items (state, getters) {
  return state.items
}

function userData (state, getters) {
  const { userId, pageNo } = state.route.params
  const { users, itemsPerPage, items } = state
  //
  const userData = {
    user: users[userId],
    displayed: []
  }
  const startSlice = (pageNo - 1) * itemsPerPage
  const endSlice = pageNo * itemsPerPage
  // we try since some users might not have submitted posts...
  try {
    let displayedPosts = userData.user.submitted.slice(startSlice, endSlice)
    displayedPosts = displayedPosts.map(id => items[id])
    userData.displayed = displayedPosts
  } catch (err) { }
  //
  return userData
}

function userMaxPage (state, getters) {
  let userMaxPage = null
  const { userId } = state.route.params
  const { users, itemsPerPage } = state
  const user = users[userId] || { }
  userMaxPage = user.submitted ? Math.ceil(user.submitted.length / itemsPerPage) : null
  //
  return userMaxPage
}
