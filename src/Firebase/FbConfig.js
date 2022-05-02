import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAoX54yuVDB7fYuktJJ43XLE9gAAJ1wckQ",
  authDomain: "sharewithworld-a63a4.firebaseapp.com",
  projectId: "sharewithworld-a63a4",
  storageBucket: "sharewithworld-a63a4.appspot.com",
  messagingSenderId: "684882426427",
  appId: "1:684882426427:web:41da89418ba0676844ba1e",
  measurementId: "G-ZN99G55EH7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
