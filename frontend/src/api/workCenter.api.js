import apiClient from "./apiClient";

export const getWorkCenters = () =>
  apiClient.get("/workcenters");

export const createWorkCenter = (data) =>
  apiClient.post("/workcenters", data);

export const updateWorkCenter = (id, data) =>
  apiClient.put(`/workcenters/${id}`, data);

export const deleteWorkCenter = (id) =>
  apiClient.delete(`/workcenters/${id}`);
