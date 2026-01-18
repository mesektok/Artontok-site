
import React, { useState } from 'react';
import { SiteSettings, Post } from '../types';
import { generateSEOKeywords, suggestArtTopic } from '../services/geminiService';

interface DashboardProps {
  settings: SiteSettings;
  posts: Post[];
  onSaveSettings: (settings: SiteSettings) => void;
  onAddPost: (post: Post) => void;
  onDeletePost: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ settings, posts, onSaveSettings, onAddPost, onDeletePost }) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'posts'>('posts');
  const [editingSettings, setEditingSettings] = useState(settings);
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [isGeneratingSEO, setIsGeneratingSEO] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);

  const [newPost, setNewPost] = useState<Omit<Post, 'id' | 'createdAt' | 'seoTags'>>({
    title: '',
    content: '',
    category: 'art',
    imageUrl: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=800'
  });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(editingSettings);
    alert('설정이 안전하게 저장되었습니다.');
  };

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) return;

    setIsGeneratingSEO(true);
    try {
      const keywords = await generateSEOKeywords(newPost.title, newPost.content);
      const post: Post = {
        ...newPost,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0],
        seoTags: keywords || []
      };
      onAddPost(post);
      setNewPost({ title: '', content: '', category: 'art', imageUrl: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=800' });
      setIsAddingPost(false);
    } catch (err) {
      console.error("Post creation failed:", err);
      alert("글 게시 중 오류가 발생했습니다.");
    } finally {
      setIsGeneratingSEO(false);
    }
  };

  const handleAiSuggest = async () => {
    setIsSuggesting(true);
    try {
      const suggestion = await suggestArtTopic();
      setAiSuggestion(suggestion || null);
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">ADMIN <span className="text-purple-500">CENTER</span></h1>
          <p className="text-gray-500 font-light mt-1">아트 온 톡 서비스의 모든 콘텐츠를 관리합니다.</p>
        </div>
        <div className="flex bg-zinc-900 p-1 rounded-xl border border-white/5">
          <button 
            onClick={() => setActiveTab('posts')}
            className={`px-6 py-2 rounded-lg text-sm font-black tracking-widest transition-all ${activeTab === 'posts' ? 'bg-purple-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            POSTS
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-2 rounded-lg text-sm font-black tracking-widest transition-all ${activeTab === 'settings' ? 'bg-purple-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            SETTINGS
          </button>
        </div>
      </div>

      {activeTab === 'settings' ? (
        <div className="bg-zinc-950 p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <h2 className="text-2xl font-bold mb-8">일반 사이트 설정</h2>
          <form onSubmit={handleSaveSettings} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">웹사이트 이름</label>
                <input 
                  type="text" 
                  value={editingSettings.siteName}
                  onChange={e => setEditingSettings({...editingSettings, siteName: e.target.value})}
                  className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-sm focus:border-purple-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">포인트 컬러</label>
                <input 
                  type="text" 
                  value={editingSettings.accentColor}
                  onChange={e => setEditingSettings({...editingSettings, accentColor: e.target.value})}
                  className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-sm focus:border-purple-500 outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">히어로 메인 타이틀</label>
              <input 
                type="text" 
                value={editingSettings.heroTitle}
                onChange={e => setEditingSettings({...editingSettings, heroTitle: e.target.value})}
                className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-sm focus:border-purple-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">히어로 서브 설명</label>
              <textarea 
                value={editingSettings.heroSubtitle}
                onChange={e => setEditingSettings({...editingSettings, heroSubtitle: e.target.value})}
                rows={3}
                className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-sm focus:border-purple-500 outline-none transition-all resize-none"
              />
            </div>
            <div className="flex justify-end pt-4">
              <button type="submit" className="px-10 py-4 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-xl transition-all shadow-xl shadow-purple-600/20 active:scale-95">
                변경사항 저장하기
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold">전체 콘텐츠 목록 ({posts.length})</h2>
            <div className="flex gap-3 w-full sm:w-auto">
               <button 
                onClick={handleAiSuggest}
                disabled={isSuggesting}
                className="flex-1 sm:flex-none px-6 py-3 border border-purple-500/30 text-purple-400 rounded-xl text-sm font-bold hover:bg-purple-500/10 transition-all disabled:opacity-50"
              >
                {isSuggesting ? 'Thinking...' : '✨ AI 테마 추천'}
              </button>
              <button 
                onClick={() => setIsAddingPost(true)}
                className="flex-1 sm:flex-none px-6 py-3 bg-purple-600 text-white rounded-xl text-sm font-black hover:bg-purple-700 transition-all active:scale-95 shadow-lg shadow-purple-600/20"
              >
                + 새 게시글 작성
              </button>
            </div>
          </div>

          {aiSuggestion && (
            <div className="p-6 bg-purple-900/10 border border-purple-500/20 rounded-2xl animate-in slide-in-from-top-4 duration-300 relative group">
              <button onClick={() => setAiSuggestion(null)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <p className="text-purple-300 text-sm leading-relaxed">
                <span className="font-black text-purple-400 mr-2">PROMPT IDEA:</span> {aiSuggestion}
              </p>
            </div>
          )}

          {isAddingPost && (
            <div className="bg-zinc-950 p-8 md:p-12 rounded-[2.5rem] border-2 border-purple-500/50 shadow-2xl animate-in zoom-in-95 duration-200">
              <h3 className="text-xl font-bold mb-8">새 게시글 에디터</h3>
              <form onSubmit={handleAddPost} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 tracking-widest uppercase">제목</label>
                    <input 
                      type="text" 
                      placeholder="글 제목을 입력하세요" 
                      required
                      value={newPost.title}
                      onChange={e => setNewPost({...newPost, title: e.target.value})}
                      className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-sm outline-none focus:border-purple-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 tracking-widest uppercase">카테고리</label>
                    <select 
                      value={newPost.category}
                      onChange={e => setNewPost({...newPost, category: e.target.value as any})}
                      className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-sm outline-none focus:border-purple-500 appearance-none cursor-pointer"
                    >
                      <option value="art">아트코칭</option>
                      <option value="club">독서클럽 리포트</option>
                      <option value="notice">공지사항</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 tracking-widest uppercase">콘텐츠 내용</label>
                  <textarea 
                    placeholder="내용을 상세히 입력하세요..." 
                    required
                    rows={8}
                    value={newPost.content}
                    onChange={e => setNewPost({...newPost, content: e.target.value})}
                    className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-sm outline-none focus:border-purple-500 transition-all resize-none"
                  />
                </div>
                <div className="flex justify-end gap-4 pt-4 border-t border-white/5">
                  <button 
                    type="button" 
                    onClick={() => setIsAddingPost(false)}
                    className="px-8 py-4 text-gray-500 hover:text-white font-bold transition-all"
                  >
                    취소하기
                  </button>
                  <button 
                    type="submit" 
                    disabled={isGeneratingSEO}
                    className="px-10 py-4 bg-purple-600 text-white font-black rounded-xl hover:bg-purple-700 disabled:opacity-50 transition-all shadow-xl shadow-purple-600/20 active:scale-95"
                  >
                    {isGeneratingSEO ? 'SEO 분석 및 업로드 중...' : '작성 완료 및 게시'}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="overflow-hidden bg-zinc-950 rounded-[2rem] border border-white/5 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/50 text-gray-500 text-[10px] uppercase font-black tracking-widest">
                    <th className="py-6 px-8">Title</th>
                    <th className="py-6 px-8">Category</th>
                    <th className="py-6 px-8">Date</th>
                    <th className="py-6 px-8">SEO Tags</th>
                    <th className="py-6 px-8 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {posts.map(post => (
                    <tr key={post.id} className="hover:bg-zinc-900/40 transition-colors">
                      <td className="py-6 px-8 font-bold text-sm line-clamp-1 max-w-[200px]">{post.title}</td>
                      <td className="py-6 px-8">
                        <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase border ${post.category === 'club' ? 'border-purple-500/30 text-purple-400 bg-purple-500/5' : 'border-white/10 text-gray-400'}`}>
                          {post.category}
                        </span>
                      </td>
                      <td className="py-6 px-8 text-xs text-gray-500">{post.createdAt}</td>
                      <td className="py-6 px-8">
                        <div className="flex flex-wrap gap-1">
                          {post.seoTags?.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] text-purple-400/70">#{tag}</span>
                          ))}
                        </div>
                      </td>
                      <td className="py-6 px-8 text-right">
                        <button 
                          onClick={() => { if(confirm('정말 삭제하시겠습니까?')) onDeletePost(post.id) }}
                          className="p-2 text-zinc-600 hover:text-red-500 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {posts.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-gray-600 italic">표시할 게시글이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
