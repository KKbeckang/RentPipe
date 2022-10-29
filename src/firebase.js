// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDacH4kGWt0AyVRdT2MAmY1kalP-tOQ8V4",
  authDomain: "rentpipe-d4b1c.firebaseapp.com",
  projectId: "rentpipe-d4b1c",
  storageBucket: "rentpipe-d4b1c.appspot.com",
  messagingSenderId: "51676877914",
  appId: "1:51676877914:web:c1befa78eab9b4a4abb463"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()