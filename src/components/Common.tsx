import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Heart, Users, BookOpen, HandHelping, 
  Mail, Phone, MapPin, Facebook, Twitter, Instagram, 
  Linkedin, ArrowRight, GraduationCap, Home as HomeIcon, 
  HeartPulse, CheckCircle2, Quote, Calendar, ChevronRight,
  Globe, Shield, Award, Zap
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for merging tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Reusable Section Heading
 */
export const SectionHeading = ({ 
  title, 
  subtitle, 
  centered = true,
  light = false 
}: { 
  title: string; 
  subtitle?: string; 
  centered?: boolean;
  light?: boolean;
}) => (
  <div className={cn(
    "mb-12",
    centered ? "text-center" : "text-left"
  )}>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "text-3xl md:text-4xl font-bold mb-4",
        light ? "text-white" : "text-brand-blue"
      )}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={cn(
          "text-lg max-w-2xl",
          centered ? "mx-auto" : "",
          light ? "text-white/80" : "text-brand-blue/70"
        )}
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className={cn(
        "h-1 w-20 mt-6",
        centered ? "mx-auto" : "",
        light ? "bg-brand-gold" : "bg-brand-gold"
      )}
    />
  </div>
);

/**
 * Program Card Component
 */
export const ProgramCard = ({ 
  title, 
  description, 
  icon: IconName,
  image,
  setCurrentPage
}: { 
  title: string; 
  description: string; 
  icon: string;
  image: string;
  setCurrentPage?: (page: any) => void;
}) => {
  const Icon = {
    GraduationCap,
    Users,
    Home: HomeIcon,
    HeartPulse
  }[IconName] || Zap;

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white rounded-2xl overflow-hidden shadow-xl border border-brand-blue/5 group"
    >
      <div className="h-48 overflow-hidden relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-brand-blue/20 group-hover:bg-brand-blue/40 transition-colors duration-300" />
        <div className="absolute top-4 left-4 bg-white p-3 rounded-xl shadow-lg">
          <Icon className="w-6 h-6 text-brand-gold" />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-brand-blue">{title}</h3>
        <p className="text-brand-blue/70 mb-4 line-clamp-3">{description}</p>
        <button 
          onClick={() => setCurrentPage?.('programs')}
          className="text-brand-blue font-semibold flex items-center gap-2 hover:text-brand-gold transition-colors"
        >
          Learn More <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

/**
 * Impact Stat Component
 */
export const ImpactStat = ({ label, value, suffix }: { label: string; value: string; suffix?: string }) => (
  <div className="text-center p-6">
    <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold text-brand-gold mb-2"
    >
      {value}{suffix}
    </motion.div>
    <div className="text-white/80 font-medium uppercase tracking-wider text-sm">{label}</div>
  </div>
);

/**
 * Testimonial Card
 */
export const TestimonialCard = ({ quote, author, role, image }: { quote: string; author: string; role: string; image?: string }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="bg-brand-soft p-8 rounded-3xl relative"
  >
    <Quote className="w-12 h-12 text-brand-gold/20 absolute top-6 right-6" />
    <p className="text-lg italic text-brand-blue/80 mb-6 relative z-10">"{quote}"</p>
    <div className="flex items-center gap-4">
      {image && (
        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-brand-gold">
          <img src={image} alt={author} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      )}
      <div>
        <div className="font-bold text-brand-blue">{author}</div>
        <div className="text-brand-gold text-sm font-medium">{role}</div>
      </div>
    </div>
  </motion.div>
);

/**
 * Blog Card
 */
export const BlogCard = ({ title, excerpt, date, category, image, setCurrentPage }: { title: string; excerpt: string; date: string; category: string; image: string; setCurrentPage?: (page: any) => void }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white rounded-2xl overflow-hidden shadow-md border border-brand-blue/5"
  >
    <div className="h-48 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
    </div>
    <div className="p-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="bg-brand-gold/10 text-brand-gold text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
          {category}
        </span>
        <span className="text-brand-blue/40 text-xs flex items-center gap-1">
          <Calendar className="w-3 h-3" /> {date}
        </span>
      </div>
      <h3 className="text-lg font-bold mb-2 text-brand-blue line-clamp-2">{title}</h3>
      <p className="text-brand-blue/60 text-sm mb-4 line-clamp-2">{excerpt}</p>
      <button 
        onClick={() => setCurrentPage?.('blog')}
        className="text-brand-blue font-bold text-sm flex items-center gap-1 hover:text-brand-gold transition-colors"
      >
        Read Article <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </motion.div>
);
