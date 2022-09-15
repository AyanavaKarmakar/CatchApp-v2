/**
 * ! Using `"firebase": "^9.6.11",` instead of `"firebase": "^9.9.4"`
 * @see https://github.com/facebook/metro/issues/535
 */

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

/**
 * web app's Firebase configuration
 */
const firebaseConfig = {
  apiKey: 'AIzaSyCHVyXsveLBH6o1bnJ31RJ28304rAaUT-E',
  authDomain: 'signal-clone-af25b.firebaseapp.com',
  projectId: 'signal-clone-af25b',
  storageBucket: 'signal-clone-af25b.appspot.com',
  messagingSenderId: '254420441430',
  appId: '1:254420441430:web:89edb275fb7961871a5ef7',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { db, auth }
