import React from 'react';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

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
  } catch (err) {
    console.error(`Failed to fetch ${key} from Firestore`, err);
  }

  return defaultValue;
};

export const saveContent = async <T>(key: string, data: T): Promise<void> => {
  try {
    const docRef = doc(db, 'content', key);
    // Firestore documents must be objects. If data is an array, wrap it.
    const payload = Array.isArray(data) ? { items: data } : data;
    await setDoc(docRef, payload as any);
  } catch (err) {
    console.error(`Failed to save ${key} to Firestore`, err);
    throw err;
  }
};

export const useContent = <T>(key: string, defaultValue: T): T => {
  const [content, setContent] = React.useState<T>(defaultValue);

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
      console.error(`Failed to subscribe to ${key}`, error);
    });

    return () => unsubscribe();
  }, [key]); // Remove defaultValue from dependency array to avoid infinite loops if defaultValue is an object literal

  return content;
};
