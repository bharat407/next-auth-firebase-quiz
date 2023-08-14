import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAn-kIgpAecTa9XYjscIljtAv6FlPdG1oQ",
  authDomain: "quiz-a8c46.firebaseapp.com",
  projectId: "quiz-a8c46",
  storageBucket: "quiz-a8c46.appspot.com",
  messagingSenderId: "588331565526",
  appId: "1:588331565526:web:f7fb5612e4b8afdc6de477",
  measurementId: "G-RMCZBJX0T2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
