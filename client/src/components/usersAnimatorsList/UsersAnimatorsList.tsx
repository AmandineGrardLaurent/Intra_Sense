import { useEffect, useState } from "react";
import style from "./usersAnimatorsList.module.css";

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
          <h2 className={style.titleH2}>Les animateurs de la décision</h2>
          {animators.map((animator) => (
            <article key={animator.id}>
              <p>
                {animator.firstname} {animator.lastname}
              </p>
            </article>
          ))}
        </section>
      )}
    </>
  );
}
