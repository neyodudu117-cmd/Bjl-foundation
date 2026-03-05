import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading, ProgramCard } from '../components/Common';
import { PROGRAMS } from '../constants';
import { useContent } from '../services/contentService';

import { Page } from '../types';

export const Programs = ({ setCurrentPage }: { setCurrentPage: (page: Page) => void }) => {
  const programs = useContent('programs', PROGRAMS);
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-brand-blue py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1920" 
            alt="Programs Header" 
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
            Our Programs
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            Manifesting God’s dominion through prayer, digital innovation, and Kingdom-focused leadership training.
          </motion.p>
        </div>
      </section>

      {/* Detailed Programs */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="space-y-32">
            {programs.map((program: any, i: number) => (
              <div key={program.id} className={i % 2 === 1 ? "flex flex-col lg:flex-row-reverse gap-16 items-center" : "flex flex-col lg:flex-row gap-16 items-center"}>
                <motion.div 
                  initial={{ opacity: 0, x: i % 2 === 1 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="lg:w-1/2"
                >
                  <div className="relative">
                    <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                      <img 
                        src={program.image} 
                        alt={program.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-brand-gold p-6 rounded-2xl shadow-xl hidden md:block">
                      <div className="text-2xl font-bold text-brand-blue">Kingdom</div>
                      <div className="text-sm font-bold text-brand-blue/70 uppercase tracking-wider">Transformation</div>
                    </div>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: i % 2 === 1 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="lg:w-1/2"
                >
                  <span className="text-brand-gold font-bold uppercase tracking-widest text-sm mb-4 block">Focus Area {i + 1}</span>
                  <h2 className="text-4xl font-bold text-brand-blue mb-6">{program.title}</h2>
                  <p className="text-brand-blue/70 text-lg leading-relaxed mb-8">
                    {program.description} We believe that for a nation to be truly discipled, its citizens must move beyond religious attendance to actively applying God’s word in every sector of life.
                  </p>
                  <ul className="space-y-4 mb-10">
                    {[
                      'National coordination and networking',
                      'Spiritual intercession for peace',
                      'Digital tools for remote discipleship',
                      'Sector-specific leadership training'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-brand-blue/80 font-medium">
                        <div className="w-6 h-6 bg-brand-gold/20 rounded-full flex items-center justify-center shrink-0">
                          <div className="w-2 h-2 bg-brand-gold rounded-full" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => setCurrentPage('contact')}
                    className="btn-primary"
                  >
                    Support This Initiative
                  </button>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-brand-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <SectionHeading 
            title="Have a Program Idea?" 
            subtitle="We are always looking for new ways to support communities. If you have a project that aligns with our mission, we'd love to hear from you."
          />
          <button 
            onClick={() => setCurrentPage('contact')}
            className="btn-outline"
          >
            Contact Our Program Team
          </button>
        </div>
      </section>
    </div>
  );
};
