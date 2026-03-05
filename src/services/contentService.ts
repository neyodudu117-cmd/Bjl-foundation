import React from 'react';
import { PROGRAMS, STATS, TESTIMONIALS, BLOG_POSTS } from '../constants';

export const fetchContent = async <T>(key: string, defaultValue: T): Promise<T> => {
  try {
    const res = await fetch(`/api/content/${key}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error(`Failed to fetch ${key}, falling back to local storage`, err);
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
