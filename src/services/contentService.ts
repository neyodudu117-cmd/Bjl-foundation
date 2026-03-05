import React from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const fetchContent = async <T>(key: string, defaultValue: T): Promise<T> => {
  try {
    const docRef = doc(db, 'content', key);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as T;
    }
  } catch (err) {
    console.error(`Failed to fetch ${key} from Firestore`, err);
  }

  return defaultValue;
};

export const saveContent = async <T>(key: string, data: T): Promise<void> => {
  try {
    const docRef = doc(db, 'content', key);
    await setDoc(docRef, data as any);
  } catch (err) {
    console.error(`Failed to save ${key} to Firestore`, err);
    throw err;
  }
};

export const useContent = <T>(key: string, defaultValue: T): T => {
  const [content, setContent] = React.useState<T>(defaultValue);

  React.useEffect(() => {
    fetchContent<T>(key, defaultValue).then(setContent);
  }, [key]);

  return content;
};
