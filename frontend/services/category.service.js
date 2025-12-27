import api from "./api";

export const getCategories = (companyId) =>
  api.get("/categories", { params: { companyId } });

export const createCategory = (data) =>
  api.post("/categories", data);