import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Heart, Users, GraduationCap, Home as HomeIcon, HeartPulse, CheckCircle2 } from 'lucide-react';
import { SectionHeading, ProgramCard, ImpactStat, TestimonialCard, BlogCard } from '../components/Common';
import { PROGRAMS, STATS, TESTIMONIALS, BLOG_POSTS, MISSION, VISION } from '../constants';
import { Page } from '../types';
import { Instagram } from 'lucide-react';
import { useContent } from '../services/contentService';

export const Home = ({ setCurrentPage }: { setCurrentPage: (page: Page) => void }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  const hero = useContent('hero', { 
    title: 'Manifesting God’s Dominion Worldwide.', 
    subtitle: MISSION,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1920'
  });
  const about = useContent('about', {
    title: 'Our Mission & Vision',
    subtitle: 'Banji Lagunju Foundation works to manifest God’s dominion in all nations worldwide through the church.',
    image: 'https://images.unsplash.com/photo-1524069290683-0457abfe42c3?auto=format&fit=crop&q=80&w=800'
  });
  const programs = useContent('programs', PROGRAMS);
  const stats = useContent('stats', STATS);
  const testimonials = useContent('testimonials', TESTIMONIALS);
  const blogPosts = useContent('blogPosts', BLOG_POSTS);

  const gallery = useContent('gallery', [
    'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1524069290683-0457abfe42c3?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=400'
  ]);
  const gallerySection = useContent('gallerySection', {
    title: 'Our Gallery',
    subtitle: 'Follow our journey and see the impact of our programs through our lens.'
  });
  const newsSection = useContent('newsSection', {
    title: 'Latest News & Stories',
    subtitle: 'Stay updated with our latest projects, success stories, and community updates.'
  });
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 scale-110">
          <motion.img 
            style={{ y }}
            src={hero.image} 
            alt="Hero Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 to-brand-blue/40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 py-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block px-4 py-1.5 bg-brand-gold text-brand-blue rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            >
              BJL Foundation
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {hero.title}
            </h1>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              {hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setCurrentPage('involved')}
                className="btn-outline border-white text-white hover:bg-white hover:text-brand-blue flex items-center justify-center gap-2 text-lg px-8 py-4"
              >
                Become a Volunteer <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={about.image} 
                  alt="About BJL" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-brand-gold p-8 rounded-3xl shadow-xl hidden md:block">
                <div className="text-4xl font-bold text-brand-blue mb-1">10+</div>
                <div className="text-sm font-bold text-brand-blue/70 uppercase tracking-wider">Years of Impact</div>
              </div>
            </motion.div>
            <div>
              <SectionHeading 
                title={about.title} 
                subtitle={about.subtitle}
                centered={false}
              />
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-brand-gold" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-brand-blue mb-2">Our Mission</h4>
                    <p className="text-brand-blue/70">{MISSION}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-brand-gold" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-brand-blue mb-2">Our Vision</h4>
                    <p className="text-brand-blue/70">{VISION}</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setCurrentPage('about')}
                className="mt-10 btn-primary"
              >
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24 bg-brand-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading 
            title="Our Programs" 
            subtitle="We focus on four key areas that create the most significant impact in the communities we serve."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program: any) => (
              <ProgramCard key={program.id} {...program} setCurrentPage={setCurrentPage} />
            ))}
          </div>
          <div className="text-center mt-12">
            <button 
              onClick={() => setCurrentPage('programs')}
              className="btn-outline"
            >
              View All Programs
            </button>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 bg-brand-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=1920" 
            alt="Impact Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <SectionHeading 
            title="Our Impact" 
            subtitle="The numbers speak for themselves. Every donation and volunteer hour contributes to these growing statistics."
            light
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat: any, i: number) => (
              <ImpactStat key={i} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading 
            title="Voices of Change" 
            subtitle="Hear from the individuals and communities whose lives have been transformed through our initiatives."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t: any, i: number) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-gold">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-brand-blue mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl text-brand-blue/80 mb-10">
              Whether you choose to volunteer or partner with us, your support creates a ripple effect of positive change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setCurrentPage('involved')}
                className="btn-outline border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-10"
              >
                Become a Volunteer
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">{gallerySection.title}</h2>
              <p className="text-brand-blue/70 max-w-xl">{gallerySection.subtitle}</p>
            </div>
            <a 
              href="https://www.instagram.com/bjl.foundation" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-outline flex items-center gap-2"
            >
              <Instagram className="w-5 h-5" /> Follow on Instagram
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {gallery.map((img: string, i: number) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                className="aspect-square rounded-2xl overflow-hidden shadow-md"
              >
                <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog */}
      <section className="py-24 bg-brand-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">{newsSection.title}</h2>
              <p className="text-brand-blue/70 max-w-xl">{newsSection.subtitle}</p>
            </div>
            <button 
              onClick={() => setCurrentPage('blog')}
              className="btn-outline whitespace-nowrap"
            >
              View All Stories
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post: any) => (
              <BlogCard key={post.id} {...post} setCurrentPage={setCurrentPage} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
