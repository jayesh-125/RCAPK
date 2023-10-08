import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxvmxok-irVoHsegVzN_9CczTYZAaADKk",
  authDomain: "chat-app-e9b21.firebaseapp.com",
  databaseURL: "https://chat-app-e9b21-default-rtdb.firebaseio.com",
  projectId: "chat-app-e9b21",
  storageBucket: "chat-app-e9b21.appspot.com",
  messagingSenderId: "326263751641",
  appId: "1:326263751641:web:172392fcf042b7966d8fc8",
  measurementId: "G-FQ0NM34RK1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
