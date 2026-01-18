
import { GoogleGenAI, Type } from "@google/genai";

/**
 * 게시글 내용을 분석하여 최적화된 SEO 키워드를 추출합니다.
 */
export const generateSEOKeywords = async (title: string, content: string): Promise<string[]> => {
  if (!process.env.API_KEY) {
    console.error("API Key is missing. Check your environment setup.");
    return ["아트", "부자"];
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `다음 게시글의 제목과 내용을 바탕으로 한국어 SEO 키워드 5개를 JSON 형식으로 추출해줘.
      제목: ${title}
      내용: ${content}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            keywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["keywords"]
        }
      }
    });

    const text = response.text;
    if (!text) return ["아트테크", "컬렉팅"];
    
    const result = JSON.parse(text);
    return result.keywords || ["아트", "부자"];
  } catch (error) {
    console.error("Gemini SEO Analysis Error:", error);
    return ["아트온톡", "재테크"];
  }
};

/**
 * 새로운 콘텐츠 영감을 위한 주제를 추천받습니다.
 */
export const suggestArtTopic = async (): Promise<string> => {
  if (!process.env.API_KEY) return "당신의 가치를 높이는 아트 컬렉션";

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "아트코칭 웹사이트를 위한 영감을 주는 블로그 주제를 한 문장으로 추천해줘. 부와 예술의 연결고리에 대해 강조해줘.",
    });
    return response.text || "미술 시장의 흐름과 투자 전략";
  } catch (error) {
    console.error("Gemini Suggestion Error:", error);
    return "당신만의 예술적 취향을 찾는 법";
  }
};
