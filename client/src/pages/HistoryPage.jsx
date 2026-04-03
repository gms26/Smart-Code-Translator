import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import HistoryList from '../components/HistoryList.jsx';
import CodeEditor from '../components/CodeEditor.jsx';
import { getHistory, deleteHistoryItem, clearHistory } from '../services/historyService.js';

const HistoryPage = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await getHistory(currentPage, 8);
      setEntries(data.entries);
      setTotalPages(data.totalPages);
    } catch (err) {
      toast.error('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      await deleteHistoryItem(id);
      if (selectedEntry?._id === id) setSelectedEntry(null);
      toast.success('Entry deleted');
      fetchHistory();
    } catch {
      toast.error('Failed to delete entry');
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to clear all history? This cannot be undone.')) return;
    try {
      await clearHistory();
      setEntries([]);
      setSelectedEntry(null);
      setCurrentPage(1);
      toast.success('All history cleared');
    } catch {
      toast.error('Failed to clear history');
    }
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const renderOutput = (entry) => {
    const { type, output, sourceLanguage } = entry;

    if (type === 'translate') {
      return (
        <div className="detail-output-section">
          <p className="detail-section-label">Translated Code:</p>
          <pre className="detail-pre">{output.translatedCode}</pre>
        </div>
      );
    }
    if (type === 'analyze') {
      return (
        <div className="detail-output-section">
          <div className="complexity-cards small">
            <div className="complexity-card time">
              <span className="complexity-label">Time</span>
              <span className="complexity-value">{output.timeComplexity}</span>
            </div>
            <div className="complexity-card space">
              <span className="complexity-label">Space</span>
              <span className="complexity-value">{output.spaceComplexity}</span>
            </div>
          </div>
          <p className="detail-explanation">{output.explanation}</p>
        </div>
      );
    }
    if (type === 'optimize') {
      return (
        <div className="detail-output-section">
          <p className="detail-section-label">Optimized Code:</p>
          <pre className="detail-pre">{output.optimizedCode}</pre>
          {output.suggestions && (
            <div className="detail-suggestions">
              <p className="detail-section-label">Improvements:</p>
              <p>{output.suggestions}</p>
            </div>
          )}
        </div>
      );
    }
    if (type === 'explain') {
      return (
        <div className="detail-output-section">
          <p className="explain-text">{output.explanation}</p>
        </div>
      );
    }
    return null;
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="history-page">
      {/* Sidebar */}
      <div className="history-sidebar">
        <div className="history-sidebar-header">
          <h2>History</h2>
          {entries.length > 0 && (
            <button className="btn-clear-all" onClick={handleClearAll}>
              Clear All
            </button>
          )}
        </div>

        {loading ? (
          <div className="history-loading">
            <div className="spinner" />
          </div>
        ) : (
          <HistoryList
            entries={entries}
            onView={setSelectedEntry}
            onDelete={handleDelete}
          />
        )}

        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="page-btn"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              ‹ Prev
            </button>
            {pageNumbers.map((n) => (
              <button
                key={n}
                className={`page-btn ${currentPage === n ? 'active' : ''}`}
                onClick={() => setCurrentPage(n)}
              >
                {n}
              </button>
            ))}
            <button
              className="page-btn"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next ›
            </button>
          </div>
        )}
      </div>

      {/* Detail Panel */}
      <div className={`history-detail ${selectedEntry ? 'visible' : ''}`}>
        {selectedEntry ? (
          <>
            <div className="detail-header">
              <div className="detail-header-left">
                <span className={`op-badge op-badge--${selectedEntry.type}`}>
                  {selectedEntry.type}
                </span>
                <span className="detail-date">{formatDate(selectedEntry.createdAt)}</span>
              </div>
              <button className="btn-close" onClick={() => setSelectedEntry(null)}>
                ✕
              </button>
            </div>

            <div className="detail-body">
              <div className="detail-input-section">
                <p className="detail-section-label">Input Code ({selectedEntry.sourceLanguage.toUpperCase()}):</p>
                <div className="detail-editor-wrap">
                  <CodeEditor
                    code={selectedEntry.inputCode}
                    language={selectedEntry.sourceLanguage}
                    readOnly
                  />
                </div>
              </div>

              <div className="detail-divider">▼ Output</div>

              {renderOutput(selectedEntry)}
            </div>
          </>
        ) : (
          <div className="detail-empty">
            <div className="detail-empty-icon">👈</div>
            <p>Select an entry to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
