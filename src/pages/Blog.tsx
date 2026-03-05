import React from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeading, BlogCard, cn } from '../components/Common';
import { BLOG_POSTS } from '../constants';
import { useContent } from '../services/contentService';
import { Page } from '../types';

export const Blog = ({ setCurrentPage }: { setCurrentPage: (page: Page) => void }) => {
  const blogPosts = useContent('blogPosts', BLOG_POSTS);
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-brand-blue py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1920" 
            alt="Blog Header" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Blog & News
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            Stay updated with our latest impact stories, program updates, and community news.
          </motion.p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-soft rounded-[3rem] overflow-hidden shadow-xl flex flex-col lg:flex-row border border-brand-blue/5"
          >
            <div className="lg:w-3/5 h-[400px] lg:h-auto overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=1200" 
                alt="Featured Post" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="lg:w-2/5 p-12 lg:p-16 flex flex-col justify-center">
              <span className="bg-brand-gold text-brand-blue text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-6 inline-block w-fit">
                Featured Story
              </span>
              <h2 className="text-3xl font-bold text-brand-blue mb-6 leading-tight">
                Empowering Rural Communities Through Sustainable Agriculture
              </h2>
              <p className="text-brand-blue/70 mb-8 text-lg">
                Our latest initiative has helped over 50 families start their own sustainable farms, ensuring food security and economic independence...
              </p>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" alt="Author" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <div className="font-bold text-brand-blue">Benjamin Lawson</div>
                  <div className="text-brand-blue/40 text-sm">March 20, 2024</div>
                </div>
              </div>
              <button 
                onClick={() => setCurrentPage('blog')}
                className="btn-primary w-fit flex items-center gap-2"
              >
                Read Full Story <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 bg-brand-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div className="flex gap-4 overflow-x-auto pb-2 w-full md:w-auto">
              {['All', 'Education', 'Youth', 'Community', 'Health'].map((cat, i) => (
                <button 
                  key={i}
                  className={cn(
                    "px-6 py-2 rounded-full font-bold whitespace-nowrap transition-all",
                    i === 0 ? "bg-brand-blue text-white" : "bg-white text-brand-blue/60 hover:text-brand-blue shadow-sm"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-blue/30" />
              <input 
                type="text" 
                placeholder="Search stories..." 
                className="w-full bg-white border border-brand-blue/5 rounded-full py-3 pl-12 pr-6 focus:outline-none focus:border-brand-gold transition-colors shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post: any) => (
              <BlogCard key={post.id} {...post} setCurrentPage={setCurrentPage} />
            ))}
            {/* Duplicate for grid demonstration */}
            {blogPosts.map((post: any) => (
              <BlogCard key={post.id + '-2'} {...post} setCurrentPage={setCurrentPage} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex justify-center items-center gap-4">
            <button className="w-12 h-12 rounded-full border border-brand-blue/10 flex items-center justify-center text-brand-blue/40 hover:text-brand-blue hover:border-brand-blue transition-all">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-2">
              {[1, 2, 3].map((n) => (
                <button 
                  key={n}
                  className={cn(
                    "w-12 h-12 rounded-full font-bold transition-all",
                    n === 1 ? "bg-brand-blue text-white" : "text-brand-blue/60 hover:text-brand-blue"
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
            <button className="w-12 h-12 rounded-full border border-brand-blue/10 flex items-center justify-center text-brand-blue/40 hover:text-brand-blue hover:border-brand-blue transition-all">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
