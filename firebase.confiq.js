import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";
  import {  
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
GoogleAuthProvider,
signInWithPopup,
signOut,
sendEmailVerification,
 sendPasswordResetEmail,
onAuthStateChanged,

  }  from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";
 import {
getFirestore,
setDoc,
 doc,
 serverTimestamp,
   getDoc,
   onSnapshot
 } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";


  const firebaseConfig = {
    apiKey: "AIzaSyCwaItLb0sMV9W5NtN__a8676WLCawHL2c",
    authDomain: "fir-24f46.firebaseapp.com",
    projectId: "fir-24f46",
    storageBucket: "fir-24f46.firebasestorage.app",
    messagingSenderId: "1043413278953",
    appId: "1:1043413278953:web:5425f63a0d1aac8a57d078",
    measurementId: "G-EH28XE1W98"
  };

  const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


  export{
auth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
GoogleAuthProvider,
signInWithPopup,
signOut,
sendEmailVerification,
 sendPasswordResetEmail,
 getFirestore,
 setDoc,
 doc,
getDoc,
 serverTimestamp,
 onAuthStateChanged,
  db,
  onSnapshot
  }