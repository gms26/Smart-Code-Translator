import CodeEditor from './CodeEditor.jsx';

const OutputPanel = ({ result, action, targetLanguage }) => {
  if (!result) {
    return (
      <div className="output-empty">
        <div className="output-empty-icon">⚡</div>
        <p className="output-empty-title">Ready to Run</p>
        <p className="output-empty-subtitle">
          Write code, pick an action, and hit <strong>Run</strong>
        </p>
      </div>
    );
  }

  if (action === 'translate') {
    return (
      <div className="output-code">
        <CodeEditor
          code={result.translatedCode}
          language={targetLanguage}
          readOnly
        />
      </div>
    );
  }

  if (action === 'analyze') {
    return (
      <div className="output-analyze">
        <div className="complexity-cards">
          <div className="complexity-card time">
            <span className="complexity-label">Time Complexity</span>
            <span className="complexity-value">{result.timeComplexity}</span>
          </div>
          <div className="complexity-card space">
            <span className="complexity-label">Space Complexity</span>
            <span className="complexity-value">{result.spaceComplexity}</span>
          </div>
        </div>
        <div className="output-explanation">
          <h4>Explanation</h4>
          <p>{result.explanation}</p>
        </div>
      </div>
    );
  }

  if (action === 'optimize') {
    return (
      <div className="output-optimize">
        <div className="output-code-section">
          <CodeEditor
            code={result.optimizedCode}
            language={targetLanguage}
            readOnly
          />
        </div>
        {result.suggestions && (
          <div className="output-suggestions">
            <h4>Improvements</h4>
            <p className="suggestions-text">{result.suggestions}</p>
          </div>
        )}
      </div>
    );
  }

  if (action === 'explain') {
    return (
      <div className="output-explain">
        <div className="output-explanation">
          <p className="explain-text">{result.explanation}</p>
        </div>
      </div>
    );
  }

  return null;
};

export default OutputPanel;
