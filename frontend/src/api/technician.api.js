import apiClient from "./apiClient";

export const getTechnicians = () =>
  apiClient.get("/technicians");

export const createTechnician = (data) =>
  apiClient.post("/technicians", data);

export const updateTechnician = (id, data) =>
  apiClient.put(`/technicians/${id}`, data);

export const deleteTechnician = (id) =>
  apiClient.delete(`/technicians/${id}`);
