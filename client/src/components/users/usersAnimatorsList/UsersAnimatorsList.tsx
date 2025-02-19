import { useEffect, useState } from "react";
import style from "../users.module.css";

export default function UsersAnimatorsList({ id }: { id: string }) {
  const [animators, setAnimators] = useState<DataUserType[]>([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/user/animator/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAnimators(data);
      });
  }, [id]);

  return (
    <>
      {animators.length > 0 && (
        <section className={style.container}>
          <h2 className={style.titleH2}>Les animateurs</h2>
          <div className={style.containerUser}>
            {animators.map((animator) => (
              <article key={animator.id} className={style.user}>
                <img
                  src={animator.avatar}
                  alt={animator.lastname}
                  className={style.avatar}
                />
                <p>{animator.firstname}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
