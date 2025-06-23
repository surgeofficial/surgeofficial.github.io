// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1IB4McFZfaDbnda_K2phwtSRcHC8qEtg",
  authDomain: "surgelogins-4a01c.firebaseapp.com",
  projectId: "surgelogins-4a01c",
  storageBucket: "surgelogins-4a01c.firebasestorage.app",
  messagingSenderId: "248408418130",
  appId: "1:248408418130:web:19fb519f1983436f3c7c8b",
  measurementId: "G-HV3D57E691"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };