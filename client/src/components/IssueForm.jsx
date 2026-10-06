import { useState } from "react";

const emptyIssue = {
  title: "",
  description: "",
  priority: "",
  status: "",
};

export default function IssueForm({
  initialIssue,
  isSaving,
  errorMessage,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState(() =>
    initialIssue
      ? {
          title: initialIssue.title || "",
          description: initialIssue.description || "",
          priority: initialIssue.priority || "",
          status: initialIssue.status || "",
        }
      : { ...emptyIssue }
  );
  const [fieldErrors, setFieldErrors] = useState({});
  const isEditing = Boolean(initialIssue);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => ({ ...current, [name]: "" }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {};
    if (!formData.title.trim()) nextErrors.title = "Bug title is required.";
    if (!formData.description.trim()) nextErrors.description = "Description is required.";
    if (!formData.priority) nextErrors.priority = "Priority is required.";
    if (!formData.status) nextErrors.status = "Status is required.";

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const saved = await onSubmit({
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      status: formData.status,
    });

    if (saved) setFormData({ ...emptyIssue });
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onCancel()}>
      <section
        className="issue-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="issue-form-title"
      >
        <div className="modal-heading">
          <div>
            <span className="eyebrow">ISSUE DETAILS</span>
            <h2 id="issue-form-title">{isEditing ? "Edit issue" : "Create a bug"}</h2>
            <p>{isEditing ? "Update the details and save your changes." : "Add a clear, actionable issue to the queue."}</p>
          </div>
          <button className="icon-button modal-close" type="button" onClick={onCancel} aria-label="Close form">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="m5 5 10 10M15 5 5 15" />
            </svg>
          </button>
        </div>

        <form className="issue-form" onSubmit={handleSubmit} noValidate>
          <label className="form-field" htmlFor="issue-title">
            <span>Bug title <span className="required-mark">*</span></span>
            <input
              id="issue-title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Login button not working"
              autoFocus
              aria-invalid={Boolean(fieldErrors.title)}
            />
            {fieldErrors.title && <span className="field-error">{fieldErrors.title}</span>}
          </label>

          <label className="form-field" htmlFor="issue-description">
            <span>Description <span className="required-mark">*</span></span>
            <textarea
              id="issue-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what is happening and how to reproduce it."
              rows="4"
              aria-invalid={Boolean(fieldErrors.description)}
            />
            {fieldErrors.description && <span className="field-error">{fieldErrors.description}</span>}
          </label>

          <div className="form-field-row">
            <label className="form-field" htmlFor="issue-priority">
              <span>Priority <span className="required-mark">*</span></span>
              <select
                id="issue-priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                aria-invalid={Boolean(fieldErrors.priority)}
              >
                <option value="">Select priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              {fieldErrors.priority && <span className="field-error">{fieldErrors.priority}</span>}
            </label>

            <label className="form-field" htmlFor="issue-status">
              <span>Status <span className="required-mark">*</span></span>
              <select
                id="issue-status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                aria-invalid={Boolean(fieldErrors.status)}
              >
                <option value="">Select status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
              {fieldErrors.status && <span className="field-error">{fieldErrors.status}</span>}
            </label>
          </div>

          {errorMessage && <p className="form-api-error" role="alert">{errorMessage}</p>}

          <div className="form-actions">
            <button className="button button-secondary" type="button" onClick={onCancel} disabled={isSaving}>
              Cancel
            </button>
            <button className="button button-primary" type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : isEditing ? "Save changes" : "Create issue"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}