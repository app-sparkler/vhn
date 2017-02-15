import FirebaseApi from '../firebase'

const fetch = child => {
  return new Promise(fetchPromiseHandler)
  //
  function fetchPromiseHandler (resolve, reject) {
    const handleResolve = snapshot => resolve(snapshot.val())
    //
    FirebaseApi
      .child(child)
      .once('value', handleResolve, reject)
  }
}

const fetchItems = ids => {
  const promisesCollection = ids.map(id => fetch(`item/${id}`))
  //
  return Promise.all(promisesCollection)
}

const fetchByStoryType = storyType => {
  return fetch(`${storyType}stories`)
}

const fetchUser = userId => {
  return fetch(`user/${userId}`)
}

async function watchItem (itemId, cb) {
  let firstRequest = true
  //
  const apiSwitch = FirebaseApi
    .child(itemId)
  //
  apiSwitch
    .on('value', snapshot => {
      if (firstRequest) firstRequest = false
      else cb(snapshot.val())
    })
  //
  return function () {
    apiSwitch.off()
  }
}

const watchList = (storyType, cb) => {
  let firstRequest = true
  //
  const apiSwitch = FirebaseApi
    .child(`${storyType}stories`)
  //
  apiSwitch
    .on('value', snapshot => {
      if (firstRequest) firstRequest = false
      else cb(snapshot.val())
    })
  //
  return function () {
    apiSwitch.off()
  }
}

export {fetchItems, fetchByStoryType, fetchUser, watchList, watchItem}
