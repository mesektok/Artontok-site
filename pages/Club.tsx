
import React, { useState } from 'react';
import { SiteSettings, Post } from '../types';

// 포트원 SDK 타입 정의
declare global {
  interface Window {
    PortOne: any;
  }
}

interface ClubProps {
  settings: SiteSettings;
  posts: Post[];
}

const Club: React.FC<ClubProps> = ({ posts }) => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [paymentStep, setPaymentStep] = useState<'select' | 'processing' | 'success'>('select');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'kakao'>('card');

  // 최신순으로 정렬 (혹시 모를 순서 꼬임 방지)
  const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handlePayment = async () => {
    if (!window.PortOne) {
      alert("결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    setPaymentStep('processing');

    try {
      const paymentParams: any = {
        storeId: "store-d443f747-cc48-4a29-94d8-64af2fd81488",
        paymentId: `payment-${crypto.randomUUID()}`,
        orderName: "스피드부자 클럽 VIP 멤버십",
        totalAmount: 99000,
        currency: "KRW",
      };

      if (paymentMethod === 'kakao') {
        paymentParams.payMethod = "EASY_PAY";
        paymentParams.pgProvider = "KAKAOPAY";
        paymentParams.easyPay = { provider: "KAKAOPAY" };
      } else {
        paymentParams.payMethod = "CARD";
        paymentParams.pgProvider = "TOSSPAYMENTS"; 
      }

      const payment = await window.PortOne.requestPayment(paymentParams);

      if (payment.code != null) {
        alert(`결제 실패: ${payment.message}`);
        setPaymentStep('select');
        return;
      }

      setPaymentStep('success');
    } catch (error) {
      console.error("Payment Error:", error);
      alert("결제 통신 중 오류가 발생했습니다.");
      setPaymentStep('select');
    }
  };

  const closeModal = () => {
    setIsJoinModalOpen(false);
    setTimeout(() => {
      setPaymentStep('select');
    }, 300);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
      <header className="mb-20 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full -z-10"></div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">SPEED RICH <span className="text-purple-500">CLUB</span></h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
          예술적 통찰과 경제적 지식을 결합한 <br />
          국내 유일의 프라이빗 아트-재테크 커뮤니티
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
        <div className="lg:col-span-2 space-y-10">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
              최신 리포트 & 인사이트
            </h2>
            <span className="text-xs text-gray-500 font-medium">Total {sortedPosts.length} Reports</span>
          </div>
          
          <div className="space-y-8">
            {sortedPosts.length > 0 ? (
              sortedPosts.map(post => (
                <div 
                  key={post.id} 
                  onClick={() => setSelectedPost(post)}
                  className="group bg-zinc-900/30 hover:bg-zinc-900/60 border border-white/5 hover:border-purple-500/30 rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer flex flex-col md:flex-row"
                >
                  <div className="w-full md:w-72 h-56 relative overflow-hidden">
                    <img 
                      src={post.imageUrl} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      alt={post.title} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-xs font-bold">Read Full Report →</span>
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-purple-900/30 text-purple-400 text-[10px] font-black uppercase tracking-widest rounded-full">Report</span>
                        <span className="text-xs text-gray-500 font-medium">{post.createdAt}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-400 transition-colors leading-tight">{post.title}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2 font-light leading-relaxed">{post.content}</p>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                       <div className="flex gap-2">
                        {post.seoTags?.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[10px] text-gray-600">#{tag}</span>
                        ))}
                       </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                <p className="text-gray-500 italic">아직 등록된 클럽 리포트가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
        
        <aside className="space-y-8">
          <div className="sticky top-24">
            <div className="bg-zinc-900 rounded-[2rem] p-8 border border-purple-500/20 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-600/10 blur-[50px] rounded-full"></div>
              
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
                </svg>
                VIP 멤버십 혜택
              </h3>
              
              <ul className="space-y-4 mb-10">
                {[
                  "분기별 실전 아트테크 분석 보고서",
                  "월 1회 프라이빗 갤러리 도슨트 투어",
                  "경제적 자유를 위한 독서 토론 세션",
                  "아트딜러 자격 취득 가이드 제공",
                  "멤버 전용 애드센스/수익형 블로그 특강"
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-400 leading-tight">
                    <svg className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="bg-black/40 rounded-2xl p-6 mb-8 border border-white/5">
                <p className="text-xs text-gray-500 mb-1">Standard Price</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">99,000</span>
                  <span className="text-sm font-bold text-gray-400">KRW / Month</span>
                </div>
              </div>

              <button 
                onClick={() => setIsJoinModalOpen(true)}
                className="w-full py-5 bg-purple-600 rounded-2xl text-lg font-black hover:bg-purple-700 transition-all shadow-xl shadow-purple-500/20 active:scale-[0.97]"
              >
                멤버십 신청하기
              </button>
            </div>

            <div className="mt-8 bg-gradient-to-br from-zinc-900 to-black rounded-[2rem] p-8 border border-white/5 text-center">
              <p className="text-purple-400 font-serif italic text-lg mb-2">"Speed up your wealth"</p>
              <p className="text-xs text-gray-500 leading-relaxed">우리는 더 나은 지식과 예술적 가치를 통해 <br />당신의 부의 성장을 가속화합니다.</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 overflow-hidden">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setSelectedPost(null)}></div>
          <div className="relative bg-zinc-900 w-full max-w-4xl max-h-[85vh] rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setSelectedPost(null)}
              className="absolute top-6 right-8 z-10 p-2 bg-black/50 hover:bg-white/10 rounded-full transition-colors text-white"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="overflow-y-auto custom-scrollbar">
              <div className="h-80 w-full relative">
                <img src={selectedPost.imageUrl} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
              </div>
              <div className="p-10 md:p-16 -mt-20 relative">
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-4 py-1.5 bg-purple-600 rounded-full text-xs font-black tracking-tighter uppercase">Club Report</span>
                  <span className="text-sm text-gray-500">{selectedPost.createdAt}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-10 leading-tight">{selectedPost.title}</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap font-light">
                    {selectedPost.content}
                  </p>
                </div>
                <div className="mt-16 pt-10 border-t border-white/5 flex flex-wrap gap-3">
                  {selectedPost.seoTags?.map(tag => (
                    <span key={tag} className="text-xs px-4 py-2 bg-white/5 rounded-full text-gray-400">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Membership Join Modal */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          <div className="relative bg-zinc-900 w-full max-w-md p-8 rounded-[2.5rem] border border-purple-500/30 shadow-2xl animate-in zoom-in-95 duration-300">
            <button 
              onClick={closeModal}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {paymentStep === 'success' ? (
              <div className="text-center py-8 animate-in fade-in zoom-in-95">
                <div className="w-20 h-20 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black mb-2 text-white">가입 환영합니다!</h3>
                <p className="text-gray-400 mb-8">스피드부자 독서클럽의 정식 멤버가 되셨습니다.</p>
                <button 
                  onClick={closeModal}
                  className="w-full py-4 bg-zinc-800 text-white font-bold rounded-2xl hover:bg-zinc-700 transition-all"
                >
                  확인
                </button>
              </div>
            ) : paymentStep === 'processing' ? (
              <div className="text-center py-20">
                <div className="relative w-16 h-16 mx-auto mb-8">
                  <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <h3 className="text-xl font-bold text-white">결제 진행 중</h3>
                <p className="text-gray-500 text-sm mt-2">안전한 결제창으로 이동하고 있습니다.</p>
              </div>
            ) : (
              <>
                <h3 className="text-3xl font-black mb-2 text-white">Premium Membership</h3>
                <p className="text-gray-500 text-sm mb-10">결제 수단을 선택하고 클럽 혜택을 즉시 누리세요.</p>
                
                <div className="space-y-4">
                  <div 
                    onClick={() => setPaymentMethod('card')}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      paymentMethod === 'card' ? 'border-purple-600 bg-purple-600/10' : 'border-white/5 bg-black/50 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <p className="font-bold text-sm text-white">신용/체크카드</p>
                    </div>
                    {paymentMethod === 'card' && <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>}
                  </div>

                  <div 
                    onClick={() => setPaymentMethod('kakao')}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      paymentMethod === 'kakao' ? 'border-[#FAE100] bg-[#FAE100]/10' : 'border-white/5 bg-black/50 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#FAE100] rounded-full flex items-center justify-center">
                        <span className="text-[#3C1E1E] font-black text-xs">TALK</span>
                      </div>
                      <p className="font-bold text-sm text-white">카카오페이</p>
                    </div>
                    {paymentMethod === 'kakao' && <div className="w-5 h-5 bg-[#FAE100] rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#3C1E1E] rounded-full"></div>
                    </div>}
                  </div>

                  <div className="bg-black/80 p-5 rounded-2xl mt-8 border border-white/5">
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-gray-500">Membership</span>
                      <span className="font-bold text-white">Speed Rich VIP</span>
                    </div>
                    <div className="flex justify-between items-center text-xl">
                      <span className="text-white font-black">Total</span>
                      <span className="text-purple-500 font-black">99,000 KRW</span>
                    </div>
                  </div>

                  <button 
                    onClick={handlePayment}
                    className="w-full py-5 bg-purple-600 text-white font-black rounded-2xl hover:bg-purple-700 transition-all mt-8 shadow-xl shadow-purple-500/20 active:scale-[0.98]"
                  >
                    지금 가입하기
                  </button>
                  <p className="text-[10px] text-gray-600 text-center mt-6">
                    결제 완료 후 My Page에서 바로 리포트를 확인하실 수 있습니다.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Club;
