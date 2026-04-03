import { askGemini } from './gemini.service.js';
import { EXPLAIN_PROMPT } from '../constants/prompts.js';
import { parseGeminiJSON } from '../utils/prompts.utils.js';
import { getLanguageName } from '../constants/languages.js';

export const explainCode = async (code, language) => {
  const langName = getLanguageName(language);
  const prompt = EXPLAIN_PROMPT(code, langName);
  const raw = await askGemini(prompt);
  const result = parseGeminiJSON(raw);
  return {
    explanation: result.explanation,
  };
};
