import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAW6XcmpLM3HjdUcz8wVfDhIRGGXu-yjOo",
  authDomain: "eshop-fc057.firebaseapp.com",
  projectId: "eshop-fc057",
  storageBucket: "eshop-fc057.appspot.com",
  messagingSenderId: "856746855721",
  appId: "1:856746855721:web:9dfa6b841aac0f10f0fb38",
  measurementId: "G-GL4DJ5S4EK"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };