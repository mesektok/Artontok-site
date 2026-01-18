
export interface Post {
  id: string;
  title: string;
  content: string;
  category: 'art' | 'club' | 'notice';
  imageUrl: string;
  createdAt: string;
  seoTags: string[];
}

export interface SiteSettings {
  siteName: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
}

export type ViewType = 'home' | 'coaching' | 'club' | 'blog' | 'admin';
