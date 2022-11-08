// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgvB5ewU0ZCQW9BePsQh_1P_N7SO6cTEU",
  authDomain: "auth-test-35b78.firebaseapp.com",
  projectId: "auth-test-35b78",
  storageBucket: "auth-test-35b78.appspot.com",
  messagingSenderId: "917231495190",
  appId: "1:917231495190:web:2b7ab816e970ae00e52d37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {auth, db}