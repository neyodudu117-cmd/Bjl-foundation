import { Program, Stat, Testimonial, BlogPost } from './types';

export const MISSION = "To disciple nations by transforming societal structures through biblical principles.";
export const VISION = "God’s dominion manifested in all nations worldwide through the church.";

export const PROGRAMS: Program[] = [
  {
    id: 'prayer',
    title: 'National Prayer Network',
    description: 'Coordinating a nationwide prayer network to manifest God’s dominion and ensure peace and security through spiritual intercession.',
    icon: 'HeartPulse',
    image: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'studio',
    title: 'BJL Studio & Training',
    description: 'A state-of-the-art hub for transformational trainings on Kingdom issues and coordinating national prayer activities.',
    icon: 'Zap',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'digital',
    title: 'Digital Discipleship',
    description: 'Equipping 146 districts with SMART projectors and internet routers to facilitate training and connectivity across Uganda.',
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'discipleship',
    title: 'Kingdom Transformation',
    description: 'Moving citizens beyond religious attendance to actively applying God’s word in every sector of life, from government to family.',
    icon: 'Users',
    image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=800'
  }
];

export const STATS: Stat[] = [
  { label: 'Districts Reached', value: '146', suffix: '' },
  { label: 'Prayer Centres', value: '100', suffix: '+' },
  { label: 'SMART Projectors', value: '50', suffix: '+' },
  { label: 'Lives Impacted', value: '1M', suffix: '+' }
];

export const CORE_VALUES = [
  { name: 'Spirituality', description: 'Committed to a lifestyle that imitates Christ, guided by the Holy Spirit.' },
  { name: 'Truth', description: 'Firm belief in God’s written Word and revelation.' },
  { name: 'Excellence', description: 'Exceptional and outstanding in everything we do.' },
  { name: 'Work-ethics', description: 'Professional behaviour that reflects the fear of God.' },
  { name: 'Accountability', description: 'Taking ownership and responsibility for our actions.' },
  { name: 'Reverence for God', description: 'Guided by an unwavering attitude of loving and honouring God.' },
  { name: 'Diligence', description: 'Consistent, careful, and earnest effort to accomplish tasks.' }
];

export const GOALS = [
  "Promote the recognition of God’s greatness in all spheres of society.",
  "Inspire and equip national leaders with godly ethos and servant leadership.",
  "Advance a culture of accountability in leaders at all levels.",
  "Spearhead innovative interventions for sustainable transformation.",
  "Foster strategic partnerships with governments and organizations."
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "For a nation to be truly discipled, its citizens must move beyond religious attendance to actively applying God’s word in every sector of life.",
    author: "Banji Lagunju",
    role: "Founder"
  },
  {
    quote: "The BJL Studio has become a beacon of hope and a center for spiritual growth in our community.",
    author: "Pastor David Okello",
    role: "Community Leader"
  },
  {
    quote: "Receiving the SMART projector has transformed how we conduct our training and prayer sessions in Rukungiri.",
    author: "Grace Namara",
    role: "District Coordinator"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Launch of the BJL Studio in Kampala',
    excerpt: 'A state-of-the-art studio setup as a hub for coordinating the national prayer network and conducting transformational trainings.',
    date: 'January 13, 2026',
    category: 'News',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Climax of National Prayer Campaigns',
    excerpt: 'The foundation embarked on a countrywide prayer campaign led by Banji Lagunju to ensure peace and security.',
    date: 'October 8, 2025',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'Distribution of Projectors and Routers',
    excerpt: 'Setting up prayer centres in all 146 districts of Uganda, equipped with SMART projectors and internet connectivity.',
    date: 'December 18, 2025',
    category: 'Impact',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'
  }
];


