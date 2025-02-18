import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DecisionCard from "../../components/decisionCard/DecisionCard";
import NavBar from "../../components/navBar/NavBar";
import style from "./decisions.module.css";

export default function AllDecisionPage() {
  const [decisions, setDecisions] = useState<DecisionDetailCard[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/alldecisions`)
      .then((response) => response.json())
      .then((data) => {
        setDecisions(data);
      })
      .catch(() => toast.error("Erreur de connexion au serveur"));
  }, []);

  return (
    <div>
      <NavBar />
      <main className={style.main}>
        <button type="button" className={style.buttonCreateDecision}>
          Créer une prise de décision
        </button>
        <section>
          <h2 className={style.titleH2}>Toutes Les décisions</h2>
          <div className={style.cardsContainer}>
            {decisions.map((decision) => (
              <article key={decision.id}>
                <DecisionCard decision={decision} />
              </article>
            ))}
          </div>
        </section>
        <button type="button" className={style.buttonScrollToTop}>
          Revenir en haut
        </button>
      </main>
    </div>
  );
}
