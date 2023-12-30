// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCR3_6c1Cx9a45at-o1TinaQKIYsZRUtvQ",
  authDomain: "nutrition-app-575b9.firebaseapp.com",
  projectId: "nutrition-app-575b9",
  storageBucket: "nutrition-app-575b9.appspot.com",
  messagingSenderId: "633997639993",
  appId: "1:633997639993:web:4f1907fe91e241882e68e8",
  measurementId: "G-NKCCY9M6M4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);