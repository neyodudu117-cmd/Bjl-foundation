export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  headerImage: string;
  headerTitle: string;
  headerSubtitle: string;
}

export type Page = 'home' | 'about' | 'programs' | 'involved' | 'blog' | 'contact' | 'admin' | 'login';

export interface Program {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

export interface InvolvedContent {
  headerImage: string;
  headerTitle: string;
  headerSubtitle: string;
  volunteerTitle: string;
  volunteerSubtitle: string;
}
