import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Page, ContactInfo } from '../types';
import { useContent } from '../services/contentService';

export const Footer = ({ setCurrentPage }: { setCurrentPage: (page: Page) => void }) => {
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
    <footer className="bg-brand-blue text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Branding */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-gold rounded-xl flex items-center justify-center overflow-hidden">
              <img src="/favicon.svg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="block text-xl font-bold leading-none">BJL FOUNDATION</span>
              <span className="text-[8px] font-bold tracking-[0.1em] text-brand-gold uppercase block mt-1">Setting the Stage for a Brighter Tomorrow</span>
            </div>
          </div>
          <p className="text-white/60 leading-relaxed">
            Empowering communities through education, youth empowerment, and sustainable development initiatives.
          </p>
          <div className="flex items-center gap-4">
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold transition-all">
              <Instagram className="w-5 h-5" />
            </a>
            {[
              { Icon: Facebook, url: contact.facebook },
              { Icon: Twitter, url: contact.twitter },
              { Icon: Linkedin, url: contact.linkedin }
            ].map(({ Icon, url }, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold transition-all">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-brand-gold">Quick Links</h4>
          <ul className="space-y-4">
            {[
              { label: 'Home', id: 'home' },
              { label: 'About Us', id: 'about' },
              { label: 'Our Programs', id: 'programs' },
              { label: 'Get Involved', id: 'involved' },
              { label: 'Contact', id: 'contact' }
            ].map((link) => (
              <li key={link.id}>
                <button 
                  onClick={() => setCurrentPage(link.id as Page)}
                  className="text-white/60 hover:text-brand-gold transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <a href="https://bjlfoundation.org/?page_id=39" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-brand-gold transition-colors">
                Podcast
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-brand-gold">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-1" />
              <span className="text-white/60">{contact.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-brand-gold shrink-0" />
              <span className="text-white/60">{contact.phone}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-brand-gold shrink-0" />
              <span className="text-white/60">{contact.email}</span>
            </li>
            <li className="text-xs text-white/40 pt-2">
              Registered Charity: 7948810
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-brand-gold">Newsletter</h4>
          <p className="text-white/60 mb-4 text-sm">Stay updated with our latest impact stories and news.</p>
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors"
            />
            <button className="btn-secondary w-full">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
        <p>© 2024 BJL Foundation. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <button onClick={() => setCurrentPage('admin')} className="hover:text-brand-gold transition-colors">Admin</button>
          <button onClick={() => setCurrentPage('about')} className="hover:text-brand-gold transition-colors">Privacy Policy</button>
          <button onClick={() => setCurrentPage('about')} className="hover:text-brand-gold transition-colors">Terms of Service</button>
        </div>
      </div>
    </footer>
  );
};
