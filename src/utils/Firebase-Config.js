import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  // query,
  // getDocs,
  // collection,
  // where,
  // addDoc,
} from "firebase/firestore";
const firebaseConfig = {
  // Firebase Setup Here
  apiKey: "AIzaSyCxtkkk8ZRJaS9Dz7uS6uO3tQ2nnsK6uY4",
  authDomain: "reactprojects-55ab1.firebaseapp.com",
  databaseURL: "https://reactprojects-55ab1-default-rtdb.firebaseio.com",
  projectId: "reactprojects-55ab1",
  storageBucket: "reactprojects-55ab1.appspot.com",
  messagingSenderId: "209755263838",
  appId: "1:209755263838:web:753ca54342f870704775cf",
  measurementId: "G-ZEQYJGY2ZL",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const authApp = getAuth(app);
export const db = getFirestore(app)
export const analytics = getAnalytics(app);
// Firebase Setup End here
