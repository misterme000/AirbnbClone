// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1AQ7CNM0c1LQ-mgdA11Mv1G3aD978i8Q",
  authDomain: "testabc-69058.firebaseapp.com",
  projectId: "testabc-69058",
  storageBucket: "testabc-69058.appspot.com",
  messagingSenderId: "342256128627",
  appId: "1:342256128627:web:473fec263d1b906f7c5006",
  measurementId: "G-F7LYQP7R1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);