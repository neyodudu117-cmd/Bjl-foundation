import React from 'react';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../lib/firebase';

export const fetchContent = async <T>(key: string, defaultValue: T): Promise<T> => {
  try {
    const docRef = doc(db, 'content', key);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      // If we expect an array but got an object with 'items', unwrap it
      if (Array.isArray(defaultValue) && data.items && Array.isArray(data.items)) {
        return data.items as T;
      }
      
      // If defaultValue is an object, merge data with it to ensure no missing keys
      if (defaultValue && typeof defaultValue === 'object' && !Array.isArray(defaultValue)) {
        return { ...defaultValue, ...data } as T;
      }

      return data as T;
    }
  } catch (err: any) {
    if (err.code === 'permission-denied') {
      console.warn(`Permission denied for ${key}. Using default value. Check Firestore rules.`);
    } else {
      console.error(`Failed to fetch ${key} from Firestore`, err);
    }
  }

  return defaultValue;
};

export const saveContent = async <T>(key: string, data: T): Promise<void> => {
  try {
    console.log(`Attempting to save ${key} to Firestore...`);
    const docRef = doc(db, 'content', key);
    // Firestore documents must be objects. If data is an array, wrap it.
    const payload = Array.isArray(data) ? { items: data } : data;
    // Sanitize payload to remove undefined values which Firestore rejects
    const sanitizedPayload = JSON.parse(JSON.stringify(payload));
    await setDoc(docRef, sanitizedPayload);
    console.log(`Successfully saved ${key} to Firestore.`);
  } catch (err: any) {
    console.error(`Failed to save ${key} to Firestore`, err);
    if (err.code === 'permission-denied') {
      console.error(`Permission denied for saving ${key}. Check Firestore rules.`);
    }
    throw err;
  }
};

export const useContent = <T>(key: string, defaultValue: T): T => {
  const [content, setContent] = React.useState<T>(defaultValue);
  const [user, setUser] = React.useState(auth.currentUser);

  React.useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribeAuth();
  }, []);

  React.useEffect(() => {
    const docRef = doc(db, 'content', key);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        // If we expect an array but got an object with 'items', unwrap it
        if (Array.isArray(defaultValue) && data.items && Array.isArray(data.items)) {
          setContent(data.items as T);
        } else {
          setContent(data as T);
        }
      } else {
        setContent(defaultValue);
      }
    }, (error) => {
      if (error.code === 'permission-denied') {
        // Suppress loud error for permission denied, as it might be expected for public users
        // depending on rules. We just stick to default value.
        console.warn(`Permission denied for ${key}. Using default value.`);
      } else {
        console.error(`Failed to subscribe to ${key}`, error);
      }
    });

    return () => unsubscribe();
  }, [key, user]); // Re-subscribe when user changes

  return content;
};
