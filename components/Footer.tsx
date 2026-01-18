
import React from 'react';
import { SiteSettings, ViewType } from '../types';

interface FooterProps {
  settings: SiteSettings;
  onNavigate?: (view: ViewType) => void;
}

const Footer: React.FC<FooterProps> = ({ settings, onNavigate }) => {
  const handleServiceClick = (view: ViewType) => {
    if (onNavigate) {
      onNavigate(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black border-t border-purple-900/30 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-black text-white tracking-tighter">
              ART ON <span className="text-purple-500">TOK</span>
            </span>
            <p className="mt-6 text-gray-500 text-sm leading-relaxed max-w-sm font-light">
              예술적 가치를 경제적 자산으로 전환하는 프리미엄 아트 코칭 서비스. 
              스피드부자 독서클럽 멤버십을 통해 더 높은 수준의 통찰을 경험하십시오.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-black text-purple-400 uppercase tracking-widest mb-6">Service</h3>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li onClick={() => handleServiceClick('coaching')} className="hover:text-purple-400 cursor-pointer transition-colors flex items-center gap-2">
                1:1 아트코칭
              </li>
              <li onClick={() => handleServiceClick('coaching')} className="hover:text-purple-400 cursor-pointer transition-colors">
                아트 딜러 프로그램
              </li>
              <li onClick={() => handleServiceClick('club')} className="hover:text-purple-400 cursor-pointer transition-colors flex items-center gap-2">
                VIP 독서클럽 리포트 <span className="text-[9px] bg-purple-900/50 px-1.5 py-0.5 rounded text-purple-300">Member</span>
              </li>
              <li onClick={() => handleServiceClick('home')} className="hover:text-purple-400 cursor-pointer transition-colors">
                프라이빗 옥션 투어
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-black text-purple-400 uppercase tracking-widest mb-6">Connect</h3>
            <div className="flex flex-col space-y-4 text-sm text-gray-400 font-light">
              <a href={settings.socialLinks.instagram} className="hover:text-purple-400 transition-colors">Instagram</a>
              <a href={settings.socialLinks.youtube} className="hover:text-purple-400 transition-colors">YouTube</a>
              <a href={settings.socialLinks.facebook} className="hover:text-purple-400 transition-colors">Facebook</a>
            </div>
          </div>
        </div>
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
             <span className="text-gray-600 text-[11px] font-medium tracking-wide">
              &copy; {new Date().getFullYear()} Art On Tok. Intellectual Property Reserved.
            </span>
            <button 
              onClick={() => handleServiceClick('admin')}
              className="text-zinc-800 hover:text-zinc-700 transition-colors text-[10px] ml-1 font-bold"
            >
              Admin
            </button>
          </div>
          <div className="flex gap-8 text-[11px] text-gray-600 font-medium">
             <span className="hover:text-gray-400 cursor-pointer">개인정보처리방침</span>
             <span className="hover:text-gray-400 cursor-pointer">이용약관</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
