import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC32D98wmZ9SJOaQCL8tZQsDNhW1NPVtv4",
  authDomain: "trekngo-f4e81.firebaseapp.com",
  projectId: "trekngo-f4e81",
  storageBucket: "trekngo-f4e81.appspot.com",
  messagingSenderId: "38584174878",
  appId: "1:38584174878:web:e852fa222d05c0ab9c210f",
  measurementId: "G-VTRTV77YFG",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();
const analytics = getAnalytics(firebaseApp);
export { db, auth, storage };
