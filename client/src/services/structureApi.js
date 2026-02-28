import { apiFetch } from "./apiClient";

export function sendContactRequest(payload) {
  return apiFetch("/structure/contact-requests", {
    method: "POST",
    body: payload
  });
}
