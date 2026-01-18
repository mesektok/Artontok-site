
import { Post, SiteSettings } from './types';

export const INITIAL_SETTINGS: SiteSettings = {
  siteName: "아트 온 톡 (Art On Tok)",
  heroTitle: "예술로 자산을 깨우다",
  heroSubtitle: "아트코칭 & 아트딜러 전문 서비스, 스피드부자 독서클럽과 함께하는 부의 예술화",
  primaryColor: "#000000",
  accentColor: "#8b5cf6", // Violet 500
  fontFamily: "Noto Sans KR",
  socialLinks: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com"
  }
};

export const SAMPLE_POSTS: Post[] = [
  {
    id: "1",
    title: "현대 미술 투자의 기초",
    content: "아트딜러가 알려주는 2024년 유망 작가 리스트와 투자 전략입니다. 예술 작품은 단순한 감상의 대상을 넘어 가치 있는 자산이 됩니다.",
    category: "art",
    imageUrl: "https://picsum.photos/seed/art1/800/600",
    createdAt: "2024-05-01",
    seoTags: ["아트테크", "미술투자", "아트딜러"]
  },
  {
    id: "2",
    title: "스피드부자 독서클럽 5월 정기 모임",
    content: "경제적 자유를 향한 지름길, 스피드부자 독서클럽의 이번 달 주제는 '포트폴리오 다각화'입니다. 오프라인 세미나 현장을 확인하세요.",
    category: "club",
    imageUrl: "https://picsum.photos/seed/club1/800/600",
    createdAt: "2024-05-10",
    seoTags: ["재테크", "부자클럽", "경제적자유"]
  },
  {
    id: "3",
    title: "추상화의 매력과 코칭",
    content: "내면의 감정을 캔버스에 담아내는 법. 아트 온 톡의 시그니처 코칭 프로그램을 소개합니다.",
    category: "art",
    imageUrl: "https://picsum.photos/seed/art2/800/600",
    createdAt: "2024-05-15",
    seoTags: ["아트코칭", "추상화", "힐링아트"]
  }
];
