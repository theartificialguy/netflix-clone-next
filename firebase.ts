import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCAWwQVHHna9L7CO9hirqM_BvF3IxUFOIM",
  authDomain: "netflix-clone-25803.firebaseapp.com",
  projectId: "netflix-clone-25803",
  storageBucket: "netflix-clone-25803.appspot.com",
  messagingSenderId: "502860298302",
  appId: "1:502860298302:web:c32264e4546141c1f6b96f",
  measurementId: "G-WBK97FM8Y4"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore()
const auth = getAuth();

export default app;
export { db, auth };
