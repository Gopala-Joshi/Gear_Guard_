import api from "./api";

export const getEquipment = (companyId) =>
  api.get("/equipment", { params: { companyId } });

export const getEquipmentById = (id) =>
  api.get(`/equipment/${id}`);

export const createEquipment = (data) =>
  api.post("/equipment", data);