
import { GoogleGenAI, Type } from "@google/genai";

// API Key is handled by the environment
const API_KEY = process.env.API_KEY || "";

export const generateSEOKeywords = async (title: string, content: string) => {
  if (!API_KEY) return ["아트온톡", "아트코칭"];
  
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `다음 게시글의 제목과 내용을 바탕으로 한국어 SEO 키워드 5개를 추출해줘.
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
          }
        }
      }
    });

    const result = JSON.parse(response.text || '{"keywords": []}');
    return result.keywords;
  } catch (error) {
    console.error("Gemini Error:", error);
    return ["아트", "부자"];
  }
};

export const suggestArtTopic = async () => {
  if (!API_KEY) return "예술과 경제의 만남";

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "아트코칭 웹사이트를 위한 영감을 주는 블로그 주제를 하나 추천해줘. 부와 예술의 연결고리에 대해 강조해줘.",
    });
    return response.text;
  } catch (error) {
    return "당신의 가치를 높이는 아트 컬렉션";
  }
};
