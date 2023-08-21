import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "Domain",
  projectId: "Your Project_ID",
  storageBucket: "Bucket_KEY",
  messagingSenderId: "ID",
  appId: "APP_ID",
  measurementId: "M_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
