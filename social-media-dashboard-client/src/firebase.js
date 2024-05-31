import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDRhMFXLWyRHeaKyicffw6xUrmpZhs6EDE",
  authDomain: "nice-pen-345814.firebaseapp.com",
  projectId: "nice-pen-345814",
  storageBucket: "nice-pen-345814.appspot.com",
  messagingSenderId: "765267466203",
  appId: "1:765267466203:web:6f82f260202f2f0b87f9fe",
  measurementId: "G-B0218QF80Q"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
