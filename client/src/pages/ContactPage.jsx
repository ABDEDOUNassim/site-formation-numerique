import { useState } from "react";
import { sendContactRequest } from "../services/structureApi";

const initialState = {
  organizationName: "",
  organizationType: "MECS",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  message: "",
  expectedParticipants: 20,
  preferredDays: ""
};

export function ContactPage() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("Envoi en cours...");

    try {
      await sendContactRequest({
        ...form,
        expectedParticipants: Number(form.expectedParticipants)
      });
      setStatus("Demande envoyée ✅");
      setForm(initialState);
    } catch (error) {
      setStatus(`Erreur: ${error.message}`);
    }
  }

  return (
    <section className="card">
      <h2>Contact / Demande d'intervention</h2>
      <form onSubmit={handleSubmit}>
        <label>Nom structure<input value={form.organizationName} onChange={(e) => setForm({ ...form, organizationName: e.target.value })} required /></label>
        <label>Type de structure
          <select value={form.organizationType} onChange={(e) => setForm({ ...form, organizationType: e.target.value })}>
            <option>MECS</option><option>college</option><option>lycee</option><option>association</option><option>PJJ</option><option>autre</option>
          </select>
        </label>
        <label>Nom contact<input value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} required /></label>
        <label>Email<input type="email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} required /></label>
        <label>Téléphone<input value={form.contactPhone} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} /></label>
        <label>Participants estimés<input type="number" min="1" value={form.expectedParticipants} onChange={(e) => setForm({ ...form, expectedParticipants: e.target.value })} /></label>
        <label>Jours souhaités<input value={form.preferredDays} onChange={(e) => setForm({ ...form, preferredDays: e.target.value })} /></label>
        <label>Message<textarea rows="5" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required /></label>
        <button type="submit">Envoyer</button>
      </form>
      {status && <p>{status}</p>}
    </section>
  );
}
