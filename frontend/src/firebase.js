// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhBo3rjq72O2znjyIv9rzabZaEkvYXt4Y",
  authDomain: "lab4-cc26a.firebaseapp.com",
  projectId: "lab4-cc26a",
  storageBucket: "lab4-cc26a.appspot.com",
  messagingSenderId: "625888967594",
  appId: "1:625888967594:web:3df9c06cf67c9f3eac09d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app);