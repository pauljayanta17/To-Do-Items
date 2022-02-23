import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
} from "firebase/firestore";

const apikey = process.env.REACT_APP_WEBAPPAPIKEY;
const appId = process.env.REACT_APP_APPID;
const dbUrl = process.env.REACT_APP_DBURL;
const firebaseConfig = {
  // Firebase Setup Here
  apiKey: apikey,
  authDomain: "reactprojects-55ab1.firebaseapp.com",
  databaseURL: dbUrl,
  projectId: "reactprojects-55ab1",
  storageBucket: "reactprojects-55ab1.appspot.com",
  messagingSenderId: "209755263838",
  appId: appId,
  measurementId: "G-ZEQYJGY2ZL",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const authApp = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
// Firebase Setup End here
