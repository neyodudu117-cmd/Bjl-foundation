import { auth, db, storage } from '../lib/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const COLLECTION_NAME = 'content';

export const firebaseService = {
  // Auth
  login: async (email: string, pass: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      return { success: true, user: userCredential.user };
    } catch (error: any) {
      console.error("Firebase login error:", error);
      return { success: false, message: error.message };
    }
  },

  logout: async () => {
    await signOut(auth);
  },

  onAuthStateChanged: (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
  },

  // Content
  getContent: async (key: string) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, key);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().value;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching ${key} from Firebase:`, error);
      return null;
    }
  },

  saveContent: async (key: string, value: any) => {
    try {
      await setDoc(doc(db, COLLECTION_NAME, key), { value });
      return true;
    } catch (error) {
      console.error(`Error saving ${key} to Firebase:`, error);
      throw error;
    }
  },

  // Storage
  uploadFile: async (file: File) => {
    try {
      const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading file to Firebase:", error);
      throw error;
    }
  }
};
