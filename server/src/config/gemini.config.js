import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateContent = async (prompt) => {
  const response = await genAI.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: prompt,
  });
  return response.text;
};

export default genAI;
