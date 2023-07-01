import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYzYQaYsQh-CZuR3wkM4xhdVrLPdpMrJY",
  authDomain: "movie-b7ddf.firebaseapp.com",
  projectId: "movie-b7ddf",
  storageBucket: "movie-b7ddf.appspot.com",
  messagingSenderId: "953195841131",
  appId: "1:953195841131:web:acbbf90f8a34dbc5d0932e",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
