import { askGemini } from './gemini.service.js';
import { TRANSLATE_PROMPT } from '../constants/prompts.js';
import { cleanCodeResponse } from '../utils/prompts.utils.js';
import { getLanguageName } from '../constants/languages.js';

export const translateCode = async (code, sourceLanguage, targetLanguage) => {
  const sourceLangName = getLanguageName(sourceLanguage);
  const targetLangName = getLanguageName(targetLanguage);
  const prompt = TRANSLATE_PROMPT(code, sourceLangName, targetLangName);
  const raw = await askGemini(prompt);
  const translatedCode = cleanCodeResponse(raw);
  return { translatedCode };
};
