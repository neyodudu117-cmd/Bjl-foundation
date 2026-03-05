import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Save, Plus, Trash2, Edit2, Check, X, Upload, Image as ImageIcon, Users } from 'lucide-react';
import { PROGRAMS, STATS, TESTIMONIALS, BLOG_POSTS } from '../constants';
import { Program, Stat, Testimonial, BlogPost, TeamMember, ContactInfo, InvolvedContent } from '../types';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { fetchContent as fetchContentService, saveContent as saveContentService } from '../services/contentService';
import { useToast } from '../components/Toast';

export const Admin = () => {
  const { addToast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [activeTab, setActiveTab] = useState<'general' | 'programs' | 'stats' | 'testimonials' | 'blog' | 'team' | 'contact' | 'involved'>('general');
  
  const [hero, setHero] = useState({ title: '', subtitle: '', image: '' });
  const [about, setAbout] = useState({ title: '', subtitle: '', image: '' });
  const [gallery, setGallery] = useState<string[]>([]);
  const [gallerySection, setGallerySection] = useState({ title: '', subtitle: '' });
  const [newsSection, setNewsSection] = useState({ title: '', subtitle: '' });
  const [settings, setSettings] = useState({ logo: '', favicon: '', backgroundColor: '#ffffff' });
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
  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingContent, setIsLoadingContent] = useState(false);

  const confirmSave = () => window.confirm('Are you sure you want to save these changes?');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, username, password);
      } else {
        await signInWithEmailAndPassword(auth, username, password);
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Email already in use. Please login.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password.');
      } else {
        setError('Authentication failed. Please try again.');
      }
    }
  };

  const fetchContent = async () => {
    setIsLoadingContent(true);
    try {
      setHero(await fetchContentService('hero', { 
        title: 'Manifesting God’s Dominion Worldwide.', 
        subtitle: 'To disciple nations by transforming societal structures through biblical principles.',
        image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1920'
      }));
      
      setAbout(await fetchContentService('about', {
        title: 'Our Mission & Vision',
        subtitle: 'Banji Lagunju Foundation works to manifest God’s dominion in all nations worldwide through the church.',
        image: 'https://images.unsplash.com/photo-1524069290683-0457abfe42c3?auto=format&fit=crop&q=80&w=800'
      }));

      setPrograms(await fetchContentService('programs', PROGRAMS));
      setStats(await fetchContentService('stats', STATS));
      setTestimonials(await fetchContentService('testimonials', TESTIMONIALS));
      setBlogPosts(await fetchContentService('blogPosts', BLOG_POSTS));
      
      setTeam(await fetchContentService('team', [
        { id: '1', name: 'Banji Lagunju', role: 'Founder & Chairman', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },
        { id: '2', name: 'Dr. Jane Smith', role: 'Executive Director', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400' },
        { id: '3', name: 'Robert Wilson', role: 'Head of Programs', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400' }
      ]));

      setContact(await fetchContentService('contact', {
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
      }));

      setInvolved(await fetchContentService('involved', {
        headerImage: 'https://images.unsplash.com/photo-1559027615-cd26714e93af?auto=format&fit=crop&q=80&w=1920',
        headerTitle: 'Get Involved',
        headerSubtitle: 'There are many ways to support our mission. Join us in creating lasting change for communities in need.',
        volunteerTitle: 'Become a Volunteer',
        volunteerSubtitle: 'Ready to take the first step? Fill out the form and our volunteer coordinator will get in touch with you shortly.'
      }));

      setGallery(await fetchContentService('gallery', [
        'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1524069290683-0457abfe42c3?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=400'
      ]));

      setGallerySection(await fetchContentService('gallerySection', {
        title: 'Our Gallery',
        subtitle: 'Follow our journey and see the impact of our programs through our lens.'
      }));

      setNewsSection(await fetchContentService('newsSection', {
        title: 'Latest News & Stories',
        subtitle: 'Stay updated with our latest projects, success stories, and community updates.'
      }));

      setSettings(await fetchContentService('settings', {
        logo: '',
        favicon: '',
        backgroundColor: '#ffffff'
      }));
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setIsLoadingContent(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, onUpload: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input value to allow selecting the same file again
    e.target.value = '';

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/x-icon'];
    if (!validTypes.includes(file.type)) {
      addToast('Invalid file type. Please upload an image (JPG, PNG, GIF, WEBP, SVG, ICO).', 'error');
      return;
    }

    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      addToast(`File is too large (${(file.size / (1024 * 1024)).toFixed(2)}MB). Maximum allowed size is 10MB.`, 'error');
      return;
    }

    setIsUploading(true);
    addToast('Uploading image...', 'info');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = 'Upload failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          errorMessage = `Upload failed with status: ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Upload successful, URL:', data.url);
      onUpload(data.url);
      addToast('Image uploaded successfully!', 'success');
    } catch (error: any) {
      console.error('Upload failed', error);
      addToast(error.message || 'An unexpected error occurred during upload.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const saveContent = async (key: string, value: any, silent = false) => {
    try {
      await saveContentService(key, value);
      if (!silent) addToast('Saved successfully!', 'success');
    } catch (err) {
      console.error(err);
      if (!silent) addToast('Failed to save', 'error');
      throw err;
    }
  };

  const handleSaveGeneral = async () => {
    if (!confirmSave()) return;
    try {
      console.log('Saving general settings...');
      const tasks = [
        { key: 'hero', value: hero },
        { key: 'about', value: about },
        { key: 'gallery', value: gallery },
        { key: 'gallerySection', value: gallerySection },
        { key: 'newsSection', value: newsSection },
        { key: 'settings', value: settings }
      ];
      
      await Promise.all(tasks.map(async (task) => {
        try {
          console.log(`Saving ${task.key}:`, task.value);
          await saveContent(task.key, task.value, true);
        } catch (err) {
          console.error(`Error saving ${task.key}:`, err);
          throw err;
        }
      }));
      
      addToast('General settings saved successfully!', 'success');
    } catch (error) {
      console.error('Error saving general settings:', error);
      addToast(`Failed to save general settings: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        fetchContent();
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
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
            <h1 className="text-2xl font-bold text-brand-blue">{isRegistering ? 'Create Admin Account' : 'Admin Login'}</h1>
          </div>
          
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none"
                placeholder="admin@example.com"
                required
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
                required
                minLength={6}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button 
              type="submit"
              className="w-full bg-brand-blue text-white py-3 rounded-lg font-semibold hover:bg-brand-blue/90 transition-colors"
            >
              {isRegistering ? 'Create Account' : 'Login'}
            </button>
            
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setError('');
                }}
                className="text-sm text-brand-blue hover:underline"
              >
                {isRegistering ? 'Already have an account? Login' : 'Need an account? Create one'}
              </button>
            </div>
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
          <div className="flex items-center gap-4">
            {isLoadingContent && <span className="text-sm text-gray-500">Loading content...</span>}
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
                      onClick={handleSaveGeneral}
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
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setSettings(prev => ({ ...prev, logo: url })))} />
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
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setSettings(prev => ({ ...prev, favicon: url })))} />
                        </label>
                      </div>
                      {settings.favicon && (
                        <div className="p-2 bg-gray-100 rounded-lg inline-block">
                          <img src={settings.favicon} alt="Favicon Preview" className="h-8 w-8 object-contain" />
                        </div>
                      )}

                      <label className="block text-sm font-medium text-gray-700 mt-2">Background Color</label>
                      <input 
                        type="color"
                        className="w-full h-10 px-1 py-1 border rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                        value={settings.backgroundColor}
                        onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
                      />
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
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setHero(prev => ({ ...prev, image: url })))} />
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
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setAbout(prev => ({ ...prev, image: url })))} />
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
                                setGallery(prev => {
                                  const newGallery = [...prev];
                                  newGallery[idx] = url;
                                  return newGallery;
                                });
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
                    onClick={() => { if (confirmSave()) saveContent('programs', programs); }}
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
                                setPrograms(prev => {
                                  const newPrograms = [...prev];
                                  newPrograms[idx].image = url;
                                  return newPrograms;
                                });
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
                    onClick={() => { if (confirmSave()) saveContent('stats', stats); }}
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
                    onClick={() => { if (confirmSave()) saveContent('testimonials', testimonials); }}
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
                                setTestimonials(prev => {
                                  const newT = [...prev];
                                  newT[idx].image = url;
                                  return newT;
                                });
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
                    onClick={() => { if (confirmSave()) saveContent('blogPosts', blogPosts); }}
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
                                setBlogPosts(prev => {
                                  const newPosts = [...prev];
                                  newPosts[idx].image = url;
                                  return newPosts;
                                });
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
                    onClick={() => { if (confirmSave()) saveContent('team', team); }}
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
                                setTeam(prev => {
                                  const newTeam = [...prev];
                                  newTeam[idx].image = url;
                                  return newTeam;
                                });
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
                    onClick={() => { if (confirmSave()) saveContent('contact', contact); }}
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
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setContact(prev => ({ ...prev, headerImage: url })))} />
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
                    onClick={() => { if (confirmSave()) saveContent('involved', involved); }}
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
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setInvolved(prev => ({ ...prev, headerImage: url })))} />
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
    </div>
  );
};
