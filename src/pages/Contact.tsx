import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';
import { SectionHeading } from '../components/Common';
import { Page, ContactInfo } from '../types';
import { useContent } from '../services/contentService';

export const Contact = ({ setCurrentPage }: { setCurrentPage: (page: Page) => void }) => {
  const contact = useContent<ContactInfo>('contact', {
    address: 'Grace Assembly City Church, Kampala, Uganda',
    phone: '07066894652',
    email: 'info@bjlfoundation.org',
    facebook: 'https://facebook.com/bjlfoundation',
    twitter: 'https://twitter.com/bjlfoundation',
    instagram: 'https://instagram.com/bjl.foundation',
    linkedin: 'https://linkedin.com/company/bjlfoundation',
    headerImage: 'https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&q=80&w=1920',
    headerTitle: 'Contact Us',
    headerSubtitle: "Have questions about our programs, partnerships, or volunteering? We'd love to hear from you."
  });

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-brand-blue py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src={contact.headerImage} 
            alt="Contact Header" 
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
            {contact.headerTitle}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            {contact.headerSubtitle}
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Info Column */}
            <div className="lg:col-span-1 space-y-12">
              <div>
                <h3 className="text-2xl font-bold text-brand-blue mb-6">Get in Touch</h3>
                <p className="text-brand-blue/70 mb-8">
                  Our team is here to help and answer any questions you might have. We look forward to hearing from you.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-brand-gold" />
                    </div>
                    <div>
                      <div className="font-bold text-brand-blue">Our Office</div>
                      <div className="text-brand-blue/60">{contact.address}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-brand-gold" />
                    </div>
                    <div>
                      <div className="font-bold text-brand-blue">Phone Number</div>
                      <div className="text-brand-blue/60">{contact.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-brand-gold" />
                    </div>
                    <div>
                      <div className="font-bold text-brand-blue">Email Address</div>
                      <div className="text-brand-blue/60">{contact.email}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-brand-blue mb-6">Follow Us</h3>
                <div className="flex items-center gap-4">
                  {[
                    { Icon: Facebook, url: contact.facebook },
                    { Icon: Twitter, url: contact.twitter },
                    { Icon: Instagram, url: contact.instagram },
                    { Icon: Linkedin, url: contact.linkedin }
                  ].map(({ Icon, url }, i) => (
                    <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-brand-soft border border-brand-blue/5 flex items-center justify-center hover:bg-brand-gold hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-2">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-brand-soft p-10 md:p-16 rounded-[3rem] shadow-xl border border-brand-blue/5"
              >
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-brand-blue uppercase tracking-wider">Full Name</label>
                      <input type="text" placeholder="John Doe" className="w-full bg-white border-b-2 border-brand-blue/10 py-3 px-4 focus:outline-none focus:border-brand-gold transition-colors rounded-t-lg" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-brand-blue uppercase tracking-wider">Email Address</label>
                      <input type="email" placeholder="john@example.com" className="w-full bg-white border-b-2 border-brand-blue/10 py-3 px-4 focus:outline-none focus:border-brand-gold transition-colors rounded-t-lg" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-blue uppercase tracking-wider">Subject</label>
                    <input type="text" placeholder="How can we help?" className="w-full bg-white border-b-2 border-brand-blue/10 py-3 px-4 focus:outline-none focus:border-brand-gold transition-colors rounded-t-lg" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-blue uppercase tracking-wider">Your Message</label>
                    <textarea rows={6} placeholder="Write your message here..." className="w-full bg-white border-b-2 border-brand-blue/10 py-3 px-4 focus:outline-none focus:border-brand-gold transition-colors rounded-t-lg resize-none"></textarea>
                  </div>
                  <button className="btn-primary w-full py-5 text-xl flex items-center justify-center gap-3">
                    <Send className="w-6 h-6" /> Send Message
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="h-[500px] bg-brand-soft relative overflow-hidden">
        <div className="absolute inset-0 grayscale opacity-50">
          <img 
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1920" 
            alt="Map Placeholder" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm border border-brand-blue/5">
            <MapPin className="w-12 h-12 text-brand-gold mx-auto mb-4" />
            <h4 className="text-xl font-bold text-brand-blue mb-2">Visit Our Office</h4>
            <p className="text-brand-blue/60 mb-6">{contact.address}</p>
            <button className="text-brand-gold font-bold hover:underline">Get Directions</button>
          </div>
        </div>
      </section>
    </div>
  );
};
