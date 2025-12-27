import apiClient from "./apiClient";

export const getEquipment = () =>
  apiClient.get("/equipment");

export const getEquipmentById = (id) =>
  apiClient.get(`/equipment/${id}`);

export const createEquipment = (data) =>
  apiClient.post("/equipment", data);

export const updateEquipment = (id, data) =>
  apiClient.put(`/equipment/${id}`, data);

export const deleteEquipment = (id) =>
  apiClient.delete(`/equipment/${id}`);
