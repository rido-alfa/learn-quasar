import firebase from 'firebase'

import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyB1fUNFnaaRrlRtTMVGIVZ1IgGUqGyM4tE',
  authDomain: 'learn-quasar.firebaseapp.com',
  projectId: 'learn-quasar',
  storageBucket: 'learn-quasar.appspot.com',
  messagingSenderId: '582753854611',
  appId: '1:582753854611:web:a46805bd6c65d9b5691966'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebaseApp.auth()
const db = firebase.firestore()

export { firebaseAuth, db }
