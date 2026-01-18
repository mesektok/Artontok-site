
import React, { useState } from 'react';
import { SiteSettings } from '../types';

interface CoachingProps {
  settings: SiteSettings;
}

type QuizStep = 'start' | 'q1' | 'q2' | 'q3' | 'result' | 'form' | 'dealer_info';

const Coaching: React.FC<CoachingProps> = ({ settings }) => {
  const [quizStep, setQuizStep] = useState<QuizStep>('start');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions = {
    q1: {
      title: "가장 끌리는 공간의 분위기는?",
      options: [
        { id: 'a', text: "세련되고 정갈한 미니멀 오피스", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400" },
        { id: 'b', text: "따뜻하고 아늑한 클래식 거실", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400" },
        { id: 'c', text: "개성 넘치는 힙한 라운지", img: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80&w=400" }
      ]
    },
    q2: {
      title: "예술 작품 소장의 가장 큰 목적은?",
      options: [
        { id: 'a', text: "자산 가치 상승 (Investment)", value: 'invest' },
        { id: 'b', text: "공간의 완성도와 품격 (Aesthetic)", value: 'space' },
        { id: 'c', text: "내면의 치유와 영감 (Healing)", value: 'spirit' }
      ]
    },
    q3: {
      title: "선호하는 아티스트 스타일은?",
      options: [
        { id: 'a', text: "검증된 거장의 마스터피스", value: 'master' },
        { id: 'b', text: "신선한 에너지를 가진 라이징 루키", value: 'rookie' },
        { id: 'c', text: "실험적이고 독창적인 컨템포러리", value: 'edge' }
      ]
    }
  };

  const getResult = () => {
    if (answers.q2 === 'invest') return {
      type: "전략적 아트테크 솔루션",
      coach: "David Kim",
      desc: "글로벌 옥션 데이터와 시장 트렌드를 분석하여 자산 가치가 확실한 작품을 추천하는 투자 전문 코칭입니다.",
      match: "98%"
    };
    if (answers.q2 === 'space') return {
      type: "프라이빗 공간 큐레이팅",
      coach: "Elena Park",
      desc: "공간의 건축적 구조와 라이프스타일을 고려하여 최적의 미적 가치를 구현하는 큐레이팅 중심 코칭입니다.",
      match: "95%"
    };
    return {
      type: "영혼을 채우는 아트 다이어리",
      coach: "Sarah Lee",
      desc: "개인의 내면을 탐구하고 심리적 안정과 영감을 주는 작가들을 매칭해주는 감성 중심 코칭입니다.",
      match: "99%"
    };
  };

  const handleAnswer = (qId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
    if (qId === 'q1') setQuizStep('q2');
    else if (qId === 'q2') setQuizStep('q3');
    else if (qId === 'q3') setQuizStep('result');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = { 
      ...Object.fromEntries(formData.entries()), 
      ...answers, 
      result: getResult().type,
      program: answers.program || '1:1 Coaching'
    };

    try {
      const response = await fetch("https://formspree.io/f/mwvvvanz", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setQuizStep('start');
          setAnswers({});
        }, 3000);
      }
    } catch (error) {
      alert("신청 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const result = getResult();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in slide-in-from-bottom-8 duration-700">
      <header className="mb-20 text-center md:text-left">
        <span className="text-purple-500 font-black tracking-widest text-sm uppercase px-4 py-1.5 bg-purple-900/10 rounded-full border border-purple-500/20">Exclusive Program</span>
        <h1 className="text-5xl md:text-8xl font-black mt-8 mb-8 tracking-tighter uppercase">Art Coaching</h1>
        <p className="text-xl text-gray-400 max-w-3xl leading-relaxed font-light">
          당신의 취향을 가치로 바꾸는 시간. <br />
          아트 온 톡은 데이터 기반 분석과 예술적 감성을 결합하여 <br />
          당신에게 가장 필요한 '아트 솔루션'을 찾아드립니다.
        </p>
      </header>

      {/* Main Feature: Quiz Section */}
      <section className="relative min-h-[500px] mb-32 group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-transparent rounded-[3rem] -z-10 group-hover:from-purple-600/10 transition-all duration-700"></div>
        
        {quizStep === 'start' ? (
          <div className="flex flex-col items-center justify-center p-12 md:p-24 text-center">
            <h3 className="text-3xl md:text-4xl font-black mb-6">나만의 아트코치 매칭 테스트</h3>
            <p className="text-gray-400 mb-12 max-w-lg">단 30초, 3가지 질문을 통해 당신의 예술적 성향을 분석하고 <br />가장 적합한 전문 코치를 추천해 드립니다.</p>
            <div className="flex gap-4">
               <button 
                onClick={() => setQuizStep('q1')}
                className="px-12 py-5 bg-purple-600 text-white font-black rounded-full hover:bg-purple-700 transition-all shadow-xl shadow-purple-600/20 active:scale-95 text-lg"
              >
                테스트 시작하기
              </button>
            </div>
          </div>
        ) : quizStep === 'q1' ? (
          <div className="p-8 md:p-16 animate-in fade-in slide-in-from-right-8 duration-500">
             <div className="mb-10 flex justify-between items-center">
                <h4 className="text-2xl font-bold">{questions.q1.title}</h4>
                <span className="text-purple-500 font-black">1 / 3</span>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {questions.q1.options.map(opt => (
                  <div 
                    key={opt.id}
                    onClick={() => handleAnswer('q1', opt.text)}
                    className="cursor-pointer group relative rounded-2xl overflow-hidden aspect-[4/5] border border-white/5 hover:border-purple-500/50 transition-all"
                  >
                    <img src={opt.img} className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" alt="" />
                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black to-transparent">
                      <p className="font-bold text-center">{opt.text}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        ) : quizStep === 'q2' ? (
          <div className="p-8 md:p-16 animate-in fade-in slide-in-from-right-8 duration-500">
             <div className="mb-10 flex justify-between items-center">
                <h4 className="text-2xl font-bold">{questions.q2.title}</h4>
                <span className="text-purple-500 font-black">2 / 3</span>
             </div>
             <div className="space-y-4">
                {questions.q2.options.map(opt => (
                  <div 
                    key={opt.id}
                    onClick={() => handleAnswer('q2', opt.value)}
                    className="p-8 bg-zinc-900/50 border border-white/5 hover:border-purple-500/30 rounded-2xl cursor-pointer transition-all hover:bg-zinc-800"
                  >
                    <p className="text-xl font-bold">{opt.text}</p>
                  </div>
                ))}
             </div>
          </div>
        ) : quizStep === 'q3' ? (
          <div className="p-8 md:p-16 animate-in fade-in slide-in-from-right-8 duration-500">
             <div className="mb-10 flex justify-between items-center">
                <h4 className="text-2xl font-bold">{questions.q3.title}</h4>
                <span className="text-purple-500 font-black">3 / 3</span>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {questions.q3.options.map(opt => (
                  <div 
                    key={opt.id}
                    onClick={() => handleAnswer('q3', opt.value)}
                    className="p-10 bg-black/50 border border-zinc-800 hover:border-purple-500 rounded-2xl cursor-pointer transition-all text-center flex flex-col items-center justify-center min-h-[200px]"
                  >
                    <p className="text-lg font-bold">{opt.text}</p>
                  </div>
                ))}
             </div>
          </div>
        ) : quizStep === 'result' ? (
          <div className="p-8 md:p-16 animate-in zoom-in-95 duration-500">
             <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="w-full md:w-1/3 text-center">
                   <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 bg-purple-500 blur-[40px] opacity-30 animate-pulse"></div>
                      <img src={`https://i.pravatar.cc/300?u=${result.coach}`} className="relative w-48 h-48 rounded-full border-4 border-purple-500 mx-auto" alt="" />
                   </div>
                   <h5 className="text-xl font-black mb-1">Chief Coach, {result.coach}</h5>
                   <p className="text-purple-400 font-bold text-sm tracking-widest uppercase">Match {result.match}</p>
                </div>
                <div className="flex-1 text-center md:text-left">
                   <span className="text-purple-500 text-xs font-black uppercase tracking-widest">분석 결과: {result.type}</span>
                   <h4 className="text-4xl font-black mt-2 mb-6">당신에게 꼭 필요한 <br />아트 인사이트가 준비되었습니다.</h4>
                   <p className="text-gray-400 text-lg leading-relaxed mb-10 font-light">{result.desc}</p>
                   <button 
                    onClick={() => setQuizStep('form')}
                    className="px-12 py-5 bg-white text-black font-black rounded-full hover:bg-purple-600 hover:text-white transition-all shadow-2xl active:scale-95"
                   >
                    이 솔루션으로 무료 상담 신청하기
                   </button>
                </div>
             </div>
          </div>
        ) : (
          <div className="p-8 md:p-16 animate-in fade-in duration-500 max-w-2xl mx-auto">
             {isSubmitted ? (
                <div className="text-center py-20 animate-in zoom-in-95">
                  <div className="w-24 h-24 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg className="w-12 h-12 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-black mb-4">신청 완료!</h3>
                  <p className="text-gray-400">배정된 '{result.coach}' 코치가 24시간 내에 연락드립니다.</p>
                </div>
             ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-black mb-8 text-center">솔루션 수령 및 상담 정보 입력</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input name="name" type="text" placeholder="성함" required className="bg-black border border-white/10 rounded-xl p-4 text-sm focus:border-purple-500 outline-none" />
                    <input name="phone" type="tel" placeholder="연락처" required className="bg-black border border-white/10 rounded-xl p-4 text-sm focus:border-purple-500 outline-none" />
                  </div>
                  <input name="email" type="email" placeholder="이메일 주소" required className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm focus:border-purple-500 outline-none" />
                  <textarea name="memo" placeholder="특별히 궁금한 점이 있으신가요?" rows={4} className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm focus:border-purple-500 outline-none"></textarea>
                  <button 
                    disabled={isSubmitting}
                    className="w-full py-5 bg-purple-600 font-black rounded-xl hover:bg-purple-700 transition-all shadow-xl shadow-purple-500/20"
                  >
                    {isSubmitting ? '전송 중...' : '솔루션 상세 리포트 신청'}
                  </button>
                  <button type="button" onClick={() => setQuizStep('result')} className="w-full text-gray-600 text-xs py-2 hover:text-gray-400">결과 다시 보기</button>
                </form>
             )}
          </div>
        )}
      </section>

      {/* Art Dealer Specialist Section */}
      <section className="mb-32 py-20 bg-zinc-950 rounded-[3rem] border border-purple-500/10 overflow-hidden relative">
         <div className="max-w-5xl mx-auto px-8">
            <div className="flex flex-col md:flex-row gap-16 items-center">
               <div className="flex-1">
                  <span className="text-purple-500 text-xs font-black uppercase tracking-[0.3em]">Professional Path</span>
                  <h2 className="text-4xl md:text-5xl font-black mt-4 mb-8">아트 딜러 양성 과정</h2>
                  <p className="text-gray-400 leading-relaxed mb-8">
                    단순한 컬렉터를 넘어 예술의 가치를 전달하는 전문가가 되십시오. 
                    아트 온 톡의 딜러 프로그램은 실무 지식, 네트워크, 그리고 실제 거래 시스템을 제공합니다.
                  </p>
                  <ul className="space-y-4 mb-10">
                    {["국내외 옥션 프로세스 마스터", "작품 진위 판별 및 컨디션 체크 실무", "고액 자산가 응대 매너 및 상담 기술", "아트 온 톡 인증 공식 딜러 자격 부여"].map(item => (
                      <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div> {item}
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => {
                      setAnswers({ program: 'Art Dealer Program' });
                      setQuizStep('form');
                    }}
                    className="px-10 py-4 bg-purple-600/20 border border-purple-500/30 text-purple-400 font-bold rounded-full hover:bg-purple-600 hover:text-white transition-all"
                  >
                    딜러 과정 문의하기
                  </button>
               </div>
               <div className="flex-1 relative">
                  <div className="aspect-[4/5] bg-zinc-900 rounded-3xl overflow-hidden border border-white/5 rotate-3 hover:rotate-0 transition-transform duration-700">
                    <img src="https://images.unsplash.com/photo-1571115764595-644a1f56a55c?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover grayscale" alt="Dealer" />
                  </div>
                  <div className="absolute -bottom-6 -left-6 p-6 bg-white text-black font-black rounded-2xl shadow-2xl">
                    Art Master Certificate
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Program Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32 items-center">
        <div className="relative">
          <div className="aspect-square rounded-[3rem] overflow-hidden border border-purple-500/20 shadow-[0_0_50px_rgba(139,92,246,0.15)]">
            <img 
              src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=1000" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              alt="Art Coaching"
            />
          </div>
          <div className="absolute -bottom-12 -right-12 bg-zinc-900 border border-white/10 p-10 rounded-[2rem] shadow-2xl max-w-sm backdrop-blur-md bg-zinc-900/80">
            <p className="text-white text-lg font-black italic leading-tight">"예술은 당신의 세계를 확장하는 가장 아름다운 투자입니다."</p>
            <p className="text-purple-500 text-xs font-black mt-6 tracking-widest uppercase">— Head of Coaching, Art On Tok</p>
          </div>
        </div>

        <div className="space-y-16">
          <section className="group">
            <div className="flex items-center gap-4 mb-6">
               <span className="w-12 h-12 bg-purple-600/10 rounded-full flex items-center justify-center text-purple-500 font-black group-hover:bg-purple-600 group-hover:text-white transition-all duration-500">01</span>
               <h2 className="text-3xl font-black">테이스트 메이킹</h2>
            </div>
            <p className="text-gray-400 leading-relaxed text-lg font-light pl-16">
              수만 개의 예술 작품 중 당신의 가슴을 뛰게 하는 것은 무엇인가요? 
              전문 코치와 함께 다양한 화풍과 작가의 세계관을 탐험하며 당신만의 예술적 취향을 정교하게 다듬습니다.
            </p>
          </section>
          <section className="group">
            <div className="flex items-center gap-4 mb-6">
               <span className="w-12 h-12 bg-purple-600/10 rounded-full flex items-center justify-center text-purple-500 font-black group-hover:bg-purple-600 group-hover:text-white transition-all duration-500">02</span>
               <h2 className="text-3xl font-black">벨류 애널리시스</h2>
            </div>
            <p className="text-gray-400 leading-relaxed text-lg font-light pl-16">
              작품의 미적 가치만큼 중요한 것은 시장 가치입니다. 
              최신 경매 데이터와 글로벌 미술 시장의 흐름을 분석하여, 시간이 지날수록 가치가 빛나는 작품을 선별하는 안목을 전수합니다.
            </p>
          </section>
          <section className="group">
            <div className="flex items-center gap-4 mb-6">
               <span className="w-12 h-12 bg-purple-600/10 rounded-full flex items-center justify-center text-purple-500 font-black group-hover:bg-purple-600 group-hover:text-white transition-all duration-500">03</span>
               <h2 className="text-3xl font-black">컬렉팅 매니지먼트</h2>
            </div>
            <p className="text-gray-400 leading-relaxed text-lg font-light pl-16">
              작품의 구매부터 운송, 설치, 그리고 사후 관리까지. 
              복잡하고 까다로운 모든 과정을 아트 온 톡이 대행하며, 최적의 컨디션으로 작품을 소장할 수 있도록 돕습니다.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Coaching;
