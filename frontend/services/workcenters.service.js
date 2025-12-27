import api from "./api";

export const getWorkCenters = (companyId) =>
  api.get("/workcenters", { params: { companyId } });

export const createWorkCenter = (data) =>
  api.post("/workcenters", data);