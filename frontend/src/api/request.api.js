import apiClient from "./apiClient";

export const getTeams = () =>
  apiClient.get("/teams");

export const createTeam = (data) =>
  apiClient.post("/teams", data);

export const updateTeam = (id, data) =>
  apiClient.put(`/teams/${id}`, data);

export const deleteTeam = (id) =>
  apiClient.delete(`/teams/${id}`);
