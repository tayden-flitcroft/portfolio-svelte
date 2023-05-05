// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from 'firebase/analytics'
import type { ANALYTICS_EVENT_NAME } from './constants'

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: 'portfolio-svelte-2198.firebaseapp.com',
	projectId: 'portfolio-svelte-2198',
	storageBucket: 'portfolio-svelte-2198.appspot.com',
	messagingSenderId: '338745272218',
	appId: '1:338745272218:web:a13d2b7c011b1def307c23',
	measurementId: 'G-BFRGMWB5NX'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)


export const fireEvent = (eventName: ANALYTICS_EVENT_NAME, data = {}): void => {
	logEvent(analytics, eventName , data)
}