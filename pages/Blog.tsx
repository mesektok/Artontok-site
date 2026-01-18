
import React, { useState } from 'react';
import { Post } from '../types';

interface BlogProps {
  posts: Post[];
}

const Blog: React.FC<BlogProps> = ({ posts }) => {
  const [filter, setFilter] = useState<'all' | 'art' | 'club'>('all');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const filteredPosts = filter === 'all' ? posts : posts.filter(p => p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
        <div>
          <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tighter uppercase">Archive</h1>
          <p className="text-gray-500 font-light italic">예술과 부의 인사이트를 기록하는 공간</p>
        </div>
        <div className="flex bg-zinc-900/50 backdrop-blur-sm p-1.5 rounded-2xl border border-white/5 shadow-inner">
          {(['all', 'art', 'club'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2.5 rounded-xl text-xs font-black tracking-widest transition-all duration-300 ${
                filter === f 
                  ? 'bg-purple-600 text-white shadow-xl shadow-purple-600/20' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {f === 'all' ? 'ALL' : f === 'art' ? 'ART' : 'CLUB'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <article 
              key={post.id} 
              onClick={() => setSelectedPost(post)}
              className="group cursor-pointer flex flex-col h-full bg-zinc-900/10 hover:bg-zinc-900/30 border border-transparent hover:border-purple-500/20 rounded-[2rem] transition-all duration-500 p-4"
            >
              <div className="relative aspect-[16/11] mb-6 overflow-hidden rounded-[1.5rem] bg-zinc-800">
                <img 
                  src={post.imageUrl} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={post.title} 
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-[9px] font-black tracking-[0.2em] uppercase border border-white/10 text-purple-400">
                  {post.category}
                </div>
              </div>
              <div className="px-2 pb-4 flex flex-col flex-1">
                <span className="text-[10px] text-gray-500 font-medium mb-3">{post.createdAt}</span>
                <h3 className="text-xl font-bold leading-tight group-hover:text-purple-400 transition-colors mb-4 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-3 font-light leading-relaxed mb-6">
                  {post.content}
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {post.seoTags?.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] text-zinc-600">#{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full py-32 text-center">
            <div className="inline-block p-6 rounded-full bg-white/5 mb-6">
               <svg className="w-8 h-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
               </svg>
            </div>
            <p className="text-gray-500 italic font-light tracking-wide">아직 등록된 게시글이 없습니다.</p>
          </div>
        )}
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 overflow-hidden">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-lg" onClick={() => setSelectedPost(null)}></div>
          <div className="relative bg-zinc-900 w-full max-w-4xl max-h-[90vh] rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(139,92,246,0.1)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-500">
            <button 
              onClick={() => setSelectedPost(null)}
              className="absolute top-8 right-10 z-20 p-3 bg-black/60 hover:bg-purple-600 rounded-full transition-all duration-300 text-white shadow-xl active:scale-90"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="overflow-y-auto overflow-x-hidden scroll-smooth">
              <div className="h-[400px] w-full relative">
                <img src={selectedPost.imageUrl} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent"></div>
                <div className="absolute bottom-10 left-10 md:left-16 right-10 md:right-16">
                   <div className="flex items-center gap-3 mb-6">
                    <span className="px-4 py-1.5 bg-purple-600/80 backdrop-blur-md rounded-full text-[10px] font-black tracking-[0.2em] uppercase border border-white/20">
                      {selectedPost.category === 'art' ? 'Art Coaching' : selectedPost.category === 'club' ? 'Book Club' : 'Notice'}
                    </span>
                    <span className="text-xs text-white/60 font-medium">{selectedPost.createdAt}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tighter">
                    {selectedPost.title}
                  </h2>
                </div>
              </div>

              <div className="p-10 md:p-16 lg:p-20 pt-10">
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed whitespace-pre-wrap font-light">
                    {selectedPost.content}
                  </p>
                </div>
                
                <div className="mt-20 pt-12 border-t border-white/5 flex flex-wrap gap-3">
                  {selectedPost.seoTags?.map(tag => (
                    <span key={tag} className="text-[11px] px-5 py-2.5 bg-zinc-800/50 hover:bg-purple-600/10 border border-white/5 rounded-full text-gray-400 hover:text-purple-400 transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="mt-16 p-10 rounded-[2rem] bg-gradient-to-br from-purple-900/20 to-zinc-900 border border-purple-500/10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="text-center md:text-left">
                    <h4 className="text-xl font-black mb-2 italic">Inspiring Growth through Art</h4>
                    <p className="text-sm text-gray-500">아트 온 톡은 당신의 미적 경험을 부의 가치로 전환합니다.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedPost(null);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-8 py-4 bg-white text-black text-sm font-black rounded-full hover:bg-purple-500 hover:text-white transition-all duration-500 shadow-xl"
                  >
                    문의하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
