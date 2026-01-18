
import React, { useState } from 'react';
import { SiteSettings, Post, ViewType } from '../types';

interface HomeProps {
  settings: SiteSettings;
  posts: Post[];
  onNavigate: (view: ViewType) => void;
}

const Home: React.FC<HomeProps> = ({ settings, posts, onNavigate }) => {
  const [showAuctionModal, setShowAuctionModal] = useState(false);
  const blogPosts = posts.slice(0, 4);

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=1972" 
            className="w-full h-full object-cover opacity-40 grayscale"
            alt="Luxurious Art Gallery"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter font-serif">
            {settings.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
            {settings.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => onNavigate('coaching')}
              className="group relative px-8 py-4 bg-purple-600 overflow-hidden text-white font-bold rounded-full transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">아트코칭 시작하기</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            <button 
              onClick={() => onNavigate('blog')}
              className="px-8 py-4 bg-transparent border-2 border-purple-500/50 hover:border-purple-500 text-white font-bold rounded-full transition-all active:scale-95"
            >
              아트온톡 구경하기
            </button>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-24 bg-zinc-950 border-y border-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-purple-500 text-sm font-bold tracking-[0.3em] uppercase mb-4">Core Services</h2>
            <h3 className="text-4xl md:text-5xl font-black mb-6">예술적 감각이 <span className="text-purple-400">자산</span>이 되는 여정</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 'coaching', title: '1:1 아트코칭', desc: '개인 맞춤형 안목 성장 및 컬렉팅 가이드', link: () => onNavigate('coaching') },
              { id: 'dealer', title: '아트 딜러 양성', desc: '미술 시장 전문가로 거듭나는 실전 과정', link: () => onNavigate('coaching') },
              { id: 'club', title: 'VIP 클럽 리포트', desc: '분기별 심층 아트테크 분석 보고서', link: () => onNavigate('club') },
              { id: 'auction', title: '프라이빗 옥션 투어', desc: '거장들의 숨결을 느끼는 현장 도슨트', link: () => setShowAuctionModal(true) }
            ].map((feature, i) => (
              <div 
                key={i} 
                onClick={feature.link}
                className="p-8 bg-black border border-white/5 rounded-2xl hover:border-purple-500/40 transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 bg-purple-900/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                  <span className="text-purple-500 font-bold group-hover:text-white text-xs">S{i+1}</span>
                </div>
                <h4 className="text-lg font-bold mb-4">{feature.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed mb-6">{feature.desc}</p>
                <span className="text-[10px] text-purple-400 font-black uppercase tracking-widest group-hover:translate-x-1 inline-block transition-transform">Explore →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Private Auction Tour Teaser */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
             <div className="flex-1 order-2 md:order-1">
                <div className="grid grid-cols-2 gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600" 
                    className="rounded-2xl w-full h-64 object-cover shadow-2xl" 
                    alt="Auction Art Highlights" 
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=600" 
                    className="rounded-2xl w-full h-64 object-cover mt-8 border border-white/5 shadow-2xl" 
                    alt="Exclusive Gallery Tour" 
                  />
                </div>
             </div>
             <div className="flex-1 order-1 md:order-2">
                <span className="text-purple-500 font-serif italic text-xl">The Hidden Value</span>
                <h2 className="text-4xl md:text-6xl font-black mt-4 mb-8 leading-tight">프라이빗 <br /><span className="text-purple-500">옥션 투어</span></h2>
                <p className="text-gray-400 text-lg mb-10 leading-relaxed font-light">
                  서울옥션, 케이옥션 등 국내 메이저 옥션의 하이라이트를 전문 아트 코치와 함께 투어합니다. 
                  낙찰가 예측부터 작품의 보존 상태 체크까지, 현장감 넘치는 지식을 직접 경험하십시오.
                </p>
                <button 
                  onClick={() => setShowAuctionModal(true)}
                  className="px-8 py-4 bg-zinc-900 border border-white/10 rounded-full hover:bg-white hover:text-black font-bold transition-all active:scale-95"
                >
                  투어 일정 문의하기
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-24 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-2">아트 온 톡 아카이브</h2>
              <p className="text-gray-400 italic font-light">artontok.kr - 예술과 경제의 기록</p>
            </div>
            <button onClick={() => onNavigate('blog')} className="group flex items-center gap-2 text-purple-400 font-bold hover:text-white transition-colors">
              전체보기 →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogPosts.map((post) => (
              <div 
                key={post.id} 
                onClick={() => onNavigate('blog')} 
                className="group cursor-pointer bg-zinc-900/30 rounded-xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className="text-[10px] text-purple-500 font-black tracking-widest uppercase mb-2 block">{post.category}</span>
                  <h3 className="text-lg font-bold line-clamp-1 mb-2 group-hover:text-purple-400">{post.title}</h3>
                  <p className="text-gray-500 text-xs line-clamp-2 font-light">{post.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Auction Modal */}
      {showAuctionModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setShowAuctionModal(false)}></div>
          <div className="relative bg-zinc-900 w-full max-w-2xl p-10 md:p-16 rounded-[3rem] border border-purple-500/20 shadow-2xl animate-in zoom-in-95">
             <button onClick={() => setShowAuctionModal(false)} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
             <h3 className="text-3xl font-black mb-6">Auction Tour Inquiry</h3>
             <p className="text-gray-400 mb-10 leading-relaxed font-light">다음 투어 일정과 프라이빗 참석 권한에 대한 상세 안내를 보내드립니다. 예술 투자의 살아있는 현장에 여러분을 초대합니다.</p>
             <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('문의가 성공적으로 접수되었습니다. 곧 연락드리겠습니다.'); setShowAuctionModal(false); }}>
                <input type="text" placeholder="성함" className="w-full bg-black border border-white/10 p-4 rounded-xl outline-none focus:border-purple-500 transition-all" required />
                <input type="tel" placeholder="연락처" className="w-full bg-black border border-white/10 p-4 rounded-xl outline-none focus:border-purple-500 transition-all" required />
                <button className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-xl transition-all active:scale-[0.98]">투어 브로셔 신청</button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
