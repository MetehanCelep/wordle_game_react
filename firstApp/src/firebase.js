// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA6YdrZiyxUf1cD_3W3bygdMQy4vIQPFA",
  authDomain: "wordle-6b003.firebaseapp.com",
  databaseURL: "https://wordle-6b003-default-rtdb.firebaseio.com",
  projectId: "wordle-6b003",
  storageBucket: "wordle-6b003.appspot.com",
  messagingSenderId: "121210622704",
  appId: "1:121210622704:web:57d71a50a937dff0d3a835",
  measurementId: "G-MWR3PZ5KED"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);