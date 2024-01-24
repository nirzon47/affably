// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// import { getAnalytics } from 'firebase/analytics'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: 'affably-cdc54',
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: '668429352753',
	appId: '1:668429352753:web:91576c7139312d228fba10',
	measurementId: 'G-NZ4K67KG1Y',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
const auth = getAuth(app)
