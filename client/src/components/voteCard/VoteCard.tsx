import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import againstImage from "../../assets/images/against.jpg";
import forImage from "../../assets/images/for.jpg";
import style from "./votreCard.module.css";

export default function VoteCard({ id }: { id: string }) {
  const [hasVoted, setHasVoted] = useState(false);
  const [vote, setVote] = useState<boolean | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/decision/vote/${id}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.state === 0 || data.state === 1) {
          setHasVoted(true);
          setVote(data.state === 1);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleVote = (value: boolean) => {
    if (!hasVoted) {
      fetch(`${import.meta.env.VITE_API_URL}/api/decision/vote/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ state: value ? 1 : 0, decision_id: id }),
      })
        .then((response) => response.json())
        .then(() => {
          setHasVoted(true);
          setVote(value);
          toast.success(
            `Bravo ! Vous avez voté ${value ? "Pour" : "Contre"} 🎉`,
          );
        })
        .catch((err) => console.error(err));
    } else {
      fetch(`${import.meta.env.VITE_API_URL}/api/decision/vote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ state: value ? 1 : 0, decision_id: id }),
      })
        .then(() => {
          setVote(value);
          toast.success(
            `Bravo ! Vous avez voté ${value ? "Pour" : "Contre"} 🎉`,
          );
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className={style.container}>
      <h2 className={style.titleH2}>
        Pour voter, cliquez sur l'un des boutons ci-dessous :{" "}
      </h2>
      <div className={style.button}>
        <button
          type="button"
          onClick={() => handleVote(true)}
          disabled={hasVoted && vote === true}
          className={style.buttonFor}
        >
          <img
            src={forImage}
            alt="bouton voter pour la décision"
            className={style.buttonImage}
          />
        </button>
        <button
          type="button"
          onClick={() => handleVote(false)}
          disabled={hasVoted && vote === false}
          className={style.buttonAgainst}
        >
          <img
            src={againstImage}
            alt="bouton voter pour la décision"
            className={style.buttonImage}
          />
        </button>
      </div>
      {hasVoted && (
        <p className={style.yourVote}>
          Votre vote :
          {vote ? (
            <div className={style.for}> Pour</div>
          ) : (
            <div className={style.against}> Contre</div>
          )}
        </p>
      )}
    </div>
  );
}
