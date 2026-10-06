import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard.jsx";
import Filters from "./components/Filters.jsx";
import IssueForm from "./components/IssueForm.jsx";
import IssueList from "./components/IssueList.jsx";
import Navbar from "./components/Navbar.jsx";
import { createIssue, deleteIssue, getIssues, updateIssue } from "./services/issueService.js";

export default function App() {
  const [issues, setIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [actionError, setActionError] = useState("");
  const [formError, setFormError] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState(null);

  async function fetchIssues() {
    setLoading(true);
    setLoadError(false);

    try {
      const data = await getIssues();
      setIssues(data);
    } catch (error) {
      console.error("Unable to load issues:", error);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchIssues();
  }, []);

  useEffect(() => {
    if (!notice) return undefined;
    const timeoutId = window.setTimeout(() => setNotice(null), 4000);
    return () => window.clearTimeout(timeoutId);
  }, [notice]);

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredIssues = issues.filter((issue) => {
    const matchesStatus = statusFilter === "All" || issue.status === statusFilter;
    const matchesPriority = priorityFilter === "All" || issue.priority === priorityFilter;
    const searchableText = `${issue.title} ${issue.description}`.toLowerCase();
    const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);

    return matchesStatus && matchesPriority && matchesSearch;
  });

  const hasActiveFilters =
    normalizedSearch.length > 0 || statusFilter !== "All" || priorityFilter !== "All";
  const emptyMessage = issues.length === 0 && !hasActiveFilters
    ? "No issues found."
    : "No matching issues found.";

  function openCreateForm() {
    setEditingIssue(null);
    setFormError("");
    setIsFormOpen(true);
  }

  function openEditForm(issue) {
    setEditingIssue(issue);
    setFormError("");
    setIsFormOpen(true);
  }

  function closeForm() {
    if (isSaving) return;
    setIsFormOpen(false);
    setEditingIssue(null);
    setFormError("");
  }

  function showNotice(message, type = "success") {
    setActionError("");
    setNotice({ message, type, id: Date.now() });
  }

  async function handleSaveIssue(issueData) {
    setIsSaving(true);
    setFormError("");

    try {
      if (editingIssue) {
        const updatedIssue = await updateIssue(editingIssue._id, issueData);
        setIssues((current) =>
          current.map((issue) => issue._id === updatedIssue._id ? updatedIssue : issue)
        );
        showNotice("Issue updated successfully.");
      } else {
        const createdIssue = await createIssue(issueData);
        setIssues((current) => [createdIssue, ...current]);
        showNotice("Issue created successfully.");
      }

      setIsFormOpen(false);
      setEditingIssue(null);
      return true;
    } catch (error) {
      console.error("Unable to save issue:", error);
      setFormError("Unable to save the issue. Please try again.");
      return false;
    } finally {
      setIsSaving(false);
    }
  }

  async function handleStatusChange(id, status) {
    setActionError("");

    try {
      const updatedIssue = await updateIssue(id, { status });
      setIssues((current) =>
        current.map((issue) => issue._id === updatedIssue._id ? updatedIssue : issue)
      );
      showNotice(`Status changed to ${status}.`);
    } catch (error) {
      console.error("Unable to update issue status:", error);
      setActionError("Unable to update the issue. Please try again.");
    }
  }

  async function handleDeleteIssue(issue) {
    const confirmed = window.confirm(`Delete "${issue.title}"? This action cannot be undone.`);
    if (!confirmed) return;

    setActionError("");
    try {
      await deleteIssue(issue._id);
      setIssues((current) => current.filter((item) => item._id !== issue._id));
      showNotice("Issue deleted successfully.");
    } catch (error) {
      console.error("Unable to delete issue:", error);
      setActionError("Unable to delete the issue. Please try again.");
    }
  }

  function clearFilters() {
    setSearchTerm("");
    setStatusFilter("All");
    setPriorityFilter("All");
  }

  return (
    <div className="app-shell">
      <Navbar />

      <main className="dashboard-page">
        <section className="page-intro">
          <div className="page-intro-copy">
            <p className="eyebrow intro-eyebrow">ENGINEERING WORKSPACE <span>/</span> ISSUE TRACKER</p>
            <h1>DevTrack<span className="title-period">.</span></h1>
            <p className="page-subtitle">Mini Bug Tracking System</p>
            <p className="page-description">Keep every bug visible, prioritized, and moving toward resolution.</p>
          </div>
          <button className="button button-primary create-button" type="button" onClick={openCreateForm}>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 4v12M4 10h12" />
            </svg>
            Create bug
          </button>
        </section>

        {notice && (
          <div className={`notice notice-${notice.type}`} role="status" key={notice.id}>
            <span className="notice-indicator" />
            <p>{notice.message}</p>
            <button className="icon-button notice-close" type="button" onClick={() => setNotice(null)} aria-label="Dismiss message">
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="m5 5 10 10M15 5 5 15" />
              </svg>
            </button>
          </div>
        )}

        <Dashboard issues={issues} />

        <section className="workspace-section" aria-labelledby="issue-queue-title">
          <div className="workspace-heading">
            <div>
              <p className="eyebrow">ISSUE MANAGEMENT</p>
              <h2 id="issue-queue-title">Issue queue</h2>
              <p className="workspace-description">Review, prioritize, and update the work in progress.</p>
            </div>
            <div className="workspace-count" aria-live="polite">
              <span className="workspace-count-value">{issues.length}</span>
              <span>{issues.length === 1 ? "issue tracked" : "issues tracked"}</span>
            </div>
          </div>

          <Filters
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
            onSearchChange={setSearchTerm}
            onStatusChange={setStatusFilter}
            onPriorityChange={setPriorityFilter}
            onClear={clearFilters}
          />

          {actionError && (
            <div className="inline-alert" role="alert">
              <span>{actionError}</span>
              <button type="button" onClick={() => setActionError("")}>Dismiss</button>
            </div>
          )}

          {loading ? (
            <div className="loading-state" role="status">
              <span className="loading-spinner" />
              <p>Loading issues...</p>
            </div>
          ) : loadError ? (
            <div className="load-error" role="alert">
              <p>Unable to load issues. Please try again.</p>
              <button className="button button-secondary" type="button" onClick={fetchIssues}>Try again</button>
            </div>
          ) : (
            <IssueList
              issues={filteredIssues}
              totalIssues={issues.length}
              emptyMessage={emptyMessage}
              onEdit={openEditForm}
              onDelete={handleDeleteIssue}
              onStatusChange={handleStatusChange}
            />
          )}
        </section>

        <footer className="page-footer">
          <span>DEVTRACK</span>
          <span>Simple issue tracking for focused teams.</span>
        </footer>
      </main>

      {isFormOpen && (
        <IssueForm
          key={editingIssue ? editingIssue._id : "new-issue"}
          initialIssue={editingIssue}
          isSaving={isSaving}
          errorMessage={formError}
          onSubmit={handleSaveIssue}
          onCancel={closeForm}
        />
      )}
    </div>
  );
}