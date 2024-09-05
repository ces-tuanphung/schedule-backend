import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { setLogLevel } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCdQYanhnpQ9IKBFJL2W2AAfUol2LDbm20",
  authDomain: "express-react-firebase.firebaseapp.com",
  databaseURL: "https://express-react-firebase-default-rtdb.asia-southeast1.firebasedatabase.app/", // Add Realtime Database URL
  projectId: "express-react-firebase",
  storageBucket: "express-react-firebase.appspot.com",
  messagingSenderId: "405577617829",
  appId: "1:405577617829:web:bc082ed9c90b292f8f984c",
  measurementId: "G-8N7RW99CTZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const db = getDatabase(app);
const scheduleRef = ref(db, "schedules"); // Reference to the "schedules" node in Realtime Database

setLogLevel("error");

export { db, scheduleRef };
