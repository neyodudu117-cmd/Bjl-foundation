import React from 'react';
import { PROGRAMS, STATS, TESTIMONIALS, BLOG_POSTS } from '../constants';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

const COLLECTION_NAME = 'content';

export const fetchContent = async <T>(key: string, defaultValue: T): Promise<T> => {
  // Try Firebase Firestore first
  try {
    const docRef = doc(db, COLLECTION_NAME, key);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().value as T;
    }
  } catch (err) {
    console.error(`Failed to fetch ${key} from Firebase, checking local storage`, err);
  }

  // Fallback to API (if backend exists)
  try {
    const res = await fetch(`/api/content/${key}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // API failed, ignore
  }
  
  // Fallback to localStorage
  try {
    const localData = localStorage.getItem(`content_${key}`);
    if (localData) {
      return JSON.parse(localData);
    }
  } catch (err) {
    console.error(`Failed to load ${key} from local storage`, err);
  }

  return defaultValue;
};

export const useContent = <T>(key: string, defaultValue: T): T => {
  const [content, setContent] = React.useState<T>(defaultValue);

  React.useEffect(() => {
    fetchContent<T>(key, defaultValue).then(setContent);
  }, [key]);

  return content;
};
