
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
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);

  const [newPost, setNewPost] = useState<Omit<Post, 'id' | 'createdAt' | 'seoTags'>>({
    title: '',
    content: '',
    category: 'art',
    imageUrl: 'https://picsum.photos/seed/new/800/600'
  });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(editingSettings);
    alert('설정이 저장되었습니다.');
  };

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingSEO(true);
    
    // Use Gemini for SEO optimization automatically
    const keywords = await generateSEOKeywords(newPost.title, newPost.content);
    
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      seoTags: keywords
    };
    
    onAddPost(post);
    setNewPost({ title: '', content: '', category: 'art', imageUrl: 'https://picsum.photos/seed/new/800/600' });
    setIsAddingPost(false);
    setIsGeneratingSEO(false);
  };

  const handleAiSuggest = async () => {
    const suggestion = await suggestArtTopic();
    setAiSuggestion(suggestion);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black">관리자 대시보드</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 rounded-lg text-sm font-bold ${activeTab === 'posts' ? 'bg-purple-600' : 'bg-zinc-800'}`}
          >
            게시글 관리
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-lg text-sm font-bold ${activeTab === 'settings' ? 'bg-purple-600' : 'bg-zinc-800'}`}
          >
            사이트 설정
          </button>
        </div>
      </div>

      {activeTab === 'settings' ? (
        <div className="bg-zinc-900 p-8 rounded-2xl border border-white/5">
          <h2 className="text-xl font-bold mb-6">일반 설정</h2>
          <form onSubmit={handleSaveSettings} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">웹사이트 이름</label>
                <input 
                  type="text" 
                  value={editingSettings.siteName}
                  onChange={e => setEditingSettings({...editingSettings, siteName: e.target.value})}
                  className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-sm focus:border-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">포인트 컬러 (Hex)</label>
                <input 
                  type="text" 
                  value={editingSettings.accentColor}
                  onChange={e => setEditingSettings({...editingSettings, accentColor: e.target.value})}
                  className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-sm focus:border-purple-500 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">히어로 타이틀</label>
              <input 
                type="text" 
                value={editingSettings.heroTitle}
                onChange={e => setEditingSettings({...editingSettings, heroTitle: e.target.value})}
                className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-sm focus:border-purple-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">히어로 서브타이틀</label>
              <textarea 
                value={editingSettings.heroSubtitle}
                onChange={e => setEditingSettings({...editingSettings, heroSubtitle: e.target.value})}
                rows={3}
                className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-sm focus:border-purple-500 outline-none"
              />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold">
                변경사항 저장
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">전체 게시글 ({posts.length})</h2>
            <div className="flex gap-4">
               <button 
                onClick={handleAiSuggest}
                className="px-4 py-2 border border-purple-500/30 text-purple-400 rounded-lg text-sm hover:bg-purple-500/10 transition-colors"
              >
                AI 추천 주제 받기
              </button>
              <button 
                onClick={() => setIsAddingPost(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-bold hover:bg-purple-700"
              >
                + 새 게시글 작성
              </button>
            </div>
          </div>

          {aiSuggestion && (
            <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg animate-in slide-in-from-top-4 duration-300">
              <p className="text-purple-300 text-sm">
                <span className="font-bold">✨ AI 추천 주제:</span> {aiSuggestion}
              </p>
            </div>
          )}

          {isAddingPost && (
            <div className="bg-zinc-900 p-8 rounded-2xl border-2 border-purple-500 animate-in zoom-in-95 duration-200">
              <h3 className="text-lg font-bold mb-4">새 게시글 등록</h3>
              <form onSubmit={handleAddPost} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="글 제목" 
                    required
                    value={newPost.title}
                    onChange={e => setNewPost({...newPost, title: e.target.value})}
                    className="bg-black border border-zinc-800 rounded p-3 text-sm outline-none focus:border-purple-500"
                  />
                  <select 
                    value={newPost.category}
                    onChange={e => setNewPost({...newPost, category: e.target.value as any})}
                    className="bg-black border border-zinc-800 rounded p-3 text-sm outline-none focus:border-purple-500"
                  >
                    <option value="art">아트코칭</option>
                    <option value="club">독서클럽</option>
                    <option value="notice">공지사항</option>
                  </select>
                </div>
                <textarea 
                  placeholder="내용을 입력하세요..." 
                  required
                  rows={5}
                  value={newPost.content}
                  onChange={e => setNewPost({...newPost, content: e.target.value})}
                  className="w-full bg-black border border-zinc-800 rounded p-3 text-sm outline-none focus:border-purple-500"
                />
                <div className="flex justify-end gap-3">
                  <button 
                    type="button" 
                    onClick={() => setIsAddingPost(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white"
                  >
                    취소
                  </button>
                  <button 
                    type="submit" 
                    disabled={isGeneratingSEO}
                    className="px-6 py-2 bg-purple-600 rounded font-bold disabled:opacity-50"
                  >
                    {isGeneratingSEO ? 'AI SEO 분석 중...' : '게시하기'}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-gray-500 text-xs uppercase font-black">
                  <th className="py-4 px-4">제목</th>
                  <th className="py-4 px-4">카테고리</th>
                  <th className="py-4 px-4">작성일</th>
                  <th className="py-4 px-4">SEO 태그</th>
                  <th className="py-4 px-4 text-right">관리</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {posts.map(post => (
                  <tr key={post.id} className="border-b border-zinc-900 hover:bg-zinc-900/50">
                    <td className="py-4 px-4 font-bold">{post.title}</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-zinc-800 rounded text-[10px] uppercase">{post.category}</span>
                    </td>
                    <td className="py-4 px-4 text-gray-500">{post.createdAt}</td>
                    <td className="py-4 px-4">
                      <div className="flex gap-1">
                        {post.seoTags?.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[10px] text-purple-400">#{tag}</span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button 
                        onClick={() => onDeletePost(post.id)}
                        className="text-red-500 hover:text-red-400 text-xs font-bold"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
