import { ContactRequest } from "../models/index.js";

export async function createContactRequest(payload) {
  return ContactRequest.create(payload);
}
