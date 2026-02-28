import { apiFetch } from "./apiClient";

export const contentApi = {
  ageBands() {
    return apiFetch("/public/age-bands");
  },
  stories(ageBandId) {
    const query = ageBandId ? `?ageBandId=${ageBandId}` : "";
    return apiFetch(`/public/stories${query}`);
  },
  story(id) {
    return apiFetch(`/public/stories/${id}`);
  },
  tutorials(ageBandId) {
    const query = ageBandId ? `?ageBandId=${ageBandId}` : "";
    return apiFetch(`/public/tutorials${query}`);
  },
  tutorial(id) {
    return apiFetch(`/public/tutorials/${id}`);
  },
  cards(ageBandId, limit = 24) {
    return apiFetch(`/public/cards?ageBandId=${ageBandId}&limit=${limit}`);
  }
};
