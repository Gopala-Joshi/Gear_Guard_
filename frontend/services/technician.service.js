import api from "./api";

export const getTechnicians = (companyId) =>
  api.get("/technicians", { params: { companyId } });

export const createTechnician = (data) =>
  api.post("/technicians", data);