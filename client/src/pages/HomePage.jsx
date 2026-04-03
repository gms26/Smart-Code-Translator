import { useState } from 'react';
import { toast } from 'react-hot-toast';
import CodeEditor from '../components/CodeEditor.jsx';
import LanguageSelector from '../components/LanguageSelector.jsx';
import OutputPanel from '../components/OutputPanel.jsx';
import {
  translateCode,
  analyzeComplexity,
  optimizeCode,
  explainCode,
} from '../services/codeService.js';
import { STARTER_CODE } from '../constants/languages.js';

const ACTIONS = ['translate', 'analyze', 'optimize', 'explain'];

const HomePage = () => {
  const [code, setCode] = useState(STARTER_CODE.python);
  const [sourceLanguage, setSourceLanguage] = useState('python');
  const [targetLanguage, setTargetLanguage] = useState('java');
  const [activeAction, setActiveAction] = useState('translate');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSourceChange = (langId) => {
    setSourceLanguage(langId);
    setCode(STARTER_CODE[langId]);
    setResult(null);
  };

  const handleActionChange = (action) => {
    setActiveAction(action);
    setResult(null);
  };

  const handleSwap = () => {
    if (activeAction !== 'translate') return;
    const prevSource = sourceLanguage;
    const prevTarget = targetLanguage;
    setSourceLanguage(prevTarget);
    setTargetLanguage(prevSource);
    if (result?.translatedCode) {
      setCode(result.translatedCode);
      setResult(null);
    }
  };

  const handleCopy = async () => {
    let text = '';
    if (activeAction === 'translate' && result?.translatedCode) text = result.translatedCode;
    else if (activeAction === 'optimize' && result?.optimizedCode) text = result.optimizedCode;
    else if (activeAction === 'analyze') text = `Time: ${result?.timeComplexity}\nSpace: ${result?.spaceComplexity}\n${result?.explanation}`;
    else if (activeAction === 'explain') text = result?.explanation || '';

    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleRun = async () => {
    if (!code?.trim()) {
      toast.error('Please enter some code first');
      return;
    }
    if (!sourceLanguage) {
      toast.error('Please select a source language');
      return;
    }
    if (activeAction === 'translate' && !targetLanguage) {
      toast.error('Please select a target language');
      return;
    }

    setLoading(true);
    setResult(null);

    const actions = {
      translate: () => translateCode(code, sourceLanguage, targetLanguage),
      analyze: () => analyzeComplexity(code, sourceLanguage),
      optimize: () => optimizeCode(code, sourceLanguage),
      explain: () => explainCode(code, sourceLanguage),
    };

    try {
      const data = await actions[activeAction]();
      setResult(data);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* Toolbar */}
      <div className="toolbar">
        <div className="action-tabs">
          {ACTIONS.map((action) => (
            <button
              key={action}
              className={`action-tab ${activeAction === action ? 'active' : ''}`}
              onClick={() => handleActionChange(action)}
            >
              {action.charAt(0).toUpperCase() + action.slice(1)}
            </button>
          ))}
        </div>
        <div className="toolbar-right">
          {result && (
            <button className="btn-copy" onClick={handleCopy}>
              {copied ? '✓ Copied' : '📋 Copy'}
            </button>
          )}
          <button
            className="btn-run"
            onClick={handleRun}
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-inline" />
            ) : (
              '▶ Run'
            )}
          </button>
        </div>
      </div>

      {/* Editor Layout */}
      <div className="editor-layout">
        {/* Left Panel */}
        <div className="panel panel--left">
          <div className="panel-header">
            <LanguageSelector value={sourceLanguage} onChange={handleSourceChange} />
            <span className="panel-label">Input</span>
          </div>
          <div className="panel-editor">
            <CodeEditor
              code={code}
              onChange={(val) => setCode(val || '')}
              language={sourceLanguage}
            />
          </div>
        </div>

        {/* Swap Button */}
        {activeAction === 'translate' && (
          <button
            className="swap-btn"
            onClick={handleSwap}
            title="Swap languages"
          >
            ⇄
          </button>
        )}

        {/* Right Panel */}
        <div className="panel panel--right">
          <div className="panel-header">
            {activeAction === 'translate' ? (
              <LanguageSelector value={targetLanguage} onChange={setTargetLanguage} />
            ) : (
              <span className="panel-label-action">
                {activeAction.charAt(0).toUpperCase() + activeAction.slice(1)} Result
              </span>
            )}
            <span className="panel-label">Output</span>
          </div>
          <div className="panel-output">
            {loading ? (
              <div className="output-loading">
                <div className="spinner" />
                <p>Asking Gemini...</p>
              </div>
            ) : (
              <OutputPanel
                result={result}
                action={activeAction}
                targetLanguage={targetLanguage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
