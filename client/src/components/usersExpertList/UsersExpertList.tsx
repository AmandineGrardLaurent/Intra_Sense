import { useEffect, useState } from "react";

export default function UsersExpertList({ id }: { id: string }) {
  const [experts, setExperts] = useState<DataUserType[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/user/expert/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setExperts(data);
      });
  }, [id]);

  return (
    <>
      {experts.length > 0 && (
        <section>
          <h2>Les experts de la décision</h2>
          {experts.map((expert) => (
            <article key={expert.id}>
              <p>
                {expert.firstname} {expert.lastname}
              </p>
            </article>
          ))}
        </section>
      )}
    </>
  );
}
