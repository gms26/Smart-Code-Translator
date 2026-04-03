/**
 * Strips markdown JSON code fences and parses the result.
 * Handles: ```json ... ``` and ``` ... ```
 */
export const parseGeminiJSON = (text) => {
  let cleaned = text.trim();
  // Remove ```json ... ``` or ``` ... ``` fences
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  cleaned = cleaned.trim();
  return JSON.parse(cleaned);
};

/**
 * Strips markdown code fences from a plain code response.
 * Handles: ```language ... ``` and ``` ... ```
 */
export const cleanCodeResponse = (text) => {
  let cleaned = text.trim();
  // Remove opening fence with optional language identifier
  cleaned = cleaned.replace(/^```[\w]*\s*/i, '');
  // Remove closing fence
  cleaned = cleaned.replace(/\s*```$/, '');
  return cleaned.trim();
};
