// firebase.js
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  getAuth
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDQUIN92QHM5etNyG2bhhvkVFKXa9VGZoU",
  authDomain: "piggyway-6908c.firebaseapp.com",
  projectId: "piggyway-6908c",
  storageBucket: "piggyway-6908c.appspot.com",
  messagingSenderId: "456583689838",
  appId: "1:456583689838:web:e2eebf3645db70dbe8d87f",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta Auth y la función de registro
export const auth = getAuth(app);
export const createUserWithEmailAndPassword = firebaseCreateUserWithEmailAndPassword;
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
