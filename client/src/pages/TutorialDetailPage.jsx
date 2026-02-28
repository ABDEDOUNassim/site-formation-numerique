import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { contentApi } from "../services/contentApi";

export function TutorialDetailPage() {
  const { id } = useParams();
  const [tutorial, setTutorial] = useState(null);

  useEffect(() => {
    contentApi.tutorial(id).then((res) => setTutorial(res.data));
  }, [id]);

  if (!tutorial) return <section className="card">Chargement...</section>;

  return (
    <section className="card">
      <h2>{tutorial.title}</h2>
      <p>{tutorial.content}</p>
    </section>
  );
}
