import { initializeApp } from 'firebase/app';
import {getAuth,GoogleAuthProvider}from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyD5dzUNlXR1b7oFj523utB_eZymWX3X0wY",
//   authDomain: "ftms-ca85b.firebaseapp.com",
//   databaseURL: "https://ftms-ca85b.firebaseio.com",
//   projectId: "ftms-ca85b",
//   storageBucket: "ftms-ca85b.appspot.com",
//   messagingSenderId: "26422956124",
//   appId: "1:26422956124:web:5102d14c30573ff2",
//   measurementId: "G-P8F4K1W4RZ"
// };

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};



const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const googleProvider=new GoogleAuthProvider();
const db = getFirestore(app); 


export { app, db,auth,googleProvider};