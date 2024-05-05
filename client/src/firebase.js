// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-chat-message.firebaseapp.com",
  projectId: "mern-chat-message",
  storageBucket: "mern-chat-message.appspot.com",
  messagingSenderId: "52857196391",
  appId: "1:52857196391:web:4cff9f18f4cfb3a7e169c2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
