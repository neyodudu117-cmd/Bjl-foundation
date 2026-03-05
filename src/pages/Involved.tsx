import React from 'react';
import { motion } from 'framer-motion';
import { Users, HandHelping, Megaphone, Heart, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../components/Common';
import { Page, InvolvedContent } from '../types';
import { useContent } from '../services/contentService';

export const Involved = ({ setCurrentPage }: { setCurrentPage: (page: Page) => void }) => {
  const content = useContent<InvolvedContent>('involved', {
    headerImage: 'https://images.unsplash.com/photo-1559027615-cd26714e93af?auto=format&fit=crop&q=80&w=1920',
    headerTitle: 'Get Involved',
    headerSubtitle: 'There are many ways to support our mission. Join us in creating lasting change for communities in need.',
    volunteerTitle: 'Become a Volunteer',
    volunteerSubtitle: 'Ready to take the first step? Fill out the form and our volunteer coordinator will get in touch with you shortly.'
  });

  const ways = [
    {
      title: 'Volunteer',
      description: 'Join our team of volunteers and make a real difference in communities. Whether you have professional skills or just a willing heart, we have a place for you.',
      icon: Users,
      color: 'bg-blue-500',
      action: () => setCurrentPage('contact')
    },
    {
      title: 'Partner With Us',
      description: 'Organizations and businesses can collaborate with Banji Lagunju Foundation to expand impact. We offer various partnership models for corporate social responsibility.',
      icon: HandHelping,
      color: 'bg-brand-gold',
      action: () => setCurrentPage('contact')
    },
    {
      title: 'Fundraise',
      description: 'Support our mission by organizing fundraising events or campaigns. From charity walks to online bake sales, every effort counts.',
      icon: Megaphone,
      color: 'bg-brand-blue',
      action: () => setCurrentPage('contact')
    }
  ];

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-brand-blue py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src={content.headerImage} 
            alt="Involved Header" 
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
            {content.headerTitle}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            {content.headerSubtitle}
          </motion.p>
        </div>
      </section>

      {/* Ways to Help */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {ways.map((way, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col h-full"
              >
                <div className={way.color + " w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg"}>
                  <way.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-brand-blue mb-4">{way.title}</h3>
                <p className="text-brand-blue/70 mb-8 flex-grow leading-relaxed">
                  {way.description}
                </p>
                <button 
                  onClick={way.action}
                  className="flex items-center gap-2 text-brand-blue font-bold hover:text-brand-gold transition-colors group"
                >
                  Learn More <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Form Preview */}
      <section className="py-24 bg-brand-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-brand-blue/5">
            <div className="lg:w-1/2 p-12 lg:p-20 bg-brand-blue text-white">
              <h2 className="text-4xl font-bold mb-6">{content.volunteerTitle}</h2>
              <p className="text-white/70 text-lg mb-10">
                {content.volunteerSubtitle}
              </p>
              <ul className="space-y-6">
                {[
                  'Flexible commitment options',
                  'Skill-based volunteering',
                  'Community-led projects',
                  'Training and support provided'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-brand-gold rounded-full flex items-center justify-center shrink-0">
                      <Heart className="w-3 h-3 text-brand-blue fill-current" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 p-12 lg:p-20">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-blue uppercase tracking-wider">First Name</label>
                    <input type="text" className="w-full border-b-2 border-brand-blue/10 py-2 focus:outline-none focus:border-brand-gold transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-blue uppercase tracking-wider">Last Name</label>
                    <input type="text" className="w-full border-b-2 border-brand-blue/10 py-2 focus:outline-none focus:border-brand-gold transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-blue uppercase tracking-wider">Email Address</label>
                  <input type="email" className="w-full border-b-2 border-brand-blue/10 py-2 focus:outline-none focus:border-brand-gold transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-blue uppercase tracking-wider">Area of Interest</label>
                  <select className="w-full border-b-2 border-brand-blue/10 py-2 focus:outline-none focus:border-brand-gold transition-colors bg-transparent">
                    <option>National Prayer Network</option>
                    <option>BJL Studio & Media</option>
                    <option>Digital Discipleship</option>
                    <option>Kingdom Transformation</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-blue uppercase tracking-wider">Message</label>
                  <textarea rows={4} className="w-full border-b-2 border-brand-blue/10 py-2 focus:outline-none focus:border-brand-gold transition-colors resize-none"></textarea>
                </div>
                <button className="btn-primary w-full py-4 text-lg">Submit Application</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
