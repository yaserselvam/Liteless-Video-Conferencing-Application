import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlfaMq8Qew6_Yu6o218s40N9IC-S65bok",
  authDomain: "liteless-23d26.firebaseapp.com",
  projectId: "liteless-23d26",
  storageBucket: "liteless-23d26.appspot.com",
  messagingSenderId: "636341708290",
  appId: "1:636341708290:web:61a63426376d3ef2c7e91b",
  measurementId: "G-9LM3XDZ965",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { auth, app };
