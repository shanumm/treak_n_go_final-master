import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC32D98wmZ9SJOaQCL8tZQsDNhW1NPVtv4",
  authDomain: "trekngo-f4e81.firebaseapp.com",
  projectId: "trekngo-f4e81",
  storageBucket: "trekngo-f4e81.appspot.com",
  messagingSenderId: "38584174878",
  appId: "1:38584174878:web:e852fa222d05c0ab9c210f",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();
export { db, auth, storage };
