import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQKNv4EhfkgKkUPDYeo48xkIpF0r7UviI",
  authDomain: "bjl-foundation.firebaseapp.com",
  projectId: "bjl-foundation",
  storageBucket: "bjl-foundation.firebasestorage.app",
  messagingSenderId: "1008594512135",
  appId: "1:1008594512135:web:665ad2bffe28476f717da2",
  measurementId: "G-QDKD5S3RHN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, analytics, db, auth, storage };
