const HistoryList = ({ entries, onView, onDelete }) => {
  if (!entries || entries.length === 0) {
    return (
      <div className="history-empty">
        <div className="history-empty-icon">📜</div>
        <p>No history yet</p>
        <span>Your operations will appear here</span>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getLanguageLabel = (entry) => {
    if (entry.type === 'translate' && entry.targetLanguage) {
      return `${entry.sourceLanguage.toUpperCase()} → ${entry.targetLanguage.toUpperCase()}`;
    }
    return entry.sourceLanguage.toUpperCase();
  };

  return (
    <div className="history-list">
      {entries.map((entry) => (
        <div
          key={entry._id}
          className="history-card"
          onClick={() => onView(entry)}
        >
          <div className="history-card-header">
            <span className={`op-badge op-badge--${entry.type}`}>
              {entry.type}
            </span>
            <span className="history-card-date">{formatDate(entry.createdAt)}</span>
          </div>
          <div className="history-card-lang">{getLanguageLabel(entry)}</div>
          <div className="history-card-preview">
            {entry.inputCode.slice(0, 100)}
            {entry.inputCode.length > 100 ? '…' : ''}
          </div>
          <button
            className="history-delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(entry._id);
            }}
            title="Delete this entry"
          >
            🗑
          </button>
        </div>
      ))}
    </div>
  );
};

export default HistoryList;
