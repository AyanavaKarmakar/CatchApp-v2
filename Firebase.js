/**
 * @see https://docs.expo.dev/guides/using-firebase/
 */
import * as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCHVyXsveLBH6o1bnJ31RJ28304rAaUT-E',
  authDomain: 'signal-clone-af25b.firebaseapp.com',
  projectId: 'signal-clone-af25b',
  storageBucket: 'signal-clone-af25b.appspot.com',
  messagingSenderId: '254420441430',
  appId: '1:254420441430:web:89edb275fb7961871a5ef7',
}

let firebaseApp

if (firebase.apps.length === 0) {
  firebaseApp = firebase.initializeApp(firebaseConfig)
} else {
  firebaseApp = firebase.app()
}

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth }
