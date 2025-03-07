import { useEffect, useState } from "react";
import style from "./voteCounter.module.css";
import forImage from "../../assets/images/for.jpg";
import againstImage from "../../assets/images/against.jpg";

export default function VoteCounter({ id }: { id: string }) {
  const [voteFor, setVoteFor] = useState(0);
  const [voteAgainst, setVoteAgainst] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/decision/votefor/${id}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setVoteFor(data[0].VoteFor);
      })
      .catch((err) => console.error(err));

    fetch(`${import.meta.env.VITE_API_URL}/api/decision/voteagainst/${id}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setVoteAgainst(data[0].VoteAgainst);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <section className={style.counterCard}>
      <h2 className={style.titleH2}>Total des votes</h2>
      <div className={style.containerVote}>
        <div>
          <img
            src={forImage}
            alt="vote pour la décision"
            className={style.vote}
          />
          <p className={style.text}>{voteFor}</p>
        </div>
        <div>
          <img
            src={againstImage}
            alt="vote contre la décision"
            className={style.vote}
          />
          <p className={style.text}>{voteAgainst}</p>
        </div>
      </div>
    </section>
  );
}
