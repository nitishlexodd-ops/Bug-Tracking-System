import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
});

export async function getIssues() {
  const response = await api.get("/api/issues");
  return response.data;
}

export async function createIssue(issueData) {
  const response = await api.post("/api/issues", issueData);
  return response.data;
}

export async function updateIssue(id, issueData) {
  const response = await api.put(`/api/issues/${id}`, issueData);
  return response.data;
}

export async function deleteIssue(id) {
  const response = await api.delete(`/api/issues/${id}`);
  return response.data;
}