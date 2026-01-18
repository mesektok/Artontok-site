
import React, { useState } from 'react';
import { ViewType } from '../types';

interface NavbarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const [isOpen, setIsOpen] = useState(false);

  // 'admin' 메뉴를 기본 리스트에서 제거 (방문자 보호)
  const navItems = [
    { id: 'home', label: '홈' },
    { id: 'blog', label: '아트온톡' },
    { id: 'coaching', label: '아트코칭' },
    { id: 'club', label: '스피드부자 독서클럽' },
  ];

  // 만약 현재 뷰가 admin이라면 상단에 관리자 모드 표시를 위해 추가 가능 (선택 사항)
  const allItems = currentView === 'admin' 
    ? [...navItems, { id: 'admin', label: '관리자 대시보드' }]
    : navItems;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setView('home')}>
            <span className="text-2xl font-black text-white tracking-tighter">
              ART ON <span className="text-purple-500">TOK</span>
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {allItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id as ViewType)}
                  className={`px-3 py-2 rounded-md text-sm font-bold transition-all ${
                    currentView === item.id 
                      ? 'text-purple-400' 
                      : 'text-gray-400 hover:text-white'
                  } ${item.id === 'admin' ? 'bg-purple-900/20 px-4 ring-1 ring-purple-500/30' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-b border-purple-900/30 animate-in slide-in-from-top-4 duration-300">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {allItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setView(item.id as ViewType);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-bold transition-all ${
                  currentView === item.id 
                    ? 'text-purple-400 bg-purple-900/10' 
                    : 'text-gray-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
