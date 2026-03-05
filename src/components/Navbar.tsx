import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Heart } from 'lucide-react';
import { Page } from '../types';
import { cn } from './Common';
import { useContent } from '../services/contentService';

export const Navbar = ({ 
  currentPage, 
  setCurrentPage 
}: { 
  currentPage: Page; 
  setCurrentPage: (page: Page) => void 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const settings = useContent('settings', { logo: '', favicon: '' });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (settings.favicon) {
      const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (link) {
        link.href = settings.favicon;
      } else {
        const newLink = document.createElement('link');
        newLink.rel = 'icon';
        newLink.href = settings.favicon;
        document.head.appendChild(newLink);
      }
    }
  }, [settings.favicon]);

  const navLinks: { label: string; id: Page }[] = [
    { label: 'Home', id: 'home' },
    { label: 'About Us', id: 'about' },
    { label: 'Programs', id: 'programs' },
    { label: 'Get Involved', id: 'involved' },
    { label: 'Blog', id: 'blog' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300",
      isScrolled ? "glass-nav py-3" : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2 group"
        >
          {settings.logo ? (
            <img src={settings.logo} alt="BJL Foundation" className="h-12 w-auto object-contain" />
          ) : (
            <>
              <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center group-hover:bg-brand-gold transition-colors overflow-hidden">
                <img src="/favicon.svg" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <span className={cn(
                  "block text-xl font-bold leading-none",
                  isScrolled ? "text-brand-blue" : "text-brand-blue"
                )}>BJL FOUNDATION</span>
                <span className="text-[8px] font-bold tracking-[0.1em] text-brand-gold uppercase block mt-1">Setting the Stage for a Brighter Tomorrow</span>
              </div>
            </>
          )}
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setCurrentPage(link.id)}
              className={cn(
                "text-sm font-semibold transition-colors relative py-2",
                currentPage === link.id ? "text-brand-gold" : "text-brand-blue hover:text-brand-gold"
              )}
            >
              {link.label}
              {currentPage === link.id && (
                <motion.div 
                  layoutId="navUnderline"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-gold"
                />
              )}
            </button>
          ))}
          <button 
            onClick={() => setCurrentPage('login')}
            className="text-sm font-semibold text-brand-blue hover:text-brand-gold transition-colors"
          >
            Login
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-brand-blue"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-brand-blue/5 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setCurrentPage(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    "text-left text-lg font-semibold p-2 rounded-lg",
                    currentPage === link.id ? "bg-brand-gold/10 text-brand-gold" : "text-brand-blue"
                  )}
                >
                  {link.label}
                </button>
              ))}
              <div className="grid grid-cols-1 gap-4 mt-2">
                <button 
                  onClick={() => {
                    setCurrentPage('login');
                    setIsMobileMenuOpen(false);
                  }}
                  className="btn-outline w-full flex items-center justify-center gap-2"
                >
                  Login
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
