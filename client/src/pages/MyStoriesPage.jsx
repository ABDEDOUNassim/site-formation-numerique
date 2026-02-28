import { useEffect, useState } from "react";
import { childApi } from "../services/childApi";
import { useAuth } from "../context/AuthContext.jsx";

export function MyStoriesPage() {
  const { token } = useAuth();
  const [stories, setStories] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState(null);
  const [editingForm, setEditingForm] = useState({ title: "", content: "" });

  async function load() {
    const res = await childApi.myStories(token);
    setStories(res.data);
  }

  useEffect(() => {
    load();
  }, []);

  async function createStory(event) {
    event.preventDefault();
    await childApi.createStory(token, form);
    setForm({ title: "", content: "" });
    load();
  }

  async function removeStory(id) {
    await childApi.deleteStory(token, id);
    load();
  }

  async function saveEdit(id) {
    await childApi.updateStory(token, id, editingForm);
    setEditingId(null);
    setEditingForm({ title: "", content: "" });
    load();
  }

  return (
    <section className="card">
      <h2>Mes histoires privées</h2>
      <p>Ces histoires sont privées et visibles uniquement dans ton compte.</p>

      <form onSubmit={createStory}>
        <label>Titre<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></label>
        <label>Contenu<textarea rows="4" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required /></label>
        <button type="submit">Ajouter</button>
      </form>

      <div className="grid">
        {stories.map((story) => (
          <article className="card" key={story.id}>
            {editingId === story.id ? (
              <>
                <input
                  value={editingForm.title}
                  onChange={(e) => setEditingForm({ ...editingForm, title: e.target.value })}
                />
                <textarea
                  rows="4"
                  value={editingForm.content}
                  onChange={(e) => setEditingForm({ ...editingForm, content: e.target.value })}
                />
                <button onClick={() => saveEdit(story.id)}>Enregistrer</button>
                <button onClick={() => setEditingId(null)}>Annuler</button>
              </>
            ) : (
              <>
                <h3>{story.title}</h3>
                <p>{story.content}</p>
                <button
                  onClick={() => {
                    setEditingId(story.id);
                    setEditingForm({ title: story.title, content: story.content });
                  }}
                >
                  Modifier
                </button>
                <button onClick={() => removeStory(story.id)}>Supprimer</button>
              </>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
