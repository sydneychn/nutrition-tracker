import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgoubYy2uBtpBt4xmyvyl6N3p0T2MFFvA",
  authDomain: "nutrition-tracker-44426.firebaseapp.com",
  projectId: "nutrition-tracker-44426",
  storageBucket: "nutrition-tracker-44426.appspot.com",
  messagingSenderId: "772080871279",
  appId: "1:772080871279:web:e5ca261dec6be7dc1dea9a"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
initializeAuth(FIREBASE_APP, {persistence: getReactNativePersistence(ReactNativeAsyncStorage)});
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
