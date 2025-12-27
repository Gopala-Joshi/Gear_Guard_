import api from "./api";

export const getRequests = (companyId) =>
  api.get("/requests", { params: { companyId } });

export const createRequest = (data) =>
  api.post("/requests", data);

export const updateRequestStage = (id, stage) =>
  api.patch(`/requests/${id}/stage`, { stage });