// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const { initializeApp } = require('firebase/app');
const { getFirestore, collection } = require('firebase/firestore');
const {setLogLevel} = require('firebase/app')

const firebaseConfig = {
  apiKey: "AIzaSyCdQYanhnpQ9IKBFJL2W2AAfUol2LDbm20",
  authDomain: "express-react-firebase.firebaseapp.com",
  projectId: "express-react-firebase",
  storageBucket: "express-react-firebase.appspot.com",
  messagingSenderId: "405577617829",
  appId: "1:405577617829:web:bc082ed9c90b292f8f984c",
  measurementId: "G-8N7RW99CTZ"
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const Schedule = collection(db, 'schedules');
setLogLevel('error')

module.exports = { db, Schedule };