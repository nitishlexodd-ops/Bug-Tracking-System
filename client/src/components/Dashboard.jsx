const summaryItems = [
  { label: "Total issues", key: "total", tone: "summary-total" },
  { label: "Open", key: "Open", tone: "summary-open" },
  { label: "In Progress", key: "In Progress", tone: "summary-progress" },
  { label: "Resolved", key: "Resolved", tone: "summary-resolved" },
];

export default function Dashboard({ issues }) {
  const counts = {
    total: issues.length,
    Open: issues.filter((issue) => issue.status === "Open").length,
    "In Progress": issues.filter((issue) => issue.status === "In Progress").length,
    Resolved: issues.filter((issue) => issue.status === "Resolved").length,
  };

  return (
    <section className="summary-section" aria-label="Issue summary">
      <div className="summary-heading">
        <span className="eyebrow">OVERVIEW</span>
        <span className="summary-caption">Live issue counts</span>
      </div>
      <div className="summary-grid">
        {summaryItems.map((item) => (
          <div className={`summary-item ${item.tone}`} key={item.key}>
            <span className="summary-value">{counts[item.key]}</span>
            <span className="summary-label">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}