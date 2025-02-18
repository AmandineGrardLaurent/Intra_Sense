import { useEffect, useState } from "react";
import style from "../usersAnimatorsList.module.css";

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
      {impacted.length > 0 && (
        <section className={style.container}>
          <h2 className={style.titleH2}>Les personnes impactées</h2>
          <div className={style.containerUser}>
            {impacted.map((impacted) => (
              <article key={impacted.id} className={style.user}>
                <img
                  src={impacted.avatar}
                  alt={impacted.lastname}
                  className={style.avatar}
                />
                <p>
                  {impacted.firstname}
                  {/* {impacted.lastname} */}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
