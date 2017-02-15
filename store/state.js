export default {
  loadingComments: false,
  activeUserId: null,
  activeItems: {
    /*
    * An item is active if the comments are fetched for it.
    * Once active, it can either be true or false - true if it is being displayed (if the items panel
    is not collapsed)
    * true or false is whether we want to show comment thread for this item or not
    * For ex. we may want to set it to false when the items are being fetched or
    * when the panel is collapsed
    * We may want to set it to true when items have been fetched and the panel for this
    * item is not collapsed.
    */
  },
  route: {},
  activeStoryType: null,
  itemsPerPage: 5,
  items: { /* key:itemId : Item */ },
  users: { /* User */ },
  stories: {
    best: [ /* number */ ],
    top: [],
    new: [],
    show: [],
    ask: [],
    job: []
  }
}
