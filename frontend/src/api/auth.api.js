import apiClient from "./apiClient";

export const login = (data) =>
  apiClient.post("/auth/login", data);

export const signup = (data) =>
  apiClient.post("/auth/register", data);

export const logout = () =>
  apiClient.post("/auth/logout");

export const forgotPassword = (email) =>
  apiClient.post("/auth/forgot-password", { email });
