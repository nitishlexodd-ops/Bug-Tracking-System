export default function Filters({
  searchTerm,
  statusFilter,
  priorityFilter,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onClear,
}) {
  const hasFilters =
    searchTerm.trim().length > 0 || statusFilter !== "All" || priorityFilter !== "All";

  return (
    <div className="filters-bar" aria-label="Search and filter issues">
      <label className="search-field">
        <span className="filter-label">Search issues</span>
        <span className="search-input-wrap">
          <svg className="search-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="8.8" cy="8.8" r="5.8" />
            <path d="m13.2 13.2 4 4" />
          </svg>
          <input
            id="issue-search"
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search title or description..."
          />
        </span>
      </label>

      <label className="filter-field" htmlFor="status-filter">
        <span className="filter-label">Status</span>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value)}
        >
          <option value="All">All</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </label>

      <label className="filter-field" htmlFor="priority-filter">
        <span className="filter-label">Priority</span>
        <select
          id="priority-filter"
          value={priorityFilter}
          onChange={(event) => onPriorityChange(event.target.value)}
        >
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </label>

      {hasFilters && (
        <button className="clear-filters-button" type="button" onClick={onClear}>
          Clear filters
        </button>
      )}
    </div>
  );
}