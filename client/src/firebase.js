// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "urban-nest-f8856.firebaseapp.com",
  projectId: "urban-nest-f8856",
  storageBucket: "urban-nest-f8856.appspot.com",
  messagingSenderId: "47555568178",
  appId: "1:47555568178:web:8a99a91e14cef5418c522b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);