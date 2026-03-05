import React from 'react';
import { PROGRAMS, STATS, TESTIMONIALS, BLOG_POSTS } from '../constants';

export const fetchContent = async <T>(key: string, defaultValue: T): Promise<T> => {
  try {
    const res = await fetch(`/api/content/${key}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error(`Failed to fetch ${key}`, err);
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
