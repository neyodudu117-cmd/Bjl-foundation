import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LogIn, Save, Plus, Trash2, Edit2, Check, X, Upload, Image as ImageIcon, Users } from 'lucide-react';
import { PROGRAMS, STATS, TESTIMONIALS, BLOG_POSTS } from '../constants';
import { Program, Stat, Testimonial, BlogPost, TeamMember, ContactInfo, InvolvedContent } from '../types';

export const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [activeTab, setActiveTab] = useState<'general' | 'programs' | 'stats' | 'testimonials' | 'blog' | 'team' | 'contact' | 'involved'>('general');
  
  const [hero, setHero] = useState({ title: '', subtitle: '', image: '' });
  const [about, setAbout] = useState({ title: '', subtitle: '', image: '' });
  const [gallery, setGallery] = useState<string[]>([]);
  const [gallerySection, setGallerySection] = useState({ title: '', subtitle: '' });
  const [newsSection, setNewsSection] = useState({ title: '', subtitle: '' });
  const [settings, setSettings] = useState({ logo: '', favicon: '' });
  const [programs, setPrograms] = useState<Program[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [contact, setContact] = useState<ContactInfo>({
    address: '', phone: '', email: '', facebook: '', twitter: '', instagram: '', linkedin: '',
    headerImage: '', headerTitle: '', headerSubtitle: ''
  });
  const [involved, setInvolved] = useState<InvolvedContent>({
    headerImage: '', headerTitle: '', headerSubtitle: '', volunteerTitle: '', volunteerSubtitle: ''
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setIsLoggedIn(true);
          localStorage.setItem('admin_user', JSON.stringify(data.user));
          fetchContent();
        } else {
          setError(data.message);
        }
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      // Fallback for static hosting (Netlify)
      if (username === 'admin' && password === 'admin123') {
        setIsLoggedIn(true);
        localStorage.setItem('admin_user', JSON.stringify({ username: 'admin' }));
        fetchContent();
      } else {
        setError('Login failed. Please check your credentials.');
      }
    }
  };

  const fetchContent = async () => {
    const keys = ['hero', 'about', 'programs', 'stats', 'testimonials', 'blogPosts', 'team', 'contact', 'involved', 'gallery', 'gallerySection', 'newsSection', 'settings'];
    for (const key of keys) {
      let data = null;
      try {
        const res = await fetch(`/api/content/${key}`);
        if (res.ok) {
          data = await res.json();
        }
      } catch (err) {
        console.error(`Failed to fetch ${key}, checking local storage`, err);
      }

      // Fallback to localStorage if API failed
      if (!data) {
        const localData = localStorage.getItem(`content_${key}`);
        if (localData) {
          data = JSON.parse(localData);
        }
      }

      if (data) {
        if (key === 'hero') setHero(data);
        if (key === 'about') setAbout(data);
        if (key === 'programs') setPrograms(data);
        if (key === 'stats') setStats(data);
        if (key === 'testimonials') setTestimonials(data);
        if (key === 'blogPosts') setBlogPosts(data);
        if (key === 'team') setTeam(data);
        if (key === 'contact') setContact(data);
        if (key === 'involved') setInvolved(data);
        if (key === 'gallery') setGallery(data);
        if (key === 'gallerySection') setGallerySection(data);
        if (key === 'newsSection') setNewsSection(data);
        if (key === 'settings') setSettings(data);
      } else {
        // If not found anywhere, use defaults from constants
          if (key === 'hero') setHero({ 
            title: 'Manifesting God’s Dominion Worldwide.', 
            subtitle: 'To disciple nations by transforming societal structures through biblical principles.',
            image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1920'
          });
          if (key === 'about') setAbout({
            title: 'Our Mission & Vision',
            subtitle: 'Banji Lagunju Foundation works to manifest God’s dominion in all nations worldwide through the church.',
            image: 'https://images.unsplash.com/photo-1524069290683-0457abfe42c3?auto=format&fit=crop&q=80&w=800'
          });
          if (key === 'gallery') setGallery([
            'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1524069290683-0457abfe42c3?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=400'
          ]);
          if (key === 'gallerySection') setGallerySection({
            title: 'Our Gallery',
            subtitle: 'Follow our journey and see the impact of our programs through our lens.'
          });
          if (key === 'newsSection') setNewsSection({
            title: 'Latest News & Stories',
            subtitle: 'Stay updated with our latest projects, success stories, and community updates.'
          });
          if (key === 'settings') setSettings({
            logo: '',
            favicon: ''
          });
          if (key === 'programs') setPrograms(PROGRAMS);
          if (key === 'stats') setStats(STATS);
          if (key === 'testimonials') setTestimonials(TESTIMONIALS);
          if (key === 'blogPosts') setBlogPosts(BLOG_POSTS);
          if (key === 'team') setTeam([
            { id: '1', name: 'Banji Lagunju', role: 'Founder & Chairman', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },
            { id: '2', name: 'Dr. Jane Smith', role: 'Executive Director', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400' },
            { id: '3', name: 'Robert Wilson', role: 'Head of Programs', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400' }
          ]);
          if (key === 'contact') setContact({
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
          if (key === 'involved') setInvolved({
            headerImage: 'https://images.unsplash.com/photo-1559027615-cd26714e93af?auto=format&fit=crop&q=80&w=1920',
            headerTitle: 'Get Involved',
            headerSubtitle: 'There are many ways to support our mission. Join us in creating lasting change for communities in need.',
            volunteerTitle: 'Become a Volunteer',
            volunteerSubtitle: 'Ready to take the first step? Fill out the form and our volunteer coordinator will get in touch with you shortly.'
          });
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, onUpload: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadStatus('uploading');
    setUploadProgress(0);
    
    // Try API upload first
    const formData = new FormData();
    formData.append('image', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload', true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        try {
          const data = JSON.parse(xhr.responseText);
          onUpload(data.url);
          setUploadStatus('success');
          setTimeout(() => setUploadStatus('idle'), 2000);
        } catch (e) {
          fallbackToLocalFile(file, onUpload);
        }
      } else {
        fallbackToLocalFile(file, onUpload);
      }
    };

    xhr.onerror = () => {
      fallbackToLocalFile(file, onUpload);
    };

    xhr.send(formData);
  };

  const fallbackToLocalFile = (file: File, onUpload: (url: string) => void) => {
    // Fallback to Base64 for static hosting
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onUpload(result);
        setUploadStatus('success');
        setTimeout(() => setUploadStatus('idle'), 2000);
      }
    };
    reader.onerror = () => {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus('idle'), 3000);
    };
    reader.readAsDataURL(file);
  };

  const saveContent = async (key: string, value: any) => {
    try {
      const res = await fetch(`/api/content/${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value }),
      });
      if (!res.ok) throw new Error('API failed');
      alert('Saved successfully!');
    } catch (err) {
      // Fallback to localStorage
      try {
        localStorage.setItem(`content_${key}`, JSON.stringify(value));
        alert('Saved locally! (Note: Changes are only visible in this browser)');
      } catch (e) {
        alert('Failed to save');
      }
    }
  };

  useEffect(() => {
    const user = localStorage.getItem('admin_user');
    if (user) {
      setIsLoggedIn(true);
      fetchContent();
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-blue/5 pt-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-brand-blue/10 rounded-lg">
              <LogIn className="w-6 h-6 text-brand-blue" />
            </div>
            <h1 className="text-2xl font-bold text-brand-blue">Admin Login</h1>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button 
              type="submit"
              className="w-full bg-brand-blue text-white py-3 rounded-lg font-semibold hover:bg-brand-blue/90 transition-colors"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-brand-blue">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your website content</p>
          </div>
          <button 
            onClick={() => {
              localStorage.removeItem('admin_user');
              setIsLoggedIn(false);
            }}
            className="px-4 py-2 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {(['general', 'programs', 'stats', 'testimonials', 'blog', 'team', 'contact', 'involved'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium capitalize transition-colors whitespace-nowrap ${
                  activeTab === tab 
                    ? 'text-brand-blue border-b-2 border-brand-blue bg-brand-blue/5' 
                    : 'text-gray-500 hover:text-brand-blue hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'general' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">General Settings</h2>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        saveContent('hero', hero);
                        saveContent('about', about);
                        saveContent('gallery', gallery);
                        saveContent('gallerySection', gallerySection);
                        saveContent('newsSection', newsSection);
                        saveContent('settings', settings);
                      }}
                      className="flex items-center gap-2 bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-brand-blue/90"
                    >
                      <Save className="w-4 h-4" /> Save General
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="p-6 border border-gray-100 rounded-2xl space-y-4">
                    <h3 className="font-bold text-lg text-brand-blue">Site Settings</h3>
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">Logo</label>
                      <div className="flex gap-2">
                        <input 
                          className="flex-1 px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                          value={settings.logo}
                          onChange={(e) => setSettings({ ...settings, logo: e.target.value })}
                          placeholder="Logo URL"
                        />
                        <label className="cursor-pointer bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                          <Upload className="w-5 h-5 text-gray-600" />
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setSettings({ ...settings, logo: url }))} />
                        </label>
                      </div>
                      {settings.logo && (
                        <div className="p-2 bg-gray-100 rounded-lg inline-block">
                          <img src={settings.logo} alt="Logo Preview" className="h-12 object-contain" />
                        </div>
                      )}
                      
                      <label className="block text-sm font-medium text-gray-700 mt-2">Favicon</label>
                      <div className="flex gap-2">
                        <input 
                          className="flex-1 px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                          value={settings.favicon}
                          onChange={(e) => setSettings({ ...settings, favicon: e.target.value })}
                          placeholder="Favicon URL"
                        />
                        <label className="cursor-pointer bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                          <Upload className="w-5 h-5 text-gray-600" />
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setSettings({ ...settings, favicon: url }))} />
                        </label>
                      </div>
                      {settings.favicon && (
                        <div className="p-2 bg-gray-100 rounded-lg inline-block">
                          <img src={settings.favicon} alt="Favicon Preview" className="h-8 w-8 object-contain" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 border border-gray-100 rounded-2xl space-y-4">
                    <h3 className="font-bold text-lg text-brand-blue">Hero Section</h3>
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">Hero Image</label>
                      <div className="flex gap-2">
                        <input 
                          className="flex-1 px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                          value={hero.image}
                          onChange={(e) => setHero({ ...hero, image: e.target.value })}
                          placeholder="Image URL"
                        />
                        <label className="cursor-pointer bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                          <Upload className="w-5 h-5 text-gray-600" />
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setHero({ ...hero, image: url }))} />
                        </label>
                      </div>
                      {hero.image && (
                        <img src={hero.image} alt="Hero Preview" className="w-full h-32 object-cover rounded-lg border" />
                      )}
                      <label className="block text-sm font-medium text-gray-700">Hero Title</label>
                      <textarea 
                        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-brand-blue h-24"
                        value={hero.title}
                        onChange={(e) => setHero({ ...hero, title: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="p-6 border border-gray-100 rounded-2xl space-y-4">
                    <h3 className="font-bold text-lg text-brand-blue">About Section</h3>
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">About Image</label>
                      <div className="flex gap-2">
                        <input 
                          className="flex-1 px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                          value={about.image}
                          onChange={(e) => setAbout({ ...about, image: e.target.value })}
                          placeholder="Image URL"
                        />
                        <label className="cursor-pointer bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                          <Upload className="w-5 h-5 text-gray-600" />
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setAbout({ ...about, image: url }))} />
                        </label>
                      </div>
                      {about.image && (
                        <img src={about.image} alt="About Preview" className="w-full h-32 object-cover rounded-lg border" />
                      )}
                      <label className="block text-sm font-medium text-gray-700">About Title</label>
                      <input 
                        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                        value={about.title}
                        onChange={(e) => setAbout({ ...about, title: e.target.value })}
                      />
                      <label className="block text-sm font-medium text-gray-700">About Subtitle</label>
                      <textarea 
                        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-brand-blue h-24"
                        value={about.subtitle}
                        onChange={(e) => setAbout({ ...about, subtitle: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="p-6 border border-gray-100 rounded-2xl space-y-4">
                    <h3 className="font-bold text-lg text-brand-blue">Gallery Section</h3>
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">Section Title</label>
                      <input 
                        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                        value={gallerySection.title}
                        onChange={(e) => setGallerySection({ ...gallerySection, title: e.target.value })}
                      />
                      <label className="block text-sm font-medium text-gray-700">Section Subtitle</label>
                      <textarea 
                        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-brand-blue h-24"
                        value={gallerySection.subtitle}
                        onChange={(e) => setGallerySection({ ...gallerySection, subtitle: e.target.value })}
                      />
                      <label className="block text-sm font-medium text-gray-700">Images</label>
                      <div className="space-y-2">
                        {gallery.map((img, idx) => (
                          <div key={idx} className="flex gap-2 items-center">
                            <input 
                              className="flex-1 px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                              value={img}
                              onChange={(e) => {
                                const newGallery = [...gallery];
                                newGallery[idx] = e.target.value;
                                setGallery(newGallery);
                              }}
                            />
                            <label className="cursor-pointer bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                              <Upload className="w-5 h-5 text-gray-600" />
                              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => {
                                const newGallery = [...gallery];
                                newGallery[idx] = url;
                                setGallery(newGallery);
                              })} />
                            </label>
                            <button 
                              onClick={() => {
                                const newGallery = gallery.filter((_, i) => i !== idx);
                                setGallery(newGallery);
                              }}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                        <button 
                          onClick={() => setGallery([...gallery, ''])}
                          className="flex items-center gap-2 text-brand-blue font-medium hover:underline"
                        >
                          <Plus className="w-4 h-4" /> Add Image
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border border-gray-100 rounded-2xl space-y-4">
                    <h3 className="font-bold text-lg text-brand-blue">News & Stories Section</h3>
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">Section Title</label>
                      <input 
                        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                        value={newsSection.title}
                        onChange={(e) => setNewsSection({ ...newsSection, title: e.target.value })}
                      />
                      <label className="block text-sm font-medium text-gray-700">Section Subtitle</label>
                      <textarea 
                        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-brand-blue h-24"
                        value={newsSection.subtitle}
                        onChange={(e) => setNewsSection({ ...newsSection, subtitle: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'programs' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Programs</h2>
                  <button 
                    onClick={() => saveContent('programs', programs)}
                    className="flex items-center gap-2 bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-brand-blue/90"
                  >
                    <Save className="w-4 h-4" /> Save All
                  </button>
                </div>
                <div className="grid gap-4">
                  {programs.map((program, idx) => (
                    <div key={program.id} className="p-4 border border-gray-100 rounded-xl space-y-3">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-48 h-32 shrink-0">
                          <img src={program.image} alt={program.title} className="w-full h-full object-cover rounded-lg border" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <input 
                            className="w-full font-bold text-lg outline-none border-b border-transparent focus:border-brand-blue"
                            value={program.title}
                            onChange={(e) => {
                              const newPrograms = [...programs];
                              newPrograms[idx].title = e.target.value;
                              setPrograms(newPrograms);
                            }}
                          />
                          <div className="flex gap-2">
                            <input 
                              className="flex-1 text-sm text-gray-500 outline-none border-b border-transparent focus:border-brand-blue"
                              placeholder="Image URL"
                              value={program.image}
                              onChange={(e) => {
                                const newPrograms = [...programs];
                                newPrograms[idx].image = e.target.value;
                                setPrograms(newPrograms);
                              }}
                            />
                            <label className="cursor-pointer bg-gray-50 p-1 rounded hover:bg-gray-100">
                              <Upload className="w-4 h-4 text-gray-500" />
                              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => {
                                const newPrograms = [...programs];
                                newPrograms[idx].image = url;
                                setPrograms(newPrograms);
                              })} />
                            </label>
                          </div>
                          <textarea 
                            className="w-full text-gray-600 outline-none border-b border-transparent focus:border-brand-blue resize-none"
                            value={program.description}
                            onChange={(e) => {
                              const newPrograms = [...programs];
                              newPrograms[idx].description = e.target.value;
                              setPrograms(newPrograms);
                            }}
                          />
                        </div>
                        <button 
                          onClick={() => setPrograms(programs.filter((_, i) => i !== idx))}
                          className="text-red-500 p-2 hover:bg-red-50 rounded-lg self-start"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={() => setPrograms([...programs, { id: Date.now().toString(), title: 'New Program', description: 'Description', icon: 'Heart', image: 'https://picsum.photos/seed/program/800/600' }])}
                    className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-brand-blue hover:text-brand-blue transition-all"
                  >
                    <Plus className="w-5 h-5" /> Add Program
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Impact Stats</h2>
                  <button 
                    onClick={() => saveContent('stats', stats)}
                    className="flex items-center gap-2 bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-brand-blue/90"
                  >
                    <Save className="w-4 h-4" /> Save All
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="p-4 border border-gray-100 rounded-xl space-y-2">
                      <input 
                        className="w-full font-bold text-2xl text-brand-blue outline-none"
                        value={stat.value}
                        onChange={(e) => {
                          const newStats = [...stats];
                          newStats[idx].value = e.target.value;
                          setStats(newStats);
                        }}
                      />
                      <input 
                        className="w-full text-gray-600 outline-none"
                        value={stat.label}
                        onChange={(e) => {
                          const newStats = [...stats];
                          newStats[idx].label = e.target.value;
                          setStats(newStats);
                        }}
                      />
                      <button 
                        onClick={() => setStats(stats.filter((_, i) => i !== idx))}
                        className="text-red-500 text-sm hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => setStats([...stats, { label: 'New Stat', value: '0' }])}
                    className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-brand-blue hover:text-brand-blue transition-all"
                  >
                    <Plus className="w-5 h-5" /> Add Stat
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Testimonials</h2>
                  <button 
                    onClick={() => saveContent('testimonials', testimonials)}
                    className="flex items-center gap-2 bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-brand-blue/90"
                  >
                    <Save className="w-4 h-4" /> Save All
                  </button>
                </div>
                <div className="grid gap-4">
                  {testimonials.map((t, idx) => (
                    <div key={idx} className="p-4 border border-gray-100 rounded-xl space-y-3">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-16 h-16 shrink-0">
                          {t.image ? (
                            <img src={t.image} alt={t.author} className="w-full h-full object-cover rounded-full border" />
                          ) : (
                            <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                              <Users className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 space-y-2">
                          <textarea 
                            className="w-full text-gray-600 italic outline-none border-b border-transparent focus:border-brand-blue resize-none"
                            value={t.quote}
                            onChange={(e) => {
                              const newT = [...testimonials];
                              newT[idx].quote = e.target.value;
                              setTestimonials(newT);
                            }}
                          />
                          <div className="flex gap-2">
                            <input 
                              className="flex-1 text-xs text-gray-400 outline-none"
                              placeholder="Author Image URL (optional)"
                              value={t.image || ''}
                              onChange={(e) => {
                                const newT = [...testimonials];
                                newT[idx].image = e.target.value;
                                setTestimonials(newT);
                              }}
                            />
                            <label className="cursor-pointer bg-gray-50 p-1 rounded hover:bg-gray-100">
                              <Upload className="w-3 h-3 text-gray-500" />
                              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => {
                                const newT = [...testimonials];
                                newT[idx].image = url;
                                setTestimonials(newT);
                              })} />
                            </label>
                          </div>
                          <div className="flex gap-4">
                            <input 
                              className="flex-1 font-bold outline-none border-b border-transparent focus:border-brand-blue"
                              value={t.author}
                              onChange={(e) => {
                                const newT = [...testimonials];
                                newT[idx].author = e.target.value;
                                setTestimonials(newT);
                              }}
                            />
                            <input 
                              className="flex-1 text-gray-500 outline-none border-b border-transparent focus:border-brand-blue"
                              value={t.role}
                              onChange={(e) => {
                                const newT = [...testimonials];
                                newT[idx].role = e.target.value;
                                setTestimonials(newT);
                              }}
                            />
                          </div>
                        </div>
                        <button 
                          onClick={() => setTestimonials(testimonials.filter((_, i) => i !== idx))}
                          className="text-red-500 self-start p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={() => setTestimonials([...testimonials, { quote: 'New testimonial', author: 'Name', role: 'Role' }])}
                    className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-brand-blue hover:text-brand-blue transition-all"
                  >
                    <Plus className="w-5 h-5" /> Add Testimonial
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'blog' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Blog Posts</h2>
                  <button 
                    onClick={() => saveContent('blogPosts', blogPosts)}
                    className="flex items-center gap-2 bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-brand-blue/90"
                  >
                    <Save className="w-4 h-4" /> Save All
                  </button>
                </div>
                <div className="grid gap-4">
                  {blogPosts.map((post, idx) => (
                    <div key={post.id} className="p-4 border border-gray-100 rounded-xl space-y-3">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-48 h-32 shrink-0">
                          <img src={post.image} alt={post.title} className="w-full h-full object-cover rounded-lg border" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <input 
                            className="w-full font-bold text-lg outline-none border-b border-transparent focus:border-brand-blue"
                            value={post.title}
                            onChange={(e) => {
                              const newPosts = [...blogPosts];
                              newPosts[idx].title = e.target.value;
                              setBlogPosts(newPosts);
                            }}
                          />
                          <div className="flex gap-2">
                            <input 
                              className="flex-1 text-xs text-gray-400 outline-none"
                              placeholder="Post Image URL"
                              value={post.image}
                              onChange={(e) => {
                                const newPosts = [...blogPosts];
                                newPosts[idx].image = e.target.value;
                                setBlogPosts(newPosts);
                              }}
                            />
                            <label className="cursor-pointer bg-gray-50 p-1 rounded hover:bg-gray-100">
                              <Upload className="w-3 h-3 text-gray-500" />
                              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => {
                                const newPosts = [...blogPosts];
                                newPosts[idx].image = url;
                                setBlogPosts(newPosts);
                              })} />
                            </label>
                          </div>
                          <textarea 
                            className="w-full text-gray-600 outline-none border-b border-transparent focus:border-brand-blue resize-none"
                            value={post.excerpt}
                            onChange={(e) => {
                              const newPosts = [...blogPosts];
                              newPosts[idx].excerpt = e.target.value;
                              setBlogPosts(newPosts);
                            }}
                          />
                          <div className="flex gap-4">
                            <input 
                              className="flex-1 text-sm text-gray-500 outline-none border-b border-transparent focus:border-brand-blue"
                              value={post.category}
                              onChange={(e) => {
                                const newPosts = [...blogPosts];
                                newPosts[idx].category = e.target.value;
                                setBlogPosts(newPosts);
                              }}
                            />
                            <input 
                              className="flex-1 text-sm text-gray-500 outline-none border-b border-transparent focus:border-brand-blue"
                              value={post.date}
                              onChange={(e) => {
                                const newPosts = [...blogPosts];
                                newPosts[idx].date = e.target.value;
                                setBlogPosts(newPosts);
                              }}
                            />
                          </div>
                        </div>
                        <button 
                          onClick={() => setBlogPosts(blogPosts.filter((_, i) => i !== idx))}
                          className="text-red-500 self-start p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={() => setBlogPosts([...blogPosts, { id: Date.now().toString(), title: 'New Post', excerpt: 'Excerpt', date: 'March 2, 2026', category: 'News', image: 'https://picsum.photos/seed/blog/800/600' }])}
                    className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-brand-blue hover:text-brand-blue transition-all"
                  >
                    <Plus className="w-5 h-5" /> Add Post
                  </button>
                </div>
              </div>
            )}
            {activeTab === 'team' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Team Members</h2>
                  <button 
                    onClick={() => saveContent('team', team)}
                    className="flex items-center gap-2 bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-brand-blue/90"
                  >
                    <Save className="w-4 h-4" /> Save All
                  </button>
                </div>
                <div className="grid gap-4">
                  {team.map((member, idx) => (
                    <div key={member.id} className="p-4 border border-gray-100 rounded-xl space-y-3">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-24 h-24 shrink-0">
                          <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full border" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <input 
                            className="w-full font-bold text-lg outline-none border-b border-transparent focus:border-brand-blue"
                            value={member.name}
                            onChange={(e) => {
                              const newTeam = [...team];
                              newTeam[idx].name = e.target.value;
                              setTeam(newTeam);
                            }}
                          />
                          <div className="flex gap-2">
                            <input 
                              className="flex-1 text-xs text-gray-400 outline-none"
                              placeholder="Image URL"
                              value={member.image}
                              onChange={(e) => {
                                const newTeam = [...team];
                                newTeam[idx].image = e.target.value;
                                setTeam(newTeam);
                              }}
                            />
                            <label className="cursor-pointer bg-gray-50 p-1 rounded hover:bg-gray-100">
                              <Upload className="w-3 h-3 text-gray-500" />
                              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => {
                                const newTeam = [...team];
                                newTeam[idx].image = url;
                                setTeam(newTeam);
                              })} />
                            </label>
                          </div>
                          <input 
                            className="w-full text-brand-gold font-medium outline-none border-b border-transparent focus:border-brand-blue"
                            value={member.role}
                            onChange={(e) => {
                                const newTeam = [...team];
                                newTeam[idx].role = e.target.value;
                                setTeam(newTeam);
                            }}
                          />
                        </div>
                        <button 
                          onClick={() => setTeam(team.filter((_, i) => i !== idx))}
                          className="text-red-500 self-start p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={() => setTeam([...team, { id: Date.now().toString(), name: 'New Member', role: 'Role', image: 'https://picsum.photos/seed/team/400/400' }])}
                    className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-brand-blue hover:text-brand-blue transition-all"
                  >
                    <Plus className="w-5 h-5" /> Add Team Member
                  </button>
                </div>
              </div>
            )}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Contact Information</h2>
                  <button 
                    onClick={() => saveContent('contact', contact)}
                    className="flex items-center gap-2 bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-brand-blue/90"
                  >
                    <Save className="w-4 h-4" /> Save Contact Info
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 border border-gray-100 rounded-2xl space-y-4">
                    <h3 className="font-bold text-lg text-brand-blue">Contact Header</h3>
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">Header Image</label>
                      <div className="flex gap-2">
                        <input 
                          className="flex-1 px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                          value={contact.headerImage}
                          onChange={(e) => setContact({ ...contact, headerImage: e.target.value })}
                        />
                        <label className="cursor-pointer bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                          <Upload className="w-5 h-5 text-gray-600" />
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setContact({ ...contact, headerImage: url }))} />
                        </label>
                      </div>
                      <label className="block text-sm font-medium text-gray-700">Header Title</label>
                      <input 
                        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                        value={contact.headerTitle}
                        onChange={(e) => setContact({ ...contact, headerTitle: e.target.value })}
                      />
                      <label className="block text-sm font-medium text-gray-700">Header Subtitle</label>
                      <textarea 
                        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-brand-blue h-24"
                        value={contact.headerSubtitle}
                        onChange={(e) => setContact({ ...contact, headerSubtitle: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="p-6 border border-gray-100 rounded-2xl space-y-4">
                    <h3 className="font-bold text-lg text-brand-blue">Contact Details</h3>
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">Office Address</label>
                      <input 
                        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                        value={contact.address}
                        onChange={(e) => setContact({ ...contact, address: e.target.value })}
                      />
                      <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <input 
                        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                        value={contact.phone}
                        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                      />
                      <label className="block text-sm font-medium text-gray-700">Email Address</label>
                      <input 
                        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                        value={contact.email}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="p-6 border border-gray-100 rounded-2xl space-y-4 md:col-span-2">
                    <h3 className="font-bold text-lg text-brand-blue">Social Media Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Facebook</label>
                        <input 
                          className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                          value={contact.facebook}
                          onChange={(e) => setContact({ ...contact, facebook: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Twitter</label>
                        <input 
                          className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                          value={contact.twitter}
                          onChange={(e) => setContact({ ...contact, twitter: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Instagram</label>
                        <input 
                          className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                          value={contact.instagram}
                          onChange={(e) => setContact({ ...contact, instagram: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                        <input 
                          className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                          value={contact.linkedin}
                          onChange={(e) => setContact({ ...contact, linkedin: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'involved' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Get Involved Page Content</h2>
                  <button 
                    onClick={() => saveContent('involved', involved)}
                    className="flex items-center gap-2 bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-brand-blue/90"
                  >
                    <Save className="w-4 h-4" /> Save Involved Info
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 border border-gray-100 rounded-2xl space-y-4">
                    <h3 className="font-bold text-lg text-brand-blue">Header Section</h3>
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">Header Image</label>
                      <div className="flex gap-2">
                        <input 
                          className="flex-1 px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                          value={involved.headerImage}
                          onChange={(e) => setInvolved({ ...involved, headerImage: e.target.value })}
                        />
                        <label className="cursor-pointer bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                          <Upload className="w-5 h-5 text-gray-600" />
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setInvolved({ ...involved, headerImage: url }))} />
                        </label>
                      </div>
                      <label className="block text-sm font-medium text-gray-700">Header Title</label>
                      <input 
                        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                        value={involved.headerTitle}
                        onChange={(e) => setInvolved({ ...involved, headerTitle: e.target.value })}
                      />
                      <label className="block text-sm font-medium text-gray-700">Header Subtitle</label>
                      <textarea 
                        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-brand-blue h-24"
                        value={involved.headerSubtitle}
                        onChange={(e) => setInvolved({ ...involved, headerSubtitle: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="p-6 border border-gray-100 rounded-2xl space-y-4">
                    <h3 className="font-bold text-lg text-brand-blue">Volunteer Section</h3>
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">Volunteer Title</label>
                      <input 
                        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                        value={involved.volunteerTitle}
                        onChange={(e) => setInvolved({ ...involved, volunteerTitle: e.target.value })}
                      />
                      <label className="block text-sm font-medium text-gray-700">Volunteer Subtitle</label>
                      <textarea 
                        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-brand-blue h-24"
                        value={involved.volunteerSubtitle}
                        onChange={(e) => setInvolved({ ...involved, volunteerSubtitle: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {uploadStatus !== 'idle' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4 w-64">
            {uploadStatus === 'uploading' && (
              <>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-brand-blue h-2.5 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                </div>
                <p className="font-semibold text-brand-blue">Uploading... {uploadProgress}%</p>
              </>
            )}
            {uploadStatus === 'success' && (
              <>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <p className="font-semibold text-green-600">Upload Complete!</p>
              </>
            )}
            {uploadStatus === 'error' && (
              <>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <X className="w-6 h-6 text-red-600" />
                </div>
                <p className="font-semibold text-red-600">Upload Failed</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
