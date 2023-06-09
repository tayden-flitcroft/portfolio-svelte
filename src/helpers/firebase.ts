// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from 'firebase/analytics'
import { connectDatabaseEmulator, get, getDatabase, ref } from 'firebase/database'
import { connectStorageEmulator, getStorage } from 'firebase/storage'
import type { ANALYTICS_EVENT_NAME } from './constants'

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: 'portfolio-svelte-2198.firebaseapp.com',
	databaseURL: 'https://portfolio-svelte-2198.firebaseio.com',
	projectId: 'portfolio-svelte-2198',
	storageBucket: 'portfolio-svelte-2198.appspot.com',
	messagingSenderId: '338745272218',
	appId: '1:338745272218:web:a13d2b7c011b1def307c23',
	measurementId: 'G-BFRGMWB5NX'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getDatabase(app)
const storage = getStorage(app)

if (location.hostname.includes('dev.taydenflitcroft.com')) {
	connectDatabaseEmulator(db, 'localhost', 9000)
	connectStorageEmulator(storage, 'localhost', 9199)
} 

export const fireEvent = (eventName: ANALYTICS_EVENT_NAME, data = {}): void => {
	logEvent(analytics, eventName , data)
}

export const getContactInformation = async () => {
	const dbRef = ref(db, 'contactInformation')
	return get(dbRef).then(snapshot => {
		return snapshot.val()
	})
}

export const getAboutMeContent = async () => {
	const dbRef = ref(db, 'aboutMeContent')
	return get(dbRef).then(snapshot => {
		return snapshot.val()
	})
}