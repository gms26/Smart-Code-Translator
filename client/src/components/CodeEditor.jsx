import Editor from '@monaco-editor/react';
import { MONACO_LANGUAGE_MAP } from '../constants/languages.js';

const CodeEditor = ({ code, onChange, language, readOnly = false }) => {
  const monacoLanguage = MONACO_LANGUAGE_MAP[language] || 'plaintext';

  return (
    <Editor
      height="100%"
      theme="vs"
      language={monacoLanguage}
      value={code}
      onChange={onChange}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: 'on',
        automaticLayout: true,
        bracketPairColorization: { enabled: true },
        readOnly,
        scrollBeyondLastLine: false,
        padding: { top: 12, bottom: 12 },
        lineNumbersMinChars: 3,
        renderLineHighlight: readOnly ? 'none' : 'line',
        cursorBlinking: readOnly ? 'solid' : 'blink',
      }}
    />
  );
};

export default CodeEditor;
