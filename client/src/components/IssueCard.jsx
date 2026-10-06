const statusOptions = ["Open", "In Progress", "Resolved"];

function formatDate(dateValue) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function badgeClass(value) {
  return value.toLowerCase().replaceAll(" ", "-");
}

export default function IssueCard({ issue, onEdit, onDelete, onStatusChange }) {
  return (
    <article className="issue-card">
      <div className="issue-card-content">
        <div className="issue-badges">
          <span className={`badge status-badge badge-${badgeClass(issue.status)}`}>
            <span className="badge-dot" />
            {issue.status}
          </span>
          <span className={`badge priority-badge badge-${badgeClass(issue.priority)}`}>
            <span className="priority-marker" />
            {issue.priority} priority
          </span>
        </div>
        <div className="issue-copy">
          <h3>{issue.title}</h3>
          <p>{issue.description}</p>
        </div>
      </div>

      <div className="issue-card-footer">
        <p className="issue-created">
          <span>Created</span>
          <time dateTime={issue.createdAt}>{formatDate(issue.createdAt)}</time>
        </p>

        <div className="issue-actions">
          <label className="status-control">
            <span>Change status</span>
            <select
              value={issue.status}
              onChange={(event) => onStatusChange(issue._id, event.target.value)}
              aria-label={`Change status for ${issue.title}`}
            >
              {statusOptions.map((status) => (
                <option value={status} key={status}>{status}</option>
              ))}
            </select>
          </label>

          <button className="text-button" type="button" onClick={() => onEdit(issue)}>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="m12.8 4.2 3 3M4 16l3.5-.7L16 6.8a2.1 2.1 0 0 0-3-3L4.5 12.4 4 16Z" />
            </svg>
            Edit
          </button>
          <button className="text-button text-button-danger" type="button" onClick={() => onDelete(issue)}>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4.5 6h11M8 6V4.5h4V6m-6.5 0 .7 9.5h5.6l.7-9.5M8.5 9v4m3-4v4" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}