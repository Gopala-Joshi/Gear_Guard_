import api from "./api";

export const getTeams = (companyId) =>
  api.get("/teams", { params: { companyId } });

export const createTeam = (data) =>
  api.post("/teams", data);