import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAcfpq4I6L_9AoI2vrk5VIGHmiO7G-lNEE",
	authDomain: "fir-72f00.firebaseapp.com",
	projectId: "fir-72f00",
	storageBucket: "fir-72f00.appspot.com",
	messagingSenderId: "809093230794",
	appId: "1:809093230794:web:6e58f1530e9fe3d81a8433",
	measurementId: "G-Y6LY6KRSGT",
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();

export default db;