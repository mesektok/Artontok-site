
import React, { useState, useEffect } from 'react';
import { INITIAL_SETTINGS, SAMPLE_POSTS } from './constants';
import { Post, SiteSettings, ViewType } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Club from './pages/Club';
import Blog from './pages/Blog';
import Dashboard from './pages/Dashboard';
import Coaching from './pages/Coaching';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('home');
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [posts, setPosts] = useState<Post[]>(SAMPLE_POSTS);

  // Persistence with Improved Error Handling
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('artontok_settings');
      const savedPosts = localStorage.getItem('artontok_posts');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        if (parsedSettings && typeof parsedSettings === 'object') {
          setSettings(parsedSettings);
        }
      }
      if (savedPosts) {
        const parsedPosts = JSON.parse(savedPosts);
        if (Array.isArray(parsedPosts)) {
          setPosts(parsedPosts);
        }
      }
    } catch (error) {
      console.warn("Could not load saved data from localStorage:", error);
    }
  }, []);

  // Automatic scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const saveSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    localStorage.setItem('artontok_settings', JSON.stringify(newSettings));
  };

  const addPost = (newPost: Post) => {
    const updated = [newPost, ...posts];
    setPosts(updated);
    localStorage.setItem('artontok_posts', JSON.stringify(updated));
  };

  const deletePost = (id: string) => {
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated);
    localStorage.setItem('artontok_posts', JSON.stringify(updated));
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return <Home settings={settings} posts={posts} onNavigate={setView} />;
      case 'coaching':
        return <Coaching settings={settings} />;
      case 'club':
        return <Club settings={settings} posts={posts.filter(p => p.category === 'club')} />;
      case 'blog':
        return <Blog posts={posts} />;
      case 'admin':
        return (
          <Dashboard 
            settings={settings} 
            posts={posts} 
            onSaveSettings={saveSettings} 
            onAddPost={addPost}
            onDeletePost={deletePost}
          />
        );
      default:
        return <Home settings={settings} posts={posts} onNavigate={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white antialiased">
      <Navbar currentView={view} setView={setView} />
      <main className="pt-16 min-h-[calc(100vh-160px)]">
        {renderContent()}
      </main>
      <Footer settings={settings} onNavigate={setView} />
    </div>
  );
};

export default App;
