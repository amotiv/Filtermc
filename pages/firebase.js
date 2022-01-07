import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"
import {getAuth} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYMBgkh37TW4rarZoO48Q1zt2Kkw1J9A4",
  authDomain: "filtermc-f983e.firebaseapp.com",
  projectId: "filtermc-f983e",
  storageBucket: "filtermc-f983e.appspot.com",
  messagingSenderId: "110941134488",
  appId: "1:110941134488:web:8e524a5a7f07c7f6db7aed",
  measurementId: "G-LTTWKEDCX7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth();
export {storage,db,auth,app};