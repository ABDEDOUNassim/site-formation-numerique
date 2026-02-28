import { apiFetch } from "./apiClient";

export const childApi = {
  myStories(token) {
    return apiFetch("/child/stories", { token });
  },
  createStory(token, payload) {
    return apiFetch("/child/stories", { method: "POST", token, body: payload });
  },
  updateStory(token, id, payload) {
    return apiFetch(`/child/stories/${id}`, { method: "PATCH", token, body: payload });
  },
  deleteStory(token, id) {
    return apiFetch(`/child/stories/${id}`, { method: "DELETE", token });
  },
  submitReflex(token, answers) {
    return apiFetch("/games/reflex/submit", { method: "POST", token, body: { answers } });
  },
  saveProgress(token, payload) {
    return apiFetch("/games/progress", { method: "POST", token, body: payload });
  },
  progress(token) {
    return apiFetch("/games/progress", { token });
  },
  badges(token) {
    return apiFetch("/games/badges", { token });
  }
};
