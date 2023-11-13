
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAmCfb-n-RXyFzB7NcLGAl5AT0AVgSN_KA",
  authDomain: "netflix-clone-e609a.firebaseapp.com",
  projectId: "netflix-clone-e609a",
  storageBucket: "netflix-clone-e609a.appspot.com",
  messagingSenderId: "515077338493",
  appId: "1:515077338493:web:1e3f84a21ca04e10404814",
  measurementId: "G-MR94LNQRM7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);