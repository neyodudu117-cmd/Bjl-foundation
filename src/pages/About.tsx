import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Award, Heart, CheckCircle2, Target, Star, Briefcase, Scale, Zap, BookOpen } from 'lucide-react';
import { SectionHeading } from '../components/Common';
import { CORE_VALUES, GOALS, VISION, MISSION } from '../constants';
import { Page, TeamMember } from '../types';
import { useContent } from '../services/contentService';

export const About = ({ setCurrentPage }: { setCurrentPage: (page: Page) => void }) => {
  const valueIcons = [Star, BookOpen, Award, Briefcase, Scale, Heart, Zap];

  const about = useContent('about', {
    title: 'Our Mission & Vision',
    subtitle: 'Banji Lagunju Foundation works to manifest God’s dominion in all nations worldwide through the church.',
    image: 'https://images.unsplash.com/photo-1524069290683-0457abfe42c3?auto=format&fit=crop&q=80&w=800'
  });

  const hero = useContent('hero', { 
    title: 'Manifesting God’s Dominion Worldwide.', 
    subtitle: MISSION,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1920'
  });

  const team = useContent('team', [
    { id: '1', name: 'Banji Lagunju', role: 'Founder & Chairman', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },
    { id: '2', name: 'Dr. Jane Smith', role: 'Executive Director', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400' },
    { id: '3', name: 'Robert Wilson', role: 'Head of Programs', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400' }
  ]);

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-brand-blue py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src={hero.image} 
            alt="About Header" 
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
            About Banji Lagunju Foundation
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            {hero.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading 
                title={about.title} 
                subtitle={about.subtitle}
                centered={false}
              />
              <div className="space-y-6 text-brand-blue/70 text-lg leading-relaxed">
                <p>
                  The Banji Lagunju Foundation (BJL Foundation) was established to bridge the gap between religious attendance and the active application of God’s word in every sector of society.
                </p>
                <p>
                  {MISSION} With a focus on national prayer campaigns, digital discipleship, and leadership training, we aim to disciple nations by equipping citizens with the spiritual and practical tools needed for transformation.
                </p>
                <p>
                  Our initiatives, such as the BJL Studio and the distribution of SMART projectors to 146 districts in Uganda, are designed to create a connected and spiritually empowered network of leaders.
                </p>
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src={about.image} 
                alt="Our Story" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overarching Goals */}
      <section className="py-24 bg-brand-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading 
            title="Overarching Goals" 
            subtitle="Our strategic objectives to achieve national and spiritual transformation."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GOALS.map((goal, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-lg border border-brand-blue/5 flex gap-4"
              >
                <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center shrink-0">
                  <Target className="w-6 h-6 text-brand-gold" />
                </div>
                <p className="text-brand-blue/80 font-medium">{goal}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading 
            title="Our Core Values" 
            subtitle="Being a STEWARD is a fundamental principle of the Banji Lagunju Foundation."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CORE_VALUES.map((value, i) => {
              const Icon = valueIcons[i] || Star;
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-brand-soft p-8 rounded-3xl shadow-lg border border-brand-blue/5 text-center"
                >
                  <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-brand-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-blue mb-4">{value.name}</h3>
                  <p className="text-brand-blue/70">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-24 bg-brand-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading 
            title="Our Leadership" 
            subtitle="Meet the dedicated individuals leading our foundation towards its goals."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member: TeamMember, i: number) => (
              <div key={member.id} className="text-center group">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 shadow-xl grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h4 className="text-xl font-bold text-brand-blue">{member.name}</h4>
                <p className="text-brand-gold font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

