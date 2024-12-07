// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYs-S5ueYiEqxxMLQOniFJOwIq8ZgZeUo",
  authDomain: "the-alter-office-93594.firebaseapp.com",
  projectId: "the-alter-office-93594",
  storageBucket: "the-alter-office-93594.firebasestorage.app",
  messagingSenderId: "899919916800",
  appId: "1:899919916800:web:52f80e29f85a2765494de5",
  measurementId: "G-EG1WV2JQ2Z"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();
  
// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
    prompt : "select_account "
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
// const analytics = getAnalytics(app);
export const firestore = getFirestore(firebaseApp);