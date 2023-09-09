import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWhym0NJ1ZazfilScVM5nZ_jBfFLUQ2PE",
  authDomain: "pokemonmessage-efcbc.firebaseapp.com",
  projectId: "pokemonmessage-efcbc",
  storageBucket: "pokemonmessage-efcbc.appspot.com",
  messagingSenderId: "660646392035",
  appId: "1:660646392035:web:5d4cf51d0f248e72e1d5d6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { auth, db, provider };
