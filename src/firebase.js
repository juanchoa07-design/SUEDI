import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyDnqIfwKogFDzjG-ccmhKYsoImWdyeYt2Q",
  authDomain: "suedi-889fc.firebaseapp.com",
  projectId: "suedi-889fc",
  storageBucket: "suedi-889fc.firebasestorage.app",
  messagingSenderId: "341274320829",
  appId: "1:341274320829:web:f7f3551c41e1a328733cd4",
  measurementId: "G-6MC733YWL1",
  databaseURL: "https://suedi-889fc-default-rtdb.firebaseio.com"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getDatabase(app)
