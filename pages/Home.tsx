
import React from 'react';
import { SiteSettings, Post } from '../types';

interface HomeProps {
  settings: SiteSettings;
  posts: Post[];
  onNavigate: (view: any) => void;
}

const Home: React.FC<HomeProps> = ({ settings, posts, onNavigate }) => {
  const latestArtPosts = posts.filter(p => p.category === 'art').slice(0, 3);
  const blogPosts = posts.slice(0, 4);

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=1972" 
            className="w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
            alt="Artistic background"
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
              className="group relative px-8 py-4 bg-purple-600 overflow-hidden text-white font-bold rounded-full transition-all hover:scale-105"
            >
              <span className="relative z-10">아트코칭 시작하기</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            <button 
              onClick={() => onNavigate('blog')}
              className="px-8 py-4 bg-transparent border-2 border-purple-500/50 hover:border-purple-500 text-white font-bold rounded-full transition-all"
            >
              아트온톡 구경하기
            </button>
          </div>
        </div>
      </section>

      {/* Section 1: Art Coaching (Service Focus) */}
      <section className="py-24 bg-zinc-950 border-y border-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-purple-500 text-sm font-bold tracking-[0.3em] uppercase mb-4">ART COACHING</h2>
            <h3 className="text-4xl md:text-5xl font-black mb-6">예술적 감각이 <span className="text-purple-400">자산</span>이 됩니다</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">아트 온 톡의 전문 코치들이 당신의 미적 취향을 발견하고, 가치 있는 컬렉팅의 세계로 안내합니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: '1:1 맞춤 코칭', desc: '개인의 라이프스타일과 투자 성향을 분석하여 최적의 작품을 제안합니다.' },
              { title: '아트 딜링 서비스', desc: '국내외 유망 작가의 작품을 합리적인 가격에 소장할 수 있는 루트를 제공합니다.' },
              { title: '컬렉터 네트워크', desc: '예술을 사랑하는 고액 자산가들과의 프라이빗한 네트워킹을 지원합니다.' }
            ].map((feature, i) => (
              <div key={i} className="p-8 bg-black border border-white/5 rounded-2xl hover:border-purple-500/40 transition-all group">
                <div className="w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-purple-500 font-bold">0{i+1}</span>
                </div>
                <h4 className="text-xl font-bold mb-4">{feature.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Art On Tok (Blog/Post Preview) */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-2">아트 온 톡 아카이브</h2>
              <p className="text-gray-400 italic">artontok.kr - 예술과 경제의 모든 이야기</p>
            </div>
            <button 
              onClick={() => onNavigate('blog')}
              className="group flex items-center gap-2 text-purple-400 hover:text-purple-300 font-bold"
            >
              전체보기 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
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
                  <p className="text-gray-500 text-xs line-clamp-2">{post.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speed Rich Club Section */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/20 rounded-3xl p-12 md:p-20 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full"></div>
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                  <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">스피드부자 독서클럽에서 <br /><span className="text-purple-500">다음 단계</span>로.</h2>
                  <p className="text-gray-300 text-lg mb-10 max-w-lg">
                    예술 소장은 단순한 취미를 넘어 자산 포트폴리오의 핵심이 됩니다. 
                    전문적인 딜링과 독서클럽 멤버십을 통해 더 빠른 부의 성장을 경험하세요.
                  </p>
                  <button 
                    onClick={() => onNavigate('club')}
                    className="px-10 py-4 bg-white text-black font-black rounded-full hover:bg-gray-200 transition-all"
                  >
                    독서클럽 혜택 확인하기
                  </button>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                  <div className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center">
                    <div className="text-4xl font-black text-white mb-2">98%</div>
                    <div className="text-gray-500 text-xs uppercase tracking-widest font-bold">Satisfaction</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center mt-10">
                    <div className="text-4xl font-black text-purple-500 mb-2">120+</div>
                    <div className="text-gray-500 text-xs uppercase tracking-widest font-bold">VIP Members</div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
