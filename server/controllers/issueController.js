import Issue from "../models/Issue.js";

function sendControllerError(res, error, action) {
  console.error(`Unable to ${action} issue:`, error);

  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({ message: "Please provide valid issue details." });
  }

  return res.status(500).json({ message: `Unable to ${action} issue.` });
}

export async function getIssues(req, res) {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    return res.status(200).json(issues);
  } catch (error) {
    return sendControllerError(res, error, "load");
  }
}

export async function createIssue(req, res) {
  const { title, description, priority, status } = req.body || {};

  if (
    ![title, description, priority, status].every(
      (value) => typeof value === "string" && value.trim().length > 0
    )
  ) {
    return res.status(400).json({ message: "All issue fields are required." });
  }

  try {
    const issue = await Issue.create({ title, description, priority, status });
    return res.status(201).json(issue);
  } catch (error) {
    return sendControllerError(res, error, "create");
  }
}

export async function updateIssue(req, res) {
  const allowedFields = ["title", "description", "priority", "status"];
  const updates = {};

  allowedFields.forEach((field) => {
    if (req.body && Object.prototype.hasOwnProperty.call(req.body, field)) {
      updates[field] = req.body[field];
    }
  });

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "At least one issue field is required." });
  }

  try {
    const issue = await Issue.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!issue) {
      return res.status(404).json({ message: "Issue not found." });
    }

    return res.status(200).json(issue);
  } catch (error) {
    return sendControllerError(res, error, "update");
  }
}

export async function deleteIssue(req, res) {
  try {
    const issue = await Issue.findByIdAndDelete(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found." });
    }

    return res.status(200).json({ message: "Issue deleted successfully." });
  } catch (error) {
    return sendControllerError(res, error, "delete");
  }
}