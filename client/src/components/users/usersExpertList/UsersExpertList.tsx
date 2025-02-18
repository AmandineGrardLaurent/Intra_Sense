import { useEffect, useState } from "react";
import style from "../usersAnimatorsList.module.css";

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
        <section className={style.container}>
          <h2 className={style.titleH2}>Les experts</h2>
          <div className={style.containerUser}>
            {experts.map((expert) => (
              <article key={expert.id} className={style.user}>
                <img
                  src={expert.avatar}
                  alt={expert.lastname}
                  className={style.avatar}
                />
                <p>
                  {expert.firstname}
                  {/* {expert.lastname} */}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
