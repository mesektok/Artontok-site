
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Generates SEO keywords using Gemini 3 Flash.
 * Follows strict SDK guidelines: direct process.env.API_KEY usage and property-based text access.
 */
export const generateSEOKeywords = async (title: string, content: string) => {
  // Fix: Initialize GoogleGenAI with process.env.API_KEY directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
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

    // Fix: access response.text as a property, not a method
    const result = JSON.parse(response.text || '{"keywords": []}');
    return result.keywords;
  } catch (error) {
    console.error("Gemini Error:", error);
    return ["아트", "부자"];
  }
};

/**
 * Suggests an art-related topic using Gemini 3 Flash.
 */
export const suggestArtTopic = async () => {
  // Fix: Initialize GoogleGenAI inside the service call to ensure fresh configuration
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "아트코칭 웹사이트를 위한 영감을 주는 블로그 주제를 하나 추천해줘. 부와 예술의 연결고리에 대해 강조해줘.",
    });
    // Fix: access response.text as a property
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "당신의 가치를 높이는 아트 컬렉션";
  }
};
