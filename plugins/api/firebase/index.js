import Firebase from 'firebase/app'
import 'firebase/database'

const config = {
  databaseURL: 'https://hacker-news.firebaseio.com'
}

Firebase.initializeApp(config)
const version = '/v0'
const FirebaseApi = Firebase.database().ref(version)

export default FirebaseApi
