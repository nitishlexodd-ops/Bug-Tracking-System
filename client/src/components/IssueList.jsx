import IssueCard from "./IssueCard.jsx";

export default function IssueList({
  issues,
  totalIssues,
  emptyMessage,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  return (
    <div className="issue-list-wrap">
      <div className="list-meta">
        <span className="list-meta-label">ISSUES</span>
        <span className="list-meta-count">
          {issues.length} shown <span className="count-divider">/</span> {totalIssues} total
        </span>
      </div>

      {issues.length > 0 ? (
        <div className="issue-list">
          {issues.map((issue, index) => (
            <div className="issue-list-item" key={issue._id} style={{ "--item-index": index }}>
              <IssueCard
                issue={issue}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-state-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M7 10h18M7 16h11M7 22h7" />
              <rect x="4" y="4" width="24" height="24" rx="7" />
            </svg>
          </span>
          <p>{emptyMessage}</p>
        </div>
      )}
    </div>
  );
}