// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPcZFgHB2q-rbRn8_YXvLG96exW_j3t_o",
  authDomain: "flashcards-b05aa.firebaseapp.com",
  projectId: "flashcards-b05aa",
  storageBucket: "flashcards-b05aa.appspot.com",
  messagingSenderId: "988091104462",
  appId: "1:988091104462:web:0526c7b2548f637874a49f",
  measurementId: "G-7WFRBFSWNB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
