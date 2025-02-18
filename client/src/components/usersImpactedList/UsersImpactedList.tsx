import { useEffect, useState } from "react";

export default function UsersImpactedtList({ id }: { id: string }) {
  const [impacted, setImpacted] = useState<DataUserType[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/user/impacted/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setImpacted(data);
      });
  }, [id]);

  return (
    <>
      <h2>Les personnes impactées de la décision</h2>
      {impacted.length > 0 && (
        <section>
          {impacted.map((impacted) => (
            <article key={impacted.id}>
              <p>
                {impacted.firstname} {impacted.lastname}
              </p>
            </article>
          ))}
        </section>
      )}
    </>
  );
}
