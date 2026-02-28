import { apiFetch } from "./apiClient";

export function registerChild(payload) {
  return apiFetch("/auth/register-child", { method: "POST", body: payload });
}

export function login(payload) {
  return apiFetch("/auth/login", { method: "POST", body: payload });
}
